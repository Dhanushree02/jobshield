import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeJobText, checkCompanyCredibility } from './detector.ts';

test('analyzeJobText correctly handles empty input without crashing', () => {
  const result = analyzeJobText('');
  assert.equal(result.score, 0);
  assert.equal(result.riskLevel, 'Low Risk');
  assert.equal(result.warningSigns.length, 0);
  assert.equal(result.stats.wordCount, 0);
});

test('analyzeJobText detects high-risk fraud signs (fees, telegram, daily payouts)', () => {
  const fakeJob = `
    Urgent Hiring! Work from Home Data Entry.
    Earn Rs 4000 per day daily payout! No skill or interview needed.
    Candidate must pay a refundable registration fee of Rs 1500 for software activation.
    Contact HR Priya on Telegram @fake_jobs_hr or fakejobs@gmail.com immediately.
    Only 5 slots left!
  `;
  const result = analyzeJobText(fakeJob, 'Earn Quick Pvt', 'https://bit.ly/fakejob');
  
  assert.ok(result.score >= 65, `Expected high risk score >= 65, got ${result.score}`);
  assert.equal(result.riskLevel, 'High Risk');
  assert.equal(result.classification, 'Potentially Fraudulent');
  assert.ok(result.warningSigns.length >= 3, 'Should detect multiple warning signs');
  
  const signIds = result.warningSigns.map((w) => w.id);
  assert.ok(signIds.includes('fee_upfront'), 'Must detect fee_upfront');
  assert.ok(signIds.includes('informal_messaging'), 'Must detect Telegram/WhatsApp');
  assert.ok(signIds.includes('free_webmail'), 'Must detect free webmail');
  assert.ok(signIds.includes('unrealistic_earnings'), 'Must detect unrealistic earnings');
});

test('analyzeJobText classifies legitimate corporate job as Low Risk', () => {
  const genuineJob = `
    Software Developer Intern (Frontend) - Bengaluru / Hybrid
    About the Role:
    We are seeking a proactive Frontend Intern to join our engineering team.
    Responsibilities:
    - Collaborate with senior engineers to build responsive React components.
    - Write clean, maintainable TypeScript and unit tests.
    - Participate in code reviews and agile sprint planning.
    Qualifications:
    - Bachelor's degree in Computer Science or related engineering field.
    - Strong fundamentals in HTML, CSS, JavaScript, and Git.
    Hiring Process:
    1. Online Coding Assessment (LeetCode style)
    2. Technical Round with Engineering Manager
    3. HR Discussion
    Compensation & Benefits: Monthly stipend of INR 25,000 + Certificate + PPO opportunity.
    Send your portfolio and resume to careers@innovatetech.in.
  `;
  const result = analyzeJobText(genuineJob, 'Innovate Tech Labs', 'https://innovatetech.in/careers');

  assert.ok(result.score < 35, `Expected low risk score < 35, got ${result.score}`);
  assert.equal(result.riskLevel, 'Low Risk');
  assert.equal(result.classification, 'Potentially Genuine');
  assert.ok(result.positiveSignals.length >= 2, 'Should detect positive signals');
});

test('checkCompanyCredibility returns correct record for preset enterprise', () => {
  const tcsResult = checkCompanyCredibility('Tata Consultancy Services');
  assert.equal(tcsResult.status, 'Verified Enterprise');
  assert.equal(tcsResult.riskLevel, 'Low');
  assert.ok(tcsResult.profileScore >= 90);
  assert.equal(tcsResult.isSimulatedRecord, true);
});

test('checkCompanyCredibility returns high risk for flagged suspicious entity', () => {
  const flagged = checkCompanyCredibility('FastTrack Earn Careers');
  assert.equal(flagged.status, 'Suspicious Flagged');
  assert.equal(flagged.riskLevel, 'High');
  assert.ok(flagged.profileScore < 30);
});

test('analyzeJobText does not flag legitimate "never charges fee" disclaimers', () => {
  const textWithDisclaimer = `
    Senior React Engineer at FinTech Labs India.
    Full-time role in Hyderabad. Competitive salary with equity.
    Please note: FinTech Labs never charges any registration fee or training fee at any step.
    Send applications to careers@fintechlabs.in.
  `;
  const res = analyzeJobText(textWithDisclaimer);
  const feeWarning = res.warningSigns.find((w) => w.id === 'fee_upfront');
  assert.equal(feeWarning, undefined, 'Must not flag fee_upfront when preceded by "never charges"');
  assert.equal(res.riskLevel, 'Low Risk');
});

