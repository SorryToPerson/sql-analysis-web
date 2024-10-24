"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[254],{83254:function(ge,M,t){t.r(M),t.d(M,{default:function(){return he}});var k=t(33572),Z=t(97857),O=t.n(Z),V=t(5574),S=t.n(V),Y=t(13769),$=t.n(Y),m=t(67294),X=t(78957),G=t(30670),H=t(14839),q=t(74981),K=t(53239),be=t(66245),Be=t(24203),Ce=t(42692),ve=t(42557),we=t(74763),U=`
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
		,is_renewal_order----\u662F\u5426\u662F\u7EED\u4FDD\u8BA2\u5355Y\u662FN\u5426
		,product_form----\u4EA7\u54C1:MA/MB/JJ
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
	,count(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_mb_policy_cnt----\u7528\u6237\u5386\u53F2\u6301\u6709MB\u4FDD\u5355\u6570
	,count(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then a.policy_no end) as cur_mb_policy_cnt----\u5F53\u524D\u5728\u4FDDMB\u4FDD\u5355\u6570
	,count(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_jj_policy_cnt----\u7528\u6237\u5386\u53F2\u6301\u6709JJ\u4FDD\u5355\u6570
	,count(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then a.policy_no end) as cur_jj_policy_cnt----\u5F53\u524D\u5728\u4FDDJJ\u4FDD\u5355\u6570
	,max(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date then b.max_installment end) as max_his_mb_installment----\u5386\u53F2\u6240\u6709MB\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570
	,max(distinct case when a.product_form = 'MB' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then b.max_installment end) as max_cur_mb_installment----\u5F53\u524D\u5728\u4FDDMB\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570
	,max(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date then b.max_installment end) as max_his_jj_installment----\u5386\u53F2\u6240\u6709JJ\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570
	,max(distinct case when a.product_form = 'JJ' and a.issue_date < a.loan_apply_date and (a.cancel_date > a.loan_apply_date
		or (a.cancel_date is null and a.loan_apply_date <= a.expiry_date)) then b.max_installment end) as max_cur_jj_installment----\u5F53\u524D\u5728\u4FDDJJ\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570

	,count(distinct case when a.product_form = 'MB' and a.is_renewal_order = 'Y' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_mb_renewal_cnt----\u7528\u6237\u5386\u53F2MB\u7EED\u4FDD\u6210\u529F\u6B21\u6570
	,count(distinct case when a.product_form = 'JJ' and a.is_renewal_order = 'Y' and a.issue_date < a.loan_apply_date then a.policy_no end) as his_jj_renewal_cnt----\u7528\u6237\u5386\u53F2JJ\u7EED\u4FDD\u6210\u529F\u6B21\u6570
	from bx_info_base a
	left join
	(
		select a.policy_no --\u4FDD\u5355\u53F7
		,b.user_id
		,count(distinct a.installment_no) as max_installment --\u6700\u957F\u7EED\u671F\u671F\u6570
		from
		(
			select policy_no
			,channel_confirm_date
			,installment_no
			from za_jr_prd.adm_fin_policy_renewal_ds --\u7EED\u671F\u8868
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
select a.user_id  -- \u7528\u6237id
,a.certi_no  -- \u8EAB\u4EFD\u8BC1\u53F7
,a.phone_no  -- \u6CE8\u518C\u624B\u673A\u53F7
,a.gender -- \u6027\u522B
,a.birth  -- \u51FA\u751F\u65E5\u671F
,a.cur_age  -- \u5F53\u524D\u5E74\u9F84
,case when d.city rlike '\u4E07\u5DDE' then '\u91CD\u5E86'
	when d.city rlike '\u6C5F\u6C49' then '\u6B66\u6C49'
	when d.city rlike '\u5317\u4EAC|\u4E0A\u6D77|\u5E7F\u5DDE|\u6DF1\u5733|\u676D\u5DDE|\u82CF\u5DDE|\u6210\u90FD|\u6B66\u6C49|\u5929\u6D25|\u5357\u4EAC|\u91CD\u5E86|\u957F\u6C99|\u9752\u5C9B|\u65E0\u9521|\u5927\u8FDE|\u5B81\u6CE2|\u6D4E\u5357|\u4F5B\u5C71|\u798F\u5DDE|\u5357\u901A|\u70DF\u53F0|\u5408\u80A5|\u5E38\u5DDE|\u4E1C\u839E|\u6606\u660E|\u957F\u6625|\u592A\u539F|\u90D1\u5DDE|\u897F\u5B89|\u6C88\u9633' then substr(city,1,2)
else '\u5176\u4ED6' end as city  -- \u5F52\u5C5E\u57CE\u5E02(gps_city > phone_city > certi_city)
,case when d.province rlike '\u5185\u8499\u53E4' then '\u5185\u8499\u53E4'
	when d.province rlike '\u9ED1\u9F99\u6C5F' then '\u9ED1\u9F99\u6C5F'
	when d.province rlike '\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD' then '\u672A\u89E3\u6790'
else substr(province,1,2) end as province  -- \u5F52\u5C5E\u7701\u4EFD(gps_city > phone_city > certi_city)
,case when d.city rlike '\u5317\u4EAC|\u4E0A\u6D77|\u5E7F\u5DDE|\u6DF1\u5733|\u676D\u5DDE|\u82CF\u5DDE|\u6210\u90FD|\u6B66\u6C49|\u6C5F\u6C49|\u5929\u6D25|\u5357\u4EAC' then '01\u4E00\u7EBF\u57CE\u5E02'
	when d.city rlike '\u91CD\u5E86|\u4E07\u5DDE|\u957F\u6C99|\u9752\u5C9B|\u65E0\u9521|\u5927\u8FDE|\u5B81\u6CE2|\u6D4E\u5357|\u4F5B\u5C71|\u798F\u5DDE|\u5357\u901A|\u70DF\u53F0|\u5408\u80A5|\u5E38\u5DDE|\u4E1C\u839E|\u6606\u660E|\u957F\u6625|\u592A\u539F|\u90D1\u5DDE|\u897F\u5B89|\u6C88\u9633' then '02\u4E8C\u7EBF\u57CE\u5E02'
	when d.city rlike '\u53A6\u95E8|\u7ECD\u5174|\u5357\u660C|\u6E29\u5DDE|\u5510\u5C71|\u6F4D\u574A|\u5F90\u5DDE|\u54C8\u5C14\u6EE8|\u5609\u5174|\u8D35\u9633|\u6DC4\u535A|\u53F0\u5DDE|\u626C\u5DDE|\u9102\u5C14\u591A\u65AF|\u73E0\u6D77|\u91D1\u534E|\u4E1C\u8425|\u4E4C\u9C81\u6728\u9F50|\u547C\u548C\u6D69\u7279|\u5A01\u6D77' then '02\u4E8C\u7EBF\u57CE\u5E02'
	when d.city rlike '\u77F3\u5BB6\u5E84|\u6CC9\u5DDE|\u76D0\u57CE|\u4E2D\u5C71|\u6CF0\u5DDE|\u9547\u6C5F|\u6D4E\u5B81|\u6D1B\u9633|\u5ECA\u574A|\u5170\u5DDE|\u6CF0\u5B89|\u5B9C\u660C|\u8944\u9633|\u60E0\u5DDE|\u829C\u6E56|\u6E56\u5DDE|\u4FDD\u5B9A|\u5305\u5934|\u682A\u6D32|\u4E34\u6C82|\u6CA7\u5DDE|\u6DEE\u5B89|\u6C5F\u95E8|\u6986\u6797|\u5927\u5E86' then '03\u4E09\u7EBF\u57CE\u5E02'
	when d.city rlike '\u90AF\u90F8|\u804A\u57CE|\u6F33\u5DDE|\u5FB7\u5DDE|\u4E5D\u6C5F|\u5CB3\u9633|\u6EE8\u5DDE|\u8D63\u5DDE|\u5E38\u5FB7|\u8FDE\u4E91\u6E2F|\u8861\u9633|\u9075\u4E49|\u54B8\u9633|\u65B0\u4E61|\u8BB8\u660C|\u5BBF\u8FC1|\u83CF\u6CFD|\u5357\u9633|\u67A3\u5E84|\u6C55\u5934|\u6E5B\u6C5F' then '03\u4E09\u7EBF\u57CE\u5E02'
	when d.city rlike '\u5357\u5B81|\u67F3\u5DDE|\u8302\u540D|\u5468\u53E3|\u6D77\u53E3|\u94F6\u5DDD|\u897F\u5B81|\u6606\u5C71|\u6C5F\u9634|\u5F20\u5BB6\u6E2F|\u4E49\u4E4C|\u5409\u6797|\u978D\u5C71|\u5B9D\u9E21|\u7EF5\u9633|\u901A\u8FBD|\u677E\u539F|\u5B89\u9633|\u7126\u4F5C|\u8D64\u5CF0|\u90A2\u53F0|\u90F4\u5DDE|\u5E73\u9876\u5C71|\u6842\u6797|\u8087\u5E86|\u66F2\u9756' then '04\u56DB\u7EBF\u57CE\u5E02'
	when d.city rlike '\u5546\u4E18|\u4FE1\u9633|\u9A7B\u9A6C\u5E97|\u8425\u53E3|\u63ED\u9633|\u9F99\u5CA9|\u5B89\u5E86|\u65E5\u7167|\u4E09\u660E|\u547C\u4F26\u8D1D\u5C14|\u957F\u6CBB|\u6E58\u6F6D|\u5FB7\u9633|\u5357\u5145|\u4E50\u5C71|\u8FBE\u5DDE|\u76D8\u9526|\u5EF6\u5B89' then '04\u56DB\u7EBF\u57CE\u5E02'
	when d.city rlike '\u4E0A\u9976|\u9526\u5DDE|\u5B9C\u6625|\u5B9C\u5BBE|\u5F20\u5BB6\u53E3|\u9A6C\u978D\u5C71|\u5415\u6881|\u629A\u987A|\u4E34\u6C7E|\u6E2D\u5357|\u5F00\u5C01|\u8386\u7530|\u8346\u5DDE|\u9EC4\u5188|\u56DB\u5E73|\u627F\u5FB7|\u9F50\u9F50\u54C8\u5C14|\u4E09\u95E8\u5CE1|\u79E6\u7687\u5C9B|\u672C\u6EAA' then '04\u56DB\u7EBF\u57CE\u5E02'
	when d.city rlike '\u7389\u6797|\u5B5D\u611F|\u7261\u4E39\u6C5F|\u8346\u95E8|\u5B81\u5FB7|\u8FD0\u57CE|\u7EE5\u5316|\u6C38\u5DDE|\u6000\u5316|\u9EC4\u77F3|\u6CF8\u5DDE|\u6E05\u8FDC|\u90B5\u9633|\u8861\u6C34|\u76CA\u9633|\u4E39\u4E1C|\u94C1\u5CAD|\u664B\u57CE|\u6714\u5DDE|\u5409\u5B89|\u5A04\u5E95|\u7389\u6EAA' then '04\u56DB\u7EBF\u57CE\u5E02'
	when d.city rlike '\u8FBD\u9633|\u5357\u5E73|\u6FEE\u9633|\u664B\u4E2D|\u8D44\u9633|\u90FD\u6C5F\u5830|\u6500\u679D\u82B1|\u8862\u5DDE|\u5185\u6C5F|\u6EC1\u5DDE|\u961C\u9633|\u5341\u5830|\u5927\u540C|\u671D\u9633|\u516D\u5B89|\u5BBF\u5DDE|\u901A\u5316|\u868C\u57E0|\u97F6\u5173|\u4E3D\u6C34|\u81EA\u8D21|\u9633\u6C5F|\u6BD5\u8282' then '04\u56DB\u7EBF\u57CE\u5E02'
	when d.city is null or city rlike '\u56DB\u5DDD\u7701|\u76F4\u8F96\u884C\u653F\u5355\u4F4D|\u5E7F\u4E1C\u7701|\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212|\u6D77\u5357\u7701|\u76F4\u8F96\u884C\u653F\u5355\u4F4D|\u4E91\u5357\u7701|\u6D77\u5357\u884C\u653F\u533A|\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A|\u8D35\u5DDE\u7701|\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212' then '99\u89E3\u6790\u5F02\u5E38'
else '05\u4E94\u7EBF\u57CE\u5E02' end as city_level  -- \u57CE\u5E02\u7B49\u7EA7
,case when pp.ca_id is not null then 1 else 0 end as is_cancel  -- \u662F\u5426\u5DF2\u6CE8\u9500
,pp.gmt_modified as cancel_time  -- \u6CE8\u9500\u65F6\u95F4
,d.mp_manufacturer_flag  -- \u5BA2\u6237\u6240\u7528\u624B\u673A\u5BF9\u5E94\u7684\u5382\u5546
,'' as mp_manufacturer  -- \u8BBE\u5907\u4FE1\u606F,\u8BE5\u53D8\u91CF\u4F5C\u5E9F

,b.channel_final  -- \u6E20\u9053\u7C7B\u578B_\u6FC0\u6D3B>\u5F52\u56E0>\u6CE8\u518C
,b.spread_way_final  -- \u4E00\u7EA7\u6E20\u9053\uFF08\u6E20\u9053\u5B50\u7C7B\u578B\uFF09_\u6FC0\u6D3B>\u5F52\u56E0>\u6CE8\u518C
,b.channel_type_final  -- \u4E8C\u7EA7\u6E20\u9053\uFF08\u6E20\u9053\u540D\u79F0\uFF09_\u6FC0\u6D3B>\u5F52\u56E0>\u6CE8\u518C
,b.register_name_final  -- \u4E09\u7EA7\u6E20\u9053\uFF08\u5B50\u6E20\u9053\u540D\u79F0\uFF09_\u6FC0\u6D3B>\u5F52\u56E0>\u6CE8\u518C
,b.register_source_final  -- \u5B50\u6E20\u9053\u7F16\u7801_\u6FC0\u6D3B>\u5F52\u56E0>\u6CE8\u518C
,p.pboc2_edu_level  -- \u5B66\u5386
,p.pboc2_employer_seg  -- \u5C31\u4E1A\u7C7B\u578B
,p.pboc2_industry  -- \u884C\u4E1A\u4FE1\u606F
,p.pboc2_marital_state  -- \u5A5A\u59FB\u72B6\u6001
,p.pboc2_occupation  -- \u804C\u4E1A\u4FE1\u606F

,a2.credit_operate_flag  -- \u662F\u5426\u989D\u5EA6\u5E73\u79FB
,a.register_time  -- \u6CE8\u518C\u65F6\u95F4
,l.fst_login_time  -- \u9996\u6B21\u767B\u5F55APP\u65F6\u95F4
,l.lst_login_time  -- \u6700\u8FD1\u4E00\u6B21\u767B\u5F55APP\u65F6\u95F4

,a.is_apply  -- \u662F\u5426\u5B8C\u7533
,a.fst_apply_time  -- \u9996\u6B21\u5B8C\u7533\u65F6\u95F4
,a2.loan_apply_date as lst_apply_time  -- \u6700\u8FD1\u4E00\u6B21\u5B8C\u7533\u65F6\u95F4
,a2.user_back_flag  -- \u662F\u5426\u56DE\u635E\u5BA2\u7FA4 1\u662F 0\u5426
,a2.is_mid_back  -- \u662F\u5426\u4E2D\u6536\u56DE\u635E 1\u662F 0\u5426
,a2.is_reapply  -- \u662F\u5426\u53D1\u8D77\u62D2\u4FE1\u91CD\u7533 1\u662F 0\u5426
,a.is_credit  -- \u662F\u5426\u6388\u4FE1
,coalesce(a2.flow_score_v2,'\u7A7A') as flow_score_v2  -- \u6D41\u91CF\u8BC4\u5206v2
,coalesce(a2.cscore_level,'\u7A7A') as cscore_level  -- \u6388\u4FE1\u8BC4\u5206

,c.operations_code  -- \u8D37\u4E2D\u98CE\u9669\u5206\u5C42
,a.cur_left_principal  -- \u5728\u8D37\u4F59\u989D
,a.is_inloan  -- \u662F\u5426\u5728\u8D37
,a.his_overdue_days  -- \u5386\u53F2\u6700\u5927\u903E\u671F\u5929\u6570
,a.cur_overdue_days  -- \u5F53\u524D\u6700\u5927\u903E\u671F\u5929\u6570
,a.fst_withdraw_date  -- \u9996\u6B21\u653E\u6B3E\u65F6\u95F4
,a.fst_loan_date  -- \u9996\u6B21\u52A8\u652F\u65F6\u95F4
,hc.max_hc_time as lst_loan_reject_time  -- \u6700\u8FD1\u4E00\u6B21\u8D37\u4E2D\u4E92\u65A5\u65F6\u95F4
,hc.min_hc_time as fst_loan_reject_time  -- \u9996\u6B21\u8D37\u4E2D\u4E92\u65A5\u65F6\u95F4

,a.lst_loan_date  -- \u6700\u8FD1\u4E00\u6B21\u52A8\u652F\u65F6\u95F4
,a.lst_withdraw_date  -- \u6700\u8FD1\u4E00\u6B21\u653E\u6B3E\u65F6\u95F4
,rp.lst_repayment_date  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u65F6\u95F4
,a.loan_cnt  -- \u7D2F\u8BA1\u501F\u6B3E\u7B14\u6570
,a2.apply_age as lst_apply_age  -- \u6700\u8FD1\u4E00\u6B21\u5B8C\u7533\u65F6\u70B9\u5E74\u9F84
,a.credit_apply_time  -- \u6388\u4FE1\u7533\u8BF7\u65F6\u95F4
,a.credit_apply_no  -- \u6388\u4FE1\u901A\u8FC7\u7F16\u53F7
,a.credit_approve_time  -- \u6388\u4FE1\u901A\u8FC7\u65F6\u95F4
,a.origin_credit_level  -- \u539F\u59CB\u6388\u4FE1\u7B49\u7EA7
,a.credit_level  -- \u5F53\u524D\u6388\u4FE1\u7B49\u7EA7
,a.origin_credit_irr_rate_12  -- \u539F\u59CB\u6388\u4FE1\u5B9A\u4EF7
,a.credit_irr_rate_12  -- \u5F53\u524D\u6388\u4FE1\u5B9A\u4EF7
,a.origin_credit_amount  -- \u539F\u59CB\u6388\u4FE1\u989D\u5EA6
,a.credit_amount  -- \u5F53\u524D\u6388\u4FE1\u989D\u5EA6
,a1.is_longterm_control_group  -- \u662F\u5426\u957F\u671F\u5BF9\u7167\u7EC4

,coalesce(a.credit_amount,0) - coalesce(a.cur_left_principal,0) as usable_amt  -- \u5269\u4F59\u53EF\u7528\u989D\u5EA6
,case when cur_age > 54 then '01.54\u5C81\u4EE5\u4E0A'
	when cur_age > 50 then '02.51-54\u5C81'
	when cur_age >= 41 then '03.41-50\u5C81'
	when cur_age >= 31 then '04.31-40\u5C81'
	when cur_age >= 24 then '05.24-30\u5C81'
	when cur_age >= 22 then '06.22-23\u5C81'
	when cur_age >= 18 then '07.18-21\u5C81'
else '08.\u5176\u4ED6' end as cur_age_bin  -- \u5F53\u524D\u5E74\u9F84\u6BB5
,case when a2.apply_age > 54 then '01.54\u5C81\u4EE5\u4E0A'
	when a2.apply_age > 50 then '02.51-54\u5C81'
	when a2.apply_age >= 41 then '03.41-50\u5C81'
	when a2.apply_age >= 31 then '04.31-40\u5C81'
	when a2.apply_age >= 24 then '05.24-30\u5C81'
	when a2.apply_age >= 22 then '06.22-23\u5C81'
	when a2.apply_age >= 18 then '07.18-21\u5C81'
else '08.\u5176\u4ED6' end lst_apply_age_bin  -- \u6700\u8FD1\u4E00\u6B21\u5B8C\u7533\u65F6\u70B9\u5E74\u9F84\u6BB5

,case when flow_score_v2 is null then '\u7A7A' 
	when flow_score_v2 in ('L01','L02') then '01.\u8D85\u4F18'
	when flow_score_v2 in ('L03') then '02.\u4F18\u8D28'
else '03.\u4E00\u822C' end as flow_score_seg_v2  -- \u4F18\u8D28\u5B8C\u7533\u6807\u7B7E_v2
,case when cscore_level is null then '\u7A7A'
	when cscore_level in ('C1','C2','C3','C4') then '01.\u8D85\u4F18'
 else '02.\u4E00\u822C' end as cscore_seg  -- \u8D85\u4F18\u6388\u4FE1\u6807\u7B7E
,case when origin_credit_amount<3000 then '01.(0,3000)'
	when origin_credit_amount<=3000 then '02.(3000,3000]'
	when origin_credit_amount<=5000 then '03.(3000,5000]'
	when origin_credit_amount<=10000 then '04.(5000,10000]'
	when origin_credit_amount<=20000 then '05.(10000,20000]'
	when origin_credit_amount<=30000 then '06.(20000,30000]'
	when origin_credit_amount<=50000 then '07.(30000,50000]'
	when origin_credit_amount>50000 then '08.(50000,+)'
else '99others' end as origin_credit_amount_bin  -- \u539F\u59CB\u6388\u4FE1\u989D\u5EA6\u5206\u7BB1
,case when credit_amount<3000 then '01.(0,3000)'
	when credit_amount<=3000 then '02.(3000,3000]'
	when credit_amount<=5000 then '03.(3000,5000]'
	when credit_amount<=10000 then '04.(5000,10000]'
	when credit_amount<=20000 then '05.(10000,20000]'
	when credit_amount<=30000 then '06.(20000,30000]'
	when credit_amount<=50000 then '07.(30000,50000]'
	when credit_amount>50000 then '08.(50000,+)'
else '99others' end as credit_amount_bin  -- \u5F53\u524D\u6388\u4FE1\u989D\u5EA6\u5206\u7BB1
,case when origin_credit_irr_rate_12 is null or origin_credit_irr_rate_12 <= 0.24 then '(0,24%]'
	when origin_credit_irr_rate_12 > 0.24 then '(24%,36%]'
end origin_credit_irr_bin  -- \u539F\u59CB\u6388\u4FE1\u5B9A\u4EF7\u5206\u7BB1
,case when credit_irr_rate_12 is null or credit_irr_rate_12 <= 0.24 then '(0,24%]'
	when credit_irr_rate_12 > 0.24 then '(24%,36%]'
end credit_irr_bin  -- \u5F53\u524D\u6388\u4FE1\u5B9A\u4EF7\u5206\u7BB1

,datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') as register_period  -- \u6CE8\u518C\u8DDD\u4ECA\u65F6\u957F
,case when datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'mm') = 0 then 1 else 0 end as is_m0_register  -- \u662F\u5426\u5F53\u6708\u6CE8\u518C
,datediff(fst_login_time,a.register_time,'dd') as fst_login_reg_period  -- \u9996\u6B21\u767B\u5F55APP\u8DDD\u6CE8\u518C\u65F6\u957F
,datediff(fst_apply_time,a.register_time,'dd') as fst_apply_reg_period  -- \u9996\u6B21\u5B8C\u7533\u8DDD\u6CE8\u518C\u65F6\u957F

,datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') as credit_period  -- \u6388\u4FE1\u8DDD\u4ECA\u65F6\u957F
,datediff(credit_approve_time,register_time_new,'dd') as credit_reg_period  -- \u6388\u4FE1\u8DDD\u6CE8\u518C\u65F6\u957F
,case when datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') < 90 then 1 else 0 end as is_credit_in_90d  -- \u662F\u5426\u6388\u4FE190\u5929\u5185
,case when datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'mm') = 0 then 1 else 0 end as is_m0_credit  -- \u662F\u5426\u5F53\u6708\u6388\u4FE1
,datediff(fst_loan_date,credit_approve_time,'dd') as fst_loan_cre_period  -- \u9996\u6B21\u52A8\u652F\u8DDD\u6388\u4FE1\u65F6\u957F
,datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') as lst_withdraw_period  -- \u6700\u8FD1\u4E00\u6B21\u653E\u6B3E\u8DDD\u4ECA\u65F6\u957F
,datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') as lst_repayment_period  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u8DDD\u4ECA\u65F6\u957F

,case when is_apply = 0 and datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') < 30 then '\u6CE8\u518C\u672A\u5B8C\u7533(30\u5929\u5185)'
	when is_apply = 0 and datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'dd') >= 30 then '\u6CE8\u518C\u672A\u5B8C\u7533(30\u5929\u4EE5\u4E0A)'
	when is_apply = 1 and is_credit = 0 then '\u6388\u4FE1\u88AB\u62D2'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') < 30 then '\u6388\u4FE1\u672A\u652F\u7528(30\u5929\u5185)'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') >= 30
		and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') <= 90 then '\u6388\u4FE1\u672A\u652F\u7528(30-90\u5929)'
	when is_credit = 1 and fst_loan_date is null and datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'dd') > 90 then '\u6388\u4FE1\u672A\u652F\u7528(90\u5929\u4EE5\u4E0A)'
	when is_credit = 1 and fst_loan_date is not null and loan_cnt = 0 then '\u9996\u501F\u88AB\u62D2'
	when loan_cnt >= 1 and cur_left_principal = 0 and (datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 30 or rp.lst_repayment_date is null) then '\u7ED3\u6E05\u62370-30'
	when loan_cnt >= 1 and cur_left_principal = 0 and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') >= 31
		and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 90 then '\u7ED3\u6E0531-90'
	when loan_cnt >= 1 and cur_left_principal = 0 and  datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') >= 91
		and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') <= 180 then '\u7ED3\u6E0591-180'
	when loan_cnt >= 1 and cur_left_principal = 0 and datediff(to_date('{bizdate}','yyyymmdd'),rp.lst_repayment_date,'dd') > 180 then '\u7ED3\u6E05181+'
	when loan_cnt = 1 and cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 90 then '\u9996\u501F\u5728\u8D37\uFF080-90\uFF09'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 90 then '\u590D\u501F\u5728\u8D37\uFF080-90\uFF09'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') <= 180
		and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') >= 91 then '\u5728\u8D37\u6D41\u5931\u9884\u8B66\uFF0891-180\uFF09'
	when cur_left_principal > 0 and datediff(to_date('{bizdate}','yyyymmdd'),lst_withdraw_date,'dd') >= 181 then '\u5728\u8D37\u6D41\u5931\uFF08181+\uFF09'
end as user_type  -- \u5BA2\u7FA4\u5206\u7C7B

,case when is_apply = 0 then '\u6CE8\u518C\u672A\u5B8C\u7533'
	when is_apply = 1 and is_credit = 0 then '\u6388\u4FE1\u88AB\u62D2'
	when is_credit = 1 and fst_loan_date is null then '\u6388\u4FE1\u672A\u652F\u7528'
	when is_credit = 1 and fst_loan_date is not null and loan_cnt = 0 then '\u9996\u501F\u88AB\u62D2'
	when loan_cnt >= 1 and cur_left_principal = 0 then '\u7ED3\u6E05'
	when cur_left_principal > 0 then '\u5728\u8D37'
end as user_kind  -- \u5BA2\u7FA4\u5927\u7C7B

,greatest(sms.lst_sms_time,rg.lst_phone_time,ai.lst_ivr_time) as lst_mkt_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37\u8425\u9500\u65F6\u95F4
,greatest(sms.lst_sms_suc_time,rg.lst_phone_suc_time,ai.lst_ivr_suc_time) as lst_mkt_suc_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37\u8425\u9500\u89E6\u8FBE\u65F6\u95F4
,sms.lst_sms_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37\u77ED\u4FE1\u53D1\u9001\u65F6\u95F4
,sms.lst_sms_suc_time  -- \u6700\u8FD1\u4E00\u6B21\u8425\u9500\u77ED\u4FE1\u89E6\u8FBE\u65F6\u95F4
,rg.lst_phone_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37\u7535\u9500\u62E8\u6253\u65F6\u95F4
,rg.lst_phone_suc_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37\u7535\u9500\u63A5\u901A\u65F6\u95F4
,ai.lst_ivr_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37IVR\u62E8\u6253\u65F6\u95F4
,ai.lst_ivr_suc_time  -- \u6700\u8FD1\u4E00\u6B21\u4FE1\u8D37IVR\u63A5\u901A\u65F6\u95F4
,coalesce(sms.sms_cnt_30d,0) + coalesce(rg.phone_cnt_30d,0) + coalesce(ai.ivr_cnt_30d,0) as mkt_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u8425\u9500\u6B21\u6570
,coalesce(sms.sms_suc_cnt_30d,0) + coalesce(rg.phone_suc_cnt_30d,0) + coalesce(ai.ivr_suc_cnt_30d,0) as mkt_suc_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u8425\u9500\u89E6\u8FBE\u6B21\u6570
,sms.sms_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u8425\u9500\u77ED\u4FE1\u53D1\u9001\u6B21\u6570
,sms.sms_suc_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u8425\u9500\u77ED\u4FE1\u89E6\u8FBE\u6B21\u6570
,rg.phone_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u7535\u9500\u62E8\u6253\u6B21\u6570
,rg.phone_suc_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37\u7535\u9500\u63A5\u901A\u6B21\u6570
,rg.phone_time_length_30d  -- \u8FD130\u5929\u4FE1\u8D37\u7535\u9500\u901A\u8BDD\u65F6\u957F
,ai.ivr_cnt_30d  -- \u8FD130\u5929i\u4FE1\u8D37vr\u62E8\u6253\u6B21\u6570
,ai.ivr_suc_cnt_30d  -- \u8FD130\u5929\u4FE1\u8D37ivr\u63A5\u901A\u6B21\u6570
,ai.ivr_time_length_30d  -- \u8FD130\u5929\u4FE1\u8D37ivr\u901A\u8BDD\u65F6\u957F

,rp.left_balance  -- \u5728\u8D37\u4F59\u989D
,rp.cur_due_pricipal  -- \u5F53\u524D\u5E94\u8FD8\u672C\u91D1
,rp.left_balance_endday  -- \u5728\u8D37\u4F59\u989D(\u5DF2\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E&\u501F\u6B3E)
,rp.cur_due_pricipal_endday  -- \u5F53\u524D\u5E94\u8FD8\u672C\u91D1(\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E&\u501F\u6B3E)
,a.fst_loan_inner_no  -- \u9996\u501F\u501F\u636E\u53F7
,a.fst_loan_repayment_day  -- \u9996\u501F\u8D26\u5355\u65E5
,e.most_freq_loan_repayment_day  -- \u6700\u5E38\u7528\u8D26\u5355\u65E5
,a.total_loan_num  -- \u5386\u53F2\u7D2F\u8BA1\u501F\u6B3E\u7B14\u6570(\u4E0D\u8BA1\u5165\u5F53\u5929\u501F\u6B3E)
,a.total_loan_num_endday  -- \u5386\u53F2\u7D2F\u8BA1\u501F\u6B3E\u7B14\u6570(\u8BA1\u5165\u5F53\u5929\u501F\u6B3E)
,a.total_settled_loan_num  -- \u5F53\u524D\u5DF2\u7ED3\u6E05\u501F\u636E\u6570(\u4E0D\u8BA1\u5165\u5F53\u5929\u7ED3\u6E05)
,a.total_settled_loan_num_endday  -- \u5F53\u524D\u5DF2\u7ED3\u6E05\u501F\u636E\u6570(\u8BA1\u5165\u5F53\u5929\u7ED3\u6E05)
,rp.total_repayment_num  -- \u5386\u53F2\u7D2F\u8BA1\u8FD8\u6B3E\u6B21\u6570(\u4E0D\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)
,rp.total_repayment_num_endday  -- \u5386\u53F2\u7D2F\u8BA1\u8FD8\u6B3E\u6B21\u6570(\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)
,rp.lst_repay_date  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u65F6\u95F4(\u4E0D\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)
,rp.lst_repay_date_endday  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u65F6\u95F4(\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)

,a.activation_time  -- \u6FC0\u6D3B\u65F6\u95F4
,a.register_time_new  -- \u6FC0\u6D3B\u540E\u7684\u6CE8\u518C\u65F6\u95F4
,b.regi_channel  -- \u4E00\u7EA7\u6E20\u9053\uFF08\u6E20\u9053\u7C7B\u578B\uFF09_\u4EC5\u6CE8\u518C
,b.regi_spread_way  -- \u4E8C\u7EA7\u6E20\u9053\uFF08\u6E20\u9053\u5B50\u7C7B\u578B\uFF09_\u4EC5\u6CE8\u518C
,b.regi_channel_type  -- \u4E09\u7EA7\u6E20\u9053\uFF08\u6E20\u9053\u540D\u79F0\uFF09_\u4EC5\u6CE8\u518C
,b.regi_register_name  -- \u56DB\u7EA7\u6E20\u9053\uFF08\u5B50\u6E20\u9053\u540D\u79F0\uFF09_\u4EC5\u6CE8\u518C
,b.regi_register_source  -- \u5B50\u6E20\u9053\u7F16\u7801_\u4EC5\u6CE8\u518C
,c.operations_code_v3  -- \u8D37\u4E2D\u98CE\u9669\u5206\u5C42v3
,a2.pboc_v9_credit_apply_lvl  -- \u4EBA\u884C\u5206V9\u6388\u4FE1\u7B49\u7EA7
,a2.credit_acard_lvl  -- \u65B0\u6237\u98CE\u9669\u6388\u4FE1\u5206
,case when a2.v54_score is null then '\u7A7A'
	when a2.v54_score >= 560 then '01.\u8D85\u4F18'
	when a2.v54_score >= 500 then '02.\u4F18\u8D28'
else '03.\u4E00\u822C' end as flow_score_seg_v2_1  -- \u4F18\u8D28\u5B8C\u7533\u6807\u7B7E_v2.1
,a2.v54_score  -- \u6D41\u91CF\u5206v2
,br.bairong_score  -- \u767E\u878D\u5206
,br.bairong_score_range  -- \u767E\u878D\u5206\u533A\u95F4
,a2.loan_apply_no  -- \u6700\u8FD1\u4E00\u6B21\u6388\u4FE1\u7533\u8BF7\u7F16\u53F7
,bc.approve_type  -- \u5B8C\u7533\u6D41\u7A0B(\u6700\u8FD1\u4E00\u6B21\u5B8C\u7533)
,d.bind_type  -- \u7ED1\u5361\u65B9\u5F0F
,d.ocr_type  -- \u5B9E\u540DOCR\u65B9\u5F0F

,datediff(to_date('{bizdate}','yyyymmdd'),register_time_new,'mm') as register_mob  -- \u6CE8\u518Cmob
,datediff(to_date('{bizdate}','yyyymmdd'),credit_approve_time,'mm') as credit_mob  -- \u6388\u4FE1mob
,datediff(to_date('{bizdate}','yyyymmdd'),fst_withdraw_date,'mm') as fst_withdraw_mob  -- \u9996\u501Fmob

,hc.gmt_created_max as lst_loan_tj_time  -- \u6700\u8FD1\u4E00\u6B21\u63D0\u4EA4\u501F\u6B3E\u7533\u8BF7\u65F6\u95F4
,hc.gmt_created_min as fst_loan_tj_time  -- \u9996\u6B21\u63D0\u4EA4\u501F\u6B3E\u7533\u8BF7\u65F6\u95F4

,ps.is_high_quality_pboc_score  -- \u5F81\u4FE1\u5206\u8865\u5145\u4F18\u8D28\u6237\u6807\u7B7E\uFF08\u672A\u4EA4\u53C9\u98CE\u9669\u5206\u5C42\uFF09

,bx.his_mb_policy_cnt----\u7528\u6237\u5386\u53F2\u6301\u6709MB\u4FDD\u5355\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.cur_mb_policy_cnt----\u5F53\u524D\u5728\u4FDDMB\u4FDD\u5355\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.his_jj_policy_cnt----\u7528\u6237\u5386\u53F2\u6301\u6709JJ\u4FDD\u5355\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.cur_jj_policy_cnt----\u5F53\u524D\u5728\u4FDDJJ\u4FDD\u5355\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.max_his_mb_installment----\u5386\u53F2\u6240\u6709MB\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.max_cur_mb_installment----\u5F53\u524D\u5728\u4FDDMB\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.max_his_jj_installment----\u5386\u53F2\u6240\u6709JJ\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.max_cur_jj_installment----\u5F53\u524D\u5728\u4FDDJJ\u4FDD\u5355\u6700\u957F\u7EED\u671F\u671F\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.his_mb_renewal_cnt----\u7528\u6237\u5386\u53F2MB\u7EED\u4FDD\u6210\u529F\u6B21\u6570_\u6388\u4FE1\u65F6\u70B9
,bx.his_jj_renewal_cnt----\u7528\u6237\u5386\u53F2JJ\u7EED\u4FDD\u6210\u529F\u6B21\u6570_\u6388\u4FE1\u65F6\u70B9

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
else 'T10' end as xinhu_score_level  -- \u65B0\u6237\u610F\u613F\u5206\uFF08\u6388\u4FE10-30\uFF09
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
else 'T10' end as cl_score_level  -- \u5B58\u91CF\u610F\u613F\u5206\uFF08\u6388\u4FE130-90\uFF09
,concat(loan_card_reg,',',p.pboc_bad_out,',',p.card_overdue_level,',',p.loan_overdue_level) as loan_card_reg
------from songhonghui 20240523
,datediff(fst_loan_date,register_time_new,'dd') as fst_loan_reg_period  -- \u9996\u6B21\u52A8\u652F\u8DDD\u6CE8\u518C\u65F6\u957F
,datediff(fst_withdraw_date,register_time_new,'dd') as fst_withdraw_reg_period  -- \u9996\u501F\u8DDD\u6CE8\u518C\u65F6\u957F
,datediff(fst_withdraw_date,credit_approve_time,'dd') as fst_withdraw_cre_period  -- \u9996\u501F\u8DDD\u6388\u4FE1\u65F6\u957F
,datediff(fst_apply_time,register_time_new,'mm') as fst_apply_reg_mob----\u9996\u6B21\u7533\u8BF7\u8DDD\u79BB\u6CE8\u518CMOB 
,datediff(fst_withdraw_date,register_time_new,'mm') as fst_withdraw_reg_mob---\u9996\u501F\u8DDD\u79BB\u6CE8\u518CMOB
,datediff(fst_withdraw_date,fst_apply_time,'mm') as fst_withdraw_credit_mob---\u9996\u501F\u8DDD\u79BB\u6388\u4FE1MOB
,case when fst_withdraw_date is not null then fst_withdraw_amount else 0 end as fst_withdraw_amount-- \u9996\u501F\u91D1\u989D
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
,a.loan_amt----\u5386\u53F2\u7D2F\u8BA1\u653E\u6B3E\u91D1\u989D
,d.apply_platform
,d.ip_province
,b.utm_source_category_name-----from songhonghui 20241008\u6E20\u9053\u7EC6\u7C7B\u540D\u79F0
,b.channel_regroup-----from lilele 20241010\u6E20\u9053\u5F52\u62E2
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

	,max(case when first_loan_flag = 1 then loan_inner_no end) as fst_loan_inner_no  -- \u9996\u501F\u501F\u636E\u53F7
	,max(case when first_loan_flag = 1 then day(lst_agreed_repay_date) end) as fst_loan_repayment_day  -- \u9996\u501F\u8D26\u5355\u65E5
	,max(case when first_loan_flag = 1 then withdraw_amount end) as fst_withdraw_amount  -- \u9996\u501F\u91D1\u989D
	,count(distinct case when substr(withdraw_date,1,10) <> '{bizdate,yyyy-MM-dd}' then loan_inner_no end) as total_loan_num  -- \u5386\u53F2\u7D2F\u8BA1\u501F\u6B3E\u7B14\u6570(\u4E0D\u8BA1\u5165\u5F53\u5929\u501F\u6B3E)
	,count(distinct loan_inner_no) as total_loan_num_endday  -- \u5386\u53F2\u7D2F\u8BA1\u501F\u6B3E\u7B14\u6570(\u8BA1\u5165\u5F53\u5929\u501F\u6B3E)
	,count(distinct case when loan_settle_time is not null and substr(loan_settle_time,1,10) <> '{bizdate,yyyy-MM-dd}' then loan_inner_no end) as total_settled_loan_num  -- \u5386\u53F2\u7D2F\u8BA1\u7ED3\u6E05\u501F\u636E\u6570(\u4E0D\u8BA1\u5165\u5F53\u5929\u7ED3\u6E05)
	,count(distinct case when loan_settle_time is not null then loan_inner_no end) as total_settled_loan_num_endday  -- \u5386\u53F2\u7D2F\u8BA1\u7ED3\u6E05\u501F\u636E\u6570(\u8BA1\u5165\u5F53\u5929\u7ED3\u6E05)			
	,sum(case when loan_status = 1 then withdraw_amount end) as loan_amt----\u5386\u53F2\u7D2F\u8BA1\u653E\u6B3E\u91D1\u989D
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
(  -- \u662F\u5426\u5BF9\u7167\u7EC4
	select user_id,max(is_longterm_control_group) as is_longterm_control_group
	from za_jr_prd.adm_fin_imp_user_tag_user_info_ds
	where pt = '{bizdate}000000'
	and product_code = 'JDZAD'
	group by user_id
) a1
on a.user_id = a1.user_id
left join
(  -- \u6700\u8FD1\u4E00\u6B21\u5B8C\u7533
	select user_id
	,loan_apply_no
	,loan_apply_date
	,datediff(loan_apply_date,get_idcard_birthday(certi_no),'yyyy') as apply_age
	,user_back_flag
	,is_mid_back
	,is_reapply
	,case when is_cdp_reapply = 1 then '\u5B58\u91CF\u53EF\u91CD\u5BA1'
		when is_admit_reapply = 1 then '\u65B0\u589E\u53EF\u91CD\u7533'
	else '\u4E0D\u5141\u8BB8\u91CD\u5BA1' end as is_can_reapply
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
(  -- \u6CE8\u9500\u8BB0\u5F55
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
	and sub_biz_type = 'CL'  -- \u73B0\u91D1\u8D37
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
	,pboc2_industry----\u6700\u65B0\u884C\u4E1A
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
(  -- \u767E\u878D\u5206
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
	,case when is_card_back = 0 and is_ocr_back = 1 then '4.\u53CC\u540E\u7F6E'
		when is_ocr_back = 1 and is_card_back != 0 then '3.OCR\u540E\u7F6E'
		when is_card_back = 0 and is_ocr_back != 1 then '2.\u7ED1\u5361\u540E\u7F6E'
	else '1.\u5168\u6D41\u7A0B' end as approve_type
	from
	(
		select apply_no as apply_no_bysrc
		,get_json_object(unCompress(biz_data),'$.is_ocr_houzhi_test_flag') as is_ocr_back	--ocr\u540E\u7F6E\u7684\u6807\u8BC6
		,get_json_object(unCompress(biz_data),'$.credit_is_bind_card') as is_card_back	--\u7ED1\u5361\u540E\u7F6E\u7684\u6807\u8BC6
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
	and mkt_level1 in ('\u4FE1\u8D37')
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
	and data_source = '\u91D1\u878D'
	and to_char(send_time,'yyyymmdd') <= '{bizdate}'
	and mkt_level1 in ('\u4FE1\u8D37')
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
	and data_source = '\u91D1\u878D'
	and to_char(send_time,'yyyymmdd') <= '{bizdate}'
	and mkt_level1 in ('\u4FE1\u8D37')
	and (product_code = 'JDZAD' or task_code in ('fcp_1607002','1047'))
	group by user_id
) sms
on a.user_id = sms.user_id
left join
(
	select user_id
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) = 0 then due_principal  -- \u4E0D\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E
			when datediff('{bizdate,yyyy-MM-dd}',substr(withdraw_date,1,10)) > 0 then cur_left_pricipal  -- \u4E0D\u8BA1\u5165\u5F53\u5929\u501F\u6B3E
		else 0 end) as left_balance  -- \u5728\u8D37\u4F59\u989D(\u672A\u51CF\u53BB\u5F53\u5929\u8FD8\u6B3E&\u501F\u6B3E)  
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) = 0 then due_principal
			when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) > 0 then cur_left_pricipal else 0 end) as cur_due_pricipal  -- \u5F53\u524D\u5E94\u8FD8\u6B3E\u989D(\u672A\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)
	,nvl(sum(cur_left_pricipal),0) as left_balance_endday
	,sum(case when datediff('{bizdate,yyyy-MM-dd}',substr(agreed_repay_date,1,10)) >= 0 then cur_left_pricipal else 0 end) as cur_due_pricipal_endday
	,sum(case when actual_repayment_time is not null and substr(actual_repayment_time,1,10) <> '{bizdate,yyyy-MM-dd}' then 1 else 0 end) as total_repayment_num  -- \u5386\u53F2\u7D2F\u8BA1\u8FD8\u6B3E\u6B21\u6570
	,sum(case when actual_repayment_time is not null then 1 else 0 end) as total_repayment_num_endday  -- \u5386\u53F2\u7D2F\u8BA1\u8FD8\u6B3E\u6B21\u6570
	,max(actual_repayment_time) as lst_repayment_date
	,max(case when substr(actual_repayment_time,1,10) <> '{bizdate,yyyy-MM-dd}' then actual_repayment_time end) as lst_repay_date  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u65F6\u95F4(\u4E0D\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)
	,max(actual_repayment_time) as lst_repay_date_endday  -- \u6700\u8FD1\u4E00\u6B21\u8FD8\u6B3E\u65F6\u95F4(\u8BA1\u5165\u5F53\u5929\u8FD8\u6B3E)

	from za_jr_prd.cdm_fin_repayment_plan
	where pt = '{bizdate,yyyyMMdd}000000'
	and product_id = '1510006902'
	group by user_id
) rp
on a.user_id = rp.user_id
left join
(  -- e\u8868:\u5386\u53F2\u6700\u5E38\u7528\u8D26\u5355\u65E5
	select user_id
	,repayment_day as most_freq_loan_repayment_day  -- \u6700\u5E38\u7528\u8D26\u5355\u65E5
	,row_number() over(partition by user_id order by repayment_day_cnt desc) as repayment_day_rnk
	from
	(
		select user_id
		,day(lst_agreed_repay_date) as repayment_day  -- \u8D26\u5355\u65E5
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
    ,case when second_score>=800 and last_score>=800 and score>=800 then 1  -- \u8FDE\u7EED\u4E09\u4E2A\u6708800\u5206\u4EE5\u4E0A
        when score>=600 and score-last_score>50 then 1  -- \u672C\u6708\u9AD8\u5206\u4E14\u672C\u6708\u6BD4\u4E0A\u4E2A\u6708\u9AD850\u5206\u4EE5\u4E0A
    else 0 end as is_high_quality_pboc_score
    ,row_number() over(partition by certi_no order by product_date desc) as rk
    from
    (
    	select idnum as certi_no
    	,score
    	,position
    	,to_date(productdate,'yyyy-mm-dd') as product_date  -- \u67E5\u8BE2\u65F6\u95F4
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
--\u5230 user_id \u7C92\u5EA6\u53D6\u7528\u6237\u6700\u65B0\u6388\u4FE1\u6216\u6700\u65B0\u652F\u7528\u65F6\u70B9\u7684\u96C6\u56E2\u4FDD\u9669\u6807\u7B7E\u6570\u636E
left join (select *,  row_number() over(partition by user_id order by biz_date desc) as rn
           from corp_info
          ) corp on corp.user_id=a.user_id and corp.rn=1
;
`,Q=t(64529),x=(0,Q.Ue)(function(){return{highlightWords:[]}}),i=t(85893),ee=["mode","height","width","name","theme","placeholder","value","onChange","disabled"],te=m.forwardRef(function(n){var y=n.mode,h=n.height,E=n.width,B=n.name,C=n.theme,L=n.placeholder,v=n.value,p=n.onChange,_=n.disabled,d=_===void 0?!1:_,o=$()(n,ee),a=(0,m.useRef)(null),s=(0,m.useState)(!1),r=S()(s,2),u=r[0],l=r[1],c=x(function(w){return w.highlightWords}),F=function(){l(!0),setTimeout(function(){l(!1)},3e3)},D=function(Fe){var P,R=(P=a.current)===null||P===void 0?void 0:P.editor;if(R){var g=R.getSession(),N=g.getMarkers();Object.keys(N).forEach(function(j){N[j].clazz==="highlight-marker"&&g.removeMarker(N[j].id)}),Fe.forEach(function(j){for(var fe=g.getValue(),T,Ee=new RegExp(j,"g");(T=Ee.exec(fe))!==null;){var I=g.doc.indexToPosition(T.index,0),W=g.doc.indexToPosition(T.index+j.length,0),De=new K.Range(I.row,I.column,W.row,W.column);g.addMarker(De,"highlight-marker","text")}})}};return(0,m.useEffect)(function(){D(c)},[c]),(0,i.jsxs)("div",{className:"code-editor",children:[(0,i.jsx)("div",{className:"code-editor-tool",children:(0,i.jsxs)(X.Z,{children:[(0,i.jsx)(G.Z,{style:{width:200},defaultValue:"mysql"}),(0,i.jsx)(H.ZP,{loading:u,onClick:F,children:"\u6267\u884C"})]})}),(0,i.jsx)(q.ZP,O()({ref:a,width:"100%",mode:"mysql",theme:"tomorrow",placeholder:"",onChange:p,name:"ace-editor",value:U,editorProps:{$blockScrolling:!0},fontSize:14,showGutter:!0,highlightActiveLine:!0,showPrintMargin:!1,setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,showLineNumbers:!0,showGutter:!0,tabSize:2,useWorker:!1},readOnly:d,debounceChangePeriod:500},o))]})}),ne=t(57135),ae=t(55171),ue=t.n(ae),_e=JSON.parse(`{"source_data":[{"name":"za_ha_prd.ods_ha_claim_application_all","type":"table"},{"name":"za_ha_prd.ods_ha_claim_application_extra_info_all","type":"table"},{"name":"edw_ha_claim_application__loss_code","type":"table"},{"name":"tmp_ha_claim_application__accident_area","type":"table"},{"name":"pub_ha_code_value_dim","type":"table"}],"sql_statements":[{"type":"select","source_tables":[{"name":"za_ha_prd.ods_ha_claim_application_all","alias":"t1"},{"name":"za_ha_prd.ods_ha_claim_application_extra_info_all","alias":"t2"},{"name":"edw_ha_claim_application__loss_code","alias":"t3"},{"name":"tmp_ha_claim_application__accident_area","alias":"t4"},{"name":"pub_ha_code_value_dim","alias":"status"},{"name":"pub_ha_code_value_dim","alias":"case_mark"},{"name":"pub_ha_code_value_dim","alias":"tpa_source"},{"name":"pub_ha_code_value_dim","alias":"source"},{"name":"pub_ha_code_value_dim","alias":"loss_type"},{"name":"pub_ha_code_value_dim","alias":"reporter_insured_relation"},{"name":"pub_ha_code_value_dim","alias":"case_tag"}],"joins":[{"type":"left outer join","table":"t2","on_conditions":["t1.id = t2.claim_application_id","t2.pt = '\${bizdate}000000'","t2.is_deleted = 'N'"]},{"type":"left outer join","table":"t3","on_conditions":["t1.report_no = t3.report_no"],"subquery":{"select":["t1.report_no","wm_concat(',', loss_code_name) loss_code_split"],"from":"edw_ha_claim_application__loss_code t1","where":"t1.pt = '\${bizdate}000000'","group_by":"t1.report_no"}},{"type":"left outer join","table":"t4","on_conditions":["t4.pt = '\${bizdate}000000'","t1.report_no = t4.report_no"]},{"type":"left outer join","table":"status","on_conditions":["t1.status = status.src_key","status.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","status.cl_name = 'status'"]},{"type":"left outer join","table":"case_mark","on_conditions":["t1.case_mark = case_mark.src_key","case_mark.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","case_mark.cl_name = 'case_mark'"]},{"type":"left outer join","table":"tpa_source","on_conditions":["t1.tpa_source = tpa_source.src_key","tpa_source.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","tpa_source.cl_name = 'tpa_source'"]},{"type":"left outer join","table":"source","on_conditions":["t1.source = source.src_key","source.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","source.cl_name = 'source'"]},{"type":"left outer join","table":"loss_type","on_conditions":["coalesce(t1.loss_type, 'illness') = loss_type.src_key","loss_type.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","loss_type.cl_name = 'loss_type'"]},{"type":"left outer join","table":"reporter_insured_relation","on_conditions":["t1.reporter_insured_relation = reporter_insured_relation.src_key","reporter_insured_relation.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","reporter_insured_relation.cl_name = 'reporter_insured_relation'"]},{"type":"left outer join","table":"case_tag","on_conditions":["t1.case_tag = case_tag.src_key","case_tag.tb_name = 'za_ha_prd.ods_ha_claim_application_all'","case_tag.cl_name = 'case_tag'"]}],"lateral_views":[{"view":"json_tuple","expression":"t1.extra_info","fields":["masterInsuredInfo","isNeedClaimDivision","planCodeList","materialSmsSend","customerNo","accidentDate","sysLocMobileNo","syncVersion","claimReturnChannelKey","importDataSource"],"alias":"extra_info"},{"view":"json_tuple","expression":"t2.risk_remark","fields":["riskName","riskDetail","riskResult"],"alias":"risk_remark"}],"select_columns":[{"name":"t1.id"},{"name":"t1.report_no"},{"name":"t1.status"},{"name":"coalesce(status.meta_value, t1.status) status_name"},{"name":"t1.source"},{"name":"coalesce(source.meta_value, t1.source) source_name"},{"name":"t1.archive_no"},{"name":"t1.seppage_path_file_name"},{"name":"t1.channel_application_id"},{"name":"t1.image_no"},{"name":"t1.seppage_path"},{"name":"coalesce(t1.loss_type, 'illness') loss_type"},{"name":"coalesce(loss_type.meta_value, t1.loss_type) loss_type_name"},{"name":"t1.loss_code"},{"name":"t3.loss_code_split loss_code_name"},{"name":"t1.insurance_name"},{"name":"t1.insurance_ceti_no"},{"name":"t1.insurance_ceti_type"},{"name":"t1.accident_date"},{"name":"t1.accident_area"},{"name":"t4.area_name accident_area_name"},{"name":"t1.accident_place"},{"name":"t1.accident_process"},{"name":"t1.reporter"},{"name":"t1.reporter_insured_relation"},{"name":"coalesce(reporter_insured_relation.meta_value, t1.reporter_insured_relation) reporter_insured_relation_name"},{"name":"t1.tel_no"},{"name":"t1.mobile_no"},{"name":"t1.claim_amount"},{"name":"t1.claim_currency"},{"name":"t1.remark"},{"name":"t1.handler"},{"name":"t1.reported_date"},{"name":"t1.death_date"},{"name":"t1.close_date"},{"name":"t1.creator"},{"name":"t1.creator_no"},{"name":"t1.gmt_created"},{"name":"t1.modifier"},{"name":"t1.gmt_modified"},{"name":"t1.extra_info"},{"name":"extra_info.masterInsuredInfo extra_info__masterinsuredinfo"},{"name":"extra_info.isNeedClaimDivision extra_info__isneedclaimdivision"},{"name":"extra_info.planCodeList extra_info__plancodelist"},{"name":"extra_info.materialSmsSend extra_info__materialsmssend"},{"name":"extra_info.customerNo extra_info__customerno"},{"name":"extra_info.accidentDate extra_info__accidentdate"},{"name":"extra_info.sysLocMobileNo extra_info__syslocmobileno"},{"name":"extra_info.syncVersion extra_info__syncversion"},{"name":"extra_info.claimReturnChannelKey extra_info__claimreturnchannelkey"},{"name":"extra_info.importDataSource extra_info__importDataSource"},{"name":"t1.is_deleted"},{"name":"t1.allow_dispatch"},{"name":"t1.istpadispatch"},{"name":"t1.email"},{"name":"(case when t1.gender is null and t1.insurance_ceti_type = 'I' then GET_IDCARD_SEX(t1.insurance_ceti_no) end) gender"},{"name":"(case when t1.birth_day is null and t1.insurance_ceti_type = 'I' then get_idcard_birthday(t1.insurance_ceti_no) end) birth_day"},{"name":"t1.channel_batch_no"},{"name":"t1.channel_report_no"},{"name":"t1.adjustment_date"},{"name":"t1.tpa_source"},{"name":"coalesce(tpa_source.meta_value, t1.tpa_source) tpa_source_name"},{"name":"t1.master_insured_cert_no"},{"name":"t1.master_insured_cert_type"},{"name":"coalesce(t1.is_campaign, '0') is_campaign"},{"name":"t1.diagnosis_date"},{"name":"t1.is_attachment"},{"name":"t1.is_vip"},{"name":"t1.elapsed_time"},{"name":"t1.disallow_batch_close"},{"name":"t1.department"},{"name":"t1.has_potential_missing_policy"},{"name":"t1.potential_missing_policy"},{"name":"t1.lawsuit"},{"name":"t1.has_tried_to_dispatch_tpa"},{"name":"t1.auto_dispatch_status"},{"name":"t1.auto_dispatch_fail_count"},{"name":"t1.error_type"},{"name":"t1.mdp_hospital_name"},{"name":"t1.mdp_hospital_code"},{"name":"t1.mdp_invoice_nos"},{"name":"t1.order_no"},{"name":"t1.claim_date"},{"name":"t1.one_notice_date"},{"name":"t1.material_complete_date"},{"name":"t1.case_mark"},{"name":"coalesce(case_mark.meta_value, t1.case_mark) case_mark_name"},{"name":"t1.is_preclaim_adjustment"},{"name":"t1.is_internal"},{"name":"t1.is_preclaim"},{"name":"t1.cancel_operator"},{"name":"t1.cancel_review_operator"},{"name":"t1.appeal_date"},{"name":"t1.appeal_no"},{"name":"t1.first_close_date"},{"name":"t1.case_tag"},{"name":"coalesce(case_tag.meta_value, t1.case_tag) case_tag_name"},{"name":"t1.catastrophe_code"},{"name":"t1.catastrophe_name"},{"name":"t1.elapsed_time_seconds"},{"name":"decode(t1.sub_status, 'caseReview_first', '\u7406\u8D54\u4E00\u6838\u4E2D', 'caseReview_secondary', '\u7406\u8D54\u4E8C\u6838\u4E2D', 'caseReview_operationManagement', '\u8FD0\u7BA1\u590D\u6838\u4E2D', t1.sub_status) sub_status"},{"name":"t2.source_policy_no"},{"name":"t2.source_policy_id"},{"name":"t2.repeat_nos"},{"name":"t2.no_claim_sms"},{"name":"t2.no_claim_email"},{"name":"t2.no_customer_visit"},{"name":"t2.risk_remark"},{"name":"risk_remark.riskName risk_remark__riskName"},{"name":"risk_remark.riskDetail risk_remark__riskDetail"},{"name":"risk_remark.riskResult risk_remark__riskResult"},{"name":"(case when t1.etl_source_table='za_ha_prd.ods_wjs_ha_claim_application' then 'yjx' when t1.etl_source_table='za_ha_prd.ods_ha_vhf_ha_claim_application' then 'yjx-vhf' end) pt2"}],"where_clause":"t1.pt = '\${bizdate}000000'"},{"type":"insert_overwrite","target_table":"edw_ha_claim_application","partition":{"pt":"\${bizdate}000000","pt2":"yjx"},"select_columns":[{"name":"t1.id"},{"name":"t1.report_no"},{"name":"t1.status"},{"name":"t1.status_name"},{"name":"t1.source"},{"name":"t1.source_name"},{"name":"t1.archive_no"},{"name":"t1.seppage_path_file_name"},{"name":"t1.channel_application_id"},{"name":"t1.image_no"},{"name":"t1.seppage_path"},{"name":"t1.loss_type"},{"name":"t1.loss_type_name"},{"name":"t1.loss_code"},{"name":"t1.loss_code_name"},{"name":"t1.insurance_name"},{"name":"t1.insurance_ceti_no"},{"name":"t1.insurance_ceti_type"},{"name":"t1.accident_date"},{"name":"t1.accident_area"},{"name":"t1.accident_area_name"},{"name":"t1.accident_place"},{"name":"t1.accident_process"},{"name":"t1.reporter"},{"name":"t1.reporter_insured_relation"},{"name":"t1.reporter_insured_relation_name"},{"name":"t1.tel_no"},{"name":"t1.mobile_no"},{"name":"t1.claim_amount"},{"name":"t1.claim_currency"},{"name":"t1.remark"},{"name":"t1.handler"},{"name":"t1.reported_date"},{"name":"t1.death_date"},{"name":"t1.close_date"},{"name":"t1.creator"},{"name":"t1.creator_no"},{"name":"t1.gmt_created"},{"name":"t1.modifier"},{"name":"t1.gmt_modified"},{"name":"t1.extra_info"},{"name":"t1.extra_info__masterinsuredinfo"},{"name":"t1.extra_info__isneedclaimdivision"},{"name":"t1.extra_info__plancodelist"},{"name":"t1.extra_info__materialsmssend"},{"name":"t1.extra_info__customerno"},{"name":"t1.extra_info__accidentdate"},{"name":"t1.extra_info__syslocmobileno"},{"name":"t1.extra_info__syncversion"},{"name":"t1.extra_info__claimreturnchannelkey"},{"name":"t1.extra_info__importDataSource"},{"name":"t1.is_deleted"},{"name":"t1.allow_dispatch"},{"name":"t1.istpadispatch"},{"name":"t1.email"},{"name":"t1.gender"},{"name":"t1.birth_day"},{"name":"t1.channel_batch_no"},{"name":"t1.channel_report_no"},{"name":"t1.adjustment_date"},{"name":"t1.tpa_source"},{"name":"t1.tpa_source_name"},{"name":"t1.master_insured_cert_no"},{"name":"t1.master_insured_cert_type"},{"name":"t1.is_campaign"},{"name":"t1.diagnosis_date"},{"name":"t1.is_attachment"},{"name":"t1.is_vip"},{"name":"t1.elapsed_time"},{"name":"t1.disallow_batch_close"},{"name":"t1.department"},{"name":"t1.has_potential_missing_policy"},{"name":"t1.potential_missing_policy"},{"name":"t1.lawsuit"},{"name":"t1.has_tried_to_dispatch_tpa"},{"name":"t1.auto_dispatch_status"},{"name":"t1.auto_dispatch_fail_count"},{"name":"t1.error_type"},{"name":"t1.mdp_hospital_name"},{"name":"t1.mdp_hospital_code"},{"name":"t1.mdp_invoice_nos"},{"name":"t1.order_no"},{"name":"t1.claim_date"},{"name":"t1.one_notice_date"},{"name":"t1.material_complete_date"},{"name":"t1.case_mark"},{"name":"t1.case_mark_name"},{"name":"t1.is_preclaim_adjustment"},{"name":"t1.is_internal"},{"name":"t1.is_preclaim"},{"name":"t1.cancel_operator"},{"name":"t1.cancel_review_operator"},{"name":"t1.appeal_date"},{"name":"t1.appeal_no"},{"name":"t1.first_close_date"},{"name":"t1.case_tag"},{"name":"t1.is_special_drugs"},{"name":"t1.source_policy_no"},{"name":"t1.source_policy_id"},{"name":"t1.repeat_nos"},{"name":"t1.no_claim_sms"},{"name":"t1.no_claim_email"},{"name":"t1.no_customer_visit"},{"name":"t1.risk_remark"},{"name":"t1.risk_remark__riskName"},{"name":"t1.risk_remark__riskDetail"},{"name":"t1.risk_remark__riskResult"},{"name":"t1.case_tag_name"},{"name":"t1.catastrophe_code"},{"name":"t1.catastrophe_name"},{"name":"t1.elapsed_time_seconds"},{"name":"t1.sub_status"}],"where_clause":"pt2 = 'yjx'"},{"type":"insert_overwrite","target_table":"edw_ha_claim_application","partition":{"pt":"\${bizdate}000000","pt2":"yjx-vhf"},"select_columns":[{"name":"t1.id"},{"name":"t1.report_no"},{"name":"t1.status"},{"name":"t1.status_name"},{"name":"t1.source"},{"name":"t1.source_name"},{"name":"t1.archive_no"},{"name":"t1.seppage_path_file_name"},{"name":"t1.channel_application_id"},{"name":"t1.image_no"},{"name":"t1.seppage_path"},{"name":"t1.loss_type"},{"name":"t1.loss_type_name"},{"name":"t1.loss_code"},{"name":"t1.loss_code_name"},{"name":"t1.insurance_name"},{"name":"t1.insurance_ceti_no"},{"name":"t1.insurance_ceti_type"},{"name":"t1.accident_date"},{"name":"t1.accident_area"},{"name":"t1.accident_area_name"},{"name":"t1.accident_place"},{"name":"t1.accident_process"},{"name":"t1.reporter"},{"name":"t1.reporter_insured_relation"},{"name":"t1.reporter_insured_relation_name"},{"name":"t1.tel_no"},{"name":"t1.mobile_no"},{"name":"t1.claim_amount"},{"name":"t1.claim_currency"},{"name":"t1.remark"},{"name":"t1.handler"},{"name":"t1.reported_date"},{"name":"t1.death_date"},{"name":"t1.close_date"},{"name":"t1.creator"},{"name":"t1.creator_no"},{"name":"t1.gmt_created"},{"name":"t1.modifier"},{"name":"t1.gmt_modified"},{"name":"t1.extra_info"},{"name":"t1.extra_info__masterinsuredinfo"},{"name":"t1.extra_info__isneedclaimdivision"},{"name":"t1.extra_info__plancodelist"},{"name":"t1.extra_info__materialsmssend"},{"name":"t1.extra_info__customerno"},{"name":"t1.extra_info__accidentdate"},{"name":"t1.extra_info__syslocmobileno"},{"name":"t1.extra_info__syncversion"},{"name":"t1.extra_info__claimreturnchannelkey"},{"name":"t1.extra_info__importDataSource"},{"name":"t1.is_deleted"},{"name":"t1.allow_dispatch"},{"name":"t1.istpadispatch"},{"name":"t1.email"},{"name":"t1.gender"},{"name":"t1.birth_day"},{"name":"t1.channel_batch_no"},{"name":"t1.channel_report_no"},{"name":"t1.adjustment_date"},{"name":"t1.tpa_source"},{"name":"t1.tpa_source_name"},{"name":"t1.master_insured_cert_no"},{"name":"t1.master_insured_cert_type"},{"name":"t1.is_campaign"},{"name":"t1.diagnosis_date"},{"name":"t1.is_attachment"},{"name":"t1.is_vip"},{"name":"t1.elapsed_time"},{"name":"t1.disallow_batch_close"},{"name":"t1.department"},{"name":"t1.has_potential_missing_policy"},{"name":"t1.potential_missing_policy"},{"name":"t1.lawsuit"},{"name":"t1.has_tried_to_dispatch_tpa"},{"name":"t1.auto_dispatch_status"},{"name":"t1.auto_dispatch_fail_count"},{"name":"t1.error_type"},{"name":"t1.mdp_hospital_name"},{"name":"t1.mdp_hospital_code"},{"name":"t1.mdp_invoice_nos"},{"name":"t1.order_no"},{"name":"t1.claim_date"},{"name":"t1.one_notice_date"},{"name":"t1.material_complete_date"},{"name":"t1.case_mark"},{"name":"t1.case_mark_name"},{"name":"t1.is_preclaim_adjustment"},{"name":"t1.is_internal"},{"name":"t1.is_preclaim"},{"name":"t1.cancel_operator"},{"name":"t1.cancel_review_operator"},{"name":"t1.appeal_date"},{"name":"t1.appeal_no"},{"name":"t1.first_close_date"},{"name":"t1.case_tag"},{"name":"t1.is_special_drugs"},{"name":"t1.source_policy_no"},{"name":"t1.source_policy_id"},{"name":"t1.repeat_nos"},{"name":"t1.no_claim_sms"},{"name":"t1.no_claim_email"},{"name":"t1.no_customer_visit"},{"name":"t1.risk_remark"},{"name":"t1.risk_remark__riskName"},{"name":"t1.risk_remark__riskDetail"},{"name":"t1.risk_remark__riskResult"},{"name":"t1.case_tag_name"},{"name":"t1.catastrophe_code"},{"name":"t1.catastrophe_name"},{"name":"t1.elapsed_time_seconds"},{"name":"t1.sub_status"}],"where_clause":"pt2 = 'yjx-vhf'"}]}`);function re(){return(0,i.jsx)(ue(),{src:_e,collapsed:3,iconStyle:"square",theme:"monokai"})}var ie=re,oe=t(19632),z=t.n(oe),f=t(7064),se=t(20367),J=JSON.parse('{"q":[{"name":"t1","type":"sourceTable","columns":["f1","f2"]},{"name":"t2","type":"targetTable","columns":["f1","f2","f3"]}],"g":[{"target":"t1","source":"t2","type":"inner join","mappings":[{"targetColumn":"f1","sourceColumn":"f1"},{"targetColumn":"f1","sourceColumn":"f1"}]}]}'),de=function(){f.kJ.registerPortLayout("erPortPosition",function(y){return y.map(function(h,E){return{position:{x:0,y:(E+1)*b},angle:0}})},!0),f.kJ.registerNode("sourceTable",{inherit:"rect",markup:[{tagName:"rect",selector:"body",attrs:{cursor:"pointer"}},{tagName:"text",selector:"label",attrs:{cursor:"pointer"}}],attrs:{rect:{strokeWidth:1,stroke:e.sourceTable.primary,fill:e.sourceTable.primary},label:{fontWeight:"bold",fill:e.fontColor,fontSize:12}},ports:{groups:{list:{markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:A,height:b,strokeWidth:1,stroke:e.sourceTable.primary,fill:e.sourceTable.bg,magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}},position:"erPortPosition"}}}},!0),f.kJ.registerNode("targetTable",{inherit:"rect",markup:[{tagName:"rect",selector:"body",attrs:{cursor:"pointer"}},{tagName:"text",selector:"label",attrs:{cursor:"pointer"}}],attrs:{rect:{strokeWidth:1,stroke:e.targetTable.primary,fill:e.targetTable.primary},label:{fontWeight:"bold",fill:e.fontColor,fontSize:12}},ports:{groups:{list:{markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:A,height:b,strokeWidth:1,stroke:e.targetTable.primary,fill:e.targetTable.bg,magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}},position:"erPortPosition"}}}},!0),f.kJ.registerNode("selectColumns",{inherit:"rect",markup:[{tagName:"rect",selector:"body",attrs:{cursor:"pointer"}},{tagName:"text",selector:"label",attrs:{cursor:"pointer"}}],attrs:{rect:{strokeWidth:1,stroke:e.selectColumns.primary,fill:e.selectColumns.primary},label:{fontWeight:"bold",fill:e.fontColor,fontSize:12}},ports:{groups:{list:{markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:A,height:b,strokeWidth:1,stroke:e.selectColumns.primary,fill:e.selectColumns.bg,magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}},position:"erPortPosition"}}}},!0),f.kJ.registerNode("viewTable",{inherit:"rect",markup:[{tagName:"rect",selector:"body",attrs:{cursor:"pointer"}},{tagName:"text",selector:"label",attrs:{cursor:"pointer"}}],attrs:{rect:{strokeWidth:1,stroke:e.viewTable.primary,fill:e.viewTable.primary},label:{fontWeight:"bold",fill:e.fontColor,fontSize:12}},ports:{groups:{list:{markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:A,height:b,strokeWidth:1,stroke:e.viewTable.primary,fill:e.viewTable.bg,magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}},position:"erPortPosition"}}}},!0)},b=24,A=150,e={fontColor:"#ffffff",hoverBg:"#e5c2ff",activeBg:"#1febf6",defaultBg:"#ebfdec",defaultEdge:"#A2B1C3",sourceTable:{primary:"#fa541c",bg:"#fff2e8"},targetTable:{primary:"#a0d911",bg:"#fcffe6"},selectColumns:{primary:"#1677ff",bg:"#e6f4ff"},viewTable:{primary:"#eb2f96",bg:"#fff0f6"}};de();function le(){var n=(0,m.useRef)(),y=function(){n.current=new f.kJ({container:document.getElementById("container"),autoResize:!0,panning:!0,interacting:{nodeMovable:!0,vertexAddable:!1,vertexDeletable:!1,vertexMovable:!1,arrowheadMovable:!1,edgeLabelMovable:!1,edgeMovable:!1,magnetConnectable:!1},mousewheel:!0,connecting:{router:{name:"er",args:{offset:25,direction:"H"}}}}),h()},h=function(){var _=[],d=J.q.map(function(a,s){return{id:a.name,shape:a.type,label:a.name,width:150,height:24,ports:a.columns.map(function(r){return{id:a.name+"_"+r,group:"list",attrs:{portNameLabel:{text:r}}}})}}),o=J.g.map(function(a,s){return z()(a==null?void 0:a.mappings.map(function(r,u){return{id:s+"-"+u,shape:"edge",source:{cell:a.source,port:a.source+"_"+r.sourceColumn},target:{cell:a.target,port:a.target+"_"+r.targetColumn},connector:{name:"rounded"},attrs:{line:{stroke:e.defaultEdge,strokeWidth:1,targetMarker:{name:"classic",size:6}}},zIndex:0}}))});[].concat(z()(d),z()(o.flat(1/0))).forEach(function(a){a.shape==="edge"?_.push(n.current.createEdge(a)):_.push(n.current.createNode(a))}),n.current.resetCells(_),n.current.centerPoint(),E(n.current)},E=function(_){var d=_.getNodes(),o=_.getEdges(),a=new se.Vq({type:"dagre",rankdir:"LR",align:"UL",ranksep:100,nodesep:100,controlPoints:!0}),s={nodes:d.map(function(u){return{id:u.id,width:u.size().width,height:u.size().height}}),edges:o.map(function(u){return{source:u.getSourceCellId(),target:u.getTargetCellId()}})},r=a.layout(s);r.nodes.forEach(function(u){var l=_.getCellById(u.id);l.isNode()&&l.setPosition(u.x,u.y)}),_.centerPoint()},B=function(_){var d=_.node,o=_.view,a=_.cell,s=_.port;console.log("handlePortMouseEnter",d,o,s),x.setState({highlightWords:["product_code","policy_no","user_id"]}),a.setPortProp(s,"attrs/rect",{fill:e.hoverBg});var r=n.current.getConnectedEdges(a,{incoming:!0,outgoing:!0}).filter(function(u){return u.getSourcePortId()===s||u.getTargetPortId()===s});r.forEach(function(u){u.attr("line/stroke",e.hoverBg);var l=u.getSourceCell(),c=u.getTargetCell(),F=u.getSourcePortId(),D=u.getTargetPortId();l&&F&&l.isNode()&&l.setPortProp(F,"attrs/rect",{fill:e.hoverBg}),c&&D&&c.isNode()&&c.setPortProp(D,"attrs/rect",{fill:e.hoverBg})})},C=function(_){var d=_.cell,o=_.port,a=_.node;console.log("handlePortMouseLeave"),x.setState({highlightWords:[]}),d.setPortProp(o,"attrs/rect",{fill:e[a.shape].bg});var s=n.current.getConnectedEdges(d,{incoming:!0,outgoing:!0}).filter(function(r){return r.getSourcePortId()===o||r.getTargetPortId()===o});s.forEach(function(r){r.attr("line/stroke",e.defaultEdge);var u=r.getSourceCell(),l=r.getTargetCell(),c=r.getSourcePortId(),F=r.getTargetPortId(),D=r.getSourceNode(),w=r.getTargetNode();u&&c&&u.isNode()&&u.setPortProp(c,"attrs/rect",{fill:e[D.shape].bg}),l&&F&&l.isNode()&&l.setPortProp(F,"attrs/rect",{fill:e[w.shape].bg})})},L=function(_){var d=_.cell,o=_.port;console.log("handlePortClick"),d.setPortProp(o,"attrs/rect",{fill:e.activeBg})},v=function(_){console.log("handleGraphMouseEnter"),x.setState({highlightWords:[]});var d=n.current.getCells();d.forEach(function(o){if(o.isNode()){var a=o.getPorts();a.forEach(function(s){o.setPortProp(s.id,"attrs/rect",{fill:e[o.shape].bg})})}})};return(0,m.useEffect)(function(){y()},[]),(0,m.useEffect)(function(){return console.log("\u6CE8\u518C"),n.current.on("node:port:mouseenter",B),n.current.on("node:port:mouseleave",C),n.current.on("graph:mouseenter",v),function(){n.current.off("node:port:mouseenter",B),n.current.off("node:port:mouseleave",C),n.current.off("graph:mouseenter",v)}},[]),(0,i.jsx)("div",{style:{width:"100%",height:"100%"},children:(0,i.jsx)("div",{id:"container"})})}var ce=le;function me(){var n=(0,m.useState)("1"),y=S()(n,2),h=y[0],E=y[1],B=function(v){E(v)},C=[{key:"1",label:"SQL-FLOW"},{key:"2",label:"JSON"}];return(0,i.jsxs)("div",{className:"sql-flow",children:[(0,i.jsx)("div",{className:"sql-flow-tool",children:(0,i.jsx)(ne.Z,{items:C,activeKey:h,onChange:B})}),h==="1"&&(0,i.jsx)(ce,{}),h==="2"&&(0,i.jsx)(ie,{})]})}var pe=me;function ye(){return(0,i.jsx)("div",{className:"home",children:(0,i.jsxs)(k.Z,{children:[(0,i.jsx)(k.Z.Panel,{defaultSize:"30%",min:"30%",max:"70%",children:(0,i.jsx)(te,{})}),(0,i.jsx)(k.Z.Panel,{children:(0,i.jsx)(pe,{})})]})})}var he=ye}}]);

//# sourceMappingURL=254.5c39882f.async.js.map