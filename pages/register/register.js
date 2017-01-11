// pages/register/register.js
var Util = require('../util/util.js');
Page({
  data: {
    captchaURL: 'https://hacpai.com/captcha'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /**
   * 跳转到登录页面
   */
  goLogin: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  /**
   * 刷新验证码 
   */
  refreshCaptcha: function () {
    this.setData({
      captchaURL: 'https://hacpai.com/captcha?' + (new Date()).getTime()
    });
  },
  /**
   * 注册
   */
  regishter: function (e) {
    Util.networkStatus()
    var that = this;
    wx.request({
      url: 'https://hacpai.com/register',
      data: {
        userName: e.detail.value.userName,
        userEmail: e.detail.value.userEmail,
        captcha: e.detail.value.captcha,
        referral: 'Vanessa'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 3000
          })
          return false;
        }
        if (!res.data.sc) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 3000
          })
          return false;
        }
        
         wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          duration: 3000
        })
      }
    })
  }
})