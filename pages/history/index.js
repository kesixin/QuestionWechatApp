// pages/history/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    total:0,
    score:0,
    average:0
  },

  onLoad (options) {
    var objectId = options.id
    wx.u.getHistory(objectId).then(res=>{
      wx.u.getBeatNum(res.result.menu, res.result.score).then(res1=>{
        wx.u.getAverage(res.result.menu).then(res2 => {
          this.setData({
            objectId:objectId,
            loading: false,
            total: res.result.questionList.length,
            score: res.result.score,
            questions: res.result.questionList,
            beatNum: res1.result,
            average: parseInt(res2.result[0].allScore / res2.result[0].peopleNum)
          })
        })
      }) 
    })
  },
  back(){
    wx.reLaunch({
      url: '/pages/select/index',
    })
  },
  analysis(){
    wx.navigateTo({
      url: '/pages/analysis/index?objectId='+ this.data.objectId,
    })
  }
})