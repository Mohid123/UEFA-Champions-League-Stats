/* Styling function for the geojson layer*/

var stylefunc = function(feature){
  if (feature.get('Top_Clubs') == 'Real Madrid'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [127, 191, 63, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#FFFFFF',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'FC Barcelona'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 20, 223, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#DA00B5',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Napoli'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 76, 76, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#A9A9A9',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Lyon'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [253, 223, 26, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#FF4E4E',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Bayern Munich'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [4, 7, 51, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#C92828',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Chelsea FC'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [59, 67, 210, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#F08080',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'SL Benfica'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [142, 149, 0, 0.5]
      }),
      stroke: new ol.style.Stroke({
        color: 'purple',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Valencia FC'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 155, 40, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'orange',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'AC Milan'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [107, 0, 0, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 3
      })
    });
  }
  else {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [246, 239, 49, 0.5]
      }),
      stroke: new ol.style.Stroke({
        color: '#74FF6B',
        width: 1
      })
    });
  }
};

/* Reading the geojson for openlayers using 3857 projection which is default for openlayers*/

var format = new ol.format.GeoJSON({
featureProjection: "EPSG:3857"      
});                                            

/*Adding geojson as vector layer to map*/

var vectorSource = new ol.source.Vector({ 
    features: format.readFeatures(Europe)
});

/* varibale to add the vector source and the style function to map*/

var countries = new ol.layer.Vector({
  source: vectorSource,
  style: stylefunc
});

/* add fullscreen functionality to map*/

var fullscreen = new ol.control.FullScreen();

/*Add carto dark basemap along with style function*/

 var map = new ol.Map({
  controls: new ol.control.defaults().extend([fullscreen]),
     layers: [
         new ol.layer.Tile({
             source: new ol.source.XYZ({
                 url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png',
                 maxZoom: 18
             })
         }),
         countries
     ],
     target: 'map',
     view: new ol.View({
         center: ol.proj.fromLonLat([-0.12755, 51.507222]),
         maxZoom: 18,
         zoom: 6
     })
 });

  var layer = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222]))
             })
         ]
     })
 });
 map.addLayer(layer);

 layer.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'chelsea.png'
    })
}));

/* create popup for icon on the map*/

 var container = document.getElementById('popup');
 var content = document.getElementById('popup-content');
 var closer = document.getElementById('popup-closer');

 var overlay = new ol.Overlay({
     element: container,
     autoPan: true,
     autoPanAnimation: {
         duration: 200
     }
 });
 map.addOverlay(overlay);

 closer.onclick = function() {
     overlay.setPosition(undefined);
     closer.blur();
     return false;
 };

/* function to display the popup when clicked on the map along with image and details*/

 map.on('click', function (event) {
     if (map.hasFeatureAtPixel(event.pixel) === true) {
         var coordinate = new ol.proj.fromLonLat([-0.12755, 51.507222]);

         content.innerHTML = '<h4>Champions of Europe: Chelsea FC</h4>' +
         '<img src="country.jpg"></img>' +
         '<p>Chelsea FC started the season poorly, managing to win 3 out of the 6 group stage matches. However, they turned it around when they appointed Roberto di Matteo as caretaker manager midway through the season. Di Matteo led Chelsea to their first and to date only UCL title, beating Bayern Munich in the final at the Allianz Arena 4-3 on penalties</p>';
         overlay.setPosition(coordinate);
     } else {
         overlay.setPosition(undefined);
         closer.blur();
     }
 });

/* Add icons to the map with the club badges as the icon logo*/

var layer1 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-3.71701, 40.4952]))
            })
        ]
    })
});
map.addLayer(layer1);

layer1.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'madrid.png'
    })
}));

var layer2 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([14.3415, 40.844]))
            })
        ]
    })
});
map.addLayer(layer2);

layer2.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'napoli.png'
    })
}));

var layer3 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([11.7589, 48.0984]))
            })
        ]
    })
});
map.addLayer(layer3);

layer3.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bayern.png'
    })
}));

var layer4 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([1.98359, 41.7311]))
            })
        ]
    })
});
map.addLayer(layer4);

layer4.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bar.png'
    })
}));

var layer5 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([3.17703, 45.6561]))
            })
        ]
    })
});
map.addLayer(layer5);

layer5.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'lyon.png'
    })
}));


var layer7 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([9.12107, 45.4657]))
            })
        ]
    })
});
map.addLayer(layer7);

layer7.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'milan.png'
    })
}));

var layer8 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.800909, 39.3703]))
            })
        ]
    })
});
map.addLayer(layer8);

layer8.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'valencia.png'
    })
}));

var layer9 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-9.16574, 39.0003]))
            })
        ]
    })
});
map.addLayer(layer9);

layer9.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'benfica.png'
    })
}));

/*jquery function to create smooth scroll down effect for button*/

$("button").click(function() {
    $('html,body').animate({
        scrollTop: $(".below").offset().top},
        'slow');
});

//------PIE CHARTS, BAR CHARTS etc FOR STATISTICAL REPRESENTATION
google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawAssistChart);
google.charts.setOnLoadCallback(drawbarChart);
google.charts.setOnLoadCallback(drawbarAssistChart);
google.charts.setOnLoadCallback(drawSeriesChart);

function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Players', 'Goals'],
          ['Lionel Messi',  14],
          ['Didier Drogba', 6],
          ['Mario Gomez',  12],
          ['Roberto Soldado', 5],
          ['Cristiano Ronaldo', 10],
          ['Bafetimbi Gomis', 5],
          ['Edinson Cavani', 5]
        ]);

        var options = {
          title: 'Top Goal Scorers 2011-12',
          pieHole: 0.4,
          width:600,
          height:400,
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

      function drawAssistChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Asister');
    data.addColumn('number', 'Assist');
    data.addRows([
        ['Ezequiel Lavezzi', 3],
        ['Franck Ribery', 5],
        ['Fernando Torres', 4],
        ['Nico Gaitan', 5],
        ['Kaka', 5],
        ['Isaac Cuenca', 4]
        ]);
    var options = {title:'Top Assisters 2011-12',
    width:600,
    height:400,
    pieHole:0.4,
};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div_1'));
    chart.draw(data, options);
}

function drawbarChart() {
      var data = google.visualization.arrayToDataTable([
        ["Player", "Goals", { role: "style" } ],
        ["Messi", 14, "#b87333"],
        ["Drogba", 6, "silver"],
        ["Gomez", 12, "gold"],
        ["Ronaldo", 10, "color: #e5e4e2"],
        ["Soldado", 5, "color: orange"],
        ["Cavani", 5, "color: #E18383"],
        ["Gomis", 5, "color: #8E0A0A"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Goal Scorers 2011-12, in numbers",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(document.getElementById("bar_chart"));
      chart.draw(view, options);
  }

  function drawbarAssistChart() {
      var data = google.visualization.arrayToDataTable([
        ["Player", "Assists", { role: "style" } ],
        ["Lavezzi", 3, "#8B0D0D"],
        ["Ribery", 5, "#8E27F6"],
        ["Torres", 4, "gold"],
        ["Gaitan", 5, "color: #F62731"],
        ["Kaka", 5, "color: #27F2F6"],
        ["Cuenca", 4, "color: #13EC08"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Assist Providers 2011-12, in numbers",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.BarChart(document.getElementById("bar_chart_1"));
      chart.draw(view, options);
  }

  function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
        ['Players',       'Goals',  'Assists', 'Top Clubs',     'Minutes Palyed',  'Player Nationality'],
        ['Lionel Messi',     14,       0,      'FC Barcelona',      1098,          'Argentina'], 
        ['Cristiano Ronaldo', 10,      0,       'Real Madrid',      1067,          'Portugal'],
        ['Edinson Cavani',    8,       5,       'Napoli',            937,           'Uruguay'],
        ['Carlos Martins',    0,       5,       'Benfica',           435,           'Portugal'], 
        ['Franck Ribery',     0,       5,       'Bayern Munich',      804,           'France'],
        ['Kaka',              0,       5,       'Real Madrid',        576,           'Brazil'],
        ['Mario Gomez',       10,      0,       'Bayern Munich',      634,           'Germany'],
        ['Roberto Soldado',   5,       0,       'Valencia',           438,           'Spain'],
        ['Nico Gaitan',       0,       0,       'Benfica',           1130,          'Argentina'],
        ['Ezequiel Lavezzi',  0,       3,       'Napoli',             524,           'Argentina'],
        ['Isaac Cuenca',      0,       4,       'FC Barcelona',       898,           'Spain/Catalunya'],
        ['Fernando Torres',   0,       4,       'Chelsea FC',       898,              'Spain'],
      ]);

      var options = {
        title: 'Correlation between Goals and Assists' +
                '(2011-12)',
        hAxis: {title: 'Goals'},
        vAxis: {title: 'Assists'},
        bubble: {textStyle: {fontSize: 11}}      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
