// pages/designList/designList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    name: '',
    status: 1,
    list: [],
    url: '',
    meng: 'none',
    confirm: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      proId: options.proId,
      name: options.proName,
      status: options.proStatus,
      confirm: options.confirm
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_pro_design',
      data: {
        proId: options.proId
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        var list = JSON.parse(res.data.data)
        console.log(list)
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
  
  },
  close: function () {
    this.setData({
      meng: 'none'
    })
  },
  copyUrl: function(e){
    this.setData({
      meng: 'block',
      url: e.currentTarget.dataset.url
    })
  },
  copy: function () {
    var that = this;
    wx.showToast({
      title: '复制成功',
      icon: 'success',
      duration: 2000
    })
    wx.setClipboardData({
      data: that.data.url,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })
  }
})