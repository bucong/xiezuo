// pages/checkAccept/checkAccept.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    proId: '',
    name: '',
    list: [],
    meng: 'none',
    confirm: false,
    evaluate: false,
    isAll: '',
    remark: '',
    formId: ''
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
    var that = this;
    if (options.confirm == 'yes'){
      that.setData({
        confirm: true
      })
    }
    console.log(options.evaluate)
    if (options.evaluate == 'yes') {
      that.setData({
        evaluate: true
      })
    }
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
        var list = JSON.parse(res.data.data)
        console.log(list)
        if(list){
          for (let item of list[0]) {
            for (let i of list[item.id]) {
              if (i.isConfirm) {
                i.confirmTime = app.getDate1(i.confirmTime)
              }
            }
          }
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
  allChange: function (e) {
    let val = e.detail.value;
    let id = e.target.dataset.id;
    let list=this.data.list;
    if(val.length==0){
      for (let i of list[0]) {
        if (i.id == id) {
          i.confirmCustomer = false;
        }
      }
      for (let item of list[id]) {
        item.confirmCustomer = false;
      }
    }else{
      for (let i of list[0]) {
        if(i.id==id){
          i.confirmCustomer = true;
        }
      }
      for (let item of list[id]) {
        item.confirmCustomer = true;
      }
    }
    this.setData({
      list:list
    })
  },
  checkboxChange: function (e) {
    let val = e.detail.value;
    let id = e.target.dataset.id;
    let list = this.data.list;
    for(let item of list[id]){
      for(let i of val){
        if(item.name==i){
          item.confirmCustomer=true;
        }
      }
    }
  },
  subCheck:function(e){
    var formId = e.detail.formId;
    var that=this;
    if (e.detail.target.dataset.type=='all'){
      that.setData({
        isAll: 1,
        formId: formId
      })
      wx.showModal({
        title: '提示',
        content: '确定全部验收吗？',
        success: function (res) {
          if (res.confirm) {
            that.mengSub()
          }
        }
      })
    }else{
      that.setData({
        meng: true,
        isAll: '',
        formId: formId
      })
    }
  },
  mengCancel: function(){
    this.setData({
      meng: 'none',
      remark: ''
    })
  },
  remarkContent: function(e){
    this.setData({
      remark: e.detail.value
    })
  },
  mengSub: function(){
    var that = this;
    let list = this.data.list;
    let functionsId = [];
    for (let item of list[0]) {
      for (let i of list[item.id]) {
        if (i.confirmCustomer) {
          functionsId.push(i.id);
        }
      }
    }
    wx.request({
      url: that.data.ip + '/applet/customer/functions_check',
      data: {
        proId: that.data.proId,
        isAll: that.data.isAll,
        functionsId: functionsId.join(','),
        remark: that.data.remark,
        formId: that.data.formId
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
            content: '验收成功！',
            showCancel: false,
            success:function(){
              wx.navigateBack({
                delta: 1
              })
            }
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
  },
  send_all_fuction_list: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定发送到我的邮箱？',
      success: function (res) {
        if (res.confirm) {
          console.log("发送邮件");
          wx.request({
            url: that.data.ip + '/applet/customer/send_all_fuction_list',
            data: { projectId: that.data.proId },
            header: {
              'Content-Type': 'application/json',
              "Cookie": 'access_token=' + wx.getStorageSync('access_token')
            },
            success: function (res) {
              console.log(res);
              if(res.data.code==0){
                wx.showToast({
                  title: '发送成功',
                  icon: 'success',
                  duration: 2000
                })
              }else{
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