export interface SampleJob {
  id: string;
  title: string;
  company: string;
  url: string;
  language: 'en' | 'hi' | 'kn';
  riskType: 'high' | 'low' | 'medium';
  tag: string;
  description: string;
  shortSummary: string;
}

export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: 'sample_intern',
    title: 'Software Developer Intern',
    company: 'CloudSphere Technologies India Pvt Ltd',
    url: 'https://cloudsphere.io/careers/frontend-intern',
    language: 'en',
    riskType: 'low',
    tag: 'Safe / Legitimate Pattern',
    shortSummary: 'Structured tech stack, standard technical interviews, official corporate domain, zero fee requirement.',
    description: `Position: Software Developer Intern (React & TypeScript)
Location: Bengaluru, Karnataka (Hybrid - 3 days office)
Duration: 6 Months Internship with Full-Time PPO Opportunity
Stipend: INR 28,000 per month + standard medical insurance

About the Team:
CloudSphere is building scalable cloud-native microservices for fintech enterprises. We are looking for an enthusiastic engineering intern to work closely with our core frontend team.

Key Responsibilities:
- Develop modular UI components using React, TypeScript, and Tailwind CSS.
- Integrate RESTful APIs and handle asynchronous data loading states.
- Write unit tests using Jest / Node Test Runner to maintain high code reliability.
- Participate in bi-weekly sprint planning, standups, and peer code reviews.

Qualifications & Requirements:
- Currently pursuing B.E./B.Tech or MCA in Computer Science, IT, or equivalent.
- Sound understanding of JavaScript (ES6+), DOM manipulation, and Git workflows.
- Good problem-solving mindset and eagerness to learn modern web standards.

Selection & Hiring Process:
1. Online Coding Assessment (Data structures & algorithmic problem solving)
2. Technical Interview Round (Live coding & architecture discussion)
3. Culture Fit & HR Discussion with Engineering Director

Important Notice: CloudSphere never charges any application fees, training fees, or equipment security deposits at any stage.
To apply, please submit your GitHub profile and resume to careers@cloudsphere.io.`
  },
  {
    id: 'sample_scam_wfh',
    title: 'Urgent Work From Home Hiring',
    company: 'Global Quick Career Services',
    url: 'https://bit.ly/quick-wfh-job-apply',
    language: 'en',
    riskType: 'high',
    tag: 'High Risk / Advance Fee Scam',
    shortSummary: 'Urgent pressure, ₹1,500 registration fee for software activation, direct Telegram contact, unrealistic daily payout.',
    description: `*** MEGA URGENT WORK FROM HOME VACANCY - 2026 BATCH ***
Earn Rs 3,500 to Rs 6,000 per day daily payout guaranteed!
Work only 2 hours daily from mobile or laptop. No experience or educational qualification required.

Job Role: Online Form Filling, SMS Processing & Copy Paste Tasks.
Salary: Rs 85,000 to Rs 1,10,000 per month (Instant daily bank transfer or UPI transfer).

Features:
- No interview needed! 100% direct appointment letter issued within 30 minutes.
- Flexible timings - work anytime from home.
- Free company laptop and 5G Wi-Fi dongle provided after joining.

Mandatory Procedure:
Candidates must pay a refundable registration fee and software license deposit of Rs 1,500 to activate their employee portal login. This amount is 100% refundable with your first day's salary.

Limited seats left! Only 4 vacancies remaining in your district.
Do not send email. Contact HR Priya immediately on Telegram @GlobalHR_Priya or WhatsApp message to 9876543210 to claim your spot today!`
  },
  {
    id: 'sample_scam_data_entry',
    title: 'Data Entry Operator - High Payout',
    company: 'Apex Data Services',
    url: 'https://apexdatasol-work.xyz',
    language: 'en',
    riskType: 'high',
    tag: 'High Risk / Equipment Deposit',
    shortSummary: 'Free Gmail recruiter address, laptop courier security deposit demanded, exaggerated earnings.',
    description: `Company: Apex Data Solutions
Role: Back Office Data Entry & Proofreading Executive
Location: Work From Anywhere (PAN India)
Compensation: Rs 45,000/month + Weekly incentives

Job Profile:
Convert scanned PDF pages into Word documents. Simple typing work. Basic typing speed required.

Requirements & Conditions:
- Candidate will be provided a brand new Dell laptop and high-speed scanner.
- Before dispatching the company laptop, candidate must pay a refundable security deposit of Rs 2,999 for courier insurance and asset tracking.
- Immediate joining letter will be dispatched upon receipt of fee payment screenshot.
- Direct selection without technical interview.

Send your Aadhaar copy and bank details to hr.apexrecruitment2026@gmail.com.`
  },
  {
    id: 'sample_hindi_scam',
    title: 'घर बैठे काम - पार्ट टाइम नौकरी (Hindi)',
    company: 'फास्ट अर्न करियर सॉल्यूशंस',
    url: 'https://t.me/hindi_wfh_earn',
    language: 'hi',
    riskType: 'high',
    tag: 'High Risk / हिंदी में फ्रॉड जॉब',
    shortSummary: 'प्रतिदिन ₹3000 कमाने का दावा, ₹999 रजिस्ट्रेशन फीस, केवल टेलीग्राम पर संपर्क।',
    description: `अति आवश्यक सूचना: घर बैठे ऑनलाइन काम करके कमाएं रोज ₹3,000 से ₹5,000 रुपये!
कोई इंटरव्यू नहीं, सीधे जॉइनिंग। महिला एवं पुरुष दोनों आवेदन कर सकते हैं।
काम: आसान टाइपिंग एवं फॉर्म फिलिंग वर्क।
कंपनी द्वारा फ्री लैपटॉप एवं इंटरनेट दिया जाएगा।
शर्त: पोर्टल एक्टिवेशन और आईडी कार्ड हेतु ₹999 का रजिस्ट्रेशन फीस (security deposit) पहले जमा करना अनिवार्य है। यह राशि आपके पहले वेतन के साथ वापस कर दी जाएगी।
तुरंत टेलीग्राम पर संपर्क करें: @FastEarn_HR_Direct या hr.wfh.india@gmail.com पर मैसेज भेजें। अंतिम 5 सीटें शेष हैं!`
  },
  {
    id: 'sample_kannada_scam',
    title: 'ಮನೆಯಿಂದಲೇ ಕೆಲಸ - ದೈನಂದಿನ ವೇತನ (Kannada)',
    company: 'ಕರ್ನಾಟಕ ಆನ್‌ಲೈನ್ ಡೇಟಾ ಜಾಬ್ಸ್',
    url: 'https://wa.me/919900112233',
    language: 'kn',
    riskType: 'high',
    tag: 'High Risk / ಕನ್ನಡದಲ್ಲಿ ವಂಚನೆ ಉದ್ಯೋಗ',
    shortSummary: 'ದಿನಕ್ಕೆ ₹4,000 ಆದಾಯ, ₹1,200 ನೋಂದಣಿ ಶುಲ್ಕ (Registration Fee), ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಮಾತ್ರ ಸಂಪರ್ಕ.',
    description: `ತುರ್ತು ನೇಮಕಾತಿ: ಮನೆಯಿಂದಲೇ ಸರಳ ಮೊಬೈಲ್ ಟೈಪಿಂಗ್ ಕೆಲಸ ಮಾಡಿ ದಿನಕ್ಕೆ ₹3,000 - ₹5,000 ಗಳಿಸಿ!
ಯಾವುದೇ ಸಂದರ್ಶನವಿಲ್ಲ (No interview needed). ನೇರ ನೇಮಕಾತಿ ಪತ್ರ.
ಅಭ್ಯರ್ಥಿಗಳು ತಂತ್ರಾಂಶ ಸಕ್ರಿಯಗೊಳಿಸಲು ₹1,200 ನೋಂದಣಿ ಶುಲ್ಕ (refundable registration fee) ಪಾವತಿಸಬೇಕು.
ಈ ಮೊತ್ತವನ್ನು ಮೊದಲ ವಾರದ ವೇತನದೊಂದಿಗೆ ಮರುಪಾವತಿಸಲಾಗುತ್ತದೆ.
ಕೇವಲ 3 ಸೀಟುಗಳು ಮಾತ್ರ ಬಾಕಿ ಇವೆ.
ದಯವಿಟ್ಟು ತಕ್ಷಣ ವಾಟ್ಸಾಪ್ (WhatsApp) ಮೂಲಕ ಸಂದೇಶ ಕಳುಹಿಸಿ: 9880012345 ಅಥವಾ karnataka.jobs.free@gmail.com ಸಂಪರ್ಕಿಸಿ!`
  }
];
