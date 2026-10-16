import React, { useState, useEffect, useRef } from 'react';
import {
  analyzeJobText,
  AnalysisResult,
  WarningSign
} from '../utils/detector';
import { SAMPLE_JOBS, SampleJob } from '../data/sampleJobs';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Info,
  Loader2,
  FileCheck
} from 'lucide-react';

interface JobAnalyzerProps {
  initialJob?: SampleJob | null;
  onClearInitialJob?: () => void;
}

export const JobAnalyzer: React.FC<JobAnalyzerProps> = ({ initialJob, onClearInitialJob }) => {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>('en');

  const [isLoading, setIsLoading] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // When an example card is clicked from outside
  useEffect(() => {
    if (initialJob) {
      setDescription(initialJob.description);
      setCompanyName(initialJob.company);
      setJobUrl(initialJob.url);
      setLanguage(initialJob.language);
      setValidationError(null);

      // Auto analyze for immediate feedback
      handleAnalyze(initialJob.description, initialJob.company, initialJob.url, initialJob.language);
      if (onClearInitialJob) onClearInitialJob();
    }
  }, [initialJob]);

  const handleLanguageChange = (newLang: 'en' | 'hi' | 'kn') => {
    setLanguage(newLang);
    // If empty or user changes language, we can offer to switch or keep text
  };

  const handleLoadSample = (type: 'suspicious' | 'genuine' = 'suspicious') => {
    let sample: SampleJob;
    if (language === 'hi') {
      sample = SAMPLE_JOBS.find((j) => j.language === 'hi') || SAMPLE_JOBS[1];
    } else if (language === 'kn') {
      sample = SAMPLE_JOBS.find((j) => j.language === 'kn') || SAMPLE_JOBS[1];
    } else {
      sample = type === 'suspicious' ? SAMPLE_JOBS[1] : SAMPLE_JOBS[0];
    }

    setDescription(sample.description);
    setCompanyName(sample.company);
    setJobUrl(sample.url);
    setValidationError(null);
  };

  const handleClear = () => {
    setDescription('');
    setCompanyName('');
    setJobUrl('');
    setValidationError(null);
    setResult(null);
  };

  const handleAnalyze = (
    textToAnalyze = description,
    comp = companyName,
    url = jobUrl,
    lang = language
  ) => {
    const trimmed = textToAnalyze.trim();
    if (!trimmed) {
      setValidationError('Please paste or type a job description to perform the analysis.');
      setResult(null);
      return;
    }

    if (trimmed.length < 20) {
      setValidationError('Job description is too brief. Please enter at least 20 characters for meaningful analysis.');
      setResult(null);
      return;
    }

    setValidationError(null);
    setIsLoading(true);

    // Simulate realistic multi-stage pattern scan
    setScanStep('Parsing job text & evaluating keyword heuristics...');
    const t1 = setTimeout(() => {
      setScanStep('Checking recruitment channels, fees & compensation patterns...');
    }, 280);

    const t2 = setTimeout(() => {
      setScanStep('Synthesizing explainable risk indicators...');
    }, 540);

    const t3 = setTimeout(() => {
      const analysis = analyzeJobText(textToAnalyze, comp, url, lang);
      setResult(analysis);
      setIsLoading(false);
      setScanStep('');

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  // Helper for risk styling
  const getRiskTheme = (riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk') => {
    switch (riskLevel) {
      case 'High Risk':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-700',
          scoreText: 'text-rose-600',
          accent: 'bg-rose-500',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: AlertTriangle
        };
      case 'Medium Risk':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          scoreText: 'text-amber-600',
          accent: 'bg-amber-500',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: AlertCircle
        };
      case 'Low Risk':
      default:
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          scoreText: 'text-emerald-600',
          accent: 'bg-emerald-500',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: CheckCircle2
        };
    }
  };

  return (
    <section id="analyzer" className="py-16 bg-[#FAFAFA] border-b border-slate-200 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F2] border border-[#9DD2C1] text-[#176B52] text-xs font-semibold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Rule-Based Inspector
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Check a Job Posting
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base">
            Paste any job description, WhatsApp forward, or email offer to identify red flags and payment traps.
          </p>
        </div>

        {/* Input Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
          
          {/* Top Form Controls: Language & Sample Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="language-select" className="text-xs font-semibold text-slate-600">
                Language:
              </label>
              <div className="relative">
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'hi' | 'kn')}
                  className="appearance-none bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
                >
                  <option value="en">English (Default)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleLoadSample('suspicious')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Load Sample Suspicious Job
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('genuine')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Load Sample Genuine Job
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                title="Clear all fields"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          {/* Job Description Textarea */}
          <div className="space-y-1.5 mb-5">
            <div className="flex items-center justify-between">
              <label htmlFor="job-description-input" className="text-sm font-semibold text-slate-800">
                Job Description or Offer Text <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-medium text-slate-400">
                {description.length} characters • {description.trim() ? description.trim().split(/\s+/).length : 0} words
              </span>
            </div>

            <textarea
              id="job-description-input"
              rows={7}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Paste the complete job description here... (e.g. including salary, application instructions, contact details, requirements)"
              className={`w-full rounded-xl border p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all font-mono text-[13px] leading-relaxed resize-y ${
                validationError
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/20'
                  : 'border-slate-300 focus:ring-[#176B52] bg-white'
              }`}
            />

            {validationError && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {validationError}
              </p>
            )}
          </div>

          {/* Optional Supplementary Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="company-name-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="company-name-input"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Tata Consultancy Services, Apex Data..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div>
              <label htmlFor="job-url-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Job Posting URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="job-url-input"
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="e.g. https://linkedin.com/jobs/view/... or shortlink"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Simulated demo analysis. Runs entirely in your browser with zero data storage.</span>
            </div>

            <button
              type="button"
              onClick={() => handleAnalyze()}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#176B52] hover:bg-[#125440] disabled:bg-slate-300 rounded-xl transition-colors shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Posting...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  <span>Analyze Job</span>
                </>
              )}
            </button>
          </div>

          {/* Loading Animation Status */}
          {isLoading && (
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-[#176B52] animate-spin shrink-0" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-800">Inspection In Progress</p>
                <p className="text-xs text-slate-500">{scanStep}</p>
              </div>
            </div>
          )}

        </div>

        {/* RESULTS SECTION */}
        {result && !isLoading && (
          <div ref={resultsRef} className="mt-10 scroll-mt-20">
            {(() => {
              const theme = getRiskTheme(result.riskLevel);
              const RiskIcon = theme.icon;

              return (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  
                  {/* Results Header Bar */}
                  <div className={`p-6 sm:p-7 border-b ${theme.border} ${theme.bg}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Left: Classification and Risk */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badge}`}>
                            <RiskIcon className="w-3.5 h-3.5" />
                            {result.riskLevel}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Classification:
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            {result.classification}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 pt-1">
                          {result.summary}
                        </p>
                      </div>

                      {/* Right: Risk Score Display */}
                      <div className="sm:text-right shrink-0 bg-white/80 p-3 sm:p-4 rounded-xl border border-slate-200/60 shadow-2xs">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                          Fraud Risk Score
                        </span>
                        <div className="flex items-baseline gap-1 sm:justify-end">
                          <span className={`text-4xl font-extrabold ${theme.scoreText}`}>
                            {result.score}
                          </span>
                          <span className="text-slate-400 font-semibold text-sm">/ 100</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Confidence: ~{result.confidence}%
                        </span>
                      </div>

                    </div>

                    {/* Horizontal Risk Meter */}
                    <div className="mt-6 pt-5 border-t border-slate-200/60 space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>Horizontal Risk Meter</span>
                        <span className="font-bold">{result.score}% Risk Factor</span>
                      </div>

                      <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                        {/* 3 color bands */}
                        <div className="w-[35%] bg-emerald-500 h-full" title="0-34: Low Risk"></div>
                        <div className="w-[30%] bg-amber-400 h-full" title="35-64: Medium Risk"></div>
                        <div className="w-[35%] bg-rose-500 h-full" title="65-100: High Risk"></div>

                        {/* Current Score Pin */}
                        <div
                          className="absolute top-0 bottom-0 w-2.5 bg-slate-900 ring-2 ring-white rounded-full -ml-1 transition-all"
                          style={{ left: `${Math.min(98, Math.max(2, result.score))}%` }}
                          title={`Score: ${result.score}`}
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                        <span className="text-emerald-700 font-semibold">Low Risk (0 - 34)</span>
                        <span className="text-amber-700 font-semibold">Medium Risk (35 - 64)</span>
                        <span className="text-rose-700 font-semibold">High Risk (65 - 100)</span>
                      </div>
                    </div>

                  </div>

                  {/* Results Body: Warnings, Positives, and Recommendations */}
                  <div className="p-6 sm:p-8 space-y-8">
                    
                    {/* Warning Signs Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-['Plus_Jakarta_Sans',sans-serif]">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Detected Warning Signs ({result.warningSigns.length})
                        </h3>
                        <span className="text-xs text-slate-400">
                          Explainable rule matches
                        </span>
                      </div>

                      {result.warningSigns.length === 0 ? (
                        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-sm text-emerald-900 flex items-center gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>No major scam triggers detected in the evaluated text.</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {result.warningSigns.map((warning: WarningSign, idx: number) => {
                            const isHigh = warning.severity === 'high';
                            return (
                              <div
                                key={warning.id + idx}
                                className={`p-4 rounded-xl border ${
                                  isHigh
                                    ? 'bg-rose-50/50 border-rose-200'
                                    : 'bg-amber-50/50 border-amber-200'
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isHigh ? 'bg-rose-500' : 'bg-amber-500'
                                      }`}
                                    />
                                    <h4 className="text-sm font-bold text-slate-900">
                                      {warning.title}
                                    </h4>
                                  </div>
                                  <span
                                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                      isHigh
                                        ? 'bg-rose-100 text-rose-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    {warning.category} • {warning.severity.toUpperCase()}
                                  </span>
                                </div>

                                {warning.snippet && (
                                  <div className="mb-2">
                                    <span className="text-[11px] font-medium text-slate-500">Flagged phrase: </span>
                                    <code className="text-xs px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-mono">
                                      &quot;{warning.snippet}&quot;
                                    </code>
                                  </div>
                                )}

                                <p className="text-xs text-slate-700 leading-relaxed">
                                  <strong className="text-slate-900">Why this matters:</strong> {warning.explanation}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Positive Signals Section (if detected) */}
                    {result.positiveSignals.length > 0 && (
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3 font-['Plus_Jakarta_Sans',sans-serif]">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          Positive / Legitimate Signals ({result.positiveSignals.length})
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {result.positiveSignals.map((pos) => (
                            <div
                              key={pos.id}
                              className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs"
                            >
                              <p className="font-bold text-emerald-950 flex items-center gap-1.5 mb-0.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                {pos.title}
                              </p>
                              <p className="text-slate-600 pl-5">{pos.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Safety Recommendations */}
                    <div className="p-5 rounded-xl bg-[#EBF7F2] border border-[#9DD2C1] space-y-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#176B52] shrink-0" />
                        <h4 className="text-sm font-bold text-[#176B52]">
                          Recommended Action for Job Seekers
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-7">
                        {result.safetyRecommendation}
                      </p>
                      <div className="pl-7 pt-1 flex flex-wrap gap-4 text-[11px] text-[#176B52] font-semibold">
                        <span>• National Cybercrime Helpline: 1930</span>
                        <span>• Official Portal: cybercrime.gov.in</span>
                      </div>
                    </div>

                    {/* Disclaimer Banner */}
                    <div className="text-center pt-2 border-t border-slate-100">
                      <p className="text-[11px] text-slate-400 italic">
                        Disclaimer: JobShield is a college project demonstration. Results are indicative heuristics and should not replace independent candidate background checks.
                      </p>
                    </div>

                  </div>

                </div>
              );
            })()}
          </div>
        )}

      </div>
    </section>
  );
};
