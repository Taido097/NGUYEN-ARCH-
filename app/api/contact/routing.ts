export type InquiryType = 'consultation' | 'collaboration';

const CONTACT_RECIPIENTS: Record<InquiryType, string> = {
  consultation: 'consultant@nguyenarchitecture.com,taido097@gmail.com',
  collaboration: 'info@nguyenarchitecture.com,taido097@gmail.com',
};

export function getContactRecipient(inquiryType: string) {
  const recipient = CONTACT_RECIPIENTS[inquiryType as InquiryType];

  if (!recipient) {
    throw new Error('Invalid inquiry type.');
  }

  return recipient;
}

const INQUIRY_LABELS: Record<InquiryType, string> = {
  consultation: 'Project Consultation',
  collaboration: 'Contractor / Developer Collaboration',
};

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
