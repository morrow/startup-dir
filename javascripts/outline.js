var Outline;
Outline = (function() {
  function Outline(element) {
    this.root = element;
    this.outline = data.outline;
    this.write(this.root);
  }
  Outline.prototype.write = function(element) {
    $(element).append(this.htmlify(this.outline));
    return $(element).append(document.createElement("pre")).find("pre").text(this.htmlify(this.outline, true));
  };
  Outline.prototype.tagify = function(tag, content) {
    var attributes, matches, node;
    if (content == null) {
      content = "";
    }
    if (tag && tag.indexOf("(") > 0 && tag.indexOf(")") > 0) {
      attributes = tag.split("(")[1].split(")")[0];
      tag = tag.split("(")[0];
    } else {
      attributes = "";
    }
    matches = tag.match(/a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|device|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|ul|var|video|wbr/);
    if (matches && matches[0].length === tag.length && !matches[0].match(/title/)) {
      return "<" + tag + ">" + content + "</" + tag + ">";
    } else {
      node = "div";
      if (attributes && attributes.match(/href/)) {
        node = "a href='" + content + "'";
      }
      return "<" + node + " class=\"" + tag + "\"" + attributes + ">" + content + "</" + node + ">";
    }
  };
  Outline.prototype.process = function(type, input) {
    if (type == null) {
      type = "value";
    }
    return input;
  };
  Outline.prototype.htmlify = function(object, prettify) {
    var item, result, tag, _i, _len;
    if (prettify == null) {
      prettify = false;
    }
    result = "";
    if (object instanceof Array) {
      for (_i = 0, _len = object.length; _i < _len; _i++) {
        item = object[_i];
        item = this.process("value", item);
        result += this.tagify("li", item);
      }
      result = this.tagify("ul", result);
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
      return this.process("value", object);
    }
    if (prettify) {
      result = indent(result, null);
    }
    return result;
  };
  return Outline;
})();