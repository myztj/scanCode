// pages/scancode/index.js
import {disposeCart} from '../../utils/disposeCartdata/index'
import{openScanCode,getCommodityList} from '../../common/scan-code'
import {localNames} from '../../utils/localNames'
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		swiperDate:[],
		show:true,
		data:[]
	},
  getSwiperDate(){
     const datas = [
			 {
				 id:1,
				 imageUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0179b25bbb0a5ea801213dea0a8b3f.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669782605&t=c98399c5e9a94a9ae54ebfccc9a800aa'
			 },
			 {
				id:2,
				imageUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-blog.csdnimg.cn%2F20201216145406678.png%3Fx-oss-process%3Dimage%2Fwatermark%2Ctype_ZmFuZ3poZW5naGVpdGk%2Cshadow_10%2Ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk1MTYwMQ%3D%3D%2Csize_16%2Ccolor_FFFFFF%2Ct_70&refer=http%3A%2F%2Fimg-blog.csdnimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669782605&t=d9ddbee1f57c9a6b71d0ab3a4fc76c9b'
			},
			{
				id:3,
				imageUrl:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013e175febd6a511013ee04d4e63e5.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669782605&t=5c8fd4e7bcfd55ee80773bb5154befdd'
			}
		 ]
		 this.setData({
				swiperDate:datas
		 })
	},
	//获取本地数据
	getTotalData(){
		let data = wx.getStorageSync(localNames.CARTS)
		if (data.length>0) {
			 this.setData({show:false,data})
		}else{
			 this.setData({show:true})
		}
	},
  async	handelClick(){
		let res = await openScanCode()
		let response = await getCommodityList(res)
		disposeCart(response)
		wx.navigateTo({
			url: '/pages/cart/index',
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
		this.getSwiperDate()
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		this.getTotalData()
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