//index.js
//获取应用实例
const app = getApp();

Page({
	data: {},
	goRepair: function () {
		wx.navigateTo({
			url: '/pages/repair/repair'
		});
	},
	goMyRepair: function () {
		wx.navigateTo({
			url: '/pages/mine-repair/mine-repair'
		});
	},
	onLoad: function () {},
	getUserInfo: function (e) {}
});
