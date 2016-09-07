/**
 * @description: PinganHybrid v0.1.0 
 * @created: 2016-6-15 14:07:25
 * @author: lichenxi
 */
!function(window){
/**
 * @brief 观察者类
 * @description 用来处理native回调函数内部的逻辑(该类的实例是一个单例)
 */

 var Observer = function(){
 	if(typeof Observer.instance === 'Object'){
 		return Observer.instance;
 	}
 	this.subscribers = [];
 	Observer.instance = this;
 }

 Observer.prototype = {
 	constructor : Observer,
 	sub : function(evt,fn){
 		//订阅方法，并返回订阅标示符
 		if(this.subscribers[evt]){
 			this.subscribers[evt].push(fn);
 		}else{
 			this.subscribers[evt] = [];
 			this.subscribers[evt].push(fn);
 		}
 		return '{"event":"' + evt +'","fn":"' + (this.subscribers[evt].length - 1) + '"}';

 	},
 	//发布方法，成功返回自身
 	pub : function(evt,args){
 		if(this.subscribers[evt]){
 			var callback;
 			for(var i in this.subscribers[evt]){
 				callback = this.subscribers[evt][i];
 				if(typeof callback === 'function'){
                    
 					callback(args);
 				}
 			}
 			return this;
 		}
 		return false;
 	},
 	//解除订阅，需传入事件标示符,无事件标示符的话，清除所有的注册事件
 	unsub : function(eventId){
 		if(!eventId){
 			this.subscribers = [];
 		}
 		try{
 			var id = JSON.parse(eventId);
 			this.subscribers[id.event][id.fn] = null;
 		}catch(error){
 			console.log(error);
 		}
 	}
}

/**
 * @brief native回调函数
 * @description 将native的返回的数据发布出去
 * @method bridgeCallback
 * @param {String} param native传给H5的字符串
 */

 function bridgeCallback(param){
 	var jsonObj = JSON.parse(param);
 	if(jsonObj != null){
 		Observer.instance&&Observer.instance.pub(jsonObj.tagname,jsonObj.param);
 		return true;
 	}
 	return false;
 }




var __HC_JS_PARAM = '?jsparam=',
	__HC_URL_PLUGIN = "healthcloud://hybrid/",
	isReadPlatformInfo = false;

/**
 * @description 判断浏览器的平台
 * @private
 */
 function __read_platform_info() {
    if (isReadPlatformInfo) {
        return;
    }
    
    isReadPlatformInfo = true;

    var ua = navigator.userAgent;
    if (ua.indexOf("iPhone OS") > 0) {
        Internal.isIOS = true;
    }
    else if (ua.indexOf("Android") > 0) {
        Internal.isAndroid = true;
    }
    else{
    	Internal.hello = true;
    }
}
/**
 * @class URL
 * @description ios情况下url的请求类别常量
 * @brief 内部使用的常量
 * @private
 */
 var URL = {
 	navigation : 'navigation',
 	alert : 'alert',
 	loading : 'loading',
 	webviewex : 'webviewex',
 	share : 'share',
 	user :'user',
 	util :'util',
 	system : 'system',
 	gallery : 'gallery'
 }
	
/**
 * @class Internal
 * @description bridge.js内部使用的工具对象
 * @brief 内部使用的工具对象
 * @private
 */

var Internal = {
	
	
	/**
	 * @brief 转化成JSON
	 * @description 将参数转化成JSON字符串
	 * @method makeParamString
	 * @param {String} tagname
	 * @param {Object} params
	 */
	makeParamString : function(tagname,params){
		var paramObject = {};

		paramObject.tagname = tagname;

		if(params){
			paramObject.param = params;
		}

		return JSON.stringify(paramObject);
	},
	
	
	/**
	 * @brief 生成url
	 * @description 生成ios环境下请求的url
	 * @method makeURLWithParam
	 * @param {String} paramsString 参数的json字符串
	 * @param {String} type 请求url中类别参数,必须是URL对象中的属性
	 */
	makeURLWithParam : function(paramsString,type){
		return __HC_URL_PLUGIN + type + __HC_JS_PARAM + paramsString;
	},
	
	/**
	 * @brief 内部URL请求
	 * @description 内部隐藏iframe，实现url请求
	 * @param {String} url 需要请求的url
	 * @method loadURL
	 */
	loadURL : function(url){
		var iframeEle = document.createElement('iframe');
		var cont = document.body||document.documentElement;
		iframeEle.onload = iframeEle.onreadystatechange = this.iframeload;
		iframeEle.style.dispaly = 'none';
		iframeEle.src = url;
		cont.appendChild(iframeEle);
	},
	/**
	 * @brief iframe的回调函数
	 * @description iframe加载完成后调用的回调函数
	 * @method iframeload
	 */
	
	iframeload : function(){
		if(!this.readyState||this.readyState == 'complete'){
			this.outerHTML = '';
		}
	}
}

__read_platform_info();
/**
 * @class NavBar
 * @description H5页面顶部导航栏控制
 * @brief H5页面顶部控制
 */

var PinganNavBar = {
	/**
	 * @description 设置顶部导航栏隐藏／显示
	 * @brief 顶部导航隐藏／显示
	 * @param {boolean} isHidden 是否隐藏顶部导航栏
	 * @param {string} tagname 请求标志位
	 * @method app_show_navbar
	 * @example
	 * 
	 * NavBar.app_set_navbar_hidden(true)
	 */
	
	app_show_navbar : function(isHidden){
		var params = {};
		var tagname = 'app_show_navbar';
		params.isHidden = isHidden;
		var paramsString = Internal.makeParamString(tagname,params);

		if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.navigation);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.navigation.appShowNavbar(paramsString);
		}	
	},

	/**
	 * @description 设置导航栏的属性
	 * @brief 顶部导航栏
	 * @param {Object} right 导航栏的右侧按钮
	 * @param {Object} center 导航栏的居中标题栏
	 * @param {Object} left 导航栏的左侧按钮
	 * @method app_refresh_navbar
	 */
	 app_refresh_navbar : function(right,center,left){
	 	var tagname = 'app_refresh_navbar';
	 	var params = {
	 		right : right,
	 		center : center,
	 		left : left
	 	};

	 	var paramsString = Internal.makeParamString(tagname,params);
	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.navigation);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.navigation.appRefreshNavbar(paramsString);
		}
	},
	/**
	 * @description 设置导航栏返回按钮，返回native
	 * @brief 顶部导航栏
	 * @method app_webview_finish
	 */
	app_webview_finish : function(){
		var params = {};
		var tagname = 'app_webview_finish';
		var paramsString = Internal.makeParamString(tagname,params);
		if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.navigation);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.navigation.appWebviewFinish();
		}
	}
}


/**
 * @class PinganPage
 * @description Pingan页面相关的api
 * @brief 页面相关
 */

 var PinganPage = {

 	/**
	 * @description 提示弹框
	 * @brief 提示弹框
	 * @method app_show_alert
	 * @param {String} title 警告
	 * @param {String} message 输入账号密码
	 * @param {Object} cancelButton 取消按钮
	 * @param {Object} positiveButton 确定按钮 
	 */
	 app_show_alert : function(title,message,cancelButton,positiveButton){
	 	var tagname = 'app_show_alert';
	 	var params = {
	 		title : title,
	 		message : message,
	 		cancelButton : cancelButton,
	 		positiveButton : positiveButton
	 	}
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.alert);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.hcalert.appShowAlert(paramsString)
		}
	 },

	 /**
	 * @description 显示加载动画
	 * @brief 显示加载动画
	 * @method app_show_loadingView
	 */
	 app_show_loadingView : function(){
	 	var tagname = 'app_show_loadingView';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.loading);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.loading.appShowLoadingView(paramsString);
		}
	 },

	 /**
	 * @description 隐藏加载动画
	 * @brief 隐藏加载动画
	 * @method app_hide_loadingView
	 */
	 app_hide_loadingView : function(){
	 	var tagname = 'app_hide_loadingView';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.loading);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.loading.appHideLoadingView(paramsString);
		}
	 },

	 /**
	 * @description webview回退
	 * @brief 回退
	 * @method webview_nav_back
	 */
	 webview_nav_back : function(){
	 	var tagname = 'webview_nav_back';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.webviewex);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.webviewex.webviewNavBack(paramsString);
		}
	}
}


/**
 * @class PinganShare
 * @description share相关类
 * @brief share
 */

 var PinganShare = {

 	 /**
	 * @description 分享
	 * @brief 分享
	 * @method app_share
	 * @param {String} title 分享的标题
	 * @param {Number} platform 分享的平台（0：微信会话；1：微信朋友圈）
	 * @param {String} content 分享的文字内容
	 * @param {String} image 分享的图片
	 * @param {String} weburl 分享的链接
	 * @param {Number} type 分享的类型（0 默认分享类型（native实现弹层，此时platform可为空数组）1指定分享平台（h5实现弹层））
	 * @method app_share
	 */
	 app_share : function(title,platform,content,image,weburl,type){
	 	var tagname = 'app_share';
	 	var params = {
	 		title : title,
	 		platform : platform,
	 		content : content,
	 		image : image,
	 		weburl : weburl,
	 		type : type
	 	}
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.share);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.share.appShare(paramsString);
		}
	}

}



/**
 * @class PinganUser
 * @description Pingan用户相关类
 * @brief 用户相关类
 */

 var PinganUser = {

 	/**
	 * @description 获取设备信息
	 * @brief 获取设备信息
	 * @method app_get_device_info
	 */

	 app_get_device_info : function(){
	 	var tagname = 'app_get_device_info';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.user);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.user.appGetDeviceInfo(paramsString);
		}
	 },

	/**
	 * @description 获取地理位置信息
	 * @brief 获取地理位置信息
	 * @method app_get_location
	 */

	 app_get_location : function(){
	 	var tagname = 'app_get_location';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.user);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.user.appGetLocation(paramsString);
		}
	 },

	 /**
	 * @description 保存登陆态
	 * @brief 保存登陆态
	 * @param {String} eid 用户id
	 * @param {String} token 用户令牌
	 * @param {String} userLoginName 用户登陆名
	 * @param {String} userRealName 真是姓名
	 * @param {String} phoneNo 手机号
	 * @param {String} certiNo 证件号码
	 * @param {String} certiType 证件类型
	 * @param {String} gender 性别
	 * @param {Boolean} isVerified 是否实名认证
	 * @method app_save_login_info
	 */
	 app_save_login_info : function(eid,token,userLoginName,userRealName,phoneNo,certiNo,certiType,gender,isVerified,birthDay,clientNo){
	 	var tagname = 'app_save_login_info';
	 	var params = {
	 		eid : eid,
	 		token : token,
	 		userLoginName : userLoginName,
	 		userRealName : userRealName,
	 		phoneNo : phoneNo,
	 		certiNo : certiNo,
	 		certiType : certiType,
	 		gender : gender,
	 		isVerified : isVerified,
			birthDay: birthDay,
			clientNo: clientNo
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.user);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.user.appSaveLoginInfo(paramsString);
		}
	 },

	 /**
	 * @description 跳转登陆页
	 * @brief 跳转登陆页
	 * @method app_get_login_view
	 */

	 app_get_login_view : function(){
	 	var url = "healthcloud://hybrid/user/loginview";
	 	if(Internal.isIOS){
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.location.href = "healthcloud://wireless/h5?type=0&action={view:2,toFinish:false,data:1234}";
		}
	 },


	 /**
	 * @description 读取用户信息
	 * @brief 读取用户信息
	 * @param {String} username 用户名
	 * @method app_get_login_info
	 */
	 app_get_login_info : function(username){
	 	var tagname = 'app_get_login_info';
	 	var params = {
	 		username : username
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.user);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.user.appGetLoginInfo(paramsString);
		} 
	}
}


/**
 * @class PinganUtil
 * @description 提供给H5使用的工具类
 * @brief 工具类
 */

 var PinganUtil = {

 	/**
	 * @description MD5加密
	 * @brief MD5加密
	 * @param {String} input 输入的内容
	 * @method app_md5_hash
	 */

	 app_md5_hash : function(input){
	 	var tagname = 'app_md5_hash';
	 	var params = {
	 		input : input
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appMd5Hash(paramsString);
		} 
	 },

	 /**
	 * @description Base64编码
	 * @brief Base64编码
	 * @param {String} input 输入的内容
	 * @method app_base64_encode
	 */
	 app_base64_encode : function(input){
	 	var tagname = 'app_base64_encode';
	 	var params = {
	 		input : input
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appBase64Encode(paramsString);
		} 
	 },

	 /**
	 * @description Base64解码
	 * @brief Base64解码
	 * @param {String} input 输入的内容
	 * @method app_base64_encode
	 */
	 app_base64_decode : function(input){
	 	var tagname = 'app_base64_decode';
	 	var params = {
	 		input : input
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appBase64Decode(paramsString);
		} 
	 },

	 /**
	 * @description 二维码扫描
	 * @brief 二维码扫描
	 * @method app_scan
	 */
	 app_scan : function(code){
	 	var tagname = 'app_scan';
	 	var paramsString = Internal.makeParamString(tagname);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appQrcodeScanner(paramsString);
		}
	 },

	 /**
	 * @description 日志接口
	 * @brief 日志接口
	 * @param {String} action 时间名
	 * @param {String} tag 时间tag
	 * @param {Number} pageid 页面id
	 * @method app_log
	 */
	 app_log : function(action,tag,pageid){
	 	var tagname = 'app_log';
	 	var params = {
	 		action : action,
	 		tag : tag,
	 		pageid : pageid
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appLog(paramsString);
		} 
	},
	/**
	 * @description 埋点
	 * @param {String} event
	 * @param {String} label
	 * @param {String} parameter JSON格式
	 */
	app_pad_track : function(event,label,parameter){
		var tagname = 'app_pad_track';
	 	var params = {
	 		event : event,
	 		label : label,
	 		parameter : parameter
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.util);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.util.appPadTrack(paramsString);
		}
	}
}



 /**
 * @class PinganSystem
 * @description 系统类
 * @brief 系统类
 */


var PinganSystem = {

	/**
	 * @description 打电话
	 * @brief 打电话
	 * @param {String} phoneNumber 输入的内容
	 * @method app_make_call
	 */
	 app_make_call : function(phoneNumber){
	 	var tagname = 'app_make_call';
	 	var params = {
	 		phoneNumber : phoneNumber
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.system);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.system.appMakeCall(paramsString);
		}
	 },

	 /**
	 * @description 判断app有没有安装
	 * @brief 判断app有没有安装
	 * @param {String} app 
	 * @method app_check_install_status
	 */
	 app_check_install_status : function(app){
	 	var tagname = 'app_check_install_status';
	 	var params = {
	 		app : app
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.system);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.system.appCheckInstallStatus(paramsString);
		}
	}
}



/**
 * @class PinganGallery
 * @description 图片类
 * @brief 图片类
 */

 var PinganGallery = {

 	/**
	 * @description 调用拍照，裁剪图片，返回图片
	 * @brief 调用拍照，裁剪图片，返回图片
	 * @param {Boolean} needcut 是否需要裁减
	 * @param {String} type 图片类型
	 * @method app_take_photo
	 */

	 app_take_photo : function(needcut,type){
         
	 	var tagname = 'app_take_photo';
	 	var params = {
	 		needcut : needcut,
	 		type : type
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);
         alert(paramsString);
	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.gallery);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.gallery.appTakePhoto(paramsString);
		}
	 },

	 /**
	 * @description 调用图片，返回多张图片
	 * @brief 调用图片，返回多张图片
	 * @param {Number} num 是否需要裁减(最大值是6，不建议动态设置最大值)
	 * @param {String} type 图片类型
	 * @method app_photo_album
	 */

	 app_photo_album : function(num,type){
         
	 	var tagname = 'app_photo_album';
	 	var params = {
	 		num : num,
	 		type : type
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.gallery);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.gallery.appPhotoAlbum(paramsString);
		}
	 },

	 /**
	 * @description 保存图片到相册
	 * @brief 保存图片
	 * @param {String} image 图片
	 * @method app_save_pic_album
	 */
	 app_save_pic_album : function(image){
	 	var tagname = 'app_save_pic_album';
	 	var params = {
	 		image : image
	 	};
	 	var paramsString = Internal.makeParamString(tagname,params);

	 	if(Internal.isIOS){
			var url = Internal.makeURLWithParam(paramsString,URL.gallery);
			Internal.loadURL(url);
		}else if(Internal.isAndroid){
			window.gallery.appSavePicAlbum(paramsString);
		}
	}
}


 window.hybrid = {

 	PinganNavBar : PinganNavBar,

 	PinganPage : PinganPage,

 	PinganShare : PinganShare,

 	PinganUser : PinganUser,

 	PinganUtil : PinganUtil,

 	PinganSystem : PinganSystem,

 	PinganGallery : PinganGallery,

 	Observer : Observer,

 	bridgeCallback : bridgeCallback
	}
}(window);