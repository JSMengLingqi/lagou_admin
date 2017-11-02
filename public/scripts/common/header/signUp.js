var SignUp = function (container) {
  this.container = container ? this.container : $('body')
  this.init()
}

SignUp.template = `<div class="modal fade" id="signup-modal">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" data-dismiss="modal">&times;</button>
        <h4>用户注册</h4>
      </div>
      <div class="modal-body">
        <form action="" method="post" id="signupform">
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" class="form-control" id="username" name="username" placeholder="输入用户名">
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" id="password" name="password" placeholder="输入密码">
          </div>
          <div class="form-group">
            <label for="confirmpwd">确认密码</label>
            <input type="password" class="form-control" id="confirmpwd" name="confirmpwd" placeholder="再次输入密码">
          </div>
          <div class="form-group">
            <label for="email">确认密码</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="输入email地址">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button id="signupsubmit" class="btn btn-primary">注册</button>
      </div>
    </div>
  </div>
</div>
`

$.extend(SignUp.prototype, {
  init: function () {
    this.createDom()
    this.bindEvents()
  },
  createDom: function () {
    this.element = $(new EJS({text: SignUp.template}).render())
    this.container.append(this.element)
    this.usernameInput = this.element.find('#username')
    this.passwordInput = this.element.find('#password')
    this.confirmpwdInput = this.element.find('#confirmpwd')
    this.emailInput = this.element.find('#email')
  },
  bindEvents: function () {
    let submitBtn = this.element.find('#signupsubmit')
    submitBtn.on('click', $.proxy(this.handleSubmit, this))
  },
  handleSubmit: function () {
    let username = this.usernameInput.val(),
        password = this.passwordInput.val(),
        confirmpwd = this.confirmpwdInput.val(),
        email = this.emailInput.val();
    this.sendSignUpRequest(username, password, email)

  },
  sendSignUpRequest: function (username, password, email) {
    let data = {
      username: username,
      password: password,
      email: email
    }
    $.ajax({
      url: '/api/user/signUp',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=uf-8',
      data: JSON.stringify(data),
      success: $.proxy(this.handleSignUpSuccess, this)
    })
  },
  handleSignUpSuccess: function (res) {
    console.log(res);
    if(res.data.success) {
      alert('注册成功~！')
      this.element.modal('hide')
    } else {
      alert('注册失败，您注册的用户名已经存在')
    }
  }
})
