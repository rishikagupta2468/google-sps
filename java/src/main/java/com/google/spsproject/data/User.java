package com.google.spsproject.data;

public class User {
    private String name;
    private String email;
    private int age;

    private enum Gender {
        MALE, FEMALE, OTHER;
    }

    private Gender gender;
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public void setGender(String gender) {
        this.gender = Gender.valueOf(gender);
    }
    
    public String getGender() {
        if (gender == null) return "";
        return gender.toString();
    }
}