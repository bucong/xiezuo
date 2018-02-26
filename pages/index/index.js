//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ip: '',
    waiting: false,
    list:[],
    msg: '',
    userLogin: 0,
    nowId: '',
    currentPage: 0
  },
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip
    })
    var that=this;
    // 登录
    wx.login({
      success: function (res) {
        console.log(res.code)
        var jsCode = res.code;
        wx.request({
          url: ip + '/applet/get_user_info',
          data: '',
          method: 'post',
          header: {
            "Content-Type": 'application/json',
            "Cookie": 'access_token=' + wx.getStorageSync('access_token')
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 10) {
              wx.request({
                url: ip + '/applet/wx_login',
                data: {
                  appid: app.globalData.appid,
                  secret: app.globalData.secret,
                  jsCode: jsCode
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                dataType: '',
                success: function (res) {
                  wx.setStorageSync('access_token', res.data.data);
                  wx.request({
                    url: ip + '/applet/get_user_info',
                    data: '',
                    method: 'post',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "Cookie": 'access_token=' + wx.getStorageSync('access_token')
                    },
                    success: function (res) {
                      console.log(res)
                      if (res.data.code == 11) {
                        wx.redirectTo({
                          url: '../login/login',
                          success: function (res) { },
                          fail: function (res) { },
                          complete: function (res) { },
                        })
                      }else{
                        that.setData({
                          userLogin: 1
                        })
                      }
                    },
                    fail: function (res) {
                      console.log(res)
                    },
                    complete: function (res) { },
                  })
                },
                fail: function (res) {
                  console.log(res)
                },
                complete: function (res) { },
              })
            } else if (res.data.code == 11) {
              wx.redirectTo({
                url: '../login/login',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            }else{
              that.setData({
                userLogin: 1
              })
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { },
        })
      }
    })
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
    var that = this;
    var setTime = '';
    setTime = setInterval(function () {
      if (that.data.userLogin != 0) {
        clearInterval(setTime);
        wx.request({
          url: that.data.ip + '/applet/customer/get_all_project',
          data: '',
          method: 'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'access_token=' + wx.getStorageSync('access_token')
          },
          success: function (res) {
            console.log(res)
            if (res.data.data == null) {
              console.log('没有项目')
              var list = [];
              that.setData({
                waiting: true,
                msg: res.data.message
              })
            } else {
              var list = JSON.parse(res.data.data);
              console.log(list)
              that.setData({
                waiting: true,
                list: list,
                msg: res.data.message,
                nowId: list[that.data.currentPage].id
              })
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) { },
        })
      }
    }, 200)
  },
  changePro: function(e){
    let i = e.detail.current;
    var that=this;
    this.setData({
      nowId: that.data.list[i].id,
      currentPage: e.detail.current
    })
  }
})
