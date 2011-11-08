class Outline

  constructor:(element)->
    @root = element
    @outline = data.outline
    @write(@root)

  write:(element)->
    $(element).append @htmlify @outline
    $(element).append(document.createElement("pre")).find("pre").text @htmlify(@outline)

  tagify:(tag, content="")->
    return "<#{tag}>#{content}</#{tag}>"

  htmlify:(object)->
    result = ""
    if object instanceof Array
      result += @tagify "ul"
      for item in object
        result += @tagify "li", item 
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
      return object
    return result