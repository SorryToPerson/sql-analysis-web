ace.define("ace/snippets/snippets.snippets",["require","exports","module"],function(e,p,s){s.exports=`# snippets for making snippets :)
snippet snip
	snippet \${1:trigger}
		\${2}
snippet msnip
	snippet \${1:trigger} \${2:description}
		\${3}
snippet v
	{VISUAL}
`}),ace.define("ace/snippets/snippets",["require","exports","module","ace/snippets/snippets.snippets"],function(e,p,s){"use strict";p.snippetText=e("./snippets.snippets"),p.scope="snippets"}),function(){ace.require(["ace/snippets/snippets"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
