// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    top:-100,
    left:-100,
    cardTop:'',
    cardLeft:'',
    zoom:'',
    T:'',
    opacity:'',
    words:'',
    cur_worlds:'试试点击屏幕'
  },
  onLoad() {
    let query=wx.createSelectorQuery()
    let lw= query.select('.love_words')
    lw.fields({
      rect:true,
      dataset:true
    },(res)=>{
      this.setData({
        cardLeft:res.left,
        cardTop:res.top
      })
    })
    lw.boundingClientRect(res=>{
      res.top
      res.left
    })
    query.exec()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.initFetch()
  },
  initFetch(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'fetch',
      success: (res)=>{
        this.setData({
          words:res.result.words.list[0].content
        })
      },
      fail: console.error
    })
  },
  fetch(){
    this.setData({
      cur_worlds:''
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'fetch',
      success: (res)=>{
        this.setData({
          cur_worlds:this.data.words
        })
        if(res.result.words.list[0]){
          this.setData({
            words:res.result.words.list[0].content
          })
        }
      },
      fail: console.error
    })
  },
  onTap(e){
    let t
    let {x,y}=e.detail;
    t=this.data.T
    if(t){
      return
    }
    t=setTimeout(()=>{
      this.setData({
        zoom:'',
        T:'',
        opacity:'',
      })
    },3000)
    this.setData({
      top:y-this.data.cardTop,
      left:x-this.data.cardLeft,
      
      zoom:'zoom',
      opacity:'opacity',
      T:t
    })
    this.fetch()
  },
  copy(){
    wx.setClipboardData({
      data:this.data.cur_worlds
    })
  },
  wanner(){
    wx.navigateTo({
      url: '/pages/wanner/wanner',
    })
  }
})

