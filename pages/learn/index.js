// pages/learn/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconInd: !1,
    textTab: "答题模式",
    selectInd: !0,
    scrolltop: '',
    questionList: {},
    showQuestionList: [],
    index: 0,
    s: ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J'],
    current: 0,
    rightNum: 0,
    errNum: 0,
    indexInd: 0,
    recmend: !1,
    xiejie: !0,
    interval: 800,
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
    objQuestionId:[],
    arrQuestionId: [],
    arrcheckQuestion:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.s)
    this.setData({
      cateid: options.cateid,
      menu: options.menu,
      s: this.data.s,
      objQuestionId:this.data.objQuestionId,
      arrcheckQuestion: this.data.arrcheckQuestion
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  onUnload: function() {
    // console.log(this.data.indexInd)
    // var cateid = this.data.cateid
    // var saveStorageData = {
    //   'questionList': this.data.questionList,
    //   'rightNum': this.data.rightNum,
    //   'errNum': this.data.errNum,
    //   'indexInd': this.data.indexInd,
    //   'arrcheckQuestion': this.data.arrcheckQuestion,
    //   'objQuestionId': this.data.objQuestionId
    // }
    // var storageData = wx.getStorageSync(this.data.cateid)
    // if (storageData == "")
    //   wx.setStorageSync(this.data.cateid, saveStorageData)
    // else {
    //   wx.removeStorageSync(this.data.cateid)
    //   wx.setStorageSync(this.data.cateid, saveStorageData)
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    var storageData = wx.getStorageSync(this.data.cateid)
    var showQuestionList = []
    if (storageData == "") {
      // wx.u.getQuestions(this.data.cateid, 100).then(res => {
      //   let n = 0
      //   for (let object of res.result) {
      //     if (object.type == '2') {
      //       res.result[n].answerArr = res.result[n].answer.split("")
      //     }
      //     res.result[n].id = n
      //     n++
      //   }
      //   console.log(res.result)
      //   showQuestionList.push(res.result[0])
      //   showQuestionList.push(res.result[1])
      //   showQuestionList.push(res.result[2])
      //   this.setData({
      //     questionList: res.result,
      //     showQuestionList: showQuestionList
      //   })
      //   setTimeout(function() {
      //     wx.hideLoading()
      //   }, 1000)
      // })
      wx.u.getMenuDetail(this.data.cateid).then(res=>{
        console.log()
        if (res.result.questionUrl != undefined && res.result.questionUrl != ''){
          wx.request({
            url: res.result.questionUrl,
            success: function (t) {
              console.log(t)
              let n = 0
              var objQuestionId = []
              var arrcheckQuestion = {}
              for (let object of t.data) {
                var questionId = t.data[n].objectId
                var checkQuestion = {'check':null}
                objQuestionId.push(questionId)
                if (object.type == '2') {
                  t.data[n].answerArr = t.data[n].answer.split("")
                }
                t.data[n].id = n
                n++
              }
              console.log(objQuestionId)
              showQuestionList.push(t.data[0])
              showQuestionList.push(t.data[1])
              showQuestionList.push(t.data[2])
              console.log(arrcheckQuestion)
              that.setData({
                questionList: t.data,
                showQuestionList: showQuestionList,
                objQuestionId:objQuestionId,
                arrcheckQuestion: arrcheckQuestion
              })
              console.log(t.data)
              setTimeout(function () {
                wx.hideLoading()
              }, 1000)
            }
          })
        }else{
          wx.hideLoading()
        }
      }) 
    } else {
      var a = this
      a.setData({
        questionList: storageData.questionList,
        rightNum: storageData.rightNum,
        errNum: storageData.errNum,
        arrcheckQuestion: storageData.arrcheckQuestion,
        objQuestionId: storageData.objQuestionId,
        recmend: !0,
      })
      var a = this
      var o = storageData.indexInd;
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
        wx.hideLoading()
      }, 1000)
      setTimeout(function() {
        that.setData({
          recmend: !1
        });
      }, 3000);
    }

  },

  changeTab(e) {
    var that = this
    that.setData({
      textTab: e.currentTarget.dataset.texttab,
      selectInd: "答题模式" == e.currentTarget.dataset.texttab
    })
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
  scrolltop: function(t) {},
  touchstart: function(t) {},
  bindtouchmove: function(t) {},
  bindtouchend: function(t) {},

  autoPlay: function() {
    this.setData({
      autoplay: !0
    });
  },

  pageChange: function(t) {
    // var current = t.detail.current 
    "autoplay" == t.detail.source && this.setData({
      autoplay: !1
    });
    // this.setData({
    //   indexInd: current,
    //   moreArr: {
    //     A: !1,
    //     B: !1,
    //     C: !1,
    //     D: !1
    //   }
    // })
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
    console.log(o)
  },
  selectAnswer: function(t) {
    var that = this
    var answer = t.currentTarget.dataset.answer //答案
    var index = t.currentTarget.dataset.index //第几道题目
    var chosenum = t.currentTarget.dataset.chosenum //选中的答案
    var questionList = this.data.questionList //题目集
    var showQuestionList = this.data.showQuestionList
    var arrcheckQuestion = this.data.arrcheckQuestion
    questionList[index].chosenum = chosenum
    if (answer == chosenum) {
      questionList[index].judge = true //答题正确
      arrcheckQuestion[index+1] = true
      // if (this.data.indexInd < questionList.length - 1)
      // {
      //   that.autoPlay()
      // }
        
      this.setData({
        showQuestionList: showQuestionList,
        rightNum: this.data.rightNum + 1,
        arrcheckQuestion: arrcheckQuestion
      })
    } else {
      questionList[index].judge = false //答题错误
      arrcheckQuestion[index+1]=false
      this.saveError(questionList[index].objectId)
      this.setData({
        showQuestionList: showQuestionList,
        errNum: this.data.errNum + 1,
        arrcheckQuestion: arrcheckQuestion
      })
    }

    this.setData({
      questionList: questionList,
    })
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'arrcheckQuestion': this.data.arrcheckQuestion,
      'objQuestionId': this.data.objQuestionId
    }
    var storageData = wx.getStorageSync(this.data.cateid)
    wx.setStorageSync(this.data.cateid, saveStorageData)
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
    var arrcheckQuestion = this.data.arrcheckQuestion
    questionList[that.data.indexInd].chosenum = moreArr
    var downArr = []
    for (var i = 0; i < 10; i++) {
      if (moreArr[that.data.s[i]] != undefined && moreArr[that.data.s[i]]==true)
        downArr.push(that.data.s[i])
    }
    console.log(downArr.toString() == answerArr.toString())
    if (downArr.toString() == answerArr.toString()) {
      questionList[that.data.indexInd].judge = true
      arrcheckQuestion[that.data.indexInd+1] = true
      // if (this.data.indexInd < questionList.length - 1)
      //   this.autoPlay()
      this.setData({
        // xiejie: !1,
        // current: (that.data.indexInd + 1) >= questionList.length ? that.data.indexInd : that.data.indexInd + 1,
        showQuestionList: showQuestionList,
        rightNum: this.data.rightNum + 1,
        arrcheckQuestion: arrcheckQuestion
      })
    } else {
      questionList[that.data.indexInd].judge = false //答题错误
      arrcheckQuestion[that.data.indexInd+1] = false
      this.saveError(questionList[that.data.indexInd].objectId)
      this.setData({
        showQuestionList: showQuestionList,
        errNum: this.data.errNum + 1,
        arrcheckQuestion: arrcheckQuestion
      })
    }
    console.log(downArr)
    console.log(answerArr)
    that.setData({
      questionList: questionList
    })
    var cateid = this.data.cateid
    var saveStorageData = {
      'questionList': this.data.questionList,
      'rightNum': this.data.rightNum,
      'errNum': this.data.errNum,
      'indexInd': this.data.indexInd,
      'arrcheckQuestion': this.data.arrcheckQuestion,
      'objQuestionId': this.data.objQuestionId
    }
    var storageData = wx.getStorageSync(this.data.cateid)
    wx.setStorageSync(this.data.cateid, saveStorageData)
  },
  jumpToQuestion: function(t) {
    var a = this
    var o = t.currentTarget.dataset.index;
    var d = a.data.questionList
    var u = []
    this.setData({
      indexInd: o
    })
    
    console.log(a.data.indexInd)
    1 == this.data.current ? (a.data.indexInd <= 0 ? u.push(d[d.length - 1]) : u.push(d[a.data.indexInd - 1]),
      u.push(d[a.data.indexInd]), a.data.indexInd >= d.length - 1 ? u.push(d[0]) : u.push(d[d.length - 1])) : 0 == this.data.current ? (u.push(d[a.data.indexInd]),
      a.data.indexInd == d.length - 1 ? (u.push(d[0]), u.push(d[1])) : a.data.indexInd == d.length - 2 ? (u.push(d[a.data.indexInd + 1]),
        u.push(d[0])) : (u.push(d[a.data.indexInd + 1]), u.push(d[a.data.indexInd + 2]))) : (0 == a.data.indexInd ? (u.push(d[d.length - 2]),
      u.push(d[d.length - 1])) : 1 == a.data.indexInd ? (u.push(d[d.length - 1]), u.push(d[0])) : (u.push(d[a.data.indexInd - 2]),
      u.push(d[a.data.indexInd - 1])), u.push(d[a.data.indexInd])), this.setData({
      showQuestionList: u,
      indexInd: o
    })
    console.log(u)
    // this.setData({
    //   indexInd: index,
    //   current: index,
    // })

    setTimeout(function() {
      a.setData({
        iconInd: !1
      })
    }, 500)

  },
  del_data: function(t) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要清空吗？',
      success: function(a) {
        var storageData = wx.getStorageSync(that.data.cateid)
        if (storageData != "") {
          wx.removeStorageSync(that.data.cateid)
        }

        that.onShow()

        that.setData({
          indexInd: 0,
          current: 0,
          rightNum: 0,
          errNum: 0,
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
        setTimeout(function() {
          that.setData({
            iconInd: !1
          })
        }, 500)
      }
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
  }
})
