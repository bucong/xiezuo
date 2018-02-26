// pages/design/design.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    ipimg: '',
    name: '',
    address: '', 
    imgs: [],
    currentIndex: 0,
    playImg: 'none',
    designId: '',
    confirm: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    var ipimg = getApp().globalData.ipimg;
    this.setData({
      ip: ip,
      ipimg: ipimg,
      designId: options.id,
      confirm: options.confirm,
      name: options.name
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_all_design_img',
      data: {
        designId: options.id
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        var imgs = JSON.parse(res.data.data)
        console.log(imgs)
        that.setData({
          address: imgs.addressName,
          imgs: imgs.imgUrls
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
  showImg: function(e){
    var that=this;
    that.setData({
      currentIndex: e.target.dataset.index
    })
    setTimeout(function () {
      that.setData({
        playImg: 'block'
      })
    }, 500)
  },
  hideImg: function(){
    this.setData({
      playImg: 'none'
    })
  },
  designSub: function () {
    var that = this;
    wx: wx.showModal({
      title: '提示',
      content: '设计图是否已确认？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.ip + '/applet/customer/design_confirm',
            data: {
              designId: that.data.designId
            },
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": 'access_token=' + wx.getStorageSync('access_token')
            },
            success: function (res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: res.data.message
              })
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  send_zip_file_email: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定发送到我的邮箱？',
      success: function (res) {
        if (res.confirm) {
          console.log("发送邮件");
          wx.request({
            url: that.data.ip + '/applet/customer/send_zip_file_email',
            data: { designId: that.data.designId },
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