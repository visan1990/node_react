import React, { useEffect } from 'react';
import { Box, TextField, Button, Modal, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';

import AddTaskIcon from '@mui/icons-material/AddTask';

import { useForm } from "react-hook-form";

import axios from '../utils/axios';
import { useAuth } from "../auth/AuthProvider";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TareasFormulario = ( props ) => {

    const { open, cerrarVentada, infoTarea, updateTareas } = props;
    const authUser = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = ( data ) => {
        if( infoTarea?.idtarea )
            axios.put("tasks/" + infoTarea?.idtarea, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authUser.authUser.token
                }
            })
            .then( function (res) {
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {});
        else
            data[ 'idusuario' ] = authUser.authUser.user
            axios.post("tasks", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authUser.authUser.token
                }
            })
            .then( function (res) {
                if (res.status == 200) {
                    
                }
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(function () {});

        updateTareas();
        cerrarVentada();
    }

    useEffect( () => {
        setValue( 'titulo_tarea', infoTarea.titulo_tarea );
        setValue( 'descripcion_tarea', infoTarea.descripcion_tarea )
    })

    return (
        <Modal
            open={open}
            onClose={ cerrarVentada }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Avatar sx ={{
                mx : "auto",
                textAlign : "center",
                mb : 1  
                }}>
                    <AddTaskIcon />
                </Avatar>
                <Typography component="h6" variant="h6" sx={{ textAlign : "center" }}>
                    Coloque la información solicitada
                </Typography>
                <hr/>
                <form onSubmit={handleSubmit(onSubmit)} sx = {{ mt : 1 }}>
                    <TextField 
                        id="tarea-titulo" 
                        label="Titulo tarea" 
                        variant="filled"
                        onChange={ ( event ) => {
                            setValue( 'titulo_tarea', event.target.value )
                        } }
                        sx = {{ mb: 2 }}
                        error={ errors.titulo_tarea?.message }
                        helperText={errors.titulo_tarea?.message}
                        fullWidth
                        {...register( "titulo_tarea", { required: "Complete este campo", maxLength: 50 } ) }
                    />
                    <TextField 
                        id="tarea-descripcion" 
                        label="Descripcion tarea"
                        variant="filled"
                        onChange={ ( event ) => {
                            setValue( 'descripcion_tarea', event.target.value )
                        } }
                        fullWidth
                        sx = {{ mb: 2 }}
                        error={ errors.descripcion_tarea?.message }
                        helperText={errors.descripcion_tarea?.message}
                        {...register( "descripcion_tarea", { required: "Complete este campo", maxLength: 100 } ) }
                    />
                    <Button type="submit" variant="contained" fullWidth>REGISTRAR</Button>
                </form>
            </Box>
        </Modal>
    )
}

TareasFormulario.propTypes={
    open : PropTypes.bool.isRequired,
    cerrarVentada : PropTypes.func.isRequired
}

export default TareasFormulario;