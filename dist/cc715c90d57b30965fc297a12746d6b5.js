ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,u,p){"use strict";var d=o("../lib/oop"),l=o("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},r.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};d.inherits(r,l),r.getTagRule=function(a){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},r.getStartRule=function(a){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:a}},r.getEndRule=function(a){return{token:"comment.doc",regex:"\\*\\/",next:a}},u.DocCommentHighlightRules=r}),ace.define("ace/mode/c_cpp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(o,u,p){"use strict";var d=o("../lib/oop"),l=o("./doc_comment_highlight_rules").DocCommentHighlightRules,r=o("./text_highlight_rules").TextHighlightRules,a=u.cFunctions="hypot|hypotf|hypotl|sscanf|system|snprintf|scanf|scalbn|scalbnf|scalbnl|scalbln|scalblnf|scalblnl|sin|sinh|sinhf|sinhl|sinf|sinl|signal|signbit|strstr|strspn|strncpy|strncat|strncmp|strcspn|strchr|strcoll|strcpy|strcat|strcmp|strtoimax|strtod|strtoul|strtoull|strtoumax|strtok|strtof|strtol|strtold|strtoll|strerror|strpbrk|strftime|strlen|strrchr|strxfrm|sprintf|setjmp|setvbuf|setlocale|setbuf|sqrt|sqrtf|sqrtl|swscanf|swprintf|srand|nearbyint|nearbyintf|nearbyintl|nexttoward|nexttowardf|nexttowardl|nextafter|nextafterf|nextafterl|nan|nanf|nanl|csin|csinh|csinhf|csinhl|csinf|csinl|csqrt|csqrtf|csqrtl|ccos|ccosh|ccoshf|ccosf|ccosl|cimag|cimagf|cimagl|ctime|ctan|ctanh|ctanhf|ctanhl|ctanf|ctanl|cos|cosh|coshf|coshl|cosf|cosl|conj|conjf|conjl|copysign|copysignf|copysignl|cpow|cpowf|cpowl|cproj|cprojf|cprojl|ceil|ceilf|ceill|cexp|cexpf|cexpl|clock|clog|clogf|clogl|clearerr|casin|casinh|casinhf|casinhl|casinf|casinl|cacos|cacosh|cacoshf|cacoshl|cacosf|cacosl|catan|catanh|catanhf|catanhl|catanf|catanl|calloc|carg|cargf|cargl|cabs|cabsf|cabsl|creal|crealf|creall|cbrt|cbrtf|cbrtl|time|toupper|tolower|tan|tanh|tanhf|tanhl|tanf|tanl|trunc|truncf|truncl|tgamma|tgammaf|tgammal|tmpnam|tmpfile|isspace|isnormal|isnan|iscntrl|isinf|isdigit|isunordered|isupper|ispunct|isprint|isfinite|iswspace|iswcntrl|iswctype|iswdigit|iswupper|iswpunct|iswprint|iswlower|iswalnum|iswalpha|iswgraph|iswxdigit|iswblank|islower|isless|islessequal|islessgreater|isalnum|isalpha|isgreater|isgreaterequal|isgraph|isxdigit|isblank|ilogb|ilogbf|ilogbl|imaxdiv|imaxabs|div|difftime|_Exit|ungetc|ungetwc|pow|powf|powl|puts|putc|putchar|putwc|putwchar|perror|printf|erf|erfc|erfcf|erfcl|erff|erfl|exit|exp|exp2|exp2f|exp2l|expf|expl|expm1|expm1f|expm1l|vsscanf|vsnprintf|vscanf|vsprintf|vswscanf|vswprintf|vprintf|vfscanf|vfprintf|vfwscanf|vfwprintf|vwscanf|vwprintf|va_start|va_copy|va_end|va_arg|qsort|fscanf|fsetpos|fseek|fclose|ftell|fopen|fdim|fdimf|fdiml|fpclassify|fputs|fputc|fputws|fputwc|fprintf|feholdexcept|fesetenv|fesetexceptflag|fesetround|feclearexcept|fetestexcept|feof|feupdateenv|feraiseexcept|ferror|fegetenv|fegetexceptflag|fegetround|fflush|fwscanf|fwide|fwprintf|fwrite|floor|floorf|floorl|fabs|fabsf|fabsl|fgets|fgetc|fgetpos|fgetws|fgetwc|freopen|free|fread|frexp|frexpf|frexpl|fmin|fminf|fminl|fmod|fmodf|fmodl|fma|fmaf|fmal|fmax|fmaxf|fmaxl|ldiv|ldexp|ldexpf|ldexpl|longjmp|localtime|localeconv|log|log1p|log1pf|log1pl|log10|log10f|log10l|log2|log2f|log2l|logf|logl|logb|logbf|logbl|labs|lldiv|llabs|llrint|llrintf|llrintl|llround|llroundf|llroundl|lrint|lrintf|lrintl|lround|lroundf|lroundl|lgamma|lgammaf|lgammal|wscanf|wcsstr|wcsspn|wcsncpy|wcsncat|wcsncmp|wcscspn|wcschr|wcscoll|wcscpy|wcscat|wcscmp|wcstoimax|wcstod|wcstoul|wcstoull|wcstoumax|wcstok|wcstof|wcstol|wcstold|wcstoll|wcstombs|wcspbrk|wcsftime|wcslen|wcsrchr|wcsrtombs|wcsxfrm|wctob|wctomb|wcrtomb|wprintf|wmemset|wmemchr|wmemcpy|wmemcmp|wmemmove|assert|asctime|asin|asinh|asinhf|asinhl|asinf|asinl|acos|acosh|acoshf|acoshl|acosf|acosl|atoi|atof|atol|atoll|atexit|atan|atanh|atanhf|atanhl|atan2|atan2f|atan2l|atanf|atanl|abs|abort|gets|getc|getchar|getenv|getwc|getwchar|gmtime|rint|rintf|rintl|round|roundf|roundl|rename|realloc|rewind|remove|remquo|remquof|remquol|remainder|remainderf|remainderl|rand|raise|bsearch|btowc|modf|modff|modfl|memset|memchr|memcpy|memcmp|memmove|mktime|malloc|mbsinit|mbstowcs|mbsrtowcs|mbtowc|mblen|mbrtowc|mbrlen",e=function(t){var n="break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",i="asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|int8_t|int16_t|int32_t|int64_t|long|short|signed|size_t|struct|typedef|uint8_t|uint16_t|uint32_t|uint64_t|union|unsigned|void|class|wchar_t|template|char16_t|char32_t",c="const|extern|register|restrict|static|volatile|inline|private|protected|public|friend|explicit|virtual|export|mutable|typename|constexpr|new|delete|alignas|alignof|decltype|noexcept|thread_local",f="and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",g="NULL|true|false|TRUE|FALSE|nullptr",s=this.$keywords=this.createKeywordMapper(Object.assign({"keyword.control":n,"storage.type":i,"storage.modifier":c,"keyword.operator":f,"variable.language":"this","constant.language":g,"support.function.C99.c":a},t),"identifier"),h="[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*\\b",m=/\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source,x="%"+/(\d+\$)?/.source+/[#0\- +']*/.source+/[,;:_]?/.source+/((-?\d+)|\*(-?\d+\$)?)?/.source+/(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source+/(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source+/(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;this.$rules={start:[{token:"comment",regex:"//$",next:"start"},{token:"comment",regex:"//",next:"singleLineComment"},l.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:"'(?:"+m+"|.)?'"},{token:"string.start",regex:'"',stateName:"qqstring",next:[{token:"string",regex:/\\\s*$/,next:"qqstring"},{token:"constant.language.escape",regex:m},{token:"constant.language.escape",regex:x},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"string.start",regex:'R"\\(',stateName:"rawString",next:[{token:"string.end",regex:'\\)"',next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef)\\b",next:"directive"},{token:"keyword",regex:"#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"},{token:s,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"keyword.operator",regex:/--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(l,"doc-",[l.getEndRule("start")]),this.normalizeRules()};d.inherits(e,r),u.c_cppHighlightRules=e}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(o,u,p){"use strict";var d=o("../range").Range,l=function(){};(function(){this.checkOutdent=function(r,a){return/^\s+$/.test(r)?/^\s*\}/.test(a):!1},this.autoOutdent=function(r,a){var e=r.getLine(a),t=e.match(/^(\s*\})/);if(!t)return 0;var n=t[1].length,i=r.findMatchingBracket({row:a,column:n});if(!i||i.row==a)return 0;var c=this.$getIndent(r.getLine(i.row));r.replace(new d(a,0,a,n-1),c)},this.$getIndent=function(r){return r.match(/^\s*/)[0]}}).call(l.prototype),u.MatchingBraceOutdent=l}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(o,u,p){"use strict";var d=o("../../lib/oop"),l=o("../../range").Range,r=o("./fold_mode").FoldMode,a=u.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};d.inherits(a,r),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var c=this._getFoldWidgetBase(e,t,n);return!c&&this.startRegionRe.test(i)?"start":c},this.getFoldWidgetRange=function(e,t,n,i){var c=e.getLine(n);if(this.startRegionRe.test(c))return this.getCommentRegionBlock(e,c,n);var s=c.match(this.foldingStartMarker);if(s){var f=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,f);var g=e.getCommentFoldRange(n,f+s[0].length,1);return g&&!g.isMultiLine()&&(i?g=this.getSectionRange(e,n):t!="all"&&(g=null)),g}if(t!=="markbegin"){var s=c.match(this.foldingStopMarker);if(s){var f=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,f):e.getCommentFoldRange(n,f,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),i=n.search(/\S/),c=t,f=n.length;t=t+1;for(var g=t,s=e.getLength();++t<s;){n=e.getLine(t);var h=n.search(/\S/);if(h!==-1){if(i>h)break;var m=this.getFoldWidgetRange(e,"all",t);if(m){if(m.start.row<=c)break;if(m.isMultiLine())t=m.end.row;else if(i==h)break}g=t}}return new l(c,f,g,e.getLine(g).length)},this.getCommentRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),c=e.getLength(),f=n,g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++n<c;){t=e.getLine(n);var h=g.exec(t);if(h&&(h[1]?s--:s++,!s))break}var m=n;if(m>f)return new l(f,i,m,t.length)}}.call(a.prototype)}),ace.define("ace/mode/c_cpp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(o,u,p){"use strict";var d=o("../lib/oop"),l=o("./text").Mode,r=o("./c_cpp_highlight_rules").c_cppHighlightRules,a=o("./matching_brace_outdent").MatchingBraceOutdent,e=o("./folding/cstyle").FoldMode,t=function(){this.HighlightRules=r,this.$outdent=new a,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};d.inherits(t,l),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(n,i,c){var f=this.$getIndent(i),g=this.getTokenizer().getLineTokens(i,n),s=g.tokens,h=g.state;if(s.length&&s[s.length-1].type=="comment")return f;if(n=="start"){var m=i.match(/^.*[\{\(\[]\s*$/);m&&(f+=c)}else if(n=="doc-start"){if(h=="start")return"";var m=i.match(/^\s*(\/?)\*/);m&&(m[1]&&(f+=" "),f+="* ")}return f},this.checkOutdent=function(n,i,c){return this.$outdent.checkOutdent(i,c)},this.autoOutdent=function(n,i,c){this.$outdent.autoOutdent(i,c)},this.$id="ace/mode/c_cpp",this.snippetFileId="ace/snippets/c_cpp"}.call(t.prototype),u.Mode=t}),ace.define("ace/mode/protobuf_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,u,p){"use strict";var d=o("../lib/oop"),l=o("./text_highlight_rules").TextHighlightRules,r=function(){var a="double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes",e="message|required|optional|repeated|package|import|option|enum",t=this.createKeywordMapper({"keyword.declaration.protobuf":e,"support.type":a},"identifier");this.$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"constant",regex:"<[^>]+>"},{regex:"=",token:"keyword.operator.assignment.protobuf"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:t,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.normalizeRules()};d.inherits(r,l),u.ProtobufHighlightRules=r}),ace.define("ace/mode/protobuf",["require","exports","module","ace/lib/oop","ace/mode/c_cpp","ace/mode/protobuf_highlight_rules","ace/mode/folding/cstyle"],function(o,u,p){"use strict";var d=o("../lib/oop"),l=o("./c_cpp").Mode,r=o("./protobuf_highlight_rules").ProtobufHighlightRules,a=o("./folding/cstyle").FoldMode,e=function(){l.call(this),this.foldingRules=new a,this.HighlightRules=r};d.inherits(e,l),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/protobuf"}.call(e.prototype),u.Mode=e}),function(){ace.require(["ace/mode/protobuf"],function(o){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=o)})}();
