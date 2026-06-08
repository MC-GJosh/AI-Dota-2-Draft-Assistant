<template>
  <div class="draft-board-container">
    <div class="header">
      <h1>AI Dota 2 Draft Assistant</h1>
      <div class="phase-indicator">Current Phase: {{ draftStore.phase }}</div>
    </div>
    
    <div class="main-content">
      <div class="team-section">
        <TeamPanel team="radiant" />
      </div>
      
      <div class="center-section">
        <HeroPool />
      </div>
      
      <div class="team-section">
        <TeamPanel team="dire" />
      </div>
    </div>
    
    <div class="analysis-section">
      <RecommendationGrid />
      <StreamingReasoning />
    </div>
  </div>
</template>

<script setup>
import { useDraftStore } from '~/stores/draft'
import TeamPanel from './TeamPanel.vue'
import HeroPool from './HeroPool.vue'
import RecommendationGrid from './RecommendationGrid.vue'
import StreamingReasoning from './StreamingReasoning.vue'

const draftStore = useDraftStore()
</script>

<style scoped>
.draft-board-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #0d0d12;
  color: #fff;
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
}

.phase-indicator {
  font-size: 1.2rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.main-content {
  display: flex;
  gap: 2rem;
  flex: 1;
  margin-bottom: 2rem;
}

.team-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
}

.center-section {
  flex: 2;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
}

.analysis-section {
  display: flex;
  gap: 2rem;
  height: 300px;
}

.analysis-section > * {
  flex: 1;
}
</style>
