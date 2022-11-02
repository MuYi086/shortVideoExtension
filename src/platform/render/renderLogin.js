const renderLogin = function () {
  return '<div id="loginWrap">' +
    ' <div class="inner">' +
    '   <form class="form-wrap" role="form">' +
    '	    <div class="input-group">' +
    '		    <span class="input-group-addon">用户名</span>' +
    '		    <input id="login-username" type="text" class="form-control" value="">' +
    '	    </div>' +
    '	    <br>' +
    '	    <div class="input-group">' +
    '		    <span class="input-group-addon">密码</span>' +
    '		    <input id="login-password" type="text" class="form-control" value="">' +
    '	    </div>' +
    '	    <br>' +
    '	    <div id="btn-wrapper" class="btn-group">' +
    '		    <button type="button" class="btn btn-default btn-login">登录</button>' +
    '	    </div>' +
    '   </form>' +
    '  </div>' +
    '</div>'
}
module.exports = renderLogin