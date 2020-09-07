const router = require("express").Router();
const db = require('./queries').pool
const jwt = require('jsonwebtoken')
router.get('/fetchData', (request, response) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            //console.log(err)
          response.send('token invalid')
        }
        else{
          let sql = 'SELECT * FROM DEPARTMENT';
          let query = db.query(sql , (err,res)=>{
            if(err) throw err;
              response.send(JSON.stringify({"status":200,"response":res.rows}))
          })
        }
      });
    }
    else {
      return response.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
    })
router.post('/addData',(request,response) =>{
    //    console.log(request.body);
    //    response.send(JSON.stringify({"status":200,}))
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    //console.log(token)
    // Express headers are auto converted to lowercase
      // if (token.startsWith('Bearer ')) {
      //   // Remove Bearer from string
      //   token = token.slice(7, token.length);
      // }
      if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
            //console.log(err)
           response.send('token invalid')
          } else {
           // request.decoded = decoded;
            //console.log(request.decoded,"nss")
           // response.send('successfully ferified')
              message:'Successfully verified'
              let sqll = 'INSERT INTO DEPARTMENT (id,dept,emp_id) VALUES ('+request.body.id+',\''+request.body.dept+'\','+request.body.emp_id+');';
      //console.log(sqll,"jjkk");
        let queryy = db.query(sqll , (err,res)=>{
         // console.log(queryy,"nhu")
          //console.log(request.body,"ujujx")
            if(err) throw err;
            response.send(JSON.stringify({"status":200, "response":res.rows}))
        })
          }
        });
      } else {
        return response.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
        // console.log(request.body.id);
        // console.log(request.body.dept);
        // console.log(request.body.emp_id);
    })
    router.put('/updateData',(request,response) =>{
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
          jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
              //console.log(err)
             response.send('token invalid')
            }
            else{
              let sqlll = 'UPDATE DEPARTMENT SET emp_id = 5 WHERE id ='+ request.body.id;
        console.log(sqlll);
        let queryyy = db.query(sqlll,(err,res) =>{
          if(err) throw err;
          response.send(JSON.stringify({"status":200,"response":res.rows}))
        })
            }
          });
        }
        else {
          return response.json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
      })
      router.delete('/deleteData',(request,response) =>{
        let token = request.headers['x-access-token'] || request.headers['authorization'];
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
          jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
              //console.log(err)
             response.send('token invalid')
            }
            else{
              let sqllll = 'DELETE FROM DEPARTMENT WHERE id ='+request.body.id;
              console.log(sqllll);
              let queryyyy = db.query(sqllll,(err,res) =>{
                if(err) throw err;
                response.send(JSON.stringify({"status":200,"response":res.rows}))
              })
            }
          });
        }
        else {
          return response.json({
            success: false,
            message: 'Auth token is not supplied'
          });
        }
      })
      module.exports=router;
      
        
      
    