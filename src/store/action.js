/**
 * 异步方法储存 方法前添加注释 标明用途
 * @example // 获取地标列表
 * @example getLandMarkList ({commit, state}) {
 * @example     if (state.landMarkList.length < 1) {
 * @example         api.getLandMark()
 * @example         .then(res => {
 * @example             commit('setLandMarkList', res.data.data);
 * @example         })
 * @example         .catch(err => {
 * @example             console.log(err)
 * @example         })
 * @example     }
 * @example }
 */

import indexApi from '../api/index'

// 公共方法
const common = {
    
}

// 首页方法
const index = {
    async getAreaCode () {
        let data = indexApi.getLandMark(null)
        indexApi.getAreaCode(null)
    },
    // 如果第一次进入
    async getCalendar ({commit, state}, params) {
        if (state.takeCarYear === '' && state.takeCarMonth === '' && state.takeCarDay == '') {
            let data = await indexApi.getCalendar(params)
            commit('setCalendar', data.Result)
        }
    }
}

const action = {
    ...common,
    ...index
}

export default action