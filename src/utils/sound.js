export default {
  playClassicSound(){
    this.classicSound.currentTime = 0
    this.classicSound.volume = .2
    this.classicSound.play()
  },
  initPlayClassicSound(){
    document.querySelectorAll('button, input[type="checkbox"], .bonus').forEach(b =>
      b.addEventListener('click', () => {
        if(b.id == 'btn-score') return
        this.playClassicSound()
      })
    )
  },
}