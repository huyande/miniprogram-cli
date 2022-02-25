const envVersion ='develop'
const URL = {
    develop: {
      // BASE_URL: "", //测试域名
      BASE_URL: "http://127.0.0.1:8080/renren-fast/",  //这里写接口的地址前缀
    },
    trial: {
      // BASE_URL: "", //测试域名
      BASE_URL: "", //服务器域名
    },
    release: {
       // BASE_URL: "", //测试域名
      BASE_URL: "", //服务器域名
    }
  }
   
  /**
   * GET请求封装
   */
  function get(url, data = {}) {
    return request(url, 'GET', data)
  }
   
   
   
  /**
   * POST请求封装
   */
  function post(url, data = {}) {
    return request(url, 'POST', data)
  }
   
   
   
  /**
   * @description 上传文件
   * @param {*} url 请求地址
   * @param {*} data 参数
   */
  function upLoad(url, data = {}) {
    return uploadFile(url, 'POST', data)
  }
   
   
  /**
   * 微信的request
   */
  function request(url, method = "GET", data = {}) {
    
    var contentType = method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded; charset=utf-8'   // 这是大部分都是必须携带的。
    var signatureTime = Date.parse(new Date()) / 1000;
    let userInfo = wx.getStorageSync('userInfo')
    
    var header = { 
      'content-Type': contentType,  // 这个应该大部分公司都需要携带在请求头中把
      'timestamp': signatureTime //看个人需求这是我公司需要在请求头携带的参数
    }
    if(userInfo){
      header._openid = userInfo.openid
    }
    // console.log(header);
    return new Promise(function (resolve, reject) {
      wx.request({
        url: URL[envVersion].BASE_URL + url,
        data: data,
        method: method,
        header: header,
        success: function (res) {
          if(res.data.code==401){
            wx.login({
              success: (res) => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(res)
                API.login({code:res.code}).then(res=>{
                  if(!res.is_has){
                    wx.switchTab({
                      url: `/pages/mine/mine`
                    })
                    this.globalData.openid=res.session.openid
                    this.globalData.sessionKey=res.session.sessionKey
                  }else{
                    wx.setStorageSync('userInfo', res.userInfo)
                  }
                })
              }
            });
          }
          resolve(res.data)
        },
        fail: function (err) {
          //服务器连接异常
          reject(err, "服务器连接异常，请检查网络再试")
        },
      })
    });
  }
   
  // 接口暴露出去 完活。。
  module.exports = {
    request,
    get,
    post,
    URL,
  }