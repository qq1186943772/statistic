package com.hospital.service.recharge;

import java.util.Map;

import com.github.pagehelper.PageInfo;
import com.hospital.pojo.Page;
import com.hospital.pojo.PageData;

public interface RechargeService {

	public PageInfo<Map<String, Object>> queryRechargePage(String str,Page page) throws Exception;
	
}
