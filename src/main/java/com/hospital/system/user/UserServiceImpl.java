package com.hospital.system.user;

import org.springframework.stereotype.Service;

import com.hospital.service.DemoServiceImpl;

@Service("userService")
public class UserServiceImpl<T> extends DemoServiceImpl<T> implements UserService<T>{

	
	
}
