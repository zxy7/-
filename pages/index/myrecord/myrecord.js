// pages/index/myrecord/myrecord.js

var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineRecod: 1,
    userInfo: [],
    money:0,
    num:0,
    sendrecords:[],
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
    wx.request({
      // url: 'http://localhost/springmvc/searchmyrecords/' + app.globalData.userInfo.userid,
      url: 'http://localhost:8080/springmvc/searchmyrecords/AC201802223496051876',
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: app.globalData.userInfo,
          sendrecords: res.data.data.sendrecords.map(item => {
            item.createdate = util.formatTime(item.createdate.time);
            that.setData({
              money:that.data.money+item.money,
            })
            return item
          }),
          // money: res.data.data.sendrecords.,
          num: res.data.data.sendrecords.length,
        })
      }
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