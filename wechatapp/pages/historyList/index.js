// pages/historyList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo:{},
    nodata:false,
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.u.getHistoryList().then(res=>{
      if(res.result){
        for(let object of res.data){
          object.createdAt = object.createdAt.split(" ")[0]
        }
        this.setData({
          dataInfo:res.data,
          nodata: false,
          loading:false
        })
      }else{
        this.setData({
          nodata:true,
          loading:false
        })
      }
    })
  }
})