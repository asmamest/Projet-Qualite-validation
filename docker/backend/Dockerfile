FROM eclipse-temurin:17-jdk-jammy as builder

# Copier tout le backend
WORKDIR /workspace
COPY back-end .

# Builder l'application
RUN chmod +x mvnw && \
    ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
