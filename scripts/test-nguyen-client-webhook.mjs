const endpoint = 'https://script.google.com/macros/s/AKfycbxHDrevJjnpWcPEx3Vykh0qgOAFrIpbBCp0licKO4U6-CJPUcMaWsMjj0lr8W4Wv9Nt/exec';
const recipients = 'consultant@nguyenarchitecture.com,info@nguyenarchitecture.com,taido097@gmail.com';
const stamp = String(Date.now());
const cases = [
  { name: 'Nguyen Consultation Delivery Test ' + stamp, email: 'taido097@gmail.com', phone: '7147078889', company: '', message: 'Inquiry Type: Project Consultation\nProject Type: Custom Home\n\nAutomated delivery test.' },
  { name: 'Nguyen Collaboration Delivery Test ' + stamp, email: 'taido097@gmail.com', phone: '7147078889', company: 'Test Contractor', message: 'Inquiry Type: Contractor / Developer Collaboration\nProject Type: Commercial\n\nAutomated delivery test.' }
];
for (const payload of cases) {
  const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, redirect: 'follow', body: JSON.stringify({ ...payload, notifyTo: recipients, notifyFromName: 'NGUYEN Architecture Website', submittedAt: new Date().toISOString() }) });
  const body = await response.text();
  console.log('NGUYEN_EMAIL_E2E', response.status, payload.name, body);
  let result = {};
  try { result = JSON.parse(body); } catch {}
  if (!response.ok || result.success !== true) throw new Error('Nguyen email delivery test failed for ' + payload.name);
}