// pages/pricewo/pricewo.js
// const app = getApp()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: "",
    name: "",
    gonghao: "",
    depart: "",
    position: "",//详细信息
    grprice: 0,//个人奖金
    depprice: [],
    bounitem: [],
    impworitem: [],
    durl: app.globalData.ddurl,
    contmsg: [],
    myoa:"",
  },
  OnePrice: function () {
    this.GeRen();
  },
  OnePrices: function () {
    this.GeRen();
  },
  GeRen: function () {
    wx.navigateTo({
      url: '../../pages/onebouns/onebouns',
    })
  },
  grjiaoyi: function () {
    //个人奖金
    var grprice = this.data.grprice;
    if (grprice <= 0) {
      wx.showModal({
        title: '提示',
        content: '您没有可交易的资本',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else {
      //交易
      wx.navigateTo({
        url: '../../pages/onetrans/onetrans?grprice=' + grprice,
      })
    }
  },
  //复制秘钥
  copyText: function (e) {
    // console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var durl = this.data.durl;
    var myoa = this.data.myoa;
    wx.getStorage({
      key: 'openid',
      success: function (resc) {
        wx.request({
          url: that.data.durl + '/api/Bos/Wo/GetMyCompanyInfo',
          data: {
            OpenId: resc.data
          },
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (ress) {
            console.log(ress.data);
            if (ress.data.code=='100'){
              that.setData({
                myoa: ress.data.data[0].CompanyId,
              })
            }
            else if (ress.data.code == '105'){
              wx.showModal({
                title: '提示',
                content: ress.data.msg,
                showCancel: false,
                confirmColor: '#007aff'
              })
              that.setData({
                myoa: null,
              })
            }
            else{
              that.setData({
                myoa: null,
              })
            }
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })

  },
  // 部门提现
  bmtixian: function (e) {
    var that = this;
    if (e.target.dataset.text.Earmoney == 0) {
      wx.showModal({
        title: '提示',
        content: '您没有可提现的金额',
        showCancel: false,
        confirmColor: '#007aff'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认提现？',
        confirmColor: '#007aff',
        cancelColor: '#007aff',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            wx.getStorage({
              key: 'CompanyId',
              success: function (resc) {
                wx.request({
                  url: that.data.durl + '/api/Bos/Wo/GetDepDeposit',
                  data: {
                    CompanyId: resc.data,
                    DepartId: e.target.dataset.text.DepId,
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success: function (ress) {
                    // console.log(ress.data);
                    if (ress.data.code == 100) {
                      wx.showToast({
                        title: '正在审核......',
                        icon: 'loading',
                        success: function () {
                          that.DepartDe()
                        }
                      })
                    }
                    else {
                      wx.showModal({
                        title: '提示',
                        content: ress.data.msg,
                        showCancel: false,
                        confirmColor: '#007aff'
                      })
                    }
                  },
                  fail: function () {
                    console.log("no");
                  }
                })
              },
            })
          } else if (res.cancel) {

          }
        }
      })

    }
  },
  // 部门详情
  DepPrice: function (e) {
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.navigateTo({
          url: '../depbonusdetial/depbonusdetial?departID=' + e.target.id + '&companyId=' + resc.data,
        })
      },
    })
  },
  // 个人提现
  grtixian: function () {
    var that = this;
    var grprice = this.data.grprice;

    if (grprice <= 0) {
      wx.showModal({
        title: '提示',
        content: '您没有可提现的金额',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else {
      wx.showModal({
        title: '提示',
        content: '确认提现？',
        confirmColor: '#007aff',
        cancelColor: '#007aff',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            wx.getStorage({
              key: 'CompanyId',
              success: function (resc) {
                wx.getStorage({
                  key: 'openid',
                  success: function (resop) {
                    wx.request({
                      url: that.data.durl + '/api/Bos/Wo/GetEmpDeposit',
                      data: {
                        OpenId: resop.data,
                        CompanyId: resc.data,
                        Summoney: grprice
                      },
                      method: "GET",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success: function (ress) {
                        //  console.log(ress.data);
                        if (ress.data.code == 100) {
                          wx.showToast({
                            title: '正在审核......',
                            icon: 'loading',
                            duration: 2000,
                            success: function () {
                              that.setData({
                                grprice: 0
                              })
                            }
                          })
                        }
                        else {
                          wx.showModal({
                            title: '提示',
                            content: ress.data.msg,
                            showCancel: false,
                            confirmColor: '#007aff'
                          })
                        }
                      },
                      fail: function () {
                        console.log("no");
                      }
                    })
                  },
                })
              },
            })
          } else if (res.cancel) {

          }
        }
      })

    }
  },
  // 奖金项详情
  itemClick: function (e) {
    wx.navigateTo({
      url: '../../pages/itemdetail/itemdetail?ItemsId=' + e.currentTarget.id,
    })
  },
  //我的奖金项详情
  myitemClick: function (e) {
    wx.navigateTo({
      url: '../../pages/itemdetailwo/itemdetailwo?ItemsId=' + e.currentTarget.id,
    })
  },
  DepartDe: function () {
    var that = this;
    var depprice = this.data.depprice;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            // 查询部门奖金
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetDepBonus',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (resone) {
                //  console.log(resone.data);
                if (resone.data.code == 100) {
                  that.setData({
                    depprice: resone.data.data
                  })
                }
              },
              fail: function () {
                console.log("no");
              }
            })
          },
        })
      },
      fail: function (e) {
        console.log("error");
      }
    })
  },
  //查看详细信息
  FindDetail: function () {
    var that = this;
    var photo = this.data.photo;
    var name = this.data.name;
    var gonghao = this.data.gonghao;
    var depart = this.data.depart;
    var position = this.data.position;
    var grprice = this.data.grprice;
    var depprice = this.data.depprice;
    var bounitem = this.data.bounitem;
    var impworitem = this.data.impworitem;
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.getStorage({
          key: 'openid',
          success: function (res) {
            //查询个人信息
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetEmpInfo',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (ress) {
                //  console.log("comid:" + resc.data)
                //  console.log("openid:" + res.data)
                 console.log(ress.data);
                if (ress.data.code == 100) {
                  var photos = ress.data.data[0].Photo.indexOf('https');
                  // console.log("aa:"+aa);
                  that.setData({
                    name: ress.data.data[0].UserName,
                    gonghao: ress.data.data[0].UserId,
                    depart: ress.data.data[0].DepName,
                    position: ress.data.data[0].PostName
                  })
                  if (photos==-1){
                    that.setData({
                      photo: that.data.durl +ress.data.data[0].Photo,
                    })
                  }
                  else{
                    that.setData({
                      photo: ress.data.data[0].Photo,
                    })
                  }
                  
                } else {
                  wx.showModal({
                    title: '提示',
                    content: ress.data.msg,
                    showCancel: false,
                    confirmColor: '#007aff'
                  })
                }
              },
              fail: function () {
                console.log("no");
              }
            })
            //查询个人奖金
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetEmpBonus',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (resone) {
                // console.log(resone.data)
                that.setData({
                  grprice: resone.data.data[0].bonus
                })
              },
              fail: function () {
                console.log("no");
              }
            })
            // 查询部门奖金
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetDepBonus',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (resone) {
                //  console.log(resone.data);
                // console.log(resone.data.data);
                if (resone.data.code == 100) {
                  that.setData({
                    depprice: resone.data.data
                  })
                }
                else {
                  // wx.showModal({
                  //   title: '提示',
                  //   content: resone.data.msg,
                  //   showCancel: false,
                  //   confirmColor: '#007aff'
                  // })
                }
              },
              fail: function () {
                console.log("no");
              }
            })
            //获取奖金项
            wx.request({
              url: that.data.durl + '/api/Bos/Wo/GetItemsBonus',
              data: {
                OpenId: res.data,
                CompanyId: resc.data
              },
              method: "GET",
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (resone) {
                // console.log(resone.data);
                that.setData({
                  bounitem: resone.data.data,//被授权的
                  impworitem: resone.data.data1//自己负责的
                })
              },
              fail: function () {
                console.log("no");
              }
            })
          },
        })
      },
      fail: function (e) {
        console.log("sadfsad");
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
    this.FindDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onHide")
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