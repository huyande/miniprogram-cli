Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		active: 0,
		repairs: [
			{
				type: '故障类型',
				status: '待派单',
				number: 'xxxsssds',
				area: '1号楼999',
				create_at: '2022-01-22 22:23:00'
			}
		]
	},
	onChange(event) {
		wx.showToast({
			title: `切换到标签 ${event.detail.name}`,
			icon: 'none'
		});
	},
	goRepairInfo(e) {
		let rid = e.currentTarget.dataset.rid;
		console.log(rid);
		wx.navigateTo({
			url: '/pages/mine-repair/repair-info/repair-info?rid=' + rid
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

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
