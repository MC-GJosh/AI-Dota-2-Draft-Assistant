<template>
  <div class="recommendation-grid">
    <div class="header">
      <h2>AI Recommendations</h2>
    </div>
    
    <div class="rec-list">
      <div v-if="!draftStore.recommendations.length" class="empty-state">
        Awaiting draft analysis...
      </div>
      
      <div 
        v-for="(rec, index) in draftStore.recommendations" 
        :key="index"
        class="rec-card"
      >
        <div class="rec-info">
          <div class="rec-hero-name">{{ rec.heroName }}</div>
          <div class="rec-reason">{{ rec.reason }}</div>
        </div>
        
        <div class="win-prob">
          <div class="prob-text">{{ rec.winProb }}%</div>
          <div class="prob-bar-container">
            <div class="prob-bar" :style="{ width: `${rec.winProb}%`, background: getProbColor(rec.winProb) }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDraftStore } from '~/stores/draft'

const draftStore = useDraftStore()

// Mock data initialization for visual testing
import { onMounted } from 'vue'
onMounted(() => {
  draftStore.setRecommendations([
    { heroName: 'Earthshaker', reason: 'Counters Broodmother and provides solid initiation.', winProb: 62 },
    { heroName: 'Lina', reason: 'High burst damage to deal with enemy carry.', winProb: 55 },
    { heroName: 'Tidehunter', reason: 'Strong teamfight presence required for the current draft.', winProb: 51 }
  ])
})

const getProbColor = (prob) => {
  if (prob >= 60) return '#4ade80'
  if (prob >= 50) return '#fbbf24'
  return '#f87171'
}
</script>

<style scoped>
.recommendation-grid {
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
}

h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #e5e7eb;
}

.rec-list {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  margin-top: 2rem;
}

.rec-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #6366f1;
}

.rec-info {
  margin-bottom: 0.8rem;
}

.rec-hero-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.3rem;
}

.rec-reason {
  font-size: 0.85rem;
  color: #9ca3af;
  line-height: 1.4;
}

.win-prob {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.prob-text {
  font-weight: bold;
  font-size: 0.9rem;
  min-width: 40px;
}

.prob-bar-container {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.prob-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease-out;
}
</style>
