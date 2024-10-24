ace.define("ace/mode/graphqlschema_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,f,u){"use strict";var p=r("../lib/oop"),s=r("./text_highlight_rules").TextHighlightRules,c=function(){var d="type|interface|union|enum|schema|input|implements|extends|scalar",e="Int|Float|String|ID|Boolean",t=this.createKeywordMapper({keyword:d,"storage.type":e},"identifier");this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:t,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}]},this.normalizeRules()};p.inherits(c,s),f.GraphQLSchemaHighlightRules=c}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,f,u){"use strict";var p=r("../../lib/oop"),s=r("../../range").Range,c=r("./fold_mode").FoldMode,d=f.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};p.inherits(d,c),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var n=e.getLine(i);if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return"";var o=this._getFoldWidgetBase(e,t,i);return!o&&this.startRegionRe.test(n)?"start":o},this.getFoldWidgetRange=function(e,t,i,n){var o=e.getLine(i);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,i);var a=o.match(this.foldingStartMarker);if(a){var h=a.index;if(a[1])return this.openingBracketBlock(e,a[1],i,h);var l=e.getCommentFoldRange(i,h+a[0].length,1);return l&&!l.isMultiLine()&&(n?l=this.getSectionRange(e,i):t!="all"&&(l=null)),l}if(t!=="markbegin"){var a=o.match(this.foldingStopMarker);if(a){var h=a.index+a[0].length;return a[1]?this.closingBracketBlock(e,a[1],i,h):e.getCommentFoldRange(i,h,-1)}}},this.getSectionRange=function(e,t){var i=e.getLine(t),n=i.search(/\S/),o=t,h=i.length;t=t+1;for(var l=t,a=e.getLength();++t<a;){i=e.getLine(t);var m=i.search(/\S/);if(m!==-1){if(n>m)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=o)break;if(g.isMultiLine())t=g.end.row;else if(n==m)break}l=t}}return new s(o,h,l,e.getLine(l).length)},this.getCommentRegionBlock=function(e,t,i){for(var n=t.search(/\s*$/),o=e.getLength(),h=i,l=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++i<o;){t=e.getLine(i);var m=l.exec(t);if(m&&(m[1]?a--:a++,!a))break}var g=i;if(g>h)return new s(h,n,g,t.length)}}.call(d.prototype)}),ace.define("ace/mode/graphqlschema",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/graphqlschema_highlight_rules","ace/mode/folding/cstyle"],function(r,f,u){"use strict";var p=r("../lib/oop"),s=r("./text").Mode,c=r("./graphqlschema_highlight_rules").GraphQLSchemaHighlightRules,d=r("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=c,this.foldingRules=new d};p.inherits(e,s),function(){this.lineCommentStart="#",this.$id="ace/mode/graphqlschema",this.snippetFileId="ace/snippets/graphqlschema"}.call(e.prototype),f.Mode=e}),function(){ace.require(["ace/mode/graphqlschema"],function(r){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=r)})}();