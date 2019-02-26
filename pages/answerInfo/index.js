// pages/answerInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    time:'',
    questionMenu:'',
    questionNum:''
  },
  onLoad (e) {
    var id = e.id
    var questionMenu = e.questionMenu
    var time, questionNum
    wx.u.getMenuById(id).then(res=>{
      time = res.result.time
      questionNum = res.result.questionNum
      this.setData({
        id:id,
        time:time,
        questionMenu: questionMenu,
        questionNum:questionNum
      })
    })
  },
  start(){
    wx.reLaunch({
      url: '/pages/answer/index?id=' + this.data.id + '&questionMenu=' + this.data.questionMenu
    })
    
  }
})