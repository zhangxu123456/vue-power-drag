<template>
  <div class="home" >
    <child  ref="cyGridster" :your-list="myList" :base-width="baseWidth" :base-height="baseHeight"
    :base-margin-left="baseMarginLeft" :base-margin-top="baseMarginTop"  />
  </div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'
import child from '../components/child'
export default {
  name: 'Home',
  props: {

  },
  components: {
    child
  },
  computed: {

  },
  data () {
    return {
      myList: [
        {
          'id': 1,
          'x': 10,
          'y': 1,
          'sizex': 5,
          'sizey': 2
        },
        {
          'id': 2,
          'x': 8,
          'y': 1,
          'sizex': 2,
          'sizey': 2
        },
        {
          'id': 4,
          'x': 1,
          'y': 1,
          'sizex': 1,
          'sizey': 1
        },
        {
          'id': 6,
          'x': 4,
          'y': 1,
          'sizex': 2,
          'sizey': 1
        }, {
          'id': 8,
          'x': 6,
          'y': 1,
          'sizex': 2,
          'sizey': 1
        }, {
          'id': 10,
          'x': 2,
          'y': 1,
          'sizex': 2,
          'sizey': 2
        }, {
          'id': 3,
          'x': 6,
          'y': 2,
          'sizex': 1,
          'sizey': 1
        }, {
          'id': 5,
          'x': 4,
          'y': 2,
          'sizex': 2,
          'sizey': 1
        }, {
          'id': 7,
          'x': 1,
          'y': 2,
          'sizex': 1,
          'sizey': 1
        }, {
          'id': 9,
          'x': 7,
          'y': 2,
          'sizex': 1,
          'sizey': 1
        }],
      baseWidth: 100,
      baseHeight: 100
    }
  },
  created () {
    this.baseMarginLeft = 20
    this.baseMarginTop = 20
    this.$nextTick(function () {
      $('.dragAndResize').css('width', 'calc(100% - ' + (this.baseMarginLeft) + 'px)')
    })
  },
  mounted () {
    let gridster = this.$refs['cyGridster'] // 获取gridster实例
    gridster.init() // 在适当的时候初始化布局组件
  },
  methods: {

  }
}
</script>
<style lang="scss">
  .home{
    width: 100%;height: 100vh;
  }
</style>
