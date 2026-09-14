const endpoint = 'https://nguyenarchitecture.com/api/contact';
const stamp = String(Date.now());

const cases = [
  {
    label: 'consultation',
    payload: {
      inquiryType: 'consultation',
      name: 'Codex E2E Consultation ' + stamp,
      email: 'taido097@gmail.com',
      phone: '7147078889',
      projectType: 'Custom Home',
      budget: '2,500 - 10,000 sq ft',
      message: 'Automated end-to-end test of the customer consultation email route.',
      company: '',
      website: '',
    },
  },
  {
    label: 'collaboration',
    payload: {
      inquiryType: 'collaboration',
      name: 'Codex E2E Collaboration ' + stamp,
      email: 'taido097@gmail.com',
      phone: '7147078889',
      projectType: 'Commercial',
      budget: '10,000 - 50,000 sq ft',
      message: 'Automated end-to-end test of the contractor collaboration email route.',
      company: 'Codex Test Contractor',
      website: '',
    },
  },
];

for (const testCase of cases) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testCase.payload),
  });
  const result = await response.json();
  console.log('CONTACT_E2E', testCase.label, response.status, JSON.stringify(result));
  if (!response.ok || result.success !== true) {
    throw new Error(testCase.label + ' contact routing failed');
  }
}
