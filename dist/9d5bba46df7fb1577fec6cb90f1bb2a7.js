ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,m,p){"use strict";var h=r("../lib/oop"),l=r("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},i.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};h.inherits(i,l),i.getTagRule=function(s){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},i.getStartRule=function(s){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:s}},i.getEndRule=function(s){return{token:"comment.doc",regex:"\\*\\/",next:s}},m.DocCommentHighlightRules=i}),ace.define("ace/mode/c_cpp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(r,m,p){"use strict";var h=r("../lib/oop"),l=r("./doc_comment_highlight_rules").DocCommentHighlightRules,i=r("./text_highlight_rules").TextHighlightRules,s=m.cFunctions="hypot|hypotf|hypotl|sscanf|system|snprintf|scanf|scalbn|scalbnf|scalbnl|scalbln|scalblnf|scalblnl|sin|sinh|sinhf|sinhl|sinf|sinl|signal|signbit|strstr|strspn|strncpy|strncat|strncmp|strcspn|strchr|strcoll|strcpy|strcat|strcmp|strtoimax|strtod|strtoul|strtoull|strtoumax|strtok|strtof|strtol|strtold|strtoll|strerror|strpbrk|strftime|strlen|strrchr|strxfrm|sprintf|setjmp|setvbuf|setlocale|setbuf|sqrt|sqrtf|sqrtl|swscanf|swprintf|srand|nearbyint|nearbyintf|nearbyintl|nexttoward|nexttowardf|nexttowardl|nextafter|nextafterf|nextafterl|nan|nanf|nanl|csin|csinh|csinhf|csinhl|csinf|csinl|csqrt|csqrtf|csqrtl|ccos|ccosh|ccoshf|ccosf|ccosl|cimag|cimagf|cimagl|ctime|ctan|ctanh|ctanhf|ctanhl|ctanf|ctanl|cos|cosh|coshf|coshl|cosf|cosl|conj|conjf|conjl|copysign|copysignf|copysignl|cpow|cpowf|cpowl|cproj|cprojf|cprojl|ceil|ceilf|ceill|cexp|cexpf|cexpl|clock|clog|clogf|clogl|clearerr|casin|casinh|casinhf|casinhl|casinf|casinl|cacos|cacosh|cacoshf|cacoshl|cacosf|cacosl|catan|catanh|catanhf|catanhl|catanf|catanl|calloc|carg|cargf|cargl|cabs|cabsf|cabsl|creal|crealf|creall|cbrt|cbrtf|cbrtl|time|toupper|tolower|tan|tanh|tanhf|tanhl|tanf|tanl|trunc|truncf|truncl|tgamma|tgammaf|tgammal|tmpnam|tmpfile|isspace|isnormal|isnan|iscntrl|isinf|isdigit|isunordered|isupper|ispunct|isprint|isfinite|iswspace|iswcntrl|iswctype|iswdigit|iswupper|iswpunct|iswprint|iswlower|iswalnum|iswalpha|iswgraph|iswxdigit|iswblank|islower|isless|islessequal|islessgreater|isalnum|isalpha|isgreater|isgreaterequal|isgraph|isxdigit|isblank|ilogb|ilogbf|ilogbl|imaxdiv|imaxabs|div|difftime|_Exit|ungetc|ungetwc|pow|powf|powl|puts|putc|putchar|putwc|putwchar|perror|printf|erf|erfc|erfcf|erfcl|erff|erfl|exit|exp|exp2|exp2f|exp2l|expf|expl|expm1|expm1f|expm1l|vsscanf|vsnprintf|vscanf|vsprintf|vswscanf|vswprintf|vprintf|vfscanf|vfprintf|vfwscanf|vfwprintf|vwscanf|vwprintf|va_start|va_copy|va_end|va_arg|qsort|fscanf|fsetpos|fseek|fclose|ftell|fopen|fdim|fdimf|fdiml|fpclassify|fputs|fputc|fputws|fputwc|fprintf|feholdexcept|fesetenv|fesetexceptflag|fesetround|feclearexcept|fetestexcept|feof|feupdateenv|feraiseexcept|ferror|fegetenv|fegetexceptflag|fegetround|fflush|fwscanf|fwide|fwprintf|fwrite|floor|floorf|floorl|fabs|fabsf|fabsl|fgets|fgetc|fgetpos|fgetws|fgetwc|freopen|free|fread|frexp|frexpf|frexpl|fmin|fminf|fminl|fmod|fmodf|fmodl|fma|fmaf|fmal|fmax|fmaxf|fmaxl|ldiv|ldexp|ldexpf|ldexpl|longjmp|localtime|localeconv|log|log1p|log1pf|log1pl|log10|log10f|log10l|log2|log2f|log2l|logf|logl|logb|logbf|logbl|labs|lldiv|llabs|llrint|llrintf|llrintl|llround|llroundf|llroundl|lrint|lrintf|lrintl|lround|lroundf|lroundl|lgamma|lgammaf|lgammal|wscanf|wcsstr|wcsspn|wcsncpy|wcsncat|wcsncmp|wcscspn|wcschr|wcscoll|wcscpy|wcscat|wcscmp|wcstoimax|wcstod|wcstoul|wcstoull|wcstoumax|wcstok|wcstof|wcstol|wcstold|wcstoll|wcstombs|wcspbrk|wcsftime|wcslen|wcsrchr|wcsrtombs|wcsxfrm|wctob|wctomb|wcrtomb|wprintf|wmemset|wmemchr|wmemcpy|wmemcmp|wmemmove|assert|asctime|asin|asinh|asinhf|asinhl|asinf|asinl|acos|acosh|acoshf|acoshl|acosf|acosl|atoi|atof|atol|atoll|atexit|atan|atanh|atanhf|atanhl|atan2|atan2f|atan2l|atanf|atanl|abs|abort|gets|getc|getchar|getenv|getwc|getwchar|gmtime|rint|rintf|rintl|round|roundf|roundl|rename|realloc|rewind|remove|remquo|remquof|remquol|remainder|remainderf|remainderl|rand|raise|bsearch|btowc|modf|modff|modfl|memset|memchr|memcpy|memcmp|memmove|mktime|malloc|mbsinit|mbstowcs|mbsrtowcs|mbtowc|mblen|mbrtowc|mbrlen",e=function(n){var t="break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",o="asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|int8_t|int16_t|int32_t|int64_t|long|short|signed|size_t|struct|typedef|uint8_t|uint16_t|uint32_t|uint64_t|union|unsigned|void|class|wchar_t|template|char16_t|char32_t",c="const|extern|register|restrict|static|volatile|inline|private|protected|public|friend|explicit|virtual|export|mutable|typename|constexpr|new|delete|alignas|alignof|decltype|noexcept|thread_local",g="and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",f="NULL|true|false|TRUE|FALSE|nullptr",a=this.$keywords=this.createKeywordMapper(Object.assign({"keyword.control":t,"storage.type":o,"storage.modifier":c,"keyword.operator":g,"variable.language":"this","constant.language":f,"support.function.C99.c":s},n),"identifier"),u="[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*\\b",d=/\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source,x="%"+/(\d+\$)?/.source+/[#0\- +']*/.source+/[,;:_]?/.source+/((-?\d+)|\*(-?\d+\$)?)?/.source+/(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source+/(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source+/(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;this.$rules={start:[{token:"comment",regex:"//$",next:"start"},{token:"comment",regex:"//",next:"singleLineComment"},l.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:"'(?:"+d+"|.)?'"},{token:"string.start",regex:'"',stateName:"qqstring",next:[{token:"string",regex:/\\\s*$/,next:"qqstring"},{token:"constant.language.escape",regex:d},{token:"constant.language.escape",regex:x},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"string.start",regex:'R"\\(',stateName:"rawString",next:[{token:"string.end",regex:'\\)"',next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef)\\b",next:"directive"},{token:"keyword",regex:"#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"},{token:a,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"keyword.operator",regex:/--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(l,"doc-",[l.getEndRule("start")]),this.normalizeRules()};h.inherits(e,i),m.c_cppHighlightRules=e}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,m,p){"use strict";var h=r("../range").Range,l=function(){};(function(){this.checkOutdent=function(i,s){return/^\s+$/.test(i)?/^\s*\}/.test(s):!1},this.autoOutdent=function(i,s){var e=i.getLine(s),n=e.match(/^(\s*\})/);if(!n)return 0;var t=n[1].length,o=i.findMatchingBracket({row:s,column:t});if(!o||o.row==s)return 0;var c=this.$getIndent(i.getLine(o.row));i.replace(new h(s,0,s,t-1),c)},this.$getIndent=function(i){return i.match(/^\s*/)[0]}}).call(l.prototype),m.MatchingBraceOutdent=l}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,m,p){"use strict";var h=r("../../lib/oop"),l=r("../../range").Range,i=r("./fold_mode").FoldMode,s=m.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};h.inherits(s,i),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,n,t){var o=e.getLine(t);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var c=this._getFoldWidgetBase(e,n,t);return!c&&this.startRegionRe.test(o)?"start":c},this.getFoldWidgetRange=function(e,n,t,o){var c=e.getLine(t);if(this.startRegionRe.test(c))return this.getCommentRegionBlock(e,c,t);var a=c.match(this.foldingStartMarker);if(a){var g=a.index;if(a[1])return this.openingBracketBlock(e,a[1],t,g);var f=e.getCommentFoldRange(t,g+a[0].length,1);return f&&!f.isMultiLine()&&(o?f=this.getSectionRange(e,t):n!="all"&&(f=null)),f}if(n!=="markbegin"){var a=c.match(this.foldingStopMarker);if(a){var g=a.index+a[0].length;return a[1]?this.closingBracketBlock(e,a[1],t,g):e.getCommentFoldRange(t,g,-1)}}},this.getSectionRange=function(e,n){var t=e.getLine(n),o=t.search(/\S/),c=n,g=t.length;n=n+1;for(var f=n,a=e.getLength();++n<a;){t=e.getLine(n);var u=t.search(/\S/);if(u!==-1){if(o>u)break;var d=this.getFoldWidgetRange(e,"all",n);if(d){if(d.start.row<=c)break;if(d.isMultiLine())n=d.end.row;else if(o==u)break}f=n}}return new l(c,g,f,e.getLine(f).length)},this.getCommentRegionBlock=function(e,n,t){for(var o=n.search(/\s*$/),c=e.getLength(),g=t,f=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++t<c;){n=e.getLine(t);var u=f.exec(n);if(u&&(u[1]?a--:a++,!a))break}var d=t;if(d>g)return new l(g,o,d,n.length)}}.call(s.prototype)}),ace.define("ace/mode/c_cpp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(r,m,p){"use strict";var h=r("../lib/oop"),l=r("./text").Mode,i=r("./c_cpp_highlight_rules").c_cppHighlightRules,s=r("./matching_brace_outdent").MatchingBraceOutdent,e=r("./folding/cstyle").FoldMode,n=function(){this.HighlightRules=i,this.$outdent=new s,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};h.inherits(n,l),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(t,o,c){var g=this.$getIndent(o),f=this.getTokenizer().getLineTokens(o,t),a=f.tokens,u=f.state;if(a.length&&a[a.length-1].type=="comment")return g;if(t=="start"){var d=o.match(/^.*[\{\(\[]\s*$/);d&&(g+=c)}else if(t=="doc-start"){if(u=="start")return"";var d=o.match(/^\s*(\/?)\*/);d&&(d[1]&&(g+=" "),g+="* ")}return g},this.checkOutdent=function(t,o,c){return this.$outdent.checkOutdent(o,c)},this.autoOutdent=function(t,o,c){this.$outdent.autoOutdent(o,c)},this.$id="ace/mode/c_cpp",this.snippetFileId="ace/snippets/c_cpp"}.call(n.prototype),m.Mode=n}),ace.define("ace/mode/dart_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(r,m,p){"use strict";var h=r("../lib/oop"),l=r("./doc_comment_highlight_rules").DocCommentHighlightRules,i=r("./text_highlight_rules").TextHighlightRules,s=function(){var e="true|false|null",n="this|super",t="try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new|deferred|async|await",o="abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with|enum",c="static|final|const",g="void|bool|num|int|double|dynamic|var|String",f=this.createKeywordMapper({"constant.language.dart":e,"variable.language.dart":n,"keyword.control.dart":t,"keyword.declaration.dart":o,"storage.modifier.dart":c,"storage.type.primitive.dart":g},"identifier"),a=[{token:"constant.language.escape",regex:/\\./},{token:"text",regex:/\$(?:\w+|{[^"'}]+})?/},{defaultToken:"string"}];this.$rules={start:[{token:"comment",regex:/\/\/.*$/},l.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:["meta.preprocessor.script.dart"],regex:"^(#!.*)$"},{token:"keyword.other.import.dart",regex:"(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"},{token:["keyword.other.import.dart","text"],regex:"(?:\\b)(prefix)(\\s*:)"},{regex:"\\bas\\b",token:"keyword.cast.dart"},{regex:"\\?|:",token:"keyword.control.ternary.dart"},{regex:"(?:\\b)(is\\!?)(?:\\b)",token:["keyword.operator.dart"]},{regex:"(<<|>>>?|~|\\^|\\||&)",token:["keyword.operator.bitwise.dart"]},{regex:"((?:&|\\^|\\||<<|>>>?)=)",token:["keyword.operator.assignment.bitwise.dart"]},{regex:"(===?|!==?|<=?|>=?)",token:["keyword.operator.comparison.dart"]},{regex:"((?:[+*/%-]|\\~)=)",token:["keyword.operator.assignment.arithmetic.dart"]},{regex:"=",token:"keyword.operator.assignment.dart"},{token:"string",regex:"'''",next:"qdoc"},{token:"string",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{regex:"(\\-\\-|\\+\\+)",token:["keyword.operator.increment-decrement.dart"]},{regex:"(\\-|\\+|\\*|\\/|\\~\\/|%)",token:["keyword.operator.arithmetic.dart"]},{regex:"(!|&&|\\|\\|)",token:["keyword.operator.logical.dart"]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:f,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qdoc:[{token:"string",regex:"'''",next:"start"}].concat(a),qqdoc:[{token:"string",regex:'"""',next:"start"}].concat(a),qstring:[{token:"string",regex:"'|$",next:"start"}].concat(a),qqstring:[{token:"string",regex:'"|$',next:"start"}].concat(a)},this.embedRules(l,"doc-",[l.getEndRule("start")])};h.inherits(s,i),m.DartHighlightRules=s}),ace.define("ace/mode/dart",["require","exports","module","ace/lib/oop","ace/mode/c_cpp","ace/mode/dart_highlight_rules","ace/mode/folding/cstyle"],function(r,m,p){"use strict";var h=r("../lib/oop"),l=r("./c_cpp").Mode,i=r("./dart_highlight_rules").DartHighlightRules,s=r("./folding/cstyle").FoldMode,e=function(){l.call(this),this.HighlightRules=i,this.foldingRules=new s,this.$behaviour=this.$defaultBehaviour};h.inherits(e,l),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/dart",this.snippetFileId="ace/snippets/dart"}.call(e.prototype),m.Mode=e}),function(){ace.require(["ace/mode/dart"],function(r){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=r)})}();
