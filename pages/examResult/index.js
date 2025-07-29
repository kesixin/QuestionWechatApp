// pages/examResult/index.js
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
    var ytimesf = options.useTime.split(":")[0]
    var ytimesm = options.useTime.split(":")[1]
    this.setData({
      rightNum:options.rightNum,
      errNum:options.errNum,
      unAnswerNum: options.unAnswerNum,
      ytimesf:ytimesf,
      ytimesm:ytimesm,
      cateid:options.cateid,
      menu:options.menu
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickRank:function(){
    wx.navigateTo({
      url: '/pages/rank/index?cateid='+this.data.cateid,
    })
  },
  exam_repeat:function(){
    wx.navigateTo({
      url: '/pages/category/index?action=exam',
    })
  },
  examBack:function(){
    wx.navigateTo({
      url: '../errorStar/index?cateid=' + this.data.cateid + '&menu=' + this.data.menu,
    })
  }
})