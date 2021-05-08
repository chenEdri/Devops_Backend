const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require ('path')

const app = express()
const http = require('http').createServer(app);
// const port = 3030

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('public')) 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const itemRoutes = require('./api/item/item.routes')
const cartRoutes = require('./api/cart/cart.routes')
const saleRoutes = require('./api/sale/sale.routes')


// routes
app.use('/api/item', itemRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/sale', saleRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});


