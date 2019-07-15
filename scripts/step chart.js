var dataset,
    margin = {top: 30, right: 30, bottom: 70, left: 150},
    width = 960 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom,
    pad = 10;

var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

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
        
        svg.append("text")
            .attr("class", "xlabel")
            .attr("x", margin.left + (width + margin.right)/2)
            .attr("y", height + margin.top + margin.bottom - pad)
            .style("text-anchor", "middle")
            .style("font-size", "20px")
            .style("stroke", "darkblue")
            .text("Year");

        svg.append("text")
            .attr("class", "ylabel")
            .attr("x", 0)
            .attr("y", (height + margin.top + margin.bottom - pad)/2)
            .style("text-anchor", "left")
            .style("font-size", "20px")
            .style("stroke", "darkblue")
            .text("Overall rank");

        var x = d3.scaleLinear()
            .domain([2009, 2019])
            .range([margin.left, width + margin.left]);

        var y = d3.scaleLinear()
            .range([height + margin.top, margin.top])
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
           .attr("transform", "translate(" + margin.left + ",0)")
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
                return x(d.year);
            })
            .attr('cy', function(d) {
                return y(d.cumrank);
            })
            .attr('r', 3)
            .attr("fill", "CORNFLOWERBLUE");

        svg.append("g")
                .attr("class", "x axis") // assigning an axis attribute (optional)
                .attr("transform", "translate(0," + (height + margin.top + pad) + ")")
                .call(xaxis)

        svg.append("g")
            .attr("class", "y axis") // assigning an axis attribute (optional)
            .attr("transform", "translate(" + margin.left + ",0)")
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
                        return x(d.year);
                    })
                    .attr("cy", function(d) {
                        return y(d.cumrank);
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