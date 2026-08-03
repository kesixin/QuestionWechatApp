//index.js

Page({
  data: {
    userInfo: {},
    useLearn:true,
    is_login:true,
    checkUser: false,
    canIUseGetUserProfile: false,
  },

  onLoad: function() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.u.getSetting('useLearn').then(res => {
      let useLearn = true
      if (res.result.value == "false")
        useLearn = false
      this.setData({
        useLearn: useLearn
      })
    })

    wx.u.getSetting('checkUser').then(res => {
      let checkUser = false
      if (res.result.value == "true")
        checkUser = true
      this.setData({
        checkUser: checkUser
      })
    })
  },
  onShow: function(){
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  gocenter() {
    wx.navigateTo({
      url: '../my/index',
    })
  },
  goLearn() {
    if(this.data.useLearn){
      wx.navigateTo({
        url: '/pages/category/index?action=learn',
      })
    }else{
      wx.showToast({
        title: '练习模式未开启',
        icon:'loading'
      })
    }
  },
  login() {
    this.setData({
      is_login:!this.data.is_login
    })
  },
  bindgetuserinfo: function () {
    this.login()
    var that = this
    wx.getUserInfo({
      success(res) {
        console.log(res)
        wx.showLoading({
          title: '授权登录中',
        })
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => { });
          }
          res1.result.avatarUrl = res.userInfo.avatarUrl;
          res1.result.nickName = res.userInfo.nickName;
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
          wx.hideLoading()
        })
      }
    })
  },
  getUserProfile(e) {
    console.log(this.data.canIUseGetUserProfile)
    this.login()
    var that = this
    wx.getUserProfile({
      desc: '完善用户信息',
      success: (res) => {
        console.log(res)
        wx.showLoading({
          title: '授权登录中',
        })
        wx.u.getUserInfo().then(res1 => {
          var bmobUser = res1.result;
          if (bmobUser.avatarUrl == '' || bmobUser.avatarUrl == undefined) {
            wx.u.changeUserInfo(res.userInfo.avatarUrl, res.userInfo.nickName).then(res2 => { });
          }
          res1.result.avatarUrl = res.userInfo.avatarUrl;
          res1.result.nickName = res.userInfo.nickName;
          wx.setStorageSync('userInfo', res1.result)
          that.setData({
            userInfo: res1.result,
          })
          wx.hideLoading()
        })
      }
    })
  },
  goExam(){
    if (this.data.userInfo.avatarUrl == undefined || this.data.userInfo.avatarUrl == '') {
      this.login();
      return
    }
    
    if (this.data.checkUser) {
      let userInfo = this.data.userInfo
      if (userInfo.status == '1') {
        wx.navigateTo({
          url: "/pages/category/index?action=exam",
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
    }else{
      wx.navigateTo({
        url: "/pages/category/index?action=exam",
      })
    }
  }
})