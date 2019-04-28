package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SignUp500 {

    static String myName = "name";
    static String myUserName = "user";
    static String myPassword = "pwd";


    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver","/Users/nashitaabd/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();

        driver.get("localhost:8100");

        WebElement signup = driver.findElement(By.id("signup"));
        signup.click(); //go to sign up page

        WebDriverWait wait = new WebDriverWait(driver, 10);
        //wait for webpage to load
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("form")));


        WebElement name = driver.findElement(By.id("name"));
        WebElement username = driver.findElement(By.id("username"));
        WebElement email = driver.findElement(By.id("email"));
        WebElement age = driver.findElement(By.id("age"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement confirmPassword = driver.findElement(By.id("confirmPassword"));
        WebElement signupButton = driver.findElement(By.id("signupButton"));



        for(int i=0; i<500; i++){
            name.sendKeys(myName+"-"+i);
            username.sendKeys(myUserName+"-"+i);
            email.sendKeys(myName+i+"@gmail.com");
            age.sendKeys("22");
            password.sendKeys(myPassword+"-"+i);
            confirmPassword.sendKeys(myPassword+"-"+i);
            signupButton.click();
            driver.get("localhost:8100/SignUpPage");
        }

    }
}
