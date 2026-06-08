import { ref } from 'vue'

export function useDraftAnalysis() {
  const reasoningStream = ref('')
  const isAnalyzing = ref(false)
  const error = ref(null)

  const analyzeDraft = async (draftState) => {
    isAnalyzing.value = true
    reasoningStream.value = ''
    error.value = null

    try {
      // Mock streaming simulation for now, to be replaced with actual Claude API stream
      const mockStreamText = "Analyzing the current draft...\nThe Radiant team has secured strong teamfight heroes.\nConsidering the Dire bans, it is highly recommended to pick a flexible offlaner to counter the enemy carry."
      
      const words = mockStreamText.split(' ')
      for (const word of words) {
        reasoningStream.value += word + ' '
        await new Promise(resolve => setTimeout(resolve, 50)) // simulate stream delay
      }
    } catch (err) {
      error.value = err.message
    } finally {
      isAnalyzing.value = false
    }
  }

  return { reasoningStream, isAnalyzing, error, analyzeDraft }
}
