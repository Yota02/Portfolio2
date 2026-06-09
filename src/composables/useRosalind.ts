import { ref, onMounted } from 'vue'

export interface RosalindProblem {
  id: string
  title: string
  solved: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface RosalindCategory {
  name: string
  emoji: string
  problems: RosalindProblem[]
}

export interface RosalindData {
  totalSolved: number
  totalProblems: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  categories: RosalindCategory[]
}

const README_URL =
  'https://raw.githubusercontent.com/Yota02/Rosalind_Problems/main/README.md'

function parseInt2(s: string | undefined): number {
  return s ? parseInt(s, 10) : 0
}

function parseReadme(content: string): RosalindData {
  const totalMatch = content.match(/\*\*(\d+) \/ (\d+)\*\*/)
  const totalSolved = parseInt2(totalMatch?.[1])
  const totalProblems = parseInt2(totalMatch?.[2])

  const easyMatch = content.match(/Facile\*\*\s*:\s*(\d+)\/(\d+)/)
  const mediumMatch = content.match(/Moyen\*\*\s*:\s*(\d+)\/(\d+)/)
  const hardMatch = content.match(/Difficile\*\*\s*:\s*(\d+)\/(\d+)/)

  const easySolved = parseInt2(easyMatch?.[1])
  const easyTotal = parseInt2(easyMatch?.[2])
  const mediumSolved = parseInt2(mediumMatch?.[1])
  const mediumTotal = parseInt2(mediumMatch?.[2])
  const hardSolved = parseInt2(hardMatch?.[1])
  const hardTotal = parseInt2(hardMatch?.[2])

  const sections = content.split(/^### /m).slice(1)

  const categories: RosalindCategory[] = sections
    .map(section => {
      const lines = section.split('\n')
      const headerLine = (lines[0] ?? '').trim()

      const emojiMatch = headerLine.match(/^([^\w\s&]+)\s*(.+)$/)
      const emoji = emojiMatch?.[1]?.trim() ?? '🔬'
      const name = emojiMatch?.[2]?.trim() ?? headerLine

      const problems: RosalindProblem[] = []
      for (const line of lines) {
        const match = line.match(
          /\|\s*\*\*([A-Z0-9]+)\*\*\s*\|\s*([^|]+?)\s*\|\s*([✅⬜])\s*\|\s*([^|]+?)\s*\|/
        )
        if (match) {
          const diffStr = match[4] ?? ''
          const difficulty: 'easy' | 'medium' | 'hard' = diffStr.includes('Facile')
            ? 'easy'
            : diffStr.includes('Moyen')
              ? 'medium'
              : 'hard'

          problems.push({
            id: match[1] ?? '',
            title: (match[2] ?? '').trim(),
            solved: match[3] === '✅',
            difficulty,
          })
        }
      }

      return { name, emoji, problems }
    })
    .filter(cat => cat.problems.length > 0)

  return {
    totalSolved,
    totalProblems,
    easySolved,
    easyTotal,
    mediumSolved,
    mediumTotal,
    hardSolved,
    hardTotal,
    categories,
  }
}

export function useRosalind() {
  const data = ref<RosalindData | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      const response = await fetch(README_URL)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const content = await response.text()
      data.value = parseReadme(content)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
