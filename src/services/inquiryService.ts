import { AGENCY_BRAND } from '../config/agency';
import type {
  AgencyPublicConfig,
  InquiryFormPayload,
  InquirySubmissionResponse,
} from '../types';

export class InquiryApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'InquiryApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function fetchPublicConfig(): Promise<AgencyPublicConfig> {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) {
      return AGENCY_BRAND.defaultConfig;
    }
    const data = (await res.json()) as Partial<AgencyPublicConfig>;
    return {
      whatsappNumber: data.whatsappNumber || AGENCY_BRAND.defaultConfig.whatsappNumber,
      contactEmail: data.contactEmail || AGENCY_BRAND.defaultConfig.contactEmail,
      agencyLocation: data.agencyLocation || AGENCY_BRAND.defaultConfig.agencyLocation,
    };
  } catch {
    return AGENCY_BRAND.defaultConfig;
  }
}

export async function fetchSecurityToken(): Promise<string> {
  const res = await fetch('/api/inquiries/token');
  if (!res.ok) {
    throw new Error('Could not initialize secure form session.');
  }
  const data = (await res.json()) as { token?: string };
  if (!data.token) {
    throw new Error('Security token missing from server response.');
  }
  return data.token;
}

export async function submitProjectInquiry(
  payload: InquiryFormPayload
): Promise<InquirySubmissionResponse> {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new InquiryApiError(
      typeof data.error === 'string'
        ? data.error
        : 'Unable to process your inquiry. Please try again.',
      res.status,
      data.fieldErrors
    );
  }

  return data as InquirySubmissionResponse;
}
