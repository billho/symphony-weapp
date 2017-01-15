// pages/index/index.js
Page({
  data:{
    isLogin: false
  },
  /**
   * 页面加载
   * optins url 参数
   */
  onLoad: function (options) {
    if (wx.getStorageSync('cookie')) {
      this.setData({
        isLogin: true
      })
    }
  },
  /**
   * 登出
   */
  logout: function () {
    wx.removeStorage({
      key: 'cookie',
      success: function (res) {
        wx.redirectTo({
          url: '../login/login'
        })
      }
    })
  },
  /**
   * 登录
   */
  login: function () {
     wx.redirectTo({
       url: '../login/login'
        })
  }
})