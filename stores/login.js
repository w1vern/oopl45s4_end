export const UseLoginStore = defineStore('loginStore', {
  state: () => ({
    ID: '',
    username: '',
    auth: false,
    InCurrentMatch: false,
    matchId: ''
  }),
  actions: {
    async fetch() {
      const info = await apiUsersGetUser()
      this.username = info.username
      this.auth = info.auth
      this.InCurrentMatch = info.InCurrentMatch
      this.ID = info.ID
      this.matchId = info.matchId
    }
  }
})