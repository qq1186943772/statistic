package com.hospital.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hospital.dao.DAO;

public class DemoServiceImpl<T> implements DemoService<T> {

	@Resource(name = "daoSupport")
	DAO dao;

	@Override
	public boolean add(String str, T form) {
		boolean stat = false;
		try {
			dao.save(str, form);
			stat = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	@Override
	public boolean deleteOne(String str, String id) {
		boolean stat = false;
		try {
			dao.delete(str, id);
			stat = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	@Override
	public boolean deleteNum(String str, List<String> ids) {
		boolean stat = false;
		try {
			dao.batchDelete(str, ids);
			stat = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	@Override
	public boolean edit(String str, T form) {
		boolean stat = false;
		try {
			dao.update(str, form);
			stat = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, Object>> loadList(String str, T form) {
		List<Map<String, Object>> stat = null;
		try {
			stat = (List<Map<String, Object>>) dao.findForList(str,form);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return stat;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PageInfo<Map<String, Object>> pageList(String str, PageInfo<Map<String, Object>> page, T form) {
		List<Map<String, Object>> stat = null;
		try {
			int currentPage = page.getPageNum() > 0?page.getPageNum():1;
			PageHelper.startPage(currentPage, page.getPageSize());
			stat =  (List<Map<String, Object>>) dao.findForList(str,form);
			page.setList(stat);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return page;
	}
	
	

}
