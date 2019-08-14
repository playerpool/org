var dataset;

var duration = 750;

var jitternum = 10;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var margin = {top: 30, right: 50, bottom: 20, left: 50},
    w = 800 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom,
    pad = 10;

var yvar = ["PPG", "Year","Round 1","Round 2","Round 3","Round 4","Round 5","Round 6", "Points", "Games", "Draft Slot"];
var xvar = ["Year","Round 1","Round 2","Round 3","Round 4","Round 5","Round 6", "Points", "Games", "PPG", "Draft Slot"];

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")				
    .style("opacity", 0);

var data = d3.csv("data/pp2.csv", function(d) {
    return {
        person: d.person,
        year: +d.year,
        round1: +d.round1,
        round2: +d.round2,
        round3: +d.round3,
        round4: +d.round4,
        round5: +d.round5,
        round6: +d.round6,
        totalpoints: +d.total,
        gamesplayed: +d.games,
        ppg: +d.ppg,
        draft: +d.draftposition
    };
}).then(function(data) {
    dataset = data;
    console.log(dataset);

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.ppg;
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
            .attr("width", w + margin.top + margin.bottom)
            .attr("height", h + margin.top + margin.bottom + 50);

    svg.append("text")
        .attr("class", "xlabel")
        .attr("x", w/2)
        .attr("y", h + margin.top + margin.bottom + pad*2)
        .style("text-anchor", "middle")
        .text("Overall pick");

    svg.append("text")
        .attr("class", "ylabel")
        .attr("transform", "rotate(-90)")
        .attr("x", 0-margin.left)
        .attr("y", h/3)
        .style("text-anchor", "middle")
        .text("Overall pick");

    var select_y = d3.select('.statpicky')
      .append('select')
        .attr('class','select')
        .attr("id", "selecty");

    var options_y = select_y
      .selectAll('option')
        .data(yvar).enter()
        .append('option')
            .text(function (d) { return d; });

    var select_x = d3.select('.statpickx')
      .append('select')
        .attr('class','select')
        .attr("id", "selectx");

    var options_x = select_x
      .selectAll('option')
        .data(xvar).enter()
        .append('option')
            .text(function (d) { return d; });

    select_y.append("span")
        .text("Y variable");

    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("r", h/100)
        .attr("cx", function(d) { 
            return xscale(d.year) + margin.left;
        })
        .attr("cy", function(d) {
            return yscale(d.ppg) + margin.top;
        })
        .attr("fill", "silver")
        .attr("stroke", "slategray")
        .attr("fill-opacity", 0.5)
        .attr("stroke-width", 1.5)
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.person + "<br/>" + d.year)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (h + margin.top) + ")")
        .call(xaxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(yaxis);

    var inputElems_y = d3.select("#selecty");
    var inputElems_x = d3.select("#selectx");

    inputElems_y.on("change", inputChange_y);
    inputElems_x.on("change", inputChange_x);

    function inputChange_y() {
        var inputValue = this.value;

        if      (inputValue === "Total points" ) { changey_points();  }
        else if (inputValue === "Games") { changey_games(); }
        else if (inputValue === "Overall pick") { changey_pick(); }
        else if (inputValue === "Seed") { changey_seed(); }
        else if (inputValue === "Year") { changey_year(); };
    };

    function changey_points () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        yscale.domain([0, d3.max(dataset, function(d) {
                    return d.totalpoints;
            })]);

        circ.transition()
                .duration(dur)
                .attr("cy", function(d) {
                    return yscale(d.totalpoints) + margin.top;
                });

        svg.select(".y.axis")
                .transition()
                .duration(duration)
                .call(yaxis);
    };

    function changey_games () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        yscale.domain([0, d3.max(dataset, function(d) {
                    return d.gamesplayed;
            })+1]);

        circ.transition()
                .duration(dur)
                .attr("cy", function(d) {
                    if (d.gamesplayed === 0 ) {return yscale(d.gamesplayed) + margin.top - getRandomIntInclusive(0,jitternum);  }
                    else {return yscale(d.gamesplayed) + margin.top - getRandomIntInclusive(-1*jitternum,jitternum);}
                });

        svg.select(".y.axis")
                .transition()
                .duration(duration)
                .call(yaxis);
    }; 

    function changey_pick () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        yscale.domain([0, d3.max(dataset, function(d) {
                    return d.pick;
            })+5]);

        circ.transition()
                .duration(dur)
                .attr("cy", function(d) {
                    return yscale(d.pick) + margin.top  - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".y.axis")
                .transition()
                .duration(duration)
                .call(yaxis);
    };

    function changey_seed () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        yscale.domain([0, d3.max(dataset, function(d) {
                    return d.seed;
            })+1]);

        circ.transition()
                .duration(dur)
                .attr("cy", function(d) {
                    return yscale(d.seed) + margin.top - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".y.axis")
                .transition()
                .duration(duration)
                .call(yaxis);
    };

    function changey_year () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        yscale.domain([d3.min(dataset, function(d) {
                    return d.year;
            })-1, d3.max(dataset, function(d) {
                    return d.year;
            })+1]);

        circ.transition()
                .duration(dur)
                .attr("cy", function(d) {
                    return yscale(d.year) + margin.top - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".y.axis")
                .transition()
                .duration(duration)
                .call(yaxis);
    }; 

    function inputChange_x() {
        var inputValue = this.value;

        if      (inputValue === "Total points" ) { changex_points();  }
        else if (inputValue === "Games") { changex_games(); }
        else if (inputValue === "Overall pick") { changex_pick(); }
        else if (inputValue === "Seed") { changex_seed(); }
        else if (inputValue === "Year") { changex_year(); };
    };

    function changex_points () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        xscale.domain([0, d3.max(dataset, function(d) {
                    return d.totalpoints;
            })]);

        circ.transition()
                .duration(dur)
                .attr("cx", function(d) {
                    return xscale(d.totalpoints) + margin.left;
                });

        svg.select(".x.axis")
                .transition()
                .duration(duration)
                .call(xaxis);
    };

    function changex_games () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        xscale.domain([0, d3.max(dataset, function(d) {
                    return d.gamesplayed;
            })]);

        circ.transition()
                .duration(dur)
                .attr("cx", function(d) {
                    if (d.gamesplayed === 0 ) {return xscale(d.gamesplayed) + margin.left + getRandomIntInclusive(0,jitternum);  }
                    else {return xscale(d.gamesplayed) + margin.left - getRandomIntInclusive(-1*jitternum,jitternum);}
                });

        svg.select(".x.axis")
                .transition()
                .duration(duration)
                .call(xaxis);
    }; 

    function changex_pick () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        xscale.domain([0, d3.max(dataset, function(d) {
                    return d.pick;
            })]);

        circ.transition()
                .duration(dur)
                .attr("cx", function(d) {
                    return xscale(d.pick) + margin.left - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".x.axis")
                .transition()
                .duration(duration)
                .call(xaxis);
    };

    function changex_seed () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        xscale.domain([0, d3.max(dataset, function(d) {
                    return d.seed;
            })]);

        circ.transition()
                .duration(dur)
                .attr("cx", function(d) {
                    return xscale(d.seed) + margin.left - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".x.axis")
                .transition()
                .duration(duration)
                .call(xaxis);
    };

    function changex_year () {
        var dur = duration;

        var circ = svg.selectAll("circle")
                .data(dataset);

        xscale.domain([d3.min(dataset, function(d) {
                    return d.year;
            })-1, d3.max(dataset, function(d) {
                    return d.year;
            })+1]);

        circ.transition()
                .duration(dur)
                .attr("cx", function(d) {
                    return xscale(d.year) + margin.left - getRandomIntInclusive(-1*jitternum,jitternum);
                });

        svg.select(".x.axis")
                .transition()
                .duration(duration)
                .call(xaxis);
    }; 
});