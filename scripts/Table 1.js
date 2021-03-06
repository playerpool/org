var dataset;
var headers;
var row;
var clicks = {year: 0, person: 0, player: 0, school: 0, seed: 0, totalpoints: 0, gamesplayed:0, pick:0};
var tabulate = function (data,columns) {
    var table = d3.select('.chart').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody')
    var column_names = ["Year","Person","Player","School","Seed","Points","Games","Pick"];

    var header = thead.append('tr')
      .selectAll('th')
        .data(column_names)
        .enter()
      .append('th')
        .text(function (d) { return d; })

    headers=header;

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
      .append('tr')

    row=rows;

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
          });
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })
  
return table;
};

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
    
    var columns = ["year","person","player","school","seed","totalpoints","gamesplayed","pick"]
    tabulate(data,columns)
        
     headers
    .on("click", function(d) {
        if (d == "Person") {
            clicks.person++;
            // even number of clicks
            if (clicks.person % 2 == 0) {
              // sort ascending: alphabetically
              row.sort(function(a,b) { 
                if (a.person.toUpperCase() < b.person.toUpperCase()) { 
                  return -1; 
                } else if (a.person.toUpperCase() > b.person.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.person % 2 != 0) { 
              // sort descending: alphabetically
              row.sort(function(a,b) { 
                if (a.person.toUpperCase() < b.person.toUpperCase()) { 
                  return 1; 
                } else if (a.person.toUpperCase() > b.person.toUpperCase()) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "Player") {
            clicks.player++;
            if (clicks.player % 2 == 0) {
              row.sort(function(a,b) { 
                if (a.player.toUpperCase() < b.player.toUpperCase()) { 
                  return -1; 
                } else if (a.player.toUpperCase() > b.player.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            } else if (clicks.player % 2 != 0) { 
              row.sort(function(a,b) { 
                if (a.player.toUpperCase() < b.player.toUpperCase()) {  
                  return 1; 
                } else if (a.player.toUpperCase() > b.player.toUpperCase()) {  
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "School") {
            clicks.school++;
            if (clicks.school % 2 == 0) {
              row.sort(function(a,b) { 
                if (a.school.toUpperCase() < b.school.toUpperCase()) { 
                  return -1; 
                } else if (a.school.toUpperCase() > b.school.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            } else if (clicks.school % 2 != 0) { 
              row.sort(function(a,b) { 
                if (a.school.toUpperCase() < b.school.toUpperCase()) {  
                  return 1; 
                } else if (a.school.toUpperCase() > b.school.toUpperCase()) {  
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "Year") {
            clicks.year++;
            // even number of clicks
            if (clicks.year % 2 == 0) {
              // sort ascending: numerically
              row.sort(function(a,b) { 
                if (+a.year < +b.year) { 
                  return -1; 
                } else if (+a.year > +b.year) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.year % 2 != 0) { 
              // sort descending: numerically
              row.sort(function(a,b) { 
                if (+a.year < +b.year) { 
                  return 1; 
                } else if (+a.year > +b.year) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Seed") {
            clicks.seed++;
            if (clicks.seed % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.seed < +b.seed) { 
                  return -1; 
                } else if (+a.seed > +b.seed) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.seed % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.seed < +b.seed) { 
                  return 1; 
                } else if (+a.seed > +b.seed) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Points") {
            clicks.totalpoints++;
            if (clicks.totalpoints % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.totalpoints < +b.totalpoints) { 
                  return -1; 
                } else if (+a.totalpoints > +b.totalpoints) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.totalpoints % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.totalpoints < +b.totalpoints) { 
                  return 1; 
                } else if (+a.totalpoints > +b.totalpoints) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Games") {
            clicks.gamesplayed++;
            if (clicks.gamesplayed % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.gamesplayed < +b.gamesplayed) { 
                  return -1; 
                } else if (+a.gamesplayed > +b.gamesplayed) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.gamesplayed % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.gamesplayed < +b.gamesplayed) { 
                  return 1; 
                } else if (+a.gamesplayed > +b.gamesplayed) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Pick") {
            clicks.pick++;
            if (clicks.pick % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.pick < +b.pick) { 
                  return -1; 
                } else if (+a.pick > +b.pick) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.pick % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.pick < +b.pick) { 
                  return 1; 
                } else if (+a.pick > +b.pick) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
     });
    
    d3.selectAll("button")
            .on("click", function() {

                var person = d3.select(this).attr("id");

                var color = d3.select(this).attr("color");

                dataset = data.filter(function(d) { 
                    return d.person == person; 
                    });

                d3.select("table").remove();

                tabulate(dataset,columns);
        
        headers
    .on("click", function(d) {
        if (d == "Person") {
            clicks.person++;
            // even number of clicks
            if (clicks.person % 2 == 0) {
              // sort ascending: alphabetically
              row.sort(function(a,b) { 
                if (a.person.toUpperCase() < b.person.toUpperCase()) { 
                  return -1; 
                } else if (a.person.toUpperCase() > b.person.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.person % 2 != 0) { 
              // sort descending: alphabetically
              row.sort(function(a,b) { 
                if (a.person.toUpperCase() < b.person.toUpperCase()) { 
                  return 1; 
                } else if (a.person.toUpperCase() > b.person.toUpperCase()) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "Player") {
            clicks.player++;
            if (clicks.player % 2 == 0) {
              row.sort(function(a,b) { 
                if (a.player.toUpperCase() < b.player.toUpperCase()) { 
                  return -1; 
                } else if (a.player.toUpperCase() > b.player.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            } else if (clicks.player % 2 != 0) { 
              row.sort(function(a,b) { 
                if (a.player.toUpperCase() < b.player.toUpperCase()) {  
                  return 1; 
                } else if (a.player.toUpperCase() > b.player.toUpperCase()) {  
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "School") {
            clicks.school++;
            if (clicks.school % 2 == 0) {
              row.sort(function(a,b) { 
                if (a.school.toUpperCase() < b.school.toUpperCase()) { 
                  return -1; 
                } else if (a.school.toUpperCase() > b.school.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            } else if (clicks.school % 2 != 0) { 
              row.sort(function(a,b) { 
                if (a.school.toUpperCase() < b.school.toUpperCase()) {  
                  return 1; 
                } else if (a.school.toUpperCase() > b.school.toUpperCase()) {  
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
        }
        if (d == "Year") {
            clicks.year++;
            // even number of clicks
            if (clicks.year % 2 == 0) {
              // sort ascending: numerically
              row.sort(function(a,b) { 
                if (+a.year < +b.year) { 
                  return -1; 
                } else if (+a.year > +b.year) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.year % 2 != 0) { 
              // sort descending: numerically
              row.sort(function(a,b) { 
                if (+a.year < +b.year) { 
                  return 1; 
                } else if (+a.year > +b.year) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Seed") {
            clicks.seed++;
            if (clicks.seed % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.seed < +b.seed) { 
                  return -1; 
                } else if (+a.seed > +b.seed) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.seed % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.seed < +b.seed) { 
                  return 1; 
                } else if (+a.seed > +b.seed) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Points") {
            clicks.totalpoints++;
            if (clicks.totalpoints % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.totalpoints < +b.totalpoints) { 
                  return -1; 
                } else if (+a.totalpoints > +b.totalpoints) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.totalpoints % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.totalpoints < +b.totalpoints) { 
                  return 1; 
                } else if (+a.totalpoints > +b.totalpoints) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Games") {
            clicks.gamesplayed++;
            if (clicks.gamesplayed % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.gamesplayed < +b.gamesplayed) { 
                  return -1; 
                } else if (+a.gamesplayed > +b.gamesplayed) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.gamesplayed % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.gamesplayed < +b.gamesplayed) { 
                  return 1; 
                } else if (+a.gamesplayed > +b.gamesplayed) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Pick") {
            clicks.pick++;
            if (clicks.pick % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.pick < +b.pick) { 
                  return -1; 
                } else if (+a.pick > +b.pick) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.pick % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.pick < +b.pick) { 
                  return 1; 
                } else if (+a.pick > +b.pick) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
     });
    });
});