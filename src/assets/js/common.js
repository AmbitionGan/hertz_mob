const pubMethod = {
    /**
     * 格式化日期字符串
     * @param {string} dateStr 日期字符串 '2019-04-17'
     * 返回数组 ['2019', '04', '17']
     */
    formatDateString (dateStr) {
        return dateStr.split('-')
    },

    /**
     * 数字转中文月份
     * @param {Number, String} month 月份 
     */
    monthNumberChangeCn (month) {
        var monthCnArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        return monthCnArr[month - 1]
    },

    /**
     * 日期转毫秒
     * @param {string} str 格式为 'YYYY-MM-DD HH:MM:SS'
     */
    getTime (str) {
        return new Date (str).getTime()
    }
}

export default pubMethod