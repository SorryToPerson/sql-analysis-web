ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(i,h,x){"use strict";var d=i("../lib/oop"),g=i("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"text",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"comment",regex:"\\/\\/.*$"},{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"punctuation.operator",regex:/[,]/},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}};d.inherits(a,g),h.JsonHighlightRules=a}),ace.define("ace/mode/json5_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/json_highlight_rules"],function(i,h,x){"use strict";var d=i("../lib/oop"),g=i("./json_highlight_rules").JsonHighlightRules,a=function(){g.call(this);var s=[{token:"variable",regex:/[a-zA-Z$_\u00a1-\uffff][\w$\u00a1-\uffff]*\s*(?=:)/},{token:"variable",regex:/['](?:(?:\\.)|(?:[^'\\]))*?[']\s*(?=:)/},{token:"constant.language.boolean",regex:/(?:null)\b/},{token:"string",regex:/'/,next:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,consumeLineEnd:!0},{token:"string",regex:/'|$/,next:"start"},{defaultToken:"string"}]},{token:"string",regex:/"(?![^"]*":)/,next:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,consumeLineEnd:!0},{token:"string",regex:/"|$/,next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:/[+-]?(?:Infinity|NaN)\b/}];for(var e in this.$rules)this.$rules[e].unshift.apply(this.$rules[e],s);this.normalizeRules()};d.inherits(a,g),h.Json5HighlightRules=a}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(i,h,x){"use strict";var d=i("../range").Range,g=function(){};(function(){this.checkOutdent=function(a,s){return/^\s+$/.test(a)?/^\s*\}/.test(s):!1},this.autoOutdent=function(a,s){var e=a.getLine(s),t=e.match(/^(\s*\})/);if(!t)return 0;var n=t[1].length,o=a.findMatchingBracket({row:s,column:n});if(!o||o.row==s)return 0;var r=this.$getIndent(a.getLine(o.row));a.replace(new d(s,0,s,n-1),r)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(g.prototype),h.MatchingBraceOutdent=g}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(i,h,x){"use strict";var d=i("../../lib/oop"),g=i("../../range").Range,a=i("./fold_mode").FoldMode,s=h.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};d.inherits(s,a),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var r=this._getFoldWidgetBase(e,t,n);return!r&&this.startRegionRe.test(o)?"start":r},this.getFoldWidgetRange=function(e,t,n,o){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var l=r.match(this.foldingStartMarker);if(l){var c=l.index;if(l[1])return this.openingBracketBlock(e,l[1],n,c);var u=e.getCommentFoldRange(n,c+l[0].length,1);return u&&!u.isMultiLine()&&(o?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t!=="markbegin"){var l=r.match(this.foldingStopMarker);if(l){var c=l.index+l[0].length;return l[1]?this.closingBracketBlock(e,l[1],n,c):e.getCommentFoldRange(n,c,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),o=n.search(/\S/),r=t,c=n.length;t=t+1;for(var u=t,l=e.getLength();++t<l;){n=e.getLine(t);var m=n.search(/\S/);if(m!==-1){if(o>m)break;var f=this.getFoldWidgetRange(e,"all",t);if(f){if(f.start.row<=r)break;if(f.isMultiLine())t=f.end.row;else if(o==m)break}u=t}}return new g(r,c,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,n){for(var o=t.search(/\s*$/),r=e.getLength(),c=n,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;++n<r;){t=e.getLine(n);var m=u.exec(t);if(m&&(m[1]?l--:l++,!l))break}var f=n;if(f>c)return new g(c,o,f,t.length)}}.call(s.prototype)}),ace.define("ace/mode/json5",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json5_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(i,h,x){"use strict";var d=i("../lib/oop"),g=i("./text").Mode,a=i("./json5_highlight_rules").Json5HighlightRules,s=i("./matching_brace_outdent").MatchingBraceOutdent,e=i("./folding/cstyle").FoldMode,t=function(){this.HighlightRules=a,this.$outdent=new s,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};d.inherits(t,g),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.checkOutdent=function(n,o,r){return this.$outdent.checkOutdent(o,r)},this.autoOutdent=function(n,o,r){this.$outdent.autoOutdent(o,r)},this.$id="ace/mode/json5"}.call(t.prototype),h.Mode=t}),function(){ace.require(["ace/mode/json5"],function(i){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=i)})}();