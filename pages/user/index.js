// pages/user/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	 number : 0,
	 fee: 1,             // 支付金额，单位为分
	 paymentArgs: 'A', // 将传递到功能页函数的自定义参数
	 currencyType: 'USD' ,// 货币符号，页面显示货币简写 US$ 
	 version: 'develop', // 上线时，version 应改为 "release"，并确保插件所有者小程序已经发布
	},
	handelPitch(e){
		let num = e.currentTarget.dataset.num
    this.setData({
			number :num
		})
	},
	handelRecharge(){
		wx.showToast({
			title: '暂不支持充值功能',
			icon:'error'
		})
		// const { fee, paymentArgs, currencyType, version } = this.data
		// wx.requestPluginPayment({
		// 		fee,
		// 		paymentArgs,
		// 		currencyType,
		// 		version,
		// 		success(r) {
		// 				console.log(r)
		// 		},
		// 		fail(e) {
		// 				console.error(e)
		// 		}
		// })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})