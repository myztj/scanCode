
const countTotal = (total) =>{
    if (total || total.length>0) {
			let sum = 0
			total.forEach(item=>{
					sum+=(item.num*item.price)
			})
			return sum
		}
}

export default countTotal