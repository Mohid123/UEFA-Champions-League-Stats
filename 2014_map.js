/* Styling function for the geojson layer*/

var stylefunc = function(feature){
  if (feature.get('Top_Clubs') == 'Real Madrid'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [127, 191, 63, 0.5] //yellowish los blancos
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
        color: [63, 96, 227, 0.5] //pink away kit
      }),
      stroke: new ol.style.Stroke({
        color: '#DA00B5',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Juventus'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 76, 76, 0.5] //mild red
      }),
      stroke: new ol.style.Stroke({
        color: '#A9A9A9',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Atletico Madrid'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [253, 223, 26, 0.5] //yellow
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
        color: [4, 7, 51, 0.5] //blackish blue
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
        color: [59, 67, 210, 0.5] //dark blue
      }),
      stroke: new ol.style.Stroke({
        color: '#F08080',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Borussia Dortmund'){
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
  else if (feature.get('Top_Clubs') == 'Manchester United'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [107, 0, 0, 0.5] //reddish black
      }),
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Paris Saint Germain'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [244, 212, 0, 0.5] //reddish black
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
        color: [186, 126, 245, 0.5]
      }),
      stroke: new ol.style.Stroke({
        color: '#7F3FBF',
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

/*Add ArcGIS World Topographic basemap along with style function*/

 var map = new ol.Map({
  controls: new ol.control.defaults().extend([fullscreen]),
     layers: [
         new ol.layer.Tile({
             source: new ol.source.XYZ({
                 attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                 'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                 url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
                 maxZoom: 18
             })
         }),
         countries
     ],
     target: 'map',
     view: new ol.View({
         center: ol.proj.fromLonLat([-3.71701, 40.4952]),
         maxZoom: 18,
         zoom: 6
     })
 });

 var layer = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([-3.71701, 40.4952]))
             })
         ]
     })
 });
 map.addLayer(layer);

 layer.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'madrid.png'
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
         var coordinate = new ol.proj.fromLonLat([-3.71701, 40.4952]);

         content.innerHTML = '<h4>Champions of Europe: Real Madrid</h4>' +
         '<img src="process.jpg"></img>' +
         '<p>The most successful team in the history of the competititon, Real Madrid had gone 12 years without a title. This changed in 2014 with spectacular performances throughout the season to reach the final and beating their city rivals Atletico Madrid 4-1 in Extra Time to lift the much coveted "La Decima" (No.10)</p>';
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([11.7589, 48.0984]))
            })
        ]
    })
});
map.addLayer(layer1);

layer1.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bayern.png'
    })
}));

var layer2 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([2.50347, 48.7092]))
            })
        ]
    })
});
map.addLayer(layer2);

layer2.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'psg.png'
    })
}));

var layer3 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([1.98359, 41.7311]))
            })
        ]
    })
});
map.addLayer(layer3);

layer3.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bar.png'
    })
}));

var layer4 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([7.42094, 51.9493]))
            })
        ]
    })
});
map.addLayer(layer4);

layer4.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bvb.png'
    })
}));

var layer5 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-2.58867, 41.6208]))
            })
        ]
    })
});
map.addLayer(layer5);

layer5.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'atleti.png'
    })
}));


var layer7 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([7.44315, 45.1642]))
            })
        ]
    })
});
map.addLayer(layer7);

layer7.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'juve.png'
    })
}));

var layer9 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222]))
            })
        ]
    })
});
map.addLayer(layer9);

layer9.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'chelsea.png'
    })
}));

var layer10 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-2.28129, 53.5159]))
            })
        ]
    })
});
map.addLayer(layer10);

layer10.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'manchester.png'
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
          ['Cristiano Ronaldo',  17],
          ['Robert Lewandowski', 6],
          ['Wayne Rooney',  8],
          ['Lionel Messi', 8],
          ['Thomas Muller', 5],
          ['Arturo Vidal', 5],
          ['Diego Costa', 8],
          ['Zlatan Ibrahimovic', 10]
        ]);

        var options = {
          title: 'Top Goal Scorers 2013-14',
          is3D: true,
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
        ['Gregory van der Wiel', 4],
        ['Angel Di Maria', 6],
        ['Arjen Robben', 4],
        ['Oscar', 4],
        ['Gabi', 4]
        ]);
    var options = {title:'Top Assisters 2013-14',
    width:600,
    height:400,
    is3D: true,
};

    var chart = new google.visualization.PieChart(document.getElementById('chart_div_1'));
    chart.draw(data, options);
}

function drawbarChart() {
      var data = google.visualization.arrayToDataTable([
        ["Player", "Goals", { role: "style" } ],
        ["Ronaldo", 17, "#b87333"],
        ["Lewandowski", 6, "silver"],
        ["Rooney", 8, "gold"],
        ["Messi", 8, "color: #e5e4e2"],
        ["Muller", 5, "color: orange"],
        ["Vidal", 5, "color: #E18383"],
        ["Costa", 8, "color: #8E0A0A"],
        ["Ibrahimovic", 10, "color: #7152EE"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Goal Scorers 2013-14, in numbers",
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
        ["van der Wiel", 4, "#8B0D0D"],
        ["Oscar", 4, "#8E27F6"],
        ["Di Maria", 6, "gold"],
        ["Robben", 5, "color: #F62731"],
        ["Gabi", 4, "color: #27F2F6"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Assist Providers 2013-14, in numbers",
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
        ['Lionel Messi',      8,       0,      'FC Barcelona',      630,          'Argentina'], 
        ['Cristiano Ronaldo', 17,      0,       'Real Madrid',      993,          'Portugal'],
        ['Robert Lewandowski', 6,     0,     'Borussia Dortmund',  809,           'Poland'], 
        ['Arjen Robben',      0,      5,       'Bayern Munich',    877,           'Netherlands'],
        ['Zlatan Ibrahimovic', 0,      7,       'PSG',              670,           'Sweden'],
        ['Angel Di Maria',     0,      6,       'Real Madrid',      822,           'Argentina'],
        ['Thomas Muller',     8,       0,       'Bayern Munich',    708,           'Germany'],
        ['Arturo Vidal',      5,       0,       'Juventus',          533,          'Chile'],
        ['Diego Costa',       8,       0,       'Atletico Madrid',   580,           'Spain'],
        ['Gregory van der Wiel', 0,       4,      'PSG',            540,           'Netherlands'],
        ['Oscar',             5,       0,       'Chelsea FC',        898,              'Spain'],
        ['Gabi',             0,       4,        'Atletico Madrid',     898,              'Spain']
      ]);

      var options = {
        title: 'Correlation between Goals and Assists' +
                '(2013-14)',
        hAxis: {title: 'Goals'},
        vAxis: {title: 'Assists'},
        bubble: {textStyle: {fontSize: 11}}      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }