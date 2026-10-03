# Testing Evidence

## 1. Source identity

- Repository/source:
- Branch/ref:
- Tested source HEAD:
- Reviewed source HEAD:
- HEAD match: `true | false | not_provided`
- ASPS `testing/v1` gate eligible: `true | false`

## 2. Specification / task

- SPEC/task reference:
- Scope:
- Non-goals:

## 3. Risk

| Risk | Why material | Failure mode | Evidence selected | Residual risk |
|---|---|---|---|---|

## 4. Traceability

| ID | Criterion / contract / risk | Test/procedure | Command | Result | Evidence |
|---|---|---|---|---|---|

## 5. Execution

| Command / procedure | Exact source HEAD / environment | Scope | Result | Durable log / artifact | Disposition |
|---|---|---|---|---|---|

### Evidence reuse and freshness

- Reused execution records and original command/result/artifact references:
- Independent candidate/environment/scope applicability decision:
- Freshly executed checks:
- Invalidated evidence, reason, and affected reruns:
- Unaffected valid evidence/artifacts preserved:
- Assumptions or prose without execution proof (not PASS evidence):

Use `REUSED_CURRENT`, `INVALIDATED`, `EXECUTED_CURRENT`, or `ASSUMPTION`. Testing owns the independent gate decision. Record reused results with their original execution identity; do not claim they were freshly executed. The machine-readable handoff can record these details in its existing `executions` and `traceability` entries without changing the v1 envelope.

## 6. Failures / blockers / skips

- Candidate failures:
- Pre-existing failures:
- Blocked checks:
- Skipped checks and rationale:
- Flaky evidence:

## 7. Source mutation during testing

- Tracked source changed: `yes | no`
- Old HEAD:
- New HEAD:
- Review refresh required: `yes | no`

## 8. Acceptance-criteria reconciliation

- PROVEN:
- DISPROVEN:
- BLOCKED:
- NOT_COVERED:
- NOT_APPLICABLE:

## 9. Remaining risk

- Uncovered/accepted risks:
- Required owner/product decisions:

## 10. Result

Status: `TESTING_PASS | TESTING_FAIL | TESTING_BLOCKED | EVIDENCE_INCOMPLETE | SOURCE_HEAD_MISMATCH | SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED`

Rationale:
