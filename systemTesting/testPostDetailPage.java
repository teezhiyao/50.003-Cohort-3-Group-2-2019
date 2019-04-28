package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class testPostDetailPage {

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


		//GO TO RANDOM POST AND CLICK LINK TO GO TO INDIVIDUAL POST DETAIL PAGE

		WebElement getPostDetailPage = driver.findElement(By.id("linkToIndividualPost"));
		//get title of post being clicked
		String titleToCheck = getPostDetailPage.getText();
		getPostDetailPage.click();

		WebDriverWait wait = new WebDriverWait(driver, 10);
		//wait for webpage to load
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("post")));
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("postcard")));

		//after individual post detail page has loaded

		//GET TITLE OF PAGE
		WebElement IndPostTitle = driver.findElement(By.id("posttitle"));
		String indPostName = IndPostTitle.getText();

		//TO CHECK: if posts on individual page category is the same as the category clicked by user
		if(indPostName.equals(titleToCheck)){
			System.out.println("Driver is on the CORRECT individual post detail page!");
		} else{
			System.out.println("Driver is on the WRONG individual post detail page!");

		}

	}


}
