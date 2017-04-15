(function () {
  'use strict';

  var adaSafeTrails = new Array();
  var count = 0;

  $.ajax({
    url: 'https://services1.arcgis.com/WGzzp37bqYMLyzDR/arcgis/rest/services/AGOLHackathon1/FeatureServer/5/query?where=1%3D1&outFields=OBJECTID,CLASS,TYPE,STYLE,CONDITION,LOCATION,Shape__Length&outSR=4326&f=json'
  })
.done(function(res) {
  var result = JSON.parse(res);
  var allTrails = result['features'];

  allTrails.forEach(function(trail) {

    var trailClass = trail.attributes.CLASS;
    var trailCondition = trail.attributes.CONDITION;
    var trailStyle = trail.attributes.STYLE;

    if (trailClass == 5 && trailCondition == 1 && trailStyle == "WALKING") {
      adaSafeTrails.push(trail);
      ++count;
    }

  });

  console.log(count);
  console.log(adaSafeTrails[0]);

})
.fail(function(err) {
  console.log('Error: ' + err.status);
});

})();