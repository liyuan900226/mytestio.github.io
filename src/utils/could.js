const cloud = require('wx-server-sdk')
// 给定字符串环境 ID：接下来的 API 调用都将请求到环境 some-env-id
cloud.init({
    env: 'some-env-id'
    // env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    try {
        const result = await cloud.openapi.wxacode.getUnlimited({
            scene: `param1=${event.p1}&param2=${event.p2}`, //长度32位限制
            page: 'pages/index/index',
        })
        return result
    } catch (err) {
        return err
    }

}
