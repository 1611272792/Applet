// pages/cashexamine/cashexamine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: '0',
        value: '审核',
        checked: 'true'
      },
      {
        name: '1',
        value: '记录'
      }
    ],
    show: true,
    show2: false,
    shenhe: [],
    record: [],
    management_good: true,
    select_all: false,
    auditids: [],
    array: [],
    durl: app.globalData.ddurl,

  },
  PiZhun: function() {
    this.ChooseVal();
    var that = this;
    var array = this.data.array;
    //批准
    var arrid = "";
    for (var i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        arrid += array[i];
      } else {
        arrid += array[i] + ",";
      }
    }
    if (array.length == 0) {
      wx.showModal({
        title: '提示',
        content: '没有可批准的数据',
        showCancel: false,
        confirmColor: '#007aff'
      })
    } else {
      wx.getStorage({
        key: 'openid',
        success: function(resop) {
          wx.request({
            url: that.data.durl+'/api/Bos/AuditBonus/UpdRatify',
            data: {
              SomeAuditBonusID: arrid,
              OpenID: resop.data
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(ress) {
              //  console.log(ress.data);
              if (ress.data.code == 100) {
                wx.showToast({
                  title: '批准成功',
                  icon: 'success',
                  duration: 3000
                });
                that.SelectDetail();
              } else {
                wx.showModal({
                  title: '提示',
                  content: ress.data.msg,
                  showCancel: false,
                  confirmColor: '#007aff'
                })
              }
            },
            fail: function() {
              console.log("no");
            }
          })
        },
      })
    }
  },
  BoHui: function() {
    this.ChooseVal();
    var that = this;
    var array = this.data.array;
    //驳回
    var arrid = "";
    for (var i = 0; i < array.length; i++) {
      if (i == array.length - 1) {
        arrid += array[i];
      } else {
        arrid += array[i] + ",";
      }
    }
    if (array.length == 0) {
      wx.showModal({
        title: '提示',
        content: '没有可驳回的数据',
        showCancel: false,
        confirmColor: '#007aff'
      })
    } else {
      wx.getStorage({
        key: 'openid',
        success: function(resop) {
          wx.request({
            url: that.data.durl +'/api/Bos/AuditBonus/UpdReject',
            data: {
              SomeAuditBonusID: arrid,
              OpenID: resop.data
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(ress) {
              // console.log(ress.data);
              if (ress.data.code == 100) {
                wx.showToast({
                  title: '驳回成功',
                  icon: 'success',
                  duration: 3000
                });
                that.SelectDetail();
              } else {
                wx.showModal({
                  title: '提示',
                  content: ress.data.msg,
                  showCancel: false,
                  confirmColor: '#007aff'
                })
              }
            },
            fail: function() {
              console.log("no");
            }
          })
        },
      })
    }
  },
  // 获取选中的值
  ChooseVal() {
    var shenhe = this.data.shenhe;
    var array = this.data.array;
    array = [];
    if(shenhe==null) return;
    for (var i = 0; i < shenhe.length; i++) {
      if (shenhe[i].checked == true) {
        array.push(shenhe[i].AuditBonusID)
      }
    }
    this.setData({
      array: array
    })
  },
  // 选择
  select: function(e) {
    var that = this;
    var shenhe = this.data.shenhe;
    if (shenhe == null) {

    } else {
      let arr2 = [];
      if (that.data.management_good == false) {
        return;
      } else {
        var arr = that.data.shenhe;
        var index = e.currentTarget.dataset.id;
        arr[index].checked = !arr[index].checked;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].checked) {
            arr2.push(arr[i])
          }
        };
        that.setData({
          shenhe: arr
        })
        // console.log(arr)
      }
    }
  },
  // 全选
  select_all: function() {
    let that = this;
    var shenhe = this.data.shenhe;
    var auditids = this.data.auditids;
    if (shenhe == null) {} else {
      that.setData({
        select_all: !that.data.select_all
      })
      if (that.data.select_all) {
        let arr = that.data.shenhe;
        let arr2 = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].checked == true) {
            arr2.push(arr[i]);
          } else {
            arr[i].checked = true;
            arr2.push(arr[i]);
          }
        }
        that.setData({
          shenhe: arr2
        })
        // console.log(arr)
      }
    }
  },
  // 取消全选
  select_none: function() {
    let that = this;
    var shenhe = this.data.shenhe;

    if (shenhe == null) {} else {
      that.setData({
        select_all: !that.data.select_all
      })
      let arr = that.data.shenhe;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
        arr2.push(arr[i]);
      }
      that.setData({
        shenhe: arr2
      })
    }
  },
  radioChange: function(e) {
    // console.log(e.detail.value);
    if (e.detail.value == 1) {
      this.setData({
        show2: true,
        show: false,
      })
    } else {
      this.setData({
        show2: false,
        show: true,
      })
    }
  },
  ShenheClick: function(e) {
    // console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../../pages/cashsh/cashsh?GetBonusID=' + e.currentTarget.id,
    })
  },
  RecodeClick: function(e) {
    // console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../../pages/cashsh/cashsh?GetBonusID=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



  },
  SelectDetail: function() {
    var that = this;
    var shenhe = this.data.shenhe;
    var record = this.data.record;
    wx.getStorage({
      key: 'CompanyId',
      success: function(resc) {
        //审核
        wx.request({
          url: that.data.durl +'/api/Bos/AuditBonus/GetAuditBonus',
          data: {
            CompanyId: resc.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(ress) {
            // console.log(ress.data);
            that.setData({
              shenhe: ress.data.data
            })
          },
          fail: function() {
            console.log("no");
          }
        })
        //记录
        wx.request({
          url: that.data.durl +'/api/Bos/AuditBonus/GetAuditHistory',
          data: {
            CompanyId: resc.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(ress) {
            // console.log(ress.data);
            that.setData({
              record: ress.data.data
            })
          },
          fail: function() {
            console.log("no");
          }
        })
      },
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
    this.SelectDetail();
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