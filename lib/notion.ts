import { Client } from '@notionhq/client'
import { Lead } from '@/types'

function getNotionClient() {
  return new Client({
    auth: process.env.NOTION_API_KEY,
  })
}

export async function getLead(pageId: string): Promise<Lead | null> {
  try {
    const notion = getNotionClient()
    const response = await notion.pages.retrieve({ page_id: pageId })

    if (!response || !('properties' in response)) {
      return null
    }

    // Extract properties from Notion response
    const properties = response.properties as Record<string, any>

    const lead: Lead = {
      id: response.id,
      name: extractText(properties.Name),
      email: extractText(properties.Email),
      company: extractText(properties.Company),
      budget: extractSelect(properties.Budget),
      projectType: extractSelect(properties['Project Type']),
      message: extractText(properties.Message),
      createdAt: response.created_time,
    }

    return lead
  } catch (error) {
    console.error('Error fetching lead from Notion:', error)
    return null
  }
}

// Helper function to extract text from title property
function extractText(property: any): string {
  if (!property) return ''

  if (property.type === 'title' && Array.isArray(property.title)) {
    return property.title.map((t: any) => t.plain_text).join('')
  }

  if (property.type === 'rich_text' && Array.isArray(property.rich_text)) {
    return property.rich_text.map((t: any) => t.plain_text).join('')
  }

  if (property.type === 'email') {
    return property.email || ''
  }

  return ''
}

// Helper function to extract select option
function extractSelect(property: any): string | undefined {
  if (!property || property.type !== 'select' || !property.select) {
    return undefined
  }
  return property.select.name
}
