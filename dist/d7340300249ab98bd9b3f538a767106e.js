ace.define("ace/ext/static-css",["require","exports","module"],function(l,N,v){v.exports=`.ace_static_highlight {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', 'Droid Sans Mono', monospace;
    font-size: 12px;
    white-space: pre-wrap
}

.ace_static_highlight .ace_gutter {
    width: 2em;
    text-align: right;
    padding: 0 3px 0 0;
    margin-right: 3px;
    contain: none;
}

.ace_static_highlight.ace_show_gutter .ace_line {
    padding-left: 2.6em;
}

.ace_static_highlight .ace_line { position: relative; }

.ace_static_highlight .ace_gutter-cell {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    top: 0;
    bottom: 0;
    left: 0;
    position: absolute;
}


.ace_static_highlight .ace_gutter-cell:before {
    content: counter(ace_line, decimal);
    counter-increment: ace_line;
}
.ace_static_highlight {
    counter-reset: ace_line;
}
`}),ace.define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text","ace/ext/static-css","ace/config","ace/lib/dom","ace/lib/lang"],function(l,N,v){"use strict";var x=l("../edit_session").EditSession,S=l("../layer/text").Text,M=l("./static-css"),y=l("../config"),T=l("../lib/dom"),L=l("../lib/lang").escapeHTML,C=function(){function t(e){this.className,this.type=e,this.style={},this.textContent=""}return t.prototype.cloneNode=function(){return this},t.prototype.appendChild=function(e){this.textContent+=e.toString()},t.prototype.toString=function(){var e=[];if(this.type!="fragment"){e.push("<",this.type),this.className&&e.push(" class='",this.className,"'");var a=[];for(var r in this.style)a.push(r,":",this.style[r]);a.length&&e.push(" style='",a.join(""),"'"),e.push(">")}return this.textContent&&e.push(this.textContent),this.type!="fragment"&&e.push("</",this.type,">"),e.join("")},t}(),g={createTextNode:function(t,e){return L(t)},createElement:function(t){return new C(t)},createFragment:function(){return new C("fragment")}},b=function(){this.config={},this.dom=g};b.prototype=S.prototype;var d=function(t,e,a){var r=t.className.match(/lang-(\w+)/),u=e.mode||r&&"ace/mode/"+r[1];if(!u)return!1;var o=e.theme||"ace/theme/textmate",n="",h=[];if(t.firstElementChild)for(var c=0,s=0;s<t.childNodes.length;s++){var i=t.childNodes[s];i.nodeType==3?(c+=i.data.length,n+=i.data):h.push(c,i)}else n=t.textContent,e.trim&&(n=n.trim());d.render(n,u,o,e.firstLineNumber,!e.showGutter,function(f){T.importCssString(f.css,"ace_highlight",!0),t.innerHTML=f.html;for(var m=t.firstChild.firstChild,p=0;p<h.length;p+=2){var _=f.session.doc.indexToPosition(h[p]),j=h[p+1],w=m.children[_.row];w&&w.appendChild(j)}a&&a()})};d.render=function(t,e,a,r,u,o){var n=1,h=x.prototype.$modes;typeof a=="string"&&(n++,y.loadModule(["theme",a],function(i){a=i,--n||s()}));var c;e&&typeof e=="object"&&!e.getTokenizer&&(c=e,e=c.path),typeof e=="string"&&(n++,y.loadModule(["mode",e],function(i){(!h[e]||c)&&(h[e]=new i.Mode(c)),e=h[e],--n||s()}));function s(){var i=d.renderSync(t,e,a,r,u);return o?o(i):i}return--n||s()},d.renderSync=function(t,e,a,r,u){r=parseInt(r||1,10);var o=new x("");o.setUseWorker(!1),o.setMode(e);var n=new b;n.setSession(o),Object.keys(n.$tabStrings).forEach(function(p){if(typeof n.$tabStrings[p]=="string"){var _=g.createFragment();_.textContent=n.$tabStrings[p],n.$tabStrings[p]=_}}),o.setValue(t);var h=o.getLength(),c=g.createElement("div");c.className=a.cssClass;var s=g.createElement("div");s.className="ace_static_highlight"+(u?"":" ace_show_gutter"),s.style["counter-reset"]="ace_line "+(r-1);for(var i=0;i<h;i++){var f=g.createElement("div");if(f.className="ace_line",!u){var m=g.createElement("span");m.className="ace_gutter ace_gutter-cell",m.textContent="",f.appendChild(m)}n.$renderLine(f,i,!1),f.textContent+=`
`,s.appendChild(f)}return c.appendChild(s),{css:M+a.cssText,html:c.toString(),session:o}},v.exports=d,v.exports.highlight=d}),function(){ace.require(["ace/ext/static_highlight"],function(l){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=l)})}();
