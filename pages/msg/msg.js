// pages/msg/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    username: '',
    time:'',
    replyTime: '',
    content: '',
    img:[],
    exigent: 1,
    sourceType: ['','bug', '新增需求','需求变更'],
    sourceId: 1,
    problemSolve: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    var ipimg = getApp().globalData.ipimg;
    this.setData({
      ip: ip,
      ipimg: ipimg
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_feedback_record',
      data: {
        id: options.id
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        var data=JSON.parse(res.data.data);
        console.log(data)
        if (data.problemImg!=null){
          that.setData({
            username: data.problemSource,
            time: getApp().getTime(data.createTime),
            content: data.problemContent,
            img: data.problemImg.split(','),
            exigent: data.problemLevel,
            sourceId: data.problemCate,
            problemSolve: data.problemSolve,
            replyTime: getApp().getTime(data.replyTime)
          })
        }else{
          that.setData({
            username: data.problemSource,
            time: getApp().getTime(data.createTime),
            content: data.problemContent,
            img: [],
            exigent: data.problemLevel,
            sourceId: data.problemCate,
            problemSolve: data.problemSolve,
            replyTime: getApp().getTime(data.replyTime)
          })
        }
        wx.setNavigationBarTitle({
          title: data.problemTitle
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