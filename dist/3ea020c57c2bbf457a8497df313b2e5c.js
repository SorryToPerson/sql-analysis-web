ace.define("ace/snippets/csound_orchestra.snippets",["require","exports","module"],function(t,n,e){e.exports=`# else
snippet else
	else
		\${1:/* statements */}
# elseif
snippet elseif
	elseif \${1:/* condition */} then
		\${2:/* statements */}
# if
snippet if
	if \${1:/* condition */} then
		\${2:/* statements */}
	endif
# instrument block
snippet instr
	instr \${1:name}
		\${2:/* statements */}
	endin
# i-time while loop
snippet iwhile
	i\${1:Index} = \${2:0}
	while i\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		i\${1:Index} += 1
	od
# k-rate while loop
snippet kwhile
	k\${1:Index} = \${2:0}
	while k\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		k\${1:Index} += 1
	od
# opcode
snippet opcode
	opcode \${1:name}, \${2:/* output types */ 0}, \${3:/* input types */ 0}
		\${4:/* statements */}
	endop
# until loop
snippet until
	until \${1:/* condition */} do
		\${2:/* statements */}
	od
# while loop
snippet while
	while \${1:/* condition */} do
		\${2:/* statements */}
	od
`}),ace.define("ace/snippets/csound_orchestra",["require","exports","module","ace/snippets/csound_orchestra.snippets"],function(t,n,e){"use strict";n.snippetText=t("./csound_orchestra.snippets"),n.scope="csound_orchestra"}),function(){ace.require(["ace/snippets/csound_orchestra"],function(t){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=t)})}();
