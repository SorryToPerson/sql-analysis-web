ace.define("ace/snippets/drools.snippets",["require","exports","module"],function(e,n,t){t.exports=`
snippet rule
	rule "\${1?:rule_name}"
	when
		\${2:// when...} 
	then
		\${3:// then...}
	end

snippet query
	query \${1?:query_name}
		\${2:// find} 
	end
	
snippet declare
	declare \${1?:type_name}
		\${2:// attributes} 
	end

`}),ace.define("ace/snippets/drools",["require","exports","module","ace/snippets/drools.snippets"],function(e,n,t){"use strict";n.snippetText=e("./drools.snippets"),n.scope="drools"}),function(){ace.require(["ace/snippets/drools"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
