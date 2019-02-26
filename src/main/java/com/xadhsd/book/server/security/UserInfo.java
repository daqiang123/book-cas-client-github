package com.xadhsd.book.server.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
 
/**
 * 用户信息
 * @、这里我写了几个较为常用的字段，id，name，username，password，可以根据实际的情况自己增加
 * @author ChengLi
 *
 */
public class UserInfo implements UserDetails {
	private static final long serialVersionUID = -1041327031937199938L;
 
	/**
	 * 用户ID
	 */
	private Long id;
 
	/**
	 * 用户名称
	 */
	private String name;
 
	/**
	 * 登录名称/用户真实姓名
	 */
	private String username;
 
	/**
	 * 登录密码
	 */
	private String password;
	
	//
	
	/**
	 * 用户登录名称
	 */
	private String account;
	
	/**
	 * 用户头像名称
	 */
	private String image;
	
	/**
	 * 用户邮箱
	 */
	private String email;
	
	/**
	 * 用户手机号码
	 */
	private String phoneNo;
 
	private boolean isAccountNonExpired = true;
 
	private boolean isAccountNonLocked = true;
 
	private boolean isCredentialsNonExpired = true;
 
	private boolean isEnabled = true;
 
	private Set<AuthorityInfo> authorities = new HashSet<AuthorityInfo>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}

	public void setAccountNonExpired(boolean isAccountNonExpired) {
		this.isAccountNonExpired = isAccountNonExpired;
	}

	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	public void setAccountNonLocked(boolean isAccountNonLocked) {
		this.isAccountNonLocked = isAccountNonLocked;
	}

	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}

	public void setCredentialsNonExpired(boolean isCredentialsNonExpired) {
		this.isCredentialsNonExpired = isCredentialsNonExpired;
	}

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public Set<AuthorityInfo> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<AuthorityInfo> authorities) {
		this.authorities = authorities;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	
}