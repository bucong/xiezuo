//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        // if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        // }
      }
    })
  },
  globalData: {
    // ip: 'http://127.0.0.1:8077/site_115',
    // ipimg: 'http://127.0.0.1:8077',
    ip: 'https://xiaochengxu.sodo-tech.com/site_1',
    ipimg: 'https://xiaochengxu.sodo-tech.com',
    appid: 'wx4bccbd01116bcfb5',
    secret: 'bd415b054e94589f5ca9705dd9f828d3',
    userInfo: '', 
    user: ''
  },
  getDate1: function (dateStr){
    dateStr = parseInt(dateStr)
    var date = new Date(dateStr);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + '/' + M + '/' + D);
  },
  getDate2: function (dateStr) {
    dateStr = parseInt(dateStr)
    var date = new Date(dateStr);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + ' ' + M + '/' + D);
  },
  getTime: function (dateStr) {
    dateStr = parseInt(dateStr)
    var date = new Date(dateStr);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return (Y + '/' + M + '/' + D + ' ' + H +':'+m);
  }
})