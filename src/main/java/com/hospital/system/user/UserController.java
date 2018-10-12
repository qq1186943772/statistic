package com.hospital.system.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.SessionException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.LogoutFilter;
import org.apache.shiro.web.servlet.ServletContextSupport;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {
	
	@ResponseBody
	@RequestMapping(value="/userLogin",method=RequestMethod.POST)
	public Map<String, Object> userLogin(@RequestParam(value="username") String username,
							@RequestParam(value="password") String password) {
		
		Map<String, Object> map = new HashMap<>();
		map.put("username", username);
		map.put("password", password);
		
		try {
			UsernamePasswordToken token = new UsernamePasswordToken(username,password);
			Subject subject = SecurityUtils.getSubject();
			subject.login(token);
			map.put("message", true);
		} catch (UnknownAccountException e) {
			e.printStackTrace();
			map.put("message", "账号不正确，请确认账号");
			return map;
		} catch (IncorrectCredentialsException e) {
			e.printStackTrace();
			map.put("message", "密码错误");
			return map;
		}
		return map;
	}
	
	@RequestMapping(value="/userLogOut",method=RequestMethod.GET)
	public String userLogOut(HttpServletRequest request,HttpServletResponse response) {
		
		System.out.println(0123);
		
		try {
			new LogoutFilter() {
				
				@Override    
				protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {   
					System.out.println(0123);
					//在这里执行退出系统前需要清空的数据        
					Subject subject=getSubject(request,response);        
					String redirectUrl=getRedirectUrl(request,response,subject);        
					try {            
						subject.logout();            
					}catch (SessionException e){            
						e.printStackTrace();        
					}        
					
					issueRedirect(request,response,redirectUrl);        
						
					return false;    
					
				}
				
			}.preHandle(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(0123);
		return "login";
	}
	
	
	
	/*@RequestMapping(value="/goLogin")
	public String goLogin() {
		return "login";
	}*/
	
}
