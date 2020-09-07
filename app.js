const express = require('express')
const { request, response } = require('express')
const app = express()
const db = require('./queries').pool
const port = 3000
app.use(express.json());
const jwt = require('jsonwebtoken')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/Route_Practice', (req, res) => {
  res.send('Hello World!')
})
const deptRoute = require("./Department") 
const authRoute = require("./Authenticate") 
app.use('/api',deptRoute)
app.use('/api',authRoute)
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})