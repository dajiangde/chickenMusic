<template>
  <div class="progress-bar" @click.stop="jumpTime">
    <div class="bar-inner" ref="bar">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="btnWrapper" @touchstart.prevent="onProgressBarStart" @touchmove.prevent="onProgressBarMove" @touchend="onProgressBarEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
	import { prefixStyle } from 'common/js/dom'
	import {mapGetters} from 'vuex'
	const transform = prefixStyle('transform')
	const btnWidth=16
	
  export default{
		props: {
			totalTime: {
				type: Number,
				default: 0
			},
			currentTime: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				moveDelta: 0,
				btnTranslateX: 0,
				percent:0
			}
		},
		computed: {
			...mapGetters([
				'currentSong'
			])
		},
		methods: {
			jumpTime(e){
				console.log(e);
				if(e.target.className==='progress-btn'||e.target.className==='progress-btn-wrapper'){
					return
				}
				const offsetX=e.offsetX
				this.btnTranslateX=offsetX
				this.percent=offsetX/this.delta
				this.$refs.btnWrapper.style[transform]=`translate3d(${offsetX}px,0,0)`
				this.$refs.progress.style['width']=this.percent*100+'%'
				this.$emit('progressDragEnd',this.percent)
			},
			onProgressBarStart(e) {
				console.log(e.touches[0]);
				this.isOnDrag=true
				this.startClienX=e.touches[0].clientX
			},
			onProgressBarMove(e){
				this.moveDelta=e.touches[0].clientX-this.startClienX
				let translateX=this.btnTranslateX+this.moveDelta
				if(translateX<0){
					translateX=0
				}
				if(translateX>this.delta){
					translateX=this.delta
				}
				this.$refs.btnWrapper.style[transform]=`translate3d(${translateX}px,0,0)`
				this.percent=translateX/this.delta
				this.$emit('GetCurrentProgressPosition',this.percent)
				this.$refs.progress.style['width']=this.percent*100+'%'
			},
			onProgressBarEnd(e){
				this.btnTranslateX+=this.moveDelta
				if(this.btnTranslateX<0){
					this.btnTranslateX=0
				}
				if(this.btnTranslateX>this.delta){
					this.btnTranslateX=this.delta
				}
				this.$emit('progressDragEnd',this.percent)
				console.log(this.btnTranslateX);
				this.isOnDrag=false
			}
		},
		watch: {
			currentTime(newTime) {
				if(newTime===this.totalTime||this.isOnDrag){
					return
				}
				this.percent=newTime/this.totalTime
				const moveX=this.delta*this.percent
				this.$refs.progress.style['width']=this.percent*100+'%'
				this.$refs.btnWrapper.style[transform]=`translate3d(${moveX}px,0,0)`
			},
			currentSong(newSong){
				this.btnTranslateX=0
				this.isOnDrag=false
				if(!this.delta){
					this.delta=this.$refs.bar.clientWidth-btnWidth
				}
			}
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
