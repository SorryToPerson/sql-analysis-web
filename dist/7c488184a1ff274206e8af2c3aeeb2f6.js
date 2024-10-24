ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,x,_){"use strict";var k=o("../lib/oop"),m=o("./text_highlight_rules").TextHighlightRules,u=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},u.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};k.inherits(u,m),u.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},u.getStartRule=function(s){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:s}},u.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s}},x.DocCommentHighlightRules=u}),ace.define("ace/mode/d_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(o,x,_){"use strict";var k=o("../lib/oop"),m=o("./doc_comment_highlight_rules").DocCommentHighlightRules,u=o("./text_highlight_rules").TextHighlightRules,s=function(){var e="this|super|import|module|body|mixin|__traits|invariant|alias|asm|delete|typeof|typeid|sizeof|cast|new|in|is|typedef|__vector|__parameters",t="break|case|continue|default|do|else|for|foreach|foreach_reverse|goto|if|return|switch|while|catch|try|throw|finally|version|assert|unittest|with",r="auto|bool|char|dchar|wchar|byte|ubyte|float|double|real|cfloat|creal|cdouble|cent|ifloat|ireal|idouble|int|long|short|void|uint|ulong|ushort|ucent|function|delegate|string|wstring|dstring|size_t|ptrdiff_t|hash_t|Object",g="abstract|align|debug|deprecated|export|extern|const|final|in|inout|out|ref|immutable|lazy|nothrow|override|package|pragma|private|protected|public|pure|scope|shared|__gshared|synchronized|static|volatile",a="class|struct|union|template|interface|enum|macro",l={token:"constant.language.escape",regex:`\\\\(?:(?:x[0-9A-F]{2})|(?:[0-7]{1,3})|(?:['"\\?0abfnrtv\\\\])|(?:u[0-9a-fA-F]{4})|(?:U[0-9a-fA-F]{8}))`},c="null|true|false|__DATE__|__EOF__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|__FILE__|__MODULE__|__LINE__|__FUNCTION__|__PRETTY_FUNCTION__",n="/|/\\=|&|&\\=|&&|\\|\\|\\=|\\|\\||\\-|\\-\\=|\\-\\-|\\+|\\+\\=|\\+\\+|\\<|\\<\\=|\\<\\<|\\<\\<\\=|\\<\\>|\\<\\>\\=|\\>|\\>\\=|\\>\\>\\=|\\>\\>\\>\\=|\\>\\>|\\>\\>\\>|\\!|\\!\\=|\\!\\<\\>|\\!\\<\\>\\=|\\!\\<|\\!\\<\\=|\\!\\>|\\!\\>\\=|\\?|\\$|\\=|\\=\\=|\\*|\\*\\=|%|%\\=|\\^|\\^\\=|\\^\\^|\\^\\^\\=|~|~\\=|\\=\\>|#",f=this.$keywords=this.createKeywordMapper({"keyword.modifier":g,"keyword.control":t,"keyword.type":r,keyword:e,"keyword.storage":a,punctation:"\\.|\\,|;|\\.\\.|\\.\\.\\.","keyword.operator":n,"constant.language":c},"identifier"),d="[a-zA-Z_\xA1-\uFFFF][a-zA-Z\\d_\xA1-\uFFFF]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},m.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"star-comment"},{token:"comment.shebang",regex:"^\\s*#!.*"},{token:"comment",regex:"\\/\\+",next:"plus-comment"},{onMatch:function(i,p,h){return h.unshift(this.next,i.substr(2)),"string"},regex:'q"(?:[\\[\\(\\{\\<]+)',next:"operator-heredoc-string"},{onMatch:function(i,p,h){return h.unshift(this.next,i.substr(2)),"string"},regex:'q"(?:[a-zA-Z_]+)$',next:"identifier-heredoc-string"},{token:"string",regex:'[xr]?"',next:"quote-string"},{token:"string",regex:"[xr]?`",next:"backtick-string"},{token:"string",regex:"[xr]?['](?:(?:\\\\.)|(?:[^'\\\\]))*?['][cdw]?"},{token:["keyword","text","paren.lparen"],regex:/(asm)(\s*)({)/,next:"d-asm"},{token:["keyword","text","paren.lparen","constant.language"],regex:"(__traits)(\\s*)(\\()("+d+")"},{token:["keyword","text","variable.module"],regex:"(import|module)(\\s+)((?:"+d+"\\.?)*)"},{token:["keyword.storage","text","entity.name.type"],regex:"("+a+")(\\s*)("+d+")"},{token:["keyword","text","variable.storage","text"],regex:"(alias|typedef)(\\s*)("+d+")(\\s*)"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F_]+(l|ul|u|f|F|L|U|UL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d[\\d_]*(?:(?:\\.[\\d_]*)?(?:[eE][+-]?[\\d_]+)?)?(l|ul|u|f|F|L|U|UL)?\\b"},{token:"entity.other.attribute-name",regex:"@"+d},{token:f,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:n},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\.|\\:"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],"star-comment":[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],"plus-comment":[{token:"comment",regex:"\\+\\/",next:"start"},{defaultToken:"comment"}],"quote-string":[l,{token:"string",regex:'"[cdw]?',next:"start"},{defaultToken:"string"}],"backtick-string":[l,{token:"string",regex:"`[cdw]?",next:"start"},{defaultToken:"string"}],"operator-heredoc-string":[{onMatch:function(i,p,h){i=i.substring(i.length-2,i.length-1);var v={">":"<","]":"[",")":"(","}":"{"};return Object.keys(v).indexOf(i)!=-1&&(i=v[i]),i!=h[1]||(h.shift(),h.shift()),"string"},regex:'(?:[\\]\\)}>]+)"',next:"start"},{token:"string",regex:"[^\\]\\)}>]+"}],"identifier-heredoc-string":[{onMatch:function(i,p,h){return i=i.substring(0,i.length-1),i!=h[1]||(h.shift(),h.shift()),"string"},regex:'^(?:[A-Za-z_][a-zA-Z0-9]+)"',next:"start"},{token:"string",regex:"[^\\]\\)}>]+"}],"d-asm":[{token:"paren.rparen",regex:"\\}",next:"start"},{token:"keyword.instruction",regex:"[a-zA-Z]+",next:"d-asm-instruction"},{token:"text",regex:"\\s+"}],"d-asm-instruction":[{token:"constant.language",regex:/AL|AH|AX|EAX|BL|BH|BX|EBX|CL|CH|CX|ECX|DL|DH|DX|EDX|BP|EBP|SP|ESP|DI|EDI|SI|ESI/i},{token:"identifier",regex:"[a-zA-Z]+"},{token:"string",regex:'"[^"]*"'},{token:"comment",regex:"//.*$"},{token:"constant.numeric",regex:"[0-9.xA-F]+"},{token:"punctuation.operator",regex:"\\,"},{token:"punctuation.operator",regex:";",next:"d-asm"},{token:"text",regex:"\\s+"}]},this.embedRules(m,"doc-",[m.getEndRule("start")])};s.metaData={comment:"D language",fileTypes:["d","di"],firstLineMatch:"^#!.*\\b[glr]?dmd\\b.",foldingStartMarker:"(?x)/\\*\\*(?!\\*)|^(?![^{]*?//|[^{]*?/\\*(?!.*?\\*/.*?\\{)).*?\\{\\s*($|//|/\\*(?!.*?\\*/.*\\S))",foldingStopMarker:"(?<!\\*)\\*\\*/|^\\s*\\}",keyEquivalent:"^~D",name:"D",scopeName:"source.d"},k.inherits(s,u),x.DHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(o,x,_){"use strict";var k=o("../../lib/oop"),m=o("../../range").Range,u=o("./fold_mode").FoldMode,s=x.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};k.inherits(s,u),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var g=e.getLine(r);if(this.singleLineBlockCommentRe.test(g)&&!this.startRegionRe.test(g)&&!this.tripleStarBlockCommentRe.test(g))return"";var a=this._getFoldWidgetBase(e,t,r);return!a&&this.startRegionRe.test(g)?"start":a},this.getFoldWidgetRange=function(e,t,r,g){var a=e.getLine(r);if(this.startRegionRe.test(a))return this.getCommentRegionBlock(e,a,r);var n=a.match(this.foldingStartMarker);if(n){var l=n.index;if(n[1])return this.openingBracketBlock(e,n[1],r,l);var c=e.getCommentFoldRange(r,l+n[0].length,1);return c&&!c.isMultiLine()&&(g?c=this.getSectionRange(e,r):t!="all"&&(c=null)),c}if(t!=="markbegin"){var n=a.match(this.foldingStopMarker);if(n){var l=n.index+n[0].length;return n[1]?this.closingBracketBlock(e,n[1],r,l):e.getCommentFoldRange(r,l,-1)}}},this.getSectionRange=function(e,t){var r=e.getLine(t),g=r.search(/\S/),a=t,l=r.length;t=t+1;for(var c=t,n=e.getLength();++t<n;){r=e.getLine(t);var f=r.search(/\S/);if(f!==-1){if(g>f)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=a)break;if(d.isMultiLine())t=d.end.row;else if(g==f)break}c=t}}return new m(a,l,c,e.getLine(c).length)},this.getCommentRegionBlock=function(e,t,r){for(var g=t.search(/\s*$/),a=e.getLength(),l=r,c=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,n=1;++r<a;){t=e.getLine(r);var f=c.exec(t);if(f&&(f[1]?n--:n++,!n))break}var d=r;if(d>l)return new m(l,g,d,t.length)}}.call(s.prototype)}),ace.define("ace/mode/d",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/d_highlight_rules","ace/mode/folding/cstyle"],function(o,x,_){"use strict";var k=o("../lib/oop"),m=o("./text").Mode,u=o("./d_highlight_rules").DHighlightRules,s=o("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=u,this.foldingRules=new s,this.$behaviour=this.$defaultBehaviour};k.inherits(e,m),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/d"}.call(e.prototype),x.Mode=e}),function(){ace.require(["ace/mode/d"],function(o){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=o)})}();
