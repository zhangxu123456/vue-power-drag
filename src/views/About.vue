<template>
  <div id="about">
    <canvas id="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      /** @type {HTMLCanvasElement} */
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      context.beginPath()
      context.moveTo(100, 100)
      context.lineTo(700, 700)
      context.lineTo(100, 700)
      context.lineTo(100, 100)
      context.lineWidth = 10
      context.fillStyle = 'rgb(2,100,30)'
      context.fill()
      context.closePath()
      context.beginPath()
      context.moveTo(200, 100)
      context.lineTo(700, 600)
      context.strokeStyle = '#058'
      context.stroke()
      context.closePath()
      context.fillStyle = 'rgb(2,100,30)'
      context.beginPath()
      context.arc(300, 300, 200, 0, 1.5 * Math.PI, false)
      context.fill()
      context.stroke()
      context.beginPath()
      context.arc(400, 400, 200, 0, 1.5 * Math.PI, false)
      context.fill()
      context.stroke()
    }
  }
}
</script>

<style lang="scss">

</style>
