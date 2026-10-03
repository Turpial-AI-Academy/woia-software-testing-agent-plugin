# Risk Model

## Purpose

Scale testing depth to what could materially go wrong.

Use qualitative evidence from the repository, specification, review, change diff, production context, and caller. Do not invent a universal numeric score when the project has no such policy.

## Risk dimensions

Consider only dimensions relevant to the change.

### Blast radius

How many modules, consumers, workflows, tenants, platforms, or deployment units can be affected?

### Contract exposure

Does the change alter APIs, tools, schemas, events, CLI behavior, persisted formats, protocols, or integration contracts?

### State and data

Can it corrupt, lose, duplicate, reorder, leak, or incorrectly migrate state/data?

### Security and privacy

Does it touch authorization, authentication, secrets, permissions, trust boundaries, untrusted input, personal/sensitive data, filesystem/network boundaries, or privilege?

### Migration and compatibility

Are old/new versions, persisted states, clients, rolling upgrades, rollback, or backward/forward compatibility involved?

### Concurrency and timing

Are races, retries, idempotency, scheduling, ordering, timeouts, eventual consistency, clock behavior, or parallelism material?

### External integration

Does correctness depend on a database, queue, provider, browser, OS, network API, hardware, or third-party service?

### Operational criticality

Would failure materially affect availability, recovery, billing, data integrity, compliance, deployment, or another critical path?

### Change novelty and complexity

Is the change structurally new, cross-cutting, algorithmically complex, generated, reflective/dynamic, or difficult to observe through existing tests?

### Defect history

Has this surface failed before, been flaky, or required regressions? Existing defect history raises evidence needs for that specific surface.

## Evidence depth

Use the repository's own severity/risk vocabulary when available. Otherwise describe risk plainly.

A practical qualitative mapping is:

### Localized/lower material risk

Typical evidence may be:

- focused unit/contract/regression test;
- directly affected suite;
- relevant static/build check.

Do not run broad suites merely for ceremony.

### Moderate/cross-module risk

Typical evidence may add:

- integration coverage across affected boundaries;
- negative/error cases;
- broader affected suite;
- smoke of the changed workflow.

### High/critical risk

Typical evidence may add, as relevant:

- real integration or representative emulator;
- E2E workflow;
- security/migration/recovery/concurrency/performance tests;
- compatibility/rollback checks;
- repeated or environment-diverse evidence when nondeterminism/platform variance is a material risk.

"More tests" is not the goal. Evidence must target the identified failure modes.

## Risk-to-evidence record

For each material risk record:

| Risk | Why material | Failure mode | Evidence selected | Result | Residual risk |
|---|---|---|---|---|---|
| Example | Contract consumed externally | Field shape changes | Contract + integration test | PASS | None known |

If a material risk has no executable evidence, record the reason and decide whether that gap makes the result `TESTING_BLOCKED` or `EVIDENCE_INCOMPLETE`.

## Anti-patterns

- treating file count or diff size as the only risk signal;
- assigning numeric severity without project policy;
- running the full suite to avoid thinking about risk;
- skipping broad evidence for a high-blast-radius change because focused tests are green;
- requiring expensive E2E for a local pure function with complete deterministic evidence;
- equating code coverage with behavioral/risk coverage.
