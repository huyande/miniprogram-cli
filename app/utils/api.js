const request = require('./request')
const appId = "wx39c968004e613ebb"; //微信小程序 appid
module.exports.login = function(param){
    return request.get(`wx/user/${appId}/login`,param)
}

module.exports.saveUser = function(param){
    return request.post(`wx/user/${appId}/saveUser`,param)
}