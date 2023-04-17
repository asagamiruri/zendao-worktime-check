import { GM_notification } from '$'

const xhrOverwrite = () => {
  // 重写xhr的原型方法
  // var originXhr = window.XMLHttpRequest.prototype
  // var originOpen = originXhr.open
  // var originSend = originXhr.send
  // originXhr.open = function () {
  //   this.url = arguments[1] // 获取请求的url
  //   return originOpen.apply(this, arguments)
  // }
  // originXhr.send = function () {
  //   this.addEventListener('load', function () {
  //     if (this.url.includes('someUrl')) {
  //       // 判断是否是需要获取的url
  //       console.log(this.responseText) // 获取返回结果
  //     }
  //   })
  //   return originSend.apply(this, arguments)
  // }

  // 使用代理对象
  var originXhr = window.XMLHttpRequest
  window.XMLHttpRequest = new Proxy(originXhr, {
    construct(target, args) {
      var xhr = new target(...args)
      xhr.addEventListener('load', function () {
        if (this.responseURL.includes('message-ajaxGetMessage')) {
          // 判断是否是需要获取的url
          console.log(this.responseText) // 获取返回结果
          if (this.responseText) {
            GM_notification({
              text: '打开禅道看看',
              title: '有bug了',
              // onclick: () => alert('I was clicked!'),
            })
          }
        }
      })
      return xhr
    },
  })
}

export default xhrOverwrite
