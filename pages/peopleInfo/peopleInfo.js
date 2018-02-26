// pages/peopleInfo/peopleInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    name: '',
    mobile: '',
    email: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = app.globalData.ip;
    this.setData({
      ip: ip,
      name: app.globalData.user.name,
      mobile: app.globalData.user.mobile,
      email: app.globalData.user.email
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
  formSubmit:function(e){
    var that=this;
    console.log(e.detail.value)
    let formData = e.detail.value;
    if(formData.name==''||formData.email==''){
      wx:wx.showModal({
        title: '提示',
        content: '用户名或邮箱不能为空！',
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
    }
    wx.request({
      url: that.data.ip + '/applet/customer/update_info',
      data: formData,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx: wx.showModal({
            title: '提示',
            content: '修改成功！',
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) {
              wx.navigateBack({
                delta: 1,
              })
             },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else{
          wx: wx.showModal({
            title: '提示',
            content: '修改失败！',
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
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  }
})