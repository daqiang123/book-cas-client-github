package com.xadhsd.book.server.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

//@Data
@Component
public class CasProperties {
    
    @Value("${security.cas.server.host}")
    private String casServerUrl;
 
    @Value("${security.cas.server.login}")
    private String casServerLoginUrl;
 
    @Value("${security.cas.server.logout}")
    private String casServerLogoutUrl;
 
    @Value("${security.cas.service.host}")
    private String appServerUrl;
 
    @Value("${security.cas.service.login}")
    private String appLoginUrl;
 
    @Value("${security.cas.service.logout}")
    private String appLogoutUrl;

	public String getCasServerUrl() {
		return casServerUrl;
	}

	public void setCasServerUrl(String casServerUrl) {
		this.casServerUrl = casServerUrl;
	}

	public String getCasServerLoginUrl() {
		return casServerLoginUrl;
	}

	public void setCasServerLoginUrl(String casServerLoginUrl) {
		this.casServerLoginUrl = casServerLoginUrl;
	}

	public String getCasServerLogoutUrl() {
		return casServerLogoutUrl;
	}

	public void setCasServerLogoutUrl(String casServerLogoutUrl) {
		this.casServerLogoutUrl = casServerLogoutUrl;
	}

	public String getAppServerUrl() {
		return appServerUrl;
	}

	public void setAppServerUrl(String appServerUrl) {
		this.appServerUrl = appServerUrl;
	}

	public String getAppLoginUrl() {
		return appLoginUrl;
	}

	public void setAppLoginUrl(String appLoginUrl) {
		this.appLoginUrl = appLoginUrl;
	}

	public String getAppLogoutUrl() {
		return appLogoutUrl;
	}

	public void setAppLogoutUrl(String appLogoutUrl) {
		this.appLogoutUrl = appLogoutUrl;
	}
    

}