const express = require ( 'express' );
const router = express.Router();
const jwt = require( 'jsonwebtoken' );

const tareas = require( "../models/tareas" );

const rutas = [
    {
        'rute' : '/:id',
        'function' : ( req, res ) => {
            tareas.lTareasxUsuario( req.params.id, res )
        },
        'method' : 'get'
    },
    {
        'rute' : '/',
        'function' : ( req, res ) => {
            tareas.nTarea([
                req.body.titulo_tarea,
                req.body.descripcion_tarea,
                req.body.idusuario,
            ], res );
        },
        'method' : 'post'
    },
    {
        'rute' : '/:id',
        'function' : ( req, res ) => {
            tareas.uTarea( req.body, req.params.id, res )
        },
        'method' : 'put'
    },
    {
        'rute' : '/:id',
        'function' : ( req, res ) => {
            tareas.bTarea( req.params.id, res );
        },
        'method' : 'delete'
    }
];

rutas.forEach( ( ruta ) => {
    router[ ruta.method ]( ruta.rute, ruta.function );
});

module.exports = router;