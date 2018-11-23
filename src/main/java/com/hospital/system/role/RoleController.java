package com.hospital.system.role;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 
 * @author Administrator
 *
 */
@Controller
public class RoleController {

	@RequestMapping(value="/goRole")
	public String goRole() {
		return "system/role";
	}
	
	@ResponseBody
	@RequestMapping(value="/roleList")
	public Map<String, Object> roleList(){
		List<Map<String, Object>> array = new ArrayList<>();
		array.add(null);
		Map<String,Object> map = new HashMap<>();
		map.put("list", array);
		return map;
	}
	
	@ResponseBody
	@RequestMapping(value="/roleSave")
	public boolean roleSave(@RequestBody Map<String, Object> map) {
		System.out.println("增加");
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value="/roleUpdate")
	public boolean roleUpdate(@RequestBody Map<String, Object> map) {
		System.out.println("修改");
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value="/roleDel")
	public boolean roleDel(@RequestBody List<String> list) {
		return true;
	}
	
}
