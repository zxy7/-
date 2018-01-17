// pages/index/myrecord/myrecord.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineRecod: 1,
    userInfo: [],
    money:1.2,
    num:1,
    sendrecords:[
      {
        recordid:'1',
        title: "aaaaa",
        allmoney:20,
        time:111111,
        restnum:1,
        allnum:1
      },
      {
        recordid: '2',
        title: "aaaaa",
        allmoney:20,
        time:111111,
        restnum:1,
        allnum:1
      },
    ],
    getrecords: [
      {
        recordid: '1',
        name: "aaaaa",
        imgsrc: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKCPhTeW9YgEAA5JMicOQBobibXx7O4V0G7S7TXic0lyzDL5LrPCQKIOCsSDTH0uY6np4kZz7kScPusQ/0",
        getmoney: 1.0,
        time: 111111
      },
      {
        recordid: '2',
        name: "aaaaa",
        imgsrc: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKCPhTeW9YgEAA5JMicOQBobibXx7O4V0G7S7TXic0lyzDL5LrPCQKIOCsSDTH0uY6np4kZz7kScPusQ/0",
        getmoney: 2.0,
        time: 111111
      },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  // tab 切换函数
  changeTab: function (e) {
    var that = this;
    that.setData({
      mineRecod: e.currentTarget.dataset.num
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})