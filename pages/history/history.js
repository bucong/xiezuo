// pages/history/history.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    name:'',
    status: 1,
    list:[],
    proId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      name: options.proName,
      status: options.proStatus,
      proId: options.proId
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_pro_progress',
      data: {
        proId: options.proId
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        var list = JSON.parse(res.data.data)
        console.log(list)
        for(let item of list){
          item.createTime = app.getTime(item.createTime);
        }
        that.setData({
          list: list
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
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
  
  }
})