FROM node:18 AS build-stage

# Définir le répertoire de travail
WORKDIR /app

# 1. Copier uniquement les fichiers de dépendances d'abord
COPY front-end/package.json front-end/package-lock.json ./

# 2. Installer les dépendances
RUN npm install -g @angular/cli && \
    npm install

# 3. Copier tout le reste du projet
COPY front-end/ .

# Exposer le port
EXPOSE 4200

# Commande de démarrage
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
