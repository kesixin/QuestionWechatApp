// pages/analysis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: ['A. ', 'B. ', 'C. ', 'D. ', 'E. '],
    questionInfo:{},
    loading: true,
    result:{},
    disabled:true,
    actionVisible:false,
    index:0,
    chose:[],
    showVideo: false,
    showHelpVideo:false
  },

  onLoad (options) {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowWidth: res.windowWidth
        })
      }
    })
    var objectId = options.objectId
    wx.u.getHistory(objectId).then(res => {
      console.log(res)
      var right = res.result.score
      var wrong = res.result.questionList.length - right
      var persent = parseFloat(right/res.result.questionList.length * 100).toFixed(2)
      console.log(persent)
      this.setData({
        loading:false,
        result:res.result,
        right: right,
        wrong: wrong,
        persent: persent,
        total: res.result.questionList.length
      })
      this.setThisData(this.data.index)
    })   
  },
  onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo')
    this.helpVideoContext = wx.createVideoContext('helpVideo')
  },
  setThisData(i){
    console.log(i)
    const r = this.data.result.questionList
    const answer = []
    var current = "";
    var currentD = [];
    console.log(r)
    for(var j=0;j<r[i].choseList.length;j++){
      if(r[i].choseList[j].isChose){
        answer.push(this.data.s[j] + r[i].choseList[j].item)
      }
    }
    this.setData({
      current: current,
      currentD: currentD,
      questionInfo: r[i],
      answer: answer,
    })
    console.log(this.data.current)
  },
  handlePageChange({ detail }){
    const action = detail.type;
    const r = this.data.result.questionList
    
    
    if (action === 'next') {
      if(this.data.index >= (r.length-1)){
        console.log(this.data.index)
        return;
      }
      this.setThisData((this.data.index +1));
      this.setData({
        index: (this.data.index + 1),
      })
    } else {
      this.setThisData((this.data.index - 1));
      this.setData({
        index: (this.data.index - 1),
      })
    }
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
  dump(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    this.setThisData(index)
    this.setData({
      index:index,
      actionVisible: false
    })
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