//index.js
//获取应用实例
var app = getApp()
var Show = require("./../component/alert.js");
Page({
  data: {
    userInfo: {},
    kouling: '',
    Money: 0,
    Number: 0,
  },
  //事件处理函数
  topay:function(){
    if (this.data.Money < 1)
      Show.alertShow(this, "info", "最小金额1元");
    if (this.data.Number < 1)
      Show.alertShow(this, "info", "最小数量为1");
    // wx.switchTab({
    //   url: '../money/money'
    // })s
    console.log(this.data);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // 获取页面填入的值
  koulingInput: function (e) {
    var that = this;
    that.setData({
      kouling: e.detail.value,
    })
  },
  MoneyInput: function (e) {
    var that = this;
    that.setData({
      Money: parseInt(e.detail.value),
    })
  },
  NumberInput: function (e) {
    var that = this;
    that.setData({
      Number: parseInt(e.detail.value),
    })
  },
})
