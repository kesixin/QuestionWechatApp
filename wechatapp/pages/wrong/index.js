// pages/wrong/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectQuestionMenu: '请选择',
    objectQuestionMenu: {},
    questionMenu: [],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    //获取套题
    wx.u.getQuestionMenu().then(res => {
      var questionMenu = [];
      if (res.result.length > 0) {
        for (var i = 0; i < res.result.length; i++) {
          questionMenu.push(res.result[i].name);
        }
      }
      console.log(questionMenu);
      this.setData({
        questionMenu: questionMenu,
        objectQuestionMenu: res.result
      })
    })
  },
  /**
   * 选择题库
   */
  changeMenu(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      selectQuestionMenu: this.data.questionMenu[e.detail.value]
    })
    var objectQuestionMenu = this.data.objectQuestionMenu
    var menu = objectQuestionMenu[e.detail.value].objectId
    wx.u.getError(menu).then(res=>{
      if (res.result){
        wx.navigateTo({
          url: '/pages/wrongAnswer/index?menu='+menu,
        })
      }else{
        wx.showToast({
          title: '无错题记录',
          duration: 1500,
          image: '/images/warning.png'
        })
        return;
      }
    })
  },
})