ace.define("ace/mode/lua_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(d,v,b){"use strict";var k=d("../lib/oop"),x=d("./text_highlight_rules").TextHighlightRules,m=function(){var _="break|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while|or|and|not",p="true|false|nil|_G|_VERSION",i="string|xpcall|package|tostring|print|os|unpack|require|getfenv|setmetatable|next|assert|tonumber|io|rawequal|collectgarbage|getmetatable|module|rawset|math|debug|pcall|table|newproxy|type|coroutine|_G|select|gcinfo|pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|load|error|loadfile|sub|upper|len|gfind|rep|find|match|char|dump|gmatch|reverse|byte|format|gsub|lower|preload|loadlib|loaded|loaders|cpath|config|path|seeall|exit|setlocale|date|getenv|difftime|remove|time|clock|tmpname|rename|execute|lines|write|close|flush|open|output|type|read|stderr|stdin|input|stdout|popen|tmpfile|log|max|acos|huge|ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|gethook|setmetatable|setlocal|traceback|setfenv|getinfo|setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|foreachi|maxn|foreach|concat|sort|remove|resume|yield|status|wrap|create|running|__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber",h="string|package|os|io|math|debug|table|coroutine",o="setn|foreach|foreachi|gcinfo|log10|maxn",c=this.createKeywordMapper({keyword:_,"support.function":i,"keyword.deprecated":o,"constant.library":h,"constant.language":p,"variable.language":"self"},"identifier"),n="(?:(?:[1-9]\\d*)|(?:0))",a="(?:0[xX][\\dA-Fa-f]+)",e="(?:"+n+"|"+a+")",t="(?:\\.\\d+)",r="(?:\\d+)",u="(?:(?:"+r+"?"+t+")|(?:"+r+"\\.))",s="(?:"+u+")";this.$rules={start:[{stateName:"bracketedComment",onMatch:function(g,f,l){return l.unshift(this.next,g.length-2,f),"comment"},regex:/\-\-\[=*\[/,next:[{onMatch:function(g,f,l){return g.length==l[1]?(l.shift(),l.shift(),this.next=l.shift()):this.next="","comment"},regex:/\]=*\]/,next:"start"},{defaultToken:"comment.body"}]},{token:"comment",regex:"\\-\\-.*$"},{stateName:"bracketedString",onMatch:function(g,f,l){return l.unshift(this.next,g.length,f),"string.start"},regex:/\[=*\[/,next:[{onMatch:function(g,f,l){return g.length==l[1]?(l.shift(),l.shift(),this.next=l.shift()):this.next="","string.end"},regex:/\]=*\]/,next:"start"},{defaultToken:"string"}]},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:s},{token:"constant.numeric",regex:e+"\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+|\\w+"}]},this.normalizeRules()};k.inherits(m,x),v.LuaHighlightRules=m}),ace.define("ace/mode/folding/lua",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],function(d,v,b){"use strict";var k=d("../../lib/oop"),x=d("./fold_mode").FoldMode,m=d("../../range").Range,_=d("../../token_iterator").TokenIterator,p=v.FoldMode=function(){};k.inherits(p,x),function(){this.foldingStartMarker=/\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/,this.foldingStopMarker=/\bend\b|^\s*}|\]=*\]/,this.getFoldWidget=function(i,h,o){var c=i.getLine(o),n=this.foldingStartMarker.test(c),a=this.foldingStopMarker.test(c);if(n&&!a){var t=c.match(this.foldingStartMarker);if(t[1]=="then"&&/\belseif\b/.test(c))return;if(t[1]){if(i.getTokenAt(o,t.index+1).type==="keyword")return"start"}else if(t[2]){var e=i.bgTokenizer.getState(o)||"";if(e[0]=="bracketedComment"||e[0]=="bracketedString")return"start"}else return"start"}if(h!="markbeginend"||!a||n&&a)return"";var t=c.match(this.foldingStopMarker);if(t[0]==="end"){if(i.getTokenAt(o,t.index+1).type==="keyword")return"end"}else if(t[0][0]==="]"){var e=i.bgTokenizer.getState(o-1)||"";if(e[0]=="bracketedComment"||e[0]=="bracketedString")return"end"}else return"end"},this.getFoldWidgetRange=function(i,h,o){var c=i.doc.getLine(o),n=this.foldingStartMarker.exec(c);if(n)return n[1]?this.luaBlock(i,o,n.index+1):n[2]?i.getCommentFoldRange(o,n.index+1):this.openingBracketBlock(i,"{",o,n.index);var n=this.foldingStopMarker.exec(c);if(n)return n[0]==="end"&&i.getTokenAt(o,n.index+1).type==="keyword"?this.luaBlock(i,o,n.index+1):n[0][0]==="]"?i.getCommentFoldRange(o,n.index+1):this.closingBracketBlock(i,"}",o,n.index+n[0].length)},this.luaBlock=function(i,l,o,c){var n=new _(i,l,o),a={function:1,do:1,then:1,elseif:-1,end:-1,repeat:1,until:-1},e=n.getCurrentToken();if(!(!e||e.type!="keyword")){var t=e.value,r=[t],u=a[t];if(u){var s=u===-1?n.getCurrentTokenColumn():i.getLine(l).length,g=l;for(n.step=u===-1?n.stepBackward:n.stepForward;e=n.step();)if(e.type==="keyword"){var f=u*a[e.value];if(f>0)r.unshift(e.value);else if(f<=0){if(r.shift(),!r.length&&e.value!="elseif")break;f===0&&r.unshift(e.value)}}if(!e)return null;if(c)return n.getCurrentTokenRange();var l=n.getCurrentTokenRow();return u===-1?new m(l,i.getLine(l).length,g,s):new m(g,s,l,n.getCurrentTokenColumn())}}}}.call(p.prototype)}),ace.define("ace/mode/lua",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lua_highlight_rules","ace/mode/folding/lua","ace/range","ace/worker/worker_client"],function(d,v,b){"use strict";var k=d("../lib/oop"),x=d("./text").Mode,m=d("./lua_highlight_rules").LuaHighlightRules,_=d("./folding/lua").FoldMode,p=d("../range").Range,i=d("../worker/worker_client").WorkerClient,h=function(){this.HighlightRules=m,this.foldingRules=new _,this.$behaviour=this.$defaultBehaviour};k.inherits(h,x),function(){this.lineCommentStart="--",this.blockComment={start:"--[[",end:"--]]"};var o={function:1,then:1,do:1,else:1,elseif:1,repeat:1,end:-1,until:-1},c=["else","elseif","end","until"];function n(a){for(var e=0,t=0;t<a.length;t++){var r=a[t];r.type=="keyword"?r.value in o&&(e+=o[r.value]):r.type=="paren.lparen"?e+=r.value.length:r.type=="paren.rparen"&&(e-=r.value.length)}return e<0?-1:e>0?1:0}this.getNextLineIndent=function(a,e,t){var r=this.$getIndent(e),u=0,s=this.getTokenizer().getLineTokens(e,a),g=s.tokens;return a=="start"&&(u=n(g)),u>0?r+t:u<0&&r.substr(r.length-t.length)==t&&!this.checkOutdent(a,e,`
`)?r.substr(0,r.length-t.length):r},this.checkOutdent=function(a,e,t){if(t!=`
`&&t!="\r"&&t!=`\r
`)return!1;if(e.match(/^\s*[\)\}\]]$/))return!0;var r=this.getTokenizer().getLineTokens(e.trim(),a).tokens;return!r||!r.length?!1:r[0].type=="keyword"&&c.indexOf(r[0].value)!=-1},this.getMatching=function(a,e,t){if(e==null){var r=a.selection.lead;t=r.column,e=r.row}var u=a.getTokenAt(e,t);if(u&&u.value in o)return this.foldingRules.luaBlock(a,e,t,!0)},this.autoOutdent=function(a,e,t){var r=e.getLine(t),u=r.match(/^\s*/)[0].length;if(!(!u||!t)){var s=this.getMatching(e,t,u+1);if(!(!s||s.start.row==t)){var g=this.$getIndent(e.getLine(s.start.row));g.length!=u&&(e.replace(new p(t,0,t,u),g),e.outdentRows(new p(t+1,0,t+1,0)))}}},this.createWorker=function(a){var e=new i(["ace"],"ace/mode/lua_worker","Worker");return e.attachToDocument(a.getDocument()),e.on("annotate",function(t){a.setAnnotations(t.data)}),e.on("terminate",function(){a.clearAnnotations()}),e},this.$id="ace/mode/lua",this.snippetFileId="ace/snippets/lua"}.call(h.prototype),v.Mode=h}),function(){ace.require(["ace/mode/lua"],function(d){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=d)})}();
