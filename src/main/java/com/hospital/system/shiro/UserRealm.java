package com.hospital.system.shiro;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserRealm extends AuthorizingRealm {

	/*private static HashMap<String, String> userInfo = new HashMap<>();*/
	
	@Resource(name="jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
	private String checkUsername = "select login_name from sys_user where login_name = ? ";
	
	private String checkPassword = "select login_name from sys_user where login_name = ? and login_pass = ? ";
	
	/**
	 * 验证登录
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String username = (String) token.getPrincipal(); // 得到用户名
		String password = new String((char[]) token.getCredentials()); // 得到密码

		if (StringUtils.isNotEmpty(username)) {
			try {
				Object[] obj = {username};
				jdbcTemplate.queryForMap(checkUsername,obj);
			} catch (Exception e) {
				e.printStackTrace();
				throw new UnknownAccountException();
			}
		}

		if (StringUtils.isNotEmpty(password)) {
			try {
				Object[] obj = {username,password};
				jdbcTemplate.queryForMap(checkPassword,obj);
			} catch (Exception e) {
				throw new UnknownAccountException();
			}
		}

		return new SimpleAuthenticationInfo(username, password, this.getName());

	}

	/**
	 * 授权
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		return null;
	}

}
