// pages/addrule/addrule.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    BonusItemName: '', //奖金项名字
    BonusItemId: '', //奖金项id
    BonusType: '', //奖金项类型0公司及；1部门级
    DepId: 0, //部门id
    CompanyId: '',
    OpenId: '' //登陆进来的openid,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      CompanyId: wx.getStorageSync('CompanyId'),
      OpenId: wx.getStorageSync('openid'),
    })
    //奖金项名称
    wx.getStorage({
      key: 'BonusItemName',
      success: function(res) {
        that.setData({
          BonusItemName: res.data
        })
      }
    })
    //奖金项id
    wx.getStorage({
      key: 'BonusItemId',
      success: function(resc) {
        that.setData({
          BonusItemId: resc.data
        });

      }
    })
    //奖金类型0公司及；1部门级
    wx.getStorage({
      key: 'BonuType',
      success: function(resc) {
        that.setData({
          BonusType: resc.data
        })
      }
    });
    //部门id
    wx.getStorage({
      key: 'DpId',
      success: function(resc) {
        that.setData({
          DepId: resc.data
        });

      }
    });
  },
  //提交
  formSubmit: function(e) {
    var that = this;
    if (e.detail.value.BRName == "") {
      wx.showModal({
        title: '提示',
        content: '规则名称必填',
      })
    } else if (e.detail.value.RemainNum == "") {
      wx.showModal({
        title: '提示',
        content: '刨除人数必填',
      })
    } else if (parseInt(e.detail.value.RemainNum) < 0) {
      wx.showModal({
        title: '提示',
        content: '刨除人数不能小于0',
      })
    } else if (e.detail.value.AvgMoney == "") {
      wx.showModal({
        title: '提示',
        content: '平均受益金额必填',
      })
    } else if (parseInt(e.detail.value.AvgMoney) < 0) {
      wx.showModal({
        title: '提示',
        content: '平均受益金额不能小于0',
      })
    } else {

      wx.request({
        url: that.data.durl + '/api/Bos/BonusRule/AddBonusRule',
        method: "POST",
        data: {
          BonusItemId: that.data.BonusItemId, //奖金项id
          BRName: e.detail.value.BRName, //规则名称
          OpenId: that.data.OpenId, //openid
          CompanyId: that.data.CompanyId, //公司id
          DepId: that.data.DepId, //部门id
          BItemType: that.data.BonusType,
          RemainNum: e.detail.value.RemainNum, //刨除人数
          AvgMoney: e.detail.value.AvgMoney //平均受益金额

        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(resd) {

          if (resd.data.code == 100) {
            console.log(resd.data.data);
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showModal({
              title: '提示',
              content: resd.data.msg,
            })
          }
        },
        fail: function() {
          console.log("fail");
        }
      })
    }
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