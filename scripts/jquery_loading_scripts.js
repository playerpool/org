$(document).ready(function(){
   
/* ---------------------------------------- HOMEPAGE ---------------------------------------- */    
    
$("#iframe").hide();
$(".chart").empty();
$("#alt_side").hide();
$("#preview_side").hide();
$("#feature_side").hide();
$("#side").hide();
$('.chart').load("homepage.html");
    
/* ---------------------------------------- CHARTS ---------------------------------------- */

$("#dotplot").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Player scoring by year");
    $(".chart_desc").empty().text("Hover over data points for additional information.");
    $.getScript("scripts/historical dot plot.js");
});
    
$("#kernel").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Density plot - player scoring");
    $(".chart_desc").empty().text("Distribution of your tournament scoring by player, spanning the spreadsheet era. An interesting mix of bimodal and right-skewed. Y axis is linear, useless to display but can't figure out how to hide the line because I'm in way over my head here.");
    $.getScript("scripts/kernel density.js");
});

$("#cumrank").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").text("Cumulative points ranking");
    $(".chart_desc").empty().text("Your rank in total points scored over time. Steps are shown as occuring mid-year for display purposes.");
    $.getScript("scripts/step chart.js");
});
    
$("#statscatter").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Tournament points vs. draft pick");
    $(".chart_desc").empty().text("Tournament scoring by individual players as a function of draft pick, spanning the spreadsheet era. Hover over data points for additional information.");
    $.getScript("scripts/stat scatter.js");
});
    
$("#sankey").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Draft slot vs. finish");
    $(".chart_desc").empty().text("A modified Sankey diagram to visualize the effect of draft position. Hover over lines for redundant information.");
    $.getScript("scripts/sankey2.js");
});
    
$("#statchoose").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#side").hide();
    $("#alt_side").show();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $(".chart_title").empty().text("Choose your own scatter");
    $(".chart_desc").empty().text("Our data as a group. Use the data filter to select variables for comparison. Hover over data points for additional information. Note: for display purposes, a jitter has been applied to all variables except points.");
    $.getScript("scripts/stat choose scatter.js");
});

$("#pointsbyround").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Points scored by round");
    $(".chart_desc").empty().text("Spreadsheet era. Hover over data points for additional information.");
    $.getScript("scripts/round dot plot.js");
});
    
$("#seedspicked").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Picks by seed");
    $(".chart_desc").empty().text("Spreadsheet era. Hover over bars for exact total.");
    $.getScript("scripts/seed bar.js");
});
    
/* ---------------------------------------- TABLES ---------------------------------------- */

$("#table1").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Table 1 - Tournament level stats");
    $(".chart_desc").empty().text("Click column headers to sort.");
    $.getScript("scripts/Table 1.js");
});

$("#table2").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Table 2 - Round level stats");
    $(".chart_desc").empty().text("Click column headers to sort.");
    $.getScript("scripts/Table 2.js");
});
    
$("#table3").click(function(){
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty().text("Table 3 - Best of the rest");
    $(".chart_desc").empty().text("Click column headers to sort.");
    $.getScript("scripts/Table 3.js");
});
    
/* ---------------------------------------- SHEETS ---------------------------------------- */
    
$("#record_book").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/16a_o1ncXL_Ju-IGWnSRhBqKR7L6YIR5X-OXo0Vfr1yM/pubhtml?widget=true&amp;headers=false");
});
    
$("#sheet09").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/1urfTOa2o8Hbb41acIGBYVe7hj4V4cH9_ZDtdPexVRSc/pubhtml?widget=true&amp;headers=false");
});

$("#sheet10").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOALvtd56F_oHnp2nJDkVSzZB9ParpsEEQobitKsBxMMBbghkJluyJASe8Y-cL5nmRCoE-UBNK5qRC/pubhtml?widget=true&amp;headers=false");
});
    
$("#sheet11").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vReizz_0VIAixdY7aFYBazuFMAxAi7FM0WlIko3Ofrg9kGvV0lyniRjC241kIpYyPxho_Dfgl3gDiTO/pubhtml?widget=true&amp;headers=false");
});
    
$("#sheet12").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6UozqNapVmVJiAeARWcVEYiOwKk1SGdBB5ydE5KMqTrULXZwYyBhGa0QLhTE3YgfqVsYaGMlDbfOc/pubhtml?widget=true&amp;headers=false");
});
    
$("#sheet13").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFVfsih0G0nvkQ44knSfXMPHRqQYiXv4g6lc87Yj0ACanIafO78iWvb2X843bYL67gMVb5d49orhDw/pubhtml?widget=true&amp;headers=false");
});
    
$("#sheet14").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1t7NigCriBPJcoNKwlz-iosmHO-jMT9CMqgtnRbMYeGDYM2ZwvLz_dmE9ZmmcGoHou-tYnRxabM83/pubhtml?widget=true&amp;headers=false");
});    
    
$("#sheet15").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vRyrU_-DF4Zj_137mBVLSbYU6nr3IlAOhiISWqs8E7em4GgTsdX0-sZlzLOppnwBUpvNd3MC3hjRx9m/pubhtml?widget=true&amp;headers=false");
});    

$("#sheet16").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7JMRjeYjo5ZsCUscMUBBslvX1HWSnDyBTu66_JNQkn3vFutfh6Lgxwz5ZeX1yiMOZWmmzXgvxugiV/pubhtml?widget=true&amp;headers=false");
});    
    
$("#sheet17").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vQObecIcvKBrkKRKOB5DK22j4qk5S_AG-bi-B63_DkPjNne02NQ0V8wuTIVl10MxEAbmUEF0SCJYBVd/pubhtml?widget=true&amp;headers=false");
});    
    
$("#sheet18").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwIup7SpW9d9qmWjbn9J-y9YlmcxeOJJ5MCpTb1NggNHMma99bER56YrvbqcmmxGSFA-mBMxrBPTf1/pubhtml?widget=true&amp;headers=false");
});  
    
$("#sheet19").click(function(){
    $("#iframe").show();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $("#iframe").attr('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vRJ_913JtwMstyKD0Kjlol1vjMNKFceqA94tM9gwDeASJE89ck81h1uzuiSzm57tx8F_RQ-XBklvXhz/pubhtml?widget=true&amp;headers=false");
});  

/* ---------------------------------------- PREVIEWS ---------------------------------------- */    

$("#preview14menu").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview14.html");
});
    
$("#preview14").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview14.html");
});

$("#preview15").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview15.html");
});
    
$("#preview16").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview16.html");
});

$("#preview17").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview17.html");
});
    
$("#preview19").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#feature_side").hide();
    $("#preview_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/preview19.html");
});
   
/* ---------------------------------------- Features ---------------------------------------- */      
    
$("#feature18menu").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/feature18.html");
});
    
$("#feature18").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/feature18.html");
});    

$("#feature19").click(function(){
    $("#iframe").empty();
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").show();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/feature19.html");
});    

/* ---------------------------------------- Stat Shaq ---------------------------------------- */      
    
$("#statshaqmenu").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").show();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/bestdrafter.html");
});
    
$("#drafter1").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").show();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/bestdrafter.html");
});
    
$("#drafter2").click(function(){
    $("#iframe").empty();
    $(".chart").empty();
    $("#iframe").hide();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").show();
    $("#side").hide();
    $(".chart_title").empty();
    $(".chart_desc").empty();
    $('.chart').load("words/bestdrafter2.html");
});
    
/* ---------------------------------------- IN SITU ---------------------------------------- */    

$("#columbia").click(function(){    
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty().text("Player pool travel phlog");
    $(".chart_desc").empty();
    $('.chart').load("travel/columbia.html");    
});

$("#tampa").click(function(){    
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").hide();
    $(".chart_title").empty().text("Player pool travel phlog");
    $(".chart_desc").empty();
    $('.chart').load("travel/tampa.html");    
});

/* ---------------------------------------- MAPS ---------------------------------------- */    

$("#map1").click(function(){    
    $("#iframe").hide();
    $(".chart").empty();
    $("#alt_side").hide();
    $("#preview_side").hide();
    $("#feature_side").hide();
    $("#shaq_side").hide();
    $("#side").show();
    $(".chart_title").empty().text("Player homecourts");
    $(".chart_desc").empty();
    $.getScript("scripts/map1.js");
});
    
});