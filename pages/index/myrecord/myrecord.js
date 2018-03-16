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
    getmoney:0,
    getnum:0,
    sendmoney:0,
    sendnum:0,
    sendrecords:[],
    getrecords: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.zxy7.xin/springmvc/searchmyrecords/' + app.globalData.userid,
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          userInfo: app.globalData.userInfo,
          sendrecords: res.data.data.sendrecords.map(item => {
            item.createdate = util.formatTime(item.createdate.time);
            that.setData({
              sendmoney:that.data.sendmoney+item.money,
            })
            return item
          }),
          getrecords: res.data.data.getrecords.map(item => {
            item.createtime = util.formatTime(item.createtime.time);
            that.setData({
              getmoney: that.data.getmoney + item.earn,
            })
            return item
          }),
          sendnum: res.data.data.sendrecords.length,
          getnum: res.data.data.getrecords.length,
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