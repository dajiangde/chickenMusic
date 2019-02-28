<template>
  <transition name="slide">
		<music-list :songs="songList" :singer="singer"></music-list>
  </transition>
</template>

<script>
	import MusicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import {createSong, processSongsUrl,isValidMusic} from 'common/js/song'
  export default{	
		data() {
			return {
				songList: []
			}
		},
		computed:{
			...mapGetters(['singer'])
		},
		created() {
			this._getSingerDetail(this.singer.id)
		},
		methods:{
			_getSingerDetail(singerId){
				if(!singerId){
					this.$router.back()
				}
				getSingerDetail(singerId).then((res)=>{
					if (res.code === ERR_OK) {
						processSongsUrl(this._nomalizeSong(res.data.list)).then((songs) => {
							this.songList = songs
						})
					}
				})
			},
			_nomalizeSong(list){
				let arr=[]
				list.forEach((item,index)=>{
					const {musicData}=item
					if (isValidMusic(musicData)) {
						arr.push(createSong(musicData))
					}
				})
				return arr
			}
		},
		components:{
			MusicList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
