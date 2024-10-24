ace.define("ace/snippets/fsl.snippets",["require","exports","module"],function(e,n,t){t.exports=`snippet header
	machine_name     : "";
	machine_author   : "";
	machine_license  : MIT;
	machine_comment  : "";
	machine_language : en;
	machine_version  : 1.0.0;
	fsl_version      : 1.0.0;
	start_states     : [];
`}),ace.define("ace/snippets/fsl",["require","exports","module","ace/snippets/fsl.snippets"],function(e,n,t){"use strict";n.snippetText=e("./fsl.snippets"),n.scope="fsl"}),function(){ace.require(["ace/snippets/fsl"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
