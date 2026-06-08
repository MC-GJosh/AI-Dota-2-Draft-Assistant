<template>
  <div class="hero-pool">
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search heroes..." 
        class="search-input"
      />
    </div>

    <div class="grid-container" v-if="!loading">
      <div 
        v-for="hero in filteredHeroes" 
        :key="hero.id" 
        class="hero-card"
        @click="selectHero(hero)"
      >
        <img 
          :src="`https://api.opendota.com${hero.icon}`" 
          :alt="hero.localized_name" 
          class="hero-icon"
          @error="handleImageError"
        />
        <span class="hero-name">{{ hero.localized_name }}</span>
      </div>
    </div>
    
    <div v-else class="loading-state">
      Loading heroes...
    </div>
    
    <div v-if="error" class="error-state">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHeroes } from '~/composables/useHeroes'

const { heroes, loading, error, fetchHeroes } = useHeroes()
const searchQuery = ref('')

onMounted(() => {
  fetchHeroes()
})

const filteredHeroes = computed(() => {
  if (!searchQuery.value) return heroes.value
  const q = searchQuery.value.toLowerCase()
  return heroes.value.filter(h => h.localized_name.toLowerCase().includes(q))
})

const selectHero = (hero) => {
  console.log('Selected hero:', hero.localized_name)
  // In future, will integrate with draftStore based on current phase
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
  e.target.nextElementSibling.style.display = 'block'
}
</script>

<style scoped>
.hero-pool {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #6366f1;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
}

/* Custom scrollbar */
.grid-container::-webkit-scrollbar {
  width: 6px;
}
.grid-container::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
}
.grid-container::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
}

.hero-card {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
  overflow: hidden;
  position: relative;
}

.hero-card:hover {
  transform: scale(1.05);
  border-color: #6366f1;
  z-index: 2;
}

.hero-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  font-size: 0.6rem;
  padding: 2px;
  text-align: center;
  display: none; /* Shown if image fails or on hover */
}

.hero-card:hover .hero-name {
  display: block;
}

.loading-state, .error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #9ca3af;
}

.error-state {
  color: #fca5a5;
}
</style>
