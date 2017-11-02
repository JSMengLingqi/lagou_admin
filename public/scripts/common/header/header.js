var Header = function (activeIndex, container) {
  this.container = container ? this.container : $('body')
  this.activeIndex = activeIndex ? activeIndex : 0
  this.init()
}

Header.template = `
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle" data-toggle="collapse" data-target="#response-navbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a href="/" class="navbar-brand">拉勾网管理系统</a>
      </div>
      <div class="collapse navbar-collapse" id="response-navbar">
        <ul class="nav navbar-nav" id="nav-list">
          <li <% if(index == 0){ %>class="active"<% } %>>
            <a href="/">首页</a>
          </li>
          <li <% if(index == 1){ %>class=""<% } %>>
            <a href="/position">职位管理</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right <%= login ? 'hide' : ''%>">
          <li><a href="#" data-toggle="modal" data-target="#signin-modal">登录</a></li>
          <li><a href="#" data-toggle="modal" data-target="#signup-modal">注册</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right <%= login ? '' : 'hide'%>">
          <li><a href="#">你好，<span id="js-username"></span></a></li>
          <li id="js-logout"><a href="#">注销</a></li>
        </ul>
      </div>
    </div>
  </nav>
`

$.extend(Header.prototype, {
  init: function () {
    this.createDom()
  },
  createDom: function () {
    this.element = new EJS({text: Header.template}).render({
      index: this.activeIndex,
      login: false
    })
    this.container.prepend(this.element)

    // 构建注册 dialog
    new SignUp()
    new SignIn()
  }
})
