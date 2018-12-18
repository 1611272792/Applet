// pages/addrolemanager/addrolemanager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    switch1: true,
    AuthorArry: [],
    items: new Array(),
    AuthorID: '',
    companyId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      companyId: wx.getStorageSync('CompanyId')
    })
    
    wx.request({
      url: that.data.durl + '/api/Sys/Role/GetAllAuthorInfo',
      method: "GET",
      data: {
        CompanyId: that.data.companyId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(resd) {
        console.log("abc:" + resd.data.data[0].listAuthor[0].AuthorIcons);
        for (var index in resd.data.data) {
          var authorArryItem = resd.data.data[index]
          for (var index1 in authorArryItem.listAuthor) {
            var listAuthorItem = authorArryItem.listAuthor[index1]
            
              resd.data.data[index].listAuthor[index1].AuthorIcons = false;
            
          }
        }

        that.setData({
          AuthorArry: resd.data.data

        })

        for (var i = 0; i < resd.data.data.length; i++) {
          for (var j = 0; j < resd.data.data[i].listAuthor.length; j++) {
            var item = {
              id: resd.data.data[i].listAuthor[j].AuthorId,
              state: false
            }
            that.data.items.push(item);
          }
        }

      },
      fail: function() {
        console.log("fail");
      }
    })

  },
  onChange(event) {
    var that = this;
    var detail = event.detail;
    console.log("改变：" + detail.value);
    console.log("sss:" + event.currentTarget.dataset.authorid);
    // var arryAuthor = new arryAuthor();
    // arryAuthor[] = detail.value;
    // AuthorID = ;
    if (detail.value) {
      for (var index in that.data.AuthorArry) {
        var authorArryItem = that.data.AuthorArry[index]
        for (var index1 in authorArryItem.listAuthor) {
          var listAuthorItem = authorArryItem.listAuthor[index1]
          if (listAuthorItem.AuthorId == event.currentTarget.dataset.authorid) {
            that.data.AuthorArry[index].listAuthor[index1].AuthorIcons = true;
          }
        }
      }
    } else {
      for (var index in that.data.AuthorArry) {
        var authorArryItem = that.data.AuthorArry[index]
        for (var index1 in authorArryItem.listAuthor) {
          var listAuthorItem = authorArryItem.listAuthor[index1]
          if (listAuthorItem.AuthorId == event.currentTarget.dataset.authorid) {
            that.data.AuthorArry[index].listAuthor[index1].AuthorIcons = false;
          }
        }
      }
    }
    that.setData({
      AuthorArry: that.data.AuthorArry

    })
  },
  onChange2(event){
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })
  },

  formSubmit: function (e) {
   // console.log(e.detail.value.RoleName);
   var that=this;
    if (e.detail.value.RoleName==''){
      wx.showModal({
        title: '提示',
        content: '角色名必填',
      })
      return;
    }
    if (e.detail.value.RoleName == '管理员') {
      wx.showModal({
        title: '提示',
        content: '管理员为默认权限，不能编辑、删除、添加',
      })
      return;
    }
    //var RoleName = e.detail.value.RoleName；
    var ids = new Array();
    for (var index in this.data.AuthorArry) {
      var authorArryItem = this.data.AuthorArry[index]
      for (var index1 in authorArryItem.listAuthor) {
        var listAuthorItem = authorArryItem.listAuthor[index1]
        if (listAuthorItem.AuthorIcons) {
          ids.push(listAuthorItem.AuthorId)
        }
      }
    }
    var AuthorIds = ids.join(",");
    var that =this;
    var acti=0;
    if (that.switch1){
      acti=1;
    }
    else{
      acti=0;
    }
    wx.request({
      url: that.data.durl +'/api/Sys/Role/AddRole',
      data: {
        RoleName: e.detail.value.RoleName,
        CompanyId: that.data.companyId,
        IsActive: acti,
        AuthorId: AuthorIds
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (ress) {
        if (ress.data.code == 100) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: ress.data.msg,
          })
        }
      },
      fail: function () {
        console.log("no");
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})