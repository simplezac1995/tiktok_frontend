import md5 from '../common/md5.js';
//const rootUrl = 'http://api.douyin.cn/';
//const rootUrl = 'https://www.ugdtt.com/'; 
const rootUrl = 'https://enapi.go-upgood.com/'; 

const apiRootUrl = rootUrl;
export default {
	rootUrl:rootUrl,
	apiRootUrl:apiRootUrl,
	loading:false,
	config:{},
	getSign:function(data){
		var user = uni.getStorageSync("user");
		var token = user?user.token:0;
		var timestamp = Date.parse(new Date()) / 1000;
		data.timestamp = timestamp;
		if(!data.user){
			data.user = user?user.id:0;
		}
		var params = new Array();
		var i=0;
		for (let key in data) {
			var val = data[key];
			if(typeof(val) == "object" && Object.prototype.toString.call(val).toLowerCase() == "[object object]"){
				
			}else if((val||val==="0") && val!="" && val!="undefined" && key!="imgData" && key!="jsonData" && key!='sign') {
				params[i] = key + "=" + val;
				i++;
			}
		}
		
		params = params.sort();
		var pstr = "";
		for (let i in params) {
			pstr += "&" + params[i];
		}
		pstr = pstr.substring(1) + token;
		var sign = md5(pstr);
		data.sign=sign;
	},
	post: function(api,data,succ,error,hideloading) {
		var _this = this;
		this.getSign(data);
			
		if(!hideloading && !_this.loading){
			_this.loading = true;
			uni.showLoading({
				mask: true,
			});
		}
		console.log("请求接口："+apiRootUrl+api);
		uni.request({
			url: apiRootUrl+api,
			method: 'POST',
			data: data,
			header:{
		      "content-type":'application/x-www-form-urlencoded'
			},
			success: res => {
				if(!hideloading){
					_this.loading = false;
					uni.hideLoading();
				}
				
				if(res.statusCode==200){
					if(res.data.succ){
						succ(res.data);
					}else{
						
						if(error){
							error(res.data);
						}else{
							uni.showToast({
								icon:'none',
								title: res.data.msg
							}); 
						}
						if(res.data.code==-1){//重新登陆
							_this.removeUser();
							uni.redirectTo({
								url:'/pages/login/index',
							})
						}						
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'Interface status exception:'+res.statusCode
					})
				}
			},
			fail: (res) => {
				console.log(res);
				uni.showToast({
					icon:'none',
					title:'The data interface requests an exception'
				})
			},
			complete: () => {
				_this.loading=false;
			}
		});
	},
	toast(title,backfun){
		uni.showToast({
			icon:'none',
			title:title,
			success:function(){
				if(backfun) backfun()
			}
		})
	},
	
	alert(title,backfun){
		uni.showModal({
			content:title,
			showCancel:false,
			cancelText: "cancel", // 取消按钮的文字  
            confirmText: "confirm", // 确认按钮文字 
			success:function(e){
				if(e.confirm){
					if(backfun) backfun()
				}
				
			}
		})
	},
	
	confirm(title,backfun){
		uni.showModal({
			content:title,
			cancelText: "cancel", // 取消按钮的文字  
            confirmText: "confirm", // 确认按钮文字 
			success:function(e){
				if(e.confirm){
					backfun()
				}
				
			}
		})
	},
	
	setUser:function(user){
		if(user.id) user.id=user.id+"";
		uni.setStorageSync("user",user);
	},
	getUser:function(){
		var user = uni.getStorageSync("user"); 
		return user;
	},
	removeUser:function(){
		uni.removeStorageSync("user");
	},
	
	userEvent(event){
		var userInfo = this.getUser();
		
		var user = userInfo.id;
		if(!user) user=0;
		var merchant = uni.getStorageSync("shareMerchant");
		
		if(!merchant) merchant=0;
		if(user || merchant){
			this.post("open/userEvent",{user:user,event:event,merchant:merchant},function(res){},function(res){},true);
		}
		
	},
	isWeixin:function(){
		try{
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) == 'micromessenger') {
				return true;
			}
		}catch(e){
			//TODO handle the exception
		}
		return false;
	},
	
	//复制
	copyTextToClipboard:function(text) {
		var _this = this;
		//#ifdef H5
	    var textArea = document.createElement("textarea")
	    textArea.style.position = 'fixed'
	    textArea.style.top = 0
	    textArea.style.left = 0
	    textArea.style.width = '2em'
	    textArea.style.height = '2em'
	    textArea.style.padding = 0
	    textArea.style.border = 'none'
	    textArea.style.outline = 'none'
	    textArea.style.boxShadow = 'none'
	    textArea.style.background = 'transparent'
	    textArea.value = text
	
	    document.body.appendChild(textArea)
	
	    textArea.select()
	
	    try {
		  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
			textArea.setSelectionRange(0, textArea.value.length);   //兼容ios
		  }
	      var msg = document.execCommand('copy') ? '成功' : '失败'
	      this.toast("Copy success");
	    } catch (err) {
	      this.toast("Copy the failure");
	    }
	    document.body.removeChild(textArea)
		
		//#endif
		
		//#ifndef H5
		uni.setClipboardData({
		    data: text,
		    success: function () {
		        _this.toast("Copy success");
		    }
		});
		//#endif
	},
	
	//保存图片
	savePicture:function(url){
		var _this = this;
		// #ifdef H5
		let a = document.createElement("a"); // 生成一个a元素
		let event = new MouseEvent("click"); // 创建一个单击事件
		a.download = "photo"; // 设置图片名称
		a.style.display='none';
		a.href = url;
		a.dispatchEvent(event); // 触发a的单击事件
		// #endif
		
		// #ifndef H5
		uni.showLoading({
			mask: true,
			title:'downloading...'
		});
		uni.downloadFile({
		    url: url,
		    success: (res) => {
		        if (res.statusCode === 200) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function () {
							uni.hideLoading();
							_this.toast("The picture has been saved to the album");
						}
					});
		        }
		    }
		});
		// #endif
	}
}

