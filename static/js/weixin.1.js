$(function() {
	// 注入权限验证配置
	wx.config({
	    debug: true, 
	    appId: '', // 必填，公众号的唯一标识
	    timestamp: '', // 必填，生成签名的时间戳
	    nonceStr: '', // 必填，生成签名的随机串
	    signature: '',// 必填，签名，见附录1
	    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	
	// 验证成功后会被调用
	wx.ready(function(){
		
	});
	
	// 验证失败会被调用
	wx.error(function(res){
		
	});
	
	// 判断当前客户端是否支持JS接口
	wx.checkJsApi({
		jsApiList: ['chooseImage'], // 需要检测的JS接口列表
		success: function(res) {
			
		}
	});
	
	// 分享接口
	wx.onMenuShareTimeline({
		title: '', // 分享标题
	    link: '', // 分享链接
	    imgUrl: '', // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
	// 分享给朋友
	wx.onMenuShareAppMessage({
	    title: '', // 分享标题
	    desc: '', // 分享描述
	    link: '', // 分享链接
	    imgUrl: '', // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	
	// 拍照或从手机相册中选图接口
	wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	    }
	});
	
	// 预览图片接口
	wx.previewImage({
	    current: '', // 当前显示图片的http链接
	    urls: [] // 需要预览的图片http链接列表
	});
	
	// 上传图片接口
	wx.uploadImage({
	    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
	    isShowProgressTips: 1, // 默认为1，显示进度提示
	    success: function (res) {
	        var serverId = res.serverId; // 返回图片的服务器端ID
	    }
	});
	
	// 下载图片接口
	wx.downloadImage({
	    serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
	    isShowProgressTips: 1, // 默认为1，显示进度提示
	    success: function (res) {
	        var localId = res.localId; // 返回图片下载后的本地ID
	    }
	});
	
	// 获取网络状态接口
	wx.getNetworkType({
	    success: function (res) {
	        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
	    }
	});
	
	// 使用微信内置地图查看位置接口
	wx.openLocation({
	    latitude: 0, // 纬度，浮点数，范围为90 ~ -90
	    longitude: 0, // 经度，浮点数，范围为180 ~ -180。
	    name: '', // 位置名
	    address: '', // 地址详情说明
	    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
	    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
	});
	
	// 获取地理位置接口
	wx.getLocation({
	    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	    success: function (res) {
	        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	        var speed = res.speed; // 速度，以米/每秒计
	        var accuracy = res.accuracy; // 位置精度
	    }
	});
	
	// 关闭当前网页窗口接口
	wx.closeWindow();
	
	// 批量隐藏功能按钮接口
	wx.hideMenuItems({
	    menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	});
	
	// 批量显示功能按钮接口
	wx.showMenuItems({
	    menuList: [] // 要显示的菜单项，所有menu项见附录3
	});
	
	// 隐藏所有非基础按钮接口
	wx.hideAllNonBaseMenuItem();
	
	// 显示所有功能按钮接口
	wx.showAllNonBaseMenuItem();
	
	// 调起微信扫一扫接口
	wx.scanQRCode({
	    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    success: function (res) {
	    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	}
	});
});