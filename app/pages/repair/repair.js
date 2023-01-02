const utils = require('../../utils/util');
const API = require('../../utils/api');
const { URL, envVersion } = require('../../utils/request');
const imgurl = `${URL[envVersion].BASE_URL}wx/file/readImg/`;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		username: '',
		password: '',
		area: '请选择报修区域',
		columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
		area_show: false,

		fileList: [],

		time_show: false,
		time: '请选择时间',
		minHour: 10,
		maxHour: 20,
		minDate: new Date().getTime(),
		maxDate: new Date(new Date().getFullYear(), 12, 31).getTime(),
		currentDate: new Date().getTime(),
		timeFilter(type, options) {
			if (type === 'minute') {
				return options.filter((option) => option % 5 === 0);
			}
			return options;
		}
	},
	onTimeConfirm() {
		let time = utils.formatDate(this.data.currentDate);
		this.setData({
			time: time,
			time_show: false
		});
	},
	onTimeClose() {
		this.setData({
			time_show: false
		});
	},
	showTimePopup() {
		this.setData({
			time_show: true
		});
	},
	onInput(event) {
		this.setData({
			currentDate: event.detail
		});
	},
	afterRead(event) {
		const { file } = event.detail;
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		// console.log(file)
		API.upLoad(file, {})
			.then((res) => {
				if (res.code == 0) {
					this.data.fileList.push({ url: imgurl + res.name });
					this.setData({
						fileList: this.data.fileList
					});
				} else {
					wx.showToast({
						title: '上传失败，请重试',
						icon: 'warning',
						duration: 2000
					});
				}
			})
			.catch((e) => {
				wx.showToast({
					title: '上传失败，请重试',
					icon: 'warning',
					duration: 2000
				});
			});
	},
	delImg(e) {
		let index = e.detail.index;
		this.data.fileList.splice(index, 1);
		this.setData({
			fileList: this.data.fileList
		});
	},
	onConfirm(e) {
		console.log(e);
		let detail = e.detail;
		this.setData({
			area: this.data.columns[detail.index],
			area_show: false
		});
	},
	onClose() {
		this.setData({
			area_show: false
		});
	},
	showPopup() {
		this.setData({
			area_show: true
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
