//将request装为promise对象
function wxToPromise(request,option){
	//返回一个promise
	return new Promise((reslove,reject)=>{
		//这里把wx.request中的成功的回调等于reslove,是因为这样可以直接让成功变成promise的方法
		option.success=reslove
		option.fail = (err)=>{
      reject(err)
		}
		//这里的调用是封装好的写法，和wx.request({...option})写法是一样的
		wx[request](option)
	})
}

//调用此方法传入参数

export{wxToPromise}
