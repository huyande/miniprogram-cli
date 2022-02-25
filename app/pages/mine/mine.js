const app =getApp();
const API = require('../../utils/api')
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:null,
		hasUserInfo:false
	},

	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
		  lang:'zh_CN',
		  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		  success: (res) => {
			this.setData({
			  userInfo: res.userInfo,
			  hasUserInfo: true
			})
			API.saveUser({openid:app.globalData.openid,avatarUrl:res.userInfo.avatarUrl,nickName:res.userInfo.nickName}).then(res=>{
				console.log(res)
				wx.setStorageSync('userInfo', res.userInfo)
			})
		  }
		})
	  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let userInfo = wx.getStorageSync('userInfo')
		if(userInfo){
			this.setData({
				userInfo:userInfo,
				hasUserInfo:true
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
});
