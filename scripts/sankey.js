
var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")				
        .style("opacity", 0);

var dataset,
    margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select(".chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var data = {
    nodes: [
    {id: "A1"},
    {id: "A2"},
    {id: "A3"},
    {id: "A4"},
    {id: "A5"},
    {id: "A6"},
    {id: "A7"},
    {id: "A8"},
    {id: "B1"},
    {id: "B2"},
    {id: "B3"},
    {id: "B4"},
    {id: "B5"},
    {id: "B6"},
    {id: "B7"},
    {id: "B8"},
    ],
    links: [
    { source: "A1", target: "B1", value: 2},
    { source: "A1", target: "B2", value: 0},
    { source: "A1", target: "B3", value: 2},
    { source: "A1", target: "B4", value: 1},
    { source: "A1", target: "B5", value: 0},
    { source: "A1", target: "B6", value: 3},
    { source: "A1", target: "B7", value: 3},
    { source: "A1", target: "B8", value: 0},
    { source: "A2", target: "B1", value: 1},
    { source: "A2", target: "B2", value: 2},
    { source: "A2", target: "B3", value: 0},
    { source: "A2", target: "B4", value: 3},
    { source: "A2", target: "B5", value: 1},
    { source: "A2", target: "B6", value: 0},
    { source: "A2", target: "B7", value: 3},
    { source: "A2", target: "B8", value: 1},
    { source: "A3", target: "B1", value: 4},
    { source: "A3", target: "B2", value: 1},
    { source: "A3", target: "B3", value: 2},
    { source: "A3", target: "B4", value: 0},
    { source: "A3", target: "B5", value: 1},
    { source: "A3", target: "B6", value: 1},
    { source: "A3", target: "B7", value: 0},
    { source: "A3", target: "B8", value: 2},
    { source: "A4", target: "B1", value: 0},
    { source: "A4", target: "B2", value: 2},
    { source: "A4", target: "B3", value: 3},
    { source: "A4", target: "B4", value: 1},
    { source: "A4", target: "B5", value: 1},
    { source: "A4", target: "B6", value: 2},
    { source: "A4", target: "B7", value: 0},
    { source: "A4", target: "B8", value: 2},
    { source: "A5", target: "B1", value: 0},
    { source: "A5", target: "B2", value: 2},
    { source: "A5", target: "B3", value: 0},
    { source: "A5", target: "B4", value: 1},
    { source: "A5", target: "B5", value: 3},
    { source: "A5", target: "B6", value: 2},
    { source: "A5", target: "B7", value: 1},
    { source: "A5", target: "B8", value: 2},
    { source: "A6", target: "B1", value: 0},
    { source: "A6", target: "B2", value: 1},
    { source: "A6", target: "B3", value: 0},
    { source: "A6", target: "B4", value: 2},
    { source: "A6", target: "B5", value: 2},
    { source: "A6", target: "B6", value: 2},
    { source: "A6", target: "B7", value: 3},
    { source: "A6", target: "B8", value: 1},
    { source: "A7", target: "B1", value: 1},
    { source: "A7", target: "B2", value: 3},
    { source: "A7", target: "B3", value: 1},
    { source: "A7", target: "B4", value: 2},
    { source: "A7", target: "B5", value: 2},
    { source: "A7", target: "B6", value: 1},
    { source: "A7", target: "B7", value: 0},
    { source: "A7", target: "B8", value: 1},
    { source: "A8", target: "B1", value: 3},
    { source: "A8", target: "B2", value: 1},
    { source: "A8", target: "B3", value: 2},
    { source: "A8", target: "B4", value: 1},
    { source: "A8", target: "B5", value: 1},
    { source: "A8", target: "B6", value: 0},
    { source: "A8", target: "B7", value: 1},
    { source: "A8", target: "B8", value: 2},
    ]
};

const sankey = d3.sankey()
        .size([width, height])
        .nodeId(d => d.id)
        .nodeWidth(30)
        .nodePadding(40)
        .nodeAlign(d3.sankeyCenter)
        .nodeSort(null);
let graph = sankey(data);

graph.nodes.forEach(node => {
    node.width = node.x1 - node.x0;
    node.height = node.y1 - node.y0;
});

let links = svg.append("g")
       .classed("links", true)
       .selectAll("path")
       .data(graph.links)
       .enter()
       .append("path")
       .classed("link", true)
       .attr("d", d3.sankeyLinkHorizontal())
       .attr("fill", "none")
       .attr("stroke", "lightgray")
       .attr("stroke-width", d => d.width)
       .attr("stoke-opacity", 0.5)
       .on("mouseover", function(d) {
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html(d.source.id + " " + d.target.id + " " + d.source.value)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

links.append("title")
    .selectAll("text")
    .data(graph.links)
    .enter()
    .append("text")
       .text(function(d) {
    return d.source + " → " + d.target;
    });

let nodes = svg.append("g")
       .classed("nodes", true)
       .selectAll("rect")
       .data(graph.nodes)
       .enter()
       .append("rect")
       .classed("node", true)
       .attr("x", d => d.x0)
       .attr("y", d => d.y0)
       .attr("width", d => d.x1 - d.x0)
       .attr("height", d => d.y1 - d.y0)
       .attr("fill", "darkblue")
       .attr("opacity", 0.8);

var labels = {
    pick: [
        {name: "1st", x: margin.left-45, y: margin.top},
        {name: "2nd", x: margin.left-45, y: margin.top + (height+margin.top)/8},
        {name: "3rd", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*2},
        {name: "4th", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*3},
        {name: "5th", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*4},
        {name: "6th", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*5},
        {name: "7th", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*6},
        {name: "8th", x: margin.left-45, y: margin.top + ((height+margin.top)/8)*7},
    ],
    finish: [
        {name: "1st", x: width/2, y: height/2},
    ]
};

var labs = svg.selectAll("text")
    .data(labels.pick)
    .enter()
    .append("text")
    .attr("id", "textlab")
    .attr("x", 100)
    .attr("y", 100)
    .text(d => d.name)
    .attr("fill", "gray");
