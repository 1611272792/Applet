// pages/company/company.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begindate: "", //时间
    enddate: "",
    files: [], //第二种
    showAdd: true,
    comlogo: "", //头像
    shows1: true,
    shows2: false,
    companys: [], //公司信息
    danji: 0,
    inputValue: '', //点击结果项之后替换到文本框的值
    inputName: '',
    adapterSource: [], //本地匹配源
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    ShowTop: false,
    durl: app.globalData.ddurl,
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
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that = this;
    var ShowTop = this.data.ShowTop;
    var prefix = e.detail.value.toLowerCase(); //用户实时输入值
    var newSource = [] //匹配的结果
    if (prefix != "") {
      this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {
          //通过拼音简写找出名字
          wx.getStorage({
            key: 'CompanyId',
            success: function (resc) {
              wx.request({
                url: that.data.durl+'/api/Sys/PinYin/GetUserName',
                data: {
                  pinyin: e,
                  CompanyId: resc.data
                },
                method: "GET",
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  e = res.data.data;
                  //console.log(res.data.data);
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
    this.setData({
      inputValue: e.target.id.split(',')[0],
      inputName: e.target.id.split(',')[1],
      bindSource: [],
      ShowTop: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var comlogo = this.data.comlogo;
    var begindate = this.data.begindate;
    var enddate = this.data.enddate;
    var inputValue = this.data.inputValue;
    var adapterSource = this.data.adapterSource;
    var ShowTop = this.data.ShowTop;
    //查询本地匹配数据源
    wx.getStorage({
      key: 'openid',
      success: function (ress) {
        wx.request({
          url: that.data.durl +'/api/Company/GetCompany',
          data: {
            OpenId: ress.data
          },
          method: "GET",
          header: {
            'content-type': 'application/json'
          },
          success: function (openIdRes) {
            //  console.log(openIdRes.data);
            if (openIdRes.data.code == 100) {
              //把公司ID存储起来
              // wx.setStorage({
              //   key: 'CompanyId',
              //   data: openIdRes.data.data[0].CompanyId,
              // })
              // console.log(that.data.durl + openIdRes.data.data[0].ComPhoto)
              that.setData({
                comlogo: that.data.durl + openIdRes.data.data[0].ComPhoto,
                companys: openIdRes.data.data[0],
                begindate: openIdRes.data.data[0].RegTime,
                enddate: openIdRes.data.data[0].EndTime,
                inputValue: openIdRes.data.data[0].UserName
              })
            } else if (openIdRes.data.code == 104) {
              // wx.navigateTo({
              //   url: '../norole/norole',
              // })
              that.setData({
                companys:[]
              })
            }
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
          url: that.data.durl +'/api/Sys/PinYin/GetPinYin',
          method: "GET",
          data: {
            CompanyId: resc.data
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            // console.log(res.data.data);
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
  formSubmit: function (e) {
    var that = this;
    var inputName = this.data.inputName;
    var files = this.data.files;
    var danji = this.data.danji;
    // console.log(e.detail.value);
    var comname = /^[\u4E00-\u9FA5A-Za-z]+$/; //只能输入中文或英文
    var phone = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/; //手机号
    var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; //邮箱
    if (e.detail.value.CompanyName == "") {
      wx.showModal({
        title: '提示',
        content: '公司名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    } 
    else if (!comname.test(e.detail.value.CompanyName)) {
      wx.showModal({
        title: '提示',
        content: '公司名称只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    } else if (e.detail.value.UserName == "") {
      wx.showModal({
        title: '提示',
        content: '负责人名称必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    } else if (!comname.test(e.detail.value.UserName)) {
      wx.showModal({
        title: '提示',
        content: '负责人名称只能输入中文或英文',
        showCancel: false,
        confirmColor: '#007aff'
      })
      return false;
    } 
     else {
      if (files.length == 0) {
        if (danji == 0) {
          wx.getStorage({
            key: 'openid',
            success: function (resd) {
              var openid = "";
              if (inputName != "") {
                openid = inputName;
              } else {
                openid = resd.data;
              }
              //console.log("openid:" + openid);
              wx.getStorage({
                key: 'CompanyId',
                success: function (resc) {
                  wx.request({
                    url: that.data.durl +'/api/Sys/Company/UpdComNoLog',
                    data: {
                      OpenId: openid,
                      CompanyId: resc.data,
                      CompanyName: e.detail.value.CompanyName,
                      // CompanyPhone: e.detail.value.CompanyPhone,
                      // CompanyEmail: e.detail.value.CompanyEmail
                    }, 
                    header: {
                      'content-type': 'application/json'
                    },
                    method: "POST",
                    success: function (res) {
                      //  console.log(res.data);
                      if (res.data.code == 100) {
                        wx.showToast({
                          title: '成功',
                          icon: 'success',
                          duration: 3000
                        });
                      } else if (res.data.code == 104) {
                        wx.showModal({
                          title: '提示',
                          content: res.data.msg,
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
        } else if (danji == 1) {
          if (files.length == 0) {
            wx.showModal({
              title: '提示',
              content: '选择logo',
              showCancel: false,
              confirmColor: '#007aff'
            })
          } else {
            //上传图片
            wx.getStorage({
              key: 'openid',
              success: function (resd) {
                wx.getStorage({
                  key: 'CompanyId',
                  success: function (resc) {
                    var openid = "";
                    if (inputName != "") {
                      openid = inputName;
                    } else {
                      openid = resd.data;
                    }
                    for (var i = 0; i < that.data.files.length; i++) {
                      wx.uploadFile({
                        url: that.data.durl +'/api/Company/UpdCompany',
                        filePath: that.data.files[i],
                        name: 'image',
                        header: {
                          'content-type': 'multipart/form-data'
                        },
                        formData: {
                          OpenId: openid,
                          CompanyId: resc.data,
                          CompanyName: e.detail.value.CompanyName,
                          // CompanyPhone: e.detail.value.CompanyPhone,
                          // CompanyEmail: e.detail.value.CompanyEmail
                        },
                        success: function (resda) {
                          //do something
                          //console.log(resda.data);
                          var datainfo = JSON.parse(resda.data);
                          if (datainfo.code == 100) {
                            wx.showToast({
                              title: '成功',
                              icon: 'success',
                              duration: 3000
                            });
                          }
                          else {
                            wx.showModal({
                              title: '提示',
                              content: datainfo.msg,
                              showCancel: false,
                              confirmColor: '#007aff'
                            })
                          }
                        },
                        fail: function (e) {
                          console.log(e.data);
                        }
                      })
                    }

                  },
                })
              },
            })
          }
        }

      } else {
        wx.getStorage({
          key: 'openid',
          success: function (resd) {
            wx.getStorage({
              key: 'CompanyId',
              success: function (resc) {
                var openid = "";
                if (inputName != "") {
                  openid = inputName;
                } else {
                  openid = resd.data;
                }
                for (var i = 0; i < that.data.files.length; i++) {
                  wx.uploadFile({
                    url: that.data.durl +'/api/Company/UpdCompany',
                    filePath: that.data.files[i],
                    name: 'image',
                    header: {
                      'content-type': 'multipart/form-data'
                    },
                    formData: {
                      OpenId: openid,
                      CompanyId: resc.data,
                      CompanyName: e.detail.value.CompanyName,
                      // CompanyPhone: e.detail.value.CompanyPhone,
                      // CompanyEmail: e.detail.value.CompanyEmail
                    },
                    success: function (resda) {
                      //do something
                      // console.log(resda.data);
                      var datainfo = JSON.parse(resda.data);
                      if (datainfo.code == 100) {
                        wx.showToast({
                          title: '成功',
                          icon: 'success',
                          duration: 3000
                        })
                      }
                      else {
                        wx.showModal({
                          title: '提示',
                          content: datainfo.msg,
                          showCancel: false,
                          confirmColor: '#007aff'
                        })
                      }
                    },
                    fail: function (e) {
                      console.log(e.data);
                    }
                  })
                }

              },
            })
          },
        })
      }
      //执行提交



    }
  },
  changeBegindate(e) {
    var begindate = this.data.begindate;
    this.setData({
      begindate: e.detail.value
    });
  },
  changeEnddate(e) {
    var enddate = this.data.enddate;
    this.setData({
      enddate: e.detail.value
    });
  },
  chooseImage: function (e) {
    var that = this;
    var showAdd = that.data.showAdd;
    if (this.data.files.length >= 1) {
      this.setData({
        lenMore: 1,
        showAdd: false
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0,
          showAdd: false
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var files_data = that.data.files;
        var showAdd = that.data.showAdd;

        for (var i = 0; i < tempFilePaths.length; i++) {
          if (that.data.files.length < 1) {
            // console.log("123");
            files_data.push(tempFilePaths[i]);
          }
        }
        that.setData({
          files: files_data
        });
        if (files_data.length >= 1) {
          that.setData({
            showAdd: false
          });
        } else {
          that.setData({
            showAdd: true
          });
        }
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var files = this.data.files;
    var showAdd = this.data.showAdd;
    // console.log(files.length);
    if (files.length > 1) {
      this.setData({
        showAdd: false
      });
    } else {
      this.setData({
        showAdd: true
      });
    }
    var index = e.currentTarget.dataset.index;
    files.splice(index, 1);
    this.setData({
      files: files
    });

  },
  deleteImgd: function () {
    var shows1 = this.data.shows1;
    var shows2 = this.data.shows2;
    var danji = this.data.danji;
    this.setData({
      shows1: false,
      shows2: true,
      danji: 1
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