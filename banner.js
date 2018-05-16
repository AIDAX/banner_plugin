(function () {
  var log_impression = function (title, has_clicked, cost, cost_type, elem) {
    var obj = {
      cost_type: cost_type,
      cost: cost,
      clicked: has_clicked
    }
    if (window.ax) {
      return window.ax({
        id: 'banner' + (has_clicked ? '_clicked' : '') + ':' + title,
        properties: obj
      })
    }
  }

  var win = window,
    doc = document,
    docElem = doc && doc.documentElement,
    viewportW = function () {
      var a = docElem.clientWidth,
        b = win.innerWidth
      return a < b ? b : a
    },
    viewportH = function () {
      var a = docElem.clientHeight,
        b = win.innerHeight
      return a < b ? b : a
    },
    calibrate = function (coords, cushion) {
      var o = {}
      cushion = +cushion || 0
      o.width =
        (o.right = coords.right + cushion) - (o.left = coords.left - cushion)
      o.height =
        (o.bottom = coords.bottom + cushion) - (o.top = coords.top - cushion)
      return o
    },
    rectangle = function (el, cushion) {
      el = el && !el.nodeType ? el[0] : el
      if (!el || el.nodeType !== 1) {
        return false
      }
      return calibrate(el.getBoundingClientRect(), cushion)
    },
    inViewport = function (el, cushion) {
      var r = rectangle(el, cushion)
      return (
        !!r &&
        r.bottom >= 0 &&
        r.right >= 0 &&
        r.top <= viewportH() &&
        r.left <= viewportW()
      )
    }
  var send_impression = function (elem, attr, clicked) {
    elem.className = elem.className + ' ax-tracked'
    var title = elem.getAttribute(attr),
      cost = elem.getAttribute('data-ax-content-cost'),
      cost_type = elem.getAttribute('data-ax-content-cost-type')
    if (title) {
      log_impression(title, clicked, cost, cost_type, elem)
    }
  }
  setInterval(function () {
    var banners = doc.querySelectorAll(
        '[data-ax-content-view]:not(.ax-tracked)'
      )
    for (var i = 0, j = banners.length; i < j; i++) {
      if (inViewport(banners[i], -100)) {
        send_impression(banners[i], 'data-ax-content-view', false)
      }
    }
  }, 500)
  document.addEventListener('click', function (e) {
    var self = e.target
    if (self.matches('[data-ax-content-click]:not(.ax-tracked)')) {
      send_impression(self, 'data-ax-content-click', true)
      if (self.nodeName === 'A') {
        setTimeout(function () {
          var target = self.getAttribute('target'),
            href = self.getAttribute('href')
          if (target) {
            window.open(href, target)
          } else {
            window.location = href
          }
        }, 300)
        return false
      }
      return true
    }
  })
}())
