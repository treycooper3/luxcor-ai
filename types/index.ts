export interface Lead {
  id: string
  name: string
  email: string
  company: string
  budget?: string
  projectType?: string
  message?: string
  createdAt?: string
}

export type ProjectType = 'voice_agent' | 'website' | 'full_stack' | 'other'
export type BudgetRange = 'under_5k' | '5k_10k' | '10k_25k' | '25k_plus'

export const projectTypeLabels: Record<ProjectType, string> = {
  voice_agent: 'Voice Agent',
  website: 'Website & Web App',
  full_stack: 'Full Stack AI App',
  other: 'Custom Solution',
}

export const budgetLabels: Record<BudgetRange, string> = {
  under_5k: 'Under $5,000',
  '5k_10k': '$5,000 - $10,000',
  '10k_25k': '$10,000 - $25,000',
  '25k_plus': '$25,000+',
}
