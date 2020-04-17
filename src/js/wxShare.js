import projectApi from '@/assets/index';
const config = {
	debug: false,
	appId: 'wx7eeb4eea87cf3ce6', // 公众号唯一标识
	timestamp: '', // 生成签名的时间戳
	nonceStr: '', // 生成签名的随机串
	signature: '', // 签名
	jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 需要使用的JS接口列表
};
export function WXShare (options, type) {
	const param = new URLSearchParams();
	param.append('url', window.location.href.split('#')[0]); // 不能包含#之后的参数
	projectApi.wxshare(param).then((res) => { // 调用后端接口获取微信的config必填值
		config.timestamp = res.timestamp;
		config.nonceStr = res.noncestr;
		config.signature = res.signature;
		wx.config(config); // 注入权限验证
		wx.ready(function () {  // 注入权限验证成功
			wx.checkJsApi({   // 检查是否支持使用的js接口
				jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
				success: function (res) { // 支持使用的js接口
					if (res['checkResult']['updateAppMessageShareData'] && res['checkResult']['updateTimelineShareData']) {
						shareStart(options, type);
					} else {
						console.log('不支持使用的js接口');
						options.fail && options.fail(); // 不支持使用的js接口
					}
				},
				fail: function () { // 检查接口出错
					console.log('检查接口出错')
					options.fail && options.fail();
				}
			});
		});
		wx.error(function () { // 注入权限验证失败
			console.log('config调用失败');
			options.fail && options.fail();
		});
	}).catch((err) => {
		console.log('获取config配置失败');
		options.fail && options.fail();
	});
}
function shareStart (options, type) {
	switch (type) {
		case 1:    // 分享给微信朋友
			wx.updateAppMessageShareData({ 
		        title: options.title, // 分享标题
		        desc: options.desc, // 分享描述
		        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		        imgUrl: options.imgUrl, // 分享图标
		        success: function () {
		          	options.success && options.success();
		        },
		        cancel: function () {
		        	options.cancel && options.cancel(); // 取消分享
		        },
		        fail: function () {
		        	console.log('分享失败');
		        	options.fail && options.fail();
		        }
		    });
			break;
		case 2:    // 分享给微信朋友圈
			wx.updateTimelineShareData({ 
		        title: options.title, // 分享标题
		        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		        imgUrl: options.imgUrl, // 分享图标
		        success: function () {
		          	options.success && options.success();
		        },
		        cancel: function () {
		        	options.cancel && options.cancel(); // 取消分享
		        },
		        fail: function () {
		        	console.log('分享失败');
		        	options.fail && options.fail();
		        }
		    });
			break;
		case 3:
			wx.updateAppMessageShareData({ 
		        title: options.title, // 分享标题
		        desc: options.desc, // 分享描述
		        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		        imgUrl: options.imgUrl, // 分享图标
		        success: function () {
		          	options.success && options.success();
		        },
		        cancel: function () {
		        	options.cancel && options.cancel(); // 取消分享
		        },
		        fail: function () {
		        	console.log('分享失败');
		        	options.fail && options.fail();
		        }
		    });
		    wx.updateTimelineShareData({ 
		        title: options.title, // 分享标题
		        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		        imgUrl: options.imgUrl, // 分享图标
		        success: function () {
		          	options.success && options.success();
		        },
		        cancel: function () {
		        	options.cancel && options.cancel(); // 取消分享
		        },
		        fail: function () {
		        	console.log('分享失败');
		        	options.fail && options.fail();
		        }
		    });
		    break;
		default: 
			console.log('type不在指定范围内');
			options.fail && options.fail();
	}
}