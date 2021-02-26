<template>
  <div id="colorPicker">
    <div class="colorpicker_box-line__tH9r-">
      <div
        class="colorpicker_grid__2kYzP"
        v-for="(item,keys) in colorPrimary"
        :key="keys"
        :class="[{active: item.id === selected},`colorpicker_id_${item.id}`]"
        :style="{backgroundColor:`rgb(${item.rgb})`}"
        @click="activeChange('colorPrimary',item)"
      ></div>
    </div>
    <div style="height: 8px;"></div>
    <div class="colorpicker_box-line__tH9r-" v-for="(item,keys) in colorMinor" :key="keys">
      <div
        class="colorpicker_grid__2kYzP"
        v-for="(val,key) in item"
        :key="key"
        :class="[{active: val.id === selected},`colorpicker_id_${val.id}`]"
        :style="{backgroundColor:`rgb(${val.rgb})`}"
        @click="activeChange('colorMinor',val)"
      ></div>
    </div>
    <div class="colorpicker_text__2gZyK" style="margin-top: 3px;">最近使用</div>
    <div class="colorpicker_box-line__tH9r-">
      <div
        class="colorpicker_grid__2kYzP"
        v-for="(item,keys) in colorUsed"
        :key="keys"
        :class="[`colorpicker_id_${item.id}`]"
        :style="{backgroundColor:`rgb(${item.rgb})`,borderColor: 'rgba(0, 0, 0, 0.08)'}"
        @click="activeChange('colorUsed',item)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 主要
      colorPrimary: [
        { id: 1, rgb: '255, 255, 255' },
        { id: 2, rgb: '0, 0, 0' },
        { id: 3, rgb: '255, 0, 0' },
        { id: 4, rgb: '255, 153, 0' },
        { id: 5, rgb: '255, 255, 0' },
        { id: 6, rgb: '152, 250, 28' },
        { id: 7, rgb: '2108, 222, 255' },
        { id: 8, rgb: '64, 62, 214' },
        { id: 9, rgb: '237, 65, 253' }
      ],
      // 次要
      colorMinor: [
        // 一排
        [
          { id: 11, rgb: '233, 233, 233' },
          { id: 21, rgb: '123, 123, 123' },
          { id: 31, rgb: '255, 200, 184' },
          { id: 41, rgb: '255, 225, 178' },
          { id: 51, rgb: '255, 242, 204' },
          { id: 61, rgb: '217, 234, 211' },
          { id: 71, rgb: '223, 248, 255' },
          { id: 81, rgb: '207, 199, 244' },
          { id: 91, rgb: '254, 228, 255' }
        ],
        // 二排
        [
          { id: 12, rgb: '217, 217, 217' },
          { id: 22, rgb: '92, 92, 92' },
          { id: 32, rgb: '233, 152, 153' },
          { id: 42, rgb: '255, 184, 77' },
          { id: 52, rgb: '255, 229, 154' },
          { id: 62, rgb: '172, 219, 126' },
          { id: 72, rgb: '133, 212, 230' },
          { id: 82, rgb: '140, 123, 232' },
          { id: 92, rgb: '238, 147, 246' }
        ],
        // 三排
        [
          { id: 13, rgb: '196, 196, 196' },
          { id: 23, rgb: '51, 51, 51' },
          { id: 33, rgb: '224, 102, 102' },
          { id: 43, rgb: '251, 141, 0' },
          { id: 53, rgb: '255, 217, 102' },
          { id: 63, rgb: '135, 193, 32' },
          { id: 73, rgb: '76, 194, 238' },
          { id: 83, rgb: '63, 73, 185' },
          { id: 93, rgb: '208, 65, 225' }
        ],
        // 四排
        [
          { id: 14, rgb: '157, 157, 157' },
          { id: 24, rgb: '38, 38, 38' },
          { id: 34, rgb: '204, 0, 0' },
          { id: 44, rgb: '231, 82, 0' },
          { id: 54, rgb: '255, 183, 0' },
          { id: 64, rgb: '103, 143, 0' },
          { id: 74, rgb: '1, 136, 251' },
          { id: 84, rgb: '39, 65, 177' },
          { id: 94, rgb: '164, 25, 211' }
        ]
      ],
      // 常用
      colorUsed: [
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' },
        { id: 0, rgb: '255, 255, 255' }
      ],
      colorMinorflat: [],
      selected: 5,
      selecteColor: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.colorMinorflat = this.colorMinor.flat(2)
      this.selected = localStorage.getItem('selected') ? Number(localStorage.getItem('selected')) : 0
      if (localStorage.getItem('colorUsed')) {
        this.colorUsed = JSON.parse(localStorage.getItem('colorUsed'))
      }
    },
    activeChange (key, item) {
      if (key === 'colorPrimary') {
        this.selected = item.id
        let bool = this.colorUsed.some((value) => {
          return value.id === item.id
        })
        if (!bool) { // 加入最近使用
          this.selecteColor = item
          this.colorUsed.unshift(item)
          this.colorUsed.pop()
          localStorage.setItem('colorUsed', JSON.stringify(this.colorUsed))
          localStorage.setItem('selected', this.selected)
        } else { // 最近使用中已经有了
          this.colorUsed.forEach((val, k) => {
            if (val.id === item.id) {
              this.colorUsed.splice(k, 1)
              this.colorUsed.unshift(item)
            }
          })
        }
      } else if (key === 'colorMinor') {
        this.colorMinorflat.forEach((v, k) => {
          if (v.id === item.id) {
            this.selected = item.id
            let bool = this.colorUsed.some((value) => {
              return value.id === item.id
            })
            if (!bool) {
              this.selecteColor = item
              this.colorUsed.unshift(item)
              this.colorUsed.pop()
              localStorage.setItem('colorUsed', JSON.stringify(this.colorUsed))
              localStorage.setItem('selected', this.selected)
            } else {
              this.colorUsed.forEach((val, ks) => {
                if (val.id === item.id) {
                  this.colorUsed.splice(ks, 1)
                  this.colorUsed.unshift(item)
                }
              })
            }
          }
        })
      } else if (key === 'colorUsed') { // 点击最近使用
        this.selecteColor = item
        this.selected = item.id
        if (item.id === 0) {
          this.selected = 1
          this.selecteColor = { id: 1, rgb: '255, 255, 255' }
          localStorage.setItem('selected', this.selected)
        }
      }
    }
  }
}
</script>

<style lang="scss">
#colorPicker {
  box-sizing: border-box;
  margin: 0 auto;
  width: 220px;
  height: 224px;
  border-radius: 2px;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
  padding: 12px 11px 6px;
  .colorpicker_box-line__tH9r- {
    display: flex;
    .colorpicker_grid__2kYzP {
      margin: 1px 1px;
      width: 16px;
      height: 16px;
      padding: 1px;
      border: 1px solid transparent;
      &:hover {
        margin: 0;
        width: 18px;
        height: 18px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.24);
      }
    }
    .colorpicker_id_1 {
      border-color: rgba(0, 0, 0, 0.08);
    }
    .active {
      border: 1px solid rgba(0, 0, 0, 0.64);
      width: 20px;
      height: 20px;
      margin: -1px 0;
      &:hover {
        margin: -1px 0;
        width: 20px;
        height: 20px;
      }
    }
  }
  .colorpicker_text__2gZyK {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #000c;
    text-align: left;
  }
}
</style>
