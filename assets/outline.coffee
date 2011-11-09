class Outline

  constructor:(element)->
    @root = element
    @outline = data.outline
    @write(@root)

  write:(element)->
    $(element).append @htmlify @outline
    $(element).append(document.createElement("pre")).find("pre").text @htmlify(@outline, true)

  tagify:(tag, content="")->
    if tag and tag.indexOf("(") > 0 and tag.indexOf(")") > 0
      attributes = tag.split("(")[1].split(")")[0]
      tag = tag.split("(")[0]
    else
      attributes = ""
    matches = tag.match /a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|device|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|ul|var|video|wbr/
    if matches and matches[0].length == tag.length and !matches[0].match /title/
      return "<#{tag}>#{content}</#{tag}>"
    else
      node = "div"
      if attributes and attributes.match /href/
        node = "a href='#{content}'"

      return "<#{node} class=\"#{tag}\"#{attributes}>#{content}</#{node}>"

  process:(type="value", input)->
    return input

  htmlify:(object, prettify=false)->
    result = ""
    if object instanceof Array
      for item in object
        item = @process("value", item)
        result += @tagify "li", item
      result = @tagify "ul", result
    else if object instanceof Object
      for item of object
        if parseInt(item) > 0 and parseInt(item).toString().length == item.toString().length
          tag = "n#{item}"
        else
          tag = item
        switch typeof object[item]
          when "string"
            result += @tagify tag, @htmlify(object[item])
          when "object"
            result += @tagify tag, @htmlify(object[item])
    else
      return @process("value", object)
    if prettify
      result = indent(result, null)
    return result