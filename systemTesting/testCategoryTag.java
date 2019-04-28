package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class testCategoryTag {

	static String myUserName = "ktw";
	static String myPassword = "ktw";

	static String[] categories = { "All Issues", "Login Issue", "API Issue","Logout Issue" ,"Client Login Issue", "Data Logging Issue" ,"Feature Request" , "Latency Issue" ,"Others" };


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


		//GO TO RANDOM POST AND SELECT CATEGORY TO GO TO INDIVIDUAL CATEGORY PAGE
		WebElement getCategoryName = driver.findElement(By.id("linkToIndividualCategory"));
		String catName = getCategoryName.getText();

		//go to Individual Category Page
		getCategoryName.click();
		WebDriverWait wait = new WebDriverWait(driver, 10);
		//wait for webpage to load
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("individualCategory")));

		//after individual category page has loaded

		//GET TITLE OF PAGE
		WebElement IndCatTitle = driver.findElement(By.id("individualCategory"));
		String indCatName = getCategoryName.getText();

		//TO CHECK: if posts on individual page category is the same as the category clicked by user
		if(indCatName.equals(catName)){
			System.out.println("Driver is on the CORRECT individual category page!");
		} else{
			System.out.println("Driver is on the WRONG individual category page!");

		}


	}


}
