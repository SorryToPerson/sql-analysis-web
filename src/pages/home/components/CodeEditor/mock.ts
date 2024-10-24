export const data = `
with bx_info_base as
(
	select a.*
	,b.policy_no
	,is_renewal_order
	,product_form
	,issue_date
	,cancel_date
	,expiry_date
	from
	(
		select user_id
		,max(datetrunc(loan_apply_date,'dd')) as loan_apply_date
		from za_jr_prd.adm_fin_retail_loan_dd
		where pt = '{bizdate}000000'
		and product_code = 'JDZAD'
		and credit_status = 1
		group by user_id
	) a
	left join
	(
		select user_id
		,policy_no
		,is_renewal_order----是否是续保订单Y是N否
		,product_form----产品:MA/MB/JJ
		,datetrunc(issue_date,'dd') as issue_date
		,datetrunc(cancel_date,'dd') as cancel_date
		,datetrunc(expiry_date,'dd') as expiry_date
		from za_jr_prd.cdm_fin_policy_busi_main_policy_ds
		where pt = '{bizdate}000000'
	) b
	on a.user_id = b.user_id
)

,bx_info as
(
	select a.user_id
	,a.loan_apply_date
	,count(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_mb_policy_cnt----用户历史持有MB保单数
	,count(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then a.policy_no end) as cur_mb_policy_cnt----当前在保MB保单数
	,count(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_jj_policy_cnt----用户历史持有JJ保单数
	,count(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then a.policy_no end) as cur_jj_policy_cnt----当前在保JJ保单数
	,max(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date then b.max_installment end) as max_his_mb_installment----历史所有MB保单最长续期期数
	,max(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then b.max_installment end) as max_cur_mb_installment----当前在保MB保单最长续期期数
	,max(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date then b.max_installment end) as max_his_jj_installment----历史所有JJ保单最长续期期数
	,max(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then b.max_installment end) as max_cur_jj_installment----当前在保JJ保单最长续期期数

	,count(distinct case when a.product_form = 'MB' and a.is_renewal_order = 'Y' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_mb_renewal_cnt----用户历史MB续保成功次数
	,count(distinct case when a.product_form = 'JJ' and a.is_renewal_order = 'Y' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_jj_renewal_cnt----用户历史JJ续保成功次数
	from bx_info_base a
	left join
	(
		select a.policy_no --保单号
		,b.user_id
		,count(distinct a.installment_no) as max_installment --最长续期期数
		from
		(
			select policy_no
			,channel_confirm_date
			,installment_no
			from za_jr_prd.adm_fin_policy_renewal_ds --续期表
			where pt = '{bizdate}000000'
			and is_pay = 1
		) a
		join bx_info_base b
		on a.policy_no = b.policy_no and a.channel_confirm_date < b.loan_apply_date
		group by a.policy_no,b.user_id
	) b
	on a.policy_no = b.policy_no and a.user_id = b.user_id
	group by a.user_id,a.loan_apply_date
)
,corp_info as 
(select user_id 
                 ,policy_nums_jj
                 ,orig_premium_jj
                 ,policy_nums_valid_jj
                 ,policy_nums_value_jj
                 ,first_insure_date_jj
                 ,last_insure_date_jj
                 ,cancel_policy_nums_jj
                 ,dbtb_cancel_policy_nums_jj
                 ,rejected_policy_nums_jj
                 ,parents_policy_nums_jj
                 ,spouse_policy_nums_jj
                 ,kids_policy_nums_jj
                 ,bulk_policy_nums_jj
                 ,first_re_insure_date_jj
                 ,last_re_insure_date_jj
                 ,renewal_policy_nums_jj
                 ,xb_datediff_jj
                 ,total_fly_policy_cnt
                 ,last_365days_fly_policy_cnt
                 ,last_180days_fly_policy_cnt
                 ,last_90days_fly_policy_cnt
                 ,last_30days_fly_policy_cnt
                 ,last_14days_fly_policy_cnt
                 ,last_7days_fly_policy_cnt
                 ,city_phone
                 ,typejob
                 ,job_type
                 ,job_income_level
                 ,product_category_set
                 ,policy_nums
                 ,orig_premium
                 ,policy_nums_valid
                 ,policy_nums_value
                 ,first_insure_date
                 ,last_insure_date
                 ,cancel_policy_nums
                 ,parents_policy_nums
                 ,spouse_policy_nums
                 ,kids_policy_nums
                 ,bulk_policy_nums
                 ,if_xq_ever
                 ,first_xq_dt
                 ,last_xq_dt
                 ,sum_pay_amt_ever
                 ,sum_pay_amt_7d
                 ,sum_pay_amt_30d
                 ,sum_pay_amt_90d
                 ,sum_pay_amt_180d
                 ,max_installment_no
                 ,min_installment_no
                 ,sum_installment_no
                 ,if_xb_ever
                 ,first_xb_dt
                 ,last_xb_dt
                 ,sum_re_premium_ever
                 ,sum_re_premium_7d
                 ,sum_re_premium_30d
                 ,sum_re_premium_90d
                 ,sum_re_premium_180d
                 ,xb_datediff
				 ,loan_apply_date as biz_date 
		  from za_jr_prd.adm_fin_strategy_analysis_creditpre_corpolicy_label_ds
		  where pt=max_pt('za_jr_prd.adm_fin_strategy_analysis_creditpre_corpolicy_label_ds')
		  union all 
		  select user_id 
                 ,policy_nums_jj
                 ,orig_premium_jj
                 ,policy_nums_valid_jj
                 ,policy_nums_value_jj
                 ,first_insure_date_jj
                 ,last_insure_date_jj
                 ,cancel_policy_nums_jj
                 ,dbtb_cancel_policy_nums_jj
                 ,rejected_policy_nums_jj
                 ,parents_policy_nums_jj
                 ,spouse_policy_nums_jj
                 ,kids_policy_nums_jj
                 ,bulk_policy_nums_jj
                 ,first_re_insure_date_jj
                 ,last_re_insure_date_jj
                 ,renewal_policy_nums_jj
                 ,xb_datediff_jj
                 ,total_fly_policy_cnt
                 ,last_365days_fly_policy_cnt
                 ,last_180days_fly_policy_cnt
                 ,last_90days_fly_policy_cnt
                 ,last_30days_fly_policy_cnt
                 ,last_14days_fly_policy_cnt
                 ,last_7days_fly_policy_cnt
                 ,city_phone
                 ,typejob
                 ,job_type
                 ,job_income_level
                 ,product_category_set
                 ,policy_nums
                 ,orig_premium
                 ,policy_nums_valid
                 ,policy_nums_value
                 ,first_insure_date
                 ,last_insure_date
                 ,cancel_policy_nums
                 ,parents_policy_nums
                 ,spouse_policy_nums
                 ,kids_policy_nums
                 ,bulk_policy_nums
                 ,if_xq_ever
                 ,first_xq_dt
                 ,last_xq_dt
                 ,sum_pay_amt_ever
                 ,sum_pay_amt_7d
                 ,sum_pay_amt_30d
                 ,sum_pay_amt_90d
                 ,sum_pay_amt_180d
                 ,max_installment_no
                 ,min_installment_no
                 ,sum_installment_no
                 ,if_xb_ever
                 ,first_xb_dt
                 ,last_xb_dt
                 ,sum_re_premium_ever
                 ,sum_re_premium_7d
                 ,sum_re_premium_30d
                 ,sum_re_premium_90d
                 ,sum_re_premium_180d
                 ,xb_datediff
				 ,loan_date as biz_date 
		  from za_jr_prd.adm_fin_strategy_analysis_loanpre_corpolicy_label_ds
		  where pt=max_pt('za_jr_prd.adm_fin_strategy_analysis_loanpre_corpolicy_label_ds')
)


insert overwrite table adm_fin_strategy_analysis_userbase partition(pt = '{bizdate}000000')
select a.user_id  -- 用户id
,a.certi_no  -- 身份证号
,a.phone_no  -- 注册手机号
,a.gender -- 性别
,a.birth  -- 出生日期
,a.cur_age  -- 当前年龄
,case when d.city rlike '万州' then '重庆'
	when d.city rlike '江汉' then '武汉'
	when d.city rlike '北京|上海|广州|深圳|杭州|苏州|成都|武汉|天津|南京|重庆|长沙|青岛|无锡|大连|宁波|济南|佛山|福州|南通|烟台|合肥|常州|东莞|昆明|长春|太原|郑州|西安|沈阳' then substr(city,1,2)
else '其他' end as city  -- 归属城市(gps_city > phone_city > certi_city)
,case when d.province rlike '内蒙古' then '内蒙古'
	when d.province rlike '黑龙江' then '黑龙江'
	when d.province rlike '中华人民共和国' then '未解析'
else substr(province,1,2) end as province  -- 归属省份(gps_city > phone_city > certi_city)
,case when d.city rlike '北京|上海|广州|深圳|杭州|苏州|成都|武汉|江汉|天津|南京' then '01一线城市'
	when d.city rlike '重庆|万州|长沙|青岛|无锡|大连|宁波|济南|佛山|福州|南通|烟台|合肥|常州|东莞|昆明|长春|太原|郑州|西安|沈阳' then '02二线城市'
	when d.city rlike '厦门|绍兴|南昌|温州|唐山|潍坊|徐州|哈尔滨|嘉兴|贵阳|淄博|台州|扬州|鄂尔多斯|珠海|金华|东营|乌鲁木齐|呼和浩特|威海' then '02二线城市'
	when d.city rlike '石家庄|泉州|盐城|中山|泰州|镇江|济宁|洛阳|廊坊|兰州|泰安|宜昌|襄阳|惠州|芜湖|湖州|保定|包头|株洲|临沂|沧州|淮安|江门|榆林|大庆' then '03三线城市'
	when d.city rlike '邯郸|聊城|漳州|德州|九江|岳阳|滨州|赣州|常德|连云港|衡阳|遵义|咸阳|新乡|许昌|宿迁|菏泽|南阳|枣庄|汕头|湛江' then '03三线城市'
	when d.city rlike '南宁|柳州|茂名|周口|海口|银川|西宁|昆山|江阴|张家港|义乌|吉林|鞍山|宝鸡|绵阳|通辽|松原|安阳|焦作|赤峰|邢台|郴州|平顶山|桂林|肇庆|曲靖' then '04四线城市'
	when d.city rlike '商丘|信阳|驻马店|营口|揭阳|龙岩|安庆|日照|三明|呼伦贝尔|长治|湘潭|德阳|南充|乐山|达州|盘锦|延安' then '04四线城市'
	when d.city rlike '上饶|锦州|宜春|宜宾|张家口|马鞍山|吕梁|抚顺|临汾|渭南|开封|莆田|荆州|黄冈|四平|承德|齐齐哈尔|三门峡|秦皇岛|本溪' then '04四线城市'
	when d.city rlike '玉林|孝感|牡丹江|荆门|宁德|运城|绥化|永州|怀化|黄石|泸州|清远|邵阳|衡水|益阳|丹东|铁岭|晋城|朔州|吉安|娄底|玉溪' then '04四线城市'
	when d.city rlike '辽阳|南平|濮阳|晋中|资阳|都江堰|攀枝花|衢州|内江|滁州|阜阳|十堰|大同|朝阳|六安|宿州|通化|蚌埠|韶关|丽水|自贡|阳江|毕节' then '04四线城市'
	when d.city is null or city rlike '四川省|直辖行政单位|广东省|自治区直辖县级行政区划|海南省|直辖行政单位|云南省|海南行政区|广西壮族自治区|贵州省|省直辖县级行政区划' then '99解析异常'
else '05五线城市' end as city_level  -- 城市等级
,case when pp.ca_id is not null then 1 else 0 end as is_cancel  -- 是否已注销
,pp.gmt_modified as cancel_time  -- 注销时间
,d.mp_manufacturer_flag  -- 客户所用手机对应的厂商
,'' as mp_manufacturer  -- 设备信息,该变量作废

,b.channel_final  -- 渠道类型_激活>归因>注册
,b.spread_way_final  -- 一级渠道（渠道子类型）_激活>归因>注册
,b.channel_type_final  -- 二级渠道（渠道名称）_激活>归因>注册
,b.register_name_final  -- 三级渠道（子渠道名称）_激活>归因>注册
,b.register_source_final  -- 子渠道编码_激活>归因>注册
,p.pboc2_edu_level  -- 学历
,p.pboc2_employer_seg  -- 就业类型
,p.pboc2_industry  -- 行业信息
,p.pboc2_marital_state  -- 婚姻状态
,p.pboc2_occupation  -- 职业信息

,a2.credit_operate_flag  -- 是否额度平移
,a.register_time  -- 注册时间
,l.fst_login_time  -- 首次登录APP时间
,l.lst_login_time  -- 最近一次登录APP时间

,a.is_apply  -- 是否完申
,a.fst_apply_time  -- 首次完申时间
,a2.loan_apply_date as lst_apply_time  -- 最近一次完申时间
,a2.user_back_flag  -- 是否回捞客群 1是 0否
,a2.is_mid_back  -- 是否中收回捞 1是 0否
,a2.is_reapply  -- 是否发起拒信重申 1是 0否
,a.is_credit  -- 是否授信
,coalesce(a2.flow_score_v2,'空') as flow_score_v2  -- 流量评分v2
,coalesce(a2.cscore_level,'空') as cscore_level  -- 授信评分

,c.operations_code  -- 贷中风险分层
,a.cur_left_principal  -- 在贷余额
,a.is_inloan  -- 是否在贷
,a.his_overdue_days  -- 历史最大逾期天数
,a.cur_overdue_days  -- 当前最大逾期天数
,a.fst_withdraw_date  -- 首次放款时间
,a.fst_loan_date  -- 首次动支时间
,hc.max_hc_time as lst_loan_reject_time  -- 最近一次贷中互斥时间
,hc.min_hc_time as fst_loan_reject_time  -- 首次贷中互斥时间

,a.lst_loan_date  -- 最近一次动支时间
,a.lst_withdraw_date  -- 最近一次放款时间
,rp.lst_repayment_date  -- 最近一次还款时间
,a.loan_cnt  -- 累计借款笔数
,a2.apply_age as lst_apply_age  -- 最近一次完申时点年龄
,a.credit_apply_time  -- 授信申请时间
,a.credit_apply_no  -- 授信通过编号
,a.credit_approve_time  -- 授信通过时间
,a.origin_credit_level  -- 原始授信等级
,a.credit_level  -- 当前授信等级
,a.origin_credit_irr_rate_12  -- 原始授信定价
,a.credit_irr_rate_12  -- 当前授信定价
,a.origin_credit_amount  -- 原始授信额度
,a.credit_amount  -- 当前授信额度
,a1.is_longterm_control_group  -- 是否长期对照组

,coalesce(a.credit_amount,0) - coalesce(a.cur_left_principal,0) as usable_amt  -- 剩余可用额度
,case when cur_age > 54 then '01.54岁以上'
	when cur_age > 50 then '02.51-54岁'
	when cur_age >= 41 then '03.41-50岁'
	when cur_age >= 31 then '04.31-40岁'
	when cur_age >= 24 then '05.24-30岁'
	when cur_age >= 22 then '06.22-23岁'
	when cur_age >= 18 then '07.18-21岁'
else '08.其他' end as cur_age_bin  -- 当前年龄段
,case when a2.apply_age > 54 then '01.54岁以上'
	when a2.apply_age > 50 then '02.51-54岁'
	when a2.apply_age >= 41 then '03.41-50岁'
	when a2.apply_age >= 31 then '04.31-40岁'
	when a2.apply_age >= 24 then '05.24-30岁'
	when a2.apply_age >= 22 then '06.22-23岁'
	when a2.apply_age >= 18 then '07.18-21岁'
else '08.其他' end lst_apply_age_bin  -- 最近一次完申时点年龄段

,case when flow_score_v2 is null then '空' 
	when flow_score_v2 in ('L01','L02') then '01.超优'
	when flow_score_v2 in ('L03') then '02.优质'
else '03.一般' end as flow_score_seg_v2  -- 优质完申标签_v2
,case when cscore_level is null then '空'
	when cscore_level in ('C1','C2','C3','C4') then '01.超优'
 else '02.一般' end as cscore_seg  -- 超优授信标签
,case when origin_credit_amount<3000 then '01.(0,3000)'
	when origin_credit_amount<=3000 then '02.(3000,3000]'
	when origin_credit_amount<=5000 then '03.(3000,5000]'
	when origin_credit_amount<=10000 then '04.(5000,10000]'
	when origin_credit_amount<=20000 then '05.(10000,20000]'
	when origin_credit_amount<=30000 then '06.(20000,30000]'
	when origin_credit_amount<=50000 then '07.(30000,50000]'
	when origin_credit_amount>50000 then '08.(50000,+)'
else '99others' end as origin_credit_amount_bin  -- 原始授信额度分箱
,case when credit_amount<3000 then '01.(0,3000)'
	when credit_amount<=3000 then '02.(3000,3000]'
	when credit_amount<=5000 then '03.(3000,5000]'
	when credit_amount<=10000 then '04.(5000,10000]'
	when credit_amount<=20000 then '05.(10000,20000]'
	when credit_amount<=30000 then '06.(20000,30000]'
	when credit_amount<=50000 then '07.(30000,50000]'
	when credit_amount>50000 then '08.(50000,+)'
else '99others' end as credit_amount_bin  -- 当前授信额度分箱
,case when origin_credit_irr_rate_12 is null or origin_credit_irr_rate_12 <= 0.24 then '(0,24%]'
	when origin_credit_irr_rate_12 > 0.24 then '(24%,36%]'
end origin_credit_irr_bin  -- 原始授信定价分箱
,case when credit_irr_rate_12 is null or credit_irr_rate_12 <= 0.24 then '(0,24%]'
	when credit_irr_rate_12 > 0.24 then '(24%,36%]'
end credit_irr_bin  -- 当前授信定价分箱

,datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') as register_period  -- 注册距今时长
,case when datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'mm') = 0 then 1 else 0 end as is_m0_register  -- 是否当月注册
,datediff(fst_login_time,a.register_time,'dd') as fst_login_reg_period  -- 首次登录APP距注册时长
,datediff(fst_apply_time,a.register_time,'dd') as fst_apply_reg_period  -- 首次完申距注册时长

,datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') as credit_period  -- 授信距今时长
,datediff(credit_approve_time,register_time_new,'dd') as credit_reg_period  -- 授信距注册时长
,case when datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') < 90 then 1 else 0 end as is_credit_in_90d  -- 是否授信90天内
,case when datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'mm') = 0 then 1 else 0 end as is_m0_credit  -- 是否当月授信
,datediff(fst_loan_date,credit_approve_time,'dd') as fst_loan_cre_period  -- 首次动支距授信时长
,datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') as lst_withdraw_period  -- 最近一次放款距今时长
,datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') as lst_repayment_period  -- 最近一次还款距今时长

,case when is_apply = 0 and datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') < 30 then '注册未完申(30天内)'
	when is_apply = 0 and datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') >= 30 then '注册未完申(30天以上)'
	when is_apply = 1 and is_credit = 0 then '授信被拒'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') < 30 then '授信未支用(30天内)'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') >= 30
		and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') <= 90 then '授信未支用(30-90天)'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') > 90 then '授信未支用(90天以上)'
	when is_credit = 1 and fst_loan_date is not null and loan_cnt = 0 then '首借被拒'
	when loan_cnt >= 1 and cur_left_principal = 0 and (datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 30 or rp.lst_repayment_date is null) then '结清户0-30'
	when loan_cnt >= 1 and cur_left_principal = 0 and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') >= 31
		and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 90 then '结清31-90'
	when loan_cnt >= 1 and cur_left_principal = 0 and  datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') >= 91
		and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 180 then '结清91-180'
	when loan_cnt >= 1 and cur_left_principal = 0 and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') > 180 then '结清181+'
	when loan_cnt = 1 and cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 90 then '首借在贷（0-90）'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 90 then '复借在贷（0-90）'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 180
		and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') >= 91 then '在贷流失预警（91-180）'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') >= 181 then '在贷流失（181+）'
end as user_type  -- 客群分类

,case when is_apply = 0 then '注册未完申'
	when is_apply = 1 and is_credit = 0 then '授信被拒'
	when is_credit = 1 and fst_loan_date is null then '授信未支用'
	when is_credit = 1 and fst_loan_date is not null and loan_cnt = 0 then '首借被拒'
	when loan_cnt >= 1 and cur_left_principal = 0 then '结清'
	when cur_left_principal > 0 then '在贷'
end as user_kind  -- 客群大类

,greatest(sms.lst_sms_time,rg.lst_phone_time,ai.lst_ivr_time) as lst_mkt_time  -- 最近一次信贷营销时间
,greatest(sms.lst_sms_suc_time,rg.lst_phone_suc_time,ai.lst_ivr_suc_time) as lst_mkt_suc_time  -- 最近一次信贷营销触达时间
,sms.lst_sms_time  -- 最近一次信贷短信发送时间
,sms.lst_sms_suc_time  -- 最近一次营销短信触达时间
,rg.lst_phone_time  -- 最近一次信贷电销拨打时间
,rg.lst_phone_suc_time  -- 最近一次信贷电销接通时间
,ai.lst_ivr_time  -- 最近一次信贷IVR拨打时间
,ai.lst_ivr_suc_time  -- 最近一次信贷IVR接通时间
,coalesce(sms.sms_cnt_30d,0) + coalesce(rg.phone_cnt_30d,0) + coalesce(ai.ivr_cnt_30d,0) as mkt_cnt_30d  -- 近30天信贷营销次数
,coalesce(sms.sms_suc_cnt_30d,0) + coalesce(rg.phone_suc_cnt_30d,0) + coalesce(ai.ivr_suc_cnt_30d,0) as mkt_suc_cnt_30d  -- 近30天信贷营销触达次数
,sms.sms_cnt_30d  -- 近30天信贷营销短信发送次数
,sms.sms_suc_cnt_30d  -- 近30天信贷营销短信触达次数
,rg.phone_cnt_30d  -- 近30天信贷电销拨打次数
,rg.phone_suc_cnt_30d  -- 近30天信贷电销接通次数
,rg.phone_time_length_30d  -- 近30天信贷电销通话时长
,ai.ivr_cnt_30d  -- 近30天i信贷vr拨打次数
,ai.ivr_suc_cnt_30d  -- 近30天信贷ivr接通次数
,ai.ivr_time_length_30d  -- 近30天信贷ivr通话时长

,rp.left_balance  -- 在贷余额
,rp.cur_due_pricipal  -- 当前应还本金
,rp.left_balance_endday  -- 在贷余额(已计入当天还款&借款)
,rp.cur_due_pricipal_endday  -- 当前应还本金(计入当天还款&借款)
,a.fst_loan_inner_no  -- 首借借据号
,a.fst_loan_repayment_day  -- 首借账单日
,e.most_freq_loan_repayment_day  -- 最常用账单日
,a.total_loan_num  -- 历史累计借款笔数(不计入当天借款)
,a.total_loan_num_endday  -- 历史累计借款笔数(计入当天借款)
,a.total_settled_loan_num  -- 当前已结清借据数(不计入当天结清)
,a.total_settled_loan_num_endday  -- 当前已结清借据数(计入当天结清)
,rp.total_repayment_num  -- 历史累计还款次数(不计入当天还款)
,rp.total_repayment_num_endday  -- 历史累计还款次数(计入当天还款)
,rp.lst_repay_date  -- 最近一次还款时间(不计入当天还款)
,rp.lst_repay_date_endday  -- 最近一次还款时间(计入当天还款)

,a.activation_time  -- 激活时间
,a.register_time_new  -- 激活后的注册时间
,b.regi_channel  -- 一级渠道（渠道类型）_仅注册
,b.regi_spread_way  -- 二级渠道（渠道子类型）_仅注册
,b.regi_channel_type  -- 三级渠道（渠道名称）_仅注册
,b.regi_register_name  -- 四级渠道（子渠道名称）_仅注册
,b.regi_register_source  -- 子渠道编码_仅注册
,c.operations_code_v3  -- 贷中风险分层v3
,a2.pboc_v9_credit_apply_lvl  -- 人行分V9授信等级
,a2.credit_acard_lvl  -- 新户风险授信分
,case when a2.v54_score is null then '空'
	when a2.v54_score >= 560 then '01.超优'
	when a2.v54_score >= 500 then '02.优质'
else '03.一般' end as flow_score_seg_v2_1  -- 优质完申标签_v2.1
,a2.v54_score  -- 流量分v2
,br.bairong_score  -- 百融分
,br.bairong_score_range  -- 百融分区间
,a2.loan_apply_no  -- 最近一次授信申请编号
,bc.approve_type  -- 完申流程(最近一次完申)
,d.bind_type  -- 绑卡方式
,d.ocr_type  -- 实名OCR方式

,datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'mm') as register_mob  -- 注册mob
,datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'mm') as credit_mob  -- 授信mob
,datediff(to_date('{bizdate}','yyyymmdd'),fst_withdraw_date,'mm') as fst_withdraw_mob  -- 首借mob

,hc.gmt_created_max as lst_loan_tj_time  -- 最近一次提交借款申请时间
,hc.gmt_created_min as fst_loan_tj_time  -- 首次提交借款申请时间

,ps.is_high_quality_pboc_score  -- 征信分补充优质户标签（未交叉风险分层）

,bx.his_mb_policy_cnt----用户历史持有MB保单数_授信时点
,bx.cur_mb_policy_cnt----当前在保MB保单数_授信时点
,bx.his_jj_policy_cnt----用户历史持有JJ保单数_授信时点
,bx.cur_jj_policy_cnt----当前在保JJ保单数_授信时点
,bx.max_his_mb_installment----历史所有MB保单最长续期期数_授信时点
,bx.max_cur_mb_installment----当前在保MB保单最长续期期数_授信时点
,bx.max_his_jj_installment----历史所有JJ保单最长续期期数_授信时点
,bx.max_cur_jj_installment----当前在保JJ保单最长续期期数_授信时点
,bx.his_mb_renewal_cnt----用户历史MB续保成功次数_授信时点
,bx.his_jj_renewal_cnt----用户历史JJ续保成功次数_授信时点

,case when xinhu.final_score is null then 'null'
	when xinhu.final_score <= 256 then 'T1'
	when xinhu.final_score <= 286 then 'T2'
	when xinhu.final_score <= 302 then 'T3'
	when xinhu.final_score <= 317 then 'T4'
	when xinhu.final_score <= 331 then 'T5'
	when xinhu.final_score <= 345 then 'T6'
	when xinhu.final_score <= 361 then 'T7'
	when xinhu.final_score <= 380 then 'T8'
	when xinhu.final_score <= 409 then 'T9'
else 'T10' end as xinhu_score_level  -- 新户意愿分（授信0-30）
,case when cl.final_score is null then 'null'
	when cl.final_score <= 641 then 'T1'
	when cl.final_score <= 724 then 'T2'
	when cl.final_score <= 769 then 'T3'
	when cl.final_score <= 796 then 'T4'
	when cl.final_score <= 815 then 'T5'
	when cl.final_score <= 832 then 'T6'
	when cl.final_score <= 850 then 'T7'
	when cl.final_score <= 871 then 'T8'
	when cl.final_score <= 901 then 'T9'
else 'T10' end as cl_score_level  -- 存量意愿分（授信30-90）
,concat(loan_card_reg,',',p.pboc_bad_out,',',p.card_overdue_level,',',p.loan_overdue_level) as loan_card_reg
------from songhonghui 20240523
,datediff(fst_loan_date,register_time_new,'dd') as fst_loan_reg_period  -- 首次动支距注册时长
,datediff(fst_withdraw_date,register_time_new,'dd') as fst_withdraw_reg_period  -- 首借距注册时长
,datediff(fst_withdraw_date,credit_approve_time,'dd') as fst_withdraw_cre_period  -- 首借距授信时长
,datediff(fst_apply_time,register_time_new,'mm') as fst_apply_reg_mob----首次申请距离注册MOB 
,datediff(fst_withdraw_date,register_time_new,'mm') as fst_withdraw_reg_mob---首借距离注册MOB
,datediff(fst_withdraw_date,fst_apply_time,'mm') as fst_withdraw_credit_mob---首借距离授信MOB
,case when fst_withdraw_date is not null then fst_withdraw_amount else 0 end as fst_withdraw_amount-- 首借金额
,corp.policy_nums_jj
,corp.orig_premium_jj
,corp.policy_nums_valid_jj
,corp.policy_nums_value_jj
,corp.first_insure_date_jj
,corp.last_insure_date_jj
,corp.cancel_policy_nums_jj
,corp.dbtb_cancel_policy_nums_jj
,corp.rejected_policy_nums_jj
,corp.parents_policy_nums_jj
,corp.spouse_policy_nums_jj
,corp.kids_policy_nums_jj
,corp.bulk_policy_nums_jj
,corp.first_re_insure_date_jj
,corp.last_re_insure_date_jj
,corp.renewal_policy_nums_jj
,corp.xb_datediff_jj
,corp.total_fly_policy_cnt
,corp.last_365days_fly_policy_cnt
,corp.last_180days_fly_policy_cnt
,corp.last_90days_fly_policy_cnt
,corp.last_30days_fly_policy_cnt
,corp.last_14days_fly_policy_cnt
,corp.last_7days_fly_policy_cnt
,SPLIT_PART(SPLIT_PART(corp.city_phone,'_',2),'-',1) as city_phone
,corp.typejob
,corp.job_type
,corp.job_income_level
,corp.product_category_set
,corp.policy_nums
,corp.orig_premium
,corp.policy_nums_valid
,corp.policy_nums_value
,corp.first_insure_date
,corp.last_insure_date
,corp.cancel_policy_nums
,corp.parents_policy_nums
,corp.spouse_policy_nums
,corp.kids_policy_nums
,corp.bulk_policy_nums
,corp.if_xq_ever
,corp.first_xq_dt
,corp.last_xq_dt
,corp.sum_pay_amt_ever
,corp.sum_pay_amt_7d
,corp.sum_pay_amt_30d
,corp.sum_pay_amt_90d
,corp.sum_pay_amt_180d
,corp.max_installment_no
,corp.min_installment_no
,corp.sum_installment_no
,corp.if_xb_ever
,corp.first_xb_dt
,corp.last_xb_dt
,corp.sum_re_premium_ever
,corp.sum_re_premium_7d
,corp.sum_re_premium_30d
,corp.sum_re_premium_90d
,corp.sum_re_premium_180d
,corp.xb_datediff
,loan_preference
,c.operations_code_v4
,gps_province,phone_province,certi_province
,a.loan_amt----历史累计放款金额
,d.apply_platform
,d.ip_province
,b.utm_source_category_name-----from songhonghui 20241008渠道细类名称
,b.channel_regroup-----from lilele 20241010渠道归拢
from
(
	select user_id
	,certi_no
	,phone_no
	,get_idcard_sex(certi_no) as gender
	,get_idcard_birthday(certi_no) as birth
	,datediff(to_date('{bizdate}','yyyymmdd'),get_idcard_birthday(certi_no),'yyyy') as cur_age
	,register_time
	,activation_time
	,coalesce(activation_time,register_time) as register_time_new
	,max(case when loan_apply_date is not null then 1 else 0 end) as is_apply
	,min(loan_apply_date) as fst_apply_time
	,max(credit_status) as is_credit

	,max(cast(origin_credit_amount as double)) as origin_credit_amount
	,max(cast(credit_amount as double)) as credit_amount
	,max(case when credit_status = 1 then loan_apply_date end) as credit_apply_time
	,max(case when credit_status = 1 then loan_apply_no end) as credit_apply_no
	,max(case when credit_status = 1 then approve_time end) as credit_approve_time
	,max(case when credit_status = 1 then origin_credit_level end) as origin_credit_level
	,max(case when credit_status = 1 then credit_level end) as credit_level
	,max(case when credit_status = 1 then origin_credit_irr_rate_12 end) as origin_credit_irr_rate_12
	,max(case when credit_status = 1 then credit_irr_rate_12 end) as credit_irr_rate_12

	,nvl(sum(cast(cur_left_pricipal as double)),0) as cur_left_principal
	,max(case when cur_left_pricipal > 0 then 1 else 0 end) as is_inloan
	,max(overdue_days) as his_overdue_days
	,max(cur_overdue_days) as cur_overdue_days
	,min(case when loan_status = 1 then withdraw_date end) as fst_withdraw_date
	,min(loan_date) as fst_loan_date
	,max(loan_date) as lst_loan_date
	,max(case when loan_status = 1 then withdraw_date end) as lst_withdraw_date
-- 	,max(case when loan_status = 1 then lst_repayment_date end) as lst_repayment_date
	,count(distinct case when loan_status = 1 then loan_inner_no end) as loan_cnt

	,max(case when first_loan_flag = 1 then loan_inner_no end) as fst_loan_inner_no  -- 首借借据号
	,max(case when first_loan_flag = 1 then day(lst_agreed_repay_date) end) as fst_loan_repayment_day  -- 首借账单日
	,max(case when first_loan_flag = 1 then withdraw_amount end) as fst_withdraw_amount  -- 首借金额
	,count(distinct case when substr(withdraw_date,1,10) <> '{bizdate,yyyy-MM-dd}' then loan_inner_no end) as total_loan_num  -- 历史累计借款笔数(不计入当天借款)
	,count(distinct loan_inner_no) as total_loan_num_endday  -- 历史累计借款笔数(计入当天借款)
	,count(distinct case when loan_settle_time is not null and substr(loan_settle_time,1,10) <> '{bizdate,yyyy-MM-dd}' then loan_inner_no end) as total_settled_loan_num  -- 历史累计结清借据数(不计入当天结清)
	,count(distinct case when loan_settle_time is not null then loan_inner_no end) as total_settled_loan_num_endday  -- 历史累计结清借据数(计入当天结清)			
	,sum(case when loan_status = 1 then withdraw_amount end) as loan_amt----历史累计放款金额
	from za_jr_prd.adm_fin_retail_loan_dd
	where pt = '{bizdate}000000'
	and product_code = 'JDZAD'
	group by user_id
	,certi_no
	,phone_no
	,register_time
	,activation_time
) a
left join
(  -- 是否对照组
	select user_id,max(is_longterm_control_group) as is_longterm_control_group
	from za_jr_prd.adm_fin_imp_user_tag_user_info_ds
	where pt = '{bizdate}000000'
	and product_code = 'JDZAD'
	group by user_id
) a1
on a.user_id = a1.user_id
left join
(  -- 最近一次完申
	select user_id
	,loan_apply_no
	,loan_apply_date
	,datediff(loan_apply_date,get_idcard_birthday(certi_no),'yyyy') as apply_age
	,user_back_flag
	,is_mid_back
	,is_reapply
	,case when is_cdp_reapply = 1 then '存量可重审'
		when is_admit_reapply = 1 then '新增可重申'
	else '不允许重审' end as is_can_reapply
	,flow_model_score_v2 as v54_score
	,flow_model_score as flow_score_v2
	,risk_score_level as cscore_level
	,pboc_v9_credit_apply_lvl
	,credit_acard_lvl
	,credit_operate_flag

	,row_number() over(partition by user_id order by loan_apply_date desc,credit_status desc) as apply_rk
	from za_jr_prd.adm_fin_retail_loan_dd
	where pt = '{bizdate}000000'
	and product_code = 'JDZAD'
) a2
on a.user_id = a2.user_id and a2.apply_rk = 1
left join
(
	select *
	from  za_jr_prd.adm_fin_jdzad_ad_user_channel_ds_new
	where pt = max_pt('za_jr_prd.adm_fin_jdzad_ad_user_channel_ds_new')
) b
on a.user_id = b.za_account
left join
(
	select a.user_id
	,operations_code
	,coalesce(a.operations_code_v3,b.operations_code_v3) as operations_code_v3
	,coalesce(a.operations_code_v4,c.operations_code_v4) as operations_code_v4
	from
	(
		select user_id
		,max(operations_code) as operations_code
		,max(operations_code_v3) as operations_code_v3
		,max(operations_code_v4) as operations_code_v4
		from za_jr_prd.cdm_fin_risk_crm_ds
		where pt = '{bizdate}000000'
		and product_code = 'JDZAD'
		group by user_id
	) a
	left join
	(
		select user_id
		,max(operations_code_v3) as operations_code_v3 
		from za_jr.temp_zad_credit_apv_90plus_fujie_operations_code_v3
		where substr(pt,1,8) = '{bizdate}'
		group by user_id
	) b
	on a.user_id = b.user_id
		left join
	(
		select user_id
		,max(operations_code_v4) as operations_code_v4 
		from za_jr.temp_zad_credit_apv_90plus_fujie_operations_code_v4
		where substr(pt,1,8) = '{bizdate}'
		group by user_id
	) c
	on a.user_id = c.user_id
) c
on a.user_id = c.user_id
left join
(
	select user_id,gps_province,phone_province,certi_province
	,case when gps_city is not null then gps_city
		when phone_city is not null then phone_city
	else certi_city end as city
	,case when gps_province is not null then gps_province
		when phone_province is not null then phone_province
	else certi_province end as province
	,mp_manufacturer_flag
	,bind_type
	,ocr_type
	,loan_preference
	,ip_province
	,apply_platform
    from za_jr_prd.adm_fin_jdzad_ad_user_transfer_ds
	where pt = '{bizdate}000000'
) d
on a.user_id = d.user_id
left join
(
	select za_caid
	,min(first_login_time) as fst_login_time
	,max(lst_login_time) as lst_login_time
	from za_jr_prd.edw_fin_retail_user_flow_ft_bak
	where pt = '{bizdate}000000'
	and product_code = 'JDZAD'
	group by za_caid
) l
on a.user_id = l.za_caid
left join
(  -- 注销记录
	select ca_id
	,min(gmt_modified) as gmt_modified
	from za_jr_prd.ods_fe_fin_user_info
	where pt = '{bizdate}000000'
	and user_status = 2
	and is_deleted = 'N'
	and ca_id is not null
	and to_char(gmt_modified,'yyyymmdd') <= '{bizdate}'
	group by ca_id
) pp
on a.user_id = pp.ca_id
left join
(
	select third_user_no as user_id
	,max(gmt_created) as gmt_created_max
	,min(gmt_created) as gmt_created_min
	,max(case when fund_result_code = '0164' then gmt_created end) as max_hc_time
	,min(case when fund_result_code = '0164' then gmt_created end) as min_hc_time
	from za_jr_prd.ods_noah_fcp_pay_order
	where pt = '{bizdate}000000'
	and supplier_code = 'ZY'
 	and partner_no = 'JDZAD'
	and sub_biz_type = 'CL'  -- 现金贷
	and status = 3
-- 	and fund_result_code = '0164'
	group by third_user_no
) hc
on a.user_id = hc.user_id
left join
(select apply_no
	,pboc2_report_create_time
	,pboc2_reportno
	,pboc2_query_reason
	,pboc2_employer_seg
	,pboc2_edu_level
	,pboc2_occupation
	,pboc2_industry----最新行业
	,pboc2_marital_state
	,pboc_bad_out
	,card_overdue_level
	,loan_overdue_level
	,row_number() over(partition by apply_no order by pboc2_report_create_time desc) as pid
	from za_jr_risk.adm_fin_strategy_analysis_loanbase_pboc
	where pt = max_pt('za_jr_risk.adm_fin_strategy_analysis_loanbase_pboc')
) p
on a2.loan_apply_no = p.apply_no and p.pid = 1
left join
(  -- 百融分
	select user_id
	,bairong_score
	,bairong_score_range
	from za_jr_prd.adm_fin_rpt_user_tag_info_da
	where pt = '{bizdate}000000'
	group by user_id,bairong_score,bairong_score_range
) br
on a.user_id = br.user_id
left join
(
	select distinct apply_no_bysrc
	,case when is_card_back = 0 and is_ocr_back = 1 then '4.双后置'
		when is_ocr_back = 1 and is_card_back != 0 then '3.OCR后置'
		when is_card_back = 0 and is_ocr_back != 1 then '2.绑卡后置'
	else '1.全流程' end as approve_type
	from
	(
		select apply_no as apply_no_bysrc
		,get_json_object(unCompress(biz_data),'$.is_ocr_houzhi_test_flag') as is_ocr_back	--ocr后置的标识
		,get_json_object(unCompress(biz_data),'$.credit_is_bind_card') as is_card_back	--绑卡后置的标识
		from za_jr_prd.ods_finance_xmagic_decision_exec_biz_context
		where pt = max_pt('za_jr_prd.ods_finance_xmagic_decision_exec_biz_context')
		and project_code = 'XC001'
	) a
) bc
on a2.loan_apply_no = bc.apply_no_bysrc
left join
(
	select user_id
	,max(call_time) as lst_phone_time
	,max(case when time_length > 0 then call_time end) as lst_phone_suc_time
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),call_time,'dd') <= 30 then call_id end) as phone_cnt_30d
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),call_time,'dd') <= 30 and time_length > 0 then call_id end) as phone_suc_cnt_30d
	,sum(case when datediff(to_date('{bizdate}','yyyymmdd'),call_time,'dd') <= 30 and time_length > 0 then time_length else 0 end) as phone_time_length_30d
	from za_jr_prd.cdm_fin_phone_mkt_dd
	where pt = max_pt('za_jr_prd.cdm_fin_phone_mkt_dd')
	and to_char(call_time,'yyyymmdd') <= '{bizdate}'
	and mkt_level1 in ('信贷')
	and product_code = 'JDZAD'
	group by user_id
) rg
on a.user_id = rg.user_id
left join
(
	select user_id
	,'ai_call' as mkt_type
	,max(send_time) as lst_ivr_time
	,max(case when if_market_sus = 1 then send_time end) as lst_ivr_suc_time
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),send_time,'dd') <= 30 then id end) as ivr_cnt_30d
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),send_time,'dd') <= 30 and if_market_sus = 1 then id end) as ivr_suc_cnt_30d
	,sum(case when datediff(to_date('{bizdate}','yyyymmdd'),send_time,'dd') <= 30 and call_duration > 0 then call_duration else 0 end) as ivr_time_length_30d
	from za_jr_prd.cdm_fin_mkt_send_dd
	where pt = max_pt('za_jr_prd.cdm_fin_mkt_send_dd')
	and pt2 in ('outbound_abt','outbound_plat','outbound')
	and data_source = '金融'
	and to_char(send_time,'yyyymmdd') <= '{bizdate}'
	and mkt_level1 in ('信贷')
	and (product_code = 'JDZAD' or task_code in ('fcp_1607002','1047'))
	group by user_id
) ai
on a.user_id = ai.user_id
left join
(
	select user_id
	,max(send_time) as lst_sms_time
	,max(case when if_market_sus = 1 then send_time end) as lst_sms_suc_time
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),send_time,'dd') <= 30 then id end) as sms_cnt_30d
	,count(case when datediff(to_date('{bizdate}','yyyymmdd'),send_time,'dd') <= 30 and if_market_sus = 1 then id end) as sms_suc_cnt_30d
	from za_jr_prd.cdm_fin_mkt_send_dd
	where pt = max_pt('za_jr_prd.cdm_fin_mkt_send_dd')
	and pt2 = 'sms'
	and (content_type = '1' or (content_type = '2' and if_mkt_attr = '1'))
	and data_source = '金融'
	and to_char(send_time,'yyyymmdd') <= '{bizdate}'
	and mkt_level1 in ('信贷')
	and (product_code = 'JDZAD' or task_code in ('fcp_1607002','1047'))
	group by user_id
) sms
on a.user_id = sms.user_id
left join
(
	select user_id
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) = 0 then due_principal  -- 不计入当天还款
			when datediff('{bizdate,yyyy-MM-dd}',substr(withdraw_date,1,10)) > 0 then cur_left_pricipal  -- 不计入当天借款
		else 0 end) as left_balance  -- 在贷余额(未减去当天还款&借款)  
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) = 0 then due_principal
			when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) > 0 then cur_left_pricipal else 0 end) as cur_due_pricipal  -- 当前应还款额(未计入当天还款)
	,nvl(sum(cur_left_pricipal),0) as left_balance_endday
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) >= 0 then cur_left_pricipal else 0 end) as cur_due_pricipal_endday
	,sum(case when actual_repayment_time is not null and substr(actual_repayment_time,1,10) <> '{bizdate,yyyy-MM-dd}' then 1 else 0 end) as total_repayment_num  -- 历史累计还款次数
	,sum(case when actual_repayment_time is not null then 1 else 0 end) as total_repayment_num_endday  -- 历史累计还款次数
	,max(actual_repayment_time) as lst_repayment_date
	,max(case when substr(actual_repayment_time,1,10) <> '{bizdate,yyyy-MM-dd}' then actual_repayment_time end) as lst_repay_date  -- 最近一次还款时间(不计入当天还款)
	,max(actual_repayment_time) as lst_repay_date_endday  -- 最近一次还款时间(计入当天还款)

	from za_jr_prd.cdm_fin_repayment_plan
	where pt = '{bizdate,yyyyMMdd}000000'
	and product_id = '1510006902'
	group by user_id
) rp
on a.user_id = rp.user_id
left join
(  -- e表:历史最常用账单日
	select user_id
	,repayment_day as most_freq_loan_repayment_day  -- 最常用账单日
	,row_number() over(partition by user_id order by repayment_day_cnt desc) as repayment_day_rnk
	from
	(
		select user_id
		,day(lst_agreed_repay_date) as repayment_day  -- 账单日
		,count(distinct loan_inner_no) as repayment_day_cnt
		from za_jr_prd.adm_fin_retail_loan_dd 
		where pt = '{bizdate}000000'
		and product_code = 'JDZAD'
		and loan_status = 1
		group by user_id,day(lst_agreed_repay_date)
	) a
) e
on a.user_id = e.user_id and e.repayment_day_rnk = 1
left join
(
    select product_date
    ,certi_no
    ,case when second_score>=800 and last_score>=800 and score>=800 then 1  -- 连续三个月800分以上
        when score>=600 and score-last_score>50 then 1  -- 本月高分且本月比上个月高50分以上
    else 0 end as is_high_quality_pboc_score
    ,row_number() over(partition by certi_no order by product_date desc) as rk
    from
    (
    	select idnum as certi_no
    	,score
    	,position
    	,to_date(productdate,'yyyy-mm-dd') as product_date  -- 查询时间
    	,lag(score) over(partition by idnum order by productdate) as last_score
    	,lag(score,2) over(partition by idnum order by productdate) as second_score
    	,max(score) over(partition by idnum order by productdate rows between 2 preceding and current row) as his_max_score
    	from za_jr_prd.ods_frcb_fin_datasupport_digitization_query_ext_result
    	where pt = max_pt('za_jr_prd.ods_frcb_fin_datasupport_digitization_query_ext_result')
    	and servicecode = 'FW_PF_0018'
    	and score <> ''
    	group by idnum,productdate,position,score
    ) a
    where datediff(to_date('{bizdate}','yyyymmdd'),product_date,'mm') <= 2
) ps
on a.certi_no = ps.certi_no and ps.rk = 1
left join bx_info bx
on a.user_id = bx.user_id
left join
(
	select distinct user_id,final_score
	from za_jr_prd.adm_xinhu_dongzhi_model_score_v2
	where pt >= '20231123000000'
	and pt <= '{bizdate}000000'
) xinhu
on a.user_id = xinhu.user_id
left join
(
	select distinct user_id,final_score
	from za_jr_prd.adm_sxsm_dongzhi_model_score_v2
	where pt = '{bizdate}000000'
) cl
on a.user_id = cl.user_id
left outer join 
(select distinct loan_apply_no,loan_card_reg from za_jr.ys_org_type_flag4_def)c2 on a2.loan_apply_no=c2.loan_apply_no
--到 user_id 粒度取用户最新授信或最新支用时点的集团保险标签数据
left join (select *,  row_number() over(partition by user_id order by biz_date desc) as rn
           from corp_info
          ) corp on corp.user_id=a.user_id and corp.rn=1
;
`;
