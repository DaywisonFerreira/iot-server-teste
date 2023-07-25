# Use uma imagem de Node.js como base
FROM node:14.17.6

# Defina o diretório de trabalho para o código do servidor
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (ou yarn.lock) para o contêiner
COPY package*.json ./

# Instale as dependências do servidor
RUN npm install

# Copie o código do servidor para o contêiner
COPY . .

# Copie o arquivo simulator.js para o diretório de trabalho do contêiner
COPY src/simulator.js .

# Exponha a porta que o servidor está ouvindo
EXPOSE 4000

# Comando para iniciar o servidor e o arquivo simulator.js
CMD ["sh", "-c", "node src/simulator.js & npm start"]
