package com.xadhsd.book.server.security;

import java.security.Principal;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.springframework.security.cas.authentication.CasAssertionAuthenticationToken;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService //实现AuthenticationUserDetailsService，实现loadUserDetails方法
    implements AuthenticationUserDetailsService<CasAssertionAuthenticationToken> {           
	@Override
	public UserDetails loadUserDetails(CasAssertionAuthenticationToken token) throws UsernameNotFoundException {
		System.out.println("当前的用户名是："+token.getName());
		Principal principal = (Principal) token.getAssertion().getPrincipal();
		Map<String,Object> map = new HashMap<>();
		if (principal instanceof AttributePrincipal) {
			map =( (AttributePrincipal)principal).getAttributes();
		}
		
		System.err.println("用户登录名称:"+map.get("account"));
		System.err.println("用户头像名称:"+map.get("image"));
		System.err.println("用户真实姓名:"+map.get("username"));
		System.err.println("用户邮箱:"+map.get("email"));
		System.err.println("用户手机号码:"+map.get("phoneNo"));
		
		/*这里我为了方便，就直接返回一个用户信息，实际当中这里修改为查询数据库或者调用服务什么的来获取用户信息*/
		UserInfo userInfo = new UserInfo();
		userInfo.setName((String) map.get("username"));
		userInfo.setAccount((String) map.get("account"));
		userInfo.setImage((String) map.get("image"));
		userInfo.setUsername((String) map.get("username"));
		userInfo.setEmail((String) map.get("email"));
		userInfo.setPhoneNo((String) map.get("phoneNo"));
		Set<AuthorityInfo> authorities = new HashSet<AuthorityInfo>();
		AuthorityInfo authorityInfo = new AuthorityInfo("TEST");
		authorities.add(authorityInfo);
		userInfo.setAuthorities(authorities);
		return userInfo;
	}

}