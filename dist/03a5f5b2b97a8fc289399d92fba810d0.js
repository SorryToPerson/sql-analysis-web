ace.define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,u,q){"use strict";var x=o("../lib/oop"),p=o("./text_highlight_rules").TextHighlightRules,l=function(){var a="and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield|async|await|nonlocal",f="True|False|None|NotImplemented|Ellipsis|__debug__",s="abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|apply|delattr|help|next|setattr|set|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|ascii|breakpoint|bytes",c=this.createKeywordMapper({"invalid.deprecated":"debugger","support.function":s,"variable.language":"self|cls","constant.language":f,keyword:a},"identifier"),e="[uU]?",i="[rR]",t="[fF]",n="(?:[rR][fF]|[fF][rR])",r="(?:(?:[1-9]\\d*)|(?:0))",d="(?:0[oO]?[0-7]+)",k="(?:0[xX][\\dA-Fa-f]+)",b="(?:0[bB][01]+)",m="(?:"+r+"|"+d+"|"+k+"|"+b+")",R="(?:[eE][+-]?\\d+)",$="(?:\\.\\d+)",h="(?:\\d+)",v="(?:(?:"+h+"?"+$+")|(?:"+h+"\\.))",F="(?:(?:"+v+"|"+h+")"+R+")",y="(?:"+F+"|"+v+")",g=`\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})`;this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:e+'"{3}',next:"qqstring3"},{token:"string",regex:e+'"(?=.)',next:"qqstring"},{token:"string",regex:e+"'{3}",next:"qstring3"},{token:"string",regex:e+"'(?=.)",next:"qstring"},{token:"string",regex:i+'"{3}',next:"rawqqstring3"},{token:"string",regex:i+'"(?=.)',next:"rawqqstring"},{token:"string",regex:i+"'{3}",next:"rawqstring3"},{token:"string",regex:i+"'(?=.)",next:"rawqstring"},{token:"string",regex:t+'"{3}',next:"fqqstring3"},{token:"string",regex:t+'"(?=.)',next:"fqqstring"},{token:"string",regex:t+"'{3}",next:"fqstring3"},{token:"string",regex:t+"'(?=.)",next:"fqstring"},{token:"string",regex:n+'"{3}',next:"rfqqstring3"},{token:"string",regex:n+'"(?=.)',next:"rfqqstring"},{token:"string",regex:n+"'{3}",next:"rfqstring3"},{token:"string",regex:n+"'(?=.)",next:"rfqstring"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"punctuation",regex:",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:["keyword","text","entity.name.function"],regex:"(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)"},{token:"text",regex:"\\s+"},{include:"constants"}],qqstring3:[{token:"constant.language.escape",regex:g},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],qstring3:[{token:"constant.language.escape",regex:g},{token:"string",regex:"'{3}",next:"start"},{defaultToken:"string"}],qqstring:[{token:"constant.language.escape",regex:g},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:g},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}],rawqqstring3:[{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],rawqstring3:[{token:"string",regex:"'{3}",next:"start"},{defaultToken:"string"}],rawqqstring:[{token:"string",regex:"\\\\$",next:"rawqqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],rawqstring:[{token:"string",regex:"\\\\$",next:"rawqstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}],fqqstring3:[{token:"constant.language.escape",regex:g},{token:"string",regex:'"{3}',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],fqstring3:[{token:"constant.language.escape",regex:g},{token:"string",regex:"'{3}",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],fqqstring:[{token:"constant.language.escape",regex:g},{token:"string",regex:"\\\\$",next:"fqqstring"},{token:"string",regex:'"|$',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],fqstring:[{token:"constant.language.escape",regex:g},{token:"string",regex:"'|$",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],rfqqstring3:[{token:"string",regex:'"{3}',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],rfqstring3:[{token:"string",regex:"'{3}",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],rfqqstring:[{token:"string",regex:"\\\\$",next:"rfqqstring"},{token:"string",regex:'"|$',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],rfqstring:[{token:"string",regex:"'|$",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],fqstringParRules:[{token:"paren.lparen",regex:"[\\[\\(]"},{token:"paren.rparen",regex:"[\\]\\)]"},{token:"string",regex:"\\s+"},{token:"string",regex:"'[^']*'"},{token:"string",regex:'"[^"]*"'},{token:"function.support",regex:"(!s|!r|!a)"},{include:"constants"},{token:"paren.rparen",regex:"}",next:"pop"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"}],constants:[{token:"constant.numeric",regex:"(?:"+y+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:y},{token:"constant.numeric",regex:m+"[lL]\\b"},{token:"constant.numeric",regex:m+"\\b"},{token:["punctuation","function.support"],regex:"(\\.)([a-zA-Z_]+)\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}]},this.normalizeRules()};x.inherits(l,p),u.PythonHighlightRules=l}),ace.define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(o,u,q){"use strict";var x=o("../../lib/oop"),p=o("./fold_mode").FoldMode,l=u.FoldMode=function(a){this.foldingStartMarker=new RegExp("([\\[{])(?:\\s*)$|("+a+")(?:\\s*)(?:#.*)?$")};x.inherits(l,p),function(){this.getFoldWidgetRange=function(a,f,s){var c=a.getLine(s),e=c.match(this.foldingStartMarker);if(e)return e[1]?this.openingBracketBlock(a,e[1],s,e.index):e[2]?this.indentationBlock(a,s,e.index+e[2].length):this.indentationBlock(a,s)}}.call(l.prototype)}),ace.define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"],function(o,u,q){"use strict";var x=o("../lib/oop"),p=o("./text").Mode,l=o("./python_highlight_rules").PythonHighlightRules,a=o("./folding/pythonic").FoldMode,f=o("../range").Range,s=function(){this.HighlightRules=l,this.foldingRules=new a("\\:"),this.$behaviour=this.$defaultBehaviour};x.inherits(s,p),function(){this.lineCommentStart="#",this.$pairQuotesAfter={"'":/[ruf]/i,'"':/[ruf]/i},this.getNextLineIndent=function(e,i,t){var n=this.$getIndent(i),r=this.getTokenizer().getLineTokens(i,e),d=r.tokens;if(d.length&&d[d.length-1].type=="comment")return n;if(e=="start"){var k=i.match(/^.*[\{\(\[:]\s*$/);k&&(n+=t)}return n};var c={pass:1,return:1,raise:1,break:1,continue:1};this.checkOutdent=function(e,i,t){if(t!==`\r
`&&t!=="\r"&&t!==`
`)return!1;var n=this.getTokenizer().getLineTokens(i.trim(),e).tokens;if(!n)return!1;do var r=n.pop();while(r&&(r.type=="comment"||r.type=="text"&&r.value.match(/^\s+$/)));return r?r.type=="keyword"&&c[r.value]:!1},this.autoOutdent=function(e,i,t){t+=1;var n=this.$getIndent(i.getLine(t)),r=i.getTabString();n.slice(-r.length)==r&&i.remove(new f(t,n.length-r.length,t,n.length))},this.$id="ace/mode/python",this.snippetFileId="ace/snippets/python"}.call(s.prototype),u.Mode=s}),function(){ace.require(["ace/mode/python"],function(o){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=o)})}();
