import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "testing");

test("testing gate requires review and testing on the same exact HEAD", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /require the reviewed source HEAD and tested source HEAD to be identical/i);
});

function section(markdown, heading) {
  const result = markdown.split(/^##\s+/m).find((candidate) => heading.test(candidate.split(/\r?\n/, 1)[0]));
  assert.ok(result, `missing section matching ${heading}`);
  return result;
}

test("bounded testing selects durable coverage and only missing or invalidated focused checks", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const fastPath = section(skill, /fast path.*reference/i);
  assert.match(fastPath, /bounded.*testing.*fast path/i);
  assert.match(fastPath, /exact.*reviewed.*candidate/i);
  assert.match(fastPath, /inventory.*durable.*execution.*same candidate/i);
  assert.match(fastPath, /independently.*inspect.*command.*result.*source.*environment.*reference/i);
  assert.match(fastPath, /execute.*missing.*invalidated.*focused.*required.*invariant/i);
  assert.match(fastPath, /preserve.*unaffected.*evidence.*artifact/i);
});

test("reused evidence must establish real execution and Testing's independent ownership", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const evidence = await readFile(path.join(skillRoot, "references", "TRACEABILITY_AND_EVIDENCE.md"), "utf8");
  const reuse = section(evidence, /reuse.*invalidation/i);
  assert.match(skill, /durable.*inspectable.*actual execution/i);
  assert.match(skill, /not.*prose.*recollection.*Development.*Code Review/i);
  assert.match(skill, /Testing.*independently delegated.*owns.*gate/i);
  assert.match(skill, /execute.*check.*required result.*cannot.*independently established/i);
  assert.match(reuse, /independently inspects[\s\S]*actual execution/i);
  assert.match(reuse, /original command.*recorded outcome.*exit code/i);
  assert.match(reuse, /exact tested source HEAD.*runtime.*environment/i);
  assert.match(reuse, /acceptance criterion.*contract.*risk/i);
  assert.match(reuse, /accessible.*artifact reference/i);
});

test("evidence dispositions preserve valid records and rerun affected invalidated proof", async () => {
  const evidence = await readFile(path.join(skillRoot, "references", "TRACEABILITY_AND_EVIDENCE.md"), "utf8");
  const reuse = section(evidence, /reuse.*invalidation/i);
  assert.match(reuse, /REUSED_CURRENT.*same candidate\/environment\/scope.*original execution.*durable reference/i);
  assert.match(reuse, /INVALIDATED.*(?:environment|scope|invariant).*rerun.*affected check/i);
  assert.match(reuse, /EXECUTED_CURRENT.*Fresh execution.*actual command.*outcome.*durable reference/i);
  assert.match(reuse, /ASSUMPTION.*(?:Prose|recollection|inference).*Do not count.*PASS.*execute/i);
  assert.match(reuse, /phase transition.*new session.*does not invalidate/i);
  assert.match(reuse, /Preserve.*unrelated valid records.*artifacts/i);
  assert.match(reuse, /Source mutation.*previous-HEAD.*historical.*not final proof.*review refresh/i);
  assert.match(reuse, /Environment.*scope changes.*failed invariant.*invalidate.*affected results/i);
});

test("deep path retains safety and candidate risks while references load by trigger", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const fastPath = section(skill, /fast path.*reference/i);
  const deepPath = fastPath.split(/\r?\n\s*\r?\n/).find((paragraph) => /\bdeep path\b/i.test(paragraph));
  assert.ok(deepPath);
  for (const trigger of [
    /new plan.*without reusable evidence/i,
    /unclear.*contradictory/i,
    /public.*persisted.*contracts/i,
    /auth.*secrets.*trust.*security/i,
    /migration.*concurrency.*external integration/i,
    /deployment.*rollback.*availability/i,
    /cross-provider dependency/i,
    /unfamiliar.*unhealthy.*conventions/i,
    /candidate mutation.*failed invariants/i,
    /missing durable evidence.*required gate/i,
  ]) assert.match(deepPath, trigger);
  for (const reference of [
    "TESTING_STANDARD.md", "RISK_MODEL.md", "TEST_SELECTION.md", "EXECUTION_PROTOCOL.md", "TRACEABILITY_AND_EVIDENCE.md",
  ]) {
    const policy = fastPath.split(/\r?\n(?=- )/).find((entry) => entry.includes(reference));
    assert.ok(policy, `missing reference trigger for ${reference}`);
    assert.match(policy, /unfamiliar|deep-path|not already clear|non-trivial|unclear/i);
  }
  assert.match(fastPath, /references.*authoritative.*triggered/i);
});

test("detailed testing policy retains independently inspectable reuse and mandatory invariants", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "TESTING_STANDARD.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EXECUTION_PROTOCOL.md"), "utf8");
  const selection = await readFile(path.join(skillRoot, "references", "TEST_SELECTION.md"), "utf8");
  for (const document of [standard, protocol, selection]) {
    assert.match(document, /independently.*inspect[\s\S]*durable|durable[\s\S]*independently.*inspect/i);
    assert.match(document, /actual execution|execution records/i);
    assert.match(document, /Development.*Code Review|Development.*reviewer recollection/i);
    assert.match(document, /missing[\s\S]*invalidated[\s\S]*final-candidate|invalidated[\s\S]*final-candidate/i);
    assert.match(document, /preserve.*unaffected.*(?:records|evidence)/i);
  }
});

test("bounded reporting distinguishes reused execution, fresh execution, invalidation and assumptions", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "testing-evidence.template.md"), "utf8");
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(report, /Exact source HEAD.*environment.*Scope.*Result.*Durable.*artifact.*Disposition/i);
  assert.match(report, /Reused.*original command\/result\/artifact/i);
  assert.match(report, /Independent candidate\/environment\/scope/i);
  assert.match(report, /Freshly executed.*checks/i);
  assert.match(report, /Invalidated evidence.*reason.*reruns/i);
  assert.match(report, /Assumptions.*prose.*not PASS/i);
  assert.match(report, /Testing.*owns.*independent.*gate/i);
  assert.match(skill, /durable handoff.*needed|required.*caller/i);
  assert.match(skill, /bounded standalone report.*equivalent.*same evidence obligations/i);
});

test("testing anchors final evidence to an exact source HEAD", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EXECUTION_PROTOCOL.md"), "utf8");
  assert.match(skill, /Record the exact source HEAD before testing/i);
  assert.match(skill, /verify it again before final reporting/i);
  assert.match(protocol, /If current HEAD differs from the execution anchor, do not emit `TESTING_PASS`/);
});

test("post-review testing mutation requires review refresh", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EXECUTION_PROTOCOL.md"), "utf8");
  assert.match(skill, /SOURCE_MUTATED_REVIEW_REFRESH_REQUIRED/);
  assert.match(skill, /previous review evidence no longer proves the final HEAD|stop claiming the old review applies/i);
  assert.match(protocol, /if code review approved the old HEAD, invalidate ASPS gate eligibility/i);
});

test("test evidence derives from spec, contracts, regressions, edge cases or risk", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "TESTING_STANDARD.md"), "utf8");
  for (const phrase of ["acceptance criterion", "public or persisted contract", "regression", "edge case", "explicit risk"]) {
    assert.match(standard, new RegExp(phrase, "i"));
  }
  assert.match(standard, /test with no clear behavior\/risk purpose is weak evidence/i);
});

test("bug fixes require regression protection and public boundaries get contract evidence", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /bug fix requires durable regression protection/i);
  assert.match(skill, /changed public boundary should receive contract-level evidence/i);
});

test("risk model scales evidence without arbitrary universal scores", async () => {
  const risk = await readFile(path.join(skillRoot, "references", "RISK_MODEL.md"), "utf8");
  assert.match(risk, /Do not invent a universal numeric score/i);
  for (const dimension of [
    "Blast radius",
    "Contract exposure",
    "State and data",
    "Security and privacy",
    "Migration and compatibility",
    "Concurrency and timing",
    "External integration",
    "Operational criticality",
    "Defect history",
  ]) {
    assert.match(risk, new RegExp(dimension, "i"));
  }
  assert.match(risk, /More tests.*is not the goal/i);
});

test("test selection is behavior and risk driven rather than framework or pyramid driven", async () => {
  const selection = await readFile(path.join(skillRoot, "references", "TEST_SELECTION.md"), "utf8");
  assert.match(selection, /Select tests from behavior and risk, not from a mandatory pyramid/i);
  assert.match(selection, /trigger map, not a requirement to create one test of every type/i);
  assert.match(selection, /Do not add duplicate tests merely to create new files/i);
});

test("evidence explicitly distinguishes current proof from historical context", async () => {
  const evidence = await readFile(path.join(skillRoot, "references", "TRACEABILITY_AND_EVIDENCE.md"), "utf8");
  assert.match(evidence, /Strong current evidence/);
  assert.match(evidence, /Context, not current proof/);
  assert.match(evidence, /historical CI green/i);
  assert.match(evidence, /previous commit\/branch results/i);
});

test("skipped blocked flaky and stale checks cannot be silently reported as PASS", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EXECUTION_PROTOCOL.md"), "utf8");
  assert.match(skill, /Skipped, unavailable, blocked, stale, flaky, or previous-HEAD results are not current PASS evidence/i);
  assert.match(protocol, /Do not use .*rerun until green.* as resolution/i);
});

test("testing preserves repository conventions and avoids universal coverage thresholds", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "TESTING_STANDARD.md"), "utf8");
  assert.match(standard, /Preserve repository conventions/i);
  assert.match(standard, /100% or any other universal code-coverage threshold/i);
  assert.match(standard, /specific framework\/runtime/i);
});

test("testing handoff is machine-readable and exposes source/gate state", async () => {
  const handoff = JSON.parse(await readFile(path.join(skillRoot, "assets", "testing-handoff.template.json"), "utf8"));
  assert.equal(handoff.schema, "com.turpial.testing-evidence/v1");
  assert.equal(handoff.asps.contract, "testing/v1");
  assert.equal(handoff.asps.gate_eligible, false);
  assert.equal(handoff.source.reviewed_source_head, null);
  assert.ok(Array.isArray(handoff.traceability));
  assert.ok(Array.isArray(handoff.executions));
});

test("human-readable evidence report separates source, risk, traceability, execution and remaining risk", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "testing-evidence.template.md"), "utf8");
  const source = report.indexOf("## 1. Source identity");
  const risk = report.indexOf("## 3. Risk");
  const trace = report.indexOf("## 4. Traceability");
  const execution = report.indexOf("## 5. Execution");
  const remaining = report.indexOf("## 9. Remaining risk");
  const result = report.indexOf("## 10. Result");
  assert.ok(source >= 0 && risk > source && trace > risk && execution > trace && remaining > execution && result > remaining);
});
