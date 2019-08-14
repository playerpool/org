var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")				
        .style("opacity", 0);

        var dataset,
            margin = {top: 50, right: 80, bottom: 30, left: 80},
            width = 700 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom,
            pad = 4;

        var svg = d3.select(".chart")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");
        
        svg.append("text")
            .attr("class", "xlabel")
            .attr("x", width - 10)
            .attr("y", -15)
            .style("text-anchor", "middle")
            .style("font-size", "20px")
            .style("stroke", "darkblue")
            .text("Finish");

        svg.append("text")
            .attr("class", "ylabel")
            .attr("x", 0)
            .attr("y", -15)
            .style("text-anchor", "middle")
            .style("font-size", "20px")
            .style("stroke", "darkblue")
            .text("Draft slot");    
        
        var data = {
            nodes: [
            {id: "A1", name: "1st"},
            {id: "A2", name: "2nd"},
            {id: "A3", name: "3rd"},
            {id: "A4", name: "4th"},
            {id: "A5", name: "5th"},
            {id: "A6", name: "6th"},
            {id: "A7", name: "7th"},
            {id: "A8", name: "8th"},
            {id: "B1", name: "1st"},
            {id: "B2", name: "2nd"},
            {id: "B3", name: "3rd"},
            {id: "B4", name: "4th"},
            {id: "B5", name: "5th"},
            {id: "B6", name: "6th"},
            {id: "B7", name: "7th"},
            {id: "B8", name: "8th"},
            ],
            links: [
            { source: "A1", target: "B1", value: 1, name1: "Andrew F"},
            { source: "A1", target: "B1", value: 1, name1: "Andrew L"},
            { source: "A1", target: "B3", value: 1, name1: "Alex"},
            { source: "A1", target: "B3", value: 1, name1: "James"},
            { source: "A1", target: "B4", value: 1, name1: "Adam"},
            { source: "A1", target: "B6", value: 1, name1: "Andrew F"},
            { source: "A1", target: "B6", value: 1, name1: "Rob"},
            { source: "A1", target: "B6", value: 1, name1: "Rob"},
            { source: "A1", target: "B7", value: 1, name1: "Andrew F"},
            { source: "A1", target: "B7", value: 1, name1: "Andrew L"},
            { source: "A1", target: "B7", value: 1, name1: "Rob"},
            { source: "A2", target: "B1", value: 1, name1: "Andrew L"},
            { source: "A2", target: "B2", value: 1, name1: "Adam"},
            { source: "A2", target: "B2", value: 1, name1: "Rob"},
            { source: "A2", target: "B4", value: 1, name1: "Alex"},
            { source: "A2", target: "B4", value: 1, name1: "Bryan"},
            { source: "A2", target: "B4", value: 1, name1: "Josh"},
            { source: "A2", target: "B5", value: 1, name1: "Bryan"},
            { source: "A2", target: "B7", value: 1, name1: "Alex"},
            { source: "A2", target: "B7", value: 1, name1: "Alex"},
            { source: "A2", target: "B7", value: 1, name1: "Josh"},
            { source: "A2", target: "B8", value: 1, name1: "James"},
            { source: "A3", target: "B1", value: 1, name1: "Bryan"},
            { source: "A3", target: "B1", value: 1, name1: "Bryan"},
            { source: "A3", target: "B1", value: 1, name1: "Josh"},
            { source: "A3", target: "B1", value: 1, name1: "Rob"},
            { source: "A3", target: "B2", value: 1, name1: "Andrew F"},
            { source: "A3", target: "B3", value: 1, name1: "Andrew L"},
            { source: "A3", target: "B3", value: 1, name1: "Rob"},
            { source: "A3", target: "B5", value: 1, name1: "James"},
            { source: "A3", target: "B6", value: 1, name1: "Rob"},
            { source: "A3", target: "B8", value: 1, name1: "Adam"},
            { source: "A3", target: "B8", value: 1, name1: "Bryan"},
            { source: "A4", target: "B2", value: 1, name1: "Adam"},
            { source: "A4", target: "B2", value: 1, name1: "Bryan"},
            { source: "A4", target: "B3", value: 1, name1: "Adam"},
            { source: "A4", target: "B3", value: 1, name1: "Andrew F"},
            { source: "A4", target: "B3", value: 1, name1: "Josh"},
            { source: "A4", target: "B4", value: 1, name1: "Alex"},
            { source: "A4", target: "B5", value: 1, name1: "Andrew F"},
            { source: "A4", target: "B6", value: 1, name1: "Andrew F"},
            { source: "A4", target: "B6", value: 1, name1: "Rob"},
            { source: "A4", target: "B8", value: 1, name1: "Bryan"},
            { source: "A4", target: "B8", value: 1, name1: "Bryan"},
            { source: "A5", target: "B2", value: 1, name1: "Andrew L"},
            { source: "A5", target: "B2", value: 1, name1: "James"},
            { source: "A5", target: "B4", value: 1, name1: "Andrew L"},
            { source: "A5", target: "B5", value: 1, name1: "Andrew F"},
            { source: "A5", target: "B5", value: 1, name1: "Andrew L"},
            { source: "A5", target: "B5", value: 1, name1: "James"},
            { source: "A5", target: "B6", value: 1, name1: "Alex"},
            { source: "A5", target: "B6", value: 1, name1: "Andrew L"},
            { source: "A5", target: "B7", value: 1, name1: "Bryan"},
            { source: "A5", target: "B8", value: 1, name1: "Andrew L"},
            { source: "A5", target: "B8", value: 1, name1: "Josh"},
            { source: "A6", target: "B2", value: 1, name1: "Andrew F"},
            { source: "A6", target: "B4", value: 1, name1: "James"},
            { source: "A6", target: "B4", value: 1, name1: "Josh"},
            { source: "A6", target: "B5", value: 1, name1: "Adam"},
            { source: "A6", target: "B5", value: 1, name1: "Alex"},
            { source: "A6", target: "B6", value: 1, name1: "Andrew F"},
            { source: "A6", target: "B6", value: 1, name1: "Andrew L"},
            { source: "A6", target: "B7", value: 1, name1: "Adam"},
            { source: "A6", target: "B7", value: 1, name1: "James"},
            { source: "A6", target: "B7", value: 1, name1: "Rob"},
            { source: "A6", target: "B8", value: 1, name1: "Josh"},
            { source: "A7", target: "B1", value: 1, name1: "Josh"},
            { source: "A7", target: "B2", value: 1, name1: "Alex"},
            { source: "A7", target: "B2", value: 1, name1: "Bryan"},
            { source: "A7", target: "B2", value: 1, name1: "James"},
            { source: "A7", target: "B3", value: 1, name1: "Alex"},
            { source: "A7", target: "B4", value: 1, name1: "Adam"},
            { source: "A7", target: "B4", value: 1, name1: "Andrew L"},
            { source: "A7", target: "B5", value: 1, name1: "Adam"},
            { source: "A7", target: "B5", value: 1, name1: "James"},
            { source: "A7", target: "B6", value: 1, name1: "Adam"},
            { source: "A7", target: "B8", value: 1, name1: "Rob"},
            { source: "A8", target: "B1", value: 1, name1: "James"},
            { source: "A8", target: "B1", value: 1, name1: "Josh"},
            { source: "A8", target: "B1", value: 1, name1: "Josh"},
            { source: "A8", target: "B2", value: 1, name1: "Adam"},
            { source: "A8", target: "B2", value: 1, name1: "Alex"},
            { source: "A8", target: "B3", value: 1, name1: "Alex"},
            { source: "A8", target: "B4", value: 1, name1: "Bryan"},
            { source: "A8", target: "B5", value: 1, name1: "Andrew F"},
            { source: "A8", target: "B7", value: 1, name1: "Josh"},
            { source: "A8", target: "B8", value: 1, name1: "James"},
            { source: "A8", target: "B8", value: 1, name1: "Rob"}
            ]
        };
        var sankey = d3.sankey()
                .size([width, height])
                .nodeId(d => d.id)
                .nodeWidth(30)
                .nodePadding(40)
                .nodeAlign(d3.sankeyCenter)
                .nodeSort(null);
    
        var graph = sankey(data);
            
        graph.nodes.forEach(node => {
            node.width = node.x1 - node.x0;
            node.height = node.y1 - node.y0;
        });

        var links = svg.append("g")
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
                div.html(d.source.name + " --> " + d.target.name + ", " + d.name1)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                div.transition()		
                    .duration(500)		
                    .style("opacity", 0);	
            });
            
        var nodes = svg.append("g")
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
        
        var labels = svg.append("g")
            .selectAll("text")
            .data(graph.nodes)
            .enter()
            .append("text")
                .attr("class", "xlabel")
                .attr("x", d => d.x0 + pad)
                .attr("y", d => d.y1 - ((d.y1-d.y0)/2))
                .attr("fill", "white")
                .attr("text-anchor", "start")
                .attr("font-family", "Gill Sans")
                .attr("font-size", "16px")
                .text(d => d.name);
        
        d3.selectAll("button")
        .on("click", function() {

            var person = d3.select(this).attr("id")

            var color = d3.select(this).attr("color")
            
            var duration = 700;
            
            var newnodes = data.nodes;
            
            var newlinks = data.links.filter(function(d) { 
                return (d.name1 == person); 
            });
            
            var nodeupdate = svg.selectAll(".nodes").selectAll("rect")
                .data(newnodes);
            
            nodeupdate.transition()
                .delay(0)
                .duration(duration)
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", "darkblue")
                .attr("opacity", 0.8);
            
           var linkupdate = svg.selectAll(".links").selectAll("path")
           .data(newlinks);
            
            linkupdate.transition()
                .delay(0)
                .duration(duration)
                .attr("d", d3.sankeyLinkHorizontal())
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", 4)
                .attr("stoke-opacity", 1)
            
            linkupdate.exit()
                .transition()
                .duration(duration/4)
                .attr("stroke", "white")
                .remove();
        });