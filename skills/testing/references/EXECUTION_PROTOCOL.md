# Execution Protocol

## 1. Preflight

Before final execution, record:

- repository/source root;
- current branch/ref;
- exact source HEAD;
- dirty state;
- reviewed source HEAD when supplied;
- test/runtime/tool prerequisites;
- relevant environment configuration without exposing secrets.

If a required reviewed HEAD is already different from the current candidate, return `SOURCE_HEAD_MISMATCH` before treating testing as final evidence.

## 2. Establish baseline when needed

A baseline run is useful when:

- the repository is already known to have failures;
- the changed surface has known flakiness;
- environment failures could be confused with candidate failures;
- comparison to the base branch materially helps attribution.

Do not require baseline runs for every healthy repository.

## 3. Execute focused evidence

First inventory and independently inspect durable execution records for the exact candidate, applicable environment, and acceptance/risk scope. Follow [TRACEABILITY_AND_EVIDENCE.md](TRACEABILITY_AND_EVIDENCE.md) when lineage is unclear or a required gate has missing durable evidence. Reuse records that already prove unchanged behavior; execute checks with missing/unverifiable/invalidated evidence plus repository-required final-candidate invariants.

Prose claims or recollection from Development or Code Review do not establish execution. Testing owns the independent gate decision. Preserve unaffected evidence/artifacts and record original execution references and reuse decisions; a phase transition alone does not require another run.

Run the tests that most directly prove/disprove the acceptance criterion, regression, contract, edge case, or risk.

Capture exact commands. Do not paraphrase a command that was not actually run.

## 4. Expand proportionally

Run directly affected suites and broader checks according to [RISK_MODEL.md](RISK_MODEL.md) and [TEST_SELECTION.md](TEST_SELECTION.md).

A full suite is justified when the change can affect broad behavior or when the repository already defines it as the appropriate gate. It is not mandatory merely because the command exists.

## 5. Handle failures causally

For each failure:

1. identify the first meaningful failing behavior;
2. determine whether it is candidate-caused, test-caused, environment-caused, pre-existing, flaky, or unclear;
3. preserve the exact output needed for diagnosis;
4. do not suppress or weaken assertions to obtain green;
5. if a fix is authorized, add/retain regression protection.

## 6. Handle flakiness

A test that alternates pass/fail under equivalent conditions is not reliable PASS evidence.

Do not use "rerun until green" as resolution.

Investigate:

- shared mutable state;
- uncontrolled time/randomness;
- order dependence;
- races;
- external service instability;
- environment/resource contention;
- stale caches/build artifacts.

If the cause cannot be resolved within scope, report remaining flakiness and decide whether it blocks the required evidence.

## 7. Source mutation boundary

Testing execution should be read-only with respect to tracked source unless test/bugfix edits are explicitly authorized.

After any tracked-source mutation:

- obtain a new committed HEAD before final evidence;
- invalidate testing evidence from the previous HEAD as final proof;
- if code review approved the old HEAD, invalidate ASPS gate eligibility;
- return `SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED`;
- after review refresh, rerun the affected testing evidence on the new reviewed HEAD.

Generated build/test output ignored by Git does not by itself change source identity, but unexpected tracked-file mutation is a hard stop.

## 8. Final head verification

At the end of final execution:

1. resolve HEAD again;
2. inspect source status according to repository policy;
3. verify the tested HEAD did not change;
4. verify the results being reported belong to that HEAD;
5. for ASPS, compare reviewed and tested HEAD exactly.

If current HEAD differs from the execution anchor, do not emit `TESTING_PASS`.

## 9. External/live tests

Use live dependencies only when needed to prove a material integration risk and when authorization/environment permit it.

Record:

- dependency/environment identity at a safe level;
- whether data is synthetic/test-only;
- prerequisites;
- cleanup;
- any nondeterministic external condition affecting interpretation.

Never expose credentials in evidence.

## 10. Final status

Choose one:

- `TESTING_PASS`;
- `TESTING_FAIL`;
- `TESTING_BLOCKED`;
- `EVIDENCE_INCOMPLETE`;
- `SOURCE_HEAD_MISMATCH`;
- `SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED`.

Report ASPS gate eligibility separately. A standalone `TESTING_PASS` without review evidence can be valid testing evidence but is not sufficient by itself to claim the ASPS `testing/v1` transition gate.
