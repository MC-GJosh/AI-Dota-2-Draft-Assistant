<template>
  <div class="team-panel">
    <h2 :class="team">{{ team === 'radiant' ? 'Radiant' : 'Dire' }}</h2>
    
    <div class="slots-container">
      <h3>Picks</h3>
      <div class="slot-row">
        <div 
          v-for="index in 5" 
          :key="`pick-${index}`" 
          class="slot pick-slot"
        >
          <div v-if="draftStore.picks[team][index-1]" class="hero-filled">
            Hero {{ draftStore.picks[team][index-1] }}
          </div>
          <div v-else class="empty-slot"></div>
        </div>
      </div>

      <h3>Bans</h3>
      <div class="slot-row">
        <div 
          v-for="index in 7" 
          :key="`ban-${index}`" 
          class="slot ban-slot"
        >
          <!-- Banned heroes mapping would go here -->
          <div class="empty-slot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDraftStore } from '~/stores/draft'

const props = defineProps({
  team: {
    type: String,
    required: true,
    validator: (value) => ['radiant', 'dire'].includes(value)
  }
})

const draftStore = useDraftStore()
</script>

<style scoped>
.team-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

h2 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
}

h2.radiant { color: #86efac; }
h2.dire { color: #fca5a5; }

h3 {
  font-size: 1rem;
  color: #9ca3af;
  margin-bottom: 0.5rem;
}

.slots-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.slot-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slot {
  height: 60px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.2s ease;
}

.pick-slot:hover { border-color: rgba(255, 255, 255, 0.3); }

.ban-slot {
  height: 40px;
  border-style: dashed;
}

.hero-filled {
  width: 100%;
  height: 100%;
  background: rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.empty-slot {
  width: 100%;
  height: 100%;
}
</style>
