// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'love-words-5gx5mvj3d6838126',
        traceUser: true,
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
