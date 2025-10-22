// src/test/java/com/example/backend/TestConfig.java
@TestConfiguration
public class TestConfig {
    
    @Bean
    @Primary
    public UserService userService() {
        return Mockito.mock(UserService.class);
    }
    
    // Add other mock beans as needed
}
