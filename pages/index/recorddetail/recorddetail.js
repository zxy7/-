// pages/index/recorddetail/recorddetail.js

var util = require('../../../utils/util.js'); 
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    record:{},
    listdetails:[],
    speak:false,
    disabled:false,
    earn:0,
    notice:'按住说出以上口令领取赏金',
    tempFilePath:"http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.zxy7.xin/springmvc/searchrecord/' + options.recordid,
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          userInfo: res.data.data.user,
          record: res.data.data.record,
          listdetails: res.data.data.listdetails.map(item => { 
            item.createtime = util.formatTime(item.createtime.time);
            if (app.globalData.userid == item.userid) {
              that.setData({
                speak:true,
                earn:item.earn
              })
            }
            return item }),
          disabled: res.data.data.record.restnumber==0?true:false,
          notice: res.data.data.record.restnumber == 0 ? "红包领完了" :"按住说出以上口令领取赏金",
        })
      }
    })
  },
  toshareChat: function () {

  },
  playvoice: function (event){
    console.log(event.target)
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.src = event.target.dataset.voice 

  },
  speaking: function (){
    var that = this;
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      wx.request({
        url: 'https://www.zxy7.xin/springmvc/savedetail', 
        method:"post",
        data: {
          voice: res.tempFilePath,
          userid: app.globalData.userid,
          recordid:that.data.record.recordid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            record: res.data.data.record,
            listdetails: res.data.data.listdetails.map(item => {
              item.createtime = util.formatTime(item.createtime.time);
              if (app.globalData.userid == item.userid) {
                that.setData({
                  speak: true,
                  earn: item.earn
                })
              }
              return item
            }),
            disabled: res.data.data.record.restnumber == 0 ? true : false,
            notice: res.data.data.record.restnumber == 0 ? "红包领完了" : "按住说出以上口令领取赏金",
          })

          if(!res.data.success)
            wx.showToast({
              title: res.data.msg||"",
              duration: 2000
            })
        }
      })
      const { tempFilePath } = res
      that.setData({
        tempFilePath: tempFilePath,
      })
      wx.saveFile({
        tempFilePath: tempFilePath,
        success: function (res) {
          var savedFilePath = res.savedFilePath
          console.log(savedFilePath)
        }
      })
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 1000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options)
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