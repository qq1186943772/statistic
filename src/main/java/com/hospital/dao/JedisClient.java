package com.hospital.dao;

public interface JedisClient {

	/**
	 * 取值
	 * @param key
	 * @return 
	 */
	public String get(String key);
	
	/**
	 * 设置值
	 * @param key
	 * @param value
	 * @return 返回null时抛出异常
	 */
	public String set(String key,String value);
	
	/**
	 * 哈希set设置值
	 * @param hkey
	 * @param key
	 * @param value
	 * @return 返回-10时抛出异常
	 */
	public long hset(String hkey,String key,String value);
	
	/**
	 * 哈希set取值
	 * @param hkey
	 * @param key
	 * @param value
	 * @return 
	 */
	public String hget(String hkey,String key);
	
	/**
	 * 值 自增
	 * @param key
	 * @return 返回-10时抛出异常
	 */
	long incr(String key);
	
	/**
	 * 设置一个定时清除的值
	 * 返回1
	 * @param key
	 * @param second
	 * @return 返回-10时抛出异常
	 */
	long expire(String key,int second);
	
	/**
	 * 查看一个定时清除值得倒计时时间
	 * 值被清除会返回-2
	 * @param key
	 * @return 返回-10时抛出异常
	 */
	long ttl(String key);
	
	/**
	 * 删除
	 * 成功返回1
	 * @param key
	 * @return 返回-10时抛出异常
	 */
	long del(String key);
	
	/**
	 * 删除hset 内部一个 值
	 * 成功返回1
	 * @param hkey
	 * @param key
	 * @return 返回-10时抛出异常
	 */
	long hdel(String hkey,String key);
	
}
