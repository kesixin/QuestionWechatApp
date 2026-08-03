// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  bindsubmit: function (e) {
    var params = {
      'contact':e.detail.value.contact,
      'content':e.detail.value.content
    }
    if(params.contact == "" || params.content == ""){
      wx.showToast({
        title: "请填写完整",
        icon:'loading',
        duration: 2e3
      })
      return
    }
    wx.u.saveFeedback(params).then(res=>{
      if(res.result == 'success'){
        wx.showModal({
          title: "反馈成功",
          content: "已经收到您的反馈，谢谢您的关注！",
          showCancel: !1,
          confirmText: "我知道啦",
          confirmColor: "#1bd0ad",
          success: function (e) {
            wx.navigateBack();
          }
        });
      }else{
        console.log('提交失败')
      }
    })
  }
})