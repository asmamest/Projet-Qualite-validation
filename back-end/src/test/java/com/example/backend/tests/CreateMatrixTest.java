package com.example.backend.tests;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
public class CreateMatrixTest {
    public static void main(String[] args) {
        // 1. Configurer le driver Chrome
        System.setProperty("webdriver.chrome.driver","C:/Users/ASUS/Desktop/chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        try {
            // 2. Ouvrir l'application
            driver.get("http://localhost:8083/login");

            // 3. Connexion
            driver.findElement(By.id("username")).sendKeys("direction");
            driver.findElement(By.id("password")).sendKeys("motdepasse");
            driver.findElement(By.id("loginButton")).click();

            // 4. Naviguer vers la section "Matrices de suivi"
            driver.findElement(By.id("menuMatrices")).click();
            driver.findElement(By.id("createMatrixButton")).click();

            // 5. Remplir le formulaire
            driver.findElement(By.id("matrixName")).sendKeys("Matrice Test Selenium");
            Select niveau = new Select(driver.findElement(By.id("niveauSelect")));
            niveau.selectByVisibleText("Niveau 1");
            Select specialite = new Select(driver.findElement(By.id("specialiteSelect")));
            specialite.selectByVisibleText("Informatique");

            // 6. Soumettre le formulaire
            driver.findElement(By.id("submitMatrix")).click();

            // 7. Vérifier que la matrice est créée
            WebElement confirmation = driver.findElement(By.xpath("//table//td[text()='Matrice Test Selenium']"));
            if (confirmation.isDisplayed()) {
                System.out.println("Test réussi : Matrice créée !");
            } else {
                System.out.println("Test échoué : Matrice non trouvée.");
            }

        } finally {
            // 8. Fermer le navigateur
            driver.quit();
        }
    }
}
