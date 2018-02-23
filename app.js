//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if (this.globalData.userInfo && this.globalData.userid){
      typeof cb == "function" && cb(this.globalData.userInfo, this.globalData.userid)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            //获取openid
            wx.request({
              url: 'http://169.254.206.101:8080/springmvc/getopenid',
              method: 'post',
              header: {
                'content-type': 'application/json' // 默认值
              },
              data: {
                code: res.code
              },
              success: function (res1) {
                wx.getUserInfo({
                  success: function (res2) {
                    that.globalData.userInfo = res2.userInfo
                    wx.request({
                      url: 'http://169.254.206.101:8080/springmvc/saveuser',
                      method: 'post',
                      data: {
                        username: res2.userInfo.nickName,
                        userimage: res2.userInfo.avatarUrl,
                        openid: res1.data.data,
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res3) {
                        that.globalData.userid = res3.data.data
                        typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.userid)
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  globalData:{
    userInfo:null,
    userid:null,
  }
})