// pages/order/order.js
import {localNames} from '../../utils/localNames'
import countTotal from '../../common/count'
import getGoodsNum from "../../common/GoodsNum"
import pay from '../../api/userPay/index'
import {transitionCode} from '../../utils/transitionCode/index'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	 oriderlist:[],
	 unfoldNum:1,
	 goodsNum:0 ,//商品数量
	 totalNum:0, ////商品总价
	 practicalPrice:0 ,// 总价减余额
	 subPrice:4 //余额减扣
	},
	 //获取总数据
	 getOriderlist(){
		 let list = wx.getStorageSync(localNames.CARTS)
		 this.setData({
			oriderlist:list,
			totalNum:0, //商品总价
			checkout:true, //是否开余额开关
			priceNum:4, //余额
			practicalPrice:0,  // 总价减余额
			subPrice:0
		 })
	 },
	 //商品展开收起
	 handelUnfold(){
		let unfoldNum= this.data.unfoldNum==1? this.data.oriderlist.length : 1
      this.setData({
				unfoldNum
			})
	 },
	 //计算总价
	 handelcount(){
	 let totalNum = countTotal(this.data.oriderlist)
	 this.setData({
		 totalNum
	 })
	 },
	 //switch开关事件
	 switchChange(e){
			let flag = e.detail.value
			this.setData({
				checkout : flag
			})
			this.countpracticalPrice()
	 },
	 //订单余额结算
	 countpracticalPrice(){
		if (this.data.checkout) {
			if (this.data.totalNum<this.data.priceNum) {
				let priceNum =this.data.priceNum - this.data.totalNum
				 this.setData({
					priceNum,
					practicalPrice:0,
					subPrice : this.data.totalNum
				 })
			}else{
			  let practical=this.data.totalNum - this.data.priceNum
			  this.setData({
					priceNum:0,
				 subPrice : this.data.priceNum,
				 practicalPrice: practical
			 })
			}

		 }else{
			 this.setData({
			  	priceNum:4,
				 subPrice:0,
				 practicalPrice:this.data.totalNum
			 })
		 }
	 },
	 //计算商品数量
	 calculateGoodsNum(data){
		let goodsNum = getGoodsNum(data)
		console.log("num=>>>>",goodsNum);
		this.setData({goodsNum})
	 },
	 //点击确认支付
	 payAffirm(){
     this.userPay()
	 },
	 //转换map5
	 //用户下单调起后台数据
	async userPay(){
		 let datas = wx.getStorageSync('userinfo')
		 console.log("本地数据=>>>>",datas);
		 const  signData = transitionCode({
			openid:datas.openid,
			salt:datas.salt,
			uid:datas._id
		 })
			
		 let data = {
			openid:datas.openid, //用户唯一标识
			uid:datas._id,//用户 id 为 上一接口保存的_id
			sign:signData,//签名
			total_price:this.data.totalNum,//总价格
			total_num:this.data.goodsNum,//总数量	
			derate_price:this.data.subPrice,//余额减扣
			real_price:this.data.practicalPrice,//真实价格
			order:JSON.stringify(this.data.oriderlist) //数组见 order 字段
		 }
		 
		let res = await pay.userOrder(data)
		// console.log(res,"======>>>>>>>>");
		this.melodyWxpay(res)
	 },
	 //调起微信支付功能
	  melodyWxpay(res){
			let data = JSON.parse(res.result)
			// console.log("成功数据=》》》》",data);
		wx.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: 'MD5',
			paySign: data.paySign,
			success: (res) =>{
				wx.showToast({
					title: '付款成功',
					icon:'success'
				})
				this.gotoSuccess()
				wx.removeStorageSync(localNames.CARTS)
				console.log(res,'付款成功');
			 },
			fail: (error)=> { 
				wx.showToast({
					title: '付款时错误',
					icon:'error'
				})
        console.log(error,"付款时出现错误");
			}
		})
	 },
   //跳转成功页面
	 gotoSuccess(){
		wx.navigateTo({
			url: '/pages/sucess/sucess',
		})
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
 this.getOriderlist()
 this.handelcount()
 this.countpracticalPrice()
 this.calculateGoodsNum(this.data.oriderlist)
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