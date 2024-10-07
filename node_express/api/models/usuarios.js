const db = require( '../../database/conexion' );
const jwt = require( 'jsonwebtoken' );


function loginUser( parametros, res ){
    db.query( 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?', parametros, ( error, rows ) => {

        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 );

        if( rows.length ){
            try{
                res.json( {
                    message: "Inicio de sesion correcto.",
                    token: jwt.sign( {
                        'usuario' : parametros[0],
                        'password' : parametros[1],
                    }, 'shhh_llave_secreta' ),
                    idusuario : rows[0].idusuario
                });
            } catch (error) {
                res.status(500).json({ error: 'Algo ha ocurrido' });
            }
        }else{
            res.json( {
                message: "Alguna de las crenciales es incorrecta.",
                token: false
            });
        }

    });
}

function loginResgister( parametros, res ){
    db.query( "INSERT INTO usuarios (`usuario`, `password` ) VALUES ( ?, ? );", parametros, ( error ) => {
        if( error ){
            console.log( error );
            res.status( 500 );
        }

        res.status( 200 ).json({
            message: 'Se ha dado de alta correctamente.'
        });

    });
}

module.exports = {
    loginUser,
    loginResgister
}