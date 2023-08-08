// pages/wrongAnswer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//错题id
    loading:true,
    questionInfo:{},
    s: ['A. ', 'B. ', 'C. ', 'D. ', 'E. '],
    showAnswer:false,
    index:0,
    total:0,
    showVideo: false,
    showHelpVideo: false
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowWidth: res.windowWidth
        })
      }
    })
    var menu = options.menu
    wx.u.getError(menu).then(res=>{
      console.log(res)
      this.setData({
        id:res.error[0].objectId,
        result: res.error[0],
        loading:false,
        total: res.error[0].questionList.length,
      })
      this.setThisData(0)
    })
  },
  onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo')
    this.helpVideoContext = wx.createVideoContext('helpVideo')
  },
  showAnswer(){
    this.setData({
      showAnswer:true
    })
  },
  //翻页
  handlePageChange({ detail }){
    const action = detail.type;
    const r = this.data.result.questionList

    if (action === 'next') {
      if (this.data.index >= (r.length - 1)) {
        console.log(this.data.index)
        return;
      }
      this.setThisData((this.data.index + 1));
      this.setData({
        showAnswer: false,
        index: (this.data.index + 1),
      })
    } else {
      this.setThisData((this.data.index - 1));
      this.setData({
        showAnswer: false,
        index: (this.data.index - 1),
      })
    }
  },
  setThisData(i) {
    const r = this.data.result.questionList
    var current = "";
    var currentD = [];
    console.log(r)
    this.setData({
      current: current,
      currentD: currentD,
      questionInfo: r[i],
    })
  },
  //弹出统计下拉层
  handleOpen() {
    this.hideVideo()
    this.hideHelpVideo()
    this.setData({
      actionVisible: true
    })
  },
  //关闭统计下拉层
  actionCancel() {
    this.setData({
      actionVisible: false
    })
  },
  dump(e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    this.setThisData(index)
    this.setData({
      index: index,
      actionVisible: false,
      showAnswer: false,
    })
  },
  deleteError(){
    this.data.result.questionList.splice(this.data.index, 1);
    wx.u.deleteError(this.data.id,this.data.result.questionList)
    this.setData({
      result: this.data.result,
      total: this.data.result.questionList.length,
      actionVisible: false
    })
    this.setThisData(this.data.index)
  },
  //放大图片
  showPic: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  showVideo() {
    this.videoContext.play()
    this.setData({
      showVideo: true
    })
  },
  hideVideo: function () {
    this.videoContext.pause()
    this.setData({
      showVideo: false
    });
  },
  showHelpVideo() {
    this.helpVideoContext.play()
    this.setData({
      showHelpVideo: true
    })
  },
  hideHelpVideo: function () {
    this.helpVideoContext.pause()
    this.setData({
      showHelpVideo: false
    });
  },
})