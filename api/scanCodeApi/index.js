
import http from '../../utils/http/http'

const getOneShopOrderApi = (data)=>{
	console.log("data=>",data);
	return http.request({url:'/api/getProduct',	method:'GET',data})
}


export default {
	getOneShopOrderApi
}