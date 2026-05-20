export const categoryColors: Record<string, string> = {
  'Réaliser': '#3b82f6',
  'Optimiser': '#8b5cf6',
  'Administrer': '#10b981',
  'Gérer': '#f59e0b',
  'Conduire': '#ef4444',
  'Collaborer': '#ec4899'
}

export const categoryKeyMap: Record<string, string> = {
  'Réaliser': 'realiser',
  'Optimiser': 'optimiser',
  'Administrer': 'administrer',
  'Gérer': 'gerer',
  'Conduire': 'conduire',
  'Collaborer': 'collaborer'
}

export const getBgColor = (category: string) => {
  const color = categoryColors[category] || '#ccc'
  return `${color}15`
}

export interface ParsedAC {
  id: string
  code: string
  name: string
  title: string
  context: string
}

export const parseAC = (acString: string): ParsedAC => {
  if (!acString || typeof acString !== 'string') {
    return { id: '', code: '', name: '', title: acString || '', context: '' }
  }

  const parts = acString.split('::').map(p => p.trim())
  if (parts.length >= 3) {
    const id = parts[0] || ''
    const title = parts[1] || ''
    const context = parts[2] || ''
    return { id, code: id, name: context ? `${title} :: ${context}` : title, title, context }
  }

  if (parts.length === 2) {
    const id = parts[0] || ''
    let title = parts[1] || ''
    let context = ''
    const match = title.match(/\(([^)]+)\)$/)
    if (match) {
      context = match[1] || ''
      title = title.replace(/\s*\([^)]+\)$/, '').trim()
    }
    return { id, code: id, name: context ? `${title} (${context})` : title, title, context }
  }

  // Fallback if it contains '|'
  if (acString.includes('|')) {
    const partsAlt = acString.split('|').map(p => p.trim())
    const id = partsAlt[0] || ''
    const title = partsAlt[1] || ''
    const context = partsAlt.slice(2).join(' | ')
    return { id, code: id, name: context ? `${title} | ${context}` : title, title, context }
  }

  // Fallback if it contains ':' (excluding links like http://...)
  if (acString.includes(':') && !acString.startsWith('http')) {
    const partsAlt = acString.split(':').map(p => p.trim())
    const id = partsAlt[0] || ''
    const title = partsAlt[1] || ''
    const context = partsAlt.slice(2).join(': ')
    return { id, code: id, name: context ? `${title} : ${context}` : title, title, context }
  }

  // Fallback for regex mapping "AC X.X"
  const acMatch = acString.match(/^(AC\s*\d+\.\d+)(.*)$/i)
  if (acMatch) {
    const id = (acMatch[1] || '').trim()
    const title = (acMatch[2] || '').trim() || acString
    return { id, code: id, name: title, title, context: '' }
  }

  return { id: '', code: '', name: acString, title: acString, context: '' }
}
