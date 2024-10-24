ace.define("ace/snippets/csound_document.snippets",["require","exports","module"],function(e,n,t){t.exports=`# <CsoundSynthesizer>
snippet synth
	<CsoundSynthesizer>
	<CsInstruments>
	\${1}
	</CsInstruments>
	<CsScore>
	e
	</CsScore>
	</CsoundSynthesizer>
`}),ace.define("ace/snippets/csound_document",["require","exports","module","ace/snippets/csound_document.snippets"],function(e,n,t){"use strict";n.snippetText=e("./csound_document.snippets"),n.scope="csound_document"}),function(){ace.require(["ace/snippets/csound_document"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
