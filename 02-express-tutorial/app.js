/*console.log('Express Tutorial')
const {readFileSync, read} = require('node:fs');
const http = require('node:http');

//get all files
const homePage = readFileSync('./navbar-app/index.html')
const styleSheet = readFileSync('./navbar-app/styles.css');
const img = readFileSync('./navbar-app/logo.svg');
const logic = readFileSync('./navbar-app/browser-app.js')



const server = http.createServer((req, res) =>{
  
    const url =  req.url;

    if(url === "/"){
        res.writeHead(200, {"content-type":'text/html'} );
        res.write(homePage)
   
        res.end()
        return
    } else if(url === "/styles.css"){
        res.writeHead(200, {"content-type":'text/css'} );
        res.write(styleSheet)
        res.end()
        return
    } else if(url === "/logo.svg"){
        res.writeHead(200, {"content-type":'image/svg+xml'} );
        res.write(img)
        res.end()
        return
    }  else if(url === "/browser-app.js"){
        res.writeHead(200, {"content-type":'text/javascript'} );
        res.write(logic)
        res.end()
        return
    }

  
})

server.listen(5000);
*/

/*const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Homepage');
})

app.get('/about', (req, res)=>{
    res.send('About Page');
})

app.all('*', (req, res)=>{
    res.status(404).send('<h1>Page not found</h1>');
})


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000')
})
*/


//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen


/*
const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('./public'));

app.get('/', (req, res)=>{

    res.sendFile(path.resolve(__dirname, './navbar-app/index.html' ))
  
})

app.all('*', (req, res)=>{
    res.status(404).send('resource unavailable');
})


app.listen(5000, ()=>{
    console.log('server is listening on port 5000');
})
*/

/*
const express = require('express');
const app = express();
const {products} = require('./data.js');

app.get('/', (req, res)=>{
    res.send('<h1>Homepage</h1><a href="/api/products">products</a>');
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product
        return {id, name, image}
    })
    res.json(newProducts)
})


app.get('/api/products/:productID', (req, res)=>{
  
    //console.log(req.params);
    const {productID} = req.params; //Extracting Product ID from 
    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    )
    if(!singleProduct){
        return res.status(404).send('Product does not exist')
    }
    console.log(singleProduct)
    res.json(singleProduct)
})



app.get('/api/v1/query', (req,res)=>{
    console.log(req.query);
    const {search, limit} = req.query;
   
    let sortedProducts = [...products];

    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search);
    })

    if(limit){
            sortedProducts = sortedProducts.slice(0, Number(limit))
    }

    if(sortedProducts.length<1){
        //res.status(200).send('No products matched your search');
        return res.status('200').json({success:true, data:[]})
    }


        res.status(200).json(sortedProducts);
    }


    //res.send('hello world')
})


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000');
})


*/

/*
const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require ('./logger')
const authorize = require ('./authorize')
//req => middleware => res

app.use(morgan('tiny'));
//app.use('/api', [logger, authorize]);


app.get('/',  (req, res)=>{
    res.send('Home')
})

app.get('/about',  (req, res) => {
    res.send('About')
})

app.get('/api/products',  (req, res) => {
    res.send('Products');
})

app.get('/api/items',  (req, res)=>{
    res.send('Items');
})

app.listen(5000, ()=>{
    console.log('Server is listening in on port 5000')
})

*/

const express = require('express');
const app = express();
const people = require('./routes/people')
const auth = require('./routes/auth');

//static assets
app.use(express.static('./methods-public'))
//Parse form data
app.use(express.urlencoded({extended: false}))
//Parse JSON
app.use(express.json())

//use /api/people/* route
app.use('/api/people', people);
//use /login route 
app.use('/login', auth);



//---------------------------------------------------------------------



app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})