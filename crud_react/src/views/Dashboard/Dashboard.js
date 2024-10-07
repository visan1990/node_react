import React, { useEffect, useState } from 'react';
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Menu, MenuItem } from '@mui/material';
import { List, ListDivider, ListItem, ListItemButton } from '@mui/joy';
import { Home, Person } from '@mui/icons-material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from "../../auth/AuthProvider";
import TareasFormulario from "../../components/TareasFormulario"
import axios from '../../utils/axios';

const Dashboard = () => {

    const authUser = useAuth();

    const [ open, setOpen ] = useState( false );
    const abrirVentana = () => setOpen( true );
    const cerrarVentana = () => setOpen( false );
    const [ tareaEditar, settareaEditar ] = useState( {
        titulo_tarea : '',
        descripcion_tarea : ''
    });

    const loggOut = () => {
        localStorage.clear();
        authUser.setisLoggedIn( false );
        authUser.setAuthUser( null );
        window.location.reload();
    }

    const updateTask = ( data ) => {
        axios.put("tasks/" + data.idtarea, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authUser.authUser.token
            }
        })
        .then( function (res) {
            if (res.status == 200) {
                getTareas();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {});
    }

    /**************************************/
    const BorrarTarea = ( row ) => {
        updateTask( 
            { 
                idtarea : row.idtarea,
                estatus_tarea : -1
            }
        )
    }

    const EditarTarea = ( row ) => {
        settareaEditar( row );
        abrirVentana();
    }

    const FinalizarTarea = ( row ) => {
        updateTask( 
            { 
                idtarea : row.idtarea,
                estatus_tarea : 1
            }
        )
    }

    const accionesFila = [
        {
            Icon: EditIcon,
            label: "Editar tarea",
            onClick: EditarTarea
        },
        {

            Icon: CheckIcon,
            label: "Finalizar tarea",
            onClick: FinalizarTarea
        },
        {
            Icon: DeleteIcon,
            label: "Borrar tarea",
            onClick: BorrarTarea
        }
    ];
    /**************************************/


    const columnas = [
        { id: 'idtarea', etiqueta: 'IDTAREA' },
        { id: 'titulo_tarea', etiqueta: 'TITULO' },
        { id: 'nestatus', etiqueta: 'ESTATUS TAREA' }
    ];
    
    const [ filas, setFilas ] = useState( [] );

    useEffect( () =>{
        getTareas();
    }, [] );
    
    const getTareas = () => {
        axios.get("tasks/" + authUser.authUser.user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authUser.authUser.token
            }
        } )
        .then( function (res) {
            if (res.status == 200) {
                setFilas( res.data.tasks );
            }
        })
        .catch(function (err) {
            console.log(err);
        })
        .then(function () {});
    }

    /****************/
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const [anchorEl, setAnchorEl] = useState({ current: null });
    const handleClick = row => event => {
        setAnchorEl({ current: event.currentTarget, row: row });
    };
    const handleClose = () => {
        setAnchorEl( { ...anchorEl, current: null } )
    }
    /****************/

    return (
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
        <List role="menubar" orientation="horizontal">
            <ListItem role="none">
                <ListItemButton role="menuitem" component="a" href="/">
                    <Home /> TAREAS
                </ListItemButton>
            </ListItem>
            <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
                <ListItemButton
                    role="menuitem"
                    component="a"
                    href="#horizontal-list"
                    aria-label="Profile"
                >
                <LogoutIcon onClick={ loggOut } />
            </ListItemButton>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={1} md={2}></Grid>
            <Grid item xs={10} md={8}>
                <Button 
                    type="Button"
                    variant="contained"
                    color="success"
                    onClick={ () => {
                    settareaEditar({
                        titulo_tarea : '',
                        descripcion_tarea : ''
                    });
                    abrirVentana();
                }}>Nueva tarea</Button>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columnas.map((column) => (
                                <TableCell>{ column.etiqueta }</TableCell>
                            ))}
                            <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columnas.map((column) => {
                                        return ( <TableCell>{ row[column.id] }</TableCell> );
                                    })}
                                    <Button onClick={ handleClick( row ) } >
                                        <MoreVertIcon/>
                                    </Button>
                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={ anchorEl.current }
                                        open={ Boolean(anchorEl.current) }
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        {
                                            accionesFila.map( ( accion ) => {
                                                if( anchorEl.row?.estatus_tarea == 0 ){
                                                    return ( <MenuItem onClick={ () => {
                                                        accion.onClick( anchorEl.row );
                                                        handleClose();
                                                    }}><accion.Icon /> { accion.label }</MenuItem> );
                                                }
                                            })
                                        }
                                    </Menu>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage={"Filas por pagina"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <TareasFormulario open={ open } cerrarVentada = { cerrarVentana } infoTarea = { tareaEditar } updateTareas = { getTareas } />
            </Grid>
        </Grid>
    </Box>
        
      );
}

export default Dashboard;