// pages/billing/billing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    id: '',
    billName: '',
    billTax: '',
    billBankName: '',
    billBankNumber: '',
    billAddress: '',
    billMobile: '',
    username: '',
    updateTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ip = getApp().globalData.ip;
    this.setData({
      ip: ip
    })
    var that = this;
    wx.request({
      url: ip + '/applet/customer/get_BillInfo',
      data: '',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        if(res.data.code!=0){
          wx:wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }else{
          let data=JSON.parse(res.data.data);
          console.log(data);

          that.setData({
            id: data.company.id,
            billName: data.company.billName,
            billTax: data.company.billTax,
            billBankName: data.company.billBankName,
            billBankNumber: data.company.billBankNumber,
            billAddress: data.company.billAddress,
            billMobile: data.company.billMobile,
            username: data.name == null ? '':data.name
          })
          if (data.billRecord!=null){
            that.setData({
              updateTime: getApp().getDate1(data.billRecord.updateTime)
            })
          }
        }
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
  formSubmit:function(e){
    console.log(e.detail.value)
    var formData = e.detail.value;
    if (formData['id'] == ''){
      wx: wx.showModal({
        title: '提示',
        content: '请联系管理员添加公司',
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
    for(let i in formData){
      if (formData[i] == '') {
        wx:wx.showModal({
          title: '提示',
          content: '请将信息填写完整',
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
    }
    wx.request({
      url: this.data.ip + '/applet/customer/update_BillInfo',
      data: formData,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx: wx.showModal({
            title: '提示',
            content: '修改成功！',
            showCancel: false,
            success: function (res) {
              wx.navigateBack({
                delta: 1,
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx: wx.showModal({
            title: '提示',
            content: '修改失败！',
            showCancel: false,
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