const add = (num1, num2) => {
	return num1 + num2;
};

//时间戳转换方法    date:时间戳数字
const formatDate = function formatDate(date) {
	let date_ = new Date(date);
	let YY = date_.getFullYear() + '-';
	let MM =
		(date_.getMonth() + 1 < 10 ? '0' + (date_.getMonth() + 1) : date_.getMonth() + 1) + '-';
	let DD = date_.getDate() < 10 ? '0' + date_.getDate() : date_.getDate();
	let hh = (date_.getHours() < 10 ? '0' + date_.getHours() : date_.getHours()) + ':';
	let mm = date_.getMinutes() < 10 ? '0' + date_.getMinutes() : date_.getMinutes();
	let ss = ':' + (date_.getSeconds() < 10 ? '0' + date_.getSeconds() : date_.getSeconds());
	return YY + MM + DD + ' ' + hh + mm;
};
module.exports = {
	add: add,
	formatDate: formatDate
};
