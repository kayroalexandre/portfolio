#!/usr/bin/env node

/**
 * Scope Analyzer - Detects request scope and generates branch names
 * 
 * Usage:
 *   node scripts/scope-analyzer.js "Add dark mode toggle"
 *   npm run scope-analyze "Fix sidebar bug"
 */

const scopePatterns = {
  feature: {
    keywords: [
      "add",
      "create",
      "new",
      "implement",
      "build",
      "enable",
      "introduce",
      "feat",
    ],
    weight: 10,
  },
  bugfix: {
    keywords: [
      "fix",
      "bug",
      "resolve",
      "broken",
      "issue",
      "error",
      "crash",
      "broken",
    ],
    weight: 9,
  },
  refactor: {
    keywords: [
      "refactor",
      "improve",
      "simplify",
      "extract",
      "reorganize",
      "restructure",
      "clean",
    ],
    weight: 8,
  },
  docs: {
    keywords: [
      "document",
      "write",
      "readme",
      "guide",
      "tutorial",
      "explain",
      "comment",
      "doc",
    ],
    weight: 7,
  },
  test: {
    keywords: [
      "test",
      "unit",
      "coverage",
      "verify",
      "validate",
      "check",
      "assert",
    ],
    weight: 6,
  },
  perf: {
    keywords: [
      "optimize",
      "performance",
      "speed",
      "slow",
      "bundle",
      "render",
      "memory",
      "perf",
    ],
    weight: 5,
  },
  security: {
    keywords: [
      "security",
      "vulnerability",
      "auth",
      "token",
      "csrf",
      "xss",
      "inject",
      "safe",
    ],
    weight: 4,
  },
  chore: {
    keywords: [
      "update",
      "cleanup",
      "remove",
      "organize",
      "configure",
      "setup",
      "maintain",
    ],
    weight: 3,
  },
};

class ScopeAnalyzer {
  /**
   * Analyze a request and detect its scope type
   * @param {string} request - The user's request
   * @returns {object} - Analysis result with scope, confidence, and scores
   */
  analyzeRequest(request) {
    const requestLower = request.toLowerCase();
    const scores = {};

    // Score each scope type
    Object.entries(scopePatterns).forEach(([scope, config]) => {
      let score = 0;
      config.keywords.forEach((keyword) => {
        // Exact word match gets higher score (word boundary)
        const exactPattern = new RegExp(`\\b${keyword}\\b`);
        if (exactPattern.test(requestLower)) {
          score += config.weight * 1.5;
        } else if (requestLower.includes(keyword)) {
          // Partial match
          score += config.weight;
        }
      });
      scores[scope] = score;
    });

    // Get highest scoring scope
    const sortedScopes = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const detectedScope = sortedScopes[0][0];
    const maxScore = sortedScopes[0][1];

    // Calculate confidence (0-1 scale, max is total of all weights for a scope)
    const maxPossibleScore = Object.values(scopePatterns).reduce(
      (sum, config) => sum + config.weight * 1.5,
      0
    );
    const confidence = Math.min(maxScore / maxPossibleScore, 1);

    return {
      scope: detectedScope,
      confidence: Number(confidence.toFixed(2)),
      scores: scores,
      recommendation:
        confidence > 0.8
          ? "Confident"
          : confidence > 0.6
            ? "Proceed with confirmation"
            : "Ask user to clarify",
    };
  }

  /**
   * Generate a URL-safe slug from request text
   * @param {string} request - The user's request
   * @returns {string} - Machine-readable slug
   */
  generateBranchSlug(request) {
    const words = request
      .toLowerCase()
      // Remove special characters except spaces
      .replace(/[^a-z0-9\s]/g, "")
      // Split by whitespace
      .split(/\s+/)
      // Filter out empty strings
      .filter((word) => word.length > 0)
      // Limit to first 8 words for reasonable length
      .slice(0, 8)
      // Join with hyphens
      .join("-");

    // Further limit total length to 40 chars
    return words.substring(0, 40);
  }

  /**
   * Generate a full branch name
   * @param {string} request - The user's request
   * @param {number} issueNumber - Optional issue number
   * @returns {string} - Full branch name
   */
  generateBranchName(request, issueNumber = null) {
    const { scope } = this.analyzeRequest(request);
    const slug = this.generateBranchSlug(request);

    // Generate issue number from timestamp if not provided
    const num =
      issueNumber || Math.floor(Date.now() / 1000).toString().slice(-4);

    return `${scope}/${num}-${slug}`;
  }

  /**
   * Get commit message prefix from scope
   * @param {string} request - The user's request
   * @returns {string} - Conventional commit type
   */
  getCommitType(request) {
    const { scope } = this.analyzeRequest(request);
    const commitTypeMap = {
      feature: "feat",
      bugfix: "fix",
      refactor: "refactor",
      docs: "docs",
      test: "test",
      perf: "perf",
      security: "security",
      chore: "chore",
    };
    return commitTypeMap[scope] || "chore";
  }

  /**
   * Format analysis result for display
   * @param {string} request - The user's request
   * @returns {string} - Formatted display string
   */
  format(request) {
    const analysis = this.analyzeRequest(request);
    const branchName = this.generateBranchName(request);
    const commitType = this.getCommitType(request);

    return `
📊 Scope Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 Request: "${request}"

🎯 Detected Scope: ${analysis.scope.toUpperCase()}
   Confidence: ${(analysis.confidence * 100).toFixed(0)}% ${this.getConfidenceEmoji(analysis.confidence)}
   Recommendation: ${analysis.recommendation}

📋 Score Breakdown:
${Object.entries(analysis.scores)
  .sort(([, a], [, b]) => b - a)
  .map(([scope, score]) => `   • ${scope}: ${score.toFixed(1)}`)
  .join("\n")}

🔧 Suggested Configuration:
   Branch: ${branchName}
   Commit Type: ${commitType}
   Context File: .github/branch-context/${branchName}.md

✅ Ready to create branch? (npm run new-task "request" or gh workflow run auto-branch-create)
`;
  }

  getConfidenceEmoji(confidence) {
    if (confidence > 0.8) return "🟢 Very High";
    if (confidence > 0.6) return "🟡 High";
    if (confidence > 0.4) return "🟠 Medium";
    return "🔴 Low";
  }
}

// CLI usage
if (require.main === module) {
  const request = process.argv.slice(2).join(" ");

  if (!request) {
    console.error(`
Usage: node scripts/scope-analyzer.js "Your request description"

Examples:
  node scripts/scope-analyzer.js "Add dark mode toggle"
  node scripts/scope-analyzer.js "Fix image loading bug"
  node scripts/scope-analyzer.js "Optimize bundle size"
    `);
    process.exit(1);
  }

  const analyzer = new ScopeAnalyzer();
  const analysis = analyzer.analyzeRequest(request);

  // Show formatted analysis
  console.log(analyzer.format(request));

  // Also output JSON for programmatic use
  const branchName = analyzer.generateBranchName(request);
  const commitType = analyzer.getCommitType(request);

  console.log("📦 JSON Output (for automation):");
  console.log(
    JSON.stringify(
      {
        request,
        analysis,
        branchName,
        commitType,
      },
      null,
      2
    )
  );
}

module.exports = ScopeAnalyzer;
