// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    wx.u.historyList().then(res=>{
      if(res.result.length > 0){
        let data = []
        for(let object of res.result){
          data.push({
            'objectId':object.objectId,
            'menuId':object.menuId,
            'score':object.score,
            'useTime':object.useTime.split(":")[0]+'分'+object.useTime.split(":")[1]+'秒',
            'time':object.createdAt.split(" ")[0]
          })
        }
        this.setData({
          historyList: data,
          nodata:false
        })
      }else{
        this.setData({
          nodata: true
        })
      }
      wx.hideLoading()
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
  goBack: function(){
    wx.navigateBack({})
  }
})