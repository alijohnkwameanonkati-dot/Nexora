export interface InquiryFormFields {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  description: string;
  additionalRequirements: string;
  websiteConfirm: string;
  humanCheck: string;
}

export type InquiryFieldErrors = Partial<Record<keyof InquiryFormFields, string>>;

export function validateInquiryFields(fields: InquiryFormFields): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};

  if (fields.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (fields.businessName.trim().length < 2) {
    errors.businessName = 'Please enter your business or organization name.';
  }

  const email = fields.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Please enter a valid business or personal email address.';
  }

  const phone = fields.phone.trim();
  if (phone.length > 0 && !/^[+\d\s().-]{7,24}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number (7–24 digits/symbols) or leave blank.';
  }

  if (!fields.websiteType) {
    errors.websiteType = 'Select the type of website you need.';
  }

  if (!fields.budget) {
    errors.budget = 'Select an estimated project budget.';
  }

  if (fields.description.trim().length < 20) {
    errors.description = 'Please describe your project goals (minimum 20 characters).';
  }

  if (fields.humanCheck.trim() !== '12') {
    errors.humanCheck = 'Please enter 12 to verify you are human.';
  }

  return errors;
}
