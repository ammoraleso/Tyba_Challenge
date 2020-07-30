## Correr con docker.

    Comentar la linea 3 y descomentar la linea 4 para apuntar al contenedor
    
    Para esto cree un script que se llama start.sh (tiene todos los comandos utiles de docker)

    - Desde una consola de windows start.sh all
    - Desde una consola de git ./start.sh all

    Una vez hecho estará corriendo node en el puerto 3000 y mongo en el puerto 27017

    - Instalar el enviroment adjunto en la carpeta de postman y tambien el archivo API_TEST y alli se podrá correr los endpoint.


    SI NO LO QUIEREN CORRER DESDE SCRIPT BASTARÁ CON CORRER docker-compose up --build
    
## Correr en Local.

    Comentar la linea 4 y descomentar la linea 3 para apuntar al contenedor
    
    - npm install
    - Correr instancia de mongo en el puerto 27017

    - npm run start

    - Instalar el enviroment adjunto en la carpeta de postman y tambien el archivo API_TEST y alli se podrá correr los endpoint.

## Uso de Postman para test.

    - Se deberá crea dos variables sobre la tuerca de configuracion de la derecha superior.
    el valor del authToken se peude sacar del generate token del user.

        url : (initical value) localhost:3000 - (current_value) localhost:3000
        authToken : (current_value) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ4MWRiOWMyMDRlZTJmYTg5NGQ3ZGUiLCJpYXQiOjE1OTU1MTY1MzF9.Y8sm98U2g3R1wvG6HXZMkpKtOeOs4lhgUileA19w3mQ
        
    - Al servicio de login se le debe añadir el siguiente script en la pestaña de test

        if(pm.response.code === 200){
            pm.environment.set('authToken',pm.response.json().token)
        }

    - Click derecho a la coleccion donde se trabaja y dar editar, en el tab de Autorization seleccionar 

        Bearer Token y en la parte derecha Token : {{authToken}}
