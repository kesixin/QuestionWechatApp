// pages/first/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    angle: 0,
    status: false, //是否通过审核
    remind: '加载中',
    checkUser: false
  },

  onLoad: function(options) {

  },

  onShow: function() {
    var that = this
    wx.getUserInfo({
      success(res) {
        console.log(res)
        wx.u.getUserInfo().then(res1 => {
          console.log(res1)
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => {});
          }
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
            finish: true,
          })
        })
      }
    })
    // wx.u.getSetting('checkUser').then(res => {
    //   let checkUser = false
    //   if (res.result.value == "true")
    //     checkUser = true
    //   this.setData({
    //     checkUser: checkUser
    //   })
    // })
  },

  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
  },

  bindgetuserinfo: function() {
    var that = this
    wx.getUserInfo({
      success(res) {
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => {});
          }
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
        })

      }
    })
  },

  goSign: function() {
    wx.showLoading({
      title: '正在加载',
    })
    console.log(this.data.checkUser)
    if (this.data.checkUser) {
      let userInfo = this.data.userInfo
      if (userInfo.status == '1') {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      } else if (userInfo.status == '0') {
        wx.navigateTo({
          url: '../status/index',
        })
      } else {
        wx.navigateTo({
          url: '../register/index',
        })
      }
      wx.hideLoading()
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
      })
      wx.hideLoading()
    }
  }
})