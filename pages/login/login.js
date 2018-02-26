// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:'',
    headImg: '../images/head.png',
    check: '获取验证码',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      headImg: getApp().globalData.userInfo.avatarUrl
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
  
  },
  phoneNum:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  getCheckNum:function(){
    if(this.data.phone.length==11){
      var that = this;
      let i = 60;
      let time = '';
      time = setInterval(function () {
        i--;
        if (i <= 0) {
          clearInterval(time);
          that.setData({
            check: '获取验证码'
          })
        } else {
          that.setData({
            check: i + 's'
          })
        }
      }, 1000)
      wx: wx.request({
        method: 'POST',
        url: that.data.ip +'/applet/send_verify_code',
        data: {
          phone: that.data.phone
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": 'access_token=' + wx.getStorageSync('access_token')
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确！',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    
  },
  loginForm: function(e){
    var that=this;
    var loginData = e.detail.value;
    if (loginData.phone==''||loginData.vCode==''){
      wx:wx.showModal({
        title: '提示',
        content: '信息不完整',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return false;
    } else if (loginData.phone.length!=11){
      wx: wx.showModal({
        title: '提示',
        content: '手机号格式不正确',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确定',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return false;
    }
    loginData.nickName = getApp().globalData.userInfo.nickName;
    console.log(loginData)
    
    wx:wx.request({
      url: that.data.ip +'/applet/login.do',
      data: loginData,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function(res) {
        console.log(res)
        if(res.data.code==0){
          wx:wx.redirectTo({
            url: '../index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          wx: wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})