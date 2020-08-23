<template>
<div>
    <canvas id="canvas" width="800" height="500"></canvas>
</div>
</template>

<script>
export default {
  data () {
    return {
      canvas: '',
      context: '',
      balls: [], // 球数组
      numBalls: 1,
      fl: 250,
      vpX: '',
      vpY: '',
      top: -250,
      bottom: 250,
      left: -250,
      right: 250,
      back: 250,
      front: -250
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      this.vpX = this.canvas.width / 2
      this.vpY = this.canvas.height / 2
      for (var ball, i = 0; i < this.numBalls; i++) {
        ball = new this.Ball3d(30, Math.random() * 0xffffff)
        ball.vx = Math.random() * 5 - 5
        ball.vy = Math.random() * 5 - 5
        ball.vz = Math.random() * 5 - 5
        this.balls.push(ball)
      }
      this.drawFrame()
    },
    Ball3d (radius, color) {
      if (radius === undefined) { radius = 40 }
      if (color === undefined) { color = '#ff0000' }
      this.x = 0
      this.y = 0
      this.xpos = 0
      this.ypos = 0
      this.zpos = 0
      this.radius = radius
      this.vx = 0
      this.vy = 0
      this.vz = 0
      this.mass = 1
      this.rotation = 0
      this.scaleX = 1
      this.scaleY = 1
      this.lineWidth = 1
      this.visible = true
      this.parseColor = function (color, toNumber) {
        if (toNumber === true) {
          if (typeof color === 'number') {
            return (color | 0) // chop off decimal
          }
          if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1)
          }
          return window.parseInt(color, 16)
        } else {
          if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6) // pad
          }
          return color
        }
      }
      this.color = this.parseColor(color)
      this.draw = function (context) {
        context.save()
        // 0,0
        console.log(this.x, this.y)
        context.translate(this.x, this.y)
        context.rotate(this.rotation)
        context.scale(this.scaleX, this.scaleY)

        context.lineWidth = this.lineWidth
        context.fillStyle = this.color
        context.beginPath()
        // x, y, radius, start_angle, end_angle, anti-clockwise
        context.arc(0, 0, this.radius, 0, (Math.PI * 2), true)
        context.closePath()
        context.fill()
        if (this.lineWidth > 0) {
          context.stroke()
        }
        context.restore()
      }
    },
    drawFrame () {
      /* window.requestAnimationFrame(this.drawFrame) */
      /*  setInterval(() => {
        this.drawFrame()
      }, 5000) */
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.balls.forEach(this.move)
      this.balls.sort(this.zSort)
      this.balls.forEach(this.draw)
    },
    move (ball) {
      ball.xpos += ball.vx
      ball.ypos += ball.vy
      ball.zpos += ball.vz
      console.log(ball.xpos + ball.radius, '>250', '<-250')
      if (ball.xpos + ball.radius > this.right) {
        ball.xpos = this.right - ball.radius
        ball.vx *= -1
      } else if (ball.xpos - ball.radius < this.left) {
        ball.xpos = this.left + ball.radius
        ball.vx *= -1
      }
      console.log(ball.ypos + ball.radius, '>250', '<-250')
      if (ball.ypos + ball.radius > this.bottom) {
        ball.ypos = this.bottom - ball.radius
        ball.vy *= -1
      } else if (ball.ypos - ball.radius < top) {
        ball.ypos = top + ball.radius
        ball.vy *= -1
      }
      console.log(ball.zpos + ball.radius, '>250', '<-250')
      if (ball.zpos + ball.radius > this.back) {
        ball.zpos = this.back - ball.radius
        ball.vz *= -1
      } else if (ball.zpos - ball.radius < this.front) {
        ball.zpos = this.front + ball.radius
        ball.vz *= -1
      }
      console.log(ball.zpos, -this.fl)
      if (ball.zpos > -this.fl) {
        var scale = this.fl / (this.fl + ball.zpos)
        ball.scaleX = ball.scaleY = scale
        ball.x = this.vpX + ball.xpos * scale
        ball.y = this.vpY + ball.ypos * scale
        ball.visible = true
      } else {
        ball.visible = false
      }
    },
    zSort (a, b) {
      return (b.zpos - a.zpos)
    },
    draw (ball) {
      if (ball.visible) {
        ball.draw(this.context)
      }
    }
  }
}
</script>

<style lang="scss">
#canvas{margin: 100px auto;display: block;}
</style>
