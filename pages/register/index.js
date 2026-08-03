// pages/register/index.js
Page({

  data: {

  },


  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  register:function(e){
    let params = e.detail.value
    if (params.company == '' || params.department == '' || params.realname == '') {
      wx.showToast({
        title: '请填写完整',
        icon: 'loading'
      })
      return false
    }
    wx.u.register(params).then(res=>{
      if (res.result == 'success') {
        wx.showToast({
          title: '提交成功',
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: '../status/index',
              })
            }, 1000)
          }
        });
      }
    })
    wx.u.saveFormId(e.detail.formId).then(res=>{})
  }
})