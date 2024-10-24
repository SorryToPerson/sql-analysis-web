ace.define("ace/ext/command_bar",["require","exports","module","ace/tooltip","ace/lib/event_emitter","ace/lib/lang","ace/lib/dom","ace/lib/oop","ace/lib/useragent"],function(p,y,D){var H=this&&this.__values||function(o){var t=typeof Symbol=="function"&&Symbol.iterator,e=t&&o[t],i=0;if(e)return e.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},S=p("../tooltip").Tooltip,k=p("../lib/event_emitter").EventEmitter,E=p("../lib/lang"),u=p("../lib/dom"),P=p("../lib/oop"),C=p("../lib/useragent"),a="command_bar_tooltip_button",$="command_bar_button_value",O="command_bar_button_caption",g="command_bar_keybinding",d="command_bar_tooltip",T="MoreOptionsButton",M=100,A=4,w=function(o,t){return t.row>o.row||t.row===o.row&&t.column>o.column?o:t},b={Ctrl:{mac:"^"},Option:{mac:"\u2325"},Command:{mac:"\u2318"},Cmd:{mac:"\u2318"},Shift:"\u21E7",Left:"\u2190",Right:"\u2192",Up:"\u2191",Down:"\u2193"},x=function(){function o(t,e){var i,l;e=e||{},this.parentNode=t,this.tooltip=new S(this.parentNode),this.moreOptions=new S(this.parentNode),this.maxElementsOnTooltip=e.maxElementsOnTooltip||A,this.$alwaysShow=e.alwaysShow||!1,this.eventListeners={},this.elements={},this.commands={},this.tooltipEl=u.buildDom(["div",{class:d}],this.tooltip.getElement()),this.moreOptionsEl=u.buildDom(["div",{class:d+" tooltip_more_options"}],this.moreOptions.getElement()),this.$showTooltipTimer=E.delayedCall(this.$showTooltip.bind(this),e.showDelay||M),this.$hideTooltipTimer=E.delayedCall(this.$hideTooltip.bind(this),e.hideDelay||M),this.$tooltipEnter=this.$tooltipEnter.bind(this),this.$onMouseMove=this.$onMouseMove.bind(this),this.$onChangeScroll=this.$onChangeScroll.bind(this),this.$onEditorChangeSession=this.$onEditorChangeSession.bind(this),this.$scheduleTooltipForHide=this.$scheduleTooltipForHide.bind(this),this.$preventMouseEvent=this.$preventMouseEvent.bind(this);try{for(var s=H(["mousedown","mouseup","click"]),n=s.next();!n.done;n=s.next()){var r=n.value;this.tooltip.getElement().addEventListener(r,this.$preventMouseEvent),this.moreOptions.getElement().addEventListener(r,this.$preventMouseEvent)}}catch(c){i={error:c}}finally{try{n&&!n.done&&(l=s.return)&&l.call(s)}finally{if(i)throw i.error}}}return o.prototype.registerCommand=function(t,e){var i=Object.keys(this.commands).length<this.maxElementsOnTooltip;!i&&!this.elements[T]&&this.$createCommand(T,{name:"\xB7\xB7\xB7",exec:function(){this.$shouldHideMoreOptions=!1,this.$setMoreOptionsVisibility(!this.isMoreOptionsShown())}.bind(this),type:"checkbox",getValue:function(){return this.isMoreOptionsShown()}.bind(this),enabled:!0},!0),this.$createCommand(t,e,i),this.isShown()&&this.updatePosition()},o.prototype.isShown=function(){return!!this.tooltip&&this.tooltip.isOpen},o.prototype.isMoreOptionsShown=function(){return!!this.moreOptions&&this.moreOptions.isOpen},o.prototype.getAlwaysShow=function(){return this.$alwaysShow},o.prototype.setAlwaysShow=function(t){this.$alwaysShow=t,this.$updateOnHoverHandlers(!this.$alwaysShow),this._signal("alwaysShow",this.$alwaysShow)},o.prototype.attach=function(t){!t||this.isShown()&&this.editor===t||(this.detach(),this.editor=t,this.editor.on("changeSession",this.$onEditorChangeSession),this.editor.session&&(this.editor.session.on("changeScrollLeft",this.$onChangeScroll),this.editor.session.on("changeScrollTop",this.$onChangeScroll)),this.getAlwaysShow()?this.$showTooltip():this.$updateOnHoverHandlers(!0))},o.prototype.updatePosition=function(){if(this.editor){var t=this.editor.renderer,e;if(this.editor.selection.getAllRanges?e=this.editor.selection.getAllRanges():e=[this.editor.getSelectionRange()],!!e.length){for(var i=w(e[0].start,e[0].end),l=0,s;s=e[l];l++)i=w(i,w(s.start,s.end));var n=t.$cursorLayer.getPixelPosition(i,!0),r=this.tooltip.getElement(),c=window.innerWidth,h=window.innerHeight,v=this.editor.container.getBoundingClientRect();n.top+=v.top-t.layerConfig.offset,n.left+=v.left+t.gutterWidth-t.scrollLeft;var L=n.top>=v.top&&n.top<=v.bottom&&n.left>=v.left+t.gutterWidth&&n.left<=v.right;if(!L&&this.isShown()){this.$hideTooltip();return}else if(L&&!this.isShown()&&this.getAlwaysShow()){this.$showTooltip();return}var f=n.top-r.offsetHeight,m=Math.min(c-r.offsetWidth,n.left),N=f>=0&&f+r.offsetHeight<=h&&m>=0&&m+r.offsetWidth<=c;if(!N){this.$hideTooltip();return}if(this.tooltip.setPosition(m,f),this.isMoreOptionsShown()){f=f+r.offsetHeight,m=this.elements[T].getBoundingClientRect().left;var _=this.moreOptions.getElement(),h=window.innerHeight;f+_.offsetHeight>h&&(f-=r.offsetHeight+_.offsetHeight),m+_.offsetWidth>c&&(m=c-_.offsetWidth),this.moreOptions.setPosition(m,f)}}}},o.prototype.update=function(){Object.keys(this.elements).forEach(this.$updateElement.bind(this))},o.prototype.detach=function(){this.tooltip.hide(),this.moreOptions.hide(),this.$updateOnHoverHandlers(!1),this.editor&&(this.editor.off("changeSession",this.$onEditorChangeSession),this.editor.session&&(this.editor.session.off("changeScrollLeft",this.$onChangeScroll),this.editor.session.off("changeScrollTop",this.$onChangeScroll))),this.$mouseInTooltip=!1,this.editor=null},o.prototype.destroy=function(){this.tooltip&&this.moreOptions&&(this.detach(),this.tooltip.destroy(),this.moreOptions.destroy()),this.eventListeners={},this.commands={},this.elements={},this.tooltip=this.moreOptions=this.parentNode=null},o.prototype.$createCommand=function(t,e,i){var l=i?this.tooltipEl:this.moreOptionsEl,s=[],n=e.bindKey;n&&(typeof n=="object"&&(n=C.isMac?n.mac:n.win),n=n.split("|")[0],s=n.split("-"),s=s.map(function(h){if(b[h]){if(typeof b[h]=="string")return b[h];if(C.isMac&&b[h].mac)return b[h].mac}return h}));var r;i&&e.iconCssClass?r=["div",{class:["ace_icon_svg",e.iconCssClass].join(" "),"aria-label":e.name+" ("+e.bindKey+")"}]:(r=[["div",{class:$}],["div",{class:O},e.name]],s.length&&r.push(["div",{class:g},s.map(function(h){return["div",h]})])),u.buildDom(["div",{class:[a,e.cssClass||""].join(" "),ref:t},r],l,this.elements),this.commands[t]=e;var c=function(h){this.editor&&this.editor.focus(),this.$shouldHideMoreOptions=this.isMoreOptionsShown(),!this.elements[t].disabled&&e.exec&&e.exec(this.editor),this.$shouldHideMoreOptions&&this.$setMoreOptionsVisibility(!1),this.update(),h.preventDefault()}.bind(this);this.eventListeners[t]=c,this.elements[t].addEventListener("click",c.bind(this)),this.$updateElement(t)},o.prototype.$setMoreOptionsVisibility=function(t){t?(this.moreOptions.setTheme(this.editor.renderer.theme),this.moreOptions.setClassName(d+"_wrapper"),this.moreOptions.show(),this.update(),this.updatePosition()):this.moreOptions.hide()},o.prototype.$onEditorChangeSession=function(t){t.oldSession&&(t.oldSession.off("changeScrollTop",this.$onChangeScroll),t.oldSession.off("changeScrollLeft",this.$onChangeScroll)),this.detach()},o.prototype.$onChangeScroll=function(){this.editor.renderer&&(this.isShown()||this.getAlwaysShow())&&this.editor.renderer.once("afterRender",this.updatePosition.bind(this))},o.prototype.$onMouseMove=function(t){if(!this.$mouseInTooltip){var e=this.editor.getCursorPosition(),i=this.editor.renderer.textToScreenCoordinates(e.row,e.column),l=this.editor.renderer.lineHeight,s=t.clientY>=i.pageY&&t.clientY<i.pageY+l;s?(!this.isShown()&&!this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.delay(),this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.cancel()):(this.isShown()&&!this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.delay(),this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.cancel())}},o.prototype.$preventMouseEvent=function(t){this.editor&&this.editor.focus(),t.preventDefault()},o.prototype.$scheduleTooltipForHide=function(){this.$mouseInTooltip=!1,this.$showTooltipTimer.cancel(),this.$hideTooltipTimer.delay()},o.prototype.$tooltipEnter=function(){this.$mouseInTooltip=!0,this.$showTooltipTimer.isPending()&&this.$showTooltipTimer.cancel(),this.$hideTooltipTimer.isPending()&&this.$hideTooltipTimer.cancel()},o.prototype.$updateOnHoverHandlers=function(t){var e=this.tooltip.getElement(),i=this.moreOptions.getElement();t?(this.editor&&(this.editor.on("mousemove",this.$onMouseMove),this.editor.renderer.getMouseEventTarget().addEventListener("mouseout",this.$scheduleTooltipForHide,!0)),e.addEventListener("mouseenter",this.$tooltipEnter),e.addEventListener("mouseleave",this.$scheduleTooltipForHide),i.addEventListener("mouseenter",this.$tooltipEnter),i.addEventListener("mouseleave",this.$scheduleTooltipForHide)):(this.editor&&(this.editor.off("mousemove",this.$onMouseMove),this.editor.renderer.getMouseEventTarget().removeEventListener("mouseout",this.$scheduleTooltipForHide,!0)),e.removeEventListener("mouseenter",this.$tooltipEnter),e.removeEventListener("mouseleave",this.$scheduleTooltipForHide),i.removeEventListener("mouseenter",this.$tooltipEnter),i.removeEventListener("mouseleave",this.$scheduleTooltipForHide))},o.prototype.$showTooltip=function(){this.isShown()||(this.tooltip.setTheme(this.editor.renderer.theme),this.tooltip.setClassName(d+"_wrapper"),this.tooltip.show(),this.update(),this.updatePosition(),this._signal("show"))},o.prototype.$hideTooltip=function(){this.$mouseInTooltip=!1,this.isShown()&&(this.moreOptions.hide(),this.tooltip.hide(),this._signal("hide"))},o.prototype.$updateElement=function(t){var e=this.commands[t];if(e){var i=this.elements[t],l=e.enabled;if(typeof l=="function"&&(l=l(this.editor)),typeof e.getValue=="function"){var s=e.getValue(this.editor);if(e.type==="text")i.textContent=s;else if(e.type==="checkbox"){var n=s?u.addCssClass:u.removeCssClass,r=i.parentElement===this.tooltipEl;i.ariaChecked=s,r?n(i,"ace_selected"):(i=i.querySelector("."+$),n(i,"ace_checkmark"))}}l&&i.disabled?(u.removeCssClass(i,"ace_disabled"),i.ariaDisabled=i.disabled=!1,i.removeAttribute("disabled")):!l&&!i.disabled&&(u.addCssClass(i,"ace_disabled"),i.ariaDisabled=i.disabled=!0,i.setAttribute("disabled",""))}},o}();P.implement(x.prototype,k),u.importCssString(`
.ace_tooltip.`.concat(d,`_wrapper {
    padding: 0;
}

.ace_tooltip .`).concat(d,` {
    padding: 1px 5px;
    display: flex;
    pointer-events: auto;
}

.ace_tooltip .`).concat(d,`.tooltip_more_options {
    padding: 1px;
    flex-direction: column;
}

div.`).concat(a,` {
    display: inline-flex;
    cursor: pointer;
    margin: 1px;
    border-radius: 2px;
    padding: 2px 5px;
    align-items: center;
}

div.`).concat(a,`.ace_selected,
div.`).concat(a,`:hover:not(.ace_disabled) {
    background-color: rgba(0, 0, 0, 0.1);
}

div.`).concat(a,`.ace_disabled {
    color: #777;
    pointer-events: none;
}

div.`).concat(a,` .ace_icon_svg {
    height: 12px;
    background-color: #000;
}

div.`).concat(a,`.ace_disabled .ace_icon_svg {
    background-color: #777;
}

.`).concat(d,".tooltip_more_options .").concat(a,` {
    display: flex;
}

.`).concat(d,".").concat($,` {
    display: none;
}

.`).concat(d,".tooltip_more_options .").concat($,` {
    display: inline-block;
    width: 12px;
}

.`).concat(O,` {
    display: inline-block;
}

.`).concat(g,` {
    margin: 0 2px;
    display: inline-block;
    font-size: 8px;
}

.`).concat(d,".tooltip_more_options .").concat(g,` {
    margin-left: auto;
}

.`).concat(g,` div {
    display: inline-block;
    min-width: 8px;
    padding: 2px;
    margin: 0 1px;
    border-radius: 2px;
    background-color: #ccc;
    text-align: center;
}

.ace_dark.ace_tooltip .`).concat(d,` {
    background-color: #373737;
    color: #eee;
}

.ace_dark div.`).concat(a,`.ace_disabled {
    color: #979797;
}

.ace_dark div.`).concat(a,`.ace_selected,
.ace_dark div.`).concat(a,`:hover:not(.ace_disabled) {
    background-color: rgba(255, 255, 255, 0.1);
}

.ace_dark div.`).concat(a,` .ace_icon_svg {
    background-color: #eee;
}

.ace_dark div.`).concat(a,`.ace_disabled .ace_icon_svg {
    background-color: #979797;
}

.ace_dark .`).concat(a,`.ace_disabled {
    color: #979797;
}

.ace_dark .`).concat(g,` div {
    background-color: #575757;
}

.ace_checkmark::before {
    content: '\u2713';
}
`),"commandbar.css",!1),y.CommandBarTooltip=x,y.TOOLTIP_CLASS_NAME=d,y.BUTTON_CLASS_NAME=a}),function(){ace.require(["ace/ext/command_bar"],function(p){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=p)})}();
