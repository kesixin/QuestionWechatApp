// pages/wrong/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
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
    var menuStorageList = wx.getStorageSync('menuStorageList')
    console.log(menuStorageList.length)
    this.setData({
      'menuStorageList':menuStorageList
    })
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
  goLearn (){
    wx.navigateTo({
      url: '../category/index?action=learn',
    })
  },
  goError (e){
    console.log(e)
    var cateid = e.currentTarget.dataset.cateid
    var menu = e.currentTarget.dataset.menu
    wx.navigateTo({
      url: '../errorStar/index?cateid='+cateid+'&menu='+menu,
    })
  }
})