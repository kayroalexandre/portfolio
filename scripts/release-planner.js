#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

function getLastTag() {
  try {
    return run('git describe --tags --abbrev=0');
  } catch {
    return null;
  }
}

function parseVersion(version) {
  const match = version.replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    return { major: 0, minor: 0, patch: 0 };
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function formatVersion(parts) {
  return `${parts.major}.${parts.minor}.${parts.patch}`;
}

function bumpVersion(currentVersion, bumpType) {
  const version = parseVersion(currentVersion);

  if (bumpType === 'major') {
    version.major += 1;
    version.minor = 0;
    version.patch = 0;
  } else if (bumpType === 'minor') {
    version.minor += 1;
    version.patch = 0;
  } else {
    version.patch += 1;
  }

  return formatVersion(version);
}

function parseCommits(rawLog) {
  if (!rawLog) {
    return [];
  }

  return rawLog
    .split('\u001e')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [hash = '', subject = '', body = ''] = entry.split('\u001f');
      return {
        hash,
        subject: subject.trim(),
        body: body.trim(),
      };
    });
}

function classifyCommit(commit) {
  const subject = commit.subject.toLowerCase();
  const body = commit.body.toLowerCase();
  const isBreaking = subject.includes('!') || body.includes('breaking change');

  if (isBreaking) {
    return { bump: 'major', section: 'Changed' };
  }

  if (subject.startsWith('feat')) {
    return { bump: 'minor', section: 'Added' };
  }

  if (subject.startsWith('fix')) {
    return { bump: 'patch', section: 'Fixed' };
  }

  if (subject.startsWith('perf')) {
    return { bump: 'patch', section: 'Performance' };
  }

  if (subject.startsWith('refactor')) {
    return { bump: 'patch', section: 'Changed' };
  }

  if (subject.startsWith('docs')) {
    return { bump: 'patch', section: 'Documentation' };
  }

  if (subject.startsWith('test')) {
    return { bump: 'patch', section: 'Testing' };
  }

  if (subject.startsWith('security')) {
    return { bump: 'patch', section: 'Security' };
  }

  return { bump: 'patch', section: 'Maintenance' };
}

function collectSections(commits) {
  const sections = new Map([
    ['Added', []],
    ['Fixed', []],
    ['Changed', []],
    ['Documentation', []],
    ['Testing', []],
    ['Performance', []],
    ['Security', []],
    ['Maintenance', []],
  ]);

  let bump = 'patch';
  let hasFeat = false;
  let hasBreaking = false;

  for (const commit of commits) {
    const classification = classifyCommit(commit);
    const line = `- ${commit.subject}`;

    if (sections.has(classification.section)) {
      sections.get(classification.section).push(line);
    } else {
      sections.get('Changed').push(line);
    }

    if (classification.bump === 'major') {
      hasBreaking = true;
    } else if (classification.bump === 'minor') {
      hasFeat = true;
    }
  }

  if (hasBreaking) {
    bump = 'major';
  } else if (hasFeat) {
    bump = 'minor';
  }

  return { sections, bump };
}

function buildSection({ version, date, sections }) {
  const output = [`## [v${version}] - ${date}`, ''];

  for (const [title, items] of sections.entries()) {
    if (items.length === 0) {
      continue;
    }

    output.push(`### ${title}`);
    output.push(...items);
    output.push('');
  }

  if (output.length === 2) {
    output.push('### Changed');
    output.push('- No release notes were generated for this cycle.');
    output.push('');
  }

  return output.join('\n').trimEnd();
}

function updateChangelog(existingContent, newSection) {
  const header = '# Changelog';
  const normalized = existingContent?.trim() ? existingContent.trimEnd() : '';

  if (!normalized) {
    return `${header}\n\n## [Unreleased]\n\n${newSection}\n`;
  }

  if (normalized.startsWith(header)) {
    const remainder = normalized.slice(header.length).trimStart();
    return `${header}\n\n## [Unreleased]\n\n${newSection}\n\n${remainder}`.trimEnd() + '\n';
  }

  return `${header}\n\n## [Unreleased]\n\n${newSection}\n\n${normalized}\n`;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const shouldWrite = args.has('--write');
  const onlyChangelog = args.has('--changelog');

  const lastTag = getLastTag();
  const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
  const rawLog = run(lastTag
    ? `git log ${range} --pretty=format:%H%x1f%s%x1f%b%x1e`
    : 'git log --pretty=format:%H%x1f%s%x1f%b%x1e');
  const commits = parseCommits(rawLog);
  const { sections, bump } = collectSections(commits);

  const packageJsonRaw = await readFile('package.json', 'utf8');
  const packageJson = JSON.parse(packageJsonRaw);
  const currentVersion = packageJson.version || '0.0.0';
  const nextVersion = bumpVersion(currentVersion, bump);
  const date = new Date().toISOString().slice(0, 10);
  const releaseBranch = `release/v${nextVersion}`;
  const section = buildSection({ version: nextVersion, date, sections });

  const summary = {
    lastTag,
    currentVersion,
    nextVersion,
    bump,
    releaseBranch,
    commits: commits.length,
    notes: section,
    sections: Object.fromEntries(
      Array.from(sections.entries()).map(([key, items]) => [key, items.length])
    ),
  };

  if (shouldWrite) {
    const changelogPath = 'CHANGELOG.md';
    const changelogContent = await readFile(changelogPath, 'utf8').catch(() => '# Changelog\n');
    const nextChangelog = updateChangelog(changelogContent, section);

    packageJson.version = nextVersion;
    await writeFile('package.json', `${JSON.stringify(packageJson, null, 2)}\n`);
    await writeFile(changelogPath, nextChangelog);
  }

  if (onlyChangelog) {
    process.stdout.write(`${section}\n`);
    return;
  }

  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
