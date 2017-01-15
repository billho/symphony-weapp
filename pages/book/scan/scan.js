Page({
  data: {
  },
  /**
   * 扫码
   */
  scan: function () {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        if (res.scanType !== 'EAN_13') {
          wx.showToast({
            title: '我们需要的是 ISBN 编码',
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        wx.navigateTo({
          url: '../share/share?ISBN=' + res.result
        })
      }
    })
  }
})