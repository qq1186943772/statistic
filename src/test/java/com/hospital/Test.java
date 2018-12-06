package com.hospital;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.PageInfo;
import com.hospital.system.user.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring/applicationContext-*.xml")
@Transactional
public class Test {

	@Resource(name="userService")
	UserService<Map<String, Object>> userService;
	
	@org.junit.Test
	public void controller() {
		
		Map<String, Object> user = new HashMap<>();
		PageInfo<Map<String, Object>> page = new PageInfo<>();
		page.setPageSize(Integer.valueOf(10));
		page.setPageNum(Integer.valueOf(1));
		page = userService.pageList("User.findById", page ,user);
	}
	
	
}
