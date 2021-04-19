const Express = require('express')
const CookieParser = require('cookie-parser')
const Path = require('path')
const Fs = require('fs')
require('dotenv').config({ path: Path.join(__dirname, ".env") })
const PORT = process.env.PORT

if(!PORT){
  throw new ReferenceError("PORT is not defined")
}
console.log(PORT);

const application = Express()

// const __dirname = Path.join(Path.resolve(),"src")


//Middlewares
application.use(Express.json())
application.use(Express.urlencoded({extended: true}))
application.use(CookieParser())

//Settings
application.listen(PORT)
application.set('view engine', 'esj')
application.set('views', Path.join(__dirname, "views"))


//Routes
const RoutesPath = Path.join(__dirname, "routes")

Fs.readdir(RoutesPath, (err, files)=>{
  if(err) throw new Error(err)
  files.forEach(route =>{
    const RoutePath = Path.join(__dirname, "routes", route)
    const Route = require(RoutePath)
    if(Route.path && Route.router) application.use(Route.path, Route.router)
  })
})