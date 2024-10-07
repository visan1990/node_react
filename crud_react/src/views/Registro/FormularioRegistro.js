import React, { useState } from "react";
import { Avatar, Container, Paper, Typography, TextField, Button, Grid, Link, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';

import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios"

const FormularioRegistro = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [ open, setOpen ] = useState( false );
    const [ informacion, setInformacion ] = useState({
        tipo : 'success',
        mensaje : ''
    });

    const onSubmit = ( data, e ) => {
        axios.post("auth/register", data)
        .then( function (res) {
            if (res.status == 200) {
                setOpen( true );
                reset();
                setInformacion( {
                    tipo : 'success',
                    mensaje : res.data.message
                })
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {});
    }

    return (
        <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop : 8, padding : 2 }}>
            <Avatar sx ={{
            mx : "auto",
            textAlign : "center",
            mb : 1  
            }}>
                <CreateIcon />
            </Avatar>
            <Typography component="h5" variant="h5" sx={{ textAlign : "center" }}>
                Agregre la informacion solicitada
            </Typography>
            <hr/>
            <Collapse in={open}>
                <Alert 
                    severity={ informacion.tipo } 
                    action = {
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={ () => {
                            setOpen(false);
                            }}
                        >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <AlertTitle></AlertTitle>
                    { informacion.mensaje }
                </Alert>
            </Collapse>
            <form onSubmit={handleSubmit(onSubmit)} sx = {{ mt : 1 }}>
                <TextField 
                    id="sigin-usuario" 
                    label="Usuario" 
                    variant="filled"
                    type="text"
                    placeholder="Agregue un usuario"
                    fullWidth 
                    error={ errors.usuario?.message }
                    helperText={ errors.usuario?.message }
                    {...register( "usuario", { required: "Complete este campo", maxLength: 80 } ) }
                    sx = {{ mb: 2 }}
                />
                <TextField 
                    id="sigin-password" 
                    label="Contraseña" 
                    variant="filled"
                    type="password"
                    placeholder="Agregue una contraseña"
                    fullWidth 
                    error={ errors.password?.message }
                    helperText={ errors.password?.message }
                    {...register( "password", { required: "Complete este campo", maxLength: 80 } ) }
                    sx = {{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth>REGISTRAR</Button>
                <Grid Container justifyContent='space-between' sx={{ mt : 1 }}>
                    <Grid item>
                        <Link type="button" href="/">Iniciar sesión</Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    );
};

export default FormularioRegistro;
