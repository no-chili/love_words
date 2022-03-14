// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    top:-100,
    left:-100,
    animate:false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onTap(e){
    let {x,y}=e.detail;
    this.setData({
      top:y-e.target.offsetTop,
      left:x-e.target.offsetLeft,
      animate:true
    })
    setTimeout(()=>{
      this.setData({
        animate:false
      })
    },3000)
  }
})

