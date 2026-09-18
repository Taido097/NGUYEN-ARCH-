export type InquiryType = 'consultation' | 'collaboration';

const CONTACT_RECIPIENTS: Record<InquiryType, string> = {
  consultation: 'consultant@nguyenarchitecture.com,taido097@gmail.com,unclemango097@gmail.com',
  collaboration: 'info@nguyenarchitecture.com,taido097@gmail.com,unclemango097@gmail.com',
};

export function getContactRecipient(inquiryType: string) {
  const recipient = CONTACT_RECIPIENTS[inquiryType as InquiryType];

  if (!recipient) {
    throw new Error('Invalid inquiry type.');
  }

  return recipient;
}

const INQUIRY_LABELS: Record<InquiryType, string> = {
  consultation: 'Project Inquiry',
  collaboration: 'Collaboration',
};

const SUBJECT_PREFIXES: Record<InquiryType, string> = {
  consultation: 'New Project Inquiry',
  collaboration: 'New Collaboration Request',
};

export function getContactSubject(inquiryType: string, projectType: string) {
  const prefix = SUBJECT_PREFIXES[inquiryType as InquiryType];

  if (!prefix) {
    throw new Error('Invalid inquiry type.');
  }

  return `${prefix} — ${projectType || 'Not provided'}`;
}

export function buildContactDetails({
  inquiryType,
  projectType,
  budget,
  message,
}: {
  inquiryType: InquiryType;
  projectType: string;
  budget: string;
  message: string;
}) {
  return [
    `Inquiry Type: ${INQUIRY_LABELS[inquiryType]}`,
    `Project Type: ${projectType || 'Not provided'}`,
    `Budget: ${budget || 'Not provided'}`,
    '',
    'Project Description:',
    message,
  ].join('\n');
}
