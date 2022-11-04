// components/cartItem/index.vue.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		cartList:{
			type:Array,
			default:()=>[]
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
    
	},
	observers:{
		cartList(val){
			console.log(val,'valvalvalvalval');
		}
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		handelSub(e){
			let {id} = e.target.dataset
			// console.log(id);
		 this.triggerEvent('handelSub',id)
	 },
	 handelPlus(e){
		 let {id} = e.target.dataset
		//  console.log(id);
		 this.triggerEvent('handelPlus',id)
	 },
	 inputChange(e){
		 let data= {id:e.target.dataset.id,value:e.detail.value}
		 this.triggerEvent('inputChange',data)

	 }
	}
})
