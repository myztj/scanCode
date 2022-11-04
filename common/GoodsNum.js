//获取商品数量
const getGoodsNum = (data)=>{
	if (data || data.length>0) {
		let num = 0
		data.forEach(item=>{
			num+=item.num
		})
		return num
	}
}

export default getGoodsNum