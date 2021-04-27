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


let middlewarePath = Path.join(__dirname, "middleware")

Fs.readdir(middlewarePath, (err, files)=>{
  if(err) throw new Error(err)
  files.forEach(route =>{
    const filePath = Path.join(middlewarePath, route)
    const Middleware = require(filePath)
    if(Middleware.middleware && Middleware.forAll) application.use(Middleware.middleware)
  })
})


application.use(Express.json())
application.use(Express.urlencoded({extended: true}))
application.use(CookieParser())

//Settings
application.listen(PORT)
application.set('view engine', 'ejs')
application.set('views', Path.join(__dirname, "views"))

application.use(Express.static(Path.join(__dirname, "public")))


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