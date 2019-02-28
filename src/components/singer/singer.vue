<template>
	<div class="singer">
		<list-view :data="singerList" @selectItem="selectSinger" v-if="singerList.length"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from 'api/singer'
	import ListView from 'base/listview/listview'
	import Singer from 'common/js/singer'
	import {ERR_OK} from 'api/config'
	import {mapMutations} from 'vuex'
	
	const HOT_SINGER_LEN = 10
	const HOT_NAME = '热门'
	const OTHER_NAME = '9'
	
	export default {
		data() {
			return {
				singerList: [],
			}
		},
		created() {
			this._getSingerList();
		},
		methods: {
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			selectSinger(singer){
				this.$router.push({
					path: `/singer/${singer.id}`
				})
				
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res)=>{
					if (res.code === ERR_OK) {
						this.singerList=this._normalizeData(res.data.list);
					}
				})
			},
			_normalizeData(list){
				let map={
					hot:{
						title:HOT_NAME,
						items:[]
					}
				}
				list.forEach((item,index)=>{
					if(index<HOT_SINGER_LEN){
						map.hot.items.push(new Singer({
							'id':item.Fsinger_mid,
							'name':item.Fsinger_name
						}))
					}
					const key = item.Findex
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer({
						'id':item.Fsinger_mid,
						'name':item.Fsinger_name
					}))
				})
				let hot=[],ret=[],other=[]
				for (let key in map) {
					const val = map[key]
					if(key==='hot'){
						hot.push(val)
					}else if(key===OTHER_NAME){
						val.title='#'
						other.push(val)
					}else{
						ret.push(val)
					}
				}
				ret.sort(function(a,b){
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret,other)
			}
		},
		components:{
			ListView
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
