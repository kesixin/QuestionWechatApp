// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    var that = this
    wx.getUserInfo({
      success(res) {
        that.setData({
          userInfo:res.userInfo
        })
      }
    })
  },
  onShareAppMessage(){
    return {
      title: '答题酷',
      path: '/pages/index/index',
      imageUrl:'/images/logo.png'
    }
  },
  about() {
    wx.showModal({
      title: '关于',
      content: '本程序后端使用Bmob实现，仅供学习使用，请勿使用于商业用途，如有问题，请联系QQ：903363777',
      showCancel: false
    })
  }
})