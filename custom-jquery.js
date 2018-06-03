(function () {
  function customJquery(selector) {
    if (this instanceof customJquery) {
      return this.search(selector);
    } else {
      return new customJquery(selector);
    }
  };
  window.$ = customJquery;
  customJquery.prototype = {
    length: 0,
    constructor: customJquery,
    search: function (selector) {
      if (typeof selector === 'string') {
        var element = document.querySelectorAll(selector);
        for (var i = 0; i < element.length; i++) {
          this[i] = element[i];
        };
        this.length = element.length;
      }
      return this;
    },
    addClass: function (value) {
      if (typeof value === "string") {
        for (var i = 0; i < this.length; i++) {
          this[i].className += " " + value;
        };
      }
      else if (typeof value === "function") {
        for (var i = 0; i < this.length; i++) {
          this[i].className += " " + value(i, this[i].className);
        };
      }
      return this;
    },
    append: function (content) {
      if (content instanceof customJquery) {
        for (var i = 0; i < this.length; i++) {
          for (var j = 0; j < content.length; j++) {
            this[i].innerHTML += content[j].outerHTML;
          };
        };
      } else if (typeof content === "string") {
        for (var i = 0; i < this.length; i++) {                    
          this[i].innerHTML += content;
        };
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].innerHTML += content.outerHTML;
        };
      }
      return this;
    },
    html: function (htmlString) {
      if (typeof htmlString === "string") {
        for (var i = 0; i < this.length; i++) {
          this[i].innerHTML = htmlString;
        }
        return this;
      } else {
        return this[0].innerHTML;
      };
    },
    attr: function (attributeName, value) {
      for (var i = 0; i < this.length; i++) {
        if (arguments.length === 1 && typeof attributeName === 'string') {
          return this[i].getAttribute(attributeName) + "";
        } else if (typeof attributeName === 'string') {
          this[i].setAttribute(attributeName, value);
        };
      };
      return this;
    },
    children: function (selector) {
      if (typeof selector === "string") {
        return this[0].querySelectorAll(selector);
      } else {
        for (var i = 0; i < this.length; i++) {
          return this[i].children;
        };
      }
    },
    css: function (propertyName, value) {
      if (arguments.length === 1 && typeof propertyName === 'string') {
        if (this[0].hasAttribute('style')) {
          return this[0].style[propertyName];
        };
      };
      if (arguments.length === 1 && typeof propertyName === 'object') {
        this.each(function () {
          for (var prop in propertyName) {
            this.style[prop] = propertyName[prop];
          };
        });
      };
      if (arguments.length === 2 && typeof propertyName === "string" && typeof value === "string") {
        this.each(function () {
          this.style[propertyName] = value;
        });
      };
      return this;
    },
    data: function (key, value) {
      if (arguments.length === 0) {
        return this[0].dataset;
      };
      if (arguments.length === 1 && typeof key === 'string') {
        for (var i = 0; i < this.length; i++) {
          if (this[i].dataset.hasOwnProperty(key)) {
            return this[i].dataset[key];
          }
        };
        return {};
      };
      if (typeof key === 'string') {
        this.each(function () {
          this.dataset[key] = value;
        });
      };
      if (typeof key === 'object') {
        this.each(function () {
          for (var prop in key) {
            if (key.hasOwnProperty(prop)) {
              this.dataset[prop]=key[prop];
            }
          };
        });
      };
      return this;
    },
    on: function (e, selector, handler) {
      if (typeof selector === "function") {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener(e, selector);
        };
      } else {
        for (var i = 0; i < this.length; i++) {
          this[i].addEventListener(e, function(event) {
            if (event.target && event.target.matches(selector)) {
              handler();
            }
          });
        };
      }
      return this;
    },
    one: function (e, handler) {
      function removeEvents(element) {
        element.removeEventListener(e, wrapperHandler);
      };
      var wrapperHandler = function (e) {
        handler.call(this, e);
        removeEvents(e.target);
      };
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(e, wrapperHandler);
      };
      return this;
    },
    each: function (callback) {
      for (var i = 0; i < this.length; i++) {
        var value = callback.call(this[i], i,this[i]);
        if (value === false) {
          break;
        }
      };
      return this;
    },
  };
}());