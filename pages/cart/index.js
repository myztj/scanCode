// pages/cart/index.js
import {localNames} from '../../utils/localNames'
import {openScanCode,getCommodityList} from '../../common/scan-code'
import {disposeCart}from '../../utils/disposeCartdata/index'
import countTotal from '../../common/count'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cartList : [],
		total:''
	},
	//去结算
	handelOrder(){
    wx.navigateTo({
			url: '/pages/order/order',
		})
	},
	//继续扫码添加
 async goonScanCode(){
		let res = await openScanCode()
		let response = await getCommodityList(res)
		disposeCart(response)
		this.getCartList()
	},
	//获取总数据
   getCartList (){
		 let  list = wx.getStorageSync(localNames.CARTS)
		 this.setData({
			cartList:list
		 })
		 this.countPrrice()
	 },
	 //总价计算
	 countPrrice(){
		 let sum = countTotal(this.data.cartList)
		 this.setData({
			total:sum.toFixed(2)
		 })
	 },
	 	//商品减
	handelSub(e){
		// console.log("id=>>>>>",e.detail);
		let index = this.data.cartList.findIndex(item=>item._id==e.detail)
		let num =this.data.cartList[index].num
		 let flag	=this.removeItem(num,index)
		 if (flag) return
		this.data.cartList[index].num-=1
		this.setData({
			cartList:this.data.cartList
		})
		this.countPrrice()
		this.storageData()
	},
	//input事件
	inputChange(e){
	 console.log(e.detail);
	 let {id} = e.detail
	 let {value} = e.detail
	 let index = this.data.cartList.findIndex(item=>item._id==id)
	 this.removeItem(value,index)
	 if (value<1)  value=1
	 if (value>=10) {
		 value=10
		 wx.showToast({
			 title: '最多购买10件',
			 icon:"error"
		 })
	 }
	 this.data.cartList[index].num=value
	 this.setData({
		cartList:this.data.cartList
	})
	this.countPrrice()
	this.storageData()
	},
	//删除事件
	removeItem(num,index){
    if (num<=1) {
			wx.showModal({
				content: '你要删除商品吗？',
				success: (res)=> {
					if (res.confirm) {
					this.data.cartList.splice(index,1)
						this.setData({
							cartList:this.data.cartList
						})
						this.storageData()
						this.countPrrice()
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
			return true
		}
	},
	//商品增加
	handelPlus(e){
		let index = this.data.cartList.findIndex(item=>item._id==e.detail)
		this.data.cartList[index].num+=1
		if (this.data.cartList[index].num>10) {
			this.data.cartList[index].num=10
			   wx.showToast({
				 title: '最多购买10件',
				 icon:"error"
			 })
		}
		this.setData({
			cartList:this.data.cartList
		})
		this.countPrrice()
		this.storageData()
	},
	//数据持久化本地村粗
	storageData(){
		wx.setStorageSync(localNames.CARTS, this.data.cartList)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getCartList()
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
    this.storageData()
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