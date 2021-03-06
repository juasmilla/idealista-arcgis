Idealista-ArcGIS
=================

Este es un proyecto que hemos creado con objetivo de aprender y mejorar nuestros conocimientos sobre tecnologías GIS.

El proyecto se trata de un buscador de pisos que además de tener en cuenta características del piso tenga en cuenta características del barrio donde queremos que esté el piso. Como podrían ser:

* Distancia a una series de puntos de interés (POIs) indicados manualmente por el usuario
* Distancia a una serie de POIs genéricos
* Nivel de seguridad del barrio
* Etc.

Así por ejemplo podremos hacer una búsqueda que nos permita encontrar los pisos que cumplan las siguientes condiciones:
* Tengan 2 dormitorios y que cuesten menos de 800€ al mes
* Que estén a menos de 2km de mi trabajo (o la escuela de nuestros hijos, etc.)
* Y que tengan un boca de metro de la línea 3 a menos de 4 minutos andando (o un supermercado, hospital, etc.)

En este piloto vamos a trabajar sobre el area delimitada de Madrid porque disponemos de varios conjuntos de datos muy completos.

##Tecnologías de desarrollo
Al principio del proyecto decidimos utilizar como tecnologías para el desarrollo:
* [La API de Idealista](http://www.idealista.com/labs/api.htm)
* [La API Javascript de ArcGIS](http://js.arcgis.com)
* [AngularJS](https://angularjs.org/) / [Angular-Esri-Map](https://github.com/Esri/angular-esri-map) 
* [ArcGIS Online](http://www.arcgis.com)
* [Nodejs](http://nodejs.org/)

##Unirse al equipo
Si te apetece aprender y colaborar con el proyecto te explicamos como funcionamos.

1. El equipo es totalmente abierto y por tanto cualquier persona es bienvenida
2. No existe un compromiso de horas mínimas, ni distinciones entre miembros
3. Hemos creado un grupo de Whatsapp donde los miembros nos avisamos cuando vamos a dedicarle un rato al proyecto por si algún otro se anima (y hacer pair-programming)
4. Eventualmente nos reunimos para compartir ideas, información y definir pequeños entregables que permitan trabajar de manera independientemente

Recordamos que: **el principal objetivo es aprender, y por tanto por mínima que sea cualquier contribución la consideraremos un éxito**.

Por tanto si te animas a unirte puedes:
* [Unirte a la lista de correo](https://groups.google.com/forum/#!forum/buscador-de-pisos---idealista-arcgis)
* O [crear un Fork](https://github.com/hhkaos/idealista-arcgis/fork) y posteriormente hacer un Pull-Request

Pero te recomendamos que te unas a la lista de correo para que te presentes, te agreguemos al grupete de Whatsapp y te compartamos algunos documentos que tenemos con información adicional en Google Drive.

##Configuración del entorno 
###Entorno de desarrollo
Existe un manual de configuración en la carpeta doc (sin actualizar). Ahora la página se sirve utilizando un servidor en node.js una vez clonado o descargado el repositorio ejecutar:

```
$npm install
$bower install
$node app.js
```
Y abrir un navegador y escribir la url: http://localhost:3000

Equipo
=================
Hasta ahora el equipo lo forman (en orden alfabético):

Foto | Nombre | Github | Linkedin | Twitter
--- | --- | --- | --- | ---
<img src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/1/000/0bc/20e/0dd417f.jpg" width="60" style="width:80px;"> |  José Lafuente | n.a. | [Perfil](http://es.linkedin.com/pub/jose-lafuente/b/92/b54/en) | n.a.
<img src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/3/005/039/3f8/2a6d7f6.jpg" width="60"> |  Milu Gaspar | [MiluCG](https://github.com/MiluCG) | [Perfil](http://es.linkedin.com/pub/maria-de-lurdes-caridade-gaspar/66/b55/674/es) | n.a.
<img src="https://media.licdn.com/mpr/mpr/shrink_200_200/p/7/000/2b1/2ef/1546991.jpg" width="60"> | Rafael Garrido Romero | [rgarom](https://github.com/rgarom) | [Perfil](http://es.linkedin.com/in/rgarom/es) | [@rafagarrido](http://www.twitter.com/rafagarrido).
<img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/01c/2dd/1be9db8.jpg" width="60">  | Raúl Jiménez Ortega | [hhkaos](https://github.com/hhkaos) | [Perfil](http://es.linkedin.com/in/jimenezortegaraul/en) | [@hhkaos](http://www.twitter.com/hhkaos)
<img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/2/005/090/2a4/3e3e0ca.jpg" width="60">  | Jesús García Villar | [servigis](https://github.com/servigis) | [Perfil](http://es.linkedin.com/in/jesusgarciavillar/es) | [@servigis](http://www.twitter.com/servigis)
