package com.hospital.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {

	@RequestMapping("/t")
	@ResponseBody
	public String t(){
		return "SSS";
	}
	
	public static void main(String[] args) {
		
		double a = 0.1f;
		double b = 0.3f;
		System.out.println(a*b);
		
		double c = 0.1;
		double d = 0.3;
		System.out.println(c*d);
		
		System.out.println("只是为了看看分支提交合并的问题");
		
	}
	
}
