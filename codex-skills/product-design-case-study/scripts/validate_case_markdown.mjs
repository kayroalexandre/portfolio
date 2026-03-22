#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SECTION_RULES = [
  {
    key: "overview",
    label: "Visão geral",
    aliases: ["visão geral", "visao geral", "overview"],
  },
  {
    key: "context-problem",
    label: "Contexto do produto e problema",
    aliases: [
      "o produto",
      "contexto do produto",
      "produto",
      "o problema",
      "problema",
      "desafio",
    ],
  },
  {
    key: "goals-constraints",
    label: "Objetivos e restrições",
    aliases: [
      "objetivos",
      "objetivo",
      "objetivos e restrições",
      "restrições",
      "restricoes",
    ],
  },
  {
    key: "role-scope",
    label: "Papel do designer e escopo",
    aliases: ["meu papel", "papel", "papel do designer", "escopo", "papel e escopo"],
  },
  {
    key: "research",
    label: "Pesquisa e síntese",
    aliases: [
      "processo de pesquisa",
      "pesquisa",
      "descoberta",
      "síntese",
      "sintese",
    ],
  },
  {
    key: "decisions",
    label: "Decisões de design",
    aliases: [
      "priorização",
      "priorizacao",
      "decisões de design",
      "decisoes de design",
      "solução",
      "solucao",
      "design system",
      "arquitetura da informação",
    ],
  },
  {
    key: "evolution",
    label: "Evolução visual e fluxos",
    aliases: [
      "evolução visual",
      "evolucao visual",
      "fluxos",
      "antes x depois",
      "jornada do usuário",
      "jornada do usuario",
    ],
  },
  {
    key: "results",
    label: "Resultados",
    aliases: ["resultados", "impacto", "impactos"],
  },
  {
    key: "learnings",
    label: "Aprendizados",
    aliases: ["aprendizados", "aprendizado", "lições", "licoes", "lições aprendidas"],
  },
];

const ALLOWED_MERMAID_TYPES = new Set(["journey", "flowchart", "quadrantchart", "gantt"]);

function printUsage() {
  console.error("Usage: node scripts/validate_case_markdown.mjs <markdownPath> [--json]");
}

function parseArgs(argv) {
  if (argv.length < 1) {
    printUsage();
    process.exit(1);
  }

  return {
    markdownPath: path.resolve(argv[0]),
    json: argv.includes("--json"),
  };
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function readMarkdown(markdownPath) {
  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Markdown file not found: ${markdownPath}`);
  }
  return fs.readFileSync(markdownPath, "utf8");
}

function extractHeadings(markdown) {
  const headings = [];
  const regex = /^(#{1,6})\s+(.+)$/gmu;
  for (const match of markdown.matchAll(regex)) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      normalized: normalize(match[2]),
      index: match.index ?? 0,
    });
  }
  return headings;
}

function findSections(headings) {
  return SECTION_RULES.map((rule) => {
    const match = headings.find((heading) =>
      rule.aliases.some((alias) => heading.normalized.includes(normalize(alias))),
    );
    return {
      key: rule.key,
      label: rule.label,
      found: Boolean(match),
      heading: match?.text ?? null,
      index: match?.index ?? null,
    };
  });
}

function extractMermaidBlocks(markdown) {
  const blocks = [];
  const regex = /```mermaid\s+([\s\S]*?)```/gmu;
  for (const match of markdown.matchAll(regex)) {
    const body = match[1].trim();
    const firstLine = body.split(/\r?\n/u).find((line) => line.trim().length > 0) ?? "";
    const typeToken = firstLine.split(/\s+/u)[0].trim().toLowerCase();
    blocks.push({
      raw: body,
      type: typeToken,
      allowed: ALLOWED_MERMAID_TYPES.has(typeToken),
    });
  }
  return blocks;
}

function countMarkdownImages(markdown) {
  return [...markdown.matchAll(/!\[[^\]]*\]\(([^)]+)\)/gu)].length;
}

function collectWarnings(markdown, sections, mermaidBlocks, imageCount) {
  const warnings = [];

  if (/\[todo|\[pergunta:|\?\?\?|tbd/iu.test(markdown)) {
    warnings.push("Há placeholders pendentes no markdown.");
  }

  if (/\[imagem:/iu.test(markdown)) {
    warnings.push("Ainda existem marcadores literais de imagem no markdown.");
  }

  if (imageCount > 8) {
    warnings.push(`O case usa ${imageCount} imagens em markdown; revise se há excesso visual.`);
  }

  if (mermaidBlocks.some((block) => !block.allowed)) {
    warnings.push("Há bloco Mermaid com tipo fora da lista permitida.");
  }

  const foundSections = sections.filter((section) => section.found);
  const ordered = foundSections.every((section, index) => {
    if (index === 0) {
      return true;
    }
    return (section.index ?? 0) >= (foundSections[index - 1].index ?? 0);
  });

  if (!ordered) {
    warnings.push("A ordem narrativa das seções parece inconsistente.");
  }

  const resultsHeading = sections.find((section) => section.key === "results" && section.found);
  if (resultsHeading) {
    const tail = markdown.slice(resultsHeading.index ?? 0, (resultsHeading.index ?? 0) + 1200);
    if (/(aument|reduz|diminui|cres|impact|melhor)/iu.test(tail) && !/\d/u.test(tail)) {
      warnings.push("A seção de resultados parece descrever impacto sem nenhum número; confirme se isso é intencional.");
    }
  }

  return warnings;
}

function buildResult(markdownPath, markdown) {
  const headings = extractHeadings(markdown);
  const sections = findSections(headings);
  const mermaidBlocks = extractMermaidBlocks(markdown);
  const imageCount = countMarkdownImages(markdown);
  const warnings = collectWarnings(markdown, sections, mermaidBlocks, imageCount);
  const missingSections = sections.filter((section) => !section.found);

  return {
    markdownPath: path.relative(process.cwd(), markdownPath).replace(/\\/gu, "/"),
    ok: missingSections.length === 0,
    missingSections: missingSections.map((section) => section.label),
    sections,
    mermaid: {
      count: mermaidBlocks.length,
      invalidTypes: mermaidBlocks.filter((block) => !block.allowed).map((block) => block.type),
    },
    imageCount,
    warnings,
  };
}

function renderHuman(result) {
  const lines = [];
  lines.push(result.ok ? "VALIDATION PASSED" : "VALIDATION FAILED");
  lines.push(`Arquivo: ${result.markdownPath}`);
  lines.push("");

  if (result.missingSections.length > 0) {
    lines.push("Seções ausentes:");
    for (const section of result.missingSections) {
      lines.push(`- ${section}`);
    }
    lines.push("");
  }

  lines.push("Seções detectadas:");
  for (const section of result.sections) {
    lines.push(`- ${section.label}: ${section.found ? section.heading : "ausente"}`);
  }
  lines.push("");
  lines.push(`Imagens markdown: ${result.imageCount}`);
  lines.push(`Blocos Mermaid: ${result.mermaid.count}`);

  if (result.mermaid.invalidTypes.length > 0) {
    lines.push(`Tipos Mermaid inválidos: ${result.mermaid.invalidTypes.join(", ")}`);
  }

  if (result.warnings.length > 0) {
    lines.push("");
    lines.push("Warnings:");
    for (const warning of result.warnings) {
      lines.push(`- ${warning}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

function main() {
  try {
    const { markdownPath, json } = parseArgs(process.argv.slice(2));
    const markdown = readMarkdown(markdownPath);
    const result = buildResult(markdownPath, markdown);
    if (json) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
      process.exit(result.ok ? 0 : 1);
    }
    process.stdout.write(renderHuman(result));
    process.exit(result.ok ? 0 : 1);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
