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
  else if (feature.get('Top_Clubs') == 'Galatasaray'){
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
  else if (feature.get('Top_Clubs') == 'Ajax'){
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
  else if (feature.get('Top_Clubs') == 'Manchester United'){
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
        color: [255, 20, 215, 0.5]
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

/*Add stamen watercolor basemap along with style function*/

 var map = new ol.Map({
  controls: new ol.control.defaults().extend([fullscreen]),
     layers: [
         new ol.layer.Tile({
             source: new ol.source.XYZ({
                 url: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
                 maxZoom: 18
             })
         }),
         countries
     ],
     target: 'map',
     view: new ol.View({
         center: ol.proj.fromLonLat([11.7589, 48.0984]),
         maxZoom: 18,
         zoom: 6
     })
 });

 var layer = new ol.layer.Vector({
     source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([11.7589, 48.0984]))
             })
         ]
     })
 });
 map.addLayer(layer);

 layer.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'bayern.png'
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
         var coordinate = new ol.proj.fromLonLat([11.7589, 48.0984]);

         content.innerHTML = '<h4>Champions of Europe: Bayern Munich</h4>' +
         '<img src="munich_boys.jpg"></img>' +
         '<p>Having suffered a humiliating defeat in their own backyard in 2012, Bayern were out for blood and this time around they proved themselves to be the best. Ruthless and efficient throughout the season, they faced their fierce German rivals Borussia Dortmund in the final. Bayern beat them 2-1 to lift their fifth Champions League crown at the historic Wembley Stadium</p>';
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([35.1806, 39.0608]))
            })
        ]
    })
});
map.addLayer(layer5);

layer5.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'gala.png'
    })
}));


var layer7 = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([5.62062, 52.2521]))
            })
        ]
    })
});
map.addLayer(layer7);

layer7.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
        src: 'ajax.png'
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
          ['Cristiano Ronaldo',  12],
          ['Robert Lewandowski', 10],
          ['Burak Yilmaz',  8],
          ['Lionel Messi', 8],
          ['Thomas Muller', 8],
          ['Oscar', 5],
          ['Jonas', 5],
          ['Ezequiel Lavezzi', 5]
        ]);

        var options = {
          title: 'Top Goal Scorers 2012-13',
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
        ['Zlatan Ibrahimovic', 7],
        ['Angel Di Maria', 5],
        ['Franck Ribery', 5],
        ['Mario Gotze', 5],
        ['Wayne Rooney', 4],
        ['Xavi', 4],
        ['Christian Eriksen', 4],
        ['Selcuk Inaan', 4]
        ]);
    var options = {title:'Top Assisters 2012-13',
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
        ["Ronaldo", 12, "#b87333"],
        ["Lewandowski", 10, "silver"],
        ["Yilmaz", 8, "gold"],
        ["Messi", 8, "color: #e5e4e2"],
        ["Muller", 8, "color: orange"],
        ["Jonas", 5, "color: #E18383"],
        ["Oscar", 5, "color: #8E0A0A"],
        ["Lavezzi", 5, "color: #7152EE"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Goal Scorers 2012-13, in numbers",
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
        ["Ibrahimovic", 7, "#8B0D0D"],
        ["Ribery", 5, "#8E27F6"],
        ["Di Maria", 5, "gold"],
        ["Gotze", 5, "color: #F62731"],
        ["Rooney", 4, "color: #27F2F6"],
        ["Xavi", 4, "color: #13EC08"],
        ["Eriksen", 4, "color: #7152EE"],
        ["Inaan", 4, "color: skyblue"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Assist Providers 2012-13, in numbers",
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
        ['Lionel Messi',      8,       0,      'FC Barcelona',      1098,          'Argentina'], 
        ['Cristiano Ronaldo', 12,      0,       'Real Madrid',      1067,          'Portugal'],
        ['Robert Lewandowski', 10,     0,     'Borussia Dortmund',  937,           'Poland'],
        ['Burak Yilmaz',       8,      0,      'Galatasaray',       435,           'Turkey'], 
        ['Franck Ribery',      0,      5,       'Bayern Munich',    804,           'France'],
        ['Zlatan Ibrahimovic', 0,      7,       'PSG',              576,           'Sweden'],
        ['Angel Di Maria',     0,      5,       'Real Madrid',      634,           'Argentina'],
        ['Thomas Muller',     8,       0,       'Bayern Munich',    438,           'Germany'],
        ['Jonas',             5,       0,       'Valencia',          1130,          'Argentina'],
        ['Ezequiel Lavezzi',  5,       0,       'PSG',               524,           'Argentina'],
        ['Xavi',              0,       4,       'FC Barcelona',      898,           'Spain/Catalunya'],
        ['Oscar',             5,       0,       'Chelsea FC',        898,              'Spain'],
      ]);

      var options = {
        title: 'Correlation between Goals and Assists' +
                '(2012-13)',
        hAxis: {title: 'Goals'},
        vAxis: {title: 'Assists'},
        bubble: {textStyle: {fontSize: 11}}      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
