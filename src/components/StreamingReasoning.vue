<template>
  <div class="streaming-reasoning">
    <div class="header">
      <h2>Claude AI Analysis</h2>
      <button 
        class="analyze-btn" 
        @click="triggerAnalysis" 
        :disabled="isAnalyzing"
      >
        {{ isAnalyzing ? 'Analyzing...' : 'Analyze Draft' }}
      </button>
    </div>
    
    <div class="content-area" ref="contentArea">
      <div v-if="!reasoningStream && !isAnalyzing" class="placeholder">
        Click "Analyze Draft" to generate real-time insights...
      </div>
      <div class="stream-text" v-else>
        {{ reasoningStream }}
        <span class="cursor" v-if="isAnalyzing">|</span>
      </div>
      <div v-if="error" class="error-msg">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useDraftAnalysis } from '~/composables/useDraftAnalysis'

const { reasoningStream, isAnalyzing, error, analyzeDraft } = useDraftAnalysis()
const contentArea = ref(null)

const triggerAnalysis = () => {
  analyzeDraft({})
}

// Auto-scroll to bottom as text streams
watch(reasoningStream, async () => {
  await nextTick()
  if (contentArea.value) {
    contentArea.value.scrollTop = contentArea.value.scrollHeight
  }
})
</script>

<style scoped>
.streaming-reasoning {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #e5e7eb;
}

.analyze-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.analyze-btn:hover:not(:disabled) {
  background: #4f46e5;
}

.analyze-btn:disabled {
  background: #4b5563;
  cursor: not-allowed;
  opacity: 0.7;
}

.content-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #d1d5db;
}

.placeholder {
  color: #6b7280;
  font-style: italic;
  font-family: 'Inter', sans-serif;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.error-msg {
  color: #fca5a5;
  margin-top: 1rem;
}
</style>
