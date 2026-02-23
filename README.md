
# Description

<img src="./public/chess_icon.svg" alt="Game Icon" width="50" height="50">



# Requirements
Node 20.20.0+

# Install
Their are two options for running this project, using docker or the manual installment.

# Docker Installment
The main entry point is the database microservice
```bash
git clone git@github.com:19floresa/chess_database.git
```
```bash
cd chess_database
```
## Configure `.env`

```
PORT=XXX
NODE_ENV=development
DATABASE_USERNAME=XXX
DATABASE_PASSWORD=XXX
DATABASE_NAME=XXX
DATABASE_PORT=XXX
```
## Configure `docker-compose.yaml`
```
POSTGRES_PASSWORD: XXX # Same as DATABASE_PASSWORD
POSTGRES_USER: XXX # Same as DATABASE_USERNAME
POSTGRES_DB: XXX # Same as DATABASE_NAME
```
## Run the application
```
docker compose build  && docker compose up
```

## Website
In order to play, first register/login, then go to the 'Vs' tab to face off against another player.
```
http://localhost:3000/
```

# Manual Installment
```bash
mkdir chess_app
```
```bash
cd chess_app
```

```bash
git clone git@github.com:19floresa/chess_microservice.git
```
```bash
git clone git@github.com:19floresa/chess_game_server.git
```
```bash
git clone git@github.com:19floresa/chess_player_server.git
```
```bash
git clone git@github.com:19floresa/chess_database.git
```

In seperate terminals, run the following servers:

## Front End Server
```bash
cd chess_microservice
```

```bash
npm i
```

```bash
npm run dev
```

## Game Server

```bash
cd chess_game_server
```

```bash
npm i
```

```bash
npm run dev
```

## Player Server

```bash
cd chess_player_server
```

```bash
npm i
```

```bash
npm run dev
```

## Databse Server

```bash
cd chess_database
```

```bash
npm i
```

```bash
npm run dev
```

# Troubleshooting

## Postgres
If you are running a database locally, you can temporarly stop it with the following command.
```bash
sudo systemctl stop postgresql
```