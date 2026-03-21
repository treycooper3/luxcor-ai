'use client'

import { useEffect, useState } from 'react'
import { getLead } from '@/lib/notion'
import { Lead, projectTypeLabels, budgetLabels } from '@/types'
import Link from 'next/link'

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

export default function ProposalPage({ params }: { params: { leadId: string } }) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchLead = async () => {
      const data = await getLead(params.leadId)
      setLead(data)
      setLoading(false)
    }

    fetchLead()
  }, [params.leadId])

  const handleDownloadPPTX = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/proposal/${params.leadId}/download`)
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
                  <li key={i} className="text-slate-300 flex gap-2">
                    <span className="text-blue-400">→</span> {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why LuxCor */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why LuxCor?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Expert Team',
                description: 'Years of experience shipping AI solutions at scale',
              },
              {
                title: 'Fast Delivery',
                description: 'From concept to production in weeks, not months',
              },
              {
                title: 'Results Focused',
                description: 'We measure success by your business metrics',
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Recent Success Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">CLIENT</p>
                <h3 className="text-lg font-semibold text-white mb-1">{study.client}</h3>
                <p className="text-slate-300 text-sm mb-4">{study.project}</p>
                <p className="text-blue-400 font-semibold">{study.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Investment</h2>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
            <p className="text-slate-300 mb-4">Based on your requirements:</p>
            <div className="text-4xl font-bold text-blue-400 mb-4">
              {budget === 'Under $5,000'
                ? '$3,000 - $5,000'
                : budget === '$5,000 - $10,000'
                  ? '$7,500 - $10,000'
                  : budget === '$10,000 - $25,000'
                    ? '$15,000 - $25,000'
                    : 'Custom Quote'}
            </div>
            <p className="text-slate-400">
              Includes design, development, deployment, and 30 days of post-launch support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA & Download */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleDownloadPPTX}
              disabled={downloading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              {downloading ? 'Generating...' : '📥 Download as PowerPoint'}
            </button>

            <a
              href="https://calendly.com/treycooper"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition inline-block"
            >
              📅 Schedule a Discovery Call
            </a>
          </div>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Ready to get started? We&apos;ll dive deeper into your requirements, answer any questions, and create a
            detailed project timeline.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 px-4 text-center text-slate-500">
        <p>© 2026 LuxCor AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
