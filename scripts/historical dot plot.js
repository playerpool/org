var dataset;

var margin = {top: 30, right: 50, bottom: 50, left: 150},
    w = 900 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom,
    pad = 10;

var div = d3.select(".main")
    .append("div")
    .attr("class","tooltip")				
    .style("opacity", 0);

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

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.totalpoints;
        })])
        .rangeRound([h, 0]);

    var xscale = d3.scaleLinear()
        .domain([d3.min(dataset, function(d) {
            return d.year;
        }),
         d3.max(dataset, function(d) {
            return d.year;
        })])
        .rangeRound([pad, w-2*pad]);

    var xaxis = d3.axisBottom()
        .scale(xscale);

    var yaxis = d3.axisLeft()
        .scale(yscale);

    var svg = d3.select(".chart")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

    svg.append("text")
        .attr("class", "xlabel")
        .attr("x", (w + margin.left)/2)
        .attr("y", h + margin.top + margin.bottom + pad*2)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .style("stroke", "darkblue")
        .text("Overall pick");

    svg.append("text")
        .attr("class", "ylabel")
        .attr("x", 0)
        .attr("y", (h + margin.top + margin.bottom)/2)
        .style("text-anchor", "left")
        .style("font-size", "20px")
        .style("stroke", "darkblue")
        .text("Total points");
    
    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("r", h/90)
        .attr("cx", function(d) { 
            return xscale(d.year) + margin.left;
        })
        .attr("cy", function(d) {
            return yscale(d.totalpoints) + margin.top;
        })
        .attr("fill", "CORNFLOWERBLUE")
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

    svg.append("g")
        .attr("class", "x axis") // assigning an axis attribute (optional)
        .attr("transform", "translate(" + margin.left + "," + (h + margin.top) + ")")
        .call(xaxis);

    svg.append("g")
        .attr("class", "y axis") // assigning an axis attribute (optional)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yaxis);

    d3.selectAll("button")
        .on("click", function() {

            var person = d3.select(this).attr("id")

            var color = d3.select(this).attr("color")

            dataset = data.filter(function(d) { 
                return d.person == person; 
            });

            yscale.domain([0, d3.max(dataset, function(d) {
                return d.totalpoints;
            })]) 

            xscale.domain([d3.min(dataset, function(d) {
                return d.year;
            }),
             d3.max(dataset, function(d) {
                return d.year;
            })])

            var duration = 500;

            svg.selectAll("circle")
                .data(dataset)
                .transition()
                .delay(function(d,i) {
                    return i*dataset.length/15;
                })
                .duration(duration)
                .attr("cx", function(d) { 
                    return xscale(d.year) + margin.left;
                })
                .attr("cy", function(d) {
                    return yscale(d.totalpoints) + margin.top;
                })
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