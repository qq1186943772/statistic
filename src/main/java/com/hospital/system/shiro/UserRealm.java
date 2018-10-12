package com.hospital.system.shiro;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class UserRealm extends AuthorizingRealm {

	private static HashMap<String, String> userInfo = new HashMap<>();

	static {
		userInfo.put("syad001", "123456dk");
	}

	@Override
	public void setName(String name) {
		super.setName("userRealm");
	}

	/**
	 * 验证登录
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		String username = (String) token.getPrincipal(); // 得到用户名
		String password = new String((char[]) token.getCredentials()); // 得到密码

		if (StringUtils.isNotEmpty(username)) {
			boolean nameState = true;
			for (String systemName : userInfo.keySet()) {
				if (systemName.equals(username)) {
					nameState = false;
				}
			}
			if (nameState) {
				throw new UnknownAccountException();
			}
		}

		if (StringUtils.isNotEmpty(password)) {
			boolean passState = true;
			for (String systemName : userInfo.keySet()) {
				if (userInfo.get(systemName).equals(password)) {
					passState = false;
				}
			}
			if (passState) {
				throw new IncorrectCredentialsException();
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
