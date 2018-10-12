package com.hospital.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
import com.hospital.pojo.Page;
import com.hospital.service.recharge.RechargeService;

@Controller
public class RechargeController {

	@Resource(name="rechargeService")
	RechargeService rechargeService;
	
	@ResponseBody
	@RequestMapping(value="queryRechargePage",method=RequestMethod.GET)
	public PageInfo<Map<String, Object>> queryRechargePage(int pageNum,int pageSize) {
		Page page = new Page();
		page.setCurrentPage(pageNum);
		page.setShowCount(pageSize);
		PageInfo<Map<String, Object>> pageinfo = null;
		try {
			pageinfo = rechargeService.queryRechargePage("Recharge.listPage", page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pageinfo;
	}
	
}
