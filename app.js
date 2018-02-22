//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that=this
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取openid
          wx.request({
            url: 'http://169.254.212.234:8080/springmvc/getopenid',
            method: 'post',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              code: res.code
            },
            success: function (res1) {
              console.log(res1.data.data)
              wx.getUserInfo({
                success: function (res2) {
                  that.globalData.userInfo = res2.userInfo
                  typeof cb == "function" && cb(that.globalData.userInfo)
                  wx.request({
                    url: 'http://169.254.212.234:8080/springmvc/saveuser',
                    method: 'post',
                    data: {
                      username: res2.userInfo.nickName,
                      userimage: res2.userInfo.avatarUrl,
                      openid: res1.data.data,
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                      that.setData({
                        userid: res.data.data
                      })
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
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userid:null,
  }
})