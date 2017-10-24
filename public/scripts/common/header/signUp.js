var SignUp = function (container) {
  this.container = container ? this.container : $('body')
  this.init()
}

SignUp.templete = ``

$.extend(SignUp.prototype, {
  init: function () {
    this.createDom()
  },
  createDom: function () {

  }
})
