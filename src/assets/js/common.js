const pubMethod = {
	/**
	 * 格式化日期字符串
	 * @param {string} dateStr 日期字符串 '2019-04-17'
	 * 返回数组 ['2019', '04', '17']
	 */
	formatDateString (dateStr) {
		return dateStr.split("-");
	},

	/**
	 * 数字转中文月份
	 * @param {Number, String} month 月份
	 */
	monthNumberChangeCn (month) {
		var monthCnArr = [
			"一月",
			"二月",
			"三月",
			"四月",
			"五月",
			"六月",
			"七月",
			"八月",
			"九月",
			"十月",
			"十一月",
			"十二月"
		];
		return monthCnArr[month - 1];
	},

	/**
	 * getDay 转 星期
	 * @param {Number} getDay 星期
	 */
	weekGetDayChangeCn (getDay) {
		var weekCn = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
		return weekCn[getDay];
	},

	/**
	 * 日期转毫秒
	 * @param {string} str 格式为 'YYYY-MM-DD HH:MM:SS'
	 */
	getTime (str) {
		return new Date(str).getTime();
	},
	/**
	 * 根据品牌获取logo
	 * @param {string} {Number, String} param 品牌编号
	 */
	getBrandLogo (param) {
		var path = "../../static/images";
		switch (param) {
			case "8E34D5FAB20D3DB8":
				var obj = {
					name: "Hertz",
					images: path + "/hertz_logo.png",
					order: 1
				};
				return obj;
				break;
			case "08104CD46F0D6C9F":
				var obj = {
					name: "Dollar",
					images: path + "/dollar_logo.png",
					order: 2
				};
				return obj;
				break;
			case "52A14D06AA00F386":
				var obj = {
					name: "Thrifty",
					images: path + "/thrifty_logo.png",
					order: 3
				};
				return obj;
				break;
			case "9420B8ACF2353D3B":
				var obj = {
					name: "Firefly",
					images: path + "/firefly_logo.png",
					order: 4
				};
				return obj;
				break;
			case "836A79714A8ABC6A":
				var obj = {
					name: "Ace",
					images: path + "/ace_logo.png",
					order: 5
				};
				return obj;
				break;
		}
	},
	/**
	 * 根据品牌名获取value
	 * @param {string} {Number, String} param 品牌编号
	 */
	getBrandName (param) {
		var path = "../../static/images";
		switch (param) {
			case "Hertz":
				var obj = {
					value: "1",
					images: path + "/hertz_logo.png",
					order: 1
				};
				return obj;
				break;
			case "Dollar":
				var obj = {
					value: "2",
					images: path + "/dollar_logo.png",
					order: 2
				};
				return obj;
				break;
			case "Thrifty":
				var obj = {
					value: "3",
					images: path + "/thrifty_logo.png",
					order: 3
				};
				return obj;
				break;
			case "4":
				var Firefly = {
					value: "4",
					images: path + "/firefly_logo.png",
					order: 4
				};
				return obj;
				break;
			case "Ace":
				var obj = {
					value: "5",
					images: path + "/ace_logo.png",
					order: 5
				};
				return obj;
				break;
		}
	},
	/**
	 * 根据VehType Id 获取车型 *
	 */
	getVehType (id) {
		switch (id) {
			case 1:
				return "轿车";
				break;
			case 2:
				return "商务车";
				break;
			case 3:
				return "SUV";
				break;
			case 4:
				return "敞篷车";
				break;
			case 7:
				return "礼宾车";
				break;
			case 8:
				return "旅行车";
				break;
			case 9:
				return "皮卡";
				break;
			case 10:
				return "营宿车";
				break;
			case 11:
				return "越野车";
				break;
			case 12:
				return "休闲车";
				break;
			case 13:
				return "运动版车型";
				break;
			case 14:
				return "特殊车型";
				break;
			case 15:
				return "一排半/双排皮卡";
				break;
			case 16:
				return "单排皮卡";
				break;
			case 17:
				return "特供车型";
				break;
			case 18:
				return "轿跑";
				break;
			case 19:
				return "单座车";
				break;
			case 20:
				return "摩托车";
				break;
			case 21:
				return "跑车";
				break;
			case 22:
				return "跨界车";
				break;
			case 23:
				return "厢式货车";
				break;
		}
	},
	/**
	 * 根据VehClass Id 获取规格 *
	 */
	getVehClass (id) {
		switch (id) {
			case 1:
				return "迷你型";
				break;
			case 2:
				return "小型";
				break;
			case 3:
				return "经济型";
				break;
			case 4:
				return "紧凑型";
				break;
			case 5:
				return "中型";
				break;
			case 6:
				return "中大型";
				break;
			case 7:
				return "标准型";
				break;
			case 8:
				return "全尺寸";
				break;
			case 9:
				return "豪华";
				break;
			case 10:
				return "高级";
				break;
			case 23:
				return "特殊";
				break;
			case 32:
				return "特别";
				break;
			case 33:
				return "精选迷你";
				break;
			case 34:
				return "精选经济型";
				break;
			case 35:
				return "精选紧凑型";
				break;
			case 36:
				return "精选中大型";
				break;
			case 37:
				return "精选标准型";
				break;
			case 38:
				return "精选全尺寸";
				break;
			case 39:
				return "精选高级";
				break;
			case 40:
				return "精选豪华";
				break;
			case 41:
				return "超大型";
				break;
		}
	},
	/**
	 * 根据id获取车型
	 * @param {string} {Number, String} param 车型编号
	 */
	getVehiclecategory (param) {
		var path = "../../static/images";
		switch (param) {
			case "1":
				var obj = {
					name: "小型轿车",
					value: "1",
					order: 1
				};
				return obj;
				break;
			case "2":
				var obj = {
					name: "中大型轿车",
					value: "2",
					order: 2
				};
				return obj;
				break;
			case "3":
				var obj = {
					name: "SUV",
					value: "3",
					order: 3
				};
				return obj;
				break;
			case "4":
				var obj = {
					name: "MPV",
					value: "4",
					order: 4
				};
				return obj;
				break;
			case "5":
				var obj = {
					name: "其他",
					value: "5",
					order: 5
				};
				return obj;
				break;
		}
	},

	/**
	 * 阻止滑动
	 * @param {Array} eleArr 需要阻止滑动的dom节点
	 */
	stopMovePreventDefault (eleArr) {
		eleArr.forEach(ele => {
			ele.ontouchmove = e => {
				e.preventDefault();
			};
		});
	},
	/**
	 * 根据加密品牌返回字母
	 */
	brandsChangeAlphabet (brand) {
		let retAlphabet = {};
		switch (brand) {
			case "8E34D5FAB20D3DB8":
				retAlphabet.content = "H";
				retAlphabet.src = require("@/assets/images/hertz.png");
				break;
			case "08104CD46F0D6C9F":
				retAlphabet.content = "D";
				retAlphabet.src = require("@/assets/images/dollar.png");
				break;
			case "52A14D06AA00F386":
				retAlphabet.content = "T";
				retAlphabet.src = require("@/assets/images/thrifty.png");
				break;
			case "9420B8ACF2353D3B":
				retAlphabet.content = "F";
				retAlphabet.src = require("@/assets/images/firefly.png");
				break;
			case "836A79714A8ABC6A":
				retAlphabet.content = "A";
				retAlphabet.src = require("@/assets/images/ace.png");
				break;
			default:
				break;
		}
		return retAlphabet;
	},

	/**
	 * 过滤特殊字符 空格
	 * @param {String} str 输入框输入的值
	 */
	filterCode (str) {
		var reg = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\\s]"
		);
		var res = str.replace(reg, "");
		return res;
	}
};

export default pubMethod;
