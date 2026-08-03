// pages/exam/index.js
Page({

  data: {
    setInter: '',
    iconInd: !1,
    selectInd: !0,
    scrolltop: '',
    questionList: {},
    showQuestionList: [],
    index: 0,
    textTab: "答题模式",
    s: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J'],
    current: 0,
    rightNum: 0,
    errNum: 0,
    indexInd: 0,
    xiejie: !0,
    interval: 500,
    timeshow: !0,
    times: "",
    finishNum: 0, //完成几道题
    autoplay:!1,
    action:'onUnload',
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

  onLoad: function(options) {
    console.log(this.data.s)
    this.setData({
      cateid: options.cateid,
      menu: options.menu,
      s: this.data.s,
    })
    // this.timeServal(44)
  },

  onReady: function() {

  },

  onShow: function() {
    var that = this
    var a = this
    wx.showLoading({
      title: '正在加载',
    })
    var storageData = wx.getStorageSync('exam' + this.data.cateid)
    var showQuestionList = []
    if (storageData == "") {
      wx.u.getMenuDetail(this.data.cateid).then(res => {
        // wx.u.getQuestions(this.data.cateid, res1.result.questionNum).then(res => {
        //   let n = 0
        //   for (let object of res.result) {
        //     if (object.type == '2') {
        //       res.result[n].answerArr = res.result[n].answer.split("")
        //     }
        //     res.result[n].id = n
        //     n++
        //   }
        //   var questionList = this.getRandomArrayElements(res.result,20)
        //   console.log(questionList)
        //   showQuestionList.push(res.result[0])
        //   showQuestionList.push(res.result[1])
        //   showQuestionList.push(res.result[2])
        //   this.setData({
        //     questionList: res.result,
        //     showQuestionList: showQuestionList
        //   })
        //   this.timeServal(0)
        //   setTimeout(function () {
        //     wx.hideLoading()
        //   }, 1000)
        // })
        if (res.result.questionUrl != undefined && res.result.questionUrl != '') {
          wx.request({
            url: res.result.questionUrl,
            success: function(t) {
              let n = 0
              for (let object of t.data) {
                if (object.type == '2') {
                  t.data[n].answerArr = t.data[n].answer.split("")
                }
                t.data[n].id = n
                n++
              }
              var questionList = that.getRandomArrayElements(t.data, res.result.questionNum)
              //var questionList = t.data
              showQuestionList.push(questionList[0])
              showQuestionList.push(questionList[1])
              showQuestionList.push(questionList[2])
              that.setData({
                questionList: questionList,
                showQuestionList: showQuestionList
              })
              that.timeServal(parseInt(res.result.time)-1, 59)
              setTimeout(function() {
                wx.hideLoading()
              }, 1000)
            }
          })
        } else {
          wx.hideLoading()
        }
      })
    } else {
      wx.hideLoading()
      wx.showModal({
        title: "",
        cancelText: "重新考试",
        confirmText: "继续答题",
        content: "上次考试您已经做到第" + storageData.indexInd + "题,重新考试答题记录会丢失~",
        success: function (n) {
          if (console.log(n), n.confirm) {

            a.setData({
              questionList: storageData.questionList,
              rightNum: storageData.rightNum,
              errNum: storageData.errNum,
              finishNum: storageData.rightNum + storageData.errNum
            })
            var o = storageData.indexInd;
            var d = a.data.questionList
            var u = []
            a.data.indexInd = o;
            1 == a.data.current ? (a.data.indexInd <= 0 ? u.push(d[d.length - 1]) : u.push(d[a.data.indexInd - 1]),
              u.push(d[a.data.indexInd]), a.data.indexInd >= d.length - 1 ? u.push(d[0]) : u.push(d[d.length - 1])) : 0 == a.data.current ? (u.push(d[a.data.indexInd]),
                a.data.indexInd == d.length - 1 ? (u.push(d[0]), u.push(d[1])) : a.data.indexInd == d.length - 2 ? (u.push(d[a.data.indexInd + 1]),
                  u.push(d[0])) : (u.push(d[a.data.indexInd + 1]), u.push(d[a.data.indexInd + 2]))) : (0 == a.data.indexInd ? (u.push(d[d.length - 2]),
                    u.push(d[d.length - 1])) : 1 == a.data.indexInd ? (u.push(d[d.length - 1]), u.push(d[0])) : (u.push(d[a.data.indexInd - 2]),
                      u.push(d[a.data.indexInd - 1])), u.push(d[a.data.indexInd])), a.setData({
                        showQuestionList: u,
                        indexInd: o
                      })
            setTimeout(function () {
              wx.hideLoading()
              that.timeServal(storageData.times.split(":")[0], storageData.times.split(":")[1])
            }, 1000)
          }else {
            wx.removeStorageSync('exam' + that.data.cateid)
            that.onShow()
          };
        }
      })
    }


  },

  onHide: function() {
    console.log(this.data.indexInd)
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'times': this.data.times
    }
    var storageData = wx.getStorageSync('exam' + this.data.cateid)
    if (this.data.action == 'onUnload') {
      if (storageData == "")
        wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
      else {
        wx.removeStorageSync('exam' + this.data.cateid)
        wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
      }
    }
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  onUnload: function() {
    console.log(this.data.indexInd)
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'times': this.data.times
    }
    var storageData = wx.getStorageSync('exam' + this.data.cateid)
    if (this.data.action == 'onUnload'){
      if (storageData == "")
        wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
      else {
        wx.removeStorageSync('exam' + this.data.cateid)
        wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
      }
    }
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },
  scrolltop: function(t) {},
  touchstart: function(t) {},
  bindtouchmove: function(t) {},
  bindtouchend: function(t) {},
  timeServal: function(t, s) {
    var that = this
    if (t >= 0) {
      var e = t,
        a = s > 0 ? s : 0,
        n = this;
      that.data.setInter = setInterval(function() {
        a < 10 ? n.setData({
          times: e + ":0" + a,
          ytimes: t - e + ":" + (59 - a)
        }) : n.setData({
          times: e + ":" + a,
          ytimes: t - e + ":" + (59 - a)
        }), --a < 0 && (e > 0 ? (a = 59, e--) : (a = 0, e = 0, n.setData({
          startTimeind: !0
        })));
      }, 1e3);
    } else this.setData({
      times: 0,
      startTimeind: !0
    });
  },
  _updown: function() {
    var i = 0
    var t = this
    this.setData({
      iconInd: !this.data.iconInd,
      iconIndtwo: !this.data.iconIndtwo,
      videoctrl: !this.data.videoctrl
    }), setTimeout(function() {
      i < 2 || t.setData({
        scrolltop: i[i - 2]
      });
    }, 0);
  },
  autoPlay: function() {
    this.setData({
      autoplay: !0
    });
  },

  pageChange: function(t) {
    // var current = t.detail.current
    // "autoplay" == t.detail.source && this.setData({
    //   autoplay: !1
    // });
    // this.setData({
    //   indexInd: current,
    //   moreArr: {
    //     A: !1,
    //     B: !1,
    //     C: !1,
    //     D: !1
    //   }
    // })
    console.log(t)
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    var a = this;
    a.setData({
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
    }), a.setData({
      xiejie: !0
    });
    var e = this.data.current,
      r = t.detail.current,
      n = a.data.indexInd,
      i = 1 * r - 1 * e,
      d = this.data.questionList;
    if (-2 == i ? i = 1 : 2 == i && (i = -1), (n += i) >= d.length) return n = 0, a.finish(),
      void a.setData({
        xiejie: !1,
        current: 2
      });
    if (n < 0) return wx.showToast({
      title: "已经是第一题了"
    }), a.setData({
      xiejie: !1,
      current: 0
    }), void(n = d.length - 1);
    console.log("%s", "last: ", e, " current: ", r, " index: ", n, " page:", d[n]);
    var o = [];
    0 == r ? (o.push(d[n]), o.push(d[n + 1]), o.push(d[n - 1]), o[1] || (o[1] = d[0]),
        o[2] || (o[2] = d[d.length - 1])) : 1 == r ? (o.push(d[n - 1]), o.push(d[n]), o.push(d[n + 1]),
        o[2] || (o[2] = d[0]), o[0] || (o[0] = d[d.length - 1])) : 2 == r && (o.push(d[n + 1]),
        o.push(d[n - 1]), o.push(d[n]), o[0] || (o[0] = d[0]), o[1] || (o[1] = d[d.length - 1])),
      console.log(o)
    this.setData({
      showQuestionList: o,
      indexInd: n,
      current: r
    })
  },
  selectAnswer: function(t) {
    var that = this
    var answer = t.currentTarget.dataset.answer //答案
    var index = t.currentTarget.dataset.index //第几道题目
    var chosenum = t.currentTarget.dataset.chosenum //选中的答案
    var questionList = this.data.questionList //题目集
    var showQuestionList = this.data.showQuestionList
    questionList[index].chosenum = chosenum
    console.log(questionList.length)
    if (answer == chosenum) {
      questionList[index].judge = true //答题正确

      this.setData({
        showQuestionList: showQuestionList,
        rightNum: this.data.rightNum + 1,
      })
    } else {
      questionList[index].judge = false //答题错误
      this.saveError(questionList[that.data.indexInd].objectId)
      this.setData({
        showQuestionList: showQuestionList,
        errNum: this.data.errNum + 1,
      })
    }
    if (this.data.indexInd < questionList.length - 1){
      this.autoPlay()
      this.setData({
        questionList: questionList,
        finishNum: this.data.finishNum + 1
      })
    }

    if ((this.data.indexInd + 1) >= questionList.length) {
      this.handexam()
    }
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'times': this.data.times
    }
    wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
  },
  selectAnswerMore: function(t) {
    var that = this
    var questionList = that.data.questionList
    var showQuestionList = that.data.showQuestionList

    if ("背题模式" != that.data.textTab && that.data.questionList[that.data.indexInd].subup != "1") {
      var r = that.data.moreArr
      r[t.currentTarget.dataset.chosenum] ? r[t.currentTarget.dataset.chosenum] = !1 : r[t.currentTarget.dataset.chosenum] = !0
      questionList[that.data.indexInd].moreArr = that.data.moreArr
      that.setData({
        questionList: questionList,
        showQuestionList: showQuestionList
      })
    }
  },
  moreSelectSub: function(t) {
    var that = this
    var questionList = that.data.questionList
    var showQuestionList = that.data.showQuestionList
    questionList[that.data.indexInd].subup = '1'
    var moreArr = questionList[that.data.indexInd].moreArr
    var answerArr = questionList[that.data.indexInd].answerArr
    questionList[that.data.indexInd].chosenum = moreArr
    var downArr = []
    for (var i = 0; i < 10; i++) {
      if (moreArr[that.data.s[i]] != undefined && moreArr[that.data.s[i]]==true)
        downArr.push(that.data.s[i])
    }
    console.log(downArr.toString() == answerArr.toString())
    if (downArr.toString() == answerArr.toString()) {
      questionList[that.data.indexInd].judge = true
      this.setData({
        showQuestionList: showQuestionList,
        rightNum: this.data.rightNum + 1
      })
    } else {
      questionList[that.data.indexInd].judge = false //答题错误
      this.saveError(questionList[that.data.indexInd].objectId)
      this.setData({
        showQuestionList: showQuestionList,
        errNum: this.data.errNum + 1
      })
    }
    console.log(downArr)
    console.log(answerArr)
    if (this.data.indexInd < questionList.length - 1){
      this.autoPlay()
      that.setData({
        questionList: questionList,
        finishNum: this.data.finishNum + 1
      })
    }

    if ((this.data.indexInd + 1) >= questionList.length) {
      this.handexam()
    }
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'times': this.data.times
    }
    wx.setStorageSync('exam' + this.data.cateid, saveStorageData)
  },
  jumpToQuestion: function(t) {
    var a = this
    var o = t.currentTarget.dataset.index;
    var d = a.data.questionList
    var u = []
    a.data.indexInd = o;

    1 == this.data.current ? (a.data.indexInd <= 0 ? u.push(d[d.length - 1]) : u.push(d[a.data.indexInd - 1]),
      u.push(d[a.data.indexInd]), a.data.indexInd >= d.length - 1 ? u.push(d[0]) : u.push(d[d.length - 1])) : 0 == this.data.current ? (u.push(d[a.data.indexInd]),
      a.data.indexInd == d.length - 1 ? (u.push(d[0]), u.push(d[1])) : a.data.indexInd == d.length - 2 ? (u.push(d[a.data.indexInd + 1]),
        u.push(d[0])) : (u.push(d[a.data.indexInd + 1]), u.push(d[a.data.indexInd + 2]))) : (0 == a.data.indexInd ? (u.push(d[d.length - 2]),
      u.push(d[d.length - 1])) : 1 == a.data.indexInd ? (u.push(d[d.length - 1]), u.push(d[0])) : (u.push(d[a.data.indexInd - 2]),
      u.push(d[a.data.indexInd - 1])), u.push(d[a.data.indexInd])), this.setData({
      showQuestionList: u,
      indexInd: o
    })

    setTimeout(function() {
      a.setData({
        iconInd: !1
      })
    }, 500)

  },
  newUp_exam: function() {
    this.handexam()
  },
  handexam: function() {
    var that = this
    wx.showModal({
      title: '温馨提示',
      content: '确定要交卷吗？',
      success: function(e) {
        if(e.confirm){
          that.setData({
            action:'submit'
          })
          wx.removeStorageSync('exam' + that.data.cateid)
          that.saveScore()
        } else if (e.cancel) {
          console.log("用户点击取消");
        }
      }
    })
  },
  saveScore: function() {
    var params = {
      'score': this.data.rightNum,
      'menuName': this.data.menu,
      'useTime': this.data.ytimes,
      'cateid': this.data.cateid
    }
    wx.u.saveScore(params).then(res => {
      let unAnswerNum = this.data.questionList.length - this.data.rightNum - this.data.errNum
      if (res.result == 'success')
        wx.redirectTo({
          url: '../examResult/index?rightNum=' + this.data.rightNum + '&errNum=' + this.data.errNum + '&unAnswerNum=' + unAnswerNum + '&useTime=' + this.data.ytimes + '&cateid=' + this.data.cateid + '&menu=' + this.data.menu,
        })
    })
  },
  //保存错题集
  saveError: function(id) {
    console.log(id)
    var that = this
    var cateid = that.data.cateid
    var errQuestionList = []
    var menuQuestionList = []
    var errStorageList = wx.getStorageSync('err_' + cateid)
    var menuStorageList = wx.getStorageSync('menuStorageList')

    var params = {
      'menu': this.data.menu,
      'cateid': cateid
    }
    if (menuStorageList == '')
      menuQuestionList.push(params)
    else {
      var menuList = []
      menuQuestionList = menuStorageList
      for (let object of menuStorageList) {
        menuList.push(object.cateid)
      }
      if (menuList.indexOf(cateid) == -1)
        menuQuestionList.push(params)

    }

    if (errStorageList == '')
      errQuestionList.push(id)
    else {
      errQuestionList = errStorageList
      if (errQuestionList.indexOf(id) == -1)
        errQuestionList.push(id)
    }
    wx.setStorageSync('menuStorageList', menuQuestionList);
    wx.setStorageSync('err_' + cateid, errQuestionList);
    console.log(menuQuestionList)
    console.log(errQuestionList)
  },
  finish: function() {
    wx.showToast({
      title: "已经是最后一题"
    })
  },
  gotrue: function() {
    this.saveScore()
  },
  getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
})