var $GEO = $GEO || {
  params: {
    action: 'json',
    apikey: '0lVOkSbmEM5iIo7pAPFprxFUUuJUCZXU', // <- Valido para desarrolladores.esri.es
    country: "es",
    maxItems: 50,
    numPage: 1,
    distance: 1002,
    center: "40.42938099999995,-3.7097526269835726"
  }
};

angular.module('esri-webmap-example', ['esri.map', 'ngSanitize'])
  .controller('MapController', function ($scope, esriRegistry) {
    $scope.map = {
        center: {
            lng: -3.709,
            lat: 40.4329
        },
        zoom: 13
    };
    $scope.counter = 0;
    $scope.pois = Array();
    $scope.evt = { click: {}};
    $scope.results = Array();
    $scope.waiting = false;
    $scope.loadButton = "Buscar pisos";
    $scope.idealista = {
      noSmokers: true,
      sex: "X",
      operation: "A",
      order: "price",
      pictures: true,
      propertyType: "bedrooms",
      pets: "false"
    };

    var idealistaEndpoint = "http://idealista-prod.apigee.net/public/2/search";

    esriRegistry.get('map').then(function(map) {
      require([
        "esri/map",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        "esri/symbols/PictureMarkerSymbol",
        "esri/graphic",
        "esri/geometry/webMercatorUtils",
        "esri/request",
        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/InfoTemplate",
        "dojo/promise/all",
        "dojo/Deferred",
        "dojo/domReady!",
        ], function(
          Map, GraphicsLayer, Point, PictureMarkerSymbol, Graphic,
          webMercatorUtils, esriRequest, Color, SimpleMarkerSymbol,
          SimpleRenderer, InfoTemplate, all
          ) {
          //debugger;
          $scope.capaGrafica = new GraphicsLayer();
          map.addLayer($scope.capaGrafica);

          $scope.Point = Point;
          $scope.PictureMarkerSymbol = PictureMarkerSymbol;
          $scope.Graphic = Graphic;
          $scope.webMercatorUtils = webMercatorUtils;
          $scope.esriRequest = esriRequest;
          $scope.allDojo = all;

          esriConfig.defaults.io.proxyUrl = "/proxy";
          esriConfig.defaults.io.alwaysUseProxy = false;

          var orangeRed = new Color([238, 69, 0, 0.5]);
          $GEO.marker = new SimpleMarkerSymbol("solid", 10, null, orangeRed);
          var renderer = new SimpleRenderer($GEO.marker);
          $scope.capaGrafica.setRenderer(renderer);

          // Y asociamos un pequeño modal con información extra.
          var template = new InfoTemplate(
            "Precio: ${price}€",
            "Dirección: ${address} <br>\
            Planta: ${floor} <br>\
            <img src='${thumbnail}'> <br>\
            <a href='http://${url}' target='_blank'>Más info</a>"
          );
          $scope.capaGrafica.setInfoTemplate(template);

      });

      map.on('click', function(e) {
        //console.log('map click', e);

        var poi;
        var point = e.mapPoint;
        var LongLat = $scope.webMercatorUtils.xyToLngLat(point.x, point.y);


        $scope.$apply(function(){
            $scope.evt.click.lng = LongLat[0].toFixed(3);
            $scope.evt.click.lat = LongLat[1].toFixed(3);

            poi = {
              id: $scope.counter,
              lng: $scope.evt.click.lng,
              lat: $scope.evt.click.lat,
              radius: 1000,
              name: ""
            };

            $scope.pois.push(poi);
            $scope.counter++;
        });

        var loc = new $scope.Point(
              $scope.evt.click.lng,
              $scope.evt.click.lat
            );

        var symbol = new $scope.PictureMarkerSymbol("img/pin.png", 16, 24);
        $scope.capaGrafica.add(new $scope.Graphic(loc, symbol, poi));
      });
  });

  $scope.delete = function(id){

    var i = 0,
        layer = $scope.capaGrafica,
        pois = $scope.pois,
        len = pois.length;

    while(i <= len){
      if(pois[i].id == id){
        pois.splice(i, 1);
        layer.remove(layer.graphics[i]);
        break;
      }
      i++;
    }
  };

  var paintResults = function(result){
    var len = result.elementList.length;
    var el = result.elementList;

    $scope.$apply(function(){
      for(i=0; i<len; i++){

        $scope.results.push(el[i]);
        var loc = new $scope.Point(el[i].longitude, el[i].latitude);
        $scope.capaGrafica.add(new $scope.Graphic(loc, $GEO.marker, el[i]));
      }
    });
  };

  function endpointRequest(poiId) {
    var lat = $scope.pois[poiId].lat;
    var lng = $scope.pois[poiId].lng;

    $GEO.params.center = lat + "," + lng;
    $GEO.params.distance = $scope.pois[poiId].radius;

    var deferred = $scope.esriRequest({
      url: idealistaEndpoint,
      //url: "http://localhost:9090/js/response.js",
      content: $GEO.params,
      load: paintResults,
      error: function(e){
        console.log("Ha habido un error: "+ e);
      }
    });
    return deferred.promise;
  }

  $scope.search = function(){
    $scope.waiting = true;
    $scope.loadButton = "Buscando...";

    $GEO.params.noSmokers = $scope.idealista.noSmokers;
    $GEO.params.sex = $scope.idealista.sex;
    $GEO.params.operation = $scope.idealista.operation;
    $GEO.params.order = $scope.idealista.order;
    $GEO.params.pictures = $scope.idealista.pictures;
    $GEO.params.propertyType = $scope.idealista.propertyType;


    var i;
    //, totalPages = Math.min(100, firstResult.totalPages);

    var promises = [];
    var poisNum = $scope.pois.length;

    for(i=0; i<poisNum; i++)
    {
      //$GEO.params.numPage = i;
      setTimeout(function(i) {
        promises.push(endpointRequest(i));
      }, i*2000, i);
    }

    setTimeout(function() {
      $scope.allDojo(promises).then(function(results)
      {
        console.log("all requests finished");

        //paintResults(results);

        //dojo.byId('idealista-count').innerHTML = baseGraphics.length + " resultados";
        $scope.waiting = false;
        $scope.loadButton = "Buscar pisos";
      },function(e){
        alert("Ha sucedido un error al recuperar los pisos, por favor inténtalo de nuevo.");
        $scope.waiting = false;
        $scope.loadButton = "Buscar pisos";
      });
    },poisNum*2000);
  }
})
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);;
