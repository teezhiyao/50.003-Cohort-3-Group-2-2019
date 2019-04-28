package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class Sorting {

	static String myUserName = "ktw";
	static String myPassword = "ktw";

	static String[] categories = { "All Issues", "Login Issue", "API Issue","Logout Issue" ,"Client Login Issue", "Data Logging Issue" ,"Feature Request" , "Latency Issue" ,"Others" };

	static String[] priorities = { "LOW", "MEDIUM", "HIGH"};



	public static void main(String[] args) throws InterruptedException {


		System.setProperty("webdriver.chrome.driver","/Users/nashitaabd/Downloads/chromedriver");
		WebDriver driver = new ChromeDriver();

		driver.get("localhost:8100");


		//********************************************************//
		//*********************** LOGIN **************************//
		//********************************************************//
		// get the user name field of the account page
		WebElement username = driver.findElement(By.id("email"));

		// send my user name to fill up the box
		username.sendKeys(myUserName);

		// locate the "Next" button in the account page
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys(myPassword);

		WebElement submit = driver.findElement(By.id("login"));
		submit.click();		//explicitly wait until the password field is present in the page

		//ALERT BOX
		driver.switchTo().alert().accept();
		//********************************************************//
		//*********************** LOGIN **************************//
		//********************************************************//


		//SELECT CATEGORY

		//Select Category
		Select categoryDropdown = new Select(driver.findElement(By.id("sortCategory")));


		for (int i=0; i<categories.length; i++){
			categoryDropdown.selectByVisibleText(categories[i]); //for each category
			}
	}


}
