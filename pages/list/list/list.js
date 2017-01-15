var Util = require('../../util/util.js');
Page({
  data: {
    articles: [],
    currentPage: 0,
    isFinished: false
  },
  /**
   * 页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    this._getList(1);
  },
  /**
   * 页面渲染完成，隐藏导航 loading 效果
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
  },
  /**
   * 刷新
   */
  refresh: function (e) {
    this._getList(1);
  },
  /**
   * 加载下一页
   */
  loadMore: function (e) {
    if (this.data.isFinished) {
      wx.showToast({
        title: '已经到底了',
        icon: 'loading',
        duration: 3000
      })
      return false;
    }
    this._getList(this.data.currentPage + 1);
  },
  /**
   * 获取列表数据
   */
  _getList: function (p) {
    Util.networkStatus()
    let that = this;
    wx.request({
      url: 'https://hacpai.com/books',
      method: 'POST',
      data: {
        p: p
      },
      header: {
        'content-type': 'application/json',
        'Cookie': 'b3log-latke=' + wx.getStorageSync('cookie')
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        if (!res.data.sc) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        if (p === 1) {
          that.setData({
            articles: [],
            isFinished: false
          })
        }
        that.setData({
          articles: that.data.articles.concat(res.data.articles),
          currentPage: p
        })

        if (res.data.articles.length === 0) {
          that.setData({
            isFinished: true
          })
        }

      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          duration: 8000
        })
      }
    })
  }
})