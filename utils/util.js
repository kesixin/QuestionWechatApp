const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
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
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
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
 * 提交注册信息
 */
const register = (params) => {
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('_User')
    query.get(uid).then(res => {
      res.set('company', params.company)
      res.set('department', params.department)
      res.set('realname', params.realname)
      res.set('status', '0')
      res.save();
      resolve({
        'result': 'success'
      })
    })
  })
}
/**
 * 收集formId
 */
const saveFormId = (formid)=>{
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('formId')
    query.set('formId',formid)
    query.set('status','0')
    query.set('uid',uid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
}

/**
 * 保存意见反馈
 */
const saveFeedback = (params)=>{
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('feedback')
    const pointer = wx.Bmob.Pointer('_User')
    const poiID = pointer.set(uid)
    query.set('uid',poiID)
    query.set('contact',params.contact)
    query.set('content',params.content)
    query.save().then(res => {
      resolve({
        'result': 'success'
      })
    }).catch(err => {
      resolve({
        'result': 'fail'
      })
    })
  })
}

/**
 * 获取分类列表
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
 * 获取分类详情
 */
const getMenuDetail =(id)=>{
  return new Promise((resolve,reject)=>{
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
const getQuestions = (menuId, questionNum) => {
  return new Promise((resolve, reject) => {
    const query = wx.Bmob.Query('questions');
    query.equalTo('menu', '==', menuId);
    query.limit(parseInt(questionNum))
    query.find().then(res => {
      resolve({
        'result': res
      })
    })
  })
}
/**
 * 保存成绩
 */
const saveScore = (params)=>{
  // let current = wx.Bmob.User.current();
  // let uid = current.objectId;
  let uid = wx.getStorageSync('userId')
  return new Promise((resolve, reject) => {
    const pointer1 = wx.Bmob.Pointer('_User')
    const poiID1 = pointer1.set(uid)
    const pointer2 = wx.Bmob.Pointer('questionMenu')
    const poiID2 = pointer2.set(params.cateid)
    const query = wx.Bmob.Query('history');
    query.set('user', poiID1)
    query.set('menuId', poiID2)
    query.set('score',params.score)
    query.set('useTime',params.useTime)
    query.save().then(res => {
      resolve({
        'result': 'success'
      })
    }).catch(err => {
      resolve({
        'result': 'fail'
      })
    })
  })
}

/**
 * 查询错题
 */
const getErrQuestionList = (params)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('questions')
    query.containedIn("objectId", params);
    query.find().then(res =>{
      resolve({
        'result': res
      })
    })
  })
}

/**
 * 查询排名
 */
const getRankList = (params)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('history')
    query.equalTo('menuId','==',params.cateid)
    
    query.statTo("max", "score");
    query.statTo("groupby", "user");
    query.include('user')
    query.find().then(res=>{
      resolve({
        'result':res
      })
    }).catch(err=>{
      console.log(err)
    })
  })
}

/**
 * 答题记录
 */
const historyList =()=>{
  return new Promise((resolve,reject)=>{
    let uid = wx.getStorageSync('userId')
    const query = wx.Bmob.Query('history')
    query.equalTo('user','==',uid)
    query.include('menuId')
    query.order('-createdAt')
    query.find().then(res=>{
      resolve({'result':res})
    })
  })
}

/**
 * 获取设置信息
 */
const getSetting =(key)=>{
  return new Promise((resolve,reject)=>{
    const query = wx.Bmob.Query('setting')
    query.equalTo('key','==',key)
    query.find().then(res=>{
      if(res.length>0){
        resolve({
          'result':res[0]
        })
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  getUserInfo: getUserInfo,
  changeUserInfo: changeUserInfo,
  register: register,
  saveFormId: saveFormId,
  saveFeedback: saveFeedback,
  getQuestionMenu: getQuestionMenu,
  getMenuDetail: getMenuDetail,
  getQuestions: getQuestions,
  saveScore: saveScore,
  getErrQuestionList: getErrQuestionList,
  getRankList: getRankList,
  historyList: historyList,
  getSetting: getSetting
}
