package com.hospital.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;


import redis.clients.jedis.JedisCluster;

public class JedisClienCluster implements com.hospital.dao.JedisClient{
	
	@Autowired
	private JedisCluster jedisCluster;

	@Override
	public String get(String key) {
		try {
			return jedisCluster.get(key);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public String set(String key, String value) {
		try {
			return jedisCluster.set(key, value);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public long hset(String hkey, String key, String value) {
		try {
			return jedisCluster.hset(hkey, key, value);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
		
	}

	@Override
	public String hget(String hkey, String key) {
		try {
			return jedisCluster.hget(hkey, key);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public long incr(String key) {
		try {
			return jedisCluster.incr(key);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
		
	}

	@Override
	public long expire(String key, int second) {
		
		try {
			return jedisCluster.expire(key, second);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
	}

	@Override
	public long ttl(String key) {
		try {
			return jedisCluster.ttl(key);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
		
	}

	@Override
	public long del(String key) {
		try {
			return jedisCluster.del(key);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
		
	}

	@Override
	public long hdel(String hkey, String key) {
		try {
			return jedisCluster.hdel(hkey, key);
		} catch (Exception e) {
			e.printStackTrace();
			return -10;
		}
	}

}
