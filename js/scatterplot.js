/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("/data/scatter.csv").then((data) => {

  // Determines the maximum Y value 
  let maxY3 = d3.max(data, function(d) { return d.score; });

  console.log(maxY3);

  // Scales the height of each bar to the max interval   
  let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]);

  // Determines the maximum X value 
  let maxX3 = d3.max(data, function(d) { return d.day; });

   console.log(maxX3);

  // Scales the x-axis based on the number of x values 
  let xScale3 = d3.scaleLinear()
            .domain([0,maxX3])
            .range([margin.left, width - margin.right]); 

  // Plot the points
  svg3.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", (d) => xScale3(d.day))
        .attr("cy", (d) => yScale3(d.score))
        .attr("r", 10)
        .attr("fill", "orange")
        .attr("class", "SimpleScatter")
     	.on("mouseover", mouseover3) 
     	.on("mousemove", mousemove3)
     	.on("mouseleave", mouseleave3);

  	// Add x axis to svg6  
	svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      // ^ moves axis to bottom of svg 
      .call(d3.axisBottom(xScale3)) // built in function for bottom
                                  // axis given a scale function 
        .attr("font-size", '20px'); // set font size

	// Add y axis to svg6 
	svg3.append("g") // g is a "placeholder" svg
     .attr("transform", `translate(${margin.left}, 0)`) 
     // ^ move axis inside of left margin
     .call(d3.axisLeft(yScale3)) // built in function for left
                                // axis given a scale function 
      .attr("font-size", '20px'); // set font size


});

// Creates a div for bar information to be displayed
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// On mouseover, display the name of the bar and the score  
const mouseover3 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Positions the tooltip next to the mouse
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// Makes the tooptip's displayed information 0
const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0); 
}




