export default `
begin;
set hg_experimental_odps_executor_max_dop = 16;
set hg_experimental_query_batch_size = 2048;
set hg_foreign_table_executor_dml_max_dop = 16;
set hg_foreign_table_split_size = 256;

CREATE TABLE IF NOT EXISTS user_tags_bhcs (
  pt TEXT NOT NULL
  ,user_id text NOT NULL
  ,third_user_no text 
  ,regist_phone text NOT NULL
  ,certi_no text 
  ,product_code text NOT NULL
  ,is_longterm_control_group bool 
  ,is_total_black_list_flag bool 

  ,overdue_days_max	int8
  ,t2_owner_call	int8
  ,t6_owner_call	int8
  ,t13_owner_call	int8
  ,t20_owner_call	int8
  ,t29_owner_call	int8
  ,t44_owner_call	int8

  ,ytx_cur_agreed_free_amt	float8
  ,ytx_is_cur_agreed_used_coupon	bool
  ,ytx_is_fst_installment_no_overdue	bool
)
PARTITION BY list(pt);
 
call set_table_property('user_tags_bhcs', 'orientation', 'column');
call set_table_property('user_tags_bhcs', 'distribution_key', 'regist_phone');
call set_table_property('user_tags_bhcs', 'clustering_key', 'product_code');
call set_table_property('user_tags_bhcs', 'time_to_live_in_seconds', '259200');  -- ttl设置为3天
 
 --position
commit;

DROP FOREIGN TABLE IF EXISTS odps_user_tags_bhcs;

CREATE FOREIGN TABLE IF NOT EXISTS odps_user_tags_bhcs (
  pt TEXT NOT NULL
  ,user_id text NOT NULL
  ,third_user_no text 
  ,regist_phone text NOT NULL
  ,certi_no text 
  ,product_code text NOT NULL
  ,is_longterm_control_group bool 
  ,is_total_black_list_flag bool 

  ,overdue_days_max	int8
  ,t2_owner_call	int8
  ,t6_owner_call	int8
  ,t13_owner_call	int8
  ,t20_owner_call	int8
  ,t29_owner_call	int8
  ,t44_owner_call	int8

  ,ytx_cur_agreed_free_amt	float8
  ,ytx_is_cur_agreed_used_coupon	bool
  ,ytx_is_fst_installment_no_overdue	bool
)
SERVER odps_server 
OPTIONS (project_name 'za_jr_prd', table_name 'adm_fin_user_tags_bhcs');

--position
--可以优化为新建临时表，再删分表，rename成分表
DROP TABLE IF EXISTS user_tags_bhcs_\${bizdate};
-- 创建分区子表
CREATE TABLE IF NOT EXISTS user_tags_bhcs_\${bizdate} PARTITION of user_tags_bhcs FOR VALUES IN('\${bizdate}');

INSERT INTO user_tags_bhcs_\${bizdate}
SELECT
    '\${bizdate}' as pt
    ,user_id
    ,third_user_no
    ,regist_phone
    ,certi_no
    ,product_code
    ,is_longterm_control_group
    ,is_total_black_list_flag
    ,overdue_days_max
    ,t2_owner_call
    ,t6_owner_call
    ,t13_owner_call
    ,t20_owner_call
    ,t29_owner_call
    ,t44_owner_call
    ,ytx_cur_agreed_free_amt	
    ,ytx_is_cur_agreed_used_coupon	
    ,ytx_is_fst_installment_no_overdue	
FROM
  odps_user_tags_bhcs
WHERE
  pt = '\${bizdate}000000'
;

--position
`;
