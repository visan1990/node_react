const express = require( 'express' );
const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const cors = require('cors')

const app = express();

const taskRoutes = require( './api/routes/tasks' );
const loginRoutes = require( './api/routes/auth' );
/*******************************/

app.use(cors())

app.use( morgan( 'dev' ) );
app.use( bodyParser.urlencoded({
    extended: false
}));
app.use( bodyParser.json());
/*******************************/

app.use( ( req, res, next ) => {

    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 
        'Access-Control-Allow-Header', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    
    if( req.method === 'OPTIONS' ){
        res.header( 'Access-Control-Allow-Methods',
            'GET, POST, DELETE, PUT, PATCH'
        );

        //return res.status( 200 ).json({});
    }

    next();

});
/*******************************/

//FUNCION PARA VERIFICAR EL TOKEN
function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if ( !token ) 
        return res.status(401).json({ error: 'Acceso negado' });

    try {        
        jwt.verify(token, 'shhh_llave_secreta');
        next();
    } catch (error) {
        console.log( error.message );
        res.status(401).json({ error: 'Token invalido' });
    };
};
/*******************************/

//RUTAS A USAR
app.use( '/tasks', verificarToken, taskRoutes );
app.use( '/auth', loginRoutes );
/*******************************/

//ERROR GLOBAL 404 EN CASO QUE NO SE ENCUENTRE LA RUTA QUE DESE ACCEDER
app.use( ( req, res, next ) => {
    const error = new Error( 'No encontrado' );
    error.status = 404;
    next( error );
});
/*******************************/

//ERROR GLOBAL 500 EN CASO QUE HAYA OCURRIDO ALGO, ENVIAMOS EL MENSAJE
app.use( ( error, req, res, next ) => {
    res.status( error.status || 500 );
    res.json( {
        error: {
            message: error.message
        }
    });
});
/*******************************/

module.exports = app;