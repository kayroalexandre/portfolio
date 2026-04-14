# Automated Multi-Branch Agent Workflow — GitHub Copilot Best Practices

**Version**: 1.0  
**Date**: April 14, 2026  
**Focus**: Autonomous agent-driven branch creation, scope detection, and PR review automation

---

## Executive Overview

This document outlines the **recommended GitHub Copilot workflow pattern** for autonomous multi-branch management, scope detection, and agent-driven PR reviews. The workflow is designed to:

1. **Detect scope automatically** — When you request something new, the system detects if it's a different scope
2. **Create branches autonomously** — Generates branch names + context based on request type
3. **Coordinate multiple agents** — One agent for development, one for review/merge
4. **Handle task switching seamlessly** — Manages multiple concurrent branches/PRs
5. **Maintain context across switches** — Preserves state when switching between tasks

---

## Architecture Overview

```
                    User Request
                         ↓
              ┌─ Scope Detection Agent ─┐
              │ (GitHub Copilot Chat)   │
              └──────────┬──────────────┘
                         ↓
        ┌────────── Branch Decision ──────────┐
        ↓                                      ↓
   New Scope              Same Scope
        ↓                      ↓
   Create Branch         Continue Branch
        ↓                      ↓
  Development Agent    Development Agent
  + Webhooks              (existing)
        ↓                      ↓
   Commit/Push          Commit/Push
        ↓                      ↓
   Create PR            Update PR
        ↓                      ↓
  Review Agent ←────────────→ Approve/Comment/Merge
                         ↓
                   Finalize & Sync
```

---

## Part 1: Scope Detection Agent

### 1.1 What is a Scope?

A **scope** is a conceptual domain of work:

| Scope Type      | Examples                                      | Triggers                                       |
| --------------- | --------------------------------------------- | ---------------------------------------------- |
| **Feature**     | "Add lazy-loading", "Create new page"         | Keywords: add, create, new, implement          |
| **Bug Fix**     | "Fix image loading", "Resolve layout issue"   | Keywords: fix, resolve, bug, issue             |
| **Refactor**    | "Improve component structure", "Extract hook" | Keywords: refactor, improve, optimize, extract |
| **Docs**        | "Write README section", "Document API"        | Keywords: document, write, guide, tutorial     |
| **Test**        | "Add unit tests", "Improve coverage"          | Keywords: test, verify, coverage               |
| **Chore**       | "Update dependencies", "Cleanup root dir"     | Keywords: update, cleanup, remove, organize    |
| **Performance** | "Reduce bundle size", "Optimize rendering"    | Keywords: optimize, perf, speed, slow          |
| **Security**    | "Fix vulnerability", "Add auth check"         | Keywords: security, vulnerability, auth, token |

### 1.2 AI-Powered Scope Detection

**How it works:**

```
Request: "Add dark mode toggle to header"
              ↓
Copilot analyzes:
  • Keywords: "Add", "dark mode", "toggle"
  • Context: header component (existing scope element)
  • Type: Feature addition
  • Related files: src/app/components/Header.tsx, theme.ts
              ↓
Decision: NEW SCOPE or EXISTING?
  • Is there an active branch for "dark-mode"? → No
  • Is this related to current branch? → No
  • Verdict: NEW SCOPE
              ↓
Action:
  • Branch name: feature/dark-mode-toggle
  • Issue context: "Add dark mode toggle to header component"
  • Commit prefix: feat: (for conventional commits)
              ↓
Create branch + notify user
```

### 1.3 Scope Detection Rules (Pattern Matching)

Create `.github/agents/scope-detector.yaml`:

```yaml
name: Scope Detector Agent
description: Detects if request is new scope or existing

detection_rules:
  # Feature scope patterns
  feature:
    keywords: ['add', 'create', 'new', 'implement', 'build', 'enable']
    pattern_priority: 10
    branch_prefix: 'feature/'

  # Bug fix scope patterns
  bugfix:
    keywords: ['fix', 'bug', 'resolve', 'broken', 'issue', 'error', 'crash']
    pattern_priority: 9
    branch_prefix: 'fix/'

  # Refactoring scope patterns
  refactor:
    keywords: ['refactor', 'improve', 'simplify', 'extract', 'reorganize', 'cleanup']
    pattern_priority: 8
    branch_prefix: 'refactor/'

  # Documentation scope patterns
  docs:
    keywords: ['document', 'write', 'readme', 'guide', 'tutorial', 'explain']
    pattern_priority: 7
    branch_prefix: 'docs/'

  # Test scope patterns
  test:
    keywords: ['test', 'unit', 'coverage', 'verify', 'validate', 'check']
    pattern_priority: 6
    branch_prefix: 'test/'

  # Performance scope patterns
  perf:
    keywords: ['optimize', 'performance', 'speed', 'slow', 'bundle', 'render']
    pattern_priority: 5
    branch_prefix: 'perf/'

  # Security scope patterns
  security:
    keywords: ['security', 'vulnerability', 'auth', 'token', 'csrf', 'xss']
    pattern_priority: 4
    branch_prefix: 'security/'

  # Chore scope patterns
  chore:
    keywords: ['update', 'cleanup', 'remove', 'cleanup', 'organize', 'configure']
    pattern_priority: 3
    branch_prefix: 'chore/'

# Context-aware detection
context_awareness:
  - check_active_branches: true # Is there already a branch with similar keywords?
  - check_open_prs: true # Any open PR for this scope?
  - check_issue_labels: true # Related issue with labels?
  - related_files_threshold: 0.7 # % of files already touched in current branch

# Multi-scope detection
multi_scope_handling:
  - if: 'request_has_multiple_scopes'
    then: 'create_separate_branches_and_ask_user'
    example: |
      Request: "Add dark mode AND fix sidebar bug AND update docs"
      Response: "I detected 3 scopes. Creating:
        - feature/dark-mode-toggle
        - fix/sidebar-bug
        - docs/dark-mode-guide
      Which should I focus on first?"
```

### 1.4 Branch Naming Convention (Scope-Based)

Format: `{type}/{issue-number}-{slug}`

```
feature/123-dark-mode-toggle
fix/124-image-loading-error
refactor/125-extract-header-component
docs/126-getting-started-guide
test/127-add-form-validation-tests
perf/128-reduce-bundle-size
security/129-fix-xss-vulnerability
chore/130-update-dependencies
```

---

## Part 2: Automated Branch Management

### 2.1 GitHub Actions: Automatic Branch Creation

**Workflow File**: `.github/workflows/auto-branch-create.yml`

```yaml
name: Auto Create Branch on New Scope

on:
  workflow_dispatch:
    inputs:
      request:
        description: 'What do you want to build?'
        required: true
        type: string
      scope_type:
        description: 'Scope type (auto-detected or override)'
        required: false
        type: choice
        options:
          - auto
          - feature
          - bugfix
          - refactor
          - docs
          - test
          - perf
          - security
          - chore

jobs:
  detect_and_create:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: read
    steps:
      # 1. Detect scope using Copilot-powered logic
      - name: Detect Scope Type
        id: detect
        run: |
          REQUEST="${{ github.event.inputs.request }}"
          SCOPE_TYPE="${{ github.event.inputs.scope_type }}"

          # If scope_type is 'auto', detect it
          if [ "$SCOPE_TYPE" = "auto" ]; then
            # Pattern matching logic (simplified)
            case "$REQUEST" in
              *"add"*|*"new"*|*"create"*|*"implement"*)
                SCOPE_TYPE="feature"
                ;;
              *"fix"*|*"bug"*|*"issue"*|*"error"*)
                SCOPE_TYPE="bugfix"
                ;;
              *"refactor"*|*"improve"*|*"extract"*)
                SCOPE_TYPE="refactor"
                ;;
              *"document"*|*"write"*|*"readme"*)
                SCOPE_TYPE="docs"
                ;;
              *"test"*|*"coverage"*|*"unit"*)
                SCOPE_TYPE="test"
                ;;
              *"optimize"*|*"perf"*|*"speed"*)
                SCOPE_TYPE="perf"
                ;;
              *"security"*|*"vulnerability"*|*"auth"*)
                SCOPE_TYPE="security"
                ;;
              *)
                SCOPE_TYPE="chore"
                ;;
            esac
          fi

          echo "scope_type=$SCOPE_TYPE" >> $GITHUB_OUTPUT

          # Generate branch slug from request
          SLUG=$(echo "$REQUEST" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/ /-/g' | cut -c1-30)
          echo "branch_slug=$SLUG" >> $GITHUB_OUTPUT

          # Get next issue number (for reference)
          ISSUE_NUM=$(curl -s -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
            https://api.github.com/repos/${{ github.repository }}/issues?state=all&per_page=1 \
            | jq '.[0].number + 1' | tr -d '\n')
          echo "issue_number=$ISSUE_NUM" >> $GITHUB_OUTPUT

      # 2. Check if branch already exists
      - name: Check Existing Branch
        id: check
        run: |
          BRANCH="${{ steps.detect.outputs.scope_type }}/${{ steps.detect.outputs.issue_number }}-${{ steps.detect.outputs.branch_slug }}"

          if git rev-parse "origin/$BRANCH" >/dev/null 2>&1; then
            echo "exists=true" >> $GITHUB_OUTPUT
            echo "branch=$BRANCH" >> $GITHUB_OUTPUT
          else
            echo "exists=false" >> $GITHUB_OUTPUT
            echo "branch=$BRANCH" >> $GITHUB_OUTPUT
          fi
        env:
          GIT_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # 3. Create branch if it doesn't exist
      - name: Create New Branch
        if: steps.check.outputs.exists == 'false'
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Initialize New Branch
        if: steps.check.outputs.exists == 'false'
        run: |
          git config user.name "GitHub Copilot Agent"
          git config user.email "copilot@github.local"

          BRANCH="${{ steps.check.outputs.branch }}"
          REQUEST="${{ github.event.inputs.request }}"
          SCOPE_TYPE="${{ steps.detect.outputs.scope_type }}"

          # Create branch from main
          git fetch origin
          git checkout -b "$BRANCH" origin/main

          # Create initial context file
          mkdir -p .github/branch-context
          cat > ".github/branch-context/$BRANCH.md" << EOF
          # Branch Context: $BRANCH

          **Created**: $(date -u +'%Y-%m-%d %H:%M:%S UTC')
          **Scope Type**: $SCOPE_TYPE
          **Request**: $REQUEST
          **Branch**: $BRANCH

          ## Tasks
          - [ ] Development complete
          - [ ] Tests passing
          - [ ] Code review requested
          - [ ] PR merged

          ## Related Issues/PRs
          - Auto-detected via scope analysis

          ## Notes
          - Started by Copilot Agent
          - Context auto-detected from request
          EOF

          # Commit context file
          git add ".github/branch-context/$BRANCH.md"
          git commit -m "chore: initialize branch context for $BRANCH"

          # Push new branch
          git push origin "$BRANCH"

          echo "✅ Branch created: $BRANCH"

      # 4. Notify user
      - name: Create PR Description Template
        if: success()
        run: |
          BRANCH="${{ steps.check.outputs.branch }}"
          REQUEST="${{ github.event.inputs.request }}"
          SCOPE_TYPE="${{ steps.detect.outputs.scope_type }}"

          echo "🎯 **New Scope Detected & Branch Created**"
          echo ""
          echo "- **Type**: $SCOPE_TYPE"
          echo "- **Branch**: \`$BRANCH\`"
          echo "- **Request**: $REQUEST"
          echo ""
          echo "Next steps:"
          echo "1. Switch to branch: \`git checkout $BRANCH\`"
          echo "2. Make your changes"
          echo "3. Push: \`git push origin $BRANCH\`"
          echo "4. Copilot will automatically detect when PR should be opened"
```

### 2.2 Manual Trigger Command

Add to package.json scripts:

```json
{
  "scripts": {
    "new-task": "gh workflow run auto-branch-create.yml -f request='$DESCRIPTION' -f scope_type=auto",
    "new-feature": "gh workflow run auto-branch-create.yml -f request='$1' -f scope_type=feature",
    "new-bug": "gh workflow run auto-branch-create.yml -f request='$1' -f scope_type=bugfix",
    "new-docs": "gh workflow run auto-branch-create.yml -f request='$1' -f scope_type=docs"
  }
}
```

Usage:

```bash
npm run new-task "Add dark mode toggle to header"
# → Auto-detects scope, creates feature/XXX-dark-mode-toggle branch
```

---

## Part 3: Workspace Instructions for Scope-Aware Copilot

### 3.1 Agent Instructions: `.github/agents/dev-agent.yaml`

```yaml
name: Development Agent
description: Autonomous development on assigned branch

capabilities:
  - write_code
  - run_tests
  - commit_changes
  - push_to_branch
  - create_pr

rules:
  - before_starting: 'Read .github/branch-context/{current-branch}.md'
  - track_scope: 'Never mix scopes in single commit or branch'
  - validate_before_push: 'Always run: npm run validate'
  - commit_message: 'Follow Conventional Commits: {type}({scope}): {description}'
  - auto_detect_complete: |
      If changes solve the original request:
        1. Run full test suite
        2. Create PR with auto-generated description
        3. Notify Review Agent
        4. Wait for approval

scope_awareness:
  current_scope: 'Detected from branch name and context file'
  scope_change_detection: |
    If user request is different from current scope:
      1. Confirm scope change
      2. Stash current work (optionally)
      3. Suggest creating new branch
      4. Switch to appropriate branch
  multi_task_handling: |
    Can manage multiple branches simultaneously:
      • Main development branch
      • Active PR (in review)
      • Hotfix branch
      Tracks context for each via .github/branch-context/{branch}.md

context_preservation:
  - saves_state_to_file: '.github/branch-context/{branch}.md'
  - tracks_completed_tasks: 'Updates TODO list in context file'
  - maintains_git_history: 'Preserves atomic commits'
```

### 3.2 Agent Instructions: `.github/agents/review-agent.yaml`

```yaml
name: Review Agent
description: Autonomous PR review, approval, and merge

capabilities:
  - review_code
  - request_changes
  - approve_pr
  - merge_pr
  - leave_comments
  - auto_dismiss_stale_reviews

review_criteria:
  - passes_ci: 'All GitHub Actions workflows pass'
  - tests_coverage: 'No regression in test coverage'
  - code_quality: 'Linters and type checks pass'
  - documentation: 'Changes documented (if applicable)'
  - follows_conventions: 'Conventional Commits, code style'
  - security: 'No security vulnerabilities introduced'

approval_logic:
  - check_all_criteria: true
  - if_all_pass: 'Approve and merge (squash or rebase)'
  - if_some_fail: 'Request changes with specific comments'
  - if_critical_fail: 'Block merge, escalate to human review'

comment_strategy:
  - add_inline_comments: 'For specific code issues'
  - add_review_summary: 'Overall assessment and checklist'
  - suggest_improvements: 'Optimization, best practice ideas'
  - tag_reviewers: 'If human review needed'

auto_merge_conditions:
  - all_checks_pass: true
  - pr_type: 'feature|bugfix|refactor|docs|test|perf|chore'
  - exclude_security: 'Security changes always require human review'
  - notification: 'Sends merge notification to user'
```

---

## Part 4: AI-Powered Scope Detection Engine

### 4.1 Custom Scope Analyzer (JavaScript/Node)

**File**: `scripts/scope-analyzer.js`

```javascript
const scopePatterns = {
  feature: {
    keywords: ['add', 'create', 'new', 'implement', 'build', 'enable', 'introduce'],
    weight: 10,
  },
  bugfix: {
    keywords: ['fix', 'bug', 'resolve', 'broken', 'issue', 'error', 'crash', 'broken'],
    weight: 9,
  },
  refactor: {
    keywords: ['refactor', 'improve', 'simplify', 'extract', 'reorganize', 'restructure'],
    weight: 8,
  },
  docs: {
    keywords: ['document', 'write', 'readme', 'guide', 'tutorial', 'explain', 'comment'],
    weight: 7,
  },
  test: {
    keywords: ['test', 'unit', 'coverage', 'verify', 'validate', 'check', 'assert'],
    weight: 6,
  },
  perf: {
    keywords: ['optimize', 'performance', 'speed', 'slow', 'bundle', 'render', 'memory'],
    weight: 5,
  },
  security: {
    keywords: ['security', 'vulnerability', 'auth', 'token', 'csrf', 'xss', 'inject'],
    weight: 4,
  },
  chore: {
    keywords: ['update', 'cleanup', 'remove', 'organize', 'configure', 'setup'],
    weight: 3,
  },
};

class ScopeAnalyzer {
  analyzeRequest(request) {
    const requestLower = request.toLowerCase();
    const scores = {};

    // Score each scope type
    Object.entries(scopePatterns).forEach(([scope, config]) => {
      let score = 0;
      config.keywords.forEach((keyword) => {
        // Exact word match gets higher score
        if (requestLower.includes(` ${keyword}`) || requestLower.startsWith(keyword)) {
          score += config.weight * 1.5;
        }
        // Partial match
        if (requestLower.includes(keyword)) {
          score += config.weight;
        }
      });
      scores[scope] = score;
    });

    // Get highest scoring scope
    const detectedScope = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];

    return {
      scope: detectedScope,
      confidence: scores[detectedScope] / 10, // 0-1 scale
      scores: scores,
      allScores: scores,
    };
  }

  generateBranchSlug(request) {
    return request
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(/\s+/)
      .join('-')
      .substring(0, 40);
  }

  generateBranchName(request, issueNumber = null) {
    const { scope } = this.analyzeRequest(request);
    const slug = this.generateBranchSlug(request);
    const num = issueNumber || 'auto';
    return `${scope}/${num}-${slug}`;
  }
}

// CLI usage
if (require.main === module) {
  const analyzer = new ScopeAnalyzer();
  const request = process.argv[2] || 'Add dark mode toggle';
  const result = analyzer.analyzeRequest(request);
  console.log('Scope Analysis:', result);
  console.log('Suggested Branch:', analyzer.generateBranchName(request, 123));
}

module.exports = ScopeAnalyzer;
```

Usage:

```bash
node scripts/scope-analyzer.js "Add dark mode toggle to header"
# Output:
# Scope Analysis: { scope: 'feature', confidence: 0.95, scores: {...} }
# Suggested Branch: feature/123-add-dark-mode-toggle-to-header
```

---

## Part 5: Streamlined Chat Interface

### 5.1 Chat Agent Integration

**Create `.agent.md` in repo root**:

```yaml
---
type: agent
name: Portfolio Autonomous Workflow
description: Creates branches, manages scopes, reviews PRs automatically
enabled: true
---

# Autonomous Portfolio Workflow Agent

You are an autonomous development agent for the portfolio project. Your responsibilities:

## 1. Scope Detection (Always First)

When user makes a request:
1. Analyze if it's a NEW SCOPE or CONTINUATION of existing scope
2. If NEW SCOPE:
   - Suggest new branch name (use format: `{type}/{number}-{slug}`)
   - Ask user to confirm scope
   - Create branch via `npm run new-task "request"`
3. If CONTINUATION:
   - Work on existing branch
   - Track context in `.github/branch-context/{branch}.md`

## 2. Context Switching

If user request is different from active branch:
- Option 1: "Should I create a new branch for this, or continue on current branch?"
- Option 2: (After user confirmation) Stash current work → Create new branch → Switch
- Option 3: Maintain state in branch context files

## 3. Multi-Branch Management

Can work on multiple branches:
- Keep track of active branches
- Save progress in `.github/branch-context/`
- Switch seamlessly without losing context
- Suggest merging when ready

## 4. PR Management

When changes are ready:
1. Ensure all tests pass: `npm run validate`
2. Create PR with AI-generated description
3. Request review from Review Agent
4. Monitor CI/CD checks
5. Merge when approved

## 5. Review Work (Secondary Agent)

- Review all PRs automatically
- Check against code quality standards
- Request changes if needed
- Auto-merge when all criteria pass
- Leave actionable comments

## Communication Protocol

- **User says**: "Add dark mode"
  - **Agent detects**: Feature scope
  - **Agent suggests**: "Creating branch `feature/132-dark-mode-toggle`. Start work?"
  - **Agent proceeds**: Creates branch → updates context → starts development

- **User says** (while on branch A): "Fix sidebar bug"
  - **Agent detects**: Different scope (bugfix vs feature)
  - **Agent asks**: "Detected new scope. Create new branch or continue?"
  - **Agent handles**: Stashes work A → Creates branch B → Works on bug

- **User says**: "Done with dark mode"
  - **Agent detects**: Work complete (context file updated)
  - **Agent suggests**: "Push changes? Create PR? Auto-review ready."
  - **Agent finalizes**: Commits → Pushes → Creates PR → Auto-reviews → (Optionally merges)

## Success Criteria

✅ Zero manual branch management
✅ Seamless scope switching
✅ All PRs auto-reviewed
✅ Full test coverage maintained
✅ Context never lost
```

---

## Part 6: Complete Implementation Example

### 6.1 Step-by-Step Workflow

**Scenario**: User is working on Portfolio project

```yaml
# User: "Add lazy loading to case studies"
#   ↓ Copilot Scope Detection
#   → Detects: FEATURE scope (new)
#   → Branch: feature/dark-mode-toggle
#   → Asks: Confirm?

# User: "Yes, proceed"
#   ↓ Automated Branch Creation
#   → Creates branch feature/131-lazy-load-cases
#   → Creates context file .github/branch-context/feature/131-lazy-load-cases.md
#   → Notifies: "Ready to code. Running dev server..."

# User: "Start development"
#   ↓ Development Agent Active
#   → Modifies: src/app/components/CaseStudyPage.tsx
#   → Adds: lazy() import, dynamic component loading
#   → Runs: npm run validate ✓
#   → Commits: feat(components): add lazy-loading to case studies
#   → Pushes: origin feature/131-lazy-load-cases

# User: "Done"
#   ↓ Review Agent Active
#   → Runs: Full test suite ✓
#   → Runs: Build validation ✓
#   → Creates: PR with auto-generated description
#   → Reviews: Code quality, security, coverage ✓
#   → Approves: PR automation-ready

# Result: PR ready for human review (or auto-merged if enabled)
```

### 6.2 Switching Scopes Mid-Work

```yaml
# Scenario: Working on feature, user mentions bug

# Current state:
#   → Branch: feature/131-lazy-load-cases
#   → Work: 60% complete
#   → Files modified: CaseStudyPage.tsx

# User: "Oh, sidebar isn't working on mobile"
#   ↓ Scope Detection
#   → Detects: BUGFIX scope
#   → Current scope: FEATURE (different)
#   → Asks: "New scope detected. Options:
#       1. Stash current work → Create fix/mobile-sidebar
#       2. Continue on feature branch
#       3. Open both in separate windows (local)"

# User: "Stash and fix bug"
#   ↓ Automatic Task Switching
#   → Stashes: feature/131 work (git stash save)
#   → Creates: fix/132-mobile-sidebar-issue
#   → Switches: git checkout fix/132-mobile-sidebar-issue
#   → Loads: Context from .github/branch-context/fix/132-mobile-sidebar-issue.md
#   → Status: "Ready to fix sidebar bug. Describe the issue?"

# User: "Sidebar nav collapsed on mobile"
#   ↓ Development on fix branch
#   [Make changes, test, commit]
#
# Work complete on bugfix
#   → Creates PR for fix/132
#   → Auto-reviews & merges (if enabled)
#   → Asks: "Ready to return to feature/131?"

# User: "Yes"
#   ↓ Return to Original Scope
#   → Switches: git checkout feature/131-lazy-load-cases
#   → Restores: git stash pop
#   → Status: "Back on feature/131. 60% complete. Continue where you left off?"
```

---

## Part 7: Configuration Files

### 7.1 `.github/workflows/auto-pr-review.yml`

```yaml
name: Automated PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install Dependencies
        run: npm ci

      - name: Run Validation
        id: validate
        run: |
          npm run lint && echo "lint=pass" >> $GITHUB_OUTPUT || echo "lint=fail" >> $GITHUB_OUTPUT
          npm run type-check && echo "types=pass" >> $GITHUB_OUTPUT || echo "types=fail" >> $GITHUB_OUTPUT
          npm run test -- --run && echo "tests=pass" >> $GITHUB_OUTPUT || echo "tests=fail" >> $GITHUB_OUTPUT
          npm run build && echo "build=pass" >> $GITHUB_OUTPUT || echo "build=fail" >> $GITHUB_OUTPUT

      - name: Generate Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = context.issue.number;
            const lintStatus = '${{ steps.validate.outputs.lint }}' === 'pass' ? '✅' : '❌';
            const typesStatus = '${{ steps.validate.outputs.types }}' === 'pass' ? '✅' : '❌';
            const testsStatus = '${{ steps.validate.outputs.tests }}' === 'pass' ? '✅' : '❌';
            const buildStatus = '${{ steps.validate.outputs.build }}' === 'pass' ? '✅' : '❌';

            const body = `
## 🤖 Automated Code Review

| Check | Status |
|-------|--------|
| Lint | ${lintStatus} |
| Type Check | ${typesStatus} |
| Tests | ${testsStatus} |
| Build | ${buildStatus} |

All checks must pass before merge.
            `;

            github.rest.issues.createComment({
              issue_number: prNumber,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: body
            });

      - name: Auto-Approve if All Pass
        if: steps.validate.outputs.lint == 'pass' && steps.validate.outputs.types == 'pass' && steps.validate.outputs.tests == 'pass' && steps.validate.outputs.build == 'pass'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.pulls.createReview({
              pull_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              event: 'APPROVE',
              body: '✅ All automated checks passed. Ready to merge!'
            });

      - name: Request Changes if Any Fail
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.pulls.createReview({
              pull_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              event: 'REQUEST_CHANGES',
              body: '❌ Some checks failed. Please review the logs and fix issues.'
            });
```

### 7.2 `.github/workflows/auto-merge.yml`

```yaml
name: Auto-Merge on Approval

on:
  pull_request_review:
    types: [submitted]

jobs:
  merge:
    runs-on: ubuntu-latest
    if: github.event.review.state == 'APPROVED'
    permissions:
      pull-requests: write
      contents: write
    steps:
      - name: Merge PR
        uses: actions/github-script@v7
        with:
          script: |
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            });

            // Check if all reviews are approvals
            const { data: reviews } = await github.rest.pulls.listReviews({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            });

            const approvals = reviews.filter(r => r.state === 'APPROVED').length;
            const requestedChanges = reviews.filter(r => r.state === 'CHANGES_REQUESTED').length;

            if (requestedChanges === 0 && approvals >= 1) {
              await github.rest.pulls.merge({
                owner: context.repo.owner,
                repo: context.repo.repo,
                pull_number: context.issue.number,
                merge_method: 'squash'
              });
              
              console.log(`✅ PR #${context.issue.number} automatically merged`);
            }
```

---

## Part 8: Quick Start Guide

### 8.1 Setup Installation

```bash
# 1. Copy agent files to .github/agents/
cp scripts/agents/*.yaml .github/agents/

# 2. Install scope analyzer
npm install scope-analyzer-js

# 3. Create branch context directory
mkdir -p .github/branch-context

# 4. Enable GitHub Actions workflows
# (.github/workflows/ files auto-discovered)

# 5. Create .agent.md manifest
cat > .agent.md << 'EOF'
---
type: agent
name: Portfolio Autonomous Workflow
---
# [content from 5.1 above]
EOF

# 6. Configure GitHub token for CLI
gh auth login

# 7. Test scope detection
node scripts/scope-analyzer.js "Add dark mode toggle"
```

### 8.2 First Autonomous Workflow

```bash
# Start dev server
npm run dev

# In another terminal, trigger new task
npm run new-task "Add dark mode toggle to header"

# Or use GitHub CLI directly
gh workflow run auto-branch-create.yml \
  -f request="Add dark mode toggle to header" \
  -f scope_type=auto

# Watch it create branch, set up context, and ask what's next
```

---

## Part 9: Best Practices & Guardrails

### 9.1 Recommended Rules

```yaml
rules:
  scope_isolation:
    - One scope per branch (strict)
    - Never mix feature + bugfix + docs in single branch
    - Exception: Related documentation for feature

  context_preservation:
    - Always save to .github/branch-context/{branch}.md
    - Track: completed tasks, decisions, blockers
    - Review before switching branches

  commit_atomicity:
    - Each commit solves one problem
    - Test before committing
    - Use conventional commits strictly

  branch_cleanup:
    - Delete merged branches monthly
    - Archive context files to docs/history/
    - Keep last 10 active branch contexts

  security:
    - Security scope always requires human review
    - Never auto-merge security changes
    - Flag if vulnerability keywords detected

  scale:
    - Support up to 10 concurrent branches
    - Preserve context for each
    - Prevent accidental merges to main

  fallback:
    - If auto-detection confidence < 60%, ask user
    - If tests fail, block merge (manual review)
    - If merge conflict, require human resolution
```

### 9.2 Failure Scenarios

| Scenario                       | Behavior                                  |
| ------------------------------ | ----------------------------------------- |
| Scope detection ambiguous      | Ask user for clarification                |
| Multiple scopes detected       | Suggest separate branches                 |
| Tests fail on PR               | Block merge, request manual review        |
| Security vulnerability found   | Flag, require human approval              |
| Merge conflict                 | Stop, ask user to resolve                 |
| Branch already exists          | Alert user, offer to continue on existing |
| User switches context 3+ times | Suggest completing current task first     |

---

## Summary: Autonomous Workflow Benefits

✅ **Zero Manual Branch Management** — Branches created automatically based on scope  
✅ **Seamless Context Switching** — Work on multiple tasks without losing progress  
✅ **Automatic PR Review** — Every PR reviewed before human sees it  
✅ **No Context Loss** — Context preserved in branch configuration files  
✅ **Smart Merging** — Auto-merge when ready, with human override  
✅ **Scale Management** — Handle 10+ concurrent branches effortlessly  
✅ **Audit Trail** — Full git history + context files = complete record

---

## Next Steps

1. **Review this plan** — Align with team on scope patterns
2. **Configure agents** — Copy `.yaml` files to `.github/agents/`
3. **Set up workflows** — Enable GitHub Actions automation
4. **Test with pilot task** — Run one autonomous workflow end-to-end
5. **Iterate & refine** — Gather feedback, adjust detection rules
6. **Scale gradually** — Increase automation as team gets comfortable
