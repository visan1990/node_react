# Practica Node Express + Framework JS
Practica para conocimientos en el manejo de **Node express**, **MySQL** y Framework JS en este caso se decidio hacer uso de **ReactJS**.
## Instalacion

**NOTA:** Es importante contar con una instalado previamente  

**npm v10.8.2 o superior**  y  **node v20.17.0 o superior**



**MySQL**
```bash
  Importamos o ejecutamos nuestro documento ".sql" (adjunto en este proyecto) en nuestro 
  MySQL, hay que considerar que que este script genera una base de datos de nombre **"tareas"**
```
**Back-End, NodeExpress**

Abriremos una nueva terminal y ejecutamos el siguiente codigo.
```bash
  cd <directorio_del_proyecto>/node_express
  npm install --legacy-peer-deps
```
**Front-End, React JS**

Abriremos una nueva terminal y ejecutamos el siguiente codigo.
```bash
  cd <directorio_del_proyecto>/crud_react
  npm install --legacy-peer-deps
```

Configurar conexion de la BD modificaremos la informacion del documento **"nodemon.json"** ubicado en el siguiente directorio **<directorio_del_proyecto>/node_express** donde debemos definir lo siguiente:  

        "MYSQL_SERVER"      : "<IP de nuestro servidor Mysql>",
        "MYSQL_PORT"        : "<Puerto de nuestro servidor Mysql>",
        "MYSQL_USER"        : "<Usuario de acceso a la MySQL>",
        "MYSQL_PASS"        : "<Contraseña de acceso a la MySQL>",
        "MYSQL_DATABASE"    : "BD con la que estaremos trabajando MySQL"

## Ejecución
**Nota:** En ambas partes ya se ha configurado las herramientas y puertos correspondientes para la ejecución sin requerir de algun cambio adicional.

Para la ejecución del **Back-End**, abriremos una nueva terminal y ejecutamos el siguiente codigo.

```bash
  cd <directorio_del_proyecto>/node_express
  npm start
```

Para la ejecución del **Front-End**, abriremos una nueva terminal y ejecutamos el siguiente codigo.
```bash
  cd <directorio_del_proyecto>/crud_react
  npm start
```


## Diseño
Se opto por el manejo de **Material UI v6.1.2**, ya que cuenta con una gran variedad de componentes y opciones de facil implementación asi como la presentación de colores  son agradables para los usuarios.
