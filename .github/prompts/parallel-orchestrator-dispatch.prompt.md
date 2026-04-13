---
name: Parallel Orchestrator Dispatch
description: 'Dispatch a request through the Orchestrator Parent with parallel subagent execution, model-aware routing, and unified synthesis.'
agent: 'Orchestrator Parent'
model: ['GPT-5 (copilot)', 'Claude Sonnet 4.5 (copilot)']
argument-hint: 'Goal, constraints, acceptance criteria, and expected output format.'
---

Orchestrate the following request using parallel subagents whenever subtasks are independent.

User request:

{{input}}

Execution requirements:

- Decompose into independent streams first.
- Run streams concurrently whenever safe.
- Route each stream to the most appropriate subagent.
- Keep the parent focused on arbitration and synthesis.
- Return one consolidated answer with risks and next actions.

Output sections:

1. Objective
2. Parallel streams and routing
3. Consolidated result
4. Risks and assumptions
5. Next actions
