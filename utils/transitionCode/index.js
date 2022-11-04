import md5 from '../md5/index'
export const  transitionCode = (infoData)=>{
	let str = ''
	let arr = Object.keys(infoData).sort()
	for(let i= 0;i<arr.length; i++){
		str+=arr[i]+infoData[arr[i]]
	}
	return md5(str)
}
