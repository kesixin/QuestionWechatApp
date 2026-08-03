// pages/rank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateid: '',
    moreData: true,//更多数据
    pageSize: 15,//数量
    pagination: 0,//页码
    rankList: [],
    bottomWord: '',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'cateid': options.cateid
    })
    var params = {
      'pageSize':this.data.pageSize,
      'pagination':this.data.pagination,
      'cateid':options.cateid
    }
    this.getRankList(params);
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
    // if (this.data.moreData) {
    //   this.setData({
    //     'loadMore': true,
    //     'bottomWord': '加载中',
    //   })
    //   var params = {
    //     'pageSize': this.data.pageSize,
    //     'pagination': this.data.pagination,
    //     'cateid':this.data.cateid
    //   }
    //   this.getRankList(params);
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goBack: function(){
    wx.navigateBack({
      
    })
  },
  getRankList(params) {
    wx.showLoading({
      'title':'正在加载'
    })
    wx.u.getRankList(params).then(res =>{
      let data = []
      var len = res.result.length;
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
          if (res.result[j]._maxScore < res.result[j + 1]._maxScore) {
            var temp = res.result[j + 1]; //元素交换
            res.result[j + 1] = res.result[j];
            res.result[j] = temp;
          }
        }
      }

      res.result.forEach((resEach) =>{
        data.push({
          'nickName':resEach.user.nickName,
          'avatarUrl':resEach.user.avatarUrl,
          'score':resEach._maxScore
        })
      })
      if(data.length){
        let rankList = this.data.rankList
        let pagination = this.data.pagination
        rankList.push.apply(rankList,data)
        pagination = pagination ? pagination+1 : 1;
        this.setData({
          'rankList':rankList,
          'pagination': pagination,
        })
      }else{
        this.setData({
          'moreData': false,
        })
      }
      setTimeout(function(){
        wx.hideLoading()
      },500)
    })
  }
})