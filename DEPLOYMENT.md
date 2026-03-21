# Luxcor AI - Vercel Deployment Guide

## 🚀 Deployment Steps

### 1. Connect GitHub to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import `treycooper3/luxcor-ai` from GitHub
4. Vercel will auto-detect Next.js settings ✅

### 2. Configure Environment Variables
Add this required environment variable in Vercel:

**Required:**
- `N8N_LUXCOR_WEBHOOK_URL` - Your n8n webhook URL for lead capture

**Optional (for proposal system):**
- `NOTION_API_KEY` - Notion integration token
- `NOTION_LEADS_DB_ID` - Notion database ID for leads

### 3. Deploy
Click "Deploy" and Vercel will:
- Build the Next.js app
- Deploy to production
- Give you a live URL (e.g., luxcor-ai.vercel.app)

### 4. Test the Form
Once deployed:
1. Visit your live site
2. Fill out the contact form
3. Submit and verify the lead goes to n8n → Telegram/Notion

## 🔧 Features Deployed

✅ **2-Step Contact Form**
- Initial: Name, Email, Company
- Details: Budget, Project Type, Message (optional)
- Skip option for quick leads

✅ **API Integration**
- `/api/contact` → forwards to n8n webhook
- Error handling & validation
- Success confirmation UI

✅ **Proposal System**
- `/api/proposal/[leadId]/download` - PDF download endpoint
- `/proposal/[leadId]` - Branded proposal pages
- Notion integration for lead data

## 📝 Form Flow
1. User fills initial info (name, email, company)
2. User optionally provides budget/project details
3. Form submits to `/api/contact`
4. API forwards to n8n webhook
5. n8n sends Telegram notification & saves to Notion
6. User sees success message

## 🎨 Custom Domain (Optional)
In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., luxcor.ai)
3. Update DNS records as instructed
4. SSL auto-configured ✅

## 🐛 Troubleshooting

**Form not submitting?**
- Check `N8N_LUXCOR_WEBHOOK_URL` is set in Vercel
- Verify n8n webhook is active
- Check Vercel Function Logs

**Build failing?**
- Make sure all dependencies are in package.json
- Check for TypeScript errors in build logs

## 📊 Monitoring
- Vercel Analytics: Track form submissions
- Function Logs: Debug API issues
- n8n Logs: Verify webhook delivery
