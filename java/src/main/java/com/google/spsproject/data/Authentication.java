package com.google.spsproject.data;

public class Authentication {
    private boolean isUserLoggedIn;
    private String logInUrl;
    private String logOutUrl;
    private String email;

    public boolean getIsUserLoggedIn() {
        return isUserLoggedIn;
    }
    
    public void setIsUserLoggedIn(boolean isUserLoggedIn) {
        this.isUserLoggedIn = isUserLoggedIn;
    }
    
    public String getLogInUrl() {
        return logInUrl;
    }
    
    public void setLogInUrl(String logInUrl) {
        this.logInUrl = logInUrl;
    }
    
    public String getLogOutUrl() {
        return logOutUrl;
    }
    
    public void setLogOutUrl(String logOutUrl) {
        this.logOutUrl = logOutUrl;
    }
    
    public String getEmail(String email) {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}