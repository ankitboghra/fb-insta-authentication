# fb-insta-authentication
Manual login flow for authentication - using backend only, using Node js, Koa js

## Prerequisites
- node js
- npm

## Installation
Clone the repository and install the dependencies.

```
git clone https://github.com/ankitboghra/fb-insta-authentication.git
npm install
```
Setup your config file, as shown in the sample config file. And then you can run the app

```
npm start
```
OR
```
node app.js
```


## Use

### GET / 

To invoke the facebook login dialogue(via Frontend)


### GET /insta/auth/
To invoke the facebook login dialogue(directly from backend)

### GET /insta/auth/get/
To receive the code(exchanged later to get authentication token) from the login dialogue redirect
