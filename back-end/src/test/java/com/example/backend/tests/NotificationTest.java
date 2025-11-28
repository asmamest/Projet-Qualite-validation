package com.example.backend.tests;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class NotificationTest {
    public static void main(String[] args) {
        // Chemin vers ton driver Chrome
        System.setProperty("webdriver.chrome.driver", "C:/Users/ASUS/Desktop/chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:8083"); // URL de ton application

        // Suppose qu'on déclenche la notification en cliquant sur un bouton
        WebElement triggerButton = driver.findElement(By.id("triggerNotification"));
        triggerButton.click();

        // Attendre que la notification apparaisse (par ex: div avec id 'notification')
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement notification = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("notification"))
        );

        // Vérifier le texte de la notification
        if (notification.getText().contains("Notification envoyée")) {
            System.out.println("✅ Test réussi : notification visible");
        } else {
            System.out.println("❌ Test échoué : notification incorrecte");
        }

        driver.quit();
    }
}
