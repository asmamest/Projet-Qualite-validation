package com.example.backend.tests;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
public class EtatParDepartementTest {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:/Users/ASUS/Desktop/chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:8083"); // URL de ton application

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Sélection du département
        Select departementDropdown = new Select(driver.findElement(By.id("departementSelect")));
        departementDropdown.selectByVisibleText("Informatique");

        // Sélection du niveau
        Select niveauDropdown = new Select(driver.findElement(By.id("niveauSelect")));
        niveauDropdown.selectByVisibleText("Licence 3");

        // Cliquer sur le bouton pour afficher
        WebElement afficherButton = driver.findElement(By.id("afficherButton"));
        afficherButton.click();

        // Attendre que le tableau des états apparaisse
        WebElement table = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("etatTable"))
        );

        // Récupérer les lignes du tableau
        List<WebElement> rows = table.findElements(By.tagName("tr"));

        // Vérifier le contenu (exemple: vérifier au moins une ligne)
        if (rows.size() > 1) { // première ligne = header
            System.out.println("✅ Test réussi : états affichés pour le département et niveau sélectionnés");
            for (WebElement row : rows) {
                System.out.println(row.getText());
            }
        } else {
            System.out.println("❌ Test échoué : aucun état affiché");
        }

        driver.quit();
    }
}
