// pages/bonusseldata/bonusseldata.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0', value: '个人', checked: 'true' },
      { name: '1', value: '部门' }
    ],
    inputShowed: false,
    inputVal: "",//点击结果项之后替换到文本框的值
    inputShoweds: false,
    inputVals: "",//点击结果项之后替换到文本框的值
    show: true,
    show2: false,
    GdetailData: {},
    DdetailData: {},
    radio: 0,
    inputName: '',
    inputNames: '',
    adapterSource: [], //本地匹配源
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    ShowTop: false,
    adapterSources: [], //本地匹配源
    bindSources: [], //绑定到页面的数据，根据用户输入动态变化
    ShowTops: false,
    durl: app.globalData.ddurl,
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    // this.setData({
    //   inputVal: "",
    //   inputShowed: false
    // });
    var that = this;
    var inputName = this.data.inputName;
    var GdetailData = this.data.GdetailData;
    // var DdetailData = this.data.DdetailData;

    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        if (inputName == "") {
          //所有
          wx.request({
            url: that.data.durl+'/api/Bos/BonusDataQuery/GetAllBonusData',
            method: "GET",
            data: {
              CompanyId: resc.data,
              Biao: 0
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (resd) {
              //  console.log(resd.data);
              that.setData({
                GdetailData: resd.data.data
              })
            },
            fail: function () {
              console.log("fail");
            }
          })
        }
        else {
          //人员
          wx.request({
            url: that.data.durl +'/api/Bos/BonusDataQuery/GetAllBonusData',
            data: {
              OpneIdOrDepId: inputName,
              CompanyID: resc.data,
              Biao: 0
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (resd) {
              //console.log(resd.data);
              that.setData({
                GdetailData: resd.data.data
              })
            },
            fail: function () {
              console.log("no");
            }
          })
        }
      },
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    // this.setData({
    //   inputVal: e.detail.value
    // });

    var that = this;
    var ShowTop = this.data.ShowTop;
    var bindSource = this.data.bindSource;
    var prefix = e.detail.value.toLowerCase(); //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              // console.log("123:" + e);
              wx.request({
                url: that.data.durl +'/api/Sys/PinYin/GetUserName',
                data: {
                  pinyin: e,
                  CompanyId: resc.data
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  // console.log(res.data.data);
                  e = res.data.data;

                  newSource.push(e);
                  if (newSource.length != 0) {
                    that.setData({
                      bindSource: newSource,
                      ShowTop: true
                    })
                  }
                  else {
                    that.setData({
                      bindSource: [],
                      ShowTop: false
                    })
                  }
                },
                fail: function () {
                  console.log("no");
                }
              })
            },
          })
          // newSource.push(e)
        }
      })
    }
    else {
      that.setData({
        bindSource: [],
        ShowTop: false
      })
    }
  },
  itemtap: function (e) {
    var ShowTop = this.data.ShowTop;
    // var inputVal = this.data.inputVal;
    // var inputName = this.data.inputName;
    this.setData({
      inputVal: e.target.id.split(',')[0],
      inputName: e.target.id.split(',')[1],
      bindSource: [],
      ShowTop: false,
    })
  },
  itemtaps: function (e) {
    this.setData({
      inputVals: e.target.id.split(',')[1],
      inputNames: e.target.id.split(',')[0],
      bindSources: [],
      ShowTops: false
    })
  },
  showInputs: function () {
    this.setData({
      inputShoweds: true
    });
  },
  hideInputs: function () {
    // this.setData({
    //   inputVals: "",
    //   inputShoweds: false
    // });
    var that = this;
    var inputNames = this.data.inputNames;
    //var GdetailData = this.data.GdetailData;
    var DdetailData = this.data.DdetailData;

    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        if (inputNames == "") {
          //所有
          wx.request({
            url: that.data.durl +'/api/Bos/BonusDataQuery/GetAllBonusData',
            method: "GET",
            data: {
              CompanyId: resc.data,
              Biao: 1
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (resd) {
              //  console.log(resd.data);
              that.setData({
                DdetailData: resd.data.data
              })
            },
            fail: function () {
              console.log("fail");
            }
          })
        }
        else {
          //人员
          wx.request({
            url: that.data.durl +'/api/Bos/BonusDataQuery/GetAllBonusData',
            data: {
              OpneIdOrDepId: inputNames,
              CompanyID: resc.data,
              Biao: 1
            },
            method: "GET",
            header: {
              'content-type': 'application/json'
            },
            success: function (resd) {
              //console.log(resd.data);
              that.setData({
                DdetailData: resd.data.data
              })
            },
            fail: function () {
              console.log("no");
            }
          })
        }
      },
    })
  },
  clearInputs: function () {
    this.setData({
      inputVals: ""
    });
  },
  inputTypings: function (e) {
    // this.setData({
    //   inputVals: e.detail.value
    // });
    var that = this;
    var ShowTops = this.data.ShowTops;
    var prefix = e.detail.value.toLowerCase(); //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.adapterSources.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              wx.request({
                url: that.data.durl +'/api/Sys/PinYin/GetDepName',
                data: {
                  DepName: e,
                  CompanyId: resc.data
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  e = res.data.data;

                  newSource.push(e);
                  if (newSource.length != 0) {
                    that.setData({
                      bindSources: newSource,
                      ShowTops: true
                    })
                  }
                  else {
                    that.setData({
                      bindSources: [],
                      ShowTops: false
                    })
                  }
                },
                fail: function () {
                  console.log("no");
                }
              })
            },
          })
          // newSource.push(e)
        }
      })
    }
    else {
      that.setData({
        bindSources: [],
        ShowTops: false
      })
    }
  },
  radioChange: function (e) {
    var that = this;
    var show = this.data.show;
    var show2 = this.data.show2;
    var radio = this.data.radio;
    var GdetailData = this.data.GdetailData;
    var DdetailData = this.data.DdetailData;
    this.setData({
      radio: e.detail.value
    })
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl +'/api/Bos/BonusDataQuery/GetAllBonusData',
          method: "GET",
          data: {
            CompanyId: resc.data,
            Biao: e.detail.value
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resd) {
            if (e.detail.value == 1) {
              that.setData({
                DdetailData: resd.data.data
              })
            }
            else {
              that.setData({
                GdetailData: resd.data.data
              })
            }
          },
          fail: function () {
            console.log("fail");
          }
        })
      },
    })
    if (e.detail.value == 1) {
      this.setData({
        show: false,
        show2: true,
      })
    }
    else {
      this.setData({
        show: true,
        show2: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  UserClickOne: function (e) {
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../bonusseldataUse/bonusseldataUse?openid=' + e.currentTarget.id,
    })
  },
  DepClickOne: function (e) {
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../bonusseldataDep/bonusseldataDep?depid=' + e.currentTarget.id,
    })
  },
  onLoad: function (options) {
    var that = this;

    var inputVal = this.data.inputVal;
    var adapterSource = this.data.adapterSource;
    var ShowTop = this.data.ShowTop;

    var inputVals = this.data.inputVals;
    var adapterSources = this.data.adapterSources;
    var ShowTops = this.data.ShowTops;

    var GdetailData = this.data.GdetailData;

    //查询本地匹配数据源
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl +'/api/Sys/PinYin/GetDepPY',
          method: "GET",
          data: {
            CompanyId: resc.data
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //  console.log(res.data.data);
            that.setData({
              adapterSources: res.data.data,
              ShowTops: true
            })
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })



    //查询本地匹配数据源
    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl+'/api/Sys/PinYin/GetPinYin',
          method: "GET",
          data: {
            CompanyId: resc.data,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data.data);
            that.setData({
              adapterSource: res.data.data,
              ShowTop: true
            })
          },
          fail: function () {
            console.log("no");
          }
        })
      },
    })

    wx.getStorage({
      key: 'CompanyId',
      success: function (resc) {
        wx.request({
          url: that.data.durl+'/api/Bos/BonusDataQuery/GetAllBonusData',
          method: "GET",
          data: {
            CompanyId: resc.data,
            Biao: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (resd) {
            //  console.log(resd.data);
            that.setData({
              GdetailData: resd.data.data
            })
          },
          fail: function () {
            console.log("fail");
          }
        })
      },
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