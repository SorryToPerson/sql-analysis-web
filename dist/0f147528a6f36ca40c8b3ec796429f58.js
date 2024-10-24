ace.define("ace/snippets/maze.snippets",["require","exports","module"],function(e,n,p){p.exports=`snippet >
description assignment
scope maze
	-> \${1}= \${2}

snippet >
description if
scope maze
	-> IF \${2:**} THEN %\${3:L} ELSE %\${4:R}
`}),ace.define("ace/snippets/maze",["require","exports","module","ace/snippets/maze.snippets"],function(e,n,p){"use strict";n.snippetText=e("./maze.snippets"),n.scope="maze"}),function(){ace.require(["ace/snippets/maze"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
