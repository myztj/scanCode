// app.js
import pay from "./api/userPay/index"
App({

		//小程序初始化
	async	wxInit(){
		// 获取codeid
		let code = await this.getCodeId()
		let res = await this.getOptionId({code})
		// console.log("resresres=>>>>",res);
		this.setUserInfo(res)
		},
		//获取codeid
	async	getCodeId(){
		let res = await	wx.login()
		console.log("code=>>>",res.code);
		return res.code
		},

		//获取optionId
	async	getOptionId(data){
		let res=await	pay.getOptionId(data)
		 console.log("res=>",res);
		 return res.userinfo
		},

		//用户信息存储到本地
		setUserInfo(info){
			console.log(info);
		if (!info)  return
		console.log(123132132);
     wx.setStorageSync('userinfo', info)
		},


  onLaunch() {
   this.wxInit()
  },
  globalData: {
    userInfo: null
  }
})
