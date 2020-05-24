const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  let current = wx.Bmob.User.current();
  let uid = current.objectId;
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 保存用户头像昵称
 * avatarUrl：头像
 * nickName:昵称
 */
const changeUserInfo = (avatarUrl, nickName) => {
  let current = wx.Bmob.User.current();
  let uid = current.objectId;
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User');
    query.get(uid).then(res => {
      res.set('avatarUrl', avatarUrl);
      res.set('nickName', nickName);
      res.save();
      resolve({
        'result': 'success'
      });
    })
  })
}

/**
 * 获取套题列表
 */
const getQuestionMenu = () => {
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questionMenu');
    query.order('createdAt');
    query.find().then(res => {
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 获取套题
 * id:套题id
 */
const getMenuById =(id)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questionMenu')
    query.get(id).then(res=>{
      resolve({
        'result': res
      });
    })
  })
}

/**
 * 获取题目
 * menuId:套题id
 * questionNum:题目数量
 */
const getQuestions = (menuId,questionNum) => {
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questions');
    query.equalTo('menu','==',menuId);
    query.limit(parseInt(questionNum))
    query.find().then(res=>{
      resolve({
        'result':res
      })
    })
  })
}

/**
 * 获取设置
 */
const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('setting')
    query.find().then(res=>{
      resolve({
        'result':res
      })
    })
  })
}

/**
 * 添加测试记录
 * params:参数
 */
const addHistory = (params)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('history')
    let current = wx.Bmob.User.current();
    let uid = current.objectId;
    query.equalTo('menu', '==',params.menu)
    query.equalTo('user','==',uid)
    query.find().then(res=>{
      if(res.length>0){
        if(params.saveStatus == 1){
          query.get(res[0].objectId).then(res1 => {
            res1.set('score', params.score)
            res1.set('questionList', params.result)
            res1.set('saveStatus', params.saveStatus)
            res1.save().then(res2 => {
              console.log(res2)
              resolve({ 'result': res[0].objectId })
            })
          })
        }else{
          query.get(res[0].objectId).then(res1 => {
            res1.set('score', params.score)
            res1.set('questionList', params.result)
            res1.set('saveStatus', params.saveStatus)
            res1.set('second',params.second)
            res1.set('minute',params.minute)
            res1.save().then(res2 => {
              console.log(res2)
              resolve({ 'result': res[0].objectId })
            })
          })
        }
        
      }else{
        const pointer = wx.Bmob.Pointer('_User')
        const poiID = pointer.set(uid)
        if(params.saveStatus == 1){
          query.set('user', poiID)
          query.set('score', params.score)
          query.set('menu', params.menu)
          query.set('questionMenu', params.questionMenu)
          query.set('questionList', params.result)
          query.set('saveStatus', params.saveStatus)
          query.save().then(res2 => {
            console.log(res2)
            resolve({ 'result': res2.objectId })
          })
        }else{
          query.set('user', poiID)
          query.set('score', params.score)
          query.set('menu', params.menu)
          query.set('questionMenu', params.questionMenu)
          query.set('questionList', params.result)
          query.set('saveStatus', params.saveStatus)
          query.set('second', params.second)
          query.set('minute', params.minute)
          query.save().then(res2 => {
            console.log(res2)
            resolve({ 'result': res2.objectId })
          })
        }
      }
    })
  })
}

/**
 * 查询是否有保存的答题记录
 * menu:套题id
 */
const checkSaveHistory = (menu)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('history')
    let current = wx.Bmob.User.current();
    let uid = current.objectId;
    query.equalTo('menu','==',menu)
    query.equalTo('user','==',uid)
    query.equalTo('saveStatus','==',0)
    query.find().then(res=>{
      if (res.length > 0) {
        resolve({ 'result': true , 'data':res[0]})
      }else{
        resolve({ 'result': false })
      }
    })
  })
}

/**
 * 查询测试历史
 * id:objectId
 */
const getHistory = (id)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('history')
    query.get(id).then(res=>{
      resolve({ 'result': res })
    })
  })
}

/**
 * 查询击败人数
 * menu:所属套题
 * score:分数
 */
const getBeatNum =(menu,score)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('history')
    query.equalTo('menu','==',menu)
    query.equalTo('score', '<', score)
    query.count().then(res => {
      resolve({ 'result': res })
    });
  })
}

/**
 * 查询平均分
 * menu：所属套题
 */
const getAverage =(menu)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('statistics');
    query.equalTo('menu','==',menu)
    query.find().then(res=>{
      resolve({'result':res})
    })
  })
}

/**
 * 添加错题集
 * menu:套题id
 * questionList:问题集合
 * questionMenu:套题名
 */
const addError = (menu, questionList, questionMenu)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('error')
    let current = wx.Bmob.User.current();
    let uid = current.objectId;
    query.equalTo('menu', '==', menu)
    query.equalTo('user', '==', uid)
    query.find().then(res => {
      if(res.length>0){
        query.get(res[0].objectId).then(res1 => {
          res1.set('questionList', questionList)
          res1.save().then(res2 => {
            console.log(res2)
            resolve({ 'result': res[0].objectId })
          })
        })
      }else{
        const pointer = wx.Bmob.Pointer('_User')
        const poiID = pointer.set(uid)
        query.set('user', poiID)
        query.set('menu', menu)
        query.set('questionMenu', questionMenu)
        query.set('questionList', questionList)
        query.save().then(res2 => {
          console.log(res2)
          resolve({ 'result': res2.objectId })
        })
      }
    })
  })
}

/**
 * 查询错题集
 * menu:套题id
 */
const getError = (menu)=>{
  return new Promise((resolve,reject)=>{
    let current = wx.Bmob.User.current();
    let uid = current.objectId;
    const query = wx.Bmob.Query('error')
    query.equalTo('user','==',uid)
    query.equalTo('menu','==',menu)
    query.find().then(res=>{
      if(res.length>0){
        if(res[0].questionList.length > 0){
          resolve({
            'result': true,
            'error': res
          })
        }else{
          resolve({
            'result': false
          })
        }
      }else{
        resolve({
          'result': false
        })
      }
    })
  })
}

/**
 * 移除错题
 * id:id
 * questionList:错题集合
 */
const deleteError = (id, questionList)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('error')
    query.get(id).then(res=>{
      res.set('questionList', questionList)
      res.save()
      resolve({ 'result': true })
    })
  })
}

/**
 * 获取统计分数
 * menu:套题id
 */
const getStatistics = (menu)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('statistics')
    query.equalTo('menu','==',menu)
    query.find().then(res=>{
      resolve({ 'result': res[0] })
    })
  })
}

/**
 * 统计分数
 * id:统计记录id
 * addScore:加分数
 */
const statistics = (id,addScore)=>{
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('statistics')
    query.get(id).then(res=>{
      res.set('peopleNum',(res.peopleNum+1))
      res.set('allScore',(res.allScore+addScore))
      res.save()
    })
  })
}

/**
 * 查询排序
 * menu:套题id
 */
const getRank = (menu)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('history')
    query.select("user,score");
    query.equalTo('menu','==',menu)
    query.equalTo('saveStatus','==',1)
    query.include('user')
    query.order('-score')
    query.find().then(res=>{
      if (res.length > 0) {
        resolve({
          'result': true,
          'data': res
        })
      } else {
        resolve({ 'result': false })
      }
    })
  })
}

/**
 * 查询测试记录
 */
const getHistoryList =()=>{
  return new Promise((resolve, reject) => {
    let current = wx.Bmob.User.current();
    let uid = current.objectId;
    const query = wx.Bmob.Query('history')
    query.equalTo('user','==',uid)
    query.equalTo('saveStatus', '==', 1)
    query.order('-createdAt')
    query.find().then(res=>{
      console.log(res.length)
      if (res.length > 0) {
        resolve({
          'result': true,
          'data': res
        })
      } else {
        resolve({ 'result': false })
      }
    })
  })
}

const addFeedBack = (phone, content) => {
  let current = wx.Bmob.User.current();
  let uid = current.objectId;
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('feedback');
    const pointer = wx.Bmob.Pointer('_User')
    const poiID = pointer.set(uid)
    query.set('uid', poiID);
    query.set('phone', phone);
    query.set('content', content);
    query.save().then(res => {
      resolve({ 'result': 'success' });
    }).catch(err => {
      resolve({ 'result': 'fail' });
    })

  })
}

module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  changeUserInfo: changeUserInfo,
  getQuestionMenu: getQuestionMenu,
  getMenuById: getMenuById,
  getQuestions: getQuestions,
  getSetting: getSetting,
  addHistory: addHistory,
  checkSaveHistory: checkSaveHistory,
  getHistory: getHistory,
  getBeatNum: getBeatNum,
  getAverage: getAverage,
  addError: addError,
  getError: getError,
  deleteError: deleteError,
  getStatistics: getStatistics,
  statistics: statistics,
  getRank: getRank,
  getHistoryList: getHistoryList,
  addFeedBack: addFeedBack,
}