ace.define("ace/snippets/textile.snippets",["require","exports","module"],function(e,t,n){n.exports=`# Jekyll post header
snippet header
	---
	title: \${1:title}
	layout: post
	date: \${2:date} \${3:hour:minute:second} -05:00
	---

# Image
snippet img
	!\${1:url}(\${2:title}):\${3:link}!

# Table
snippet |
	|\${1}|\${2}

# Link
snippet link
	"\${1:link text}":\${2:url}

# Acronym
snippet (
	(\${1:Expand acronym})\${2}

# Footnote
snippet fn
	[\${1:ref number}] \${3}

	fn$1. \${2:footnote}
	
`}),ace.define("ace/snippets/textile",["require","exports","module","ace/snippets/textile.snippets"],function(e,t,n){"use strict";t.snippetText=e("./textile.snippets"),t.scope="textile"}),function(){ace.require(["ace/snippets/textile"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
