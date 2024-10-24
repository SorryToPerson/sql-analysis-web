export default `
 select 
        t1.id
        , t1.report_no
        , t1.status
        , coalesce(status.meta_value, t1.status) status_name
        , t1.source
        , coalesce(source.meta_value, t1.source) source_name
        , t1.seppage_path
        , coalesce(t1.loss_type, 'illness') loss_type  
        , coalesce(loss_type.meta_value, t1.loss_type) loss_type_name
        , t4.area_name    accident_area_name 
        , t1.accident_place
        , t1.accident_process
        , t1.reporter
        , t1.reporter_insured_relation
        , coalesce(reporter_insured_relation.meta_value, t1.reporter_insured_relation) reporter_insured_relation_name
        , t1.is_deleted
        , t1.allow_dispatch
        , t1.istpadispatch
        , t1.email
       
    from za_ha_prd.ods_ha_claim_application_all t1
    left outer join za_ha_prd.ods_ha_claim_application_extra_info_all t2
        on t1.id = t2.claim_application_id
            and t2.pt = '\${bizdate}000000'
            and t2.is_deleted = 'N'
    left outer join (select
                        t1.report_no
                        , wm_concat(',', loss_code_name) loss_code_split
                    from edw_ha_claim_application__loss_code t1
                    where t1.pt='\${bizdate}000000'
                    group by
                        t1.report_no) t3
        on t1.report_no = t3.report_no
    left outer join tmp_ha_claim_application__accident_area t4
        on t4.pt='\${bizdate}000000'
            and t1.report_no = t4.report_no
    left outer join pub_ha_code_value_dim status
        on t1.status = status.src_key
            and status.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and status.cl_name = 'status'
    left outer join pub_ha_code_value_dim case_mark
        on t1.case_mark = case_mark.src_key
            and case_mark.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and case_mark.cl_name = 'case_mark'
    left outer join pub_ha_code_value_dim tpa_source
        on t1.tpa_source = tpa_source.src_key
            and tpa_source.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and tpa_source.cl_name = 'tpa_source'
    left outer join pub_ha_code_value_dim source
        on t1.source = source.src_key
            and source.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and source.cl_name = 'source'
    left outer join pub_ha_code_value_dim loss_type
        on coalesce(t1.loss_type, 'illness')= loss_type.src_key
            and loss_type.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and loss_type.cl_name = 'loss_type'
    left outer join pub_ha_code_value_dim reporter_insured_relation
        on t1.reporter_insured_relation = reporter_insured_relation.src_key
            and reporter_insured_relation.tb_name = 'za_ha_prd.ods_ha_claim_application_all'
            and reporter_insured_relation.cl_name = 'reporter_insured_relation'
    lateral view json_tuple(t1.extra_info
                            , 'masterInsuredInfo', 'isNeedClaimDivision', 'planCodeList', 'materialSmsSend', 'customerNo'
                            , 'accidentDate', 'sysLocMobileNo', 'syncVersion', 'claimReturnChannelKey', 'importDataSource') extra_info
                            as masterInsuredInfo, isNeedClaimDivision, planCodeList, materialSmsSend, customerNo
                                , accidentDate, sysLocMobileNo, syncVersion, claimReturnChannelKey, importDataSource
    lateral view json_tuple(t2.risk_remark
                            , 'riskName', 'riskDetail', 'riskResult') risk_remark
                            as riskName, riskDetail, riskResult
    left join za_ha_prd.pub_ha_code_value_dim case_tag
        on t1.case_tag = case_tag.src_key
            and case_tag.tb_name='za_ha_prd.ods_ha_claim_application_all'
            and case_tag.cl_name='case_tag'
    where t1.pt = '\${bizdate}000000'
`;
