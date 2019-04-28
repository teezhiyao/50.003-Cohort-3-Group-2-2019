package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Random {

	static String myUserName = "ktw";
	static String myPassword = "ktw";
		
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

		// get all the links
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		System.out.println(links.size());
				
		// print all the links
		for (int i = 0; i < links.size(); i=i+1) {
			System.out.println(i + " " + links.get(i).getText());
			System.out.println(i + " " + links.get(i).getAttribute("href"));
		}
		
		//click randomly

		while(true)

		{
			java.util.Random random = new java.util.Random();
			int z = random.nextInt(links.size());
			System.out.println("**** Navigating to" + " " + links.get(z).getAttribute("href"));
			if (links.get(z).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			while(staleElementLoaded) {
				try {
					driver.navigate().to(links.get(z).getAttribute("href"));
					Thread.sleep(3000);
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
	}
}
