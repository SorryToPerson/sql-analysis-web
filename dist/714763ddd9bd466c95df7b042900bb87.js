ace.define("ace/snippets/sh.snippets",["require","exports","module"],function(t,n,e){e.exports=`# Shebang. Executing bash via /usr/bin/env makes scripts more portable.
snippet #!
	#!/usr/bin/env bash
	
snippet if
	if [[ \${1:condition} ]]; then
		\${2:#statements}
	fi
snippet elif
	elif [[ \${1:condition} ]]; then
		\${2:#statements}
snippet for
	for (( \${2:i} = 0; $2 < \${1:count}; $2++ )); do
		\${3:#statements}
	done
snippet fori
	for \${1:needle} in \${2:haystack} ; do
		\${3:#statements}
	done
snippet wh
	while [[ \${1:condition} ]]; do
		\${2:#statements}
	done
snippet until
	until [[ \${1:condition} ]]; do
		\${2:#statements}
	done
snippet case
	case \${1:word} in
		\${2:pattern})
			\${3};;
	esac
snippet go 
	while getopts '\${1:o}' \${2:opts} 
	do 
		case $$2 in
		\${3:o0})
			\${4:#staments};;
		esac
	done
# Set SCRIPT_DIR variable to directory script is located.
snippet sdir
	SCRIPT_DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
# getopt
snippet getopt
	__ScriptVersion="\${1:version}"

	#===  FUNCTION  ================================================================
	#         NAME:  usage
	#  DESCRIPTION:  Display usage information.
	#===============================================================================
	function usage ()
	{
			cat <<- EOT

	  Usage :  $\${0:0} [options] [--] 

	  Options: 
	  -h|help       Display this message
	  -v|version    Display script version

	EOT
	}    # ----------  end of function usage  ----------

	#-----------------------------------------------------------------------
	#  Handle command line arguments
	#-----------------------------------------------------------------------

	while getopts ":hv" opt
	do
	  case $opt in

		h|help     )  usage; exit 0   ;;

		v|version  )  echo "$\${0:0} -- Version $__ScriptVersion"; exit 0   ;;

		\\? )  echo -e "\\n  Option does not exist : $OPTARG\\n"
			  usage; exit 1   ;;

	  esac    # --- end of case ---
	done
	shift $(($OPTIND-1))

`}),ace.define("ace/snippets/sh",["require","exports","module","ace/snippets/sh.snippets"],function(t,n,e){"use strict";n.snippetText=t("./sh.snippets"),n.scope="sh"}),function(){ace.require(["ace/snippets/sh"],function(t){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=t)})}();
