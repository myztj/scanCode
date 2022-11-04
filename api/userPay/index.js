import http from '../../utils/http/http'

//获取optionId
const getOptionId = (data)=>{
	console.log("data=>",data);
	return http.request({url:'/weixinpay/login',	method:'GET',data})
}

//用户下单
const userOrder= (data)=>{

	return http.request({
		url:'/weixinpay/doOrder',
		method:'POST',
		data
	})

}

export default {
	getOptionId,
	userOrder
}