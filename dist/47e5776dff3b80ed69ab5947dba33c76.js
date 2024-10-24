ace.define("ace/snippets/haml.snippets",["require","exports","module"],function(t,e,n){n.exports=`snippet t
	%table
		%tr
			%th
				\${1:headers}
		%tr
			%td
				\${2:headers}
snippet ul
	%ul
		%li
			\${1:item}
		%li
snippet =rp
	= render :partial => '\${1:partial}'
snippet =rpl
	= render :partial => '\${1:partial}', :locals => {}
snippet =rpc
	= render :partial => '\${1:partial}', :collection => @$1

`}),ace.define("ace/snippets/haml",["require","exports","module","ace/snippets/haml.snippets"],function(t,e,n){"use strict";e.snippetText=t("./haml.snippets"),e.scope="haml"}),function(){ace.require(["ace/snippets/haml"],function(t){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=t)})}();
