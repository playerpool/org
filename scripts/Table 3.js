var dataset;
var headers;
var row;
var clicks = {year: 0, player: 0, school: 0, round1: 0, round2: 0, round3: 0, round4: 0, round5: 0, round6: 0, totalpoints: 0, gamesplayed: 0, seasonppg: 0, seed: 0, tourneyppg: 0};
var tabulate = function (data,columns) {
    var table = d3.select('.chart').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody')
    var column_names = ["Year","Player","School","Seed","Season PPG","Round 1","Round 2","Round 3","Round 4","Round 5","Round 6", "Points", "Games", "Tourney PPG"];

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

var data = d3.csv("../data/rest.csv", function(d) {
    return {
        year: +d.year,
        player: d.player,
        school: d.school,
        seed: +d.seed,
        seasonppg: +d.seasonppg,
        round1: +d.round1,
        round2: +d.round2,
        round3: +d.round3,
        round4: +d.round4,
        round5: +d.round5,
        round6: +d.round6,
        totalpoints: +d.totalpoints,
        gamesplayed: +d.gamesplayed,
        tourneyppg: +d.tourneyppg
    };
}).then(function (data) {
    dataset = data
    console.log(dataset)
    var columns = ["year","player","school","seed","seasonppg","round1","round2","round3","round4","round5","round6","totalpoints","gamesplayed","tourneyppg"]
    tabulate(data,columns)

     headers
    .on("click", function(d) {
        if (d == "Player") {
            clicks.player++;
            // even number of clicks
            if (clicks.player % 2 == 0) {
              // sort ascending: alphabetically
              row.sort(function(a,b) { 
                if (a.player.toUpperCase() < b.player.toUpperCase()) { 
                  return -1; 
                } else if (a.player.toUpperCase() > b.player.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.player % 2 != 0) { 
              // sort descending: alphabetically
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
            // even number of clicks
            if (clicks.school % 2 == 0) {
              // sort ascending: alphabetically
              row.sort(function(a,b) { 
                if (a.school.toUpperCase() < b.school.toUpperCase()) { 
                  return -1; 
                } else if (a.school.toUpperCase() > b.school.toUpperCase()) { 
                  return 1; 
                } else {
                  return 0;
                }
              });
            // odd number of clicks  
            } else if (clicks.school % 2 != 0) { 
              // sort descending: alphabetically
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
        if (d == "Round 1") {
            clicks.round1++;
            if (clicks.round1 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round1 < +b.round1) { 
                  return -1; 
                } else if (+a.round1 > +b.round1) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round1 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round1 < +b.round1) { 
                  return 1; 
                } else if (+a.round1 > +b.round1) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
          if (d == "Round 2") {
            clicks.round2++;
            if (clicks.round2 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round2 < +b.round2) { 
                  return -1; 
                } else if (+a.round2 > +b.round2) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round2 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round2 < +b.round2) { 
                  return 1; 
                } else if (+a.round2 > +b.round2) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
         if (d == "Round 3") {
            clicks.round3++;
            if (clicks.round3 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round3 < +b.round3) { 
                  return -1; 
                } else if (+a.round3 > +b.round3) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round3 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round3 < +b.round3) { 
                  return 1; 
                } else if (+a.round3 > +b.round3) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
         if (d == "Round 4") {
            clicks.round4++;
            if (clicks.round4 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round4 < +b.round4) { 
                  return -1; 
                } else if (+a.round4 > +b.round4) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round4 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round4 < +b.round4) { 
                  return 1; 
                } else if (+a.round4 > +b.round4) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
         if (d == "Round 5") {
            clicks.round5++;
            if (clicks.round5 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round5 < +b.round5) { 
                  return -1; 
                } else if (+a.round5 > +b.round5) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round5 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round5 < +b.round5) { 
                  return 1; 
                } else if (+a.round5 > +b.round5) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
         if (d == "Round 6") {
            clicks.round6++;
            if (clicks.round6 % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.round6 < +b.round6) { 
                  return -1; 
                } else if (+a.round6 > +b.round6) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.round6 % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.round6 < +b.round6) { 
                  return 1; 
                } else if (+a.round6 > +b.round6) { 
                  return -1; 
                } else {
                  return 0;
                }
              });
            }
          }
        if (d == "Season PPG") {
            clicks.seasonppg++;
            if (clicks.seasonppg % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.seasonppg < +b.seasonppg) { 
                  return -1; 
                } else if (+a.seasonppg > +b.seasonppg) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.seasonppg % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.seasonppg < +b.seasonppg) { 
                  return 1; 
                } else if (+a.seasonppg > +b.seasonppg) { 
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
        if (d == "Tourney PPG") {
            clicks.tourneyppg++;
            if (clicks.tourneyppg % 2 == 0) {
              row.sort(function(a,b) { 
                if (+a.tourneyppg < +b.tourneyppg) { 
                  return -1; 
                } else if (+a.tourneyppg > +b.tourneyppg) { 
                  return 1; 
                } else {
                  return 0;
                }
              }); 
            } else if (clicks.tourneyppg % 2 != 0) { 
              row.sort(function(a,b) { 
                if (+a.tourneyppg < +b.tourneyppg) { 
                  return 1; 
                } else if (+a.tourneyppg > +b.tourneyppg) { 
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
     });
});