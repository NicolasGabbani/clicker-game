export default {
  save() {
    this.$cookies.set("user", this.user, -1);
    localStorage.builds = JSON.stringify(this.display_builds)
    localStorage.store = JSON.stringify(this.display_store)
    localStorage.success = JSON.stringify(this.display_success)
    localStorage.buildssuccess = JSON.stringify(this.display_builds_success)
    this.onsave = true;
  },

  reset() {
    let c = confirm("T'es sûr de vouloir effacer ta partie ?")
    if (!c) return this.closeOptions()
    this.$cookies.remove("user")
    localStorage.removeItem("builds")
    localStorage.removeItem("store")
    localStorage.removeItem("success")
    localStorage.removeItem("buildssuccess")
    window.location.reload()
  },

  optionRain(rain){
    this.user.rain = rain
  },

  closeOptions() {
    this.openOptions = false;
  },

  toggleScreenshot(){
    this.openScreenshot = !this.openScreenshot
  },

  selectDecor(index){
    this.user.decor = index
    this.playClassicSound()
  },

  selectLicorne(index){
    this.user.licorne = index
    this.playClassicSound()
  },
}