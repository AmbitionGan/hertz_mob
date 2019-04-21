/**
 * 参数储存 参数前添加注释 标明用途
 * @example // 地表列表数据
 * @example landMarkList = []
 */

// 公共参数
const common = {
    // 是否登陆
    isLogined: false,
    // 是否是代理商登陆
    isagent: false
}

// 首页参数
const index = {

}

const state = {
    common,
    index
}

export default state