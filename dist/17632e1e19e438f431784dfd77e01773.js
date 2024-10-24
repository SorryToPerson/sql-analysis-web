ace.define("ace/snippets/makefile.snippets",["require","exports","module"],function(e,i,t){t.exports=`snippet ifeq
	ifeq (\${1:cond0},\${2:cond1})
		\${3:code}
	endif
`}),ace.define("ace/snippets/makefile",["require","exports","module","ace/snippets/makefile.snippets"],function(e,i,t){"use strict";i.snippetText=e("./makefile.snippets"),i.scope="makefile"}),function(){ace.require(["ace/snippets/makefile"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
