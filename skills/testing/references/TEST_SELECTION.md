# Test Selection

## Principle

Select tests from behavior and risk, not from a mandatory pyramid.

Start with the narrowest evidence that can disprove the relevant behavior. Expand only when the changed boundary or material risk requires a wider system.

## Selection triggers

| Change/risk signal | Evidence to consider |
|---|---|
| Small function/normalizer/rule | Unit test |
| Multiple connected modules | Integration test |
| Bug fix | Regression test |
| Public API/tool/schema/event/persisted shape | Contract test |
| Filesystem/permissions/secrets/untrusted input | Security-focused test |
| Persisted-state/schema transformation | Migration/compatibility test |
| Retry/error/restart/failover behavior | Recovery test |
| Logs/metrics/traces/usage/audit behavior | Observability test |
| Latency/throughput/resource budget | Performance test |
| Critical user/system workflow across boundaries | E2E test |
| Basic candidate/startup health | Smoke test |
| Platform/browser/OS-specific behavior | Representative platform test |
| Race/order/idempotency/time behavior | Concurrency/timing test |

This table is a trigger map, not a requirement to create one test of every type.

## Selection procedure

### 1. Map acceptance criteria

For each criterion, identify the observable outcome and lowest reliable test boundary.

One test may cover multiple criteria; one criterion may require multiple tests.

### 2. Map changed contracts

Identify public and persisted boundaries affected by the diff/spec. Prefer contract tests that fail when externally meaningful shape/behavior drifts.

### 3. Map explicit risks and failure modes

Use [RISK_MODEL.md](RISK_MODEL.md). Negative/error cases should target plausible failure modes, not an arbitrary checklist.

### 4. Reuse current evidence

Existing execution evidence may satisfy the evidence plan if:

- they actually exercise the relevant behavior;
- their assertions prove the criterion/risk;
- durable records show actual execution on the exact current candidate in the applicable environment;
- their scope is still representative.

Testing independently inspects the recorded command/result and log/artifact reference before reuse. A test file, Development summary, or reviewer recollection does not prove that execution happened. When proof cannot be established, execute the check. Preserve unaffected valid records; run missing/invalidated checks and required final-candidate invariants. Report reused evidence as reused rather than newly executed or skipped.

Do not add duplicate tests merely to create new files.

### 5. Add missing focused evidence

When evidence is missing and modification is authorized, add the smallest durable test using repository conventions.

For bug fixes, prefer a regression test named/described by the behavior protected rather than the incident implementation detail.

### 6. Choose suite expansion

After focused tests pass, decide whether to run:

- directly affected test file(s);
- affected package/module suite;
- integration suite;
- full repository suite;
- smoke/E2E/security/migration/performance checks.

The wider the blast radius/contract/state risk, the stronger the case for broader evidence.

## Existing failures

When the baseline is not green:

1. capture the known failure before attributing it;
2. compare candidate behavior to baseline when practical;
3. keep candidate-caused failures separate from pre-existing failures;
4. do not let baseline noise hide a new regression;
5. do not require fixing unrelated baseline debt unless it blocks interpretation of the candidate.

## Test quality questions

A selected test is stronger when:

- it would fail if the protected behavior regressed;
- it asserts an externally meaningful result;
- it is deterministic enough for its purpose;
- it isolates state appropriately;
- failure output helps locate the broken behavior;
- it uses representative inputs, including meaningful boundaries/negative cases;
- it does not duplicate stronger existing evidence without reason.

## Avoid

- snapshot tests for large unstable outputs when only one semantic field matters;
- asserting private implementation calls when public behavior is the contract;
- sleeping for time instead of controlling/observing time when the repository supports that;
- mocking the exact boundary whose integration is the risk;
- replacing a repository's healthy test stack for personal preference;
- running every expensive suite for every low-risk change.
