package com.hospital.system.resource;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;

@Controller
public class ResourceController {

	@Resource(name="resourceService")
	ResourceService<Map<String, Object>> resourceService;
	
	@RequestMapping(value="goResource")
	public String goResource() {
		return "system/resource";
	}
	
	@ResponseBody
	@RequestMapping(value="/resourceList")
	public PageInfo<Map<String, Object>> resourceList(@RequestParam Map<String, Object> resource,PageInfo<Map<String, Object>> page){
		page.setPageSize(Integer.valueOf(resource.get("limit")+""));
		page.setPageNum(Integer.valueOf(resource.get("page")+""));
		
		String ids = resource.get("ids")!=null?resource.get("ids").toString():"0";
		ids = ids.replace("[", "").replaceAll("]", "").replaceAll("\"", "");
		resource.put("ids", ids);
		System.out.println(ids);
		return resourceService.pageList("Resource.findById", page ,resource);
	}
	
	
	
}
