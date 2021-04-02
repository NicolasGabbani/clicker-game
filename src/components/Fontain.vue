<template>
  <div class="fontain">
    <Particles
      id="tsparticles"
      v-if="loaded && cps != 0"
      :options="{
        background: {
          color: {
            value: 'transparent'
          }
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: {
            onClick: {
              enable: false,
              mode: 'push'
            },
            onHover: {
              enable: false,
              mode: 'repulse'
            },
            resize: true
          }
        },
        particles: {
          color: {
            value: '#ffffff'
          },
          links: {
            enable: false
          },
          collisions: {
            enable: false
          },
          move: {
            direction: 'bottom',
            enable: true,
            outMode: 'out',
            random: false,
            speed: 6,
            straight: false
          },
          number: {
            density: {
              enable: true,
              value_area: 800
            },
            value: 80
          },
          opacity: {
            value: 1
          },
          shape: {
            type: 'image',
            image: {
              width: 148,
              height: 148,
              src: require(`@/assets/images/icons/fraise.png`)
            }
          },
          size: {
            random: true,
            value: 20
          }
        },
        detectRetina: true
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Fontain',
  props: {
    loaded: Boolean,
    cps: Number
  }
}
</script>

<style lang="sass">
  .fontain
    position: absolute
    top: -20px
    left: 50%
    transform: translateX(-50%)
    width: 30vw
    height: calc(100% + 40px)
  #tsparticles
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
</style>