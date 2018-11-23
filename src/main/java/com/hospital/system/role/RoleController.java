package com.hospital.system.role;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageInfo;
/**
 * 角色对应的 controller 
 * @author Administrator
 *
 */
@Controller
public class RoleController {

	@Resource(name="roleService")
	RoleService<Map<String, Object>> roleService;
	
	@RequestMapping(value="/goRole")
	public String goRole() {
		return "system/role";
	}
	
	@ResponseBody
	@RequestMapping(value="/roleList")
	public PageInfo<Map<String, Object>> roleList(@RequestParam Map<String, Object> role,PageInfo<Map<String, Object>> page){
		page.setPageSize(Integer.valueOf(role.get("limit")+""));
		page.setPageNum(Integer.valueOf(role.get("page")+""));
		return roleService.pageList("Role.findById", page ,role);
	}
	
	@ResponseBody
	@RequestMapping(value="/roleSave")
	public boolean roleSave(@RequestBody Map<String, Object> role,PageInfo<Map<String, Object>> page) {
		role.put("state", 0);
		System.out.println(role.toString());
		return roleService.add("Role.roleSave",role);
	}
	
	@ResponseBody
	@RequestMapping(value="/roleUpdate")
	public boolean roleUpdate(@RequestBody Map<String, Object> role,PageInfo<Map<String, Object>> page) {
		System.out.println(role.toString());
		return roleService.edit("Role.roleUpdate",role);
	}
	
	@ResponseBody
	@RequestMapping(value="/roleDel")
	public boolean roleDel(@RequestBody List<String> ids ,PageInfo<Map<String, Object>> page) {
		return roleService.deleteNum("Role.roleDeleteNum",ids);
	}
	
}
