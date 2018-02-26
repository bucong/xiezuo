// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    proId: '',
    ipimg: '',
    exigent: [
      { name: 'exigent', value: '普通',otherValue:'1',checked:'true'},
      { name: 'exigent', value: '紧急', otherValue: '2'},
      { name: 'exigent', value: '非常紧急', otherValue: '3'}
    ],
    discribe: [
      { name: 'exigent', value: 'bug', otherValue: '1', checked: 'true'},
      { name: 'exigent', value: '新增需求',otherValue: '2'},
      { name: 'exigent', value: '需求变更', otherValue: '3'}
    ],
    exigentRes: '1',
    discribeRes: '1',
    imgs:[],
    clsForm:''
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
      proId: options.proId
    })
    wx.setNavigationBarTitle({
      title: options.proName
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


  exigentChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      exigentRes: e.detail.value
    })
  },


  discribeChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      discribeRes: e.detail.value
    })
  },

  //删除图片
  deleteImg:function(e){
    var that = this;
    var imgs = that.data.imgs;
    imgs.splice(e.target.dataset.index,1);
    this.setData({
      imgs:imgs
    })
  },

  imgSubmit: function () {
    var that = this;
    var i = parseInt(that.data.imgs.length);
    if (i > 2) {
      wx.showModal({
        title: '提示',
        content: '最多可以上传3张图片。',
        showCancel: false
      })
      return false;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: that.data.ipimg+'/file_upload',
          filePath: tempFilePaths[0],
          name: 'file',
          method: 'POST',
          success: function (res) {
            let img=that.data.imgs;
            img.push(res.data);
            that.setData({
              imgs: img
            })
          }
        })
      }
    })
  },

  allSubmit:function(e){
    if (e.detail.value.problemTitle == ""){
      wx.showModal({
        title: '提示',
        content: '问题路径不能为空！',
        showCancel: false
      })
      return false;
    }
    if (e.detail.value.problemContent == "") {
      wx.showModal({
        title: '提示',
        content: '问题详情不能为空！',
        showCancel: false
      })
      return false;
    }
    var that = this;
    var formData = e.detail.value;
    if (that.data.imgs.length>0){
      formData.problemImg = that.data.imgs.join(",");
    }
    formData.projectId = that.data.proId;
    wx.request({
      url: that.data.ip +'/applet/customer/add_feedback_record',
      data: formData,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'access_token=' + wx.getStorageSync('access_token')
      },
      success: function (res) {
        console.log(res.data);
        
        if(res.data.code==0){
          wx.showModal({
            title: '提示',
            content: '提交成功！',
            showCancel: false,
            success: function (res) {
              wx.redirectTo({
                url: '../feedback/feedback?proId=' + that.data.proId
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '提交失败！',
            showCancel: false
          })
        }
      }
    }) 
  }
})