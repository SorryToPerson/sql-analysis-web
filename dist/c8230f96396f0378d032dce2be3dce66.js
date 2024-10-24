ace.define("ace/mode/gitignore_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var o=e("../lib/oop"),g=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment",regex:/^\s*#.*$/},{token:"keyword",regex:/^\s*!.*$/}]},this.normalizeRules()};i.metaData={fileTypes:["gitignore"],name:"Gitignore"},o.inherits(i,g),t.GitignoreHighlightRules=i}),ace.define("ace/mode/gitignore",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/gitignore_highlight_rules"],function(e,t,r){"use strict";var o=e("../lib/oop"),g=e("./text").Mode,i=e("./gitignore_highlight_rules").GitignoreHighlightRules,l=function(){this.HighlightRules=i,this.$behaviour=this.$defaultBehaviour};o.inherits(l,g),function(){this.lineCommentStart="#",this.$id="ace/mode/gitignore"}.call(l.prototype),t.Mode=l}),function(){ace.require(["ace/mode/gitignore"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();