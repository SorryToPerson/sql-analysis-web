ace.define("ace/mode/vhdl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,o,n){"use strict";var i=e("../lib/oop"),a=e("./text_highlight_rules").TextHighlightRules,r=function(){var t="access|after|alias|all|architecture|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|context|disconnect|downto|else|elsif|end|entity|exit|file|for|force|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|of|on|or|open|others|out|package|parameter|port|postponed|procedure|process|protected|pure|range|record|register|reject|release|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with",s="bit|bit_vector|boolean|character|integer|line|natural|positive|real|register|signed|std_logic|std_logic_vector|string||text|time|unsigned",l="array|constant",g="abs|and|mod|nand|nor|not|rem|rol|ror|sla|sll|srasrl|xnor|xor",u="true|false|null",d=this.createKeywordMapper({"keyword.operator":g,keyword:t,"constant.language":u,"storage.modifier":l,"storage.type":s},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"keyword",regex:"\\s*(?:library|package|use)\\b"},{token:d,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"&|\\*|\\+|\\-|\\/|<|=|>|\\||=>|\\*\\*|:=|\\/=|>=|<=|<>"},{token:"punctuation.operator",regex:"\\'|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[(]"},{token:"paren.rparen",regex:"[\\])]"},{token:"text",regex:"\\s+"}]}};i.inherits(r,a),o.VHDLHighlightRules=r}),ace.define("ace/mode/vhdl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/vhdl_highlight_rules"],function(e,o,n){"use strict";var i=e("../lib/oop"),a=e("./text").Mode,r=e("./vhdl_highlight_rules").VHDLHighlightRules,t=function(){this.HighlightRules=r,this.$behaviour=this.$defaultBehaviour};i.inherits(t,a),function(){this.lineCommentStart="--",this.$id="ace/mode/vhdl"}.call(t.prototype),o.Mode=t}),function(){ace.require(["ace/mode/vhdl"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
