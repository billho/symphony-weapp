// pages/index/index.js
Page({
  data: {
    isLogin: false
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: '黑客派',
      desc: '这里是一个活跃的小众社区，大家相互信任，以平等 • 自由 • 奔放的价值观进行分享交流 ',
      path: '/pages/index/index'
    }
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
    var that = this;
    wx.removeStorage({
      key: 'cookie',
      success: function (res) {
        that.setData({
          isLogin: false
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