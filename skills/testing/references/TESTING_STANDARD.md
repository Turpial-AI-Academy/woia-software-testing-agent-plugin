# Testing Standard

## Objective

Produce the minimum sufficient current evidence that the tested software behavior satisfies its specification and material risk expectations on one exact source HEAD.

Testing quality is not measured by test count, code-coverage percentage, or framework choice alone.

~~~text
BEHAVIOR + RISK + TRACEABILITY + CURRENT EXECUTION + EXACT HEAD
> CEREMONY
~~~

## Core invariants

### 1. Exact candidate identity

Testing evidence belongs to one exact source state.

Record a commit SHA or equivalent immutable source identity before executing final evidence. Verify the same identity before reporting.

For ASPS `testing/v1`, the reviewed source identity and tested source identity must match exactly.

### 2. Specification-derived evidence

Every material test should protect at least one of:

- acceptance criterion;
- public or persisted contract;
- regression;
- edge case;
- failure/recovery path;
- explicit risk.

A test with no clear behavior/risk purpose is weak evidence even when it passes.

### 3. Risk proportionality

More material risk requires deeper evidence. Low-risk localized change does not automatically need E2E, security, migration, or performance testing. A high-risk contract/state/security change cannot be justified by one narrow unit test simply because that test is green.

Use [RISK_MODEL.md](RISK_MODEL.md).

### 4. Preserve repository conventions

Prefer existing:

- test runner/framework;
- file naming/layout;
- assertions;
- fixtures/helpers;
- mocks/fakes/emulators;
- test data conventions;
- environment setup;
- commands/reporters;
- isolation/cleanup mechanisms.

Introduce new testing machinery only when the current repository cannot produce required evidence reasonably.

### 5. Bug fixes leave regression protection

A bug fix should retain a focused regression test that would detect recurrence.

When demonstrating pre-fix RED behavior is practical, it strengthens evidence. When historical RED cannot be reproduced safely or cheaply, explain the limitation; do not fabricate it.

### 6. Public boundaries get contract evidence

When a change alters a public API, tool, event, schema, persisted payload, CLI, protocol, or other externally consumed shape, use contract-level tests when that boundary can be automatically exercised.

Contract evidence should validate externally meaningful behavior, not internal implementation structure.

### 7. Determinism and isolation

Prefer deterministic, isolated tests where they faithfully prove behavior.

Avoid real APIs, real user data, shared mutable state, wall-clock assumptions, or production services by default. Use a real external system when the integration itself is material to the risk and an authorized test environment exists.

Clean up temporary state and restore changed process/environment/global state using the repository's conventions.

### 8. Fail for behavior, not fragile details

Prefer observable outcomes and stable contracts over private call order, incidental object shape, exact internal implementation, arbitrary timing sleeps, or snapshot churn unless those details are themselves contractual.

### 9. Current evidence only

Historical green runs, another branch, a previous commit, or a pre-mutation candidate are context, not proof of the current HEAD.

Skipped/unavailable checks are not PASS.

### 10. Failures remain visible

Classify test failures using evidence:

- candidate regression/defect;
- test defect;
- environment/tooling blocker;
- known pre-existing failure;
- flaky/non-deterministic behavior;
- unclear/untriaged.

Do not call a failure "unrelated" without comparing baseline/current evidence.

### 11. Independent evidence reuse

Testing owns its gate decision even when Development or Code Review produced a test result. Reuse requires independently inspecting a durable record of actual execution on the exact tested HEAD, with applicable environment, acceptance/risk scope, command, outcome, and artifact/log reference. A prose summary, recollection, or test definition alone does not establish execution.

Reuse still-valid records on a stable candidate; a new session or phase transition does not require replay. Execute checks whose required evidence cannot be established, checks invalidated by changed inputs or failed invariants, and repository-required final-candidate checks. Preserve unaffected evidence and artifacts, and distinguish reused results from newly executed results in the handoff.

## Result semantics

### TESTING_PASS

Use only when:

- tested HEAD is exact and stable;
- required focused evidence passed;
- acceptance criteria and material risks have sufficient evidence;
- blocked/skipped evidence does not leave a material unaccepted gap;
- failures/flakiness are resolved or explicitly outside the candidate with evidence;
- report is reproducible.

For ASPS gate eligibility, reviewed HEAD must equal tested HEAD.

### TESTING_FAIL

Candidate behavior is disproved by valid testing evidence.

### TESTING_BLOCKED

Required evidence cannot be executed because of environment, credentials, service, toolchain, data, or another external blocker.

### EVIDENCE_INCOMPLETE

Execution may be green, but acceptance-criteria/risk coverage is materially incomplete.

### SOURCE_HEAD_MISMATCH

The candidate being tested does not match the required reviewed/caller-provided source identity.

### SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED

Testing work changed tracked source after review. The new source must be reviewed, then testing evidence refreshed on the same final HEAD.

## What this standard does not impose

- 100% or any other universal code-coverage threshold;
- unit-test-first as a universal rule;
- a particular test pyramid;
- a mandatory mock-vs-real ratio;
- a specific framework/runtime;
- one folder naming scheme;
- full-suite execution for every change;
- live E2E testing when deterministic lower-level evidence is sufficient.
