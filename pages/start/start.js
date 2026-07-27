// pages/start/start.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        angle: 0,
        remind: '加载中',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            remind: ''
        });
    },

    goSign() {
        var category = wx.getStorageSync('category');
        //判断是否选择了分类，如果选择了就跳转到tabBar首页，如果没有选择就关闭当前页面，跳转到选择分类页面
        if (category) {
            wx.switchTab({
                url: "/pages/index/index"
            })
        } else {
            wx.redirectTo({
                url: '/pages/category/category',
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
