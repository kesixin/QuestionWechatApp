Page({
  data: {
    icon: {
      type: 'warn',
      color: '#ef473a',
    },
    buttons: [{
      type: 'balanced',
      block: true,
      text: '重新加载',
    }
    ],
  },
  onClick(e) {
    console.log(e)
    const { index } = e.detail

    index === 0 && wx.switchTab({
      url: '/pages/select/index',
    })
  },
})