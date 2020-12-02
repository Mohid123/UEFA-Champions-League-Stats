window.onload = init;
function init(){

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
        color: [0, 239, 215, 0.5]  
      }),
      stroke: new ol.style.Stroke({
        color: '#DA00B5',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'Manchester United'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [192, 11, 14, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: '#C6A1C6',
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
  else if (feature.get('Top_Clubs') == 'Schalke 04'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [86, 162, 255, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
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
        color: [219, 142, 0, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'brown',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'CFR Cluj'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [188, 15, 0, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'maroon',
        width: 3
      })
    });
  }
  else if (feature.get('Top_Clubs') == 'FC Porto'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [10, 255, 30, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'yellow',
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
  else if (feature.get('Top_Clubs') == 'Inter Milan'){
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0, 119, 121, 0.5] 
      }),
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 3
      })
    });
  }
  else {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [250, 25, 250, 0.5]
      }),
      stroke: new ol.style.Stroke({
        color: 'white',
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

/* OSM basemap tile*/

var layer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

/* Set the view parameters for the map such as zoom and default center*/

var view =  new ol.View({
  center: ol.proj.fromLonLat([1.98359, 41.7311]),
  zoom: 6
});

/* add fullscreen functionality to map*/

var fullscreen = new ol.control.FullScreen();

/* add basemap and geojson to the variable map. This displays the map on the browser*/

var map = new ol.Map({
  target: 'map',
  controls: new ol.control.defaults().extend([fullscreen]),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    countries
    ],
    view: view
});

var layer = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([1.98359, 41.7311]))
            })
        ]
    })
});
map.addLayer(layer);

layer.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'bar.png'
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
        duration: 250
    }
});
map.addOverlay(overlay);

closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

/* function to display the popup when clicked on the map along with image and details*/

map.on('singleclick', function (event) {
    if (map.hasFeatureAtPixel(event.pixel) === true) {
        var coordinate = new ol.proj.fromLonLat([1.98359, 41.7311]);

        content.innerHTML = '<h4>Champions of Europe: FC Barcelona</h4>' +
        '<img src="city.jpg"></img>' +
        '<p>The golden generation of footballers to play for FC Barcelona brought home their fourth title by playing some of the most beautiful football the world as ever seen. They beat Manchester United in the final 3-1 on aggregate at the Wembley Stadium in London</p>';
        overlay.setPosition(coordinate);
    } else {
        overlay.setPosition(coordinate);
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-2.28129, 53.5159]))
            })
        ]
    })
});
map.addLayer(layer2);

layer2.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'manchester.png'
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
                geometry: new ol.geom.Point(ol.proj.fromLonLat([8.78705, 51.9395]))
            })
        ]
    })
});
map.addLayer(layer4);

layer4.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'schalke.png'
	})
}));

var layer5 = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([24.9913, 45.845]))
            })
        ]
    })
});
map.addLayer(layer5);

layer5.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'cluj.png'
	})
}));

var layer6 = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([31.4099, 49.0091]))
            })
        ]
    })
});
map.addLayer(layer6);

layer6.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'shakhtar.png'
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

var layer10 = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([9.26985, 45.6328]))
            })
        ]
    })
});
map.addLayer(layer10);

layer10.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'inter.png'
	})
}));

var layer11 = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-0.12755, 51.507222]))
            })
        ]
    })
});
map.addLayer(layer11);

layer11.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
		src: 'tot.png'
	})
}));

var layer12 = new ol.layer.Vector({
	source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([-8.35236, 41.2247]))
            })
        ]
    })
});
map.addLayer(layer12);

layer12.setStyle(new ol.style.Style({
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

//------PIE CHARTS, BAR CHARTS and RELATIONAL CHARTS FOR STATISTICAL REPRESENTATION
google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawAssistChart);
google.charts.setOnLoadCallback(drawbarChart);
google.charts.setOnLoadCallback(drawbarAssistChart);
google.charts.setOnLoadCallback(drawSeriesChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.    
	function drawChart() {
	// Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Golazo');
    data.addColumn('number', 'Gol');
    data.addRows([
        ['Messi', 12],
        ['Eto,o', 8],
        ['Gomez', 8],
        ['Ronaldo', 6],
        ['Soldado', 6],
        ['Raul', 5]
        ]);
        // Set chart options
    var options = {'title':'Top Goal Scorers 2010-11',
    width:600,
    height:400,
     is3D: true,
 };

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
}

function drawAssistChart() {
	var data = new google.visualization.DataTable();
    data.addColumn('string', 'Asister');
    data.addColumn('number', 'Assist');
    data.addRows([
    	['Eto,o', 5],
        ['Martins', 5],
        ['Iniesta', 5],
        ['Ozil', 6],
        ['Giggs', 5],
        ['Culio', 4]
        ]);
    var options = {title:'Top Assisters 2010-11',
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
        ["Messi", 12, "#b87333"],
        ["Eto,o", 8, "silver"],
        ["Gomez", 8, "gold"],
        ["Ronaldo", 6, "color: #e5e4e2"],
        ["Soldado", 6, "color: orange"],
        ["Raul", 5, "color: #E18383"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Goal Scorers 2010-11, in numbers",
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
        ["Eto,o", 5, "#8B0D0D"],
        ["Martins", 5, "#8E27F6"],
        ["Iniesta", 5, "gold"],
        ["Ozil", 6, "color: #F62731"],
        ["Giggs", 5, "color: #27F2F6"],
        ["Culio", 4, "color: #13EC08"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Top Assist Providers 2010-11, in numbers",
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
        ['Lionel Messi',     12,       0,      'FC Barcelona',      1098,          'Argentina'], 
        ['Cristiano Ronaldo', 6,       0,       'Real Madrid',      1067,          'Portugal'],
        ['Samuel Etoo',       8,       5,       'Inter Milan',       937,           'Cameroon'],
        ['Carlos Martins',    0,       5,       'Benfica',           435,           'Portugal'], 
        ['Mesut Ozil',        0,       6,       'Real Madrid',       804,           'Turkey'],
        ['Ryan Giggs',        0,       5,        'Manchester United', 576,           'England'],
        ['Mario Gomez',       8,       0,        'Bayern Munich',     634,           'Germany'],
        ['Roberto Soldado',   6,       0,       'Valencia',           438,           'Spain'],
        ['Raul',              5,       0,       'Schalke 04',        1130,          'Spain'],
        ['Emmanuel Culio',    0,       4,      'CFR Cluj',           524,           'Argentina'],
        ['Andres Iniesta',    0,       5,      'FC Barcelona',        898,           'Spain/Catalunya'],
      ]);

      var options = {
        title: 'Correlation between Goals and Assists' +
                '(2010-11)',
        hAxis: {title: 'Goals'},
        vAxis: {title: 'Assists'},
        bubble: {textStyle: {fontSize: 11}}      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }

}