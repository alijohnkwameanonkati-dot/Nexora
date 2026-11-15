import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import {
  BUDGET_OPTIONS,
  WEBSITE_TYPE_OPTIONS,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../config/agency';
import { useRouter } from '../context/RouterContext';
import {
  InquiryApiError,
  fetchSecurityToken,
  submitProjectInquiry,
} from '../services/inquiryService';
import type { AgencyPublicConfig, InquirySubmissionResponse } from '../types';
import {
  type InquiryFieldErrors,
  type InquiryFormFields,
  validateInquiryFields,
} from '../utils/validation';

interface ContactPageProps {
  config: AgencyPublicConfig;
}

const INITIAL_FIELDS: InquiryFormFields = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  websiteType: '',
  budget: '',
  description: '',
  additionalRequirements: '',
  websiteConfirm: '',
  humanCheck: '',
};

export function ContactPage({ config }: ContactPageProps) {
  const { preselectedService, clearPreselectedService } = useRouter();

  const [fields, setFields] = useState<InquiryFormFields>(() => ({
    ...INITIAL_FIELDS,
    websiteType: preselectedService || '',
  }));
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [securityToken, setSecurityToken] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<InquirySubmissionResponse | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFields((prev) => ({
        ...prev,
        websiteType: WEBSITE_TYPE_OPTIONS.includes(preselectedService)
          ? preselectedService
          : prev.websiteType || 'Business Website Development',
      }));
    }
  }, [preselectedService]);

  const loadToken = async () => {
    try {
      const token = await fetchSecurityToken();
      setSecurityToken(token);
    } catch {
      setSecurityToken('');
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const updateField = <K extends keyof InquiryFormFields>(key: K, value: InquiryFormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (formError) setFormError(null);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.contactEmail);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const errors = validateInquiryFields(fields);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError('Please review the highlighted fields below before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      let activeToken = securityToken;
      if (!activeToken) {
        activeToken = await fetchSecurityToken();
        setSecurityToken(activeToken);
      }

      const result = await submitProjectInquiry({
        ...fields,
        securityToken: activeToken,
      });

      setSubmission(result);
      clearPreselectedService();
    } catch (err) {
      if (err instanceof InquiryApiError) {
        setFormError(err.message);
        if (err.fieldErrors) {
          setFieldErrors(err.fieldErrors as InquiryFieldErrors);
        }
      } else {
        setFormError(
          'A network error occurred while submitting your project brief. Please try again or reach us directly via WhatsApp.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmission(null);
    setFields(INITIAL_FIELDS);
    setFieldErrors({});
    setFormError(null);
    loadToken();
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-[#070B14] text-white border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-22">
          <p className="text-xs font-semibold tracking-wider uppercase text-blue-400">
            Start a Project
          </p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.1]">
            LET&apos;S BUILD YOUR NEXT BIG IDEA.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Tell us about your business, timeline, and goals. Every project inquiry is reviewed directly by our engineering and design team.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Direct Contact Channels */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">
                    Direct Communication Channels
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    Prefer a quick conversation before writing a detailed brief? Connect with us directly via WhatsApp or email.
                  </p>
                </div>

                {/* WhatsApp CTA */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-sm font-bold text-slate-900">
                        WhatsApp Business Inquiry
                      </p>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">
                        {config.whatsappNumber}
                      </p>
                    </div>
                  </div>
                  <a
                    href={buildWhatsAppUrl(
                      config.whatsappNumber,
                      `Hello Nexora Digital, I'm interested in discussing ${
                        fields.websiteType || 'a new website project'
                      }.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>

                {/* Email Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-slate-900">
                        Direct Email
                      </p>
                      <p className="text-xs text-slate-600 truncate">{config.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={buildMailtoUrl(config.contactEmail)}
                      className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                    >
                      <span>Open Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                  <p>
                    <strong className="text-slate-700 font-medium">Coverage:</strong> {config.agencyLocation}
                  </p>
                  <p>
                    <strong className="text-slate-700 font-medium">Response Time:</strong> Within 1 business day for structured project briefs.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0B1120] text-slate-300 border border-slate-800 p-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs leading-relaxed">
                  <p className="font-semibold text-white">Secure &amp; Private Submission</p>
                  <p className="mt-1 text-slate-400">
                    Your inquiry details are validated server-side, protected against automated spam, and used solely to prepare your project proposal.
                  </p>
                </div>
              </div>
            </aside>

            {/* Project Inquiry Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-9">
                {submission ? (
                  <div role="status" aria-live="polite" className="space-y-6">
                    <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>Project Inquiry Recorded</span>
                    </div>

                    <div>
                      <h2 className="font-display text-2xl font-bold text-slate-900">
                        Thank you, {submission.summary.fullName}.
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Your project brief for <strong className="text-slate-900">{submission.summary.businessName}</strong> has been validated and logged on our server.
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-2.5 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Reference ID</span>
                        <span className="font-mono font-semibold text-slate-900">
                          {submission.referenceId}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Website Type</span>
                        <span className="font-medium text-slate-900">
                          {submission.summary.websiteType}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Estimated Budget</span>
                        <span className="font-medium text-slate-900">
                          {submission.summary.budget}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-500">Reply Email</span>
                        <span className="font-medium text-slate-900">{submission.summary.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={buildWhatsAppUrl(
                          config.whatsappNumber,
                          `Hello Nexora Digital, I just submitted inquiry ${submission.referenceId} for ${submission.summary.businessName} (${submission.summary.websiteType}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                      >
                        <span>Reference via WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="min-h-[44px] inline-flex items-center px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                        Project Inquiry Form
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Fields marked with <span className="text-rose-600">*</span> are required.
                      </p>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Honeypot field hidden from human users */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="websiteConfirm">Leave this field empty</label>
                      <input
                        id="websiteConfirm"
                        name="websiteConfirm"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={fields.websiteConfirm}
                        onChange={(e) => updateField('websiteConfirm', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Full Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          value={fields.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.fullName)}
                          aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                          placeholder="Alex Morgan"
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                            fieldErrors.fullName ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {fieldErrors.fullName && (
                          <p id="fullName-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Business Name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          autoComplete="organization"
                          value={fields.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.businessName)}
                          aria-describedby={fieldErrors.businessName ? 'businessName-error' : undefined}
                          placeholder="Northstar Hospitality Ltd"
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                            fieldErrors.businessName ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {fieldErrors.businessName && (
                          <p id="businessName-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.businessName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Email Address <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={fields.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                          placeholder="alex@company.com"
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                            fieldErrors.email ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={fields.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
                          placeholder="+44 7700 900000"
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                            fieldErrors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {fieldErrors.phone && (
                          <p id="phone-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="websiteType"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Type of Website Required <span className="text-rose-600">*</span>
                        </label>
                        <select
                          id="websiteType"
                          name="websiteType"
                          required
                          value={fields.websiteType}
                          onChange={(e) => updateField('websiteType', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.websiteType)}
                          aria-describedby={fieldErrors.websiteType ? 'websiteType-error' : undefined}
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors ${
                            fieldErrors.websiteType ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        >
                          <option value="">Select website type...</option>
                          {WEBSITE_TYPE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.websiteType && (
                          <p id="websiteType-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.websiteType}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Estimated Budget <span className="text-rose-600">*</span>
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          required
                          value={fields.budget}
                          onChange={(e) => updateField('budget', e.target.value)}
                          aria-invalid={Boolean(fieldErrors.budget)}
                          aria-describedby={fieldErrors.budget ? 'budget-error' : undefined}
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors ${
                            fieldErrors.budget ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                          }`}
                        >
                          <option value="">Select budget range...</option>
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.budget && (
                          <p id="budget-error" className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.budget}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Project Description <span className="text-rose-600">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={fields.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.description)}
                        aria-describedby={fieldErrors.description ? 'description-error' : undefined}
                        placeholder="Describe your business, key pages or features needed, and your ideal launch window..."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors ${
                          fieldErrors.description ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {fieldErrors.description && (
                        <p id="description-error" className="mt-1.5 text-xs text-rose-600">
                          {fieldErrors.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="additionalRequirements"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Additional Requirements (Optional)
                      </label>
                      <textarea
                        id="additionalRequirements"
                        name="additionalRequirements"
                        rows={2}
                        value={fields.additionalRequirements}
                        onChange={(e) => updateField('additionalRequirements', e.target.value)}
                        placeholder="Existing website URL, integrations, booking tools, or branding assets..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600 transition-colors"
                      />
                    </div>

                    {/* Human Spam Verification */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <label
                        htmlFor="humanCheck"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Spam Protection: What is 7 + 5? <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="humanCheck"
                        name="humanCheck"
                        type="text"
                        inputMode="numeric"
                        required
                        value={fields.humanCheck}
                        onChange={(e) => updateField('humanCheck', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.humanCheck)}
                        aria-describedby={fieldErrors.humanCheck ? 'humanCheck-error' : undefined}
                        placeholder="Enter answer"
                        className={`w-40 min-h-[42px] px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-900 font-mono ${
                          fieldErrors.humanCheck ? 'border-rose-500' : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {fieldErrors.humanCheck && (
                        <p id="humanCheck-error" className="mt-1.5 text-xs text-rose-600">
                          {fieldErrors.humanCheck}
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            <span>Submitting Project Brief...</span>
                          </>
                        ) : (
                          <span>Submit Project Inquiry</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
