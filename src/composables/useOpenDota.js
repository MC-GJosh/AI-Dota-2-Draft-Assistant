import { ref } from 'vue'

export function useOpenDota() {
  const winrates = ref({})
  const matchups = ref({})
  const loading = ref(false)
  const error = ref(null)

  const fetchHeroMatchups = async (heroId) => {
    loading.value = true
    try {
      // Fetch matchups for a specific hero from OpenDota API
      const response = await fetch(`https://api.opendota.com/api/heroes/${heroId}/matchups`)
      if (!response.ok) throw new Error('Failed to fetch matchups')
      matchups.value[heroId] = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { winrates, matchups, loading, error, fetchHeroMatchups }
}
