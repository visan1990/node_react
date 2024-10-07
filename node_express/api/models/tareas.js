//DECLARAMOS INCIALMENTE LA CONEXION A LA BD
const db = require( '../../database/conexion' );

//OBTENEMOS LA LISTA DE TAREAS DEL ID USUARIO ENVIADO
function lTareasxUsuario( idusuario, res ){
    db.query( "SELECT tareas.*, tarea_estatus.nestatus FROM ( SELECT * FROM tareas WHERE estatus_tarea >= 0 ) tareas JOIN tarea_estatus ON tareas.estatus_tarea = tarea_estatus.idestatus JOIN tarea_usuario ON tarea_usuario.idtarea = tareas.idtarea AND tarea_usuario.idusuario = ?", [ idusuario ], ( error, rows ) => {
        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 ).json( {
            tasks: rows
        });
    });
}
/*************************************************/

//CREAMOS UNA NUEVA TAREA EN BASE A LA INFORMACIÓN COMPARTIDA
function nTarea( parametros, res ){    
    db.query( "CALL insert_tarea( ?, ?, ? );", parametros, ( error ) => {
        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 ).json({
            message: 'Se ha creado una nueva tarea.'
        });

    });
}
/*************************************************/

//ACTUALIZAMOS LA INFORMACION DE UNA TAREA APARTIR DE UN ID ENVIADO
function uTarea( data, idtarea, res ){

    let columns = [];
    let parametros = [];

    Object.keys( data ).map( (key, index) => {

        columns.push( key + ' = ?' );
        parametros.push( data[ key ] );

    });

    parametros.push( idtarea );

    return db.query( `UPDATE tareas SET ${columns.join(", ")} WHERE idtarea = ?`, parametros, ( error ) => {
        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 ).json({
            message: 'Se ha actualizado la tarea.'
        });

    });
}
/*************************************************/

//BORRAMOS UNA TAREA EN BASE A UN ID ENVIADO
function bTarea( idtarea, res ){

    return db.query( "UPDATE tareas SET estatus_tarea = -1 WHERE idtarea = ?", [ idtarea ], ( error ) => {
        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 ).json({
            message: 'Se ha borrado la tarea.'
        });

    });
    
}
/*************************************************/

module.exports = {
    lTareasxUsuario,
    nTarea,
    uTarea,
    bTarea
};