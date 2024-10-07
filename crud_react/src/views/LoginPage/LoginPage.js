import React, { useState } from "react";

import { Avatar, Container, Paper, Typography, TextField, Button, Grid, Link, IconButton  } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import CloseIcon from '@mui/icons-material/Close';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';

import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthProvider";
import axios from "../../utils/axios"

const LoginPage = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ open, setOpen ] = useState( false );
  const [ informacion, setInformacion ] = useState({
      tipo : 'success',
      mensaje : ''
  });

  const authUser = useAuth();

  const onSubmit = ( data, e ) => {
      axios.post("auth/login", data )
      .then( function (res) {
          if (res.status == 200) {
              setOpen( true );

              if( res.data.token != false ){

                localStorage.setItem("token", res.data.token );
                localStorage.setItem("idusuario", res.data.idusuario );

                authUser.setisLoggedIn( true );
                authUser.setAuthUser( {
                  token : res.data.token,
                  user : res.data.idusuario
                });

                setInformacion( {
                  tipo : 'success',
                  mensaje : "Token obtenido"
                });

              }else{
                setInformacion( {
                  tipo : 'error',
                  mensaje : res.data.message
                });
              }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign : "center" }}>
          Iniciar Sesión
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
        <form 
          onSubmit={handleSubmit(onSubmit)}
          sx = {{ mt : 1 }}
        >
          <TextField 
            id="loggin-usuario" 
            label="Usuario" 
            variant="filled"
            placeholder="Coloque su usuario" 
            fullWidth 
            autoFocus
            error={ errors.usuario?.message }
            helperText={ errors.usuario?.message }
            {...register( "usuario", { required: "Complete este campo", maxLength: 80 } ) }
            sx = {{ mb: 2 }}
          />
          <TextField 
            id="loggin-password" 
            label="Contraseña" 
            variant="filled"
            placeholder="Coloque su contraseña" 
            fullWidth 
            type="password"
            error={ errors.password?.message }
            helperText={errors.password?.message}
            {...register( "password", { required: "Complete este campo", maxLength: 80 } ) }
            sx = {{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>ENTRAR</Button>
          <Grid Container justifyContent='space-between' sx={{ mt : 1 }}>
            <Grid item>
              <Link href="/registro">Inscribirse</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
