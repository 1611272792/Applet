// pages/usermanager/usermanager.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    durl: app.globalData.ddurl,
    DepArry: [],
    Depitems: [],
    UserArry: [
    ],//用户数据
    items: [],
    inputShowed: false,
    show: true,
    ShowTop:false,
    IsYou: false,//是否有要进入我们公司的人
    adapterSource: [], //本地匹配源
    icon: '../../src/image/depart.png',
    companyId: ''
  },
  //得到要进到我们公司的人
  SelectUser: function (e) {
    wx.navigateTo({
      url: '../SelectUsers/SelectUsers',
    })

  },
  //通过部门得到人员
  DepartClick: function (e) {
    console.log("点击部门");
    var that = this;
    // var items = this.data.DepArry;
    var departID = e.currentTarget.dataset.dip;
    var Pid = e.currentTarget.dataset.pid
    wx.request({
      url: that.data.durl + '/api/Sys/User/GetDepUserInfo',
      data: {
        CompanyId: that.data.companyId,
        DepId: departID
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        if(resd.data.code=="100"){
          
          //部门

          var UserArry = new Array();
          //人员
          if (resd.data.data1!=null){
            for (var i = 0; i < resd.data.data1.length; i++) {
              UserArry.push({
                UserName: resd.data.data1[i].UserName,
                UserNum: 0,
                UserId: resd.data.data1[i].OpenId,
                Photo: that.data.durl + resd.data.data1[i].Photo,
                isTouchMove: false //默认全隐藏删除
              })
            }
          }
         
          that.setData({
            DepArry: resd.data.data,
            items: UserArry
          });
        }
        else{
          that.setData({
            DepArry: resd.data.data,
            items: null
          });
        }
        
      },
      fail: function () {
        console.log("no");
      }
    })


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
            url: that.data.durl + '/api/Bos/BonusDataQuery/GetAllBonusData',
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
            url: that.data.durl + '/api/Bos/BonusDataQuery/GetAllBonusData',
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
                url: that.data.durl + '/api/Sys/PinYin/GetUserName',
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
    var EditopenId = e.target.id.split(',')[1];
    wx.setStorage({
      key: 'EditopenId',
      data: EditopenId,
    })
    wx.navigateTo({
      url: '../usermanager/updateusermanager',
    })
  },
 
  //人员编辑
  UserEdit: function (e) {
    wx.navigateTo({
      url: '../usermanager/updateusermanager',
    })
    var Pid = wx.getStorageSync('departID');
    if (this.data.DepArry != null) {
      for (var i = 0; i < this.data.DepArry.length; i++) {
        if (this.data.DepArry[i].DepId == this.data.items[e.currentTarget.dataset.index].DepId) {
          wx.setStorageSync('departID', this.data.DepArry[i].Pid);
        }
      }
    }


    var EditopenId = this.data.items[e.currentTarget.dataset.index].UserId;
    wx.setStorage({
      key: 'EditopenId',
      data: EditopenId,
    })
  },
  //人员删除
  UserDel: function (e) {
    var that = this;
    var UserId = this.data.items[e.currentTarget.dataset.index].UserId;
    wx.showModal({
      title: '删除',
      content: '确定要删除吗？',
      confirmText: "删除",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 删除
          wx.request({
            url: that.data.durl + '/api/Sys/User/DelUser',
            data: {
              OpenId: UserId
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (resd) {
              console.log(resd.data);
              if (resd.data.code == 100) {
                that.data.items.splice(e.currentTarget.dataset.index, 1)
                that.setData({
                  items: that.data.items
                })
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 3000
                });

              } else if (resd.data.code == 104) {
                wx.showModal({
                  title: '提示',
                  content: resd.data.msg,
                })
              }
            },
            fail: function () {
              console.log("no");
            }
          })
        } else {
          //取消
        }
      }
    });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    // //从缓存中得到公司id
    // try {
    //   var comidvalue = wx.getStorageSync('CompanyId')
    //   that.setData({
    //     companyId: comidvalue
    //   })
    // } catch (e) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '公司获取错误:' + e,
    //     success: function (res) {
    //       if (res.confirm) {
    //         //console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         //console.log('用户点击取消')
    //       }
    //     }
    //   })
    // }
    // this.SelectUsers();
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
  },
  SelectUsers: function () {
    var that = this;
    wx.request({
      url: that.data.durl + '/api/Sys/User/GetParList',
      data: {
        CompanyId: that.data.companyId
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        console.log("companyid:"+that.data.companyId);
        console.log("resd.data.code:" + resd.data.code);
        if(resd.data.code=100){
          // for (var i = 0; i < that.data.UserArry.length; i++) {
          //   that.data.items.push({
          //     UserName: that.data.UserArry[i].UserName,
          //     UserNum: 0,
          //     UserId: that.data.UserArry[i].OpenId,
          //     isTouchMove: false //默认全隐藏删除
          //   })

          // }
          var UserArry = new Array();
          //人员
          if(resd.data.data1!=null){
            for (var i = 0; i < resd.data.data1.length; i++) {
              UserArry.push({
                UserName: resd.data.data1[i].UserName,
                UserNum: 0,
                UserId: resd.data.data1[i].OpenId,
                Photo: that.data.durl + resd.data.data1[i].Photo,
                isTouchMove: false //默认全隐藏删除
              })
            }
          }
          
          that.setData({
            DepArry: resd.data.data,
            items: UserArry
          });
        }
        else{
          that.setData({
            DepArry: [],
            items: []
          });
        }
        // console.log('ss' + resd.data.data);
        // for (var i = 0; i < resd.data.data.length; i++) {
        //   that.data.Depitems.push({
        //     DepName: resd.data.data[i].DepName,
        //     UserNum: 0,
        //     DepId: resd.data.data[i].DepId,
        //     isTouchMove: false //默认全隐藏删除
        //   })

        // }

       
      },
      fail: function () {
        console.log("no");
      }
    });
    wx.request({
      url: that.data.durl + '/api/Sys/User/GetWaitUser',
      data: {
        CompanyId: that.data.companyId,
        IsOut: 3
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (resd) {
        console.log('ss' + resd.data);
        if (resd.data.code == 100) {
          that.setData({
            IsYou: resd.data.data.length > 0 ? true : false
          })


        }
        else {
          that.setData({
            IsYou: resd.data.data.length > 0 ? true : false
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
    var that = this;

    //从缓存中得到公司id
    try {
      var comidvalue = wx.getStorageSync('CompanyId')
      that.setData({
        companyId: comidvalue
      })
    } catch (e) {
      wx.showModal({
        title: '提示',
        content: '公司获取错误:' + e,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
    this.SelectUsers();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("返回");
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