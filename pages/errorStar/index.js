// pages/errorStar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textTab: "答题模式",
    selectInd: !0,
    scrolltop: '',
    questionList: {},
    index: 0,
    s: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J'],
    current: 0,
    rightNum: 0,
    errNum: 0,
    indexInd: 0,
    recmend: !1,
    moreArr: {
      A: !1,
      B: !1,
      C: !1,
      D: !1,
      E: !1,
      F: !1,
      G: !1,
      H: !1,
      I: !1,
      J: !1
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cateid = options.cateid
    this.setData({
      'cateid':cateid
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
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    var errList = wx.getStorageSync('err_'+this.data.cateid)
    console.log(errList)
    wx.u.getMenuDetail(this.data.cateid).then(res => {
      if (res.result.questionUrl != undefined && res.result.questionUrl != '') {
        wx.request({
          url: res.result.questionUrl,
          success: function (t){
            let questionList = []
            for(let object of errList){
              var obj = t.data.find((element) => (element.objectId == object))
              questionList.push(obj)
            }
            let n = 0
            for (let object of questionList) {
              if (object.type == '2') {
                questionList[n].answerArr = questionList[n].answer.split("")
              }
              n++
            }
            that.setData({
              'questionList': questionList
            })
            wx.hideLoading()
          }
        })
      } else {
        wx.hideLoading()
      }
    })
    // wx.u.getErrQuestionList(errList).then(res=>{
    //   let n = 0
    //   for (let object of res.result) {
    //     if (object.type == '2') {
    //       res.result[n].answerArr = res.result[n].answer.split("")
    //     }
    //     n++
    //   }
    //   this.setData({
    //     'questionList': res.result
    //   })
    //   wx.hideLoading()
    // })
    
  },

  changeTab(e) {
    var that = this
    that.setData({
      textTab: e.currentTarget.dataset.texttab,
      selectInd: "答题模式" == e.currentTarget.dataset.texttab
    })
  },
  _updown: function () {
    var i = 0
    var t = this
    this.setData({
      iconInd: !this.data.iconInd,
      iconIndtwo: !this.data.iconIndtwo,
      videoctrl: !this.data.videoctrl
    }), setTimeout(function () {
      i < 2 || t.setData({
        scrolltop: i[i - 2]
      });
    }, 0);
  },
  scrolltop: function (t) { },
  touchstart: function (t) { },
  bindtouchmove: function (t) { },
  bindtouchend: function (t) { },

  autoPlay: function () {
    this.setData({
      autoplay: !0
    });
  },

  pageChange: function (t) {
    var current = t.detail.current
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    this.setData({
      indexInd: current,
      moreArr: {
        A: !1,
        B: !1,
        C: !1,
        D: !1,
        E: !1,
        F: !1,
        G: !1,
        H: !1,
        I: !1,
        J: !1
      },
    })
  },

  selectAnswer: function (t) {
    var answer = t.currentTarget.dataset.answer //答案
    var index = t.currentTarget.dataset.index //第几道题目
    var chosenum = t.currentTarget.dataset.chosenum //选中的答案
    console.log(answer +',' + index+',' + chosenum)
    var questionList = this.data.questionList //题目集
    console.log(questionList)
    questionList[index].chosenum = chosenum

    if (answer == chosenum) {
      questionList[index].judge = true  //答题正确
      this.setData({
        xiejie: !1,
        current: (index + 1) >= questionList.length ? index : index + 1,
        rightNum: this.data.rightNum + 1
      })
    }else{
      questionList[index].judge = false  //答题错误
      this.setData({
        errNum: this.data.errNum + 1
      })
    }

    this.setData({
      questionList: questionList,
    })

  },
  selectAnswerMore: function (t) {
    var that = this
    var questionList = that.data.questionList

    if ("背题模式" != that.data.textTab && that.data.questionList[that.data.indexInd].subup != "1") {
      var r = that.data.moreArr
      r[t.currentTarget.dataset.chosenum] ? r[t.currentTarget.dataset.chosenum] = !1 : r[t.currentTarget.dataset.chosenum] = !0
      questionList[that.data.indexInd].moreArr = that.data.moreArr
      that.setData({
        questionList: questionList,
      })
    }
  },
  moreSelectSub: function (t) {
    var that = this
    var questionList = that.data.questionList
    questionList[that.data.indexInd].subup = '1'
    var moreArr = questionList[that.data.indexInd].moreArr
    var answerArr = questionList[that.data.indexInd].answerArr
    questionList[that.data.indexInd].chosenum = moreArr
    var downArr = []
    for (var i = 0; i < 10; i++) {
      if (moreArr[that.data.s[i]] != undefined && moreArr[that.data.s[i]] == true)
        downArr.push(that.data.s[i])
    }
    console.log(downArr.toString() == answerArr.toString())
    if (downArr.toString() == answerArr.toString()) {
      questionList[that.data.indexInd].judge = true
      this.setData({
        xiejie: !1,
        current: (that.data.indexInd + 1) >= questionList.length ? that.data.indexInd : that.data.indexInd + 1,
        rightNum: this.data.rightNum + 1
      })
    } else {
      questionList[that.data.indexInd].judge = false //答题错误
      this.setData({
        errNum: this.data.errNum + 1
      })
    }
    console.log(downArr)
    console.log(answerArr)
    that.setData({
      questionList: questionList
    })
  },
  jumpToQuestion: function (t) {
    var that = this
    var index = t.currentTarget.dataset.index
    this.setData({
      indexInd: index,
      current: index,
    })

    setTimeout(function () {
      that.setData({
        iconInd: !1
      })
    }, 500)

  },
  delCollect: function (t){
    var indexInd = this.data.indexInd
    var questionList = this.data.questionList
    var errList = wx.getStorageSync('err_' + this.data.cateid)
    var index = errList.indexOf(questionList[indexInd].objectId);
    questionList.splice(indexInd,1)
    errList.splice(index,1)
    wx.setStorageSync('err_' + this.data.cateid, errList)
    console.log(indexInd)
    console.log(questionList.length)
    if(questionList.length>0){
      if(indexInd >= questionList.length)
        indexInd -=1
      
      this.setData({
        questionList: questionList,
        indexInd: indexInd,
        current: indexInd
      })
    }
      
    else {
      var menuStorageList = wx.getStorageSync('menuStorageList')
      var n = 0
      for(let object of menuStorageList){
        if(object.cateid == this.data.cateid){
          menuStorageList.splice(n,1)
          break
        }
        n++
      }
      wx.removeStorageSync('err_' + this.data.cateid)
      wx.setStorageSync('menuStorageList', menuStorageList)
      wx.navigateBack({

      })
    }
      
  }
})