ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,u,p){"use strict";var d=a("../lib/oop"),h=a("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},o.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};d.inherits(o,h),o.getTagRule=function(l){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},o.getStartRule=function(l){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:l}},o.getEndRule=function(l){return{token:"comment.doc",regex:"\\*\\/",next:l}},u.DocCommentHighlightRules=o}),ace.define("ace/mode/haxe_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,u,p){"use strict";var d=a("../lib/oop"),h=a("./doc_comment_highlight_rules").DocCommentHighlightRules,o=a("./text_highlight_rules").TextHighlightRules,l=function(){var t="break|case|cast|catch|class|continue|default|else|enum|extends|for|function|if|implements|import|in|inline|interface|new|override|package|private|public|return|static|super|switch|this|throw|trace|try|typedef|untyped|var|while|Array|Void|Bool|Int|UInt|Float|Dynamic|String|List|Hash|IntHash|Error|Unknown|Type|Std",n="null|true|false",e=this.createKeywordMapper({"variable.language":"this",keyword:t,"constant.language":n},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},h.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.embedRules(h,"doc-",[h.getEndRule("start")])};d.inherits(l,o),u.HaxeHighlightRules=l}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,u,p){"use strict";var d=a("../range").Range,h=function(){};(function(){this.checkOutdent=function(o,l){return/^\s+$/.test(o)?/^\s*\}/.test(l):!1},this.autoOutdent=function(o,l){var t=o.getLine(l),n=t.match(/^(\s*\})/);if(!n)return 0;var e=n[1].length,i=o.findMatchingBracket({row:l,column:e});if(!i||i.row==l)return 0;var c=this.$getIndent(o.getLine(i.row));o.replace(new d(l,0,l,e-1),c)},this.$getIndent=function(o){return o.match(/^\s*/)[0]}}).call(h.prototype),u.MatchingBraceOutdent=h}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,u,p){"use strict";var d=a("../../lib/oop"),h=a("../../range").Range,o=a("./fold_mode").FoldMode,l=u.FoldMode=function(t){t&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+t.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+t.end)))};d.inherits(l,o),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(t,n,e){var i=t.getLine(e);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var c=this._getFoldWidgetBase(t,n,e);return!c&&this.startRegionRe.test(i)?"start":c},this.getFoldWidgetRange=function(t,n,e,i){var c=t.getLine(e);if(this.startRegionRe.test(c))return this.getCommentRegionBlock(t,c,e);var r=c.match(this.foldingStartMarker);if(r){var g=r.index;if(r[1])return this.openingBracketBlock(t,r[1],e,g);var s=t.getCommentFoldRange(e,g+r[0].length,1);return s&&!s.isMultiLine()&&(i?s=this.getSectionRange(t,e):n!="all"&&(s=null)),s}if(n!=="markbegin"){var r=c.match(this.foldingStopMarker);if(r){var g=r.index+r[0].length;return r[1]?this.closingBracketBlock(t,r[1],e,g):t.getCommentFoldRange(e,g,-1)}}},this.getSectionRange=function(t,n){var e=t.getLine(n),i=e.search(/\S/),c=n,g=e.length;n=n+1;for(var s=n,r=t.getLength();++n<r;){e=t.getLine(n);var m=e.search(/\S/);if(m!==-1){if(i>m)break;var f=this.getFoldWidgetRange(t,"all",n);if(f){if(f.start.row<=c)break;if(f.isMultiLine())n=f.end.row;else if(i==m)break}s=n}}return new h(c,g,s,t.getLine(s).length)},this.getCommentRegionBlock=function(t,n,e){for(var i=n.search(/\s*$/),c=t.getLength(),g=e,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,r=1;++e<c;){n=t.getLine(e);var m=s.exec(n);if(m&&(m[1]?r--:r++,!r))break}var f=e;if(f>g)return new h(g,i,f,n.length)}}.call(l.prototype)}),ace.define("ace/mode/haxe",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/haxe_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(a,u,p){"use strict";var d=a("../lib/oop"),h=a("./text").Mode,o=a("./haxe_highlight_rules").HaxeHighlightRules,l=a("./matching_brace_outdent").MatchingBraceOutdent,t=a("./folding/cstyle").FoldMode,n=function(){this.HighlightRules=o,this.$outdent=new l,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new t};d.inherits(n,h),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,i,c){var g=this.$getIndent(i),s=this.getTokenizer().getLineTokens(i,e),r=s.tokens;if(r.length&&r[r.length-1].type=="comment")return g;if(e=="start"){var m=i.match(/^.*[\{\(\[]\s*$/);m&&(g+=c)}return g},this.checkOutdent=function(e,i,c){return this.$outdent.checkOutdent(i,c)},this.autoOutdent=function(e,i,c){this.$outdent.autoOutdent(i,c)},this.$id="ace/mode/haxe"}.call(n.prototype),u.Mode=n}),function(){ace.require(["ace/mode/haxe"],function(a){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=a)})}();