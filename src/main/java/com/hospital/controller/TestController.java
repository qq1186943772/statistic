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
		String test = "-ahaha-";
		String[] tests = test.split("-");
		System.out.println(tests.length);
		System.out.println(tests[0]);
		System.out.println(tests[1]);
	}
	
}
