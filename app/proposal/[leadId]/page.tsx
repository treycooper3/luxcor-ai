'use client'

import { useEffect, useState } from 'react'
import { getLead } from '@/lib/notion'
import { Lead, projectTypeLabels, budgetLabels } from '@/types'
import Link from 'next/link'
import { use } from 'react'

const solutions = {
  voice_agent: {
    title: 'AI Voice Agent',
    description:
      'Intelligent voice assistants powered by cutting-edge NLP and text-to-speech technology.',
    features: [
      'Natural language understanding and processing',
      'Multi-language support with accent optimization',
      'Real-time conversation handling',
      'Integration with existing phone systems',
      'Custom training on your domain data',
      'Analytics and call recording',
    ],
    useCases: ['Customer support automation', 'Sales outreach at scale', 'Lead qualification'],
  },
  website: {
    title: 'AI-Enhanced Website',
    description:
      'Custom web applications with embedded AI capabilities for superior user experience.',
    features: [
      'Responsive design optimized for all devices',
      'AI chatbot for customer engagement',
      'Performance optimization and SEO',
      'Content recommendations engine',
      'User behavior analytics',
      'Seamless third-party integrations',
    ],
    useCases: ['Lead capture and nurturing', 'E-commerce optimization', 'Content personalization'],
  },
  full_stack: {
    title: 'Full Stack AI Application',
    description:
      'End-to-end solutions combining frontend, backend, and AI/ML capabilities.',
    features: [
      'Custom cloud architecture (AWS, GCP, Azure)',
      'Scalable backend with microservices',
      'Modern responsive frontend',
      'Machine learning model integration',
      'Real-time data processing',
      '24/7 monitoring and support',
    ],
    useCases: [
      'Complex automation workflows',
      'Data-driven decision systems',
      'Enterprise-scale applications',
    ],
  },
  other: {
    title: 'Custom AI Solution',
    description: 'Tailored solutions designed specifically for your unique business needs.',
    features: [
      'In-depth discovery and strategy session',
      'Custom architecture design',
      'Proof of concept development',
      'Iterative refinement',
      'Team knowledge transfer',
      'Ongoing optimization',
    ],
    useCases: ['Unique business challenges', 'Industry-specific solutions', 'Innovation projects'],
  },
}

const caseStudies = [
  {
    client: 'C&C Contracting',
    project: 'Lead Gen Voice Agent',
    result: '300+ qualified leads/month',
  },
  {
    client: 'TnD Mechanical',
    project: 'Proposal Automation',
    result: '60-second proposal generation',
  },
  {
    client: 'Surgical FX',
    project: 'Web + AI Integration',
    result: '45% lead qualification improvement',
  },
]

export default function ProposalPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = use(params)
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchLead = async () => {
      const data = await getLead(leadId)
      setLead(data)
      setLoading(false)
    }

    fetchLead()
  }, [leadId])

  const handleDownloadPPTX = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/proposal/${leadId}/download`)
      if (!response.ok) throw new Error('Failed to generate presentation')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${lead?.company || 'proposal'}-luxcor-proposal.pptx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download presentation. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading your proposal...</div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl mb-4">Proposal Not Found</h1>
          <p className="text-slate-400 mb-8">This proposal link may have expired.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to LuxCor
          </Link>
        </div>
      </div>
    )
  }

  const solution = solutions[lead.projectType as keyof typeof solutions] || solutions.other
  const budget = lead.budget ? budgetLabels[lead.budget as keyof typeof budgetLabels] : 'Custom'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Here&apos;s how LuxCor solves {lead.company}&apos;s challenges
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            A custom proposal tailored to your needs, prepared for {lead.name}
          </p>
          <div className="flex justify-center gap-4">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300">
              {solution.title}
            </span>
            <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300">
              {budget}
            </span>
          </div>
        </div>
      </section>

      {/* Problem Analysis */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Your Challenge</h2>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <p className="text-lg text-slate-300 leading-relaxed">
              {lead.message ||
                `You're looking to ${lead.projectType === 'voice_agent' ? 'automate customer interactions with AI voice technology' : lead.projectType === 'website' ? 'build an AI-powered web presence' : lead.projectType === 'full_stack' ? 'develop a comprehensive AI solution' : 'enhance your operations with custom AI'}.`}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Our Recommended Solution</h2>

          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
            <p className="text-slate-200 mb-6">{solution.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solution.features.map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-4">How it helps you:</h4>
              <ul className="space-y-2">
                {solution.useCases.map((useCase, i) => (
                  <li key={i} className="text-slate-200">
                    • {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Proven Results</h2>
          <p className="text-slate-300 mb-8">
            Here&apos;s what we&apos;ve delivered for other clients:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-2">{study.client}</h4>
                <p className="text-slate-400 text-sm mb-3">{study.project}</p>
                <p className="text-blue-400 font-semibold">{study.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Investment</h2>
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-lg mb-4">
            <div className="bg-slate-900 px-12 py-8 rounded-lg">
              <div className="text-5xl font-bold text-white mb-2">
                {lead.budget === 'under_5k'
                  ? '$3,000 - $5,000'
                  : lead.budget === '5k_10k'
                    ? '$7,500 - $10,000'
                    : lead.budget === '10k_25k'
                      ? '$15,000 - $25,000'
                      : 'Custom Quote'}
              </div>
              <div className="text-slate-400">
                Includes design, development, deployment, and 30 days support
              </div>
            </div>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            This estimate is based on the scope described. Final pricing will be confirmed after a
            discovery call to ensure we understand all your requirements.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Next Steps</h2>

          <div className="space-y-6 mb-12">
            {[
              { num: '1', text: 'Schedule a discovery call to review this proposal' },
              { num: '2', text: 'Deep dive into your requirements and timeline' },
              { num: '3', text: 'Finalize contract and kickoff' },
              { num: '4', text: 'Begin development with weekly check-ins' },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">{step.num}</span>
                </div>
                <p className="text-lg text-slate-200 pt-1">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <button
              onClick={handleDownloadPPTX}
              disabled={downloading}
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? 'Generating...' : 'Download as PowerPoint'}
            </button>
            <br />
            <a
              href="https://calendly.com/treycooper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Schedule Discovery Call
            </a>
            <p className="text-slate-400 text-sm">
              Questions? Email us at{' '}
              <a href="mailto:trey@luxcor.tech" className="text-blue-400 hover:text-blue-300">
                trey@luxcor.tech
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2025 LuxCor AI. All rights reserved.</p>
          <p className="mt-2">
            This proposal is valid for 30 days from the date of generation.
          </p>
        </div>
      </footer>
    </div>
  )
}
