// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    roleId:'',//权限id
    menuList: [],//权限菜单
    openid:''//缓存里openid
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
  },
  //跳转页面
  RedirectUrl:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var urls= e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '..' + urls,
    })
    wx.hideLoading();
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
    var that = this;
    //取缓存openid
    try {
      var openidvalue = wx.getStorageSync('openid')
      that.setData({
        openid: openidvalue
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: 'openid获取错误:' + e,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
    //通过openid得到权限id
    wx.request({
      url: that.data.durl + '/api/User/GetUserInfo',
      data: {
        OpenId: that.data.openid,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if (resd.data.code == 100) {
          //通过权限id得到主界面所拥有的功能
          console.log(resd.data.data[0].RoleId);
          wx.request({
            url: that.data.durl + '/api/Sys/Role/GetAuthorInfo',
            data: {
              RoleId: resd.data.data[0].RoleId,
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (resds) {
              if (resds.data.code == 100) {
                for (var i = 0; i < resds.data.data.length; i++) {
                  if (resds.data.data[i].IsActive==0){
                    var a=0;
                    for (var ii = 0; ii < resds.data.data[i].listAuthor.length; ii++) {
                      if (resds.data.data[i].listAuthor[ii].AuthorContian == 0) {
                        resds.data.data[i].IsActive = 0;
                        a++;
                      }
                    }
                    if (a<=0){
                      resds.data.data[i].IsActive=1;
                    }
                  }
                 
                }
                that.setData({
                  menuList: resds.data.data
                })
              }

            },
            fail: function () {
              console.log("no");
            }
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: resd.data.msg,
            success: function (res) {
              if (res.confirm) {
                //console.log('用户点击确定')
              } else if (res.cancel) {
                //console.log('用户点击取消')
              }
            }
          })
        }

      },
      fail: function () {
        console.log("no");
      }
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
  
  }
})