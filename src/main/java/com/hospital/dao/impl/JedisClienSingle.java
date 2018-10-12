package com.hospital.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;


import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

public class JedisClienSingle implements com.hospital.dao.JedisClient{
	
	@Autowired
	private JedisPool jedisPool;

	@Override
	public String get(String key) {
		try {
			Jedis jedis=jedisPool.getResource();
			String value=jedis.get(key);
			jedis.close();
			return value;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public String set(String key, String value) {
		
		try {
			Jedis jedis=jedisPool.getResource();
			String str=jedis.set(key, value);
			jedis.close();
			return str;
		} catch (Exception e) {
			return null;
		}
		
		
	}

	@Override
	public long hset(String hkey, String key, String value) {
		try {
			Jedis jedis=jedisPool.getResource();
			long string=jedis.hset(hkey, key, value);
			jedis.close();
			return string;
		} catch (Exception e) {
			return -10;
		}
	}

	@Override
	public String hget(String hkey, String key) {
		
		try {
			Jedis jedis=jedisPool.getResource();
			String str=jedis.hget(hkey, key);
			jedis.close();
			return str;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public long incr(String key) {
		try {
			Jedis jedis=jedisPool.getResource();
			long result=	jedis.incr(key);
			jedis.close();
			return result;
		} catch (Exception e) {
			return -10;
		}
	}

	@Override
	public long expire(String key, int second) {
		try {
			Jedis jedis=jedisPool.getResource();
			long result=jedis.expire(key, second);
			jedis.close();
		
			return result;
		} catch (Exception e) {
			return -10;
		}
	}

	@Override
	public long ttl(String key) {
		try {
			Jedis jedis=jedisPool.getResource();
			long result=jedis.ttl(key);
			jedis.close();
		
			return result;
		} catch (Exception e) {
			return -10;
		}
	}
	
	@Override
	public long del(String key) {
		try {
			Jedis jedis=jedisPool.getResource();
			long result=jedis.del(key);
			jedis.close();
			return result;
		} catch (Exception e) {
			return -10;
		}
		
	}

	@Override
	public long hdel(String hkey, String key) {
		try {
			Jedis jedis=jedisPool.getResource();
			long result=jedis.hdel(hkey, key);
			jedis.close();
			return result;
		} catch (Exception e) {
			return -10;
		}
	}

}
