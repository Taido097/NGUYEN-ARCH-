# Analytics Setup Guide

This guide shows how to set up analytics tracking on your Tai Do website.

## Google Analytics 4

### Step 1: Create a Google Analytics Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Create Account" and follow the setup wizard
3. Create a new "Web" property for your site
4. Copy your **Measurement ID** (starts with G-)

### Step 2: Add Environment Variable
1. Go to your project settings in Vercel
2. Go to **Settings → Environment Variables**
3. Add a new variable: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Redeploy your site

### Step 3: Analytics Will Automatically Enable
Once the environment variable is set, Google Analytics will start tracking:
- Page views
- User interactions
- Form submissions
- Conversion events

## Vercel Analytics (Already Enabled)

The site already includes Vercel Analytics via the `@vercel/analytics` package. This provides:
- Web Vitals monitoring
- Performance metrics
- User experience data

View analytics at: [vercel.com/dashboard](https://vercel.com/dashboard)

## Recommended Events to Track

### Conversion Events
- Contact form submission
- Pricing CTA clicks
- "Get Started" button clicks
- Case study views

### User Engagement
- FAQ section views
- Portfolio section views
- Testimonial reads

### Important Metrics to Monitor
- Lead conversion rate
- Form submission rate
- Page scroll depth
- Time on page

## Integration with Email Service

Once you integrate SendGrid, Mailgun, or another email service for contact forms, you can:
1. Track when forms are submitted
2. Follow up with analytics on lead quality
3. Measure ROI of design improvements

See the contact form API route for email integration options.
