//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    // staffA: { firstName: 'Hulk', lastName: 'Hu' },
    // array: [1, 2, 3, 4, 5],
    kouling: '0',
    Money: '0',
    Number: '0',
  },
  //事件处理函数
  topay:function(){
    console.log(1);
    // wx.switchTab({
    //   url: '../money/money'
    // })
    console.log(2,this.data);
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
    console.log(e.detail.value)
    that.setData({
      kouling: e.target.value,
    })

    console.log(this.data.kouling)
  },
  MoneyInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      Money: e.target.value,
    })
  },
  NumberInput: function (e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      Number: e.target.value,
    })
  },
})
