// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:'',
    value2:''
  },
  onLoad (e) {

  },
  handleChange(field, value) {
    console.log(value);
    this.setData({
      [field]: value
    })
  },
  handleChange1({ detail }) {
    this.handleChange('value1', detail.detail.value)
  },
  handleChange2({ detail }) {
    this.handleChange('value2', detail.detail.value)
  },
  formSubmit(e) {
    var phoneNum = this.data.value1;
    var content = this.data.value2;
    var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(phoneNum) === false) {
      wx.showToast({
        title: '号码不合法',
        icon: 'loading',
        duration: 1500
      });
      return false;
    }
    if(content == ''){
      wx.showToast({
        title: '内容不为空',
        icon: 'loading',
        duration: 1500
      });
      return false;
    }
    wx.u.addFeedBack(phoneNum,content).then(res=>{
      if (res.result == 'success'){
        wx.showToast({
          title: '提交成功',
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../my/index'
              })
            }, 1500)
          }
        });
        
      }else{
        wx.showToast({
          title: '提交失败',
          icon: 'loading',
          duration: 1500
        });
        return false;
      }
    })
  }
})