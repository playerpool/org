var dataset;

var margin = {top: 30, right: 50, bottom: 60, left: 85},
    w = 850 - margin.left - margin.right,
    h = 540 - margin.top - margin.bottom,
    pad = 10;

var div = d3.select(".main")
    .append("div")
    .attr("class", "tooltip2")
    .style("opacity", 0);

var data = d3.csv("data/picks.csv", function(d) {
    return {
        person: d.person,
        seed: +d.seed,
        picks: +d.picks,
    };
}).then(function(data) {
    dataset = data.filter(function(d) { 
        return d.person == "Total"; 
    });
    console.log(dataset);

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.picks;
        })])
        .rangeRound([0, h]);
    
    var yscaleaxis = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.picks;
        })])
        .rangeRound([h, 0]);

    var xscale = d3.scaleLinear()
        .domain([0.5, d3.max(dataset, function(d) {
            return d.seed;
        })])
        .rangeRound([0, w-2*pad]);

    var xaxis = d3.axisBottom()
        .ticks(12)
        .scale(xscale);

    var yaxis = d3.axisLeft()
        .scale(yscaleaxis);

    var svg = d3.select(".chart")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom);

    svg.append("text")
        .attr("class", "xlabel")
        .attr("x", (w + margin.right + margin.left)/2)
        .attr("y", h + margin.top + margin.bottom - pad)
        .style("text-anchor", "left")
        .style("font-size", "20px")
        .style("stroke", "darkblue")
        .text("Team seed");

    svg.append("text")
        .attr("class", "ylabel")
        .attr("x", 0)
        .attr("y", (h + margin.top + margin.bottom)/2)
        .style("text-anchor", "left")
        .style("font-size", "20px")
        .style("stroke", "darkblue")
        .text("Picks");
    
    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xscale(d.seed) + margin.left - (w/30);
        })
        .attr("y", function(d) { 
            return h - yscale(d.picks) + margin.top;
        })
        .attr("height", function(d) { 
            return yscale(d.picks);
        })
        .attr("width", w / 16)
        .attr("fill", "GRAY")
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html("Total picks: " + d.picks)	
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

            yscale.domain([0,35])
        
            yscaleaxis.domain([0,35])

            xscale.domain([0.5, d3.max(dataset, function(d) {
                return d.seed;
            })])

            var duration = 700;

            svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d,i) {
                    return i*dataset.length/15;
                })
                .duration(duration)
                .attr("height", function(d) { 
                    return yscale(d.picks);
                })
                .attr("width", w / 16)
                .attr("x", function(d) {
                    return xscale(d.seed) + margin.left - (w/30);
                })
                .attr("y", function(d) { 
                    return h - yscale(d.picks) + margin.top;
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