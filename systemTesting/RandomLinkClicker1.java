package com.example.week10;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Random;

public class RandomLinkClicker1 {

    public static void main(String[] args) throws InterruptedException {
        //System.setProperty("webdriver.gecko.driver","/Users/sudiptac/sudiptac/teaching/SUTD/50.003@2019/Test/newGecko/geckodriver");
        //WebDriver driver = new FirefoxDriver();

        //System.setProperty("webdriver.chrome.driver","/Users/sudiptac/sudiptac/teaching/SUTD/50.003@2018/Test/chromedriver");
        //WebDriver driver = new ChromeDriver();
        System.setProperty("webdriver.chrome.driver","/Users/nashitaabd/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();

        //driver.get("https://sudiptac.bitbucket.io");
        driver.get("https://www.istd.sutd.edu.sg");
        //driver.get("https://www.google.com.sg");

        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        // print all the links
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        // maximize the browser window
        driver.manage().window().maximize();

        // click all links in a web page
        while(true)

        {
            Random random = new Random();
            int z = random.nextInt(links.size());
            System.out.println("**** Navigating to" + " " + links.get(z).getAttribute("href"));
            if (links.get(z).getAttribute("href") == null || links.get(z).getAttribute("href").equals("https://www.sutd.edu.sg"))
                continue;
            boolean staleElementLoaded = true;
            while(staleElementLoaded) {
                try {
                    driver.navigate().to(links.get(z).getAttribute("href"));
                    Thread.sleep(3000);
                    driver.navigate().back();
                    links = driver.findElements(By.tagName("a"));
                    System.out.println("*** Navigated to" + " " + links.get(z).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                }
            }
        }
    }
}
