const config = require('./config')
const koa = require('koa')
const koarouter = require('koa-router')
const request = require('request')
// const qs=require('koa-qs')

const app = new koa()
const router = new koarouter()

// Functions------------------------------------------------
const invokeLoginDialogue = async (ctx) => {
    // console.log('Called - invokeLoginDialogue');
    ctx.redirect(`https://www.facebook.com/v3.2/dialog/oauth?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&state=${config.TEMP_STATE}`)
}

const exchangeCodeForAccessToken = (code) => {
    // console.log('Exchange of code initiated');
    let ans = request.get(`https://graph.facebook.com/v3.2/oauth/access_token?client_id=${config.INSTAGRAM_CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&client_secret=${config.APP_SECRET}&code=${code}`, (err, response, body) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(body)
    })
}

const receiveToken = async (ctx) => {
    // console.log('Called /receiveToken ')

    let code = (ctx.querystring).substr(5)
    exchangeCodeForAccessToken(code)
}

const welcome = async (ctx) => {
    ctx.body =
        `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Instagram authentication</title>
    </head>
    <body>
      <h1>Welcome to insta auth</h1>
      <a href='https://www.facebook.com/v3.2/dialog/oauth?client_id=2291847451087586&redirect_uri=http://localhost:3000/insta/auth/get'>Authenticate here</a>
    </body>
    </html>`
}


//Routes------------------------------------------------

router.get('/', welcome)//Invoke login dialogue via frontend
router.get('/insta/auth/', invokeLoginDialogue)//Invoke login dialogue via backend

router.get('/insta/auth/get/', receiveToken)
app.use(router.routes())
app.listen(config.SERVER_PORT)