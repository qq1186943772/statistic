package com.hospital.system.resource;

import org.springframework.stereotype.Service;

import com.hospital.service.DemoServiceImpl;

@Service("resourceService")
public class ResourceServiceImpl<T> extends DemoServiceImpl<T> implements ResourceService<T>{

}
