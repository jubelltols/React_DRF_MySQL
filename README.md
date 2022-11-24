# React_DRF_MySql

# ¿Que es React_DRF_MySql?

React_DRF_MySql es el tercer proyecto del curso 2 DAW. Se trata de una plataforma de alquiler de bicicletas. Esta formada por dos partes:
 - Cliente: parte en la que se puede realizar el alquiler de bicicletas y enviar incidencias. 
 - Administrador: parte en la que hay una dashboard con estadisticas y se puede administar las bicicletas, estaciones, slots y incidencias 

![dashboard](https://github.com/jubelltols/React_DRF_MySql/blob/main/React/onbici/public/onbici-1.png)
![CRUD stations](https://github.com/jubelltols/React_DRF_MySql/blob/main/React/onbici/public/onbici-4.png)
![Rent a bike list](https://github.com/jubelltols/React_DRF_MySql/blob/main/React/onbici/public/onbici-2.png)
![Remt a bike Google Maps](https://github.com/jubelltols/React_DRF_MySql/blob/main/React/onbici/public/onbici-3.png)

# Instalación

## Requisitos

* Python
* Pip
* Mysql
* NodeJS 
* NPM 

Clonar el repositorio

```
    git clone https://github.com/jubelltols/React_DRF_MySql.git
```

## Backend

Crear .env en la carpeta /React_DRF_MySql/DRF/src/onbici

```
    DJANGO_SECRET_KEY=django_secret_key
    DATABASES_NAME=onbic
    DATABASES_USER=user
    DATABASES_PASSWORD=password
    DATABASES_HOST=localhost
    DATABASES_PORT=port
```

Comandos terminal

```
    cd React_DRF_MySql
    virtualenv DRF --python=python
    cd DRF
    Scripts/activate
    cd src
    pip install -r requirements.txt
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver
```

## Frontend

Crear .env en la carpeta /React_DRF_MySql/React/onbici/src

```
    GOOGLE_MAPS_APIKEY=your_google_apikey
```

Comandos terminal

```
    cd React_DRF_MySql/React/onbici
    npm install
    npm run start
```

# Tecnologias

## Frontend

* React
    * Hooks
        * UseContext
        * UseState
        * UseEffect
        * UseCallback
    * Components
    * React-boostrap
    * React-hook-forms
    * React-google-maps
    * React-router-dom
    * Suspense
    * Lazy Load
    * Guard 
    * Axios
    * Char.js

## Backend

* Django Rest Framework
    * Djangorestframework-simplejwt
    * Django-cors-headers
    * Django-environ
    * Serializers
    * File Upload
    * Permissions

## Databases

* MySql

# Modulos

| Modules | Description |
|------|-----------------------------------------------------|
| User | Login, Register, Change Password and Update profile |
| Rent | Rent a bike, Incidences and Google Maps |
| Bike | Create, Read, Update, Change Status and Delete bike |
| Stations | Create, Read, Update, Change Status and Delete stations |
| Slot | Create, Read, Update, Change Status and Delete slot |
| Incidences |  Create, Read, End incidence and Delete incidence |
| Notification | List notification and Alert new notification |
| Dashboard | Charts, List last 10 rent and Most used stations  |

# Autor

[jubelltols - jubelltols@gmail.com](https://github.com/jubelltols/)
