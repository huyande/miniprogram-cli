//app.js
const API = require("./utils/api")
App({
	onLaunch: function () {
		// 展示本地存储能力
		// var logs = wx.getStorageSync('logs') || [];
		// logs.unshift(Date.now());
		// wx.setStorageSync('logs', logs);

		// 登录
		wx.login({
			success: (res) => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log(res)
				API.login({code:res.code}).then(res=>{
					if(!res.is_has){
						wx.switchTab({
							url: `/pages/mine/mine`
						})
						this.globalData.openid=res.session.openid
						this.globalData.sessionKey=res.session.sessionKey
					}else{
						wx.setStorageSync('userInfo', res.userInfo)
					}
				})
			}
		});
	},
	globalData: {
		openid:'',
		sessionKey:''
	}
});
