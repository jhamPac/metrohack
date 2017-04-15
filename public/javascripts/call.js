(function (window) {
  'use strict';

  const ADA = {
    esriURL: 'https://services1.arcgis.com/WGzzp37bqYMLyzDR/arcgis/rest/services/AGOLHackathon1/FeatureServer/5/query?where=1%3D1&outFields=OBJECTID,CLASS,TYPE,STYLE,CONDITION,LOCATION,Shape__Length&outSR=4326&f=json',
    parks: [],
    flattenedParks: [],
    count: 0
  };

  $.ajax({
    url: ADA.esriURL
  })
  .done(function(res) {
    var result = JSON.parse(res);
    var allTrails = result['features'];

    allTrails.forEach(function(trail) {

      var trailClass = trail.attributes.CLASS;
      var trailCondition = trail.attributes.CONDITION;
      var trailStyle = trail.attributes.STYLE;

      if (trailClass == 5 && trailCondition == 1 && trailStyle == "WALKING") {

        ADA.parks.push(trail);
      }

    });

  })
  .fail(function(err) {
    console.log('Error: ' + err.status);
  });

  // Wait a split second for ajax call
  setTimeout(function () {

    ADA.parks.forEach(function (sourcePark) {

      if (!ADA.flattenedParks.some(function (targetPark) { return targetPark.location == sourcePark.attributes.LOCATION  })) {

        // Get location to use as key
        var key = sourcePark.attributes.LOCATION;

        // Delete property so we just have trails
        delete sourcePark.attributes.LOCATION;

        var parkObj = {location: key};
        parkObj.trails = [];
        parkObj.trails.push(sourcePark.attributes);
        ADA.flattenedParks.push(parkObj);

      } else {

        var targetPark = ADA.flattenedParks.filter(function(tpark) { return tpark.location == sourcePark.attributes.LOCATION })[0];
        delete sourcePark.attributes.LOCATION;

        targetPark.trails.push(sourcePark.attributes);

      }

    });

      console.log(ADA);

      // Set this to global window for now; I know its nasty
      window.PARKS = ADA;

  }, 1000);

})(window);
