'use client';

import { useState } from 'react';
import Navbar from '../services/navbar';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      `Project Type: ${fields.projectType}`,
      `Budget: ${fields.budget}`,
      '',
      `Message:`,
      fields.message,
    ].join('\n');
    window.location.href = `mailto:info@nguyenarchitecture.com?subject=Project Inquiry — ${encodeURIComponent(fields.name)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar />
      <main className="cf-page">
        {submitted ? (
          <div className="cf-thanks">
            <p className="cf-thanks-eyebrow">Thank you</p>
            <h1 className="cf-thanks-h">We received your message.</h1>
            <p className="cf-thanks-sub">Our team reviews every inquiry and will be in touch within 1–2 business days.</p>
            <a className="cf-btn" href="/client-demos/client-8889/arcsphere-socal">Back to Home</a>
          </div>
        ) : (
          <div className="cf-shell">
            <div className="cf-header">
              <p className="cf-eyebrow">Get in Touch</p>
              <h1 className="cf-h1">Start a Project</h1>
              <p className="cf-sub">Tell us about your project and we'll get back to you within 1–2 business days.</p>
            </div>

            <div className="cf-body">
              <form className="cf-form" onSubmit={handleSubmit} noValidate>
                <div className="cf-row">
                  <label className="cf-field">
                    <span className="cf-label">Full Name <span className="cf-req">*</span></span>
                    <input
                      className="cf-input"
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label className="cf-field">
                    <span className="cf-label">Email Address <span className="cf-req">*</span></span>
                    <input
                      className="cf-input"
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      required
                      autoComplete="email"
                    />
                  </label>
                </div>

                <div className="cf-row">
                  <label className="cf-field">
                    <span className="cf-label">Phone Number</span>
                    <input
                      className="cf-input"
                      type="tel"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      placeholder="(714) 000-0000"
                      autoComplete="tel"
                    />
                  </label>
                  <label className="cf-field">
                    <span className="cf-label">Project Type <span className="cf-req">*</span></span>
                    <select
                      className="cf-input cf-select"
                      name="projectType"
                      value={fields.projectType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a project type…</option>
                      <option value="Custom Home">Custom Home</option>
                      <option value="Addition / Remodel">Addition / Remodel</option>
                      <option value="ADU">ADU (Accessory Dwelling Unit)</option>
                      <option value="Multifamily">Multifamily</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land Development">Land Development</option>
                      <option value="Engineering / Approvals">Engineering &amp; Approvals</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <label className="cf-field">
                  <span className="cf-label">Approximate Budget</span>
                  <select
                    className="cf-input cf-select"
                    name="budget"
                    value={fields.budget}
                    onChange={handleChange}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Under $100K">Under $100K</option>
                    <option value="$100K – $300K">$100K – $300K</option>
                    <option value="$300K – $600K">$300K – $600K</option>
                    <option value="$600K – $1M">$600K – $1M</option>
                    <option value="Over $1M">Over $1M</option>
                  </select>
                </label>

                <label className="cf-field">
                  <span className="cf-label">Project Description <span className="cf-req">*</span></span>
                  <textarea
                    className="cf-input cf-textarea"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your project — location, size, goals, timeline, or anything else that's helpful."
                    required
                    rows={6}
                  />
                </label>

                <button className="cf-submit" type="submit">
                  Send Inquiry
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>

              <aside className="cf-aside">
                <div className="cf-aside-block">
                  <p className="cf-aside-label">Office</p>
                  <p className="cf-aside-val">7171 Warner Ave., Ste. B<br />Huntington Beach, CA 92647</p>
                </div>
                <div className="cf-aside-block">
                  <p className="cf-aside-label">Phone</p>
                  <a className="cf-aside-val cf-aside-link" href="tel:+17147078889">(714) 707-8889</a>
                  <a className="cf-aside-val cf-aside-link" href="tel:+12092338888">(209) 233-8888</a>
                </div>
                <div className="cf-aside-block">
                  <p className="cf-aside-label">Email</p>
                  <a className="cf-aside-val cf-aside-link" href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a>
                </div>
                <div className="cf-aside-block">
                  <p className="cf-aside-label">Hours</p>
                  <p className="cf-aside-val">Mon – Fri, 9 AM – 5 PM PT</p>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

const CSS = `
*,*::before,*::after{box-sizing:border-box}
.cf-page{
  min-height:100vh;
  background:#f0ebe6;
  font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  color:#4f4742;
  padding-bottom:clamp(80px,10vw,140px);
}

/* ── shell ── */
.cf-shell{
  width:min(1200px,100%);
  margin:0 auto;
  padding:clamp(56px,6vw,96px) clamp(20px,4vw,60px) 0;
}

/* ── header ── */
.cf-eyebrow{
  font-size:11px;text-transform:uppercase;letter-spacing:.18em;font-weight:600;
  color:#9a918a;margin:0 0 18px;
}
.cf-h1{
  font-size:clamp(36px,5vw,72px);font-weight:400;letter-spacing:-.03em;
  line-height:1.05;margin:0 0 20px;color:#1f1c19;
}
.cf-sub{
  font-size:15px;line-height:1.55;color:#8a8177;margin:0;max-width:520px;
}
.cf-header{margin-bottom:clamp(40px,5vw,64px)}

/* ── body layout ── */
.cf-body{
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(220px,300px);
  gap:clamp(32px,4vw,72px);
  align-items:start;
}
.cf-form{min-width:0}

/* ── form ── */
.cf-form{display:flex;flex-direction:column;gap:24px}
.cf-row{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.cf-field{display:flex;flex-direction:column;gap:8px}
.cf-label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#736b62}
.cf-req{color:#a0392a}

.cf-input{
  width:100%;
  background:#fff;
  border:1px solid #d8d0c6;
  border-radius:6px;
  padding:13px 16px;
  font-size:15px;
  font-family:inherit;
  color:#1f1c19;
  line-height:1.4;
  outline:none;
  transition:border-color .18s;
  appearance:none;
}
.cf-input::placeholder{color:#b0a89e}
.cf-input:focus{border-color:#4f4742}
.cf-select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234f4742' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:38px}
.cf-textarea{resize:vertical;min-height:140px;line-height:1.55}

.cf-submit{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  background:#1f1c19;color:#f0ebe6;
  border:none;border-radius:100px;
  padding:16px 32px;
  font-size:14px;font-weight:500;font-family:inherit;letter-spacing:.01em;text-transform:uppercase;
  cursor:pointer;transition:opacity .2s;align-self:flex-start;
}
.cf-submit:hover{opacity:.8}

/* ── aside ── */
.cf-aside{display:flex;flex-direction:column;gap:32px;padding-top:6px;min-width:0;width:100%}
.cf-aside-block{display:flex;flex-direction:column;gap:6px;min-width:0}
.cf-aside-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:#9a918a;margin:0}
.cf-aside-val{font-size:14px;line-height:1.55;color:#4f4742;margin:0}
.cf-aside-link{color:inherit;text-decoration:none;transition:opacity .2s;display:block;white-space:nowrap;overflow-wrap:normal;word-break:normal;font-size:clamp(12px,1.4vw,14px)}
.cf-aside-link:hover{opacity:.6}

/* ── thank-you ── */
.cf-thanks{
  width:min(640px,100%);margin:0 auto;
  padding:clamp(80px,10vw,140px) clamp(20px,4vw,60px);
  text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;
}
.cf-thanks-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.18em;font-weight:600;color:#9a918a;margin:0}
.cf-thanks-h{font-size:clamp(32px,4vw,56px);font-weight:400;letter-spacing:-.03em;line-height:1.08;margin:0;color:#1f1c19}
.cf-thanks-sub{font-size:15px;line-height:1.6;color:#8a8177;margin:0;max-width:440px}
.cf-btn{
  margin-top:12px;display:inline-flex;align-items:center;gap:8px;
  background:#1f1c19;color:#f0ebe6;
  border-radius:100px;padding:14px 28px;
  font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:.01em;
  text-decoration:none;transition:opacity .2s;
}
.cf-btn:hover{opacity:.8}

/* ── responsive ── */
@media(max-width:900px){
  .cf-body{grid-template-columns:1fr}
  .cf-aside{order:-1;flex-direction:row;flex-wrap:wrap;gap:24px 40px;border-bottom:1px solid #d8d0c6;padding-bottom:32px;margin-bottom:8px}
}
@media(max-width:560px){
  .cf-row{grid-template-columns:1fr}
  .cf-aside{flex-direction:column;gap:20px}
  .cf-aside-link{font-size:13px;white-space:normal;overflow-wrap:break-word;word-break:break-word}
}
`;
