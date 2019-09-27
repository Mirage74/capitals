const Koa = require('koa'); // core
const Router = require('koa-router'); // routing
const bodyParser = require('koa-bodyparser'); // POST parser
const serve = require('koa-static'); // serves static files like index.html
const logger = require('koa-logger'); // optional module for logging

const passport = require('koa-passport'); //passport for Koa
const LocalStrategy = require('passport-local'); //local Auth Strategy
//const JwtStrategy = require('passport-jwt').Strategy; // Auth via JWT
//const ExtractJwt = require('passport-jwt').ExtractJwt; // Auth via JWT

//const jwtsecret = "rq?f$_?S7C8ww6Y2FTqcBvvEEM7=DDJh#qjWAbTm8j6F6U=FtU9bpf7_GK!nyAg3Kuw6h8nyb&X*_8wL%jPJ4+5SdtAxbt*kkv-%mS&y3-DfFzEtD*Mq4P^2c9AE^K5xx$!3UqAvVxeGG8CR64?bRH^MH4JHws^z5-CNR5*XvCNgb5KHF57%TxDJuRBu_xv=%-6^aH_LfGw!u9dUgBDmXEQdQu!ZDb6A#Qd*&ueU7Ac7mZet&?d=sZ3-2%!zjv-+"
//const jwt = require('jsonwebtoken'); // auth via JWT for hhtp
//const socketioJwt = require('socketio-jwt'); // auth via JWT for socket.io

//const socketIO = require('socket.io');

const mongoose = require('./libs/mongoose');


const app = new Koa();
const router = new Router();
app.use(serve('public'));
app.use(logger());
app.use(bodyParser());



app.use(async (ctx, next) => {
  const origin = ctx.get('Origin');
  //console.log(ctx.method)
  if (ctx.method !== 'OPTIONS') {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Credentials', 'true');
  } else if (ctx.get('Access-Control-Request-Method')) {
    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Methods', ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS']);
    ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers', 'headers']);
    ctx.set('Access-Control-Max-Age', '42');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.response.status = 200
    //console.log('ctx.response.status', ctx.response.status)
  }
  await next();
});





app.use(passport.initialize()); // initialize passport first
app.use(router.routes()); // then routes
const server = app.listen(process.env.PORT || 4000);// launch server on port  4000


//---------Use Schema and Module  ------------------//

const User = require('./libs/user')

//----------Passport Local Strategy--------------//




passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password',
  session: false
},
  function (displayName, password, done) {
    User.findOne({ displayName }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.checkPassword(password)) {
        return done(null, false, { message: 'User does not exist or wrong password.' });
      }
      return done(null, user);
    })
  })
)

//----------Passport JWT Strategy--------//

// Expect JWT in the http header

//const jwtOptions = {
//  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//  secretOrKey: jwtsecret
//};

//passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
//  User.findById(payload.id, (err, user) => {
//    if (err) {
//      return done(err)
//    }
//    if (user) {
//      done(null, user)
//    } else {
//      done(null, false)
//    }
//  })
//})
//);

//------------Routing---------------//

// new user route


router.param('userByDisplayname', async (displayName, ctx, next) => {
//  let tempUser = await User.findById(id)
//  ctx.userById = tempUser.toObject()
//console.log("testPARAM")

   ctx.userByDisplayname = await User.findOne({ displayName: displayName })

//   console.log("ctx.userByDisplayname : ", ctx.userByDisplayname)
  if (!ctx.userByDisplayname) {
    ctx.userByDisplayname = {displayName : "NOT_EXIST_USER"}
  }
  await next();
})




router.post('/user', async (ctx, next) => {
  let user
  try {
    user = await User.findOne({ displayName: ctx.request.body.displayName })
  }

  catch (err) {
    ctx.status = 400
    console.log(err)
    ctx.body = err
  }

  if (!user) {
    try {
      let user = await User.create(ctx.request.body)
      ctx.body = user.toObject();
    }
    catch (err) {
      ctx.status = 400
      console.log(err)
      ctx.body = err
    }
  } else {
    ctx.body = `User with "displayName" ${ctx.request.body.displayName} already exist !`
  }
});

// local auth route. Creates JWT is successful






router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', function (err, user) {
    if (user == false) {
      ctx.body = "Login failed";
    } else {
      //--payload - info to put in the JWT
//      const payload = {
//        id: user.id,
//        displayName: user.displayName
        
//      };
//      const token = jwt.sign(payload, jwtsecret); //JWT is created here

//      ctx.body = { user: user.displayName, token: 'JWT ' + token };
      console.log("user : ", user.displayName)
      ctx.body = { user: user.displayName};
    }
  })(ctx, next);

});


router.get('/:userByDisplayname',  async function(ctx) {
  ctx.body = ctx.userByDisplayname.displayName
})


router.put('/:userByDisplayname',  async function(ctx) {
console.log("PUT PUT PUT")
//  console.log("ctx.request.body", ctx.request.body)

    const user = await User.updateOne({_id:ctx.userByDisplayname._id}, ctx.request.body.data);
    console.log("user", user.nModified) 

    ctx.body = user.nModified
})






//---Socket Communication-----//
//let io = socketIO(server);

//io.on('connection', socketioJwt.authorize({
//  secret: jwtsecret,
//  timeout: 15000
//})).on('authenticated', function (socket) {

//  console.log('this is the name from the JWT: ' + socket.decoded_token.displayName);

//  socket.on("clientEvent", (data) => {
//    console.log(data);
//  })
//})
