// pages/rankList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList:{},
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    var menu = options.menu
    wx.u.getRank(menu).then(res => {
      this.setData({
        rankList:res.data,
        loading:false
      })
    })
  },

})