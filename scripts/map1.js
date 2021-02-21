//var dataset;

var duration = 750;

/*var jitternum = 1;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} */

var margin = {top: 30, right: 50, bottom: 40, left: 150},
    w = 900 - margin.left - margin.right,
    h = 520 - margin.top - margin.bottom,
    pad = 10;

var div = d3.select("body")
            .append("div")
            .attr("class","tooltip")				
            .style("opacity", 0);

var svg = d3.select(".chart")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom);

//Define the projection of lon/lat onto x/y
var projection = d3.geoAlbersUsa()
                .translate([(w + margin.left + margin.right)/2, (h + margin.top + margin.bottom)/2])
                .scale(700);

console.log(projection([-110.22,40.44]));

var initialScale = projection.scale();

//Define the path generator
var path = d3.geoPath()
             .projection(projection);

//Define what to do when dragging
var dragging = function(d) {

    var offset = projection.translate()
    
    var az = 2
    
    projection.translate([
      offset[0] + d3.event.dx*az,
      offset[1] + d3.event.dy*az
    ]);

    map.selectAll("path")
        .attr("d", path);

    map.selectAll("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0]
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1]
        });
};

//Define what to do when zooming
var zooming = function(d) {

    var currentScale = projection.scale();

    const k = 200 / currentScale;

    projection.scale(initialScale * d3.event.transform.k);

    path = d3.geoPath().projection(projection);

    map.selectAll("path")
        .attr("d", path);

    map.selectAll("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0]
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1]
        })
        .attr("r", projection.scale()/200);

};

var drag = d3.drag()
             .on("drag", dragging);

var zoom = d3.zoom()
             .on("zoom", zooming);

//Create a container for "draggable" items 
var map = svg.append("g")
             .attr("id", "map")
             .call(drag)
             .call(zoom);

map.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .attr("opacity", 0);

//Load the GeoJSON
d3.json("data/states500k.json")
    .then(function(json) {

    //Bind data and create one path per GeoJSON feature
    map.selectAll("path.feature")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "feature")
        .attr("d", path)
        .attr("fill", "whitesmoke")
        .attr("opacity", .5)
        .attr("stroke", "darkblue")
        .attr("stroke-width", "0.25");
    
    hold();
});

//load the data
function hold() {  // I'm putting all this code in a function so that it won't run before the JSON loads. Note how I call 'hold()' in the d3.json function
var data = d3.csv("data/pp.csv", function(d) {
    return {
        year: +d.year,
        person: d.person,
        totalpoints: +d.totalpoints,
        player: d.player,
        school: d.school,
        seed: +d.seed,
        gamesplayed: +d.gamesplayed,
        pick: +d.overallpick,
        lon: +d.longitude,
        lat: +d.latitude
    };
}).then(function(data) {
     dataset = data.filter(function(d) { 
            return d.person == "Adam"; 
        });

    //Bind the filtered data and create one circle per lon/lat
    map.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0]
        })
        .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1]
        })
        .attr("r", projection.scale()/200)
        .style("fill", "whitesmoke")
        .style("opacity", 0.75)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html(d.player + "<br/>" + d.school + " - " + d.seed + "<br/>" + "Pts: " + d.totalpoints + ", Gms: " + d.gamesplayed+ "<br/>" + "Pick #" + d.pick)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);
    });

   // Update the circles based on the selected person
    d3.selectAll("button")
        .on("click", function() {

            var person = d3.select(this).attr("id");

            var color = d3.select(this).attr("color");

            dataset = data.filter(function(d) { 
            return d.person == person; 
            });

            var duration = 500;

            var circ = map.selectAll("circle")
                .data(dataset);

            circ.exit()
                .transition()
                .duration(duration)
                .style("fill-opacity", 1e-6)
                .remove();

            circ.enter()
                .append("circle")
                .attr("r", projection.scale()/200)
                .attr("cx", function(d) { 
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", color)
                .style("opacity", 1)
                .merge(circ)
                .on("mouseover", function(d) {		
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                     div.html(d.player + "<br/>" + d.school + " - " + d.seed + "<br/>" + "Pts: " + d.totalpoints + ", Gms: " + d.gamesplayed+ "<br/>" + "Pick #" + d.pick)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                })					
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(duration)		
                        .style("opacity", 0);
                })
                .transition()
                .duration(duration)
                .attr("cx", function(d) { 
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.lon, d.lat])[1];
                })
                .style("fill", color)
                .style("opacity", .75);

    });
});
};