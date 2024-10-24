ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(c,m,v){"use strict";var h=c("../../lib/oop"),p=c("../behaviour").Behaviour,d=c("../../token_iterator").TokenIterator;function i(l,o){return l&&l.type.lastIndexOf(o+".xml")>-1}var u=function(){this.add("string_dquotes","insertion",function(l,o,s,r,n){if(n=='"'||n=="'"){var e=n,t=r.doc.getTextRange(s.getSelectionRange());if(t!==""&&t!=="'"&&t!='"'&&s.getWrapBehavioursEnabled())return{text:e+t+e,selection:!1};var a=s.getCursorPosition(),g=r.doc.getLine(a.row),x=g.substring(a.column,a.column+1),b=new d(r,a.row,a.column),f=b.getCurrentToken();if(x==e&&(i(f,"attribute-value")||i(f,"string")))return{text:"",selection:[1,1]};if(f||(f=b.stepBackward()),!f)return;for(;i(f,"tag-whitespace")||i(f,"whitespace");)f=b.stepBackward();var y=!x||x.match(/\s/);if(i(f,"attribute-equals")&&(y||x==">")||i(f,"decl-attribute-equals")&&(y||x=="?"))return{text:e+e,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(l,o,s,r,n){var e=r.doc.getTextRange(n);if(!n.isMultiLine()&&(e=='"'||e=="'")){var t=r.doc.getLine(n.start.row),a=t.substring(n.start.column+1,n.start.column+2);if(a==e)return n.end.column++,n}}),this.add("autoclosing","insertion",function(l,o,s,r,n){if(n==">"){var e=s.getSelectionRange().start,t=new d(r,e.row,e.column),a=t.getCurrentToken()||t.stepBackward();if(!a||!(i(a,"tag-name")||i(a,"tag-whitespace")||i(a,"attribute-name")||i(a,"attribute-equals")||i(a,"attribute-value"))||i(a,"reference.attribute-value"))return;if(i(a,"attribute-value")){var g=t.getCurrentTokenColumn()+a.value.length;if(e.column<g)return;if(e.column==g){var x=t.stepForward();if(x&&i(x,"attribute-value"))return;t.stepBackward()}}if(/^\s*>/.test(r.getLine(e.row).slice(e.column)))return;for(;!i(a,"tag-name");)if(a=t.stepBackward(),a.value=="<"){a=t.stepForward();break}var b=t.getCurrentTokenRow(),f=t.getCurrentTokenColumn();if(i(t.stepBackward(),"end-tag-open"))return;var y=a.value;return b==e.row&&(y=y.substring(0,e.column-f)),this.voidElements&&this.voidElements.hasOwnProperty(y.toLowerCase())?void 0:{text:"></"+y+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(l,o,s,r,n){if(n==`
`){var e=s.getCursorPosition(),t=r.getLine(e.row),a=new d(r,e.row,e.column),g=a.getCurrentToken();if(i(g,"")&&g.type.indexOf("tag-close")!==-1){if(g.value=="/>")return;for(;g&&g.type.indexOf("tag-name")===-1;)g=a.stepBackward();if(!g)return;var x=g.value,b=a.getCurrentTokenRow();if(g=a.stepBackward(),!g||g.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[x]||!this.voidElements){var f=r.getTokenAt(e.row,e.column+1),t=r.getLine(b),y=this.$getIndent(t),k=y+r.getTabString();return f&&f.value==="</"?{text:`
`+k+`
`+y,selection:[1,k.length,1,k.length]}:{text:`
`+k}}}}})};h.inherits(u,p),m.XmlBehaviour=u}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(c,m,v){"use strict";var h=c("../../lib/oop"),p=c("../../token_iterator").TokenIterator,d=c("../behaviour/cstyle").CstyleBehaviour,i=c("../behaviour/xml").XmlBehaviour,u=function(){var l=new i({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(l),this.inherit(d),this.add("autoclosing-fragment","insertion",function(o,s,r,n,e){if(e==">"){var t=r.getSelectionRange().start,a=new p(n,t.row,t.column),g=a.getCurrentToken()||a.stepBackward();if(!g)return;if(g.value=="<")return{text:"></>",selection:[1,1]}}})};h.inherits(u,d),m.JavaScriptBehaviour=u}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(c,m,v){"use strict";var h=c("../../lib/oop"),p=c("../../range").Range,d=c("./fold_mode").FoldMode,i=m.FoldMode=function(o,s){d.call(this),this.voidElements=o||{},this.optionalEndTags=h.mixin({},this.voidElements),s&&h.mixin(this.optionalEndTags,s)};h.inherits(i,d);var u=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};function l(o,s){return o.type.lastIndexOf(s+".xml")>-1}(function(){this.getFoldWidget=function(o,s,r){var n=this._getFirstTagInLine(o,r);return n?n.closing||!n.tagName&&n.selfClosing?s==="markbeginend"?"end":"":!n.tagName||n.selfClosing||this.voidElements.hasOwnProperty(n.tagName.toLowerCase())||this._findEndTagInLine(o,r,n.tagName,n.end.column)?"":"start":this.getCommentFoldWidget(o,r)},this.getCommentFoldWidget=function(o,s){return/comment/.test(o.getState(s))&&/<!-/.test(o.getLine(s))?"start":""},this._getFirstTagInLine=function(o,s){for(var r=o.getTokens(s),n=new u,e=0;e<r.length;e++){var t=r[e];if(l(t,"tag-open")){if(n.end.column=n.start.column+t.value.length,n.closing=l(t,"end-tag-open"),t=r[++e],!t)return null;if(n.tagName=t.value,t.value===""){if(t=r[++e],!t)return null;n.tagName=t.value}for(n.end.column+=t.value.length,e++;e<r.length;e++)if(t=r[e],n.end.column+=t.value.length,l(t,"tag-close")){n.selfClosing=t.value=="/>";break}return n}else if(l(t,"tag-close"))return n.selfClosing=t.value=="/>",n;n.start.column+=t.value.length}return null},this._findEndTagInLine=function(o,s,r,n){for(var e=o.getTokens(s),t=0,a=0;a<e.length;a++){var g=e[a];if(t+=g.value.length,!(t<n-1)&&l(g,"end-tag-open")&&(g=e[a+1],l(g,"tag-name")&&g.value===""&&(g=e[a+2]),g&&g.value==r))return!0}return!1},this.getFoldWidgetRange=function(o,s,r){var n=this._getFirstTagInLine(o,r);if(!n)return this.getCommentFoldWidget(o,r)&&o.getCommentFoldRange(r,o.getLine(r).length);var e=o.getMatchingTags({row:r,column:0});if(e)return new p(e.openTag.end.row,e.openTag.end.column,e.closeTag.start.row,e.closeTag.start.column)}}).call(i.prototype)}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(c,m,v){"use strict";var h=c("../../lib/oop"),p=c("../../range").Range,d=c("./fold_mode").FoldMode,i=m.FoldMode=function(u){u&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+u.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+u.end)))};h.inherits(i,d),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(u,l,o){var s=u.getLine(o);if(this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s))return"";var r=this._getFoldWidgetBase(u,l,o);return!r&&this.startRegionRe.test(s)?"start":r},this.getFoldWidgetRange=function(u,l,o,s){var r=u.getLine(o);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(u,r,o);var t=r.match(this.foldingStartMarker);if(t){var n=t.index;if(t[1])return this.openingBracketBlock(u,t[1],o,n);var e=u.getCommentFoldRange(o,n+t[0].length,1);return e&&!e.isMultiLine()&&(s?e=this.getSectionRange(u,o):l!="all"&&(e=null)),e}if(l!=="markbegin"){var t=r.match(this.foldingStopMarker);if(t){var n=t.index+t[0].length;return t[1]?this.closingBracketBlock(u,t[1],o,n):u.getCommentFoldRange(o,n,-1)}}},this.getSectionRange=function(u,l){var o=u.getLine(l),s=o.search(/\S/),r=l,n=o.length;l=l+1;for(var e=l,t=u.getLength();++l<t;){o=u.getLine(l);var a=o.search(/\S/);if(a!==-1){if(s>a)break;var g=this.getFoldWidgetRange(u,"all",l);if(g){if(g.start.row<=r)break;if(g.isMultiLine())l=g.end.row;else if(s==a)break}e=l}}return new p(r,n,e,u.getLine(e).length)},this.getCommentRegionBlock=function(u,l,o){for(var s=l.search(/\s*$/),r=u.getLength(),n=o,e=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,t=1;++o<r;){l=u.getLine(o);var a=e.exec(l);if(a&&(a[1]?t--:t++,!t))break}var g=o;if(g>n)return new p(n,s,g,l.length)}}.call(i.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(c,m,v){"use strict";var h=c("../../lib/oop"),p=c("./xml").FoldMode,d=c("./cstyle").FoldMode,i=m.FoldMode=function(u){u&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+u.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+u.end))),this.xmlFoldMode=new p};h.inherits(i,d),function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(u,l,o){var s=this.getFoldWidgetBase(u,l,o);return s||this.xmlFoldMode.getFoldWidget(u,l,o)},this.getFoldWidgetRange=function(u,l,o,s){var r=this.getFoldWidgetRangeBase(u,l,o,s);return r||this.xmlFoldMode.getFoldWidgetRange(u,l,o)}}.call(i.prototype)}),ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./text_highlight_rules").TextHighlightRules,d=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},d.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};h.inherits(d,p),d.getTagRule=function(i){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},d.getStartRule=function(i){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:i}},d.getEndRule=function(i){return{token:"comment.doc",regex:"\\*\\/",next:i}},m.JsDocCommentHighlightRules=d}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,d=c("./text_highlight_rules").TextHighlightRules,i="[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*",u=function(s){var r={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},n=this.createKeywordMapper(r,"identifier"),e="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",t="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",a="(function)(\\s*)(\\*?)",g={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(r).join("|")+"\\b)"+i+")(\\s*)(\\()"};this.$rules={no_regex:[p.getStartRule("doc-start"),o("no_regex"),g,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(=)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+i+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+e+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:n,regex:i},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:i},{regex:"",token:"empty",next:"no_regex"}],start:[p.getStartRule("doc-start"),o("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[o("function_arguments"),{token:"variable.parameter",regex:i},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:t},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:t},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!s||!s.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(x,b,f){if(this.next=x=="{"?this.nextState:"",x=="{"&&f.length)f.unshift("start",b);else if(x=="}"&&f.length&&(f.shift(),this.next=f.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return x=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:t},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+i+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!s||s.jsx!=!1)&&l.call(this)),this.embedRules(p,"doc-",[p.getEndRule("no_regex")]),this.normalizeRules()};h.inherits(u,d);function l(){var s=i.replace("\\d","\\d\\-"),r={onMatch:function(e,t,a){var g=e.charAt(1)=="/"?2:1;return g==1?(t!=this.nextState?a.unshift(this.next,this.nextState,0):a.unshift(this.next),a[2]++):g==2&&t==this.nextState&&(a[1]--,(!a[1]||a[1]<0)&&(a.shift(),a.shift())),[{type:"meta.tag.punctuation."+(g==1?"":"end-")+"tag-open.xml",value:e.slice(0,g)},{type:"meta.tag.tag-name.xml",value:e.substr(g)}]},regex:"</?(?:"+s+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(r);var n={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[n,r,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,a){return t==a[0]&&a.shift(),e.length==2&&(a[0]==this.nextState&&a[1]--,(!a[1]||a[1]<0)&&a.splice(0,2)),this.next=a[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},n,o("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:s},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},r],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function o(s){return[{token:"comment",regex:/\/\*/,next:[p.getTagRule(),{token:"comment",regex:"\\*\\/",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[p.getTagRule(),{token:"comment",regex:"$|^",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}m.JavaScriptHighlightRules=u}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,m,v){"use strict";var h=c("../range").Range,p=function(){};(function(){this.checkOutdent=function(d,i){return/^\s+$/.test(d)?/^\s*\}/.test(i):!1},this.autoOutdent=function(d,i){var u=d.getLine(i),l=u.match(/^(\s*\})/);if(!l)return 0;var o=l[1].length,s=d.findMatchingBracket({row:i,column:o});if(!s||s.row==i)return 0;var r=this.$getIndent(d.getLine(s.row));d.replace(new h(i,0,i,o-1),r)},this.$getIndent=function(d){return d.match(/^\s*/)[0]}}).call(p.prototype),m.MatchingBraceOutdent=p}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./text").Mode,d=c("./javascript_highlight_rules").JavaScriptHighlightRules,i=c("./matching_brace_outdent").MatchingBraceOutdent,u=c("../worker/worker_client").WorkerClient,l=c("./behaviour/javascript").JavaScriptBehaviour,o=c("./folding/javascript").FoldMode,s=function(){this.HighlightRules=d,this.$outdent=new i,this.$behaviour=new l,this.foldingRules=new o};h.inherits(s,p),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(r,n,e){var t=this.$getIndent(n),a=this.getTokenizer().getLineTokens(n,r),g=a.tokens,x=a.state;if(g.length&&g[g.length-1].type=="comment")return t;if(r=="start"||r=="no_regex"){var b=n.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);b&&(t+=e)}else if(r=="doc-start"&&(x=="start"||x=="no_regex"))return"";return t},this.checkOutdent=function(r,n,e){return this.$outdent.checkOutdent(n,e)},this.autoOutdent=function(r,n,e){this.$outdent.autoOutdent(n,e)},this.createWorker=function(r){var n=new u(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return n.attachToDocument(r.getDocument()),n.on("annotate",function(e){r.setAnnotations(e.data)}),n.on("terminate",function(){r.clearAnnotations()}),n},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}.call(s.prototype),m.Mode=s}),ace.define("ace/mode/typescript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./javascript_highlight_rules").JavaScriptHighlightRules,d=function(i){var u=[{token:["storage.type","text","entity.name.function.ts"],regex:"(function)(\\s+)([a-zA-Z0-9$_\xA1-\uFFFF][a-zA-Z0-9d$_\xA1-\uFFFF]*)"},{token:"keyword",regex:"(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)"},{token:["keyword","storage.type.variable.ts"],regex:"(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)"},{token:"keyword",regex:"\\b(?:super|export|import|keyof|infer)\\b"},{token:["storage.type.variable.ts"],regex:"(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))"}],l=new p({jsx:(i&&i.jsx)==!0}).getRules();l.no_regex=u.concat(l.no_regex),this.$rules=l};h.inherits(d,p),m.TypeScriptHighlightRules=d}),ace.define("ace/mode/typescript",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/typescript_highlight_rules","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./javascript").Mode,d=c("./typescript_highlight_rules").TypeScriptHighlightRules,i=c("./folding/cstyle").FoldMode,u=c("./matching_brace_outdent").MatchingBraceOutdent,l=function(){this.HighlightRules=d,this.$outdent=new u,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new i};h.inherits(l,p),function(){this.createWorker=function(o){return null},this.$id="ace/mode/typescript"}.call(l.prototype),m.Mode=l}),ace.define("ace/mode/tsx",["require","exports","module","ace/lib/oop","ace/mode/behaviour/javascript","ace/mode/folding/javascript","ace/mode/typescript"],function(c,m,v){"use strict";var h=c("../lib/oop"),p=c("./behaviour/javascript").JavaScriptBehaviour,d=c("./folding/javascript").FoldMode,i=c("./typescript").Mode,u=function(){i.call(this),this.$highlightRuleConfig={jsx:!0},this.foldingRules=new d,this.$behaviour=new p};h.inherits(u,i),function(){this.$id="ace/mode/tsx"}.call(u.prototype),m.Mode=u}),function(){ace.require(["ace/mode/tsx"],function(c){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=c)})}();