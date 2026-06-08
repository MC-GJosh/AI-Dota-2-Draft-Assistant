import { defineStore } from 'pinia'

export const useDraftStore = defineStore('draft', {
  state: () => ({
    picks: {
      radiant: [],
      dire: []
    },
    bans: [],
    phase: 'Not Started',
    recommendations: []
  }),
  actions: {
    addPick(team, heroId) {
      if (this.picks[team].length < 5) {
        this.picks[team].push(heroId)
      }
    },
    addBan(heroId) {
      this.bans.push(heroId)
    },
    setPhase(phaseName) {
      this.phase = phaseName
    },
    setRecommendations(recs) {
      this.recommendations = recs
    }
  }
})
