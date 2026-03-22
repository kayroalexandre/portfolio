#!/usr/bin/env node

const fs = require('node:fs');

// Hooks can ignore stdin safely for simple policy-injection behavior.
try {
  fs.readFileSync(0, 'utf8');
} catch {
  // noop
}

const output = {
  continue: true,
  systemMessage:
    'Default policy: prioritize the "Orchestrator Parent" agent. Decompose work into independent streams and run subagents in parallel whenever possible. Keep parent on the most advanced model and route subagents by task specialization.',
};

process.stdout.write(JSON.stringify(output));
