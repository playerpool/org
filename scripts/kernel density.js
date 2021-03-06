var dataset;
// set the dimensions and margins of the graph
var margin = {top: 30, right: 50, bottom: 60, left: 100},
    width = 900 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom,
    pad = 10;

// append the svg object to the body of the page
var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the data
var data = d3.csv("data/pp.csv", function(d) {

  return {
            year: +d.year,
            person: d.person,
            totalpoints: +d.totalpoints,
            player: d.player,
            school: d.school,
            seed: +d.seed,
            gamesplayed: +d.gamesplayed,
            pick: +d.overallpick
        };
    }).then(function(data) {
        dataset = data.filter(function(d) { 
            return d.person == "Adam"; 
        });

  var x = d3.scaleLinear()
    .domain([0, 141])
    .range([0, width]);

  var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 0.025]);

    var xaxis = d3.axisBottom()
            .scale(x);

    var yaxis = d3.axisLeft()
            .scale(y)
            .ticks(0);

  // Compute kernel density estimation for the first group
  var kde = kernelDensityEstimator(kernelEpanechnikov(15), x.ticks(140))
  var density =  kde( data
    .filter(function(d){ return d.person == "Adam"})
    .map(function(d){  return +d.totalpoints; })
  )

  // Plot the curve
  var area = d3.area()
          .x(function(d) { return x(d[0]); })
          .y0(function() { return y.range()[0]})
          .y1(function(d) { return y(d[1]); });
  var curve = svg
    .append('g')
    .append("path")
      .attr("class", "mypath")
      .datum(density)
      .attr("fill", "CORNFLOWERBLUE")
      .attr("opacity", ".8")
      .attr("stroke", "CORNFLOWERBLUE")
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("d", area);

    svg.append("g")
            .attr("class", "x axis") // assigning an axis attribute (optional)
            .attr("transform", "translate(0," + (height) + ")")
            .call(xaxis)
    .append("text")
            .attr("class", "xlabel")
            .attr("x", width/2)
            .attr("y", +50)
            .attr("fill", "#000")
            .attr("text-anchor", "center")
            .style("font-size", "20px")
            .style("stroke", "darkblue")
            .text("Player tournament points");

    svg.append("g")
        .attr("class", "y axis") // assigning an axis attribute (optional)
        .attr("transform", "translate(0,0)")
        .call(yaxis);

  d3.selectAll("button")
            .on("click", function() {

                var person = d3.select(this).attr("id")

                var color = d3.select(this).attr("color")

                x.domain([0, 141]);
                y.domain([0, 0.025]);

                kde = kernelDensityEstimator(kernelEpanechnikov(15), x.ticks(140))
                var density = kde(data.filter(function(d) { 
                return d.person == person; 
                })
                .map(function(d){return +d.totalpoints; }))

    var duration = 1000;

    var area = d3.area()
        .x(function(d) { return x(d[0]); })
          .y0(function() { return y.range()[0]})
          .y1(function(d) { return y(d[1]); });

      curve
      .datum(density)
      .transition()
      .duration(duration)
      .attr("d", area)
      .attr("stroke", color)
      .attr("fill", color);

      svg.select(".x.axis")
                    .transition()
                    .duration(duration)
                    .call(xaxis);

                svg.select(".y.axis")
                    .transition()
                    .duration(duration)
                    .call(yaxis); 
       }); 


});

// Function to compute density
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
