var dataset,
    margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var data = d3.csv("../data/cumrank.csv", function(d) {
    return {
            year: +d.year,
            person: d.person,
            cumrank: +d.cumrank,
        };
    }).then(function(data) {
        dataset = data.filter(function(d) { 
            return d.person == "Adam"; 
        });
        console.log(dataset);

        var x = d3.scaleLinear()
            .domain([2009, 2019])
            .range([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0])
            .domain([8, 1]);

        var xaxis = d3.axisBottom()
            .scale(x);

        var yaxis = d3.axisLeft()
            .scale(y)
            .ticks(9);
    
        var gridlines = d3.axisLeft()
                    .tickFormat("")
                    .ticks(9)
                    .tickSize(-width)
                    .scale(y);

        svg.append("g")
           .attr("class", "grid")
           .call(gridlines);

        var line = d3.line()
            .x(function(d) { return x(d.year); })
            .y(function(d) { return y(d.cumrank); })
            .curve(d3.curveStep);

        var step = svg
            .append('g')
            .append("path")
              .attr("class", "mypath")
              .datum(dataset)
              .attr("fill", "none")
              .attr("opacity", ".8")
              .attr("stroke", "CORNFLOWERBLUE")
              .attr("stroke-width", 3)
              .attr("stroke-linejoin", "round")
              .attr("d", line);

        var circle = d3.select('svg')
            .selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return x(d.year) + margin.left;
            })
            .attr('cy', function(d) {
                return y(d.cumrank) + margin.top;
            })
            .attr('r', 3)
            .attr("fill", "CORNFLOWERBLUE");

        svg.append("g")
                .attr("class", "x axis") // assigning an axis attribute (optional)
                .attr("transform", "translate(0," + (height) + ")")
                .call(xaxis)
            .append("text")
                .attr("x", width/2)
                .attr("y", -20)
                .attr("fill", "#000")
                .attr("text-anchor", "center")
                .attr("font-family", "Gill Sans")
                .attr("font-size", "16px")
                .text("Cumulative points rank");

        svg.append("g")
            .attr("class", "y axis") // assigning an axis attribute (optional)
            .attr("transform", "translate(0,0)")
            .call(yaxis);

        d3.selectAll("button")
            .on("click", function() {

                var person = d3.select(this).attr("id");

                var color = d3.select(this).attr("color");

                dataset = data.filter(function(d) { 
                    return d.person == person; 
                    });

                x.domain([2009, 2019]);
                y.domain([8, 1]);

                var duration = 1000;

                var line = d3.line()
                    .x(function(d) { return x(d.year); })
                    .y(function(d) { return y(d.cumrank); })
                    .curve(d3.curveStep);

                step
                    .datum(dataset)
                    .transition()
                    .duration(duration)
                    .attr("d", line)
                    .attr("stroke", color);

                circle
                    .data(dataset)
                    .transition()
                    .duration(duration)
                    .attr("cx", function(d) { 
                        return x(d.year) + margin.left;
                    })
                    .attr("cy", function(d) {
                        return y(d.cumrank) + margin.top;
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