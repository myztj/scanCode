// components/scanCode/i-scancode.js
import {localNames} from '../../utils/localNames'
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		status:{
			type:Boolean,
			default:false
		},
		data:{
			type:Array,
			default:()=>[]
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
 
	},

  created(){

	},
	attached(){

	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		handelClick(){
			this.triggerEvent('handelClick')
		},
		handelGotoOrider(){
			wx.navigateTo({
				url: '/pages/order/order',
			})
		}
	}
})
