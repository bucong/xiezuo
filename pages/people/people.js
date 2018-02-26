// pages/people/people.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    headImg: '',
    userName: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      headImg: getApp().globalData.userInfo.avatarUrl,
      userName: getApp().globalData.userInfo.nickName
    })
    var that = this;

    wx.request({
      url: ip + '/applet/customer/get_all_project',
      data: '',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        if (res.data.data == null) {
          var list = [];
        } else {
          var list = JSON.parse(res.data.data);
          console.log(list)
        }
        that.setData({
          waiting: true,
          list: list,
          msg: res.data.message
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
    var that=this;
    wx.request({
      url: that.data.ip + '/applet/get_user_info',
      data: '',
      method: 'post',
      header: {
        "Content-Type": 'application/json',
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        var user = JSON.parse(res.data.data);
        getApp().globalData.user = user;
        console.log(user)
        if (user.name != '' && user.name != null) {
          that.setData({
            userName: user.name
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
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
  goProject:function(e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      nowId: e.currentTarget.dataset.id,
      currentPage: e.currentTarget.dataset.i
    })
    wx.navigateBack({
      delta: 1
    })
  }
})