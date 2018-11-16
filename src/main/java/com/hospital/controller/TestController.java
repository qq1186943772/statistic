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
	
}
