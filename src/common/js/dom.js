export function addClass(el,className){
	if(hasClass(el,className)){
		return
	}
	el.className=el.className+' '+className
}

export function hasClass(el,className){
	const reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
	return reg.test(el.className)
} 

export function getData(el,name,value){
	const prefix = 'data-'
	if (value) {
		return el.setAttribute(prefix + name, value)
	}
	return el.getAttribute(prefix + name)
}

let domStyle = document.createElement('div').style
let vendor = (()=>{
	const transform = {
		'webkit':'webkitTransform',
		'O':'oTransfrom',
		'ms':'msTransform',
		'Moz':'MozTransform',
		'standard':'transform'
	}
	for (let key in transform) {
		if(domStyle[transform[key]]!==undefined){
			return key
		}
	}
	return false;
})()

export function prefixStyle(style){
	if (vendor === false) {
	    return false
	  }
	
	  if (vendor === 'standard') {
	    return style
	  }
	
	return vendor+style.charAt(0).toUpperCase()+style.substr(1)
}
