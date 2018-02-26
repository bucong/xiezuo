// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    proId: '',
    name:'',
    star: 0,
    starContent: '',
    tag: [
      { name: '需求明确', value: 1, check: '' },
      { name: '沟通无障碍', value: 2, check: '' },
      { name: '技术过硬', value: 3, check: '' },
      { name: '反应迅速', value: 4, check: '' },
      { name: '服务专业', value: 5, check: '' }
    ],
    tagRes: [],
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      proId: options.proId,
      name: options.name
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
  star:function(e){
    var starData = e.target.dataset.star;
    if(starData==1){
      this.setData({
        star: starData,
        starContent: '非常不满意！'
      })
    } else if (starData == 2) {
      this.setData({
        star: starData,
        starContent: '不满意！'
      })
    } else if (starData == 3) {
      this.setData({
        star: starData,
        starContent: '不太满意！'
      })
    } else if (starData == 4) {
      this.setData({
        star: starData,
        starContent: '较为满意，有待提高！'
      })
    } else if (starData == 5) {
      this.setData({
        star: starData,
        starContent: '满意，服务很到位！'
      })
    }
  },
  tagChange: function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var tagRes = e.detail.value;
    var tag = this.data.tag;
    for(let ti of tag){
      var i=0;
      for(let item of tagRes){
        if(ti.value==item){
          ti.check='active',
          i++;
        }
      }
      if(i==0){
        ti.check=''
      }
    }
    this.setData({
      tag: tag,
      tagRes: tagRes
    })
    console.log(tagRes)
  },
  evaluateContent: function(e){
    this.setData({
      content: e.detail.value
    })
  },
  evaluate: function () {
    var that = this;
    if (that.data.star==0){
      wx.showModal({
        title: '提示',
        content: '请选择评分！',
        showCancel: false
      })
      return false;
    } else if (that.data.tagRes.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择标签！',
        showCancel: false
      })
      return false;
    }
    wx.request({
      url: that.data.ip + '/applet/customer/add_evaluation',
      data: {
        proId: that.data.proId,
        opinion: that.data.content,
        type: that.data.tagRes.join(','),
        scores: that.data.star
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.navigateBack({
            delta: 2
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
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