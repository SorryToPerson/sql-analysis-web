ace.define("ace/occur",["require","exports","module","ace/lib/oop","ace/search","ace/edit_session","ace/search_highlight","ace/lib/dom"],function(p,f,b){"use strict";var M=this&&this.__extends||function(){var l=function(s,c){return l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(h,g){h.__proto__=g}||function(h,g){for(var e in g)Object.prototype.hasOwnProperty.call(g,e)&&(h[e]=g[e])},l(s,c)};return function(s,c){if(typeof c!="function"&&c!==null)throw new TypeError("Class extends value "+String(c)+" is not a constructor or null");l(s,c);function h(){this.constructor=s}s.prototype=c===null?Object.create(c):(h.prototype=c.prototype,new h)}}(),y=p("./lib/oop"),$=p("./search").Search,v=p("./edit_session").EditSession,C=p("./search_highlight").SearchHighlight,i=function(l){M(s,l);function s(){return l!==null&&l.apply(this,arguments)||this}return s.prototype.enter=function(c,h){if(!h.needle)return!1;var g=c.getCursorPosition();this.displayOccurContent(c,h);var e=this.originalToOccurPosition(c.session,g);return c.moveCursorToPosition(e),!0},s.prototype.exit=function(c,h){var g=h.translatePosition&&c.getCursorPosition(),e=g&&this.occurToOriginalPosition(c.session,g);return this.displayOriginalContent(c),e&&c.moveCursorToPosition(e),!0},s.prototype.highlight=function(c,h){var g=c.$occurHighlight=c.$occurHighlight||c.addDynamicMarker(new C(null,"ace_occur-highlight","text"));g.setRegexp(h),c._emit("changeBackMarker")},s.prototype.displayOccurContent=function(c,h){this.$originalSession=c.session;var g=this.matchingLines(c.session,h),e=g.map(function(a){return a.content}),t=new v(e.join(`
`));t.$occur=this,t.$occurMatchingLines=g,c.setSession(t),this.$useEmacsStyleLineStart=this.$originalSession.$useEmacsStyleLineStart,t.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart,this.highlight(t,h.re),t._emit("changeBackMarker")},s.prototype.displayOriginalContent=function(c){c.setSession(this.$originalSession),this.$originalSession.$useEmacsStyleLineStart=this.$useEmacsStyleLineStart},s.prototype.originalToOccurPosition=function(c,h){var g=c.$occurMatchingLines,e={row:0,column:0};if(!g)return e;for(var t=0;t<g.length;t++)if(g[t].row===h.row)return{row:t,column:h.column};return e},s.prototype.occurToOriginalPosition=function(c,h){var g=c.$occurMatchingLines;return!g||!g[h.row]?h:{row:g[h.row].row,column:h.column}},s.prototype.matchingLines=function(c,h){if(h=y.mixin({},h),!c||!h.needle)return[];var g=new $;return g.set(h),g.findAll(c).reduce(function(e,t){var a=t.start.row,r=e[e.length-1];return r&&r.row===a?e:e.concat({row:a,content:c.getLine(a)})},[])},s}($),u=p("./lib/dom");u.importCssString(`.ace_occur-highlight {
    border-radius: 4px;
    background-color: rgba(87, 255, 8, 0.25);
    position: absolute;
    z-index: 4;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgb(91, 255, 50);
}
.ace_dark .ace_occur-highlight {
    background-color: rgb(80, 140, 85);
    box-shadow: 0 0 4px rgb(60, 120, 70);
}
`,"incremental-occur-highlighting",!1),f.Occur=i}),ace.define("ace/commands/occur_commands",["require","exports","module","ace/config","ace/occur","ace/keyboard/hash_handler","ace/lib/oop"],function(p,f,b){var M=p("../config"),y=p("../occur").Occur,$={name:"occur",exec:function(l,s){var c=!!l.session.$occur,h=new y().enter(l,s);h&&!c&&u.installIn(l)},readOnly:!0},v=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(l){var s=l.session.$occur;s&&(s.exit(l,{}),l.session.$occur||u.uninstallFrom(l))},readOnly:!0},{name:"occuraccept",bindKey:"enter",exec:function(l){var s=l.session.$occur;s&&(s.exit(l,{translatePosition:!0}),l.session.$occur||u.uninstallFrom(l))},readOnly:!0}],C=p("../keyboard/hash_handler").HashHandler,i=p("../lib/oop");function u(){}i.inherits(u,C),function(){this.isOccurHandler=!0,this.attach=function(s){C.call(this,v,s.commands.platform),this.$editor=s};var l=this.handleKeyboard;this.handleKeyboard=function(s,c,h,g){var e=l.call(this,s,c,h,g);return e&&e.command?e:void 0}}.call(u.prototype),u.installIn=function(l){var s=new this;l.keyBinding.addKeyboardHandler(s),l.commands.addCommands(v)},u.uninstallFrom=function(l){l.commands.removeCommands(v);var s=l.getKeyboardHandler();s.isOccurHandler&&l.keyBinding.removeKeyboardHandler(s)},f.occurStartCommand=$}),ace.define("ace/commands/incremental_search_commands",["require","exports","module","ace/config","ace/lib/oop","ace/keyboard/hash_handler","ace/commands/occur_commands"],function(p,f,b){var M=p("../config"),y=p("../lib/oop"),$=p("../keyboard/hash_handler").HashHandler,v=p("./occur_commands").occurStartCommand;f.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(i,u){M.loadModule(["core","ace/incremental_search"],function(l){var s=l.iSearch=l.iSearch||new l.IncrementalSearch;s.activate(i,u.backwards),u.jumpToFirstMatch&&s.next(u)})},readOnly:!0},{name:"iSearchBackwards",exec:function(i,u){i.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(i,u){i.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(i){i.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],f.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(i){i.cancelSearch(!0)}},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(i,u){u.useCurrentOrPrevSearch=!0,i.next(u)}},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(i,u){u.useCurrentOrPrevSearch=!0,u.backwards=!0,i.next(u)}},{name:"extendSearchTerm",exec:function(i,u){i.addString(u)}},{name:"extendSearchTermSpace",bindKey:"space",exec:function(i){i.addString(" ")}},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(i){i.removeChar()}},{name:"confirmSearch",bindKey:"return",exec:function(i){i.deactivate()}},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(i){i.deactivate(!0)}},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(i){var u=y.mixin({},i.$options);i.deactivate(),v.exec(i.$editor,u)}},{name:"yankNextWord",bindKey:"Ctrl-w",exec:function(i){var u=i.$editor,l=u.selection.getRangeOfMovements(function(c){c.moveCursorWordRight()}),s=u.session.getTextRange(l);i.addString(s)}},{name:"yankNextChar",bindKey:"Ctrl-Alt-y",exec:function(i){var u=i.$editor,l=u.selection.getRangeOfMovements(function(c){c.moveCursorRight()}),s=u.session.getTextRange(l);i.addString(s)}},{name:"recenterTopBottom",bindKey:"Ctrl-l",exec:function(i){i.$editor.execCommand("recenterTopBottom")}},{name:"selectAllMatches",bindKey:"Ctrl-space",exec:function(i){var u=i.$editor,l=u.session.$isearchHighlight,s=l&&l.cache?l.cache.reduce(function(c,h){return c.concat(h||[])},[]):[];i.deactivate(!1),s.forEach(u.selection.addRange.bind(u.selection))}},{name:"searchAsRegExp",bindKey:"Alt-r",exec:function(i){i.convertNeedleToRegExp()}}].map(function(i){return i.readOnly=!0,i.isIncrementalSearchCommand=!0,i.scrollIntoView="animate-cursor",i});function C(i){this.$iSearch=i}y.inherits(C,$),function(){this.attach=function(u){var l=this.$iSearch;$.call(this,f.iSearchCommands,u.commands.platform),this.$commandExecHandler=u.commands.on("exec",function(s){if(!s.command.isIncrementalSearchCommand)return l.deactivate();s.stopPropagation(),s.preventDefault();var c=u.session.getScrollTop(),h=s.command.exec(l,s.args||{});return u.renderer.scrollCursorIntoView(null,.5),u.renderer.animateScrolling(c),h})},this.detach=function(u){this.$commandExecHandler&&(u.commands.off("exec",this.$commandExecHandler),delete this.$commandExecHandler)};var i=this.handleKeyboard;this.handleKeyboard=function(u,l,s,c){if((l===1||l===8)&&s==="v"||l===1&&s==="y")return null;var h=i.call(this,u,l,s,c);if(h&&h.command)return h;if(l==-1){var g=this.commands.extendSearchTerm;if(g)return{command:g,args:s}}return!1}}.call(C.prototype),f.IncrementalSearchKeyboardHandler=C}),ace.define("ace/incremental_search",["require","exports","module","ace/range","ace/search","ace/search_highlight","ace/commands/incremental_search_commands","ace/lib/dom","ace/commands/command_manager","ace/editor","ace/config"],function(p,f,b){"use strict";var M=this&&this.__extends||function(){var a=function(r,n){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,d){o.__proto__=d}||function(o,d){for(var S in d)Object.prototype.hasOwnProperty.call(d,S)&&(o[S]=d[S])},a(r,n)};return function(r,n){if(typeof n!="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");a(r,n);function o(){this.constructor=r}r.prototype=n===null?Object.create(n):(o.prototype=n.prototype,new o)}}(),y=p("./range").Range,$=p("./search").Search,v=p("./search_highlight").SearchHighlight,C=p("./commands/incremental_search_commands"),i=C.IncrementalSearchKeyboardHandler;function u(a){return a instanceof RegExp}function l(a){var r=String(a),n=r.indexOf("/"),o=r.lastIndexOf("/");return{expression:r.slice(n+1,o),flags:r.slice(o+1)}}function s(a,r){try{return new RegExp(a,r)}catch(n){return a}}function c(a){return s(a.expression,a.flags)}var h=function(a){M(r,a);function r(){var n=a.call(this)||this;return n.$options={wrap:!1,skipCurrent:!1},n.$keyboardHandler=new i(n),n}return r.prototype.activate=function(n,o){this.$editor=n,this.$startPos=this.$currentPos=n.getCursorPosition(),this.$options.needle="",this.$options.backwards=o,n.keyBinding.addKeyboardHandler(this.$keyboardHandler),this.$originalEditorOnPaste=n.onPaste,n.onPaste=this.onPaste.bind(this),this.$mousedownHandler=n.on("mousedown",this.onMouseDown.bind(this)),this.selectionFix(n),this.statusMessage(!0)},r.prototype.deactivate=function(n){this.cancelSearch(n);var o=this.$editor;o.keyBinding.removeKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler&&(o.off("mousedown",this.$mousedownHandler),delete this.$mousedownHandler),o.onPaste=this.$originalEditorOnPaste,this.message("")},r.prototype.selectionFix=function(n){n.selection.isEmpty()&&!n.session.$emacsMark&&n.clearSelection()},r.prototype.highlight=function(n){var o=this.$editor.session,d=o.$isearchHighlight=o.$isearchHighlight||o.addDynamicMarker(new v(null,"ace_isearch-result","text"));d.setRegexp(n),o._emit("changeBackMarker")},r.prototype.cancelSearch=function(n){var o=this.$editor;return this.$prevNeedle=this.$options.needle,this.$options.needle="",n?(o.moveCursorToPosition(this.$startPos),this.$currentPos=this.$startPos):o.pushEmacsMark&&o.pushEmacsMark(this.$startPos,!1),this.highlight(null),y.fromPoints(this.$currentPos,this.$currentPos)},r.prototype.highlightAndFindWithNeedle=function(n,o){if(!this.$editor)return null;var d=this.$options;if(o&&(d.needle=o.call(this,d.needle||"")||""),d.needle.length===0)return this.statusMessage(!0),this.cancelSearch(!0);d.start=this.$currentPos;var S=this.$editor.session,m=this.find(S),k=this.$editor.emacsMark?!!this.$editor.emacsMark():!this.$editor.selection.isEmpty();return m&&(d.backwards&&(m=y.fromPoints(m.end,m.start)),this.$editor.selection.setRange(y.fromPoints(k?this.$startPos:m.end,m.end)),n&&(this.$currentPos=m.end),this.highlight(d.re)),this.statusMessage(m),m},r.prototype.addString=function(n){return this.highlightAndFindWithNeedle(!1,function(o){if(!u(o))return o+n;var d=l(o);return d.expression+=n,c(d)})},r.prototype.removeChar=function(n){return this.highlightAndFindWithNeedle(!1,function(o){if(!u(o))return o.substring(0,o.length-1);var d=l(o);return d.expression=d.expression.substring(0,d.expression.length-1),c(d)})},r.prototype.next=function(n){return n=n||{},this.$options.backwards=!!n.backwards,this.$currentPos=this.$editor.getCursorPosition(),this.highlightAndFindWithNeedle(!0,function(o){return n.useCurrentOrPrevSearch&&o.length===0?this.$prevNeedle||"":o})},r.prototype.onMouseDown=function(n){return this.deactivate(),!0},r.prototype.onPaste=function(n){this.addString(n)},r.prototype.convertNeedleToRegExp=function(){return this.highlightAndFindWithNeedle(!1,function(n){return u(n)?n:s(n,"ig")})},r.prototype.convertNeedleToString=function(){return this.highlightAndFindWithNeedle(!1,function(n){return u(n)?l(n).expression:n})},r.prototype.statusMessage=function(n){var o=this.$options,d="";d+=o.backwards?"reverse-":"",d+="isearch: "+o.needle,d+=n?"":" (not found)",this.message(d)},r.prototype.message=function(n){this.$editor.showCommandLine&&(this.$editor.showCommandLine(n),this.$editor.focus())},r}($);f.IncrementalSearch=h;var g=p("./lib/dom");g.importCssString(`
.ace_marker-layer .ace_isearch-result {
  position: absolute;
  z-index: 6;
  box-sizing: border-box;
}
div.ace_isearch-result {
  border-radius: 4px;
  background-color: rgba(255, 200, 0, 0.5);
  box-shadow: 0 0 4px rgb(255, 200, 0);
}
.ace_dark div.ace_isearch-result {
  background-color: rgb(100, 110, 160);
  box-shadow: 0 0 4px rgb(80, 90, 140);
}`,"incremental-search-highlighting",!1);var e=p("./commands/command_manager");(function(){this.setupIncrementalSearch=function(a,r){if(this.usesIncrementalSearch!=r){this.usesIncrementalSearch=r;var n=C.iSearchStartCommands,o=r?"addCommands":"removeCommands";this[o](n)}}}).call(e.CommandManager.prototype);var t=p("./editor").Editor;p("./config").defineOptions(t.prototype,"editor",{useIncrementalSearch:{set:function(a){this.keyBinding.$handlers.forEach(function(r){r.setupIncrementalSearch&&r.setupIncrementalSearch(this,a)}),this._emit("incrementalSearchSettingChanged",{isEnabled:a})}}})}),ace.define("ace/keyboard/emacs",["require","exports","module","ace/lib/dom","ace/incremental_search","ace/commands/incremental_search_commands","ace/keyboard/hash_handler","ace/lib/keys"],function(p,f,b){"use strict";var M=p("../lib/dom");p("../incremental_search");var y=p("../commands/incremental_search_commands"),$=p("./hash_handler").HashHandler;f.handler=new $,f.handler.isEmacs=!0,f.handler.$id="ace/keyboard/emacs",M.importCssString(`
.emacs-mode .ace_cursor{
    border: 1px rgba(50,250,50,0.8) solid!important;
    box-sizing: border-box!important;
    background-color: rgba(0,250,0,0.9);
    opacity: 0.5;
}
.emacs-mode .ace_hidden-cursors .ace_cursor{
    opacity: 1;
    background-color: transparent;
}
.emacs-mode .ace_overwrite-cursors .ace_cursor {
    opacity: 1;
    background-color: transparent;
    border-width: 0 0 2px 2px !important;
}
.emacs-mode .ace_text-layer {
    z-index: 4
}
.emacs-mode .ace_cursor-layer {
    z-index: 2
}`,"emacsMode");var v,C;f.handler.attach=function(e){v=e.session.$selectLongWords,e.session.$selectLongWords=!0,C=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.$emacsMark=null,e.session.$emacsMarkRing=e.session.$emacsMarkRing||[],e.emacsMark=function(){return this.session.$emacsMark},e.setEmacsMark=function(t){this.session.$emacsMark=t},e.pushEmacsMark=function(t,a){var r=this.session.$emacsMark;r&&i(this.session.$emacsMarkRing,r),!t||a?this.setEmacsMark(t):i(this.session.$emacsMarkRing,t)},e.popEmacsMark=function(){var t=this.emacsMark();return t?(this.setEmacsMark(null),t):this.session.$emacsMarkRing.pop()},e.getLastEmacsMark=function(t){return this.session.$emacsMark||this.session.$emacsMarkRing.slice(-1)[0]},e.emacsMarkForSelection=function(t){var a=this.selection,r=this.multiSelect?this.multiSelect.getAllRanges().length:1,n=a.index||0,o=this.session.$emacsMarkRing,d=o.length-(r-n),S=o[d]||a.anchor;return t&&o.splice(d,1,"row"in t&&"column"in t?t:void 0),S},e.on("click",l),e.on("changeSession",u),e.renderer.$blockCursor=!0,e.setStyle("emacs-mode"),e.commands.addCommands(g),f.handler.platform=e.commands.platform,e.$emacsModeHandler=this,e.on("copy",this.onCopy),e.on("paste",this.onPaste)};function i(e,t){var a=e[e.length-1];a&&a.row===t.row&&a.column===t.column||e.push(t)}f.handler.detach=function(e){e.renderer.$blockCursor=!1,e.session.$selectLongWords=v,e.session.$useEmacsStyleLineStart=C,e.off("click",l),e.off("changeSession",u),e.unsetStyle("emacs-mode"),e.commands.removeCommands(g),e.off("copy",this.onCopy),e.off("paste",this.onPaste),e.$emacsModeHandler=null};var u=function(e){e.oldSession&&(e.oldSession.$selectLongWords=v,e.oldSession.$useEmacsStyleLineStart=C),v=e.session.$selectLongWords,e.session.$selectLongWords=!0,C=e.session.$useEmacsStyleLineStart,e.session.$useEmacsStyleLineStart=!0,e.session.hasOwnProperty("$emacsMark")||(e.session.$emacsMark=null),e.session.hasOwnProperty("$emacsMarkRing")||(e.session.$emacsMarkRing=[])},l=function(e){e.editor.session.$emacsMark=null},s=p("../lib/keys").KEY_MODS,c={C:"ctrl",S:"shift",M:"alt",CMD:"command"},h=["C-S-M-CMD","S-M-CMD","C-M-CMD","C-S-CMD","C-S-M","M-CMD","S-CMD","S-M","C-CMD","C-M","C-S","CMD","M","S","C"];h.forEach(function(e){var t=0;e.split("-").forEach(function(a){t=t|s[c[a]]}),c[t]=e.toLowerCase()+"-"}),f.handler.onCopy=function(e,t){t.$handlesEmacsOnCopy||(t.$handlesEmacsOnCopy=!0,f.handler.commands.killRingSave.exec(t),t.$handlesEmacsOnCopy=!1)},f.handler.onPaste=function(e,t){t.pushEmacsMark(t.getCursorPosition())},f.handler.bindKey=function(e,t){if(typeof e=="object"&&(e=e[this.platform]),!!e){var a=this.commandKeyBinding;e.split("|").forEach(function(r){r=r.toLowerCase(),a[r]=t;var n=r.split(" ").slice(0,-1);n.reduce(function(o,d,S){var m=o[S-1]?o[S-1]+" ":"";return o.concat([m+d])},[]).forEach(function(o){a[o]||(a[o]="null")})},this)}},f.handler.getStatusText=function(e,t){var a="";return t.count&&(a+=t.count),t.keyChain&&(a+=" "+t.keyChain),a},f.handler.handleKeyboard=function(e,t,a,r){if(r!==-1){var n=e.editor;if(n._signal("changeStatus"),t==-1&&(n.pushEmacsMark(),e.count)){var o=new Array(e.count+1).join(a);return e.count=null,{command:"insertstring",args:o}}var d=c[t];if(d=="c-"||e.count){var S=parseInt(a[a.length-1]);if(typeof S=="number"&&!isNaN(S))return e.count=Math.max(e.count,0)||0,e.count=10*e.count+S,{command:"null"}}d&&(a=d+a),e.keyChain&&(a=e.keyChain+=" "+a);var m=this.commandKeyBinding[a];if(e.keyChain=m=="null"?a:"",!!m){if(m==="null")return{command:"null"};if(m==="universalArgument")return e.count=-4,{command:"null"};var k;if(typeof m!="string"&&(k=m.args,m.command&&(m=m.command),m==="goorselect"&&(m=n.emacsMark()?k[1]:k[0],k=null)),!(typeof m=="string"&&((m==="insertstring"||m==="splitline"||m==="togglecomment")&&n.pushEmacsMark(),m=this.commands[m]||n.commands.commands[m],!m))){if(!m.readOnly&&!m.isYank&&(e.lastCommand=null),!m.readOnly&&n.emacsMark()&&n.setEmacsMark(null),e.count){var S=e.count;if(e.count=0,!m||!m.handlesCount)return{args:k,command:{exec:function(w,E){for(var x=0;x<S;x++)m.exec(w,E)},multiSelectAction:m.multiSelectAction}};k||(k={}),typeof k=="object"&&(k.count=S)}return{command:m,args:k}}}}},f.emacsKeys={"Up|C-p":{command:"goorselect",args:["golineup","selectup"]},"Down|C-n":{command:"goorselect",args:["golinedown","selectdown"]},"Left|C-b":{command:"goorselect",args:["gotoleft","selectleft"]},"Right|C-f":{command:"goorselect",args:["gotoright","selectright"]},"C-Left|M-b":{command:"goorselect",args:["gotowordleft","selectwordleft"]},"C-Right|M-f":{command:"goorselect",args:["gotowordright","selectwordright"]},"Home|C-a":{command:"goorselect",args:["gotolinestart","selecttolinestart"]},"End|C-e":{command:"goorselect",args:["gotolineend","selecttolineend"]},"C-Home|S-M-,":{command:"goorselect",args:["gotostart","selecttostart"]},"C-End|S-M-.":{command:"goorselect",args:["gotoend","selecttoend"]},"S-Up|S-C-p":"selectup","S-Down|S-C-n":"selectdown","S-Left|S-C-b":"selectleft","S-Right|S-C-f":"selectright","S-C-Left|S-M-b":"selectwordleft","S-C-Right|S-M-f":"selectwordright","S-Home|S-C-a":"selecttolinestart","S-End|S-C-e":"selecttolineend","S-C-Home":"selecttostart","S-C-End":"selecttoend","C-l":"recenterTopBottom","M-s":"centerselection","M-g":"gotoline","C-x C-p":"selectall","C-Down":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"C-Up":{command:"goorselect",args:["gotopageup","selectpageup"]},"PageDown|C-v":{command:"goorselect",args:["gotopagedown","selectpagedown"]},"PageUp|M-v":{command:"goorselect",args:["gotopageup","selectpageup"]},"S-C-Down":"selectpagedown","S-C-Up":"selectpageup","C-s":"iSearch","C-r":"iSearchBackwards","M-C-s":"findnext","M-C-r":"findprevious","S-M-5":"replace",Backspace:"backspace","Delete|C-d":"del","Return|C-m":{command:"insertstring",args:`
`},"C-o":"splitline","M-d|C-Delete":{command:"killWord",args:"right"},"C-Backspace|M-Backspace|M-Delete":{command:"killWord",args:"left"},"C-k":"killLine","C-y|S-Delete":"yank","M-y":"yankRotate","C-g":"keyboardQuit","C-w|C-S-W":"killRegion","M-w":"killRingSave","C-Space":"setMark","C-x C-x":"exchangePointAndMark","C-t":"transposeletters","M-u":"touppercase","M-l":"tolowercase","M-/":"autocomplete","C-u":"universalArgument","M-;":"togglecomment","C-/|C-x u|S-C--|C-z":"undo","S-C-/|S-C-x u|C--|S-C-z":"redo","C-x r":"selectRectangularRegion","M-x":{command:"focusCommandLine",args:"M-x "}},f.handler.bindKeys(f.emacsKeys),f.handler.addCommands({recenterTopBottom:function(e){var t=e.renderer,a=t.$cursorLayer.getPixelPosition(),r=t.$size.scrollerHeight-t.lineHeight,n=t.scrollTop;Math.abs(a.top-n)<2?n=a.top-r:Math.abs(a.top-n-r*.5)<2?n=a.top:n=a.top-r*.5,e.session.setScrollTop(n)},selectRectangularRegion:function(e){e.multiSelect.toggleBlockSelection()},setMark:{exec:function(e,t){if(t&&t.count){e.inMultiSelectMode?e.forEachSelection(S):S(),S();return}var a=e.emacsMark(),r=e.selection.getAllRanges(),n=r.map(function(m){return{row:m.start.row,column:m.start.column}}),o=!0,d=r.every(function(m){return m.isEmpty()});if(o&&(a||!d)){e.inMultiSelectMode?e.forEachSelection({exec:e.clearSelection.bind(e)}):e.clearSelection(),a&&e.pushEmacsMark(null);return}if(!a){n.forEach(function(m){e.pushEmacsMark(m)}),e.setEmacsMark(n[n.length-1]);return}function S(){var m=e.popEmacsMark();m&&e.moveCursorToPosition(m)}},readOnly:!0,handlesCount:!0},exchangePointAndMark:{exec:function(t,a){var r=t.selection;if(!a.count&&!r.isEmpty()){r.setSelectionRange(r.getRange(),!r.isBackwards());return}if(a.count){var n={row:r.lead.row,column:r.lead.column};r.clearSelection(),r.moveCursorToPosition(t.emacsMarkForSelection(n))}else r.selectToPosition(t.emacsMarkForSelection())},readOnly:!0,handlesCount:!0,multiSelectAction:"forEach"},killWord:{exec:function(e,t){e.clearSelection(),t=="left"?e.selection.selectWordLeft():e.selection.selectWordRight();var a=e.getSelectionRange(),r=e.session.getTextRange(a);f.killRing.add(r),e.session.remove(a),e.clearSelection()},multiSelectAction:"forEach"},killLine:function(e){e.pushEmacsMark(null),e.clearSelection();var t=e.getSelectionRange(),a=e.session.getLine(t.start.row);t.end.column=a.length,a=a.substr(t.start.column);var r=e.session.getFoldLine(t.start.row);r&&t.end.row!=r.end.row&&(t.end.row=r.end.row,a="x"),/^\s*$/.test(a)&&(t.end.row++,a=e.session.getLine(t.end.row),t.end.column=/^\s*$/.test(a)?a.length:0);var n=e.session.getTextRange(t);e.prevOp.command==this?f.killRing.append(n):f.killRing.add(n),e.session.remove(t),e.clearSelection()},yank:function(e){e.onPaste(f.killRing.get()||""),e.keyBinding.$data.lastCommand="yank"},yankRotate:function(e){e.keyBinding.$data.lastCommand=="yank"&&(e.undo(),e.session.$emacsMarkRing.pop(),e.onPaste(f.killRing.rotate()),e.keyBinding.$data.lastCommand="yank")},killRegion:{exec:function(e){f.killRing.add(e.getCopyText()),e.commands.byName.cut.exec(e),e.setEmacsMark(null)},readOnly:!0,multiSelectAction:"forEach"},killRingSave:{exec:function(e){e.$handlesEmacsOnCopy=!0;var t=e.session.$emacsMarkRing.slice(),a=[];f.killRing.add(e.getCopyText()),setTimeout(function(){function r(){var n=e.selection,o=n.getRange(),d=n.isBackwards()?o.end:o.start;a.push({row:d.row,column:d.column}),n.clearSelection()}e.$handlesEmacsOnCopy=!1,e.inMultiSelectMode?e.forEachSelection({exec:r}):r(),e.setEmacsMark(null),e.session.$emacsMarkRing=t.concat(a.reverse())},0)},readOnly:!0},keyboardQuit:function(e){e.selection.clearSelection(),e.setEmacsMark(null),e.keyBinding.$data.count=null},focusCommandLine:function(e,t){e.showCommandLine&&e.showCommandLine(t)}}),f.handler.addCommands(y.iSearchStartCommands);var g=f.handler.commands;g.yank.isYank=!0,g.yankRotate.isYank=!0,f.killRing={$data:[],add:function(e){e&&this.$data.push(e),this.$data.length>30&&this.$data.shift()},append:function(e){var t=this.$data.length-1,a=this.$data[t]||"";e&&(a+=e),a&&(this.$data[t]=a)},get:function(e){return e=e||1,this.$data.slice(this.$data.length-e,this.$data.length).reverse().join(`
`)},pop:function(){return this.$data.length>1&&this.$data.pop(),this.get()},rotate:function(){return this.$data.unshift(this.$data.pop()),this.get()}}}),function(){ace.require(["ace/keyboard/emacs"],function(p){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=p)})}();
