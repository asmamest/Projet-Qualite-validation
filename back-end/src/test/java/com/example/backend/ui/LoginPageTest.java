package com.example.backend.ui;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class LoginPageTest {

    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Configuration simple pour Chrome
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        // options.addArguments("--headless"); // Enlevez le // devant pour ne pas voir la fenêtre

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
    }

    @Test
    public void testAffichagePageLogin() {
        // 1. Ouvrir le site Angular
        driver.get("http://localhost:4200/login"); 
        // Si ça ne marche pas, essayez juste "http://localhost:4200"

        // 2. Vérifier que l'URL contient bien "login" ou que la page s'affiche
        System.out.println("Titre de la page : " + driver.getTitle());

        // 3. Vérifier la présence d'un champ input (peu importe lequel pour ce test simple)
        boolean champInputPresent = !driver.findElements(By.tagName("input")).isEmpty();
        
        assertTrue(champInputPresent, "Il devrait y avoir au moins un champ de texte pour se connecter");
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}