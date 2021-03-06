// pages/ideaback/ideaback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 200,
    currentlength: 0,
    files: [],//第二种
    showAdd: true,
    countryCodes: ["手机号", "邮箱"],
    countryCodeIndex: 0,
    durl: app.globalData.ddurl,
  },
  //下拉选择
  bindCountryCodeChange: function (e) {
    //  console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  //富文本输入
  TextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor >= 200) {
      wx.showModal({
        title: '提示',
        content: '不可超过200',
      })
    }
    else {
      var currentlength = this.data.currentlength;
      that.setData({
        currentlength: e.detail.cursor
      })
    }
  },
  //选择图片
  chooseImage: function (e) {
    var that = this;
    var showAdd = that.data.showAdd;
    if (this.data.files.length >= 3) {
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
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var files_data = that.data.files;
        var showAdd = that.data.showAdd;

        for (var i = 0; i < tempFilePaths.length; i++) {
          if (that.data.files.length < 3) {
            files_data.push(tempFilePaths[i]);
          }
        }
        that.setData({
          files: files_data
        });
        if (files_data.length >= 3) {
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
  //预览图片
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
    if (files.length > 3) {
      this.setData({
        showAdd: false
      });
    }
    else {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //提交
  formSubmit: function (e) {
    var that = this;
    var filecd = this.data.files.length;
    var countryCodeIndex = this.data.countryCodeIndex;
    var imgname = "";
    var a = 0;
    var regphone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var regemail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (e.detail.value.ResonContent == "") {
      wx.showModal({
        title: '提示',
        content: '问题描述不能为空',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: '联系方式必填',
        showCancel: false,
        confirmColor: '#007aff'
      })
    }
    else {
      if (countryCodeIndex == 0) {
        //手机
        if (!regphone.test(e.detail.value.phone)) {
          wx.showModal({
            title: '提示',
            content: '手机号格式不正确',
            showCancel: false,
            confirmColor: '#007aff'
          })
        }
        else {
          //提交
          if (filecd == 0) {
            wx.getStorage({
              key: 'openid',
              success: function (resop) {
                wx.getStorage({
                  key: 'CompanyId',
                  success: function (resc) {
                    wx.request({
                      url: that.data.durl+'/api/Bos/Wo/AddSuggest',
                      data: {
                        SugContent: e.detail.value.ResonContent,
                        // SugImage: "",
                        lxType: e.detail.value.phone,
                        OpenId: resop.data,
                        ImageCount: 0,
                        CompanyId: resc.data
                      },
                      method: "POST",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success: function (ress) {
                        // console.log(ress.data);
                        if (ress.data.code == 100) {
                          wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 3000
                          });
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
                  },
                })

              },
            })
          }
          else {
            for (var i = 0; i < this.data.files.length; i++) {
              wx.uploadFile({
                url: that.data.durl +'/api/Bos/SendBonus/SaveImg',
                filePath: that.data.files[i],
                name: 'uploadfile_ant',
                header: { 'content-type': 'multipart/form-data' },
                success: function (res) {
                  a++;
                  var data = res.data
                  imgname += data + ",";
                  if (a == filecd) {
                    // console.log(imgname.substr(0, imgname.length - 1))
                    wx.getStorage({
                      key: 'openid',
                      success: function (resop) {
                        wx.getStorage({
                          key: 'CompanyId',
                          success: function (resc) {
                            wx.request({
                              url: that.data.durl +'/api/Bos/Wo/AddSuggest',
                              data: {
                                SugContent: e.detail.value.ResonContent,
                                SugImage: imgname.substr(0, imgname.length - 1),
                                lxType: e.detail.value.phone,
                                OpenId: resop.data,
                                ImageCount: filecd,
                                CompanyId: resc.data
                              },
                              method: "POST",
                              header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                              },
                              success: function (ress) {
                                // console.log(ress.data);
                                if (ress.data.code == 100) {
                                  wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 3000
                                  });
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
                          },
                        })

                      },
                    })
                  }
                },
                formData: null,
                fail: function () {
                  console.log("error");
                }
              })

            }
          }
        }
      }
      else if (countryCodeIndex == 1) {
        //邮箱
        if (!regemail.test(e.detail.value.phone)) {
          wx.showModal({
            title: '提示',
            content: '邮箱格式不正确',
            showCancel: false,
            confirmColor: '#007aff'
          })
        }
        else {
          //提交
          if (filecd == 0) {
            wx.getStorage({
              key: 'openid',
              success: function (resop) {
                wx.getStorage({
                  key: 'CompanyId',
                  success: function (resc) {
                    wx.request({
                      url: that.data.durl +'/api/Bos/Wo/AddSuggest',
                      data: {
                        SugContent: e.detail.value.ResonContent,
                        // SugImage: "",
                        lxType: e.detail.value.phone,
                        OpenId: resop.data,
                        ImageCount: 0,
                        CompanyId: resc.data
                      },
                      method: "POST",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success: function (ress) {
                        // console.log(ress.data);
                        if (ress.data.code == 100) {
                          wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 3000
                          });
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
                  },
                })

              },
            })
          }
          else {
            for (var i = 0; i < this.data.files.length; i++) {
              // console.log(that.data.files[i]);
              wx.uploadFile({
                url: that.data.durl +'/api/Bos/SendBonus/SaveImg',
                filePath: that.data.files[i],
                name: 'uploadfile_ant',
                header: { 'content-type': 'multipart/form-data' },
                success: function (res) {
                  a++;
                  var data = res.data
                  //do something
                  // console.log(data);          
                  imgname += data + ",";
                  // console.log(a); 
                  if (a == filecd) {
                    // console.log(imgname.substr(0, imgname.length-1))
                    wx.getStorage({
                      key: 'openid',
                      success: function (resop) {
                        wx.getStorage({
                          key: 'CompanyId',
                          success: function (resc) {
                            wx.request({
                              url: that.data.durl +'/api/Bos/Wo/AddSuggest',
                              data: {
                                SugContent: e.detail.value.ResonContent,
                                SugImage: imgname.substr(0, imgname.length - 1),
                                lxType: e.detail.value.phone,
                                OpenId: resop.data,
                                ImageCount: filecd,
                                CompanyId: resc.data
                              },
                              method: "POST",
                              header: {
                                'content-type': 'application/x-www-form-urlencoded' // 默认值
                              },
                              success: function (ress) {
                                // console.log(ress.data);
                                if (ress.data.code == 100) {
                                  wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 3000
                                  });
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
                          },
                        })

                      },
                    })
                  }
                },
                formData: null,
                fail: function () {
                  console.log("no");
                }
              })

            }
          }
        }
      }
    }

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