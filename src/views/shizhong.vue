<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>
<script>

export default {
  data () {
    return {
      digit:
                [
                  [
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 1, 1, 0, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 0, 1, 1, 0],
                    [0, 0, 1, 1, 1, 0, 0]
                  ], // 0
                  [
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1]
                  ], // 1
                  [
                    [0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1]
                  ], // 2
                  [
                    [1, 1, 1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 0, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 1, 1, 0]
                  ], // 3
                  [
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 0],
                    [0, 1, 1, 0, 1, 1, 0],
                    [1, 1, 0, 0, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 1, 1]
                  ], // 4
                  [
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 1, 1, 0]
                  ], // 5
                  [
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0],
                    [1, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 1, 1, 0]
                  ], // 6
                  [
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 0, 0, 0]
                  ], // 7
                  [
                    [0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 1, 1, 0]
                  ], // 8
                  [
                    [0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 1, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 0, 1, 1],
                    [0, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0]
                  ], // 9
                  [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                  ]// :
                ],
      WINDOW_WIDTH: 1024,
      WINDOW_HEIGHT: 768,
      RADIUS: 8,
      MARGIN_TOP: 60,
      MARGIN_LEFT: 30,
      endTime: '',
      curShowTimeSeconds: '',
      balls: [],
      hours: '',
      minutes: '',
      seconds: '',
      colors: ['#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#669900', '#ffbb33']
    }
  },
  mounted () {
    this.endTime = new Date(2020, 3, 8, 22, 47, 52)
    this.hours = this.endTime.getHours()
    this.minutes = this.endTime.getMinutes()
    this.seconds = this.endTime.getSeconds()
    /*      this.ball.x=this.MARGIN_LEFT + 93*(this.RADIUS+1)
            this.ball.y=this.MARGIN_TOP */
    this.init()
  },
  methods: {
    init () {
      /** @type {HTMLCanvasElement} */

      let canvas = document.getElementById('canvas')
      canvas.width = this.WINDOW_WIDTH
      canvas.height = this.WINDOW_HEIGHT
      let context = canvas.getContext('2d')
      this.curShowTimeSeconds = this.getCurrentShowTimeSeconds()
      setInterval(() => {
        this.render(context)
        this.update()
      }, 20)
    },
    render (cxt) {
      /** @type {HTMLCanvasElement} */
      cxt.clearRect(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT)
      let hours = parseInt(this.curShowTimeSeconds / 3600)
      let minutes = parseInt((this.curShowTimeSeconds - hours * 3600) / 60)
      let seconds = this.curShowTimeSeconds % 60
      this.renderDigit(this.MARGIN_LEFT, this.MARGIN_TOP, parseInt(hours / 10), cxt)
      this.renderDigit(this.MARGIN_LEFT + 15 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(hours % 10), cxt)
      this.renderDigit(this.MARGIN_LEFT + 30 * (this.RADIUS + 1), this.MARGIN_TOP, 10, cxt)
      this.renderDigit(this.MARGIN_LEFT + 39 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(minutes / 10), cxt)
      this.renderDigit(this.MARGIN_LEFT + 54 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(minutes % 10), cxt)
      this.renderDigit(this.MARGIN_LEFT + 69 * (this.RADIUS + 1), this.MARGIN_TOP, 10, cxt)
      this.renderDigit(this.MARGIN_LEFT + 78 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(seconds / 10), cxt)
      this.renderDigit(this.MARGIN_LEFT + 93 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(seconds % 10), cxt)
      for (let i = 0; i < this.balls.length; i++) {
        cxt.fillStyle = this.balls[i].color
        cxt.beginPath()
        cxt.arc(this.balls[i].x, this.balls[i].y, this.RADIUS, 0, 2 * Math.PI, true)
        cxt.closePath()
        cxt.fill()
      }
    },
    renderDigit (x, y, num, cxt) {
      cxt.fillStyle = 'rgb(0,102,153)'
      for (let i = 0; i < this.digit[num].length; i++) {
        for (let j = 0; j < this.digit[num][i].length; j++) {
          if (this.digit[num][i][j] == 1) {
            cxt.beginPath()
            cxt.arc(x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1), y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1), this.RADIUS, 0, 2 * Math.PI)
            cxt.closePath()
            cxt.fill()
          }
        }
      }
    },
    update () {
      let nextShowTimeSeconds = this.getCurrentShowTimeSeconds()
      let nextHours = parseInt(nextShowTimeSeconds / 3600)
      let nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
      let nextSeconds = nextShowTimeSeconds % 60

      let curHours = parseInt(this.curShowTimeSeconds / 3600)
      let curMinutes = parseInt((this.curShowTimeSeconds - curHours * 3600) / 60)
      let curSeconds = this.curShowTimeSeconds % 60

      if (nextSeconds != curSeconds) {
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
          this.addBalls(this.MARGIN_LEFT + 0, this.MARGIN_TOP, parseInt(curHours / 10))
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
          this.addBalls(this.MARGIN_LEFT + 15 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(curHours % 10))
        }
        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
          this.addBalls(this.MARGIN_LEFT + 39 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(curMinutes / 10))
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
          this.addBalls(this.MARGIN_LEFT + 54 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(curMinutes % 10))
        }
        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
          this.addBalls(this.MARGIN_LEFT + 78 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(curSeconds / 10))
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
          this.addBalls(this.MARGIN_LEFT + 93 * (this.RADIUS + 1), this.MARGIN_TOP, parseInt(curSeconds % 10))
        }
        this.curShowTimeSeconds = nextShowTimeSeconds
      }
      this.updateBalls()
    },
    addBalls (x, y, num) {
      for (let i = 0; i < this.digit[num].length; i++) {
        for (let j = 0; j < this.digit[num][i].length; j++) {
          if (this.digit[num][i][j] == 1) {
            let aBall = {
              x: x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
              y: y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
              g: 5.5 + Math.random(),
              vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
              vy: -5,
              color: this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.balls.push(aBall)
          }
        }
      }
    },
    getCurrentShowTimeSeconds () {
      var curTime = new Date()
      var ret = this.endTime.getTime() - curTime.getTime()
      ret = Math.round(ret / 1000)
      return ret >= 0 ? ret : 0
    },
    updateBalls () {
      for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].x += this.balls[i].vx
        this.balls[i].y -= this.balls[i].vy
        this.balls[i].xy += this.balls[i].g

        if (this.balls[i].y >= this.WINDOW_HEIGHT - this.RADIUS) {
          this.balls[i].y = this.WINDOW_HEIGHT - this.RADIUS
          this.balls[i].vy = -this.balls[i].vy * 0.75
        }
      }
    }
  }
}

</script>
    <style lang="scss">
</style>
