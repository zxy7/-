// pages/component/alert.js
function alertShow(that, iconType, alertlable) {
  that.setData({
    isAlert: true,
    iconType: iconType,
    alertLable: alertlable
  });
  setTimeout(function (e) {
    that.setData({
      isAlert: false
    })
  }, 1500)
}
module.exports = {
  alertShow: alertShow
}
