<template>
  <div class="recommend">
      <scroll ref="scroll" class="recommend-content">
				<div>
					<div class="slider-wrapper" v-if="recommends.length">
						<div class="slider-content">
							<slider>
								<div v-for="item in recommends">
									<a >
										<img :src="item.picUrl">
									</a>
								</div>
							</slider>
						</div>
					</div>
						<div class="recommend-list">
							<h1 class="list-title">热门歌单推荐</h1>
							<ul>
								<li class="item" v-for="item in songList">
									<div class="icon">
										<img width="60" height="60" v-lazy="item.imgurl">
									</div>
									<div class="text">
										<h2 class="name">{{item.creator.name}}</h2>
										<p class="desc">{{item.dissname}}</p>
									</div>
								</li>
							</ul>
						</div>
				</div>
				<div class="loading-container" v-show="!songList.length">
					<loading @title="123"></loading>
				</div>
      </scroll> 
  </div>
</template>

<script>
	import Slider from 'base/slider/slider'
	import Scroll from 'base/scroll/scroll'
	import {getRecommend,getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import Loading from 'base/loading/loading'
	
	export default{
		data(){ 
			return {
				recommends:[],
				songList:[]
			}
		},
		created() {
			this._getRecommend() 
			this._getDiscList()  
		}, 
		methods:{
			_getRecommend() {
				getRecommend().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if (res.code === ERR_OK) {
						this.songList=res.data.list
					}
				})
			}
		}, 
		components:{
			Slider,
			Scroll,
			Loading
		}
	}  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
