---
name: testing
description: Use when a software change needs risk-proportionate test planning, execution, regression or contract coverage, source-head verification, acceptance-criteria traceability, or auditable testing evidence.
license: MIT
compatibility: Works across languages, repositories, and test frameworks; execution adapts to the target repository's actual test runner, build, runtime, environment, integration boundaries, and risk profile.
metadata:
  author: Turpial AI Academy
  version: "0.5.0"
---

# testing

## Operating flow

~~~text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
~~~

For final evidence:

~~~text
ANCHOR HEAD
  -> MAP SPEC + RISK
  -> SELECT EVIDENCE
  -> EXECUTE
  -> VERIFY SAME HEAD
  -> REPORT
~~~

## Purpose

Plan, execute, and report software testing against an exact source head, derive coverage from specifications and risk, and produce reproducible evidence without depending on ASPS or a specific test framework.

The capability can operate standalone or satisfy ASPS `testing/v1`.

## Fast path and reference loading

Use the **bounded testing fast path** when the exact reviewed candidate is known, the change/risk surface is local and clear, healthy repository testing conventions exist, and current evidence for the same candidate/environment can be identified.

Fast path:

1. anchor the exact reviewed/tested candidate;
2. read the affected acceptance criteria/task/diff and current review evidence;
3. inventory durable execution evidence for the same candidate, applicable environment, and acceptance/risk scope;
4. independently inspect its command, recorded result, source identity, environment, and artifact reference before reusing coverage for an unchanged criterion/risk;
5. execute only missing or invalidated focused checks plus any repository-required final-candidate invariant checks;
6. preserve unaffected evidence/artifacts, verify the candidate is unchanged, and report evidence dispositions and remaining limitations.

Do not rerun a test/build/browser check merely because execution moved from Development/Review into Testing. A prior result is reusable only when it is current evidence for the exact same candidate, relevant environment, and acceptance/risk scope.

Reused evidence must be durable/inspectable evidence of an actual execution (for example recorded command/result/artifact), not a prose claim or recollection from Development or Code Review. Testing remains independently delegated and owns the testing gate decision; execute any check whose required result cannot be independently established from the reusable evidence.

Classify evidence as `REUSED_CURRENT` (independently verified recorded execution), `INVALIDATED` (candidate/environment/scope or invariant changed), `EXECUTED_CURRENT` (freshly observed execution), or `ASSUMPTION` (inference/prose, never PASS evidence). Retain the original execution identity and durable reference when reusing a result. A new turn or phase transition alone does not invalidate evidence.

Use the **deep path** for a new plan without reusable evidence, unclear/contradictory or broad risk, public/persisted contracts, material state/data/auth/secrets/trust/security/migration/concurrency/external integration, deployment/rollback/availability risk, cross-provider dependency changes, unfamiliar/unhealthy testing conventions, complex environment/runner, candidate mutation, failed invariants, missing durable evidence for a required gate, unclear evidence lineage, or an explicit audit. Deep handling loads the triggered references and expands only the evidence justified by those risks.

Reference policy:

- `TESTING_STANDARD.md`: unfamiliar conventions or deep-path testing policy;
- `RISK_MODEL.md`: material risk dimensions are not already clear;
- `TEST_SELECTION.md`: selecting among multiple levels/suites is non-trivial;
- `EXECUTION_PROTOCOL.md`: environment/source mutation, retries/flakiness, or execution mechanics are non-trivial;
- `TRACEABILITY_AND_EVIDENCE.md`: evidence lineage/current-vs-historical status or final handoff is unclear.

Detailed references remain authoritative when triggered.

## Non-negotiable rules

- Record the exact source HEAD before testing and verify it again before final reporting.
- For ASPS gate eligibility, require the reviewed source HEAD and tested source HEAD to be identical.
- If testing or bug fixing mutates tracked source after review, do not reuse the old review approval; return `SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED`.
- Derive each material test from at least one acceptance criterion, contract, regression, edge case, failure mode, or explicit risk.
- A bug fix requires durable regression protection unless an explicit owner-approved exception explains why automated regression evidence is not feasible.
- A changed public boundary should receive contract-level evidence when its shape/behavior can be automatically verified.
- Preserve healthy repository testing conventions. Do not impose a framework, language, folder structure, mock library, coverage percentage, or test pyramid by default.
- Prefer deterministic and isolated evidence when it proves the behavior. Use real integration/E2E systems when the external boundary itself is material to the risk and the environment is authorized.
- A passing command is not enough if relevant acceptance criteria or material risks remain untested.
- Skipped, unavailable, blocked, stale, flaky, or previous-HEAD results are not current PASS evidence.
- Do not hide failed tests as unrelated without evidence.
- Do not silently repair production behavior during a testing-only invocation. Report the defect or obtain authorization to change implementation.
- Tests should fail for real behavior, not fragile implementation details.
- Do not report historical results as if they were executed on the current HEAD.

## Discover

For unfamiliar conventions, uncertain/broad risk, or complex execution mechanics, read the relevant [TESTING_STANDARD.md](references/TESTING_STANDARD.md), [RISK_MODEL.md](references/RISK_MODEL.md), and [EXECUTION_PROTOCOL.md](references/EXECUTION_PROTOCOL.md). On the bounded testing fast path, start from the exact candidate, affected acceptance/risk surface, review evidence, and current same-candidate test evidence.

Establish, as applicable:

- repository root, current branch, exact HEAD, and dirty state;
- repository instructions and existing test conventions;
- reviewed source HEAD or review evidence when this invocation follows code review;
- the governing SPEC, task statement, acceptance criteria, contracts, and explicit non-goals;
- changed files/diff and likely affected runtime/data/contract surfaces;
- stated risk plus repository-specific risk signals;
- current test suites, commands, fixtures, helpers, mocks/fakes, test data, and environment requirements;
- existing regression/contract/security/migration/recovery/observability/performance evidence;
- baseline failures or known flaky tests that predate the candidate.

Do not treat a stale test plan or previous run as proof of the current candidate.

## Decide

Use [RISK_MODEL.md](references/RISK_MODEL.md) when material risk dimensions are not already clear, without inventing arbitrary numeric scores.

Use [TEST_SELECTION.md](references/TEST_SELECTION.md) when choosing among multiple test levels/suites is non-trivial. On the bounded testing fast path, select only the missing/invalidated evidence required for the affected criteria/risks.

For every acceptance criterion and material risk, decide:

1. what observable behavior proves or disproves it;
2. the most appropriate test level or existing check;
3. whether an existing test already provides current evidence;
4. whether a new/changed test is required;
5. the exact command or procedure;
6. what broader affected suite is justified after the focused check;
7. what evidence would remain missing if the check cannot run.

Prefer focused evidence over ceremony, but expand depth when blast radius, state, security, public contracts, migrations, concurrency, external integration, critical paths, or defect history make narrow evidence insufficient.

## Implement

Implementation in this capability means test-focused work only when authorized.

Use the repository's established conventions to:

- add or refine tests that directly protect acceptance criteria or material risks;
- preserve regression tests for fixed defects;
- add contract tests for changed public boundaries;
- make fixtures deterministic and isolated;
- remove brittle assertions that protect incidental implementation details rather than behavior;
- add minimal helpers only when they reduce real duplication or improve determinism.

When a post-review invocation changes any tracked source:

1. record the old reviewed HEAD;
2. make the authorized change;
3. reach a new clean committed source HEAD;
4. stop claiming the old review applies;
5. return `SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED`;
6. require review of the new HEAD before final ASPS testing approval.

Do not modify production code merely to make a failing test green unless implementation work is explicitly authorized.

## Validate

Use [EXECUTION_PROTOCOL.md](references/EXECUTION_PROTOCOL.md) when execution mechanics/source mutation/flakiness are non-trivial and [TRACEABILITY_AND_EVIDENCE.md](references/TRACEABILITY_AND_EVIDENCE.md) when evidence lineage or current-vs-historical status is unclear. Do not reload them merely because Testing started.

Execute the evidence plan in a useful order:

1. preflight exact HEAD and environment;
2. focused/new regression or contract tests;
3. directly affected suite(s);
4. broader suite, smoke, E2E, security, migration, performance, or other checks only when risk/scope justify them;
5. repository quality/build checks when they are necessary to interpret testing results.

For each executed check, record:

- command/procedure;
- scope;
- start/end source HEAD when applicable;
- pass/fail/blocked/skipped outcome;
- meaningful counts or artifact references when available;
- relevant acceptance criteria/risks/contracts covered;
- whether retries occurred and why.

For each reused check, record its original execution and durable reference, the candidate/environment/scope match, and Testing's independent sufficiency decision. Do not describe it as freshly executed or as a skipped check. Source, environment, scope, or invariant changes require reassessing and rerunning the affected evidence; preserve unrelated valid records.

Before `TESTING_PASS`:

- verify the worktree/head conditions required by the repository;
- verify the final tested HEAD is unchanged from the execution anchor;
- reconcile every acceptance criterion and material risk;
- explicitly list blocked/skipped checks and decide whether their missing evidence is acceptable for the stated risk;
- for ASPS interoperability, verify `reviewed_source_head == tested_source_head`.

Flaky evidence is unresolved evidence until the cause is understood or an explicit risk decision is recorded; rerunning until green is not sufficient proof.

## Report

Use [testing-evidence.template.md](assets/testing-evidence.template.md) and [testing-handoff.template.json](assets/testing-handoff.template.json) when a durable handoff is needed or required by the caller. A bounded standalone report may use an equivalent concise structure with the same evidence obligations.

Report:

1. candidate/source identity and exact tested HEAD;
2. reviewed source HEAD and head-match result when applicable;
3. SPEC/task and acceptance criteria considered;
4. risk dimensions and rationale;
5. evidence plan and traceability;
6. tests/checks freshly executed, evidence reused with its durable references, invalidated evidence and reruns, and assumptions that remain unverified;
7. failures, skips, blockers, flakiness, and known baseline failures;
8. source mutations made during testing;
9. remaining uncovered risk;
10. one result status;
11. whether the result is eligible to satisfy ASPS `testing/v1`.

Allowed result statuses:

~~~text
TESTING_PASS
TESTING_FAIL
TESTING_BLOCKED
EVIDENCE_INCOMPLETE
SOURCE_HEAD_MISMATCH
SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED
~~~

`TESTING_PASS` means the executed evidence is sufficient for the stated scope/risk on the exact tested HEAD. It does not mean every possible test class was run.

For ASPS `testing/v1`, `TESTING_PASS` is gate-eligible only when the final review and testing evidence approve the same exact source HEAD.

## Detailed references

- [Testing Standard](references/TESTING_STANDARD.md)
- [Risk Model](references/RISK_MODEL.md)
- [Test Selection](references/TEST_SELECTION.md)
- [Traceability and Evidence](references/TRACEABILITY_AND_EVIDENCE.md)
- [Execution Protocol](references/EXECUTION_PROTOCOL.md)
