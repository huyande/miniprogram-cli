const app = getApp();
const API = require('../../utils/api');
const { getUrl } = require('../../utils/request');
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: null,
		hasUserInfo: false
	},
	onChooseAvatar: function (e) {
		const { avatarUrl } = e.detail;
		let url = getUrl();
		wx.uploadFile({
			url: url + 'wx/file/upload', //仅为示例，非真实的接口地址
			filePath: avatarUrl,
			name: 'file',
			success(res) {
				API.saveUser({ openid: app.globalData.openid, avatarUrl: res.name }).then((res) => {
					console.log(res);
					res.userInfo.avatarUrl = url + 'wx/file/readImg/' + res.userInfo.avatarUrl;
					wx.setStorageSync('userInfo', res.userInfo);
				});
			}
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let userInfo = wx.getStorageSync('userInfo');
		if (userInfo) {
			this.setData({
				userInfo: userInfo,
				hasUserInfo: true
			});
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
