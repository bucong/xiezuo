// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    list: [],
    confirm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip,
      proId: options.proId
    })
    if (options.confirm==1){
      this.setData({
        confirm: true
      })
    }
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_pro_functions',
      data: {
        proId: options.proId
      },
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        var list=JSON.parse(res.data.data)
        console.log(list)
        for (let item of list[0]) {
          item.confirmCustomer = 'auto';
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
  
  },
  pack:function(e){
    let id = e.target.dataset.id;
    let list = this.data.list;
    for (let item of list[0]) {
      if (item.id == id) {
        if (item.confirmCustomer==0){
          item.confirmCustomer = 'auto';
        }else{
          item.confirmCustomer = 0;
        }
      }
    }
    this.setData({
      list:list
    })
  },
  functionSub: function(){
    var that=this;
    wx:wx.showModal({
      title: '提示',
      content: '功能是否已确认？',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: that.data.ip + '/applet/customer/functions_confirm',
            data: {
              proId: that.data.proId
            },
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": 'access_token=' + wx.getStorageSync('access_token')
            },
            success: function (res) {
              console.log(res)
              if(res.data.code==0){
                wx.showModal({
                  title: '提示',
                  content: '功能确认成功！'
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: res.data.message
                })
              }
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) { },
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  send_all_fuction_list: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定发送到我的邮箱？',
      success: function (res) {
        if (res.confirm) {
          console.log("发送邮件");
          wx.request({
            url: that.data.ip+'/applet/customer/send_all_fuction_list',
            data: {projectId: that.data.proId},
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