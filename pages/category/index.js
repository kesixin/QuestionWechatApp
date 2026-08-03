// pages/category/index.js
Page({

  data: {
    cateList:{},
    action:''
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    this.setData({
        action: options.action
    })
    wx.u.getQuestionMenu().then(res => {
      this.setData({
        cateList: res.result
      })
      wx.hideLoading()
    })
  },

  onReady: function () {

  },

  onShow: function () {
    
  },

  goquestion (e){
    var cateid = e.currentTarget.dataset.cateid
    var menu = e.currentTarget.dataset.menu
    if(this.data.action == 'learn')
      wx.navigateTo({
        url: '../learn/index?cateid='+ cateid +'&menu='+menu,
      })
    else if(this.data.action == 'rank')
      wx.navigateTo({
        url: '../rank/index?cateid=' + cateid + '&menu=' + menu,
      })
    else
      wx.navigateTo({
        url: '../exam/index?cateid=' + cateid +'&menu=' + menu,
      })
  }
})