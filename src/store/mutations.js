import * as types from './mutation-type'

const mutations ={
	[types.SET_SINGER](state,singer){
		state.singer=singer
	},
	[types.SET_PLAYING](state,flag){
		state.playing=flag
	},
	[types.SET_FULLSCREEN](state,flag){
		state.fullScreen=flag
	},
	[types.SET_PLAYLIST](state,playlist){
		state.playlist=playlist
	},
	[types.SET_SEQUENCELIST](state,sequenceList){
		state.sequenceList=sequenceList
	},
	[types.SET_MODE](state,playMode){
		state.mode=playMode
	},
	[types.SET_CURRENTINDEX](state,currentIndex){
		state.currentIndex=currentIndex
	}
}

export default mutations
