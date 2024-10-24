ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,r,l){"use strict";var o=e("../lib/oop"),a=e("./text_highlight_rules").TextHighlightRules,t=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},t.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};o.inherits(t,a),t.getTagRule=function(n){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},t.getStartRule=function(n){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:n}},t.getEndRule=function(n){return{token:"comment.doc",regex:"\\*\\/",next:n}},r.DocCommentHighlightRules=t}),ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,r,l){"use strict";var o=e("../lib/oop"),a=e("./text_highlight_rules").TextHighlightRules,t=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"text",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"comment",regex:"\\/\\/.*$"},{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"punctuation.operator",regex:/[,]/},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}};o.inherits(t,a),r.JsonHighlightRules=t}),ace.define("ace/mode/redshift_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules","ace/mode/json_highlight_rules"],function(e,r,l){var o=e("../lib/oop"),a=e("../lib/lang"),t=e("./doc_comment_highlight_rules").DocCommentHighlightRules,n=e("./text_highlight_rules").TextHighlightRules,i=e("./json_highlight_rules").JsonHighlightRules,s=function(){var c="aes128|aes256|all|allowoverwrite|analyse|analyze|and|any|array|as|asc|authorization|backup|between|binary|blanksasnull|both|bytedict|bzip2|case|cast|check|collate|column|constraint|create|credentials|cross|current_date|current_time|current_timestamp|current_user|current_user_id|default|deferrable|deflate|defrag|delta|delta32k|desc|disable|distinct|do|else|emptyasnull|enable|encode|encrypt|encryption|end|except|explicit|false|for|foreign|freeze|from|full|globaldict256|globaldict64k|grant|group|gzip|having|identity|ignore|ilike|in|initially|inner|intersect|into|is|isnull|join|leading|left|like|limit|localtime|localtimestamp|lun|luns|lzo|lzop|minus|mostly13|mostly32|mostly8|natural|new|not|notnull|null|nulls|off|offline|offset|old|on|only|open|or|order|outer|overlaps|parallel|partition|percent|permissions|placing|primary|raw|readratio|recover|references|rejectlog|resort|restore|right|select|session_user|similar|some|sysdate|system|table|tag|tdes|text255|text32k|then|timestamp|to|top|trailing|true|truncatecolumns|union|unique|user|using|verbose|wallet|when|where|with|without",m="current_schema|current_schemas|has_database_privilege|has_schema_privilege|has_table_privilege|age|current_time|current_timestamp|localtime|isfinite|now|ascii|get_bit|get_byte|octet_length|set_bit|set_byte|to_ascii|avg|count|listagg|max|min|stddev_samp|stddev_pop|sum|var_samp|var_pop|bit_and|bit_or|bool_and|bool_or|avg|count|cume_dist|dense_rank|first_value|last_value|lag|lead|listagg|max|median|min|nth_value|ntile|percent_rank|percentile_cont|percentile_disc|rank|ratio_to_report|row_number|case|coalesce|decode|greatest|least|nvl|nvl2|nullif|add_months|age|convert_timezone|current_date|timeofday|current_time|current_timestamp|date_cmp|date_cmp_timestamp|date_part_year|dateadd|datediff|date_part|date_trunc|extract|getdate|interval_cmp|isfinite|last_day|localtime|localtimestamp|months_between|next_day|now|sysdate|timestamp_cmp|timestamp_cmp_date|trunc|abs|acos|asin|atan|atan2|cbrt|ceiling|ceil|checksum|cos|cot|degrees|dexp|dlog1|dlog10|exp|floor|ln|log|mod|pi|power|radians|random|round|sin|sign|sqrt|tan|trunc|ascii|bpcharcmp|btrim|bttext_pattern_cmp|char_length|character_length|charindex|chr|concat|crc32|func_sha1|get_bit|get_byte|initcap|left|right|len|length|lower|lpad|rpad|ltrim|md5|octet_length|position|quote_ident|quote_literal|regexp_count|regexp_instr|regexp_replace|regexp_substr|repeat|replace|replicate|reverse|rtrim|set_bit|set_byte|split_part|strpos|strtol|substring|textlen|to_ascii|to_hex|translate|trim|upper|json_array_length|json_extract_array_element_text|json_extract_path_text|cast|convert|to_char|to_date|to_number|current_database|current_schema|current_schemas|current_user|current_user_id|has_database_privilege|has_schema_privilege|has_table_privilege|pg_backend_pid|pg_last_copy_count|pg_last_copy_id|pg_last_query_id|pg_last_unload_count|session_user|slice_num|user|version",u=this.createKeywordMapper({"support.function":m,keyword:c},"identifier",!0),g=[{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"variable.language",regex:'".*?"'},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:u,regex:"[a-zA-Z_][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|!!|!~|!~\\*|!~~|!~~\\*|#|##|#<|#<=|#<>|#=|#>|#>=|%|\\&|\\&\\&|\\&<|\\&<\\||\\&>|\\*|\\+|\\-|/|<|<#>|<\\->|<<|<<=|<<\\||<=|<>|<\\?>|<@|<\\^|=|>|>=|>>|>>=|>\\^|\\?#|\\?\\-|\\?\\-\\||\\?\\||\\?\\|\\||@|@\\-@|@>|@@|@@@|\\^|\\||\\|\\&>|\\|/|\\|>>|\\|\\||\\|\\|/|~|~\\*|~<=~|~<~|~=|~>=~|~>~|~~|~~\\*"},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}];this.$rules={start:[{token:"comment",regex:"--.*$"},t.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"keyword.statementBegin",regex:"^[a-zA-Z]+",next:"statement"},{token:"support.buildin",regex:"^\\\\[\\S]+.*$"}],statement:[{token:"comment",regex:"--.*$"},{token:"comment",regex:"\\/\\*",next:"commentStatement"},{token:"statementEnd",regex:";",next:"start"},{token:"string",regex:"\\$json\\$",next:"json-start"},{token:"string",regex:"\\$[\\w_0-9]*\\$$",next:"dollarSql"},{token:"string",regex:"\\$[\\w_0-9]*\\$",next:"dollarStatementString"}].concat(g),dollarSql:[{token:"comment",regex:"--.*$"},{token:"comment",regex:"\\/\\*",next:"commentDollarSql"},{token:"string",regex:"^\\$[\\w_0-9]*\\$",next:"statement"},{token:"string",regex:"\\$[\\w_0-9]*\\$",next:"dollarSqlString"}].concat(g),comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",regex:".+"}],commentStatement:[{token:"comment",regex:".*?\\*\\/",next:"statement"},{token:"comment",regex:".+"}],commentDollarSql:[{token:"comment",regex:".*?\\*\\/",next:"dollarSql"},{token:"comment",regex:".+"}],dollarStatementString:[{token:"string",regex:".*?\\$[\\w_0-9]*\\$",next:"statement"},{token:"string",regex:".+"}],dollarSqlString:[{token:"string",regex:".*?\\$[\\w_0-9]*\\$",next:"dollarSql"},{token:"string",regex:".+"}]},this.embedRules(t,"doc-",[t.getEndRule("start")]),this.embedRules(i,"json-",[{token:"string",regex:"\\$json\\$",next:"statement"}])};o.inherits(s,n),r.RedshiftHighlightRules=s}),ace.define("ace/mode/redshift",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/redshift_highlight_rules"],function(e,r,l){var o=e("../lib/oop"),a=e("../mode/text").Mode,t=e("./redshift_highlight_rules").RedshiftHighlightRules,n=function(){this.HighlightRules=t,this.$behaviour=this.$defaultBehaviour};o.inherits(n,a),function(){this.lineCommentStart="--",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(i,s,c){return i=="start"||i=="keyword.statementEnd"?"":this.$getIndent(s)},this.$id="ace/mode/redshift"}.call(n.prototype),r.Mode=n}),function(){ace.require(["ace/mode/redshift"],function(e){typeof module=="object"&&typeof exports=="object"&&module&&(module.exports=e)})}();
