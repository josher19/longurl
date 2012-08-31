'create black on white DIV.class#id@2.5,2.5 P#hi hello world.'.match(/^(\w+)\s+((\w+)\s+on\s+(\w+))?\s+([A-Z1-6\.\#]+)(\s*(at|@)\s*([.\d]+),([.\d]+)(\w*))?(\s+(with|w\/)?\s*(html\s+|text\s+)?([A-Z1-6\.\#]*)\s+("?.+"?)?)?\.?/i)

// ["create black on white DIV.class#id@2.5,2.5 P#hi hello world.", "create", "black on white", "black", "white", "DIV.class#id", "@2.5,2.5", "@", "2.5", "2.5", "", " P#hi hello world.", undefined, undefined, "P#hi", "hello world."]
// ["create black on white DIV.class#id at 2.5,2.5em w/ html P.class#id hello world", "create", "black on white", "black", "white", "DIV.class#id", " at 2.5,2.5em", "at", "2.5", "2.5", "em", " w/ html P.class#id hello world", " w/", "html P.class#id", "P.class#id", "hello world"]


r = /^(\w+)(\s+([#\w]+)\s+on\s+([#\w]+))?\s+([A-Z_0-9\.\#\-]*)(\s*(at|@)\s*([.\d]+),([.\d]+)(\w*))?(\s+on\s+([\S+]+))?((\s+with\b|\s+w\/)?\s*(text:?|html\s+([A-Z_0-9\.\#\-]*)|html:)?\s+"?(.+?)?"?)?$/i

create text: hello world'.match(r)
// ["create text: hello world", "create", undefined, undefined, undefined, "", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "text: hello world", undefined, "text:", undefined, "hello world"]

'create DIV.class#id on element.class-names#id_name hello world'.match(r)
// ["create DIV.class#id on element.class-names#id_name hello world", "create", undefined, undefined, undefined, "DIV.class#id", undefined, undefined, undefined, undefined, undefined, " on element.class-names#id_name", "element.class-names#id_name", " hello world", undefined, undefined, undefined, "hello world"]


'create black on white DIV.class#id at 2.5,2.5em w/ html h6 "hello world"'.match(r)
// ["create black on white DIV.class#id at 2.5,2.5em w/ html h6 "hello world"", "create", " black on white", "black", "white", "DIV.class#id", " at 2.5,2.5em", "at", "2.5", "2.5", "em", undefined, undefined, " w/ html h6 "hello world"", " w/", "html h6", "h6", "hello world"]

[textGroup,cmd,coloringGroup,color,backgroundColor,element,positionGroup,top,left,measurement,onGroup,parentElement,contentsGroup,optionalWith,htmlGroup,subElement,text]

$(document.body).append( createItem("<div>", {html:"<h1>hello world</h1>", css:{color:"black",backgroundColor:"white", top:"2.5em", left:"2.5em", position: "absolute"}}) )

$(parentElement || document.body).append( $(element || '<div>', { html: $(subElement||'<span>', {text:text}), css:{color:color,backgroundColor:backgroundColor,left:left,top:top,position:"absolute"}}) )
