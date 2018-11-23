package com.hospital.system.role;

import org.springframework.stereotype.Service;

import com.hospital.service.DemoServiceImpl;

@Service("roleService")
public class RoleServiceImpl<T> extends DemoServiceImpl<T> implements RoleService<T>{

}
