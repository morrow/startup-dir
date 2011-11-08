var Outline;
Outline = (function() {
  function Outline(element) {
    this.root = element;
    this.outline = data.outline;
    this.write(this.root);
  }
  Outline.prototype.write = function(element) {
    $(element).append(this.htmlify(this.outline));
    return $(element).append(document.createElement("pre")).find("pre").text(this.htmlify(this.outline));
  };
  Outline.prototype.tagify = function(tag, content) {
    if (content == null) {
      content = "";
    }
    return "<" + tag + ">" + content + "</" + tag + ">";
  };
  Outline.prototype.htmlify = function(object) {
    var item, result, tag, _i, _len;
    result = "";
    if (object instanceof Array) {
      result += this.tagify("ul");
      for (_i = 0, _len = object.length; _i < _len; _i++) {
        item = object[_i];
        result += this.tagify("li", item);
      }
    } else if (object instanceof Object) {
      for (item in object) {
        if (parseInt(item) > 0 && parseInt(item).toString().length === item.toString().length) {
          tag = "n" + item;
        } else {
          tag = item;
        }
        switch (typeof object[item]) {
          case "string":
            result += this.tagify(tag, this.htmlify(object[item]));
            break;
          case "object":
            result += this.tagify(tag, this.htmlify(object[item]));
        }
      }
    } else {
      return object;
    }
    return result;
  };
  return Outline;
})();