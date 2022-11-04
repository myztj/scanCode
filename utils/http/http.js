import {config} from '../../config/config'
import {wxToPromise} from '../../utils/wxToPromise'
import promptMessage from '../prompt-message/index'
class http{
	//共有方法全局调用,static可以不用new就可以调用方法
	 static request({url,method="GET",data={},header={}}){
		wx.showLoading({
			title: '加载中',
		})
			return	http._request({url,method,data,header})
	 }
	 //私有发放只在class中使用
	 static async _request({url,method,data,header}){
		 try {
			const response = await wxToPromise("request",{
				url:config.baseUrl+url,
				method,
				data,
				header:{
				 devicetype:config.devicetype,
					...header
				}
			 })
			 if (response.statusCode<400) {
				return response.data
			 }else{
				http.hint(response.statusCode, response.data.msg)
			 }
		 } catch (error) {
			 console.log(error);
		 } finally{
        wx.hideLoading()
		 }
	 }
	static hint(code,msg){
		let title=''
		title = promptMessage[code] || msg || '未知错误'
       wx.showToast({
				 title: title,
				 icon:'none'
			 })
	 }
}

export default http