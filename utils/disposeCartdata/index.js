import {localNames} from '../localNames'
function disposeCart (data){
	if (data.length===0) return
	let cartList = wx.getStorageSync(localNames.CARTS) || []
	 let list = cartList.find(item=>item._id === data._id)
	 if (list) {
		list.num+=1
	 }else{
		cartList.push({...data,num:1})
	 }
	 wx.setStorageSync(localNames.CARTS, cartList)
}
export {
	disposeCart
}