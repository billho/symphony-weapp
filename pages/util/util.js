function networkStatus() {
    wx.getNetworkType({
        success: function (res) {
            if (res.errMsg !== 'getNetworkType:ok') {
                wx.showModal({
                    content: '获取网络状态失败'
                })
                return false;
            }
            if (res.networkType === 'none') {
                wx.showModal({
                    content: '当前网络不可用，请检查网络设置'
                })
                return false;
            }
        }
    })
}

function getCookieName () {
  var cookieName = wx.getStorageSync('cookieName');
  return cookieName ? cookieName : 'symphony';
}
module.exports = {
    networkStatus: networkStatus,
    getCookieName: getCookieName
}
