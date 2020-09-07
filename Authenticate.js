const router = require("express").Router();
const db = require('./queries').pool
const jwt = require('jsonwebtoken');

router.post('/register',async (request,response)=>{
    let chek = 'SELECT COUNT(*) AS cnt FROM useit WHERE username =\''+ request.body.username+ '\';';
    console.log(chek)
    let { rows } = await db.query(chek)
    var ans = rows[0].cnt;
    //console.log(ans);
    if(ans>0)
    {
      success: false,
      response.send('Already Registered')
      // response.send(200).json({
      //   success: false,
      //   message: 'Already Registered'
      //});
    }else
    {
      let sql4 = 'INSERT INTO USEIT (name,username,password) VALUES (\''+request.body.name+'\',\''+request.body.username+'\',\''+request.body.password+'\');'
      let queryreg = db.query(sql4,(err,res)=>{
        if(err)
         throw err;
        response.send(JSON.stringify({"status":200,"response":res.rows}))
     })
    }
})
router.post('/login',async (req,res)=>{
    // For the given username fetch user from DB
    // console.log(req)
    // console.log(req.body)
    let getUserFromDb = 'SELECT COUNT(*) AS cnt FROM useit WHERE username =\''+ req.body.username+ '\';';
    let { rows } = await db.query(getUserFromDb)
    var ans = rows[0].cnt;
    // console.log(ans);
    //console.log(ans,"ans");
    //console.log(mockedUsername);
    if (req.body.username && req.body.password)
    {
        if (ans>0) {
            let dbpass= 'SELECT password FROM useit where username=\''+req.body.username+'\';';
            let { rows } = await db.query(dbpass)
           //console.log(rows, "radsaa")
            if(rows[0].password===req.body.password){
               let token = jwt.sign({username:req.body.username},
               process.env.SECRET,
               { expiresIn: '24h' // expires in 24 hours
               }
               );
            // return the JWT token for the future API calls
               res.status(200).json({
               success: true,
               message: 'Authentication successful!',
               token: token
               });
            }
            else{
               res.status(403).send({
               success:false,
               message: 'Incorrect Password'
               })
            }
        } 
        else
        {
          res.status(403).send({
          success: false,
          message: 'Incorrect username or password'
          });
        }
    }
    else 
    {
       res.status(400).json({
       success: false,
       message: 'Authentication failed! Please check the request'
       });
    }
    })
router.get('/authenticate',(req,res)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          return res.json({
            success: true,
            message:'Successfully verified'
          })
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  })
  module.exports = router;