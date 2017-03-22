
(function () {

  const NS_SVG = 'http://www.w3.org/2000/svg';

  function zdom(target) {
    if(typeof target === 'string') {
      return zdom.select(target);
    } else {
      return target;
    }
  }

  /**
   * Query
   */
  zdom.select = function () {
    var selector;
    if(arguments.length === 1) {
      selector = arguments[0];
      console.assert(typeof selector === 'string');
      return document.querySelector(selector);
    } else if(arguments.length >= 2) {
      var el = arguments[0];
      selector = arguments[1];
      console.assert(typeof el === 'object');
      console.assert(typeof selector === 'string');
      return el.querySelector(selector);
    }
  };

  zdom.selectAll = function () {
    var selector;
    if(arguments.length === 1) {
      selector = arguments[0];
      console.assert(typeof selector === 'string');
      return document.querySelectorAll(selector);
    } else if(arguments.length >= 2) {
      var el = arguments[0];
      selector = arguments[1];
      console.assert(typeof el === 'object');
      console.assert(typeof selector === 'string');
      return el.querySelectorAll(selector);
    }
  };

  /**
   * Creation of standard SVG elements
   */

  zdom.createSVG = function (width, height) {
    var el = zdom.createSVGElement('svg');
    zdom.set(el, 'width', ''+width);
    zdom.set(el, 'height', ''+height);
    return el;
  };

  zdom.createSVGElement = function (tag) {
    return document.createElementNS(NS_SVG, tag);
  };

  zdom.createLine = function (x1, y1, x2, y2, style) {
    var el = document.createElementNS(NS_SVG, 'line');
    zdom.set(el, 'x1', x1);
    zdom.set(el, 'y1', y1);
    zdom.set(el, 'x2', x2);
    zdom.set(el, 'y2', y2);
    zdom.style(el, style||'');
    return el;
  };

  zdom.createCircle = function (cx, cy, r, style) {
    var el = document.createElementNS(NS_SVG, 'circle');
    console.assert(!isNaN(cx));
    console.assert(!isNaN(cy));
    console.assert(!isNaN(r));
    zdom.set(el, 'cx', cx);
    zdom.set(el, 'cy', cy);
    zdom.set(el, 'r', r);
    zdom.style(el, style||'');
    return el;
  };

  zdom.createEllipse = function (cx, cy, rx, ry, style) {
    var el = document.createElementNS(NS_SVG, 'ellipse');
    console.assert(!isNaN(cx));
    console.assert(!isNaN(cy));
    console.assert(!isNaN(rx));
    console.assert(!isNaN(ry));
    zdom.set(el, 'cx', cx);
    zdom.set(el, 'cy', cy);
    zdom.set(el, 'rx', rx);
    zdom.set(el, 'ry', ry);
    zdom.style(el, style||'');
    return el;
  };

  zdom.createRect = function (x, y, width, height, rx, ry, style) {
    var el = document.createElementNS(NS_SVG, 'rect');
    zdom.set(el,'x',x);
    zdom.set(el,'y',y);
    zdom.set(el,'width',width);
    zdom.set(el,'height',height);
    zdom.set(el,'rx',rx);
    zdom.set(el,'ry',ry);
    zdom.style(el, style||'');
    return el;
  };

  zdom.createPolygon = function (points, style) {
    var el = document.createElementNS(NS_SVG, 'polygon');
    zdom.set(el, 'points', points.map(function (x,y) { return x+','+y; }).join(' '));
    zdom.style(el, style||'');
    return el;
  };

  zdom.createPolyline = function (points, style) {
    var el = document.createElementNS(NS_SVG, 'polyline');
    zdom.set(el, 'points', points.map(function (x,y) { return x+','+y; }).join(' '));
    zdom.style(el, style||'');
    return el;
  };

  zdom.createPath = function (d, style) {
    var el = document.createElementNS(NS_SVG, 'path');
    if(d) {
      zdom.set(el, 'd', d);
    }
    zdom.style(el, style||'');
    return el;
  };

  zdom.createG = function () {
    return document.createElementNS(NS_SVG, 'g');
  };

  /**
   * Creation of standard HTML elements
   */
  zdom.createDiv = function () {
    return document.createElement('div');
  };

  zdom.createSpan = function () {
    return document.createElement('span');
  };

  zdom.createInput = function (options) {
    var el = document.createElement('input');
    for(var key in options) {
      zdom.set(el, key, options[key]);
    }
    return el;
  };

  zdom.createCanvas = function (width, height) {
    var el = document.createElement('canvas');
    if(width && height) {
      el.width = width;
      el.height = height;
    }
    return el;
  };


  zdom.createImage = function () {
    return document.createElement('img');
  };

  zdom.create = zdom.parse = function(markup) {
    var doc = new window.DOMParser().parseFromString(markup, 'text/html');
    return doc.body.children[0];
  };

  zdom.createElementNS = function (namespace, tag) {
    return document.createElementNS(namespace,tag);
  };

  /**
   * Element manipulation
   */
  zdom.set = function (el, key, value) {
    el.setAttribute(key, value);
  };

  zdom.get = function (el, key) {
    return el.getAttribute(key);
  };

  zdom.has = function (el, key) {
    return el.hasAttribute(key);
  };

  zdom.id = function (el, idval) {
    if(idval) {
      // Setter
      zdom.set(el, 'id', idval);
    } else {
      // Getter
      return zdom.get(el, 'id');
    }
  };

  zdom.style = function (el, styleStr) {
    console.assert(typeof styleStr === 'string');
    zdom.set(el, 'style', styleStr);
  };

  zdom.parent = function (el) {
    return el.parentElement;
  };

  zdom.add = function (parent, child) {
    parent.appendChild(child);
  };

  zdom.prepend = function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  };

  zdom.remove = function (parent, child) {
    parent.removeChild(child);
  };

  zdom.empty = function (el) {
    while(el.children.length > 0) {
      el.children[0].remove();
    }
  };

  zdom.addClass = function (el, cname) {
    if(el.className.indexOf(cname) < 0) {
      el.className = el.className + ' ' + cname;
    }
  };

  zdom.removeClass = function (el, cname) {
    var classes = el.className.split(' ')
      .filter(function(seg) {return seg.length > 0});
    el.className = classes
      .filter(function (cls) { return cls !== cname; })
      .join(' ');
  };

  zdom.hasClass = function (el, cname) {
    return el.className.indexOf(cname) >= 0;
  };


  zdom.show = function (el, customDisplayVal) {
    el.style.display = customDisplayVal || 'inherit';
  };

  zdom.hide = function (el) {
    el.style.display = 'none';
  };

  zdom.setStyle = function (el, styleKey, styleValue) {
    el.style[styleKey] = styleValue;
  };

  zdom.getStyle = function (el, styleKey) {
    return el.style[styleKey];
  };

  zdom.getStylePx = function (el, styleKey) {
    var value = zdom.getStyle(el, styleKey);
    if(/^\d+$/.test(value)) {
      return parseInt(value);
    } else if(/^\d+px$/.test(value)) {
      return parseInt(/^(\d+)px$/.exec(value)[1]);
    } else if(/^\d+.\d+px$/.test(value)) {
      return parseFloat(/^(\d+.\d+)px$/.exec(value)[1]);
    } else {
      return NaN;
    }
  };

  zdom.text = function (el, text) {
    el.textContent = text;
  };

  zdom.absoluteLeft = function (el) {
    var left = el.offsetLeft;
    var parent = el;
    do {
      parent = parent.offsetParent;
      left += parent.offsetLeft;
    } while(!parent.isSameNode(document.body));
    return left;
  };

  zdom.absoluteTop = function (el) {
    var top = el.offsetTop;
    var parent = el;
    do {
      parent = parent.offsetParent;
      top += parent.offsetTop;
    } while(!parent.isSameNode(document.body));
    return top;
  };

  zdom.listen = function (el, evname, callback) {
    el.addEventListener(evname, callback);
  };

  zdom.trigger = function (el, evname, detail) {
    el.dispatchEvent(new CustomEvent(evname, {detail:detail}));
  };

  zdom.listenMouse = function (el, callbacks) {
    callbacks = callbacks || {};
    if(callbacks.down) {
      el.onmousedown = callbacks.down;
    }
    if(callbacks.move) {
      el.onmousemove = callbacks.move;
    }
    if(callbacks.up) {
      el.onmouseup = callbacks.up;
    }
    if(callbacks.over) {
      el.onmouseover = callbacks.over;
    }
    if(callbacks.out) {
      el.onmouseout = callbacks.out;
    }
    if(callbacks.click) {
      el.onclick = callbacks.click;
    }
    if(callbacks.dblclick) {
      el.ondblclick = callbacks.dblclick;
    }
  };

  if(typeof module !== 'undefined') {
    module.exports = zdom;
  }

})();
