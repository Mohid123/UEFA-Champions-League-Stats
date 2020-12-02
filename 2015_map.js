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
        color: [63, 96, 227, 0.5] 
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
        color: [255, 76, 76, 0.5] 
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
  else if (feature.get('Top_Clubs') == 'Shakhtar Donetsk'){
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
  else if (feature.get('Top_Clubs') == 'FC Porto'){
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
  else if (feature.get('Top_Clubs') == 'Paris Saint Germain'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [244, 212, 0, 0.5] 
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
         center: ol.proj.fromLonLat([1.98359, 41.7311]),
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
         var coordinate = new ol.proj.fromLonLat([1.98359, 41.7311]);

         content.innerHTML = '<h4>Champions of Europe: FC Barcelona</h4>' +
         '<img src="MSN.jpg"></img>' +
         '<p>The season when the fearsome trio of Messi, Suarez and Neymar (MSN) was born. Widely regarded as the greatest attacking trio in football history, MSN took Europe by storm with their incredible chemistry. Barcelona beat Juventus 3-1 in the final held at the Olympiastadion in Berlin to achieve their fifth UCL Crown</p>';
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([31.4099, 49.0091]))
            })
        ]
    })
});
map.addLayer(layer4);

layer4.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'shakhtar.png'
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-8.35236, 41.2247]))
            })
        ]
    })
});
map.addLayer(layer10);

layer10.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'porto.png'
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
          ['Cristiano Ronaldo',  10],
          ['Lionel Messi', 10],
          ['Thomas Muller', 7],
          ['Luiz Adriano', 9],
          ['Jackson Martinez', 7],
          ['Edinson Cavani', 6]
        ]);

        var options = {
          title: 'Top Goal Scorers 2014-15',
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
        ['Messi', 6],
        ['Schweinsteiger', 4],
        ['Fabregas', 4],
        ['Ronaldo', 4],
        ['Koke', 4]
        ]);
    var options = {title:'Top Assisters 2014-15',
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
        ["Ronaldo", 10, "#b87333"],
        ["Messi", 10, "color: #e5e4e2"],
        ["Muller", 7, "color: orange"],
        ["Adriano", 9, "color: #E18383"],
        ["Martinez", 7, "color: #8E0A0A"],
        ["Cavani", 6, "color: #7152EE"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Goal Scorers 2014-15, in numbers",
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
        ["Lionel Messi", 6, "#8B0D0D"],
        ["Bastian Schweinsteiger", 4, "#8E27F6"],
        ["Cesc Fabregas", 4, "gold"],
        ["Cristiano Ronaldo", 4, "color: #F62731"],
        ["Koke", 4, "color: #27F2F6"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Assist Providers 2014-15, in numbers",
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
        ['Lionel Messi',      10,       6,      'FC Barcelona',      1147,          'Argentina'], 
        ['Cristiano Ronaldo', 10,      4,       'Real Madrid',      1065,          'Portugal'],
    ['Bastian Schweinsteiger', 0,      4,       'Bayern Munich',    456,           'Netherlands'],
        ['Koke',               0,      4,       'Atletico Madrid',  833,           'Spain'],
        ['Thomas Muller',     7,       0,       'Bayern Munich',    777,           'Germany'],
        ['Jackson Martinez',  7,       0,       'FC Porto',          629,          'Chile'],
        ['Luiz Adriano',       9,       0,       'Shakhtar Donetsk', 628,           'Brazil'],
        ['Edinson Cavani',     6,       0,       'PSG',              920,           'Netherlands'],
        ['Carlos Tevez',         7,       0,       'Juventus',        1156,           'Argentina'],
        ['Cesc Fabregas',        0,       4,        'Chelsea FC',     696,           'Spain']
      ]);

      var options = {
        title: 'Correlation between Goals and Assists' +
                '(2014-15)',
        hAxis: {title: 'Goals'},
        vAxis: {title: 'Assists'},
        bubble: {textStyle: {fontSize: 11}}      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }