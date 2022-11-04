// components/cartFooter/index.js.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		cartList:{
			type:Array,
			default:()=>[]
		},
		total:{
			type:[String || Number],
			default:0
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		goonScanCode(){
			this.triggerEvent('goonScanCode')
		},
		handelOrder(){
			this.triggerEvent('handelOrder')
		}
	}
})
