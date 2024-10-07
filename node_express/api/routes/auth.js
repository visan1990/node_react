const express = require ( 'express' );
const usuario = require( '../models/usuarios' )

const router = express.Router();

const rutas = [
    {
        'rute' : '/login',
        'function' : ( req, res ) => {
            usuario.loginUser([
                req.body.usuario,
                req.body.password,
            ], res );
        },
        'method' : 'post'
    },
    {
        'rute' : '/register',
        'function' : ( req, res ) => {
            usuario.loginResgister([
                req.body.usuario,
                req.body.password,
            ], res );
        },
        'method' : 'post'
    }
];

rutas.forEach( ( ruta ) => {
    router[ ruta.method ]( ruta.rute, ruta.function );
});

module.exports = router;