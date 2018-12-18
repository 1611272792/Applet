// pages/editrolemanager/editrolemanager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    RoleIdArry: [],
    switch1: false,
    RoleName:''//角色名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'RoleId',
      success: function (resc) {
        console.log(resc.data);
        wx.request({
          url: that.data.durl + '/api/Sys/Role/GetAuthorInfo',
          method: "GET",
          data: {
            RoleId: resc.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resd) {
            console.log("aaa:" + resd.data);
            if (resd.data.code == "100") {
              
              for (var i = 0; i < resd.data.data.length;i++){

                for (var ii = 0; ii < resd.data.data[i].listAuthor.length; ii++){
                  resd.data.data[i].listAuthor[ii].AuthorIcons = resd.data.data[i].listAuthor[ii].AuthorContian==0?true:false;
                }
              }
              if (resd.data.data[0].IsActive == 0) {
                that.setData({
                  RoleIdArry: resd.data.data,
                  switch1: resd.data.data[0].IsActive == 0 ? true : false
                })
              }
              else {
                that.setData({
                  RoleIdArry: resd.data.data,
                  switch1: false
                })
              }
              that.setData({
                RoleName : resd.data.data[0].AuthName
              })

            }
            else {
              wx.showModal({
                title: '提示',
                content: resd.data.msg,
              })
            }

          },
          fail: function () {
            console.log("fail");
          }
        })
      },
    })

  },
  onChange(event) {
    var that = this;
    var detail = event.detail;
    console.log("改变：" + detail.value);
    console.log("sss:" + event.currentTarget.dataset.authid);
    // var arryAuthor = new arryAuthor();
    // arryAuthor[] = detail.value;
    // AuthorID = ;
    if (detail.value) {
      for (var index in that.data.RoleIdArry) {
        var authorArryItem = that.data.RoleIdArry[index]
        for (var index1 in authorArryItem.listAuthor) {
          var listAuthorItem = authorArryItem.listAuthor[index1]
          if (listAuthorItem.AuthorId == event.currentTarget.dataset.authid) {
            that.data.RoleIdArry[index].listAuthor[index1].AuthorIcons = true;
            that.data.RoleIdArry[index].listAuthor[index1].AuthorContian = 0;
          }
        }
      }
    } else {
      for (var index in that.data.RoleIdArry) {
        var authorArryItem = that.data.RoleIdArry[index]
        for (var index1 in authorArryItem.listAuthor) {
          var listAuthorItem = authorArryItem.listAuthor[index1]
          if (listAuthorItem.AuthorId == event.currentTarget.dataset.authid) {
            that.data.RoleIdArry[index].listAuthor[index1].AuthorIcons = false;
            that.data.RoleIdArry[index].listAuthor[index1].AuthorContian = 1;
          }
        }
      }
    }
    that.setData({
      RoleIdArry: that.data.RoleIdArry

    })
  },
  onChange2(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })
  },
  formSubmit: function (e) {
    var RoleId = e.detail.value.RoleId;
    if (e.detail.value.RoleId =="cjglycjgly"){
      wx.showModal({
        title: '提示',
        content: '超级管理员不能编辑和修改',
      })
      return;
    }
    if (e.detail.value.RoleId == '') {
      wx.showModal({
        title: '提示',
        content: 'RoleId为空，不能编辑',
      })
      return;
    }
    // console.log(e.detail.value.RoleName);
    if (e.detail.value.RoleName == '') {
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
    for (var index in this.data.RoleIdArry) {
      var authorArryItem = this.data.RoleIdArry[index]
      for (var index1 in authorArryItem.listAuthor) {
        var listAuthorItem = authorArryItem.listAuthor[index1]
        if (listAuthorItem.AuthorIcons) {
          ids.push(listAuthorItem.AuthorId)
        }
      }
    }
    var AuthorIds = ids.join(",");
    var that = this;
    var acti = 0;
    if (that.data.switch1) {
      acti = 0;//有效
    }
    else {
      acti = 1;//无效
    }
    wx.request({
      url: that.data.durl + '/api/Sys/Role/UpdRole',
      data: {
        RoleId: RoleId,
        RoleName: e.detail.value.RoleName,

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