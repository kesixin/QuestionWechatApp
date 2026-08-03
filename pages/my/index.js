// pages/my/index.js
var e =[{
  icon:"/images/icon_equipment_msg.png",
  title:"答题记录"
}, {
    icon: "/images/icon_center_phone.png",
    title: "分享好友"
  }, {
    icon: "/images/icon_center_msg.png",
    title: "意见反馈",
    page:"../feedback/index"
  },
  {
    icon: "/images/icon_center_tj.png",
    title: "关于我们"
  }]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellList: e,
    is_login:true,
    canIUseGetUserProfile: false
  },

  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this
    that.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },

  onShareAppMessage: function (t) {
    return t.from, {
      title: "智汇答题，考试助手！",
      imageUrl: "https://upload-images.jianshu.io/upload_images/6673460-7384ac443f4fba30.png",
      path: "pages/start/index"
    };
  },
  go_view: function(e){
    switch (1 * e.currentTarget.dataset.viewind) {
      case 0:
       if (this.data.userInfo.avatarUrl == undefined || this.data.userInfo.avatarUrl == ''){
         this.login()
         return
       }
       wx.navigateTo({
         url: '../record/index',
       })
       break;
      case 1:
       break;
      case 2:
        if (this.data.userInfo.avatarUrl == undefined || this.data.userInfo.avatarUrl == '') {
          this.login()
          return
        }
       wx.navigateTo({
         url: '../feedback/index',
       })
      break;
      case 3:
       this.about()
      break;
    }
  },
  about() {
    wx.showModal({
      title: '关于我们',
      content: '本程序仅供考试学习使用，请勿使用于商业用途，如有问题，请联系QQ：903363777、微信：kossfirst。',
      showCancel: false
    })
  },
  login() {
    this.setData({
      is_login: !this.data.is_login
    })
  },
  bindgetuserinfo: function () {
    this.login()
    var that = this
    wx.getUserInfo({
      success(res) {
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
  getUserProfile(e){
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
  }
})