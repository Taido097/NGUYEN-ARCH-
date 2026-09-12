'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
} from 'lucide-react';

const CONTACT_EMAIL = 'designedbytd.studio@gmail.com';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.error || 'Your message could not be sent. Please try again.'
        );
      }

      setSubmitStatus('success');
      setFormData(emptyForm);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Your message could not be sent. Please try again.'
      );
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-white pt-20">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-light text-gray-700 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <section className="border-b border-gray-300 bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 text-6xl font-light text-black sm:text-7xl">
              Let&apos;s Talk
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-700">
              Tell me about your business and the website you need. Click send
              once and your request will be delivered directly to me.
            </p>
          </div>
        </section>

        <section className="flex-grow py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-3">
              <div className="space-y-12">
                <div>
                  <h2 className="mb-8 text-3xl font-light text-black">
                    Contact Info
                  </h2>

                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <Mail className="h-5 w-5 shrink-0 text-black" />
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-black">
                          Email
                        </p>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-light text-gray-700 transition-colors hover:text-black"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <MapPin className="h-5 w-5 shrink-0 text-black" />
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-black">
                          Location
                        </p>
                        <p className="font-light text-gray-700">
                          Orange County, CA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 bg-white p-6">
                  <p className="text-sm font-light text-gray-700">
                    <span className="font-medium text-black">Response Time:</span>{' '}
                    I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium uppercase tracking-wider text-black"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      autoComplete="name"
                      className="rounded-none border-gray-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium uppercase tracking-wider text-black"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      autoComplete="email"
                      className="rounded-none border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium uppercase tracking-wider text-black"
                    >
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(714) 555-0123"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      minLength={7}
                      maxLength={30}
                      autoComplete="tel"
                      className="rounded-none border-gray-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium uppercase tracking-wider text-black"
                    >
                      Company/Business
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your business name"
                      value={formData.company}
                      onChange={handleChange}
                      maxLength={150}
                      autoComplete="organization"
                      className="rounded-none border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium uppercase tracking-wider text-black"
                  >
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me what kind of website you want..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={6}
                    className="resize-none rounded-none border-gray-300"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div
                    role="status"
                    className="flex items-start gap-3 border border-green-300 bg-green-50 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <div>
                      <p className="font-medium text-green-950">
                        Your request was sent.
                      </p>
                      <p className="mt-1 text-sm font-light text-green-900">
                        Thank you. I received your information and will respond
                        as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="border border-red-300 bg-red-50 p-4"
                  >
                    <p className="text-sm text-red-900">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="h-12 w-full rounded-none bg-black font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {submitStatus === 'loading' ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Request'
                  )}
                </Button>

                <p className="text-xs font-light text-gray-600">
                  Fields marked with * are required. Your message is sent
                  securely from this website.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
