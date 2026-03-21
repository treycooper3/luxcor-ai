import PptxGenJs from 'pptxgenjs'
import { getLead } from '@/lib/notion'
import { projectTypeLabels, budgetLabels } from '@/types'

const colors = {
  primary: '0062FF',
  secondary: '7C3AED',
  dark: '0F172A',
  light: 'F1F5F9',
  accent: '06B6D4',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> },
) {
  try {
    const { leadId } = await params
    const lead = await getLead(leadId)

    if (!lead) {
      return new Response('Lead not found', { status: 404 })
    }

    const prs = new PptxGenJs()

    // Slide 1: Cover
    let slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('LuxCor AI', {
      x: 0.5,
      y: 2,
      w: 9,
      h: 1,
      fontSize: 54,
      bold: true,
      color: colors.primary,
    })
    slide.addText('Custom Proposal', {
      x: 0.5,
      y: 3.2,
      w: 9,
      h: 0.8,
      fontSize: 44,
      color: colors.light,
    })
    slide.addText(`for ${lead.company}`, {
      x: 0.5,
      y: 4.2,
      w: 9,
      h: 0.6,
      fontSize: 28,
      color: colors.secondary,
    })
    slide.addText(`Prepared for: ${lead.name}`, {
      x: 0.5,
      y: 5.5,
      w: 9,
      h: 0.4,
      fontSize: 16,
      color: 'A0AEC0',
    })
    slide.addText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }), {
      x: 0.5,
      y: 6.8,
      w: 9,
      h: 0.4,
      fontSize: 14,
      color: '64748B',
    })

    // Slide 2: Problem
    slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('Your Challenge', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.7,
      fontSize: 44,
      bold: true,
      color: colors.light,
    })
    slide.addShape(prs.ShapeType.rect, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fill: { color: '1E293B' },
      line: { color: colors.primary, width: 2 },
    })
    const projectTypeLabel = lead.projectType && lead.projectType in projectTypeLabels
      ? projectTypeLabels[lead.projectType as keyof typeof projectTypeLabels]
      : 'AI solutions'
    slide.addText(lead.message || `Implementing ${projectTypeLabel}`, {
      x: 1,
      y: 2,
      w: 8,
      h: 3,
      fontSize: 20,
      color: colors.light,
      align: 'left',
    })

    // Slide 3: Solution
    slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('Our Solution', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.7,
      fontSize: 44,
      bold: true,
      color: colors.light,
    })
    const solutionTitle = lead.projectType && lead.projectType in projectTypeLabels
      ? projectTypeLabels[lead.projectType as keyof typeof projectTypeLabels]
      : 'Custom AI Solution'
    slide.addText(solutionTitle, {
      x: 0.5,
      y: 1.4,
      w: 9,
      h: 0.5,
      fontSize: 28,
      color: colors.secondary,
      bold: true,
    })
    const features = [
      'Expert team with proven track record',
      'Fast delivery (weeks, not months)',
      'Measurable business results',
      'Ongoing optimization & support',
    ]
    let yPos = 2.2
    features.forEach((feature) => {
      slide.addText(`• ${feature}`, {
        x: 1,
        y: yPos,
        w: 8,
        h: 0.4,
        fontSize: 16,
        color: colors.light,
      })
      yPos += 0.5
    })

    // Slide 4: Why LuxCor
    slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('Why LuxCor?', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.7,
      fontSize: 44,
      bold: true,
      color: colors.light,
    })
    const reasons = [
      { title: 'Expert Team', desc: 'Years of shipping AI at scale' },
      { title: 'Fast Delivery', desc: 'Weeks not months' },
      { title: 'Results-Driven', desc: 'Your business metrics matter' },
    ]
    let xPos = 0.5
    reasons.forEach((reason) => {
      slide.addShape(prs.ShapeType.rect, {
        x: xPos,
        y: 1.5,
        w: 2.8,
        h: 3.5,
        fill: { color: '1E293B' },
        line: { color: colors.primary, width: 1 },
      })
      slide.addText(reason.title, {
        x: xPos + 0.2,
        y: 1.8,
        w: 2.4,
        h: 0.5,
        fontSize: 16,
        bold: true,
        color: colors.secondary,
      })
      slide.addText(reason.desc, {
        x: xPos + 0.2,
        y: 2.5,
        w: 2.4,
        h: 2.3,
        fontSize: 12,
        color: colors.light,
      })
      xPos += 3.2
    })

    // Slide 5: Investment
    slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('Investment', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.7,
      fontSize: 44,
      bold: true,
      color: colors.light,
    })

    const budgetRange = lead.budget && lead.budget in budgetLabels
      ? budgetLabels[lead.budget as keyof typeof budgetLabels]
      : 'Custom'
    const priceText =
      lead.budget === 'under_5k'
        ? '$3,000 - $5,000'
        : lead.budget === '5k_10k'
          ? '$7,500 - $10,000'
          : lead.budget === '10k_25k'
            ? '$15,000 - $25,000'
            : 'Custom Quote'

    slide.addShape(prs.ShapeType.rect, {
      x: 2,
      y: 1.8,
      w: 6,
      h: 3.2,
      fill: { color: colors.primary },
      line: { color: colors.secondary, width: 2 },
    })
    slide.addText(priceText, {
      x: 2.2,
      y: 2.2,
      w: 5.6,
      h: 0.8,
      fontSize: 48,
      bold: true,
      color: colors.light,
      align: 'center',
    })
    slide.addText('Includes design, development, deployment, and 30 days support', {
      x: 2.2,
      y: 3.2,
      w: 5.6,
      h: 1,
      fontSize: 14,
      color: colors.light,
      align: 'center',
    })

    // Slide 6: Next Steps
    slide = prs.addSlide()
    slide.background = { color: colors.dark }
    slide.addText('Next Steps', {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.7,
      fontSize: 44,
      bold: true,
      color: colors.light,
    })
    const steps = [
      '1. Schedule a discovery call to review this proposal',
      '2. Deep dive into your requirements and timeline',
      '3. Finalize contract and kickoff',
      '4. Begin development with weekly check-ins',
    ]
    yPos = 1.8
    steps.forEach((step) => {
      slide.addText(step, {
        x: 1,
        y: yPos,
        w: 8,
        h: 0.5,
        fontSize: 16,
        color: colors.light,
      })
      yPos += 0.8
    })
    slide.addText('Ready to get started?', {
      x: 0.5,
      y: 5.5,
      w: 9,
      h: 0.4,
      fontSize: 20,
      color: colors.secondary,
      bold: true,
      align: 'center',
    })
    slide.addText('Schedule a call at calendly.com/treycooper', {
      x: 0.5,
      y: 6,
      w: 9,
      h: 0.4,
      fontSize: 16,
      color: colors.accent,
      align: 'center',
    })

    // Generate PPTX and send as response
    const pptxBlob = await prs.write({ outputType: 'blob' })

    return new Response(pptxBlob, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${lead.company}-luxcor-proposal.pptx"`,
      },
    })
  } catch (error) {
    console.error('PPTX generation error:', error)
    return new Response('Failed to generate presentation', { status: 500 })
  }
}
