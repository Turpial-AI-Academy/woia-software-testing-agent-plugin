# Traceability and Evidence

## Evidence chain

A strong testing handoff connects intent to proof:

~~~text
SPEC / task
  -> acceptance criterion / contract / risk
  -> selected test or procedure
  -> exact command
  -> result
  -> source HEAD
  -> remaining risk
~~~

## Traceability matrix

Use a table or equivalent structure:

| ID | Criterion / risk / contract | Test or procedure | Command | Result | Evidence note |
|---|---|---|---|---|---|
| AC-1 | Expected behavior | test name/path | command | PASS | observable assertion |
| R-1 | Failure mode | integration test | command | PASS | negative path verified |

IDs may come from the specification. Do not invent IDs merely for ceremony when the source has none; descriptive labels are sufficient.

## Evidence quality

### Strong current evidence

- executed on the exact tested source HEAD;
- command/procedure is reproducible;
- test meaning clearly maps to behavior/risk;
- environment/preconditions are known;
- result is captured without hiding failures;
- the durable execution record/log/artifact can be independently inspected;
- scope/count/artifact is recorded when useful;
- no source mutation occurred unnoticed during execution.

### Context, not current proof

- historical CI green;
- previous commit/branch results;
- reviewer recollection;
- Development or Code Review prose without an inspectable execution record;
- an unexecuted test file that appears correct;
- generated coverage report from another candidate;
- "worked manually before."

These may guide test selection but do not prove the current HEAD.

## Reuse and invalidation

Testing remains independently delegated and owns its gate. Evidence produced by another provider may be reused only after Testing independently inspects:

- a durable record of an actual execution, including the original command/procedure and recorded outcome or exit code;
- the exact tested source HEAD and applicable runtime/environment, dependencies, fixtures, and inputs;
- the acceptance criterion, contract, or risk the result proves;
- an accessible log/report/artifact reference and any failures, retries, flakiness, or remaining limitations.

Classify each selected item:

| Disposition | Meaning | Required action |
|---|---|---|
| `REUSED_CURRENT` | Independently inspected execution still proves the same candidate/environment/scope | Retain its original execution identity and durable reference; report it as reused |
| `INVALIDATED` | Candidate, environment, scope, inputs, or an invariant changed | Record why it no longer proves the required result and rerun the affected check |
| `EXECUTED_CURRENT` | Fresh execution on the current candidate | Capture the actual command, outcome, environment, and durable reference |
| `ASSUMPTION` | Prose, recollection, inference, or an unexecuted plan | Do not count it as PASS; execute the required check when proof is missing |

A phase transition or new session alone does not invalidate still-valid execution evidence. Preserve unrelated valid records and artifacts rather than recreating them. Do not rerun an expensive build/browser/integration check whose execution and applicability are already independently established, unless the repository requires a fresh final-candidate invariant check.

Source mutation makes previous-HEAD records historical context, not final proof, and requires review refresh where applicable. Environment/runner/dependency/fixture/scope changes or a failed invariant invalidate the affected results; reconcile that impact and rerun the missing evidence. If required execution cannot be independently established, run it instead of accepting another provider's assertion. Missing durable evidence for a required gate triggers the deep evidence-lineage path.

## Acceptance-criteria reconciliation

Before PASS, classify each applicable criterion:

- `PROVEN` — current evidence supports it;
- `DISPROVEN` — valid evidence shows it fails;
- `BLOCKED` — required evidence cannot execute;
- `NOT_COVERED` — no sufficient evidence selected/executed;
- `NOT_APPLICABLE` — justified by current scope.

A `DISPROVEN` criterion means `TESTING_FAIL`.

A material `BLOCKED` criterion normally means `TESTING_BLOCKED`.

A material `NOT_COVERED` criterion means `EVIDENCE_INCOMPLETE`.

## Risk reconciliation

For each material risk state:

- evidence executed;
- evidence result;
- residual risk;
- whether an explicit owner/product decision accepts remaining risk.

Do not convert an untested material risk to PASS because unrelated tests are green.

## Coverage metrics

Code/branch/function coverage can expose blind spots, but percentages are supporting evidence rather than universal quality gates.

Use a repository's existing coverage threshold when it is part of that repository's healthy contract. Do not replace it with a Turpial-specific percentage.

## New or changed tests

When practical, strengthen new regression evidence by showing that the test detects the undesired behavior on an appropriate pre-fix state or controlled negative fixture.

Do not mutate published/history state or perform unsafe reversions just to manufacture RED evidence. If pre-fix RED is not practical, state that limitation.

## Evidence report minimum

Final evidence should include:

- exact tested source HEAD;
- reviewed source HEAD when applicable;
- head-match status;
- SPEC/task reference;
- material risk summary;
- traceability matrix;
- executed commands and outcomes;
- reused execution records, durable references, independent applicability decisions, invalidation reasons/reruns, and unverified assumptions;
- skipped/blocked checks;
- known pre-existing failures/flakiness;
- source mutations during testing;
- remaining risks;
- final status;
- ASPS gate eligibility.
