
## IBLUEIT 🐬

### Instalação com Docker-Compose

Este repositório contém os artefatos necessários para executar o IBLUEIT utilizando o Docker.
Antes de mais nada, será necessário instalar alguns pré-requisitos, se ainda não estiverem instalados:

- Instale o [Docker](https://docs.docker.com/install/)
- Faça o download do arquivo [docker-compose.yml](https://github.com/unisocisec/Blue_It_BackEnd/blob/main/docker-compose.yml "docker-compose.yml").

Em seguida parametrize as variáveis de ambiente conforme a sua necessidade seguindo o exemplo abaixo:

```yaml
version: '3.3'

services:
  iblueit-mongo:
    image: mongo
    container_name: iblueit-mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: 'usuarioiblueit' #Usuario
      MONGO_INITDB_ROOT_PASSWORD: 'senhaiblueit' #Senha do banco de dados

  iblueit-proxy:
    image: iblueit/proxy:latest
    container_name: iblueit-proxy
    ports:
     - "7071:80"

  iblueit-api:
    image: iblueit/api:latest
    container_name: iblueit-api
    ports:
      - "8080:80"
    environment:
      MongoDbAtlas: 'mongodb://usuarioiblueit:senhaiblueit@iblueit-mongo/?retryWrites=true&w=majority' #Alterar Usuario e senha (linha: 10 e 11)
      SMTP_Server_Hostname: 'seudominio.com' #Servidor de emails
      SMTP_Server_Username: 'service@seudominio.com' #Usuario email
      SMTP_Server_Password: 'Teste@123' #Senha email
      URL_API_IA: 'http://iblueit-ia:5000/' #iblueit-ia + porta (linha: 48)
    links:
      - "iblueit-mongo:iblueit-mongo"
      - "iblueit-ia:iblueit-ia"

  iblueit-front:
    image: iblueit/front:latest
    container_name: iblueit-front
    ports:
      - "3000:80"
    environment:
      API_URL: 'http://localhost:7071/api' #localhost + iblueit-proxy porta (linha: 23)
    links:
      - "iblueit-api:iblueit-api"

   iblueit-ia:
    image: iblueit/ia:latest
    container_name: iblueit-ia
    ports:
      - "5000:5000"
    environment:
      MongoDbAtlas: 'mongodb://usuarioiblueit:senhaiblueit@iblueit-mongo/?retryWrites=true&w=majority' #Alterar Usuario e senha (linha: 10 e 11)
    links:
      - "iblueit-api:iblueit-api"
```

Utilize o Docker para carregar e depois disponibilizar todos os serviços necessários ao funcionamento do IBLUEIT:

```
$ docker-compose up
```

Pronto, o IBLUEIT estará ativo. Para acessá-lo, aponte o navegador Google Chrome para http://localhost:7071/

Registre-se e faça o seu login

### Docker Repositories

- Aplicação (BackEnd) [iblueit-api](https://hub.docker.com/repository/docker/iblueit/api)
- Interface gráfica (FrontEnd) [iblueit-front](https://hub.docker.com/repository/docker/iblueit/front)
- Inteligência artificial [iblueit-ia](https://hub.docker.com/repository/docker/iblueit/ia)
- Intermediário de comunicação [iblueit-proxy](https://hub.docker.com/repository/docker/iblueit/proxy)
- Banco de dados [MongoDB](https://hub.docker.com/_/mongo)

### Demonstrativo Containers

![Demonstrativo Containers](https://github.com/unisocisec/Blue_It_BackEnd/blob/main/containers.png?raw=true)
