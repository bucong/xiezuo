// pages/reportDetail/reportDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    id: '',//报告id
    title: '',
    list:[],
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      id: options.id,
      title: options.name,
      list: JSON.parse(options.details),
      remark: options.remark
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/read_report',
      data: {
        reportId: options.id
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
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

  send_report_to_my_email: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定发送到我的邮箱？',
      success: function (res) {
        if (res.confirm) {
          console.log("发送邮件");
          wx.request({
            url: that.data.ip + '/applet/customer/send_report_to_my_email',
            data: { reportId: that.data.id },
            header: {
              'Content-Type': 'application/json',
              "Cookie": 'access_token=' + wx.getStorageSync('access_token')
            },
            success: function (res) {
              console.log(res);
              if (res.data.code == 0) {
                wx.showToast({
                  title: '发送成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '发送失败！',
                  showCancel: false
                })
              }

            }
          })
        }
      }
    })
  }
})