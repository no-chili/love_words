// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async () => {
    const words=await db.collection("words").aggregate()
    .match({
        disable:false,
        passed:false
    })
    .end()
    return {
        words
    }
}