// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (e,context) => {
    const wxContext = cloud.getWXContext()
    const words=await db.collection("words").add({
        data:{
            content:e.content,
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            passed:false,
            disable:false
        }
    })
    return {
        words:true
    }
}