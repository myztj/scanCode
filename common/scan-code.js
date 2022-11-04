
import indexApi from  '../api/scanCodeApi/index'
const openScanCode = async()=>{
 	let response = await wx.scanCode({
		onlyFromCamera: true,
	})
	return response.result
}
const getCommodityList = async(code)=>{
		let data= {qcode:code}
		const response = await indexApi.getOneShopOrderApi(data)
		if (response.result.length>0) {
			return response.result[0]
		}else{
			wx.showToast({
				title: '没有找到此商品',
				icon:'error'
			})
		}
}
export {
	openScanCode,
	getCommodityList
}