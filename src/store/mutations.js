/**
 * 同步方法储存 方法前添加注释 标明用途
 * @example // 给 state landMarkList 赋值
 * @example setLandMarkList () {
 * @example     state.landMarkList = data
 * @example }
 */

// 公共方法
const common = {
    
}

// 首页方法
const index = {
<<<<<<< HEAD
    
=======
    // 给state.calendar赋值
    setCalendar (state, data) {
        state.isCalendarLoaded = true;
        state.calendar = data
        this.getters.getTakeCarDate
        this.getters.setDefaultRetCarDate
    }
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
}

const mutations = {
    ...common,
    ...index
}

export default mutations