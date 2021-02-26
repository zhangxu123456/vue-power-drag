<template>
  <div
    class="dragAndResize"
    ref="container"
    @mousedown="containerMouseDown($event)"
    @mouseup="endMove($event)"
    @mousemove="moving($event)"
  >
    <div
      v-if="item.sizex!=undefined"
      :class="{item:true,moveAnimation:moveAnimate,movingItem:item.isPlayer,canNotDrag:!draggable}"
      @mousedown="startMove($event,item,index)"
      :ref="'item'+index"
      v-for="(item,index) in yourList"
      :key="'item'+index"
      :style="nowItemStyle(item,index)"
    >
      {{item.id}}
      <span
        class="resizeHandle"
        v-show="resizable"
        @mousedown="startResize($event,item,index)"
      ></span>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
export default {
  props: {
    yourList: {
      required: true,
      type: Array // String,Number,Boolean,Function,Object,Array
    },
    baseWidth: {
      required: false,
      type: Number,
      default: 100
    },
    baseHeight: {
      required: false,
      type: Number,
      default: 50
    },
    baseMarginLeft: {
      required: false,
      type: Number,
      default: 20
    },
    baseMarginTop: {
      required: false,
      type: Number,
      default: 20
    },
    draggable: {
      required: false,
      default: true,
      type: Boolean
    },
    dragStart: {
      required: false,
      type: Function,
      default: function () {}
    },
    dragging: {
      required: false,
      type: Function,
      default: function () {}
    },
    dragEnd: {
      required: false,
      type: Function,
      default: function () {}
    },
    resizable: {
      required: false,
      type: Boolean,
      default: true
    },
    resizeStart: {
      required: false,
      type: Function,
      default: function () {}
    },
    resizing: {
      required: false,
      type: Function,
      default: function () {}
    },
    resizeEnd: {
      required: false,
      type: Function,
      default: function () {}
    }
  },
  mounted () {},
  data () {
    return {
      cellWidth: '',
      cellHeight: '',
      positionBox: [],
      coordinates: [], // 坐标点集合
      maxCell: '', // 16
      itemMaxX: 0,
      itemMaxY: 0,
      moveAnimate: false,
      renderOk: false,
      lastTask: undefined,
      isOverlay: false, // 是否正在交换位置
      moveTime: 80 // 移动动画时间
    }
  },
  methods: {
    startResize (e, item, index) {
      if (!this.resizable) return
      this.resizeStart.call(null, e, item, index)

      // e.preventDefault();
      let target = $(e.target)

      if (!this.infoBox) {
        this.infoBox = {}
      }

      let itemNode = target.parents('.item')

      this.infoBox.resizeItem = item
      this.infoBox.resizeItemIndex = index
    },
    // 当前容器高度
    scrollScreen (e) {
      // e 是windows 获取当前鼠标移动过程的位置
      if (e.clientY + 50 >= window.innerHeight) {
        let body = $(document.body)
        body.scrollTop(body.scrollTop() + 20)
      } else if (e.clientY <= 150) {
        let body = $(document.body)
        body.scrollTop(body.scrollTop() - 20)
      }
    },
    startMove (e, item, index) {
      let vm = this
      // e.preventDefault();
      if (!this.infoBox) {
        this.infoBox = {}
      }
      let infoBox = this.infoBox
      let target = $(e.target)

      let className = target.attr('class')
      className = className || ''
      if (
        className.indexOf('dragHandle') == -1 &&
        className.indexOf('item') == -1 &&
        className.indexOf('resizeHandle') == -1
      ) {
        return
      }

      if (className.includes('resizeHandle')) {
      } else if (
        this.draggable &&
        (className.includes('dragHandle') || className.includes('item'))
      ) {
        this.dragStart(e, item, index)
        infoBox.moveItem = item
        infoBox.moveItemIndex = index
      }

      infoBox.cloneItem = null
      infoBox.nowItemNode = null

      if (target.attr('class') && target.attr('class').indexOf('item') != -1) {
        infoBox.nowItemNode = target
        infoBox.cloneItem = target.clone()
      } else {
        infoBox.nowItemNode = target.parents('.item')
        infoBox.cloneItem = infoBox.nowItemNode.clone()
      }
      infoBox.cloneItem.addClass('cloneNode')
      $(this.$el).append(infoBox.cloneItem)

      infoBox.orignX = infoBox.cloneItem.position().left // 克隆对象原始X位置
      infoBox.orignY = infoBox.cloneItem.position().top
      infoBox.oldX = item.x // 实际对象原始X位置
      infoBox.oldY = item.y
      infoBox.oldSizeX = item.sizex
      infoBox.oldSizeY = item.sizey
      infoBox.orignWidth = infoBox.cloneItem.prop('offsetWidth')
      infoBox.orignHeight = infoBox.cloneItem.prop('offsetHeight')
      function itemMouseMove (e) {
        let moveItem = _.get(infoBox, 'moveItem')
        let resizeItem = _.get(infoBox, 'resizeItem')

        if (resizeItem) {
          // 调整大小时
          vm.resizing(e, resizeItem, resizeItem._dragId)
          vm.$set(resizeItem, 'isPlayer', true)
          let nowItemIndex = infoBox.resizeItemIndex
          let cloneItem = infoBox.cloneItem
          let startX = infoBox.startX
          let startY = infoBox.startY
          let oldSizeX = infoBox.oldSizeX
          let oldSizeY = infoBox.oldSizeY
          let orignWidth = infoBox.orignWidth
          let orignHeight = infoBox.orignHeight

          let moveXSize = e.pageX - startX // X方向移动的距离
          let moveYSize = e.pageY - startY // Y方向移动的距离

          let addSizex =
            moveXSize % vm.cellWidth > (vm.cellWidth / 4) * 1
              ? parseInt(moveXSize / vm.cellWidth + 1)
              : parseInt(moveXSize / vm.cellWidth)
          let addSizey =
            moveYSize % vm.cellHeight > (vm.cellHeight / 4) * 1
              ? parseInt(moveYSize / vm.cellHeight + 1)
              : parseInt(moveYSize / vm.cellHeight)

          let nowX = oldSizeX + addSizex > 0 ? oldSizeX + addSizex : 1
          let nowY = oldSizeY + addSizey > 0 ? oldSizeY + addSizey : 1

          vm.debounce(
            (function (addSizex, addSizey) {
              return function () {
                vm.resizePlayer(resizeItem, {
                  sizex: nowX,
                  sizey: nowY
                })
              }
            })(addSizex, addSizey),
            10
          )

          let nowWidth = orignWidth + moveXSize
          nowWidth = nowWidth <= vm.baseWidth ? vm.baseWidth : nowWidth
          let nowHeight = orignHeight + moveYSize
          nowHeight = nowHeight <= vm.baseHeight ? vm.baseHeight : nowHeight
          // 克隆元素实时改变大小
          cloneItem.css({
            width: nowWidth,
            height: nowHeight
          })
        } else if (moveItem) {
          vm.scrollScreen(e)
          if (!vm.draggable) return
          vm.dragging(e, moveItem, moveItem._dragId)

          vm.$set(moveItem, 'isPlayer', true) // moveItem 对象添加属性
          // this.$set(moveItem, "show", false);
          // 当前第几个渲染
          let nowItemIndex = infoBox.moveItemIndex
          let cloneItem = infoBox.cloneItem
          let startX = infoBox.startX // 鼠标按下的初始值
          let startY = infoBox.startY
          let orignX = infoBox.orignX // 对象原始X位置
          let orignY = infoBox.orignY
          let oldX = infoBox.oldX
          let oldY = infoBox.oldY

          let moveXSize = e.pageX - startX // X方向移动的距离
          let moveYSize = e.pageY - startY // Y方向移动的距离

          let nowCloneItemX = orignX + moveXSize
          let nowCloneItemY = orignY + moveYSize
          // 算出在哪一格
          let newX = parseInt(
            (nowCloneItemX - vm.baseMarginLeft) / vm.cellWidth + 1
          )
          let newY = parseInt(
            (nowCloneItemY - vm.baseMarginTop) / vm.cellHeight + 1
          )
          // let newX = parseInt((nowCloneItemX + (cloneItem.width() / 12) - vm.baseMarginLeft) / vm.cellWidth + 1);
          // let newY = parseInt((nowCloneItemY + (cloneItem.height() / 12) - vm.baseMarginTop) / vm.cellHeight + 1);
          // console.log(newX,nowCloneItemX,cloneItem.width(),cloneItem.width() / 12,(nowCloneItemX + (cloneItem.width() / 12) - vm.baseMarginLeft) / vm.cellWidth);

          newX = newX > 0 ? newX : 1
          newY = newY > 0 ? newY : 1
          // 防抖
          vm.debounce(
            (function (newX, oldX, newY, oldY) {
              return function () {
                // 改变了位置的进入
                if (newX !== oldX || oldY !== newY) {
                  console.log('move')
                  vm.movePlayer(moveItem, {
                    x: newX,
                    y: newY
                  })

                  infoBox.oldX = newX
                  infoBox.oldY = newY
                }
              }
            })(newX, oldX, newY, oldY),
            10
          )

          cloneItem.css({
            left: nowCloneItemX + 'px',
            top: nowCloneItemY + 'px'
          })
        }
      }

      $(window).mousemove(itemMouseMove)

      $(window).mouseup(function itemMouseUp (e) {
        if (_.isEmpty(vm.infoBox)) return
        if (vm.infoBox.cloneItem) {
          vm.infoBox.cloneItem.remove()
        }
        if (vm.infoBox.resizeItem) {
          vm.$delete(vm.infoBox.resizeItem, 'isPlayer')
          vm.resizeEnd.call(
            null,
            e,
            vm.infoBox.resizeItem,
            vm.infoBox.resizeItem._dragId
          )
        }
        if (vm.infoBox.moveItem) {
          vm.dragEnd.call(
            null,
            e,
            vm.infoBox.moveItem,
            vm.infoBox.moveItem._dragId
          )
          vm.$set(vm.infoBox.moveItem, 'show', true)
          vm.$delete(vm.infoBox.moveItem, 'isPlayer')
        }
        vm.infoBox = {}

        $(this).off('mousemove', itemMouseMove)
        $(this).off('mouseup', itemMouseUp)
      })
    },
    resizePlayer (item, newSize) {
      let vm = this
      this.removeItemFromPositionBox(item)

      let belowItems = this.findBelowItems(item)

      _.forEach(belowItems, function (upItem) {
        let canGoUpRows = vm.canItemGoUp(upItem)

        if (canGoUpRows > 0) {
          vm.moveItemUp(upItem, canGoUpRows)
        }
      })

      item.sizex = newSize.sizex
      item.sizey = newSize.sizey

      if (item.sizex + item.x - 1 > this.itemMaxX) {
        item.sizex = this.itemMaxX - item.x + 1
      }

      if (item.sizey + item.y > this.itemMaxY) {
        this.fillPositionBox(item.y + item.sizey)
      }

      this.emptyTargetCell(item)

      this.addItemToPositionBox(item)

      this.changeItemCoord(item)

      let canGoUpRows = this.canItemGoUp(item)

      if (canGoUpRows > 0) {
        this.moveItemUp(item, canGoUpRows)
      }
    },
    debounce (func, time) {
      if (!this.isOverlay) {
        (t => {
          this.isOverlay = true
          setTimeout(() => {
            t()
            setTimeout(() => {
              this.isOverlay = false
              if (this.lastTask !== undefined) {
                this.debounce(this.lastTask, this.time)
              }
            }, this.moveTime)
          }, this.time)
        })(func)
        this.lastTask = undefined
      } else {
        this.lastTask = func
      }
    },
    movePlayer (item, position) {
      let vm = this
      this.removeItemFromPositionBox(item)
      console.log(item)
      console.log(this.positionBox)
      let belowItems = this.findBelowItems(item)

      _.forEach(belowItems, upItem => {
        let canGoUpRows = this.canItemGoUp(upItem)
        if (canGoUpRows > 0) {
          this.moveItemUp(upItem, canGoUpRows)
        }
      })

      item.x = position.x
      item.y = position.y

      this.checkItemPosition(item, position)

      this.emptyTargetCell(item)

      this.addItemToPositionBox(item)

      this.changeItemCoord(item)

      let canGoUpRows = this.canItemGoUp(item)

      if (canGoUpRows > 0) {
        this.moveItemUp(item, canGoUpRows)
      }
    },
    // 鼠标点击赋值
    containerMouseDown (e) {
      // e.preventDefault();
      if (!this.infoBox) {
        this.infoBox = {}
      }

      this.infoBox.startX = e.pageX
      this.infoBox.startY = e.pageY
    },
    init () {
      // 盒子的宽高
      this.cellWidth = this.baseWidth + this.baseMarginLeft // 120
      this.cellHeight = this.baseHeight + this.baseMarginTop // 120
      this.recalcCellWidth() // 计算能容纳多少盒子
      this.resetPositionBox() // 创建positionBox数组
      let i = 0
      let timeid = setInterval(() => {
        // 数组为空进入
        if (i >= this.yourList.length) {
          clearInterval(timeid)
          // 超出yourList数组后进入
          this.$nextTick(() => {
            this.moveAnimate = true
          })
          // 进入
        } else {
          let item = this.yourList[i]
          this.addItem(item, i)
          i++
        }
      }, 1)
      this.renderOk = true
    },
    addItem (item, index) {
      if (index < 0) {
        index = this.yourList.length
      }
      // yourList 里面的 item
      item._dragId = index
      // 修复超出页面宽度的盒子如何排列
      this.checkItemPosition(item, {
        x: item.x,
        y: item.y
      })
      this.emptyTargetCell(item)
      this.addItemToPositionBox(item)
      console.log(this.positionBox)
      debugger
      let canGoUpRows = this.canItemGoUp(item)
      if (canGoUpRows > 0) {
        this.moveItemUp(item, canGoUpRows)
      }
    },
    moveItemUp (item, size) {
      let vm = this

      this.removeItemFromPositionBox(item)

      let belowItems = this.findBelowItems(item)
      // item.y -= size;
      this.setPlayerPosition(item, {
        y: item.y - size
      })

      this.addItemToPositionBox(item)

      this.changeItemCoord(item)

      _.forEach(belowItems, (upItem, index) => {
        let moveSize = this.canItemGoUp(upItem)
        if (moveSize > 0) {
          this.moveItemUp(upItem, moveSize)
        }
      })
    },
    /**
     * 当前位置的item能否上浮
     *
     * @param {any} item
     * @returns
     */
    canItemGoUp (item) {
      let upperRows = 0
      for (let row = item.y - 2; row >= 0; row--) {
        for (let cell = item.x - 1; cell < item.x - 1 + item.sizex; cell++) {
          if (this.positionBox[row][cell] && this.positionBox[row][cell].el) {
            return upperRows
          }
        }
        upperRows++
      }

      return upperRows
    },
    /**
     * 清空目标位置的元素
     *
     * @param {any} item
     */
    emptyTargetCell (item) {
      let vm = this
      let belowItems = this.findBelowItems(item)
      _.forEach(belowItems, (downItem, index) => {
        if (downItem._dragId == item._dragId) return
        let moveSize = item.y + item.sizey - downItem.y
        if (moveSize > 0) {
          this.moveItemDown(downItem, moveSize)
        }
      })
    },
    moveItemDown (item, size) {
      let vm = this
      this.removeItemFromPositionBox(item)
      let belowItems = this.findBelowItems(item)
      _.forEach(belowItems, (downItem, index) => {
        if (downItem._dragId == item._dragId) return
        let moveSize = this.calcDiff(item, downItem, size)
        if (moveSize > 0) {
          this.moveItemDown(downItem, moveSize)
        }
      })
      let targetPosition = {
        y: item.y + size
      }
      this.setPlayerPosition(item, targetPosition)
      this.checkItemPosition(item, targetPosition)
      this.addItemToPositionBox(item)
      this.changeItemCoord(item)
    },
    changeItemCoord (item) {
      let vm = this
      let width = this.cellWidth * item.sizex - this.baseMarginLeft
      let height = this.cellHeight * item.sizey - this.baseMarginTop
      let left = this.cellWidth * (item.x - 1) + this.baseMarginLeft
      let top = this.cellHeight * (item.y - 1) + this.baseMarginTop

      let coord = {
        x1: left,
        x2: left + width,
        y1: top,
        y2: top + height,
        c1: left + width / 2,
        c2: top + height / 2,
        el: item
      }

      let index = _.findIndex(vm.coordinates, function (o) {
        return o.el._dragId == item._dragId
      })
      if (index != -1) {
        vm.splice(index, 1, coord)
      }
    },
    /**
     * 填充位置盒子
     *
     * @param {any} item
     */
    // 根据盒子的大小距离来填充数组的值
    addItemToPositionBox (item) {
      let pb = this.positionBox
      if (item.x <= 0 || item.y <= 0) return
      for (let i = item.x - 1; i < item.x - 1 + item.sizex; i++) {
        for (let j = item.y - 1; j < item.y - 1 + item.sizey; j++) {
          console.log(pb[j][i])
          if (pb[j][i]) {
            pb[j][i].el = item
          }
        }
      }
    },
    setPlayerPosition (item, position) {
      let vm = this
      position = position || {}

      let targetX = position.x || item.x
      let targetY = position.y || item.y

      item.x = targetX
      item.y = targetY

      if (item.y + item.sizey > this.itemMaxY) {
        this.itemMaxY = item.y + item.sizey
      }
    },
    calcDiff (parent, son, size) {
      let diffs = []

      for (let i = son.x - 1; i < son.x - 1 + son.sizex; i++) {
        let temp_y = 0

        for (let j = parent.y - 1 + parent.sizey; j < son.y - 1; j++) {
          if (this.positionBox[j][i] && this.positionBox[j][i].el == false) {
            temp_y++
          }
        }
        diffs.push(temp_y)
      }

      let max_diff = Math.max.apply(Math, diffs)
      size = size - max_diff

      return size > 0 ? size : 0
    },
    removeItemFromPositionBox (item) {
      let pb = this.positionBox
      if (item.x <= 0 || item.y <= 0) return
      for (let i = item.x - 1; i < item.x - 1 + item.sizex; i++) {
        for (let j = item.y - 1; j < item.y - 1 + item.sizey; j++) {
          if (pb[j][i]) {
            pb[j][i].el = false // 当前拖动的这个box改为false
          }
        }
      }
    },
    findBelowItems (item) {
      // 找出底部的box
      let belowItems = {}
      for (let cell = item.x - 1; cell < item.x - 1 + item.sizex; cell++) {
        for (let row = item.y - 1; row < this.positionBox.length; row++) {
          let target = this.positionBox[row][cell]
          if (target && target.el) {
            belowItems[target.el._dragId] = target.el
            break
          }
        }
      }
      return _.sortBy(_.values(belowItems), 'y')
    },
    checkItemPosition (item, position) {
      position = position || {}
      position.x = position.x || item.x
      position.y = position.y || item.y
      // 检查位置
      if (item.x < 1) {
        item.x = 1
      }
      // 检查大小
      if (item.sizex > this.itemMaxX) {
        item.sizex = this.itemMaxX
      }
      if (item.sizex < 1) {
        item.sizex = 1
      }
      // 距离 + 宽度 > 最大 item.sizex最大只能16 如果进去了 就改变item.x值
      if (item.x + item.sizex - 1 > this.itemMaxX) {
        item.x = this.itemMaxX - item.sizex + 1 // 改变item.x值
        if (item.x < 1) {
          item.x = 1
        }
      }
      if (item.y < 1) {
        item.y = 1
      }

      if (item.sizey < 1) {
        item.sizey = 1
      }
      /* console.log(item, this.itemMaxY)
      debugger */
      // 盒子的距离顶部的高度
      if (item.y + item.sizey > this.itemMaxY - 1) {
        // 看最高盒子高度多少列,再增加3列,push进去空数组
        this.fillPositionBox(item.y + item.sizey - 1)
      }
    },
    // 看最高盒子高度多少列,再增加3列
    fillPositionBox (maxY) {
      let pb = this.positionBox // 二维数组 里面是push 的 row
      maxY += 2
      for (let j = 0; j < maxY; j++) {
        // maxY = 4 // 这里循环是差不多组数组补多少数组
        if (pb[j] == undefined) {
          let row = []
          for (let i = 0; i < this.itemMaxX; i++) {
            row.push({
              el: false
            })
          }
          pb.push(row)
        }
      }
      this.itemMaxY = maxY
      // box高度多3个
      $(this.$el).css('height', (this.itemMaxY + 2) * this.cellHeight + 'px')
      /* $(this.$el).css("backgroundColor", 'red'); */
    },
    /**
     * 重置位置盒子
     *
     */
    resetPositionBox () {
      // 根据当前容器的宽度来决定多少列
      this.itemMaxX = this.maxCell // 16
      let rows = 1 // 初始100行，后面根据需求会自动增加
      for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < this.maxCell; j++) {
          row.push({ el: false })
        }
        this.positionBox.push(row)
      }
    },
    recalcCellWidth () {
      // 计算能容纳多少盒子
      let containerNode = this.$refs['container']
      let containerWidth = containerNode.offsetWidth // 1920
      let cells = Math.round(containerWidth / this.cellWidth) // 16
      this.maxCell = cells // 16 最多容纳多少个
    },
    nowItemStyle (item, index) {
      return {
        width: this.cellWidth * item.sizex - this.baseMarginLeft + 'px',
        height: this.cellHeight * item.sizey - this.baseMarginTop + 'px',
        left: this.cellWidth * (item.x - 1) + this.baseMarginLeft + 'px',
        top: this.cellHeight * (item.y - 1) + this.baseMarginTop + 'px'
      }
    },
    endMove (e) {},
    moving (e) {}
  }
}
</script>
<style lang="scss">
@import "./drag.scss";
</style>
