package com.hospital.service.recharge;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hospital.dao.DAO;
import com.hospital.pojo.Page;

@Service("rechargeService")
public class RechargeServiceImpl implements RechargeService{

	@Resource(name = "daoSupport")
	DAO dao;

	/**
	 * param str 将要执行的 mybatis 语句 param pageData 执行时的参数
	 */
	@SuppressWarnings("unchecked")
	public PageInfo<Map<String, Object>> queryRechargePage(String str, Page page) throws Exception {

		System.out.println(page.getCurrentPage());
		int currentPage = page.getCurrentPage() > 0?page.getCurrentPage():1;
		
		PageHelper.startPage(currentPage, page.getShowCount());

		List<Map<String, Object>> list =  (List<Map<String, Object>>) dao.findForList(str, page.getPd());
		
		System.out.println(list.toString());
		System.out.println(list.toString());
		System.out.println(list.toString());
		
		PageInfo<Map<String, Object>> pageInfo = new PageInfo<>(list);

		System.out.println(pageInfo.toString());
		
		return pageInfo;
	}

}
