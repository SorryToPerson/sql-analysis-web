ace.define("ace/ext/rtl",["require","exports","module","ace/editor","ace/config"],function(r,p,x){"use strict";var a=[{name:"leftToRight",bindKey:{win:"Ctrl-Alt-Shift-L",mac:"Command-Alt-Shift-L"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!1)},readOnly:!0},{name:"rightToLeft",bindKey:{win:"Ctrl-Alt-Shift-R",mac:"Command-Alt-Shift-R"},exec:function(e){e.session.$bidiHandler.setRtlDirection(e,!0)},readOnly:!0}],u=r("../editor").Editor;r("../config").defineOptions(u.prototype,"editor",{rtlText:{set:function(e){e?(this.on("change",f),this.on("changeSelection",d),this.renderer.on("afterRender",l),this.commands.on("exec",c),this.commands.addCommands(a)):(this.off("change",f),this.off("changeSelection",d),this.renderer.off("afterRender",l),this.commands.off("exec",c),this.commands.removeCommands(a),h(this.renderer)),this.renderer.updateFull()}},rtl:{set:function(e){this.session.$bidiHandler.$isRtl=e,e?(this.setOption("rtlText",!1),this.renderer.on("afterRender",l),this.session.$bidiHandler.seenBidi=!0):(this.renderer.off("afterRender",l),h(this.renderer)),this.renderer.updateFull()}}});function d(e,t){var i=t.getSelection().lead;t.session.$bidiHandler.isRtlLine(i.row)&&i.column===0&&(t.session.$bidiHandler.isMoveLeftOperation&&i.row>0?t.getSelection().moveCursorTo(i.row-1,t.session.getLine(i.row-1).length):t.getSelection().isEmpty()?i.column+=1:i.setPosition(i.row,i.column+1))}function c(e){e.editor.session.$bidiHandler.isMoveLeftOperation=/gotoleft|selectleft|backspace|removewordleft/.test(e.command.name)}function f(e,t){var i=t.session;if(i.$bidiHandler.currentRow=null,i.$bidiHandler.isRtlLine(e.start.row)&&e.action==="insert"&&e.lines.length>1)for(var n=e.start.row;n<e.end.row;n++)i.getLine(n+1).charAt(0)!==i.$bidiHandler.RLE&&(i.doc.$lines[n+1]=i.$bidiHandler.RLE+i.getLine(n+1))}function l(e,t){var i=t.session,n=i.$bidiHandler,s=t.$textLayer.$lines.cells,g=t.layerConfig.width-t.layerConfig.padding+"px";s.forEach(function(m){var o=m.element.style;n&&n.isRtlLine(m.row)?(o.direction="rtl",o.textAlign="right",o.width=g):(o.direction="",o.textAlign="",o.width="")})}function h(e){var t=e.$textLayer.$lines;t.cells.forEach(i),t.cellCache.forEach(i);function i(n){var s=n.element.style;s.direction=s.textAlign=s.width=""}}}),function(){ace.require(["ace/ext/rtl"],function(r){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=r)})}();
