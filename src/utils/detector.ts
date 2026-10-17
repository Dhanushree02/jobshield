/**
 * JobShield - Detection Engine & Credibility Simulation (Pure Logic)
 */

export interface WarningSign {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  snippet?: string;
  explanation: string;
}

export interface PositiveSignal {
  id: string;
  title: string;
  description: string;
}

export interface AnalysisResult {
  score: number; // 0 to 100 (higher = higher fraud risk)
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  classification: 'Potentially Genuine' | 'Potentially Fraudulent';
  confidence: number; // e.g. 85%
  summary: string;
  warningSigns: WarningSign[];
  positiveSignals: PositiveSignal[];
  safetyRecommendation: string;
  analyzedAt: string;
  stats: {
    wordCount: number;
    flaggedKeywordsCount: number;
    language: string;
  };
}

export interface CompanyCheckResult {
  companyName: string;
  website: string;
  status: 'Verified Enterprise' | 'Unverified Entity' | 'Suspicious Flagged';
  riskLevel: 'Low' | 'Moderate' | 'High';
  websiteAvailability: string;
  domainConsistency: string;
  registrationStatus: string;
  profileScore: number; // 0 to 100
  notes: string[];
  isSimulatedRecord: boolean;
}

// Suspicious patterns and rules
interface RulePattern {
  id: string;
  title: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  weight: number;
  regex: RegExp;
  explanation: string;
}

const FRAUD_RULES: RulePattern[] = [
  {
    id: 'fee_upfront',
    title: 'Registration or Training Fee Requested',
    category: 'Payment Solicitation',
    severity: 'high',
    weight: 35,
    regex: /(registration\s*fee|security\s*deposit|training\s*fee|processing\s*fee|refundable\s*deposit|pay\s*(?:rs|inr|₹|\$)\s*\d+|laptop\s*deposit|documentation\s*charge|chargeable\s*id\s*card|form\s*fee)/i,
    explanation: 'Legitimate employers and corporate recruiters never ask candidates to pay for interviews, offer letters, training modules, or equipment deposits.'
  },
  {
    id: 'informal_messaging',
    title: 'Recruitment Conducted via WhatsApp or Telegram',
    category: 'Communication Channel',
    severity: 'high',
    weight: 25,
    regex: /(telegram|whatsapp\s*(?:only|hr|chat|message)|t\.me\/|wa\.me\/|contact\s*on\s*telegram|join\s*telegram\s*channel)/i,
    explanation: 'Scammers frequently route candidates to untraceable Telegram channels or personal WhatsApp numbers to evade corporate audits and cyber law enforcement.'
  },
  {
    id: 'free_webmail',
    title: 'Personal or Free Email Address Used for Hiring',
    category: 'Domain Credibility',
    severity: 'high',
    weight: 20,
    regex: /([a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|rediffmail\.com))/i,
    explanation: 'Professional organizations recruit through verified corporate email domains (e.g., hr@company.com), not free webmail services like Gmail or Yahoo.'
  },
  {
    id: 'unrealistic_earnings',
    title: 'Unrealistic Compensation Claims',
    category: 'Salary & Earnings',
    severity: 'high',
    weight: 25,
    regex: /(earn\s*(?:rs|inr|₹)?\s*\d{3,5}\s*(?:per\s*day|\/day|daily)|earn\s*daily|daily\s*payout|guaranteed\s*income|earn\s*from\s*home\s*₹?\d{4,}\s*per\s*hour|no\s*experience\s*(?:earn|salary)\s*₹?[4-9]\d{4,})/i,
    explanation: 'Extravagant daily earnings promises (e.g., ₹2,000–₹5,000/day for minimal unskilled tasks) are standard bait in task and pyramid employment scams.'
  },
  {
    id: 'urgent_pressure',
    title: 'Urgent Joining Pressure & Artificial Scarcity',
    category: 'Recruitment Pressure',
    severity: 'medium',
    weight: 15,
    regex: /(urgent\s*joining|immediate\s*joiner\s*only|apply\s*immediately|last\s*day\s*to\s*apply|limited\s*seats|only\s*\d+\s*slots\s*left|direct\s*selection|spot\s*offer)/i,
    explanation: 'Creating artificial urgency prevents applicants from conducting background checks or consulting mentors before committing funds or personal data.'
  },
  {
    id: 'no_interview_selection',
    title: 'Guaranteed Selection Without Assessment',
    category: 'Hiring Process',
    severity: 'medium',
    weight: 15,
    regex: /(no\s*interview\s*needed|direct\s*joining\s*letter|100%\s*selection|direct\s*appointment|without\s*interview|no\s*skill\s*required)/i,
    explanation: 'Legitimate professional roles always require technical interviews, background evaluations, or portfolio reviews prior to extending formal offers.'
  },
  {
    id: 'sensitive_docs',
    title: 'Premature Request for Original Documents or Banking Info',
    category: 'Data Privacy',
    severity: 'high',
    weight: 20,
    regex: /(original\s*(?:certificates|marksheets)|bank\s*account\s*login|otp|upi\s*pin|blank\s*cheque)/i,
    explanation: 'Employers never retain physical original certificates or ask for confidential banking OTPs/UPI pins during recruitment.'
  },
  {
    id: 'vague_tasks',
    title: 'Vague Typing, Copy-Paste, or Captcha Job Tasks',
    category: 'Job Description Quality',
    severity: 'medium',
    weight: 12,
    regex: /(copy\s*paste\s*work|data\s*entry\s*from\s*home|captcha\s*typing|sms\s*sending\s*job|like\s*and\s*subscribe\s*earn)/i,
    explanation: 'Simple "copy paste" or "YouTube video liking" roles are common covers for advance-fee fraud and deceptive task scams.'
  }
];

// Indicative genuine positive traits
const GENUINE_PATTERNS = [
  {
    id: 'corp_email',
    title: 'Corporate Email Domain Mentioned',
    regex: /careers?@[a-zA-Z0-9-]+\.(com|in|org|net|co\.in|io)/i,
    description: 'Recruitment email originates from a custom organizational domain.'
  },
  {
    id: 'clear_tech_stack',
    title: 'Detailed Technical & Domain Requirements',
    regex: /(requirements|qualifications|responsibilities|technologies|bachelor|b\.tech|degree|git|sql|javascript|python|react|java|c\+\+|experience)/i,
    description: 'Contains structured expectations, technical proficiencies, or degree criteria.'
  },
  {
    id: 'structured_process',
    title: 'Multi-Stage Evaluation Process',
    regex: /(interview\s*rounds?|coding\s*round|technical\s*assessment|hiring\s*process|screening)/i,
    description: 'Explicitly outlines a legitimate evaluation and screening process.'
  },
  {
    id: 'statutory_compliance',
    title: 'Standard Employment Benefits Mentioned',
    regex: /(pf|provident\s*fund|esi|health\s*insurance|gratuity|paid\s*leaves|ctc\s*structure)/i,
    description: 'Mentions formal compensation structures or statutory employee welfare benefits.'
  },
  {
    id: 'anti_fraud_pledge',
    title: 'Explicit Zero-Fee / Anti-Fraud Pledge',
    regex: /(never\s*charges?\s*any\s*(?:fee|deposit)|no\s*fee\s*is\s*charged|free\s*of\s*cost\s*recruitment|zero\s*placement\s*charges)/i,
    description: 'Employer formally commits that recruitment is free of cost without candidate fees.'
  }
];

/**
 * Pure function: Analyzes text and returns structured risk analysis
 */
export function analyzeJobText(
  description: string,
  companyName: string = '',
  url: string = '',
  language: string = 'en'
): AnalysisResult {
  const trimmed = description.trim();
  const wordCount = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;

  if (trimmed.length === 0) {
    return {
      score: 0,
      riskLevel: 'Low Risk',
      classification: 'Potentially Genuine',
      confidence: 0,
      summary: 'No job text provided to analyze.',
      warningSigns: [],
      positiveSignals: [],
      safetyRecommendation: 'Paste a complete job description to run the fraud risk assessment.',
      analyzedAt: new Date().toISOString(),
      stats: { wordCount: 0, flaggedKeywordsCount: 0, language }
    };
  }

  const detectedWarnings: WarningSign[] = [];
  let cumulativeWeight = 0;

  // Evaluate rules
  for (const rule of FRAUD_RULES) {
    const match = trimmed.match(rule.regex);
    if (match) {
      // Check if the match is part of an explicit anti-fraud disclaimer (e.g. "never charges any fees / training fee")
      if (rule.id === 'fee_upfront') {
        const matchIndex = match.index ?? 0;
        const precedingWindow = trimmed.slice(Math.max(0, matchIndex - 70), matchIndex).toLowerCase();
        if (
          precedingWindow.includes('never') ||
          precedingWindow.includes('does not') ||
          precedingWindow.includes('do not') ||
          precedingWindow.includes("don't") ||
          precedingWindow.includes('free of cost') ||
          precedingWindow.includes('zero fee')
        ) {
          // This is a legitimate anti-fraud disclaimer, not a scam solicitation!
          continue;
        }
      }

      cumulativeWeight += rule.weight;
      detectedWarnings.push({
        id: rule.id,
        title: rule.title,
        severity: rule.severity,
        category: rule.category,
        snippet: match[0],
        explanation: rule.explanation
      });
    }
  }

  // Company Name heuristics
  if (companyName.trim()) {
    const cName = companyName.toLowerCase();
    if (cName.includes('free') || cName.includes('earn cash') || cName.includes('part time jobs')) {
      cumulativeWeight += 15;
      detectedWarnings.push({
        id: 'suspicious_co_name',
        title: 'Generic or Promotional Company Name',
        severity: 'medium',
        category: 'Entity Identity',
        snippet: companyName,
        explanation: 'Generic names without clear corporate registration often mask unverified entities.'
      });
    }
  }

  // URL heuristics
  if (url.trim()) {
    const lUrl = url.toLowerCase();
    if (lUrl.includes('bit.ly') || lUrl.includes('tinyurl.com') || lUrl.includes('t.me') || lUrl.includes('wa.me')) {
      cumulativeWeight += 20;
      detectedWarnings.push({
        id: 'shortened_or_chat_url',
        title: 'Shortened or Direct Chat Posting Link',
        severity: 'high',
        category: 'URL Safety',
        snippet: url,
        explanation: 'URL shorteners (like bit.ly) or direct chat redirects are frequently used to conceal fraudulent landing pages.'
      });
    }
  }

  // Positive signals
  const detectedPositives: PositiveSignal[] = [];
  for (const pos of GENUINE_PATTERNS) {
    if (pos.regex.test(trimmed)) {
      detectedPositives.push({
        id: pos.id,
        title: pos.title,
        description: pos.description
      });
    }
  }

  // Score calculation: normalize between 5 and 98 based on matched weights and positive offsets
  let rawScore = 10 + cumulativeWeight;
  // Positive mitigations
  if (detectedPositives.length > 0) {
    rawScore -= detectedPositives.length * 6;
  }
  // Penalize extremely short text with generic claims
  if (wordCount < 25 && detectedWarnings.length > 0) {
    rawScore += 10;
  }

  // Clamp score
  const finalScore = Math.max(8, Math.min(96, Math.round(rawScore)));

  // Risk categorization
  let riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  let classification: 'Potentially Genuine' | 'Potentially Fraudulent';

  if (finalScore >= 65) {
    riskLevel = 'High Risk';
    classification = 'Potentially Fraudulent';
  } else if (finalScore >= 35) {
    riskLevel = 'Medium Risk';
    classification = detectedWarnings.some((w) => w.severity === 'high')
      ? 'Potentially Fraudulent'
      : 'Potentially Genuine';
  } else {
    riskLevel = 'Low Risk';
    classification = 'Potentially Genuine';
  }

  // Confidence estimation
  const confidence = Math.min(94, 60 + Math.min(wordCount, 100) * 0.2 + detectedWarnings.length * 4);

  // Recommendations
  let safetyRecommendation = '';
  if (riskLevel === 'High Risk') {
    safetyRecommendation =
      'High risk detected. Do not transfer any money, registration deposit, or share original Aadhaar/PAN cards. Official Indian labor regulations prohibit charging fees for job placement. Verify the company independently on the Ministry of Corporate Affairs (MCA) portal.';
  } else if (riskLevel === 'Medium Risk') {
    safetyRecommendation =
      'Exercise caution. Verify the recruiter’s credentials on LinkedIn or the employer’s official career portal. Refuse any requests for processing charges or security fees during subsequent rounds.';
  } else {
    safetyRecommendation =
      'Low fraud indicators detected. The description aligns with conventional recruitment practices. Continue standard diligence: confirm offer validity on the official company careers website before sharing personal details.';
  }

  const summary =
    riskLevel === 'High Risk'
      ? `This posting triggered ${detectedWarnings.length} prominent scam indicators, including high-severity red flags like upfront fees or unverified communication channels.`
      : riskLevel === 'Medium Risk'
      ? `This posting contains ${detectedWarnings.length} caution flag(s). While some aspects seem plausible, certain phrasing warrants closer manual inspection.`
      : `This posting exhibits legitimate job posting characteristics with ${detectedPositives.length} positive trust signal(s) and minimal fraud indicators.`;

  return {
    score: finalScore,
    riskLevel,
    classification,
    confidence: Math.round(confidence),
    summary,
    warningSigns: detectedWarnings,
    positiveSignals: detectedPositives,
    safetyRecommendation,
    analyzedAt: new Date().toISOString(),
    stats: {
      wordCount,
      flaggedKeywordsCount: detectedWarnings.length,
      language
    }
  };
}

/**
 * Company Credibility Simulation Check
 */
export const SAMPLE_COMPANY_DATABASE: Record<string, CompanyCheckResult> = {
  'tata consultancy services': {
    companyName: 'Tata Consultancy Services Ltd (TCS)',
    website: 'https://www.tcs.com',
    status: 'Verified Enterprise',
    riskLevel: 'Low',
    websiteAvailability: 'Active (SSL Valid, Global Corporate Portal)',
    domainConsistency: 'Consistent (@tcs.com careers gateway verified)',
    registrationStatus: 'Public Limited Company (CIN: L22210MH1995PLC084781, ROC Mumbai)',
    profileScore: 96,
    notes: [
      'TCS never charges application, training, or deposit fees at any stage of hiring.',
      'All genuine campus and off-campus offers are issued via TCS iON / NextStep portal.',
      'Active cyber fraud advisory published on official career page.'
    ],
    isSimulatedRecord: true
  },
  'infosys': {
    companyName: 'Infosys Limited',
    website: 'https://www.infosys.com',
    status: 'Verified Enterprise',
    riskLevel: 'Low',
    websiteAvailability: 'Active (Enterprise Corporate Website)',
    domainConsistency: 'Consistent (@infosys.com domain only)',
    registrationStatus: 'Public Listed Entity (CIN: L85110KA1981PLC013115, ROC Bangalore)',
    profileScore: 95,
    notes: [
      'Official recruitment communication originates strictly from @infosys.com.',
      'Never requests security deposits for laptop delivery or onboarding training.',
      'Regular public fraud alerts against fraudulent agencies pretending to hire on behalf of Infosys.'
    ],
    isSimulatedRecord: true
  },
  'apex data solutions': {
    companyName: 'Apex Data Solutions',
    website: 'http://apexdatasol-work.xyz',
    status: 'Unverified Entity',
    riskLevel: 'Moderate',
    websiteAvailability: 'Inconsistent (Recently registered domain, minimal content)',
    domainConsistency: 'Inconsistent (Recruiter uses apexdata.hr@gmail.com)',
    registrationStatus: 'No MCA / ROC registration record found',
    profileScore: 38,
    notes: [
      'No physical office address verified in standard business directories.',
      'Uses generic free webmail for employee correspondence.',
      'Domain registration is less than 90 days old with privacy protection active.'
    ],
    isSimulatedRecord: true
  },
  'fasttrack earn careers': {
    companyName: 'FastTrack Earn Careers',
    website: 'https://t.me/fasttrack_jobs_india',
    status: 'Suspicious Flagged',
    riskLevel: 'High',
    websiteAvailability: 'No official corporate website (Redirects to Telegram channel)',
    domainConsistency: 'Failed (No custom corporate domain)',
    registrationStatus: 'Flagged Entity (Multiple user complaints in cybercrime reports)',
    profileScore: 12,
    notes: [
      'Exclusively contacts job seekers via Telegram and unregistered WhatsApp accounts.',
      'Solicits ₹1,200 to ₹3,500 advance fee disguised as "software training & kit delivery".',
      'Matches known patterns of nationwide part-time task scams.'
    ],
    isSimulatedRecord: true
  }
};

export function checkCompanyCredibility(
  companyInput: string,
  websiteInput: string = ''
): CompanyCheckResult {
  const normalized = companyInput.toLowerCase().trim();

  // Check known presets
  for (const key of Object.keys(SAMPLE_COMPANY_DATABASE)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      const match = { ...SAMPLE_COMPANY_DATABASE[key] };
      if (websiteInput.trim()) {
        match.website = websiteInput.trim();
      }
      return match;
    }
  }

  // Dynamic simulation for any other company
  const isEduOrGov =
    normalized.includes('tech') || normalized.includes('pvt') || normalized.includes('solutions');
  const hasSuspiciousTerms =
    normalized.includes('earn') ||
    normalized.includes('fast') ||
    normalized.includes('daily') ||
    normalized.includes('click') ||
    normalized.includes('task');

  if (hasSuspiciousTerms) {
    return {
      companyName: companyInput || 'Simulated Entity',
      website: websiteInput || 'Not specified (Free webmail recruiter)',
      status: 'Suspicious Flagged',
      riskLevel: 'High',
      websiteAvailability: 'Unverified or redirected to messaging platforms',
      domainConsistency: 'Mismatched with corporate entity name',
      registrationStatus: 'Unregistered or ambiguous corporate identity',
      profileScore: 24,
      notes: [
        'Name uses high-risk keywords typically seen in unsolicited recruitment spam.',
        'No verifiable MCA corporate filing detected in public mock index.',
        'Strong recommendation to request official physical office proof and CIN number.'
      ],
      isSimulatedRecord: true
    };
  }

  if (isEduOrGov || websiteInput.includes('.com') || websiteInput.includes('.in')) {
    return {
      companyName: companyInput || 'Private Enterprise',
      website: websiteInput || `https://www.${companyInput.replace(/\s+/g, '').toLowerCase()}.com`,
      status: 'Unverified Entity',
      riskLevel: 'Moderate',
      websiteAvailability: 'Active domain, basic corporate metadata present',
      domainConsistency: 'Requires verification (Ensure email domain matches website URL)',
      registrationStatus: 'Standard Private Registry Check Recommended',
      profileScore: 62,
      notes: [
        'Company shows moderate baseline indicators, but formal accreditation should be reviewed.',
        'Cross-reference the Corporate Identification Number (CIN) on the MCA portal (mca.gov.in).',
        'Verify if recruiter contacts you from the exact domain name.'
      ],
      isSimulatedRecord: true
    };
  }

  return {
    companyName: companyInput,
    website: websiteInput || 'None provided',
    status: 'Unverified Entity',
    riskLevel: 'Moderate',
    websiteAvailability: websiteInput ? 'Unchecked domain' : 'No official website provided',
    domainConsistency: 'Inconclusive (No recruiter email domain provided)',
    registrationStatus: 'Record pending validation in simulated database',
    profileScore: 48,
    notes: [
      'This company is not in the curated mock database.',
      'Simulated heuristic suggests checking Glassdoor, LinkedIn, and Zauba Corp for ROC registration.',
      'Always request an official offer letter on registered corporate letterhead.'
    ],
    isSimulatedRecord: true
  };
}
