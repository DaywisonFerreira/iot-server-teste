# Use uma imagem de Node.js como base
FROM node:14.17.6

# Defina o diretório de trabalho para o código do cliente
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (ou yarn.lock) para o contêiner
COPY package*.json ./

# Instale as dependências do cliente
RUN npm install

# Copie o código do cliente para o contêiner
COPY . .

# Exponha a porta que o cliente está ouvindo
EXPOSE 3000

# Comando para iniciar o cliente
CMD ["npm", "start"]
