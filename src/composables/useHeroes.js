import { ref } from 'vue'

export function useHeroes() {
  const heroes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchHeroes = async () => {
    loading.value = true
    try {
      // Fetching all heroes from OpenDota API
      const response = await fetch('https://api.opendota.com/api/heroes')
      if (!response.ok) throw new Error('Failed to fetch heroes')
      heroes.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { heroes, loading, error, fetchHeroes }
}
