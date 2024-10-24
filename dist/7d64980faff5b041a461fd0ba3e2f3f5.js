ace.define("ace/ext/code_lens",["require","exports","module","ace/line_widgets","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/editor","ace/config"],function(r,L,S){"use strict";var y=r("../line_widgets").LineWidgets,b=r("../lib/event"),_=r("../lib/lang"),$=r("../lib/dom");function W(e){var t=e.$textLayer,n=t.$lenses;n&&n.forEach(function(o){o.remove()}),t.$lenses=null}function E(e,t){var n=e&t.CHANGE_LINES||e&t.CHANGE_FULL||e&t.CHANGE_SCROLL||e&t.CHANGE_TEXT;if(n){var o=t.session,i=t.session.lineWidgets,u=t.$textLayer,a=u.$lenses;if(!i){a&&W(t);return}var v=t.$textLayer.$lines.cells,c=t.layerConfig,p=t.$padding;a||(a=u.$lenses=[]);for(var l=0,m=0;m<v.length;m++){var d=v[m].row,g=i[d],h=g&&g.lenses;if(!(!h||!h.length)){var s=a[l];s||(s=a[l]=$.buildDom(["div",{class:"ace_codeLens"}],t.container)),s.style.height=c.lineHeight+"px",l++;for(var f=0;f<h.length;f++){var w=s.childNodes[2*f];w||(f!=0&&s.appendChild($.createTextNode("\xA0|\xA0")),w=$.buildDom(["a"],s)),w.textContent=h[f].title,w.lensCommand=h[f]}for(;s.childNodes.length>2*f-1;)s.lastChild.remove();var M=t.$cursorLayer.getPixelPosition({row:d,column:0},!0).top-c.lineHeight*g.rowsAbove-c.offset;s.style.top=M+"px";var C=t.gutterWidth,x=o.getLine(d).search(/\S|$/);x==-1&&(x=0),C+=x*c.characterWidth,s.style.paddingLeft=p+C+"px"}}for(;l<a.length;)a.pop().remove()}}function H(e){if(e.lineWidgets){var t=e.widgetManager;e.lineWidgets.forEach(function(n){n&&n.lenses&&t.removeLineWidget(n)})}}L.setLenses=function(e,t){var n=Number.MAX_VALUE;return H(e),t&&t.forEach(function(o){var i=o.start.row,u=o.start.column,a=e.lineWidgets&&e.lineWidgets[i];(!a||!a.lenses)&&(a=e.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:i,column:u,lenses:[]})),a.lenses.push(o.command),i<n&&(n=i)}),e._emit("changeFold",{data:{start:{row:n}}}),n};function T(e){e.codeLensProviders=[],e.renderer.on("afterRender",E),e.$codeLensClickHandler||(e.$codeLensClickHandler=function(n){var o=n.target.lensCommand;o&&(e.execCommand(o.id,o.arguments),e._emit("codeLensClick",n))},b.addListener(e.container,"click",e.$codeLensClickHandler,e)),e.$updateLenses=function(){var n=e.session;if(!n)return;n.widgetManager||(n.widgetManager=new y(n),n.widgetManager.attach(e));var o=e.codeLensProviders.length,i=[];e.codeLensProviders.forEach(function(a){a.provideCodeLenses(n,function(v,c){v||(c.forEach(function(p){i.push(p)}),o--,o==0&&u())})});function u(){var a=n.selection.cursor,v=n.documentToScreenRow(a),c=n.getScrollTop(),p=L.setLenses(n,i),l=n.$undoManager&&n.$undoManager.$lastDelta;if(!(l&&l.action=="remove"&&l.lines.length>1)){var m=n.documentToScreenRow(a),d=e.renderer.layerConfig.lineHeight,g=n.getScrollTop()+(m-v)*d;p==0&&c<d/4&&c>-d/4&&(g=-d),n.setScrollTop(g)}}};var t=_.delayedCall(e.$updateLenses);e.$updateLensesOnInput=function(){t.delay(250)},e.on("input",e.$updateLensesOnInput)}function k(e){e.off("input",e.$updateLensesOnInput),e.renderer.off("afterRender",E),e.$codeLensClickHandler&&e.container.removeEventListener("click",e.$codeLensClickHandler)}L.registerCodeLensProvider=function(e,t){e.setOption("enableCodeLens",!0),e.codeLensProviders.push(t),e.$updateLensesOnInput()},L.clear=function(e){L.setLenses(e,null)};var N=r("../editor").Editor;r("../config").defineOptions(N.prototype,"editor",{enableCodeLens:{set:function(e){e?T(this):k(this)}}}),$.importCssString(`
.ace_codeLens {
    position: absolute;
    color: #aaa;
    font-size: 88%;
    background: inherit;
    width: 100%;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
}
.ace_codeLens > a {
    cursor: pointer;
    pointer-events: auto;
}
.ace_codeLens > a:hover {
    color: #0000ff;
    text-decoration: underline;
}
.ace_dark > .ace_codeLens > a:hover {
    color: #4e94ce;
}
`,"codelense.css",!1)}),function(){ace.require(["ace/ext/code_lens"],function(r){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=r)})}();
