var SignIn = function (container) {
  this.container = container ? this.container : $('body')
  this.init()
}

SignIn.template = `<div class="modal fade" id="siginin-modal">
    <div class="modal-dialog modal-md">
      <div class="modal-header">
        <button data-dismiss="modal" class="close">&times;</button>
        <h4>用户登录</h4>
      </div>
      <div class="modal-body">
        <form action="/api/users/signin" method="post" id="signinform">
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" name="username" value="" class="form-contrl" id="username" placeholder="输入用户名">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="text" name="password" value="" class="form-contrl" id="password" placeholder="输入密码">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="signinsubmit">登录</button>
      </div>
    </div>
  </div>`
$.extend(SignIn.prototype, {
  init: function () {
    this.createDom(),
    this.bindEvents()
  },
  createDom: function () {
    //为什么要用$符号包起来，因为创建一个EJS对象之后，再用$符号封装起来，我们才可以使用find方法
    this.element = $(new EJS({text:SignIn.template}).render({}))
    this.container.append(this.element)

    this.usernameInput = this.element.find('#username')
    this.passwordInput = this.element.find('#password')
  },
  bindEvents: function () {
    let submitBtn = this.element.find('#signinsubmit')
    submitBtn.on('click', $.proxy(this.handleSubmit, this))
  },
  handleSubmit: function () {
    let username = this.usernameInput.val()
    let password = this.passwordInput.val()

    this.sengSignInRequest(username, password)
  },
  sengSignInRequest: function () {
    $.ajax({
      url: 'api/user/signIn',
      type: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: $.proxy(this.handleSigninSucc, this)
    })
  },
  handleSigninSucc: function (res) {
    console.log(res);
  }
})
