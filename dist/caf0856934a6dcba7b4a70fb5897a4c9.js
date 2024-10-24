ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(g,L,h){"use strict";var d=g("../lib/oop"),u=g("./text_highlight_rules").TextHighlightRules,c=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},c.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};d.inherits(c,u),c.getTagRule=function(i){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},c.getStartRule=function(i){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:i}},c.getEndRule=function(i){return{token:"comment.doc",regex:"\\*\\/",next:i}},L.JsDocCommentHighlightRules=c}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(g,L,h){"use strict";var d=g("../lib/oop"),u=g("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,c=g("./text_highlight_rules").TextHighlightRules,i="[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*",T=function(a){var e={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},r=this.createKeywordMapper(e,"identifier"),t="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",n="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",o="(function)(\\s*)(\\*?)",l={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(e).join("|")+"\\b)"+i+")(\\s*)(\\()"};this.$rules={no_regex:[u.getStartRule("doc-start"),_("no_regex"),l,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(=)(\\s*)"+o+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+i+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(:)(\\s*)"+o+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+o+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+t+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:r,regex:i},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:o+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:i},{regex:"",token:"empty",next:"no_regex"}],start:[u.getStartRule("doc-start"),_("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[_("function_arguments"),{token:"variable.parameter",regex:i},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:n},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:n},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!a||!a.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(m,p,K){if(this.next=m=="{"?this.nextState:"",m=="{"&&K.length)K.unshift("start",p);else if(m=="}"&&K.length&&(K.shift(),this.next=K.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return m=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:n},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+i+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!a||a.jsx!=!1)&&s.call(this)),this.embedRules(u,"doc-",[u.getEndRule("no_regex")]),this.normalizeRules()};d.inherits(T,c);function s(){var a=i.replace("\\d","\\d\\-"),e={onMatch:function(t,n,o){var l=t.charAt(1)=="/"?2:1;return l==1?(n!=this.nextState?o.unshift(this.next,this.nextState,0):o.unshift(this.next),o[2]++):l==2&&n==this.nextState&&(o[1]--,(!o[1]||o[1]<0)&&(o.shift(),o.shift())),[{type:"meta.tag.punctuation."+(l==1?"":"end-")+"tag-open.xml",value:t.slice(0,l)},{type:"meta.tag.tag-name.xml",value:t.substr(l)}]},regex:"</?(?:"+a+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(e);var r={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[r,e,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(t,n,o){return n==o[0]&&o.shift(),t.length==2&&(o[0]==this.nextState&&o[1]--,(!o[1]||o[1]<0)&&o.splice(0,2)),this.next=o[0]||"start",[{type:this.token,value:t}]},nextState:"jsx"},r,_("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:a},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},e],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function _(a){return[{token:"comment",regex:/\/\*/,next:[u.getTagRule(),{token:"comment",regex:"\\*\\/",next:a||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[u.getTagRule(),{token:"comment",regex:"$|^",next:a||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}L.JavaScriptHighlightRules=T}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(g,L,h){"use strict";var d=g("../range").Range,u=function(){};(function(){this.checkOutdent=function(c,i){return/^\s+$/.test(c)?/^\s*\}/.test(i):!1},this.autoOutdent=function(c,i){var T=c.getLine(i),s=T.match(/^(\s*\})/);if(!s)return 0;var _=s[1].length,a=c.findMatchingBracket({row:i,column:_});if(!a||a.row==i)return 0;var e=this.$getIndent(c.getLine(a.row));c.replace(new d(i,0,i,_-1),e)},this.$getIndent=function(c){return c.match(/^\s*/)[0]}}).call(u.prototype),L.MatchingBraceOutdent=u}),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(g,L,h){"use strict";var d=g("../../lib/oop"),u=g("../behaviour").Behaviour,c=g("../../token_iterator").TokenIterator;function i(s,_){return s&&s.type.lastIndexOf(_+".xml")>-1}var T=function(){this.add("string_dquotes","insertion",function(s,_,a,e,r){if(r=='"'||r=="'"){var t=r,n=e.doc.getTextRange(a.getSelectionRange());if(n!==""&&n!=="'"&&n!='"'&&a.getWrapBehavioursEnabled())return{text:t+n+t,selection:!1};var o=a.getCursorPosition(),l=e.doc.getLine(o.row),m=l.substring(o.column,o.column+1),p=new c(e,o.row,o.column),K=p.getCurrentToken();if(m==t&&(i(K,"attribute-value")||i(K,"string")))return{text:"",selection:[1,1]};if(K||(K=p.stepBackward()),!K)return;for(;i(K,"tag-whitespace")||i(K,"whitespace");)K=p.stepBackward();var F=!m||m.match(/\s/);if(i(K,"attribute-equals")&&(F||m==">")||i(K,"decl-attribute-equals")&&(F||m=="?"))return{text:t+t,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(s,_,a,e,r){var t=e.doc.getTextRange(r);if(!r.isMultiLine()&&(t=='"'||t=="'")){var n=e.doc.getLine(r.start.row),o=n.substring(r.start.column+1,r.start.column+2);if(o==t)return r.end.column++,r}}),this.add("autoclosing","insertion",function(s,_,a,e,r){if(r==">"){var t=a.getSelectionRange().start,n=new c(e,t.row,t.column),o=n.getCurrentToken()||n.stepBackward();if(!o||!(i(o,"tag-name")||i(o,"tag-whitespace")||i(o,"attribute-name")||i(o,"attribute-equals")||i(o,"attribute-value"))||i(o,"reference.attribute-value"))return;if(i(o,"attribute-value")){var l=n.getCurrentTokenColumn()+o.value.length;if(t.column<l)return;if(t.column==l){var m=n.stepForward();if(m&&i(m,"attribute-value"))return;n.stepBackward()}}if(/^\s*>/.test(e.getLine(t.row).slice(t.column)))return;for(;!i(o,"tag-name");)if(o=n.stepBackward(),o.value=="<"){o=n.stepForward();break}var p=n.getCurrentTokenRow(),K=n.getCurrentTokenColumn();if(i(n.stepBackward(),"end-tag-open"))return;var F=o.value;return p==t.row&&(F=F.substring(0,t.column-K)),this.voidElements&&this.voidElements.hasOwnProperty(F.toLowerCase())?void 0:{text:"></"+F+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(s,_,a,e,r){if(r==`
`){var t=a.getCursorPosition(),n=e.getLine(t.row),o=new c(e,t.row,t.column),l=o.getCurrentToken();if(i(l,"")&&l.type.indexOf("tag-close")!==-1){if(l.value=="/>")return;for(;l&&l.type.indexOf("tag-name")===-1;)l=o.stepBackward();if(!l)return;var m=l.value,p=o.getCurrentTokenRow();if(l=o.stepBackward(),!l||l.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[m]||!this.voidElements){var K=e.getTokenAt(t.row,t.column+1),n=e.getLine(p),F=this.$getIndent(n),x=F+e.getTabString();return K&&K.value==="</"?{text:`
`+x+`
`+F,selection:[1,x.length,1,x.length]}:{text:`
`+x}}}}})};d.inherits(T,u),L.XmlBehaviour=T}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(g,L,h){"use strict";var d=g("../../lib/oop"),u=g("../../token_iterator").TokenIterator,c=g("../behaviour/cstyle").CstyleBehaviour,i=g("../behaviour/xml").XmlBehaviour,T=function(){var s=new i({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(s),this.inherit(c),this.add("autoclosing-fragment","insertion",function(_,a,e,r,t){if(t==">"){var n=e.getSelectionRange().start,o=new u(r,n.row,n.column),l=o.getCurrentToken()||o.stepBackward();if(!l)return;if(l.value=="<")return{text:"></>",selection:[1,1]}}})};d.inherits(T,c),L.JavaScriptBehaviour=T}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(g,L,h){"use strict";var d=g("../../lib/oop"),u=g("../../range").Range,c=g("./fold_mode").FoldMode,i=L.FoldMode=function(_,a){c.call(this),this.voidElements=_||{},this.optionalEndTags=d.mixin({},this.voidElements),a&&d.mixin(this.optionalEndTags,a)};d.inherits(i,c);var T=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};function s(_,a){return _.type.lastIndexOf(a+".xml")>-1}(function(){this.getFoldWidget=function(_,a,e){var r=this._getFirstTagInLine(_,e);return r?r.closing||!r.tagName&&r.selfClosing?a==="markbeginend"?"end":"":!r.tagName||r.selfClosing||this.voidElements.hasOwnProperty(r.tagName.toLowerCase())||this._findEndTagInLine(_,e,r.tagName,r.end.column)?"":"start":this.getCommentFoldWidget(_,e)},this.getCommentFoldWidget=function(_,a){return/comment/.test(_.getState(a))&&/<!-/.test(_.getLine(a))?"start":""},this._getFirstTagInLine=function(_,a){for(var e=_.getTokens(a),r=new T,t=0;t<e.length;t++){var n=e[t];if(s(n,"tag-open")){if(r.end.column=r.start.column+n.value.length,r.closing=s(n,"end-tag-open"),n=e[++t],!n)return null;if(r.tagName=n.value,n.value===""){if(n=e[++t],!n)return null;r.tagName=n.value}for(r.end.column+=n.value.length,t++;t<e.length;t++)if(n=e[t],r.end.column+=n.value.length,s(n,"tag-close")){r.selfClosing=n.value=="/>";break}return r}else if(s(n,"tag-close"))return r.selfClosing=n.value=="/>",r;r.start.column+=n.value.length}return null},this._findEndTagInLine=function(_,a,e,r){for(var t=_.getTokens(a),n=0,o=0;o<t.length;o++){var l=t[o];if(n+=l.value.length,!(n<r-1)&&s(l,"end-tag-open")&&(l=t[o+1],s(l,"tag-name")&&l.value===""&&(l=t[o+2]),l&&l.value==e))return!0}return!1},this.getFoldWidgetRange=function(_,a,e){var r=this._getFirstTagInLine(_,e);if(!r)return this.getCommentFoldWidget(_,e)&&_.getCommentFoldRange(e,_.getLine(e).length);var t=_.getMatchingTags({row:e,column:0});if(t)return new u(t.openTag.end.row,t.openTag.end.column,t.closeTag.start.row,t.closeTag.start.column)}}).call(i.prototype)}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(g,L,h){"use strict";var d=g("../../lib/oop"),u=g("../../range").Range,c=g("./fold_mode").FoldMode,i=L.FoldMode=function(T){T&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+T.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+T.end)))};d.inherits(i,c),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(T,s,_){var a=T.getLine(_);if(this.singleLineBlockCommentRe.test(a)&&!this.startRegionRe.test(a)&&!this.tripleStarBlockCommentRe.test(a))return"";var e=this._getFoldWidgetBase(T,s,_);return!e&&this.startRegionRe.test(a)?"start":e},this.getFoldWidgetRange=function(T,s,_,a){var e=T.getLine(_);if(this.startRegionRe.test(e))return this.getCommentRegionBlock(T,e,_);var n=e.match(this.foldingStartMarker);if(n){var r=n.index;if(n[1])return this.openingBracketBlock(T,n[1],_,r);var t=T.getCommentFoldRange(_,r+n[0].length,1);return t&&!t.isMultiLine()&&(a?t=this.getSectionRange(T,_):s!="all"&&(t=null)),t}if(s!=="markbegin"){var n=e.match(this.foldingStopMarker);if(n){var r=n.index+n[0].length;return n[1]?this.closingBracketBlock(T,n[1],_,r):T.getCommentFoldRange(_,r,-1)}}},this.getSectionRange=function(T,s){var _=T.getLine(s),a=_.search(/\S/),e=s,r=_.length;s=s+1;for(var t=s,n=T.getLength();++s<n;){_=T.getLine(s);var o=_.search(/\S/);if(o!==-1){if(a>o)break;var l=this.getFoldWidgetRange(T,"all",s);if(l){if(l.start.row<=e)break;if(l.isMultiLine())s=l.end.row;else if(a==o)break}t=s}}return new u(e,r,t,T.getLine(t).length)},this.getCommentRegionBlock=function(T,s,_){for(var a=s.search(/\s*$/),e=T.getLength(),r=_,t=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,n=1;++_<e;){s=T.getLine(_);var o=t.exec(s);if(o&&(o[1]?n--:n++,!n))break}var l=_;if(l>r)return new u(r,a,l,s.length)}}.call(i.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(g,L,h){"use strict";var d=g("../../lib/oop"),u=g("./xml").FoldMode,c=g("./cstyle").FoldMode,i=L.FoldMode=function(T){T&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+T.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+T.end))),this.xmlFoldMode=new u};d.inherits(i,c),function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(T,s,_){var a=this.getFoldWidgetBase(T,s,_);return a||this.xmlFoldMode.getFoldWidget(T,s,_)},this.getFoldWidgetRange=function(T,s,_,a){var e=this.getFoldWidgetRangeBase(T,s,_,a);return e||this.xmlFoldMode.getFoldWidgetRange(T,s,_)}}.call(i.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(g,L,h){"use strict";var d=g("../lib/oop"),u=g("./text").Mode,c=g("./javascript_highlight_rules").JavaScriptHighlightRules,i=g("./matching_brace_outdent").MatchingBraceOutdent,T=g("../worker/worker_client").WorkerClient,s=g("./behaviour/javascript").JavaScriptBehaviour,_=g("./folding/javascript").FoldMode,a=function(){this.HighlightRules=c,this.$outdent=new i,this.$behaviour=new s,this.foldingRules=new _};d.inherits(a,u),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(e,r,t){var n=this.$getIndent(r),o=this.getTokenizer().getLineTokens(r,e),l=o.tokens,m=o.state;if(l.length&&l[l.length-1].type=="comment")return n;if(e=="start"||e=="no_regex"){var p=r.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);p&&(n+=t)}else if(e=="doc-start"&&(m=="start"||m=="no_regex"))return"";return n},this.checkOutdent=function(e,r,t){return this.$outdent.checkOutdent(r,t)},this.autoOutdent=function(e,r,t){this.$outdent.autoOutdent(r,t)},this.createWorker=function(e){var r=new T(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return r.attachToDocument(e.getDocument()),r.on("annotate",function(t){e.setAnnotations(t.data)}),r.on("terminate",function(){e.clearAnnotations()}),r},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}.call(a.prototype),L.Mode=a}),ace.define("ace/mode/gobstones_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(g,L,h){"use strict";var d=g("../lib/oop"),u=g("./text_highlight_rules").TextHighlightRules,c=function(){var i={standard:"program|procedure|function|interactive|return|let",type:"type|is|variant|record|field|case"},T={commands:{repetitions:"repeat|while|foreach|in",alternatives:"if|elseif|else|switch"},expressions:{alternatives:"choose|when|otherwise|matching|select|on"}},s={colors:"Verde|Rojo|Azul|Negro",cardinals:"Norte|Sur|Este|Oeste",booleans:"True|False",numbers:/([-]?)([0-9]+)\b/,strings:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},_={commands:"Poner|Sacar|Mover|IrAlBorde|VaciarTablero|BOOM",expressions:"nroBolitas|hayBolitas|puedeMover|siguiente|previo|opuesto|minBool|maxBool|minDir|maxDir|minColor|maxColor|primero|sinElPrimero|esVac\xEDa|boom",keys:"K_A|K_B|K_C|K_D|K_E|K_F|K_G|K_G|K_H|K_I|K_J|K_K|K_L|K_M|K_N|K_\xD1|K_O|K_P|K_Q|K_R|K_S|K_T|K_U|K_V|K_W|K_X|K_Y|K_Z|K_0|K_1|K_2|K_3|K_4|K_5|K_6|K_7|K_8|K_9|K_F1|K_F2|K_F3|K_F4|K_F5|K_F6|K_F7|K_F8|K_F9|K_F10|K_F11|K_12|K_UP|K_DOWN|K_LEFT|K_RIGHT|K_RETURN|K_BACKSPACE|K_TAB|K_SPACE|K_ESCAPEK_CTRL_A|K_CTRL_B|K_CTRL_C|K_CTRL_D|K_CTRL_E|K_CTRL_F|K_CTRL_G|K_CTRL_G|K_CTRL_H|K_CTRL_I|K_CTRL_J|K_CTRL_K|K_CTRL_L|K_CTRL_M|K_CTRL_N|K_CTRL_\xD1|K_CTRL_O|K_CTRL_P|K_CTRL_Q|K_CTRL_R|K_CTRL_S|K_CTRL_T|K_CTRL_U|K_CTRL_V|K_CTRL_W|K_CTRL_X|K_CTRL_Y|K_CTRL_Z|K_CTRL_0|K_CTRL_1|K_CTRL_2|K_CTRL_3|K_CTRL_4|K_CTRL_5|K_CTRL_6|K_CTRL_7|K_CTRL_8|K_CTRL_9|K_CTRL_F1|K_CTRL_F2|K_CTRL_F3|K_CTRL_F4|K_CTRL_F5|K_CTRL_F6|K_CTRL_F7|K_CTRL_F8|K_CTRL_F9|K_CTRL_F10|K_CTRL_F11|K_CTRL_F12|K_CTRL_UP|K_CTRL_DOWN|K_CTRL_LEFT|K_CTRL_RIGHT|K_CTRL_RETURN|K_CTRL_BACKSPACE|K_CTRL_TAB|K_CTRL_SPACE|K_CTRL_ESCAPEK_ALT_A|K_ALT_B|K_ALT_C|K_ALT_D|K_ALT_E|K_ALT_F|K_ALT_G|K_ALT_G|K_ALT_H|K_ALT_I|K_ALT_J|K_ALT_K|K_ALT_L|K_ALT_M|K_ALT_N|K_ALT_\xD1|K_ALT_O|K_ALT_P|K_ALT_Q|K_ALT_R|K_ALT_S|K_ALT_T|K_ALT_U|K_ALT_V|K_ALT_W|K_ALT_X|K_ALT_Y|K_ALT_Z|K_ALT_0|K_ALT_1|K_ALT_2|K_ALT_3|K_ALT_4|K_ALT_5|K_ALT_6|K_ALT_7|K_ALT_8|K_ALT_9|K_ALT_F1|K_ALT_F2|K_ALT_F3|K_ALT_F4|K_ALT_F5|K_ALT_F6|K_ALT_F7|K_ALT_F8|K_ALT_F9|K_ALT_F10|K_ALT_F11|K_ALT_F12|K_ALT_UP|K_ALT_DOWN|K_ALT_LEFT|K_ALT_RIGHT|K_ALT_RETURN|K_ALT_BACKSPACE|K_ALT_TAB|K_ALT_SPACE|K_ALT_ESCAPEK_SHIFT_A|K_SHIFT_B|K_SHIFT_C|K_SHIFT_D|K_SHIFT_E|K_SHIFT_F|K_SHIFT_G|K_SHIFT_G|K_SHIFT_H|K_SHIFT_I|K_SHIFT_J|K_SHIFT_K|K_SHIFT_L|K_SHIFT_M|K_SHIFT_N|K_SHIFT_\xD1|K_SHIFT_O|K_SHIFT_P|K_SHIFT_Q|K_SHIFT_R|K_SHIFT_S|K_SHIFT_T|K_SHIFT_U|K_SHIFT_V|K_SHIFT_W|K_SHIFT_X|K_SHIFT_Y|K_SHIFT_Z|K_SHIFT_0|K_SHIFT_1|K_SHIFT_2|K_SHIFT_3|K_SHIFT_4|K_SHIFT_5|K_SHIFT_6|K_SHIFT_7|K_SHIFT_8|K_SHIFT_9|K_SHIFT_F1|K_SHIFT_F2|K_SHIFT_F3|K_SHIFT_F4|K_SHIFT_F5|K_SHIFT_F6|K_SHIFT_F7|K_SHIFT_F8|K_SHIFT_F9|K_SHIFT_F10|K_SHIFT_F11|K_SHIFT_F12|K_SHIFT_UP|K_SHIFT_DOWN|K_SHIFT_LEFT|K_SHIFT_RIGHT|K_SHIFT_RETURN|K_SHIFT_BACKSPACE|K_SHIFT_TAB|K_SHIFT_SPACE|K_SHIFT_ESCAPEK_CTRL_ALT_A|K_CTRL_ALT_B|K_CTRL_ALT_C|K_CTRL_ALT_D|K_CTRL_ALT_E|K_CTRL_ALT_F|K_CTRL_ALT_G|K_CTRL_ALT_G|K_CTRL_ALT_H|K_CTRL_ALT_I|K_CTRL_ALT_J|K_CTRL_ALT_K|K_CTRL_ALT_L|K_CTRL_ALT_M|K_CTRL_ALT_N|K_CTRL_ALT_\xD1|K_CTRL_ALT_O|K_CTRL_ALT_P|K_CTRL_ALT_Q|K_CTRL_ALT_R|K_CTRL_ALT_S|K_CTRL_ALT_T|K_CTRL_ALT_U|K_CTRL_ALT_V|K_CTRL_ALT_W|K_CTRL_ALT_X|K_CTRL_ALT_Y|K_CTRL_ALT_Z|K_CTRL_ALT_0|K_CTRL_ALT_1|K_CTRL_ALT_2|K_CTRL_ALT_3|K_CTRL_ALT_4|K_CTRL_ALT_5|K_CTRL_ALT_6|K_CTRL_ALT_7|K_CTRL_ALT_8|K_CTRL_ALT_9|K_CTRL_ALT_F1|K_CTRL_ALT_F2|K_CTRL_ALT_F3|K_CTRL_ALT_F4|K_CTRL_ALT_F5|K_CTRL_ALT_F6|K_CTRL_ALT_F7|K_CTRL_ALT_F8|K_CTRL_ALT_F9|K_CTRL_ALT_F10|K_CTRL_ALT_F11|K_CTRL_ALT_F12|K_CTRL_ALT_UP|K_CTRL_ALT_DOWN|K_CTRL_ALT_LEFT|K_CTRL_ALT_RIGHT|K_CTRL_ALT_RETURN|K_CTRL_ALT_BACKSPACE|K_CTRL_ALT_TAB|K_CTRL_ALT_SPACE|K_CTRL_ALT_ESCAPEK_CTRL_SHIFT_A|K_CTRL_SHIFT_B|K_CTRL_SHIFT_C|K_CTRL_SHIFT_D|K_CTRL_SHIFT_E|K_CTRL_SHIFT_F|K_CTRL_SHIFT_G|K_CTRL_SHIFT_G|K_CTRL_SHIFT_H|K_CTRL_SHIFT_I|K_CTRL_SHIFT_J|K_CTRL_SHIFT_K|K_CTRL_SHIFT_L|K_CTRL_SHIFT_M|K_CTRL_SHIFT_N|K_CTRL_SHIFT_\xD1|K_CTRL_SHIFT_O|K_CTRL_SHIFT_P|K_CTRL_SHIFT_Q|K_CTRL_SHIFT_R|K_CTRL_SHIFT_S|K_CTRL_SHIFT_T|K_CTRL_SHIFT_U|K_CTRL_SHIFT_V|K_CTRL_SHIFT_W|K_CTRL_SHIFT_X|K_CTRL_SHIFT_Y|K_CTRL_SHIFT_Z|K_CTRL_SHIFT_0|K_CTRL_SHIFT_1|K_CTRL_SHIFT_2|K_CTRL_SHIFT_3|K_CTRL_SHIFT_4|K_CTRL_SHIFT_5|K_CTRL_SHIFT_6|K_CTRL_SHIFT_7|K_CTRL_SHIFT_8|K_CTRL_SHIFT_9|K_CTRL_SHIFT_F1|K_CTRL_SHIFT_F2|K_CTRL_SHIFT_F3|K_CTRL_SHIFT_F4|K_CTRL_SHIFT_F5|K_CTRL_SHIFT_F6|K_CTRL_SHIFT_F7|K_CTRL_SHIFT_F8|K_CTRL_SHIFT_9|K_CTRL_SHIFT_10|K_CTRL_SHIFT_11|K_CTRL_SHIFT_12|K_CTRL_SHIFT_UP|K_CTRL_SHIFT_DOWN|K_CTRL_SHIFT_LEFT|K_CTRL_SHIFT_RIGHT|K_CTRL_SHIFT_RETURN|K_CTRL_SHIFT_BACKSPACE|K_CTRL_SHIFT_TAB|K_CTRL_SHIFT_SPACE|K_CTRL_SHIFT_ESCAPEK_ALT_SHIFT_A|K_ALT_SHIFT_B|K_ALT_SHIFT_C|K_ALT_SHIFT_D|K_ALT_SHIFT_E|K_ALT_SHIFT_F|K_ALT_SHIFT_G|K_ALT_SHIFT_G|K_ALT_SHIFT_H|K_ALT_SHIFT_I|K_ALT_SHIFT_J|K_ALT_SHIFT_K|K_ALT_SHIFT_L|K_ALT_SHIFT_M|K_ALT_SHIFT_N|K_ALT_SHIFT_\xD1|K_ALT_SHIFT_O|K_ALT_SHIFT_P|K_ALT_SHIFT_Q|K_ALT_SHIFT_R|K_ALT_SHIFT_S|K_ALT_SHIFT_T|K_ALT_SHIFT_U|K_ALT_SHIFT_V|K_ALT_SHIFT_W|K_ALT_SHIFT_X|K_ALT_SHIFT_Y|K_ALT_SHIFT_Z|K_ALT_SHIFT_0|K_ALT_SHIFT_1|K_ALT_SHIFT_2|K_ALT_SHIFT_3|K_ALT_SHIFT_4|K_ALT_SHIFT_5|K_ALT_SHIFT_6|K_ALT_SHIFT_7|K_ALT_SHIFT_8|K_ALT_SHIFT_9|K_ALT_SHIFT_F1|K_ALT_SHIFT_F2|K_ALT_SHIFT_F3|K_ALT_SHIFT_F4|K_ALT_SHIFT_F5|K_ALT_SHIFT_F6|K_ALT_SHIFT_F7|K_ALT_SHIFT_F8|K_ALT_SHIFT_9|K_ALT_SHIFT_10|K_ALT_SHIFT_11|K_ALT_SHIFT_12|K_ALT_SHIFT_UP|K_ALT_SHIFT_DOWN|K_ALT_SHIFT_LEFT|K_ALT_SHIFT_RIGHT|K_ALT_SHIFT_RETURN|K_ALT_SHIFT_BACKSPACE|K_ALT_SHIFT_TAB|K_ALT_SHIFT_SPACE|K_ALT_SHIFT_ESCAPEK_CTRL_ALT_SHIFT_A|K_CTRL_ALT_SHIFT_B|K_CTRL_ALT_SHIFT_C|K_CTRL_ALT_SHIFT_D|K_CTRL_ALT_SHIFT_E|K_CTRL_ALT_SHIFT_F|K_CTRL_ALT_SHIFT_G|K_CTRL_ALT_SHIFT_G|K_CTRL_ALT_SHIFT_H|K_CTRL_ALT_SHIFT_I|K_CTRL_ALT_SHIFT_J|K_CTRL_ALT_SHIFT_K|K_CTRL_ALT_SHIFT_L|K_CTRL_ALT_SHIFT_M|K_CTRL_ALT_SHIFT_N|K_CTRL_ALT_SHIFT_\xD1|K_CTRL_ALT_SHIFT_O|K_CTRL_ALT_SHIFT_P|K_CTRL_ALT_SHIFT_Q|K_CTRL_ALT_SHIFT_R|K_CTRL_ALT_SHIFT_S|K_CTRL_ALT_SHIFT_T|K_CTRL_ALT_SHIFT_U|K_CTRL_ALT_SHIFT_V|K_CTRL_ALT_SHIFT_W|K_CTRL_ALT_SHIFT_X|K_CTRL_ALT_SHIFT_Y|K_CTRL_ALT_SHIFT_Z|K_CTRL_ALT_SHIFT_0|K_CTRL_ALT_SHIFT_1|K_CTRL_ALT_SHIFT_2|K_CTRL_ALT_SHIFT_3|K_CTRL_ALT_SHIFT_4|K_CTRL_ALT_SHIFT_5|K_CTRL_ALT_SHIFT_6|K_CTRL_ALT_SHIFT_7|K_CTRL_ALT_SHIFT_8|K_CTRL_ALT_SHIFT_9|K_CTRL_ALT_SHIFT_F1|K_CTRL_ALT_SHIFT_F2|K_CTRL_ALT_SHIFT_F3|K_CTRL_ALT_SHIFT_F4|K_CTRL_ALT_SHIFT_F5|K_CTRL_ALT_SHIFT_F6|K_CTRL_ALT_SHIFT_F7|K_CTRL_ALT_SHIFT_F8|K_CTRL_ALT_SHIFT_F9|K_CTRL_ALT_SHIFT_F10|K_CTRL_ALT_SHIFT_F11|K_CTRL_ALT_SHIFT_F12|K_CTRL_ALT_SHIFT_UP|K_CTRL_ALT_SHIFT_DOWN|K_CTRL_ALT_SHIFT_LEFT|K_CTRL_ALT_SHIFT_RIGHT|K_CTRL_ALT_SHIFT_RETURN|K_CTRL_ALT_SHIFT_BACKSPACE|K_CTRL_ALT_SHIFT_TAB|K_CTRL_ALT_SHIFT_SPACE|K_CTRL_ALT_SHIFT_ESCAPE"},a={commands:":=",expressions:{numeric:"\\+|\\-|\\*|\\^|div|mod",comparison:">=|<=|==|\\/=|>|<",boolean:"\\|\\||&&|not",other:"\\+\\+|<\\-|\\[|\\]|\\_|\\->"}},e={line:{double_slash:"\\/\\/.*$",double_dash:"\\-\\-.*$",number_sign:"#.*$"},block:{start:"\\/\\*",end:"\\*\\/"},block_alt:{start:"\\{\\-",end:"\\-\\}"}};this.$rules={start:[{token:"comment.line.double-slash.gobstones",regex:e.line.double_slash},{token:"comment.line.double-dash.gobstones",regex:e.line.double_dash},{token:"comment.line.number-sign.gobstones",regex:e.line.number_sign},{token:"comment.block.dash-asterisc.gobstones",regex:e.block.start,next:"block_comment_end"},{token:"comment.block.brace-dash.gobstones",regex:e.block_alt.start,next:"block_comment_alt_end"},{token:"constant.numeric.gobstones",regex:s.numbers},{token:"string.quoted.double.gobstones",regex:s.strings},{token:"keyword.operator.other.gobstones",regex:a.expressions.other},{token:"keyword.operator.numeric.gobstones",regex:a.expressions.numeric},{token:"keyword.operator.compare.gobstones",regex:a.expressions.comparison},{token:"keyword.operator.boolean.gobstones",regex:a.expressions.boolean},{token:this.createKeywordMapper({"storage.type.definitions.gobstones":i.standard,"storage.type.types.gobstones":i.type,"keyword.control.commands.repetitions.gobstones":T.commands.repetitions,"keyword.control.commands.alternatives.gobstones":T.commands.alternatives,"keyword.control.expressions.alternatives.gobstones":T.expressions.alternatives,"constant.language.colors.gobstones":s.colors,"constant.language.cardinals.gobstones":s.cardinals,"constant.language.boolean.gobstones":s.booleans,"support.function.gobstones":_.commands,"support.variable.gobstones":_.expressions,"variable.language.gobstones":_.keys},"identifier.gobstones"),regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"comma.gobstones",regex:","},{token:"semicolon.gobstones",regex:";"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],block_comment_end:[{token:"comment.block.dash-asterisc.gobstones",regex:e.block.end,next:"start"},{defaultToken:"comment.block.dash-asterisc.gobstones"}],block_comment_alt_end:[{token:"comment.block.brace-dash.gobstones",regex:e.block_alt.end,next:"start"},{defaultToken:"comment.block.brace-dash.gobstones"}]}};d.inherits(c,u),L.GobstonesHighlightRules=c}),ace.define("ace/mode/gobstones",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/gobstones_highlight_rules"],function(g,L,h){"use strict";var d=g("../lib/oop"),u=g("./javascript").Mode,c=g("./gobstones_highlight_rules").GobstonesHighlightRules,i=function(){u.call(this),this.HighlightRules=c,this.$behaviour=this.$defaultBehaviour};d.inherits(i,u),function(){this.createWorker=function(){return null},this.$id="ace/mode/gobstones",this.snippetFileId="ace/snippets/gobstones"}.call(i.prototype),L.Mode=i}),function(){ace.require(["ace/mode/gobstones"],function(g){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=g)})}();