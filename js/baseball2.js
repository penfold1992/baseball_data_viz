/*
 * Main function initiated within index.html. 
 * Produces the data driven visualization.
 * @param {d3.d3-request} data Data provided by a CSV or TSV d3 call
 */
function init_baseball(data){
    "use strict"; // strict mode declaration
    
    var margin = {"top":    20,
                  "left":   60,
                  "right":  0,
                  "bottom": 25};
    var width = 950 - (margin.left + margin.right),
        height = 400 - (margin.top + margin.bottom);
    d3.select("body")
      .append("h2")
      .style("width", width + margin.left + margin.right + 'px')
      .text("Baseball: Weight vs Home-runs");
      
    // Add buttons
    add_buttons(width, margin);
    
    // SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append('g')
                .attr('class', 'graph');
    
    // Bind data
    d3.select('svg')
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("transform", "translate(0," + (0 - margin.bottom) + ")")
      
    
    // Create x axis for graph
    var x_extent = d3.extent(data, function(d) {
        return d['weight'];
    });
    x_extent[0] = x_extent[0] - 5;
    x_extent[1] = x_extent[1] + 5;
    
    var x_scale = d3.scale.linear()
                          .range([margin.left + margin.right, width])
                          .domain(x_extent);
    
    var x_axis = d3.svg.axis()
                       .scale(x_scale)
                       .outerTickSize(0);
                       
    // Attach x-axis to graph
    d3.select("svg")
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + (height - margin.bottom) + ")")
      .call(x_axis);
      
    // text label for the x-axis
    d3.select("svg")
      .append("text")
      .text("Weight")
      .attr("class", "x-axis-text")
      .attr("y", height)
      .attr("x", ((width + margin.left + margin.right) / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle");
    
    // y domains
    var hr_max = d3.max(data, function(d) {
        return d['HR'];
    });
    var avg_max = d3.max(data, function(d) {
        return d['avg'];
    });
    avg_max = Math.ceil(avg_max * 100) / 100
    
    // Create y axis for Home Run
    var y_scale = d3.scale.linear()
                          .range([height, margin.top + margin.bottom])
                          .domain([0, hr_max])
                          .nice();
    
    var y_axis = d3.svg.axis()
                       .scale(y_scale)
                       .outerTickSize(0)
                       .orient("left");    
    
    // Attach initial y-axis to graph                                   
    d3.select("svg")
      .append("g")
      .attr("class", "y_axis")
      .attr("transform", "translate(" + (margin.left + margin.right) + "," + 
                                    -margin.bottom + ")")
      .call(y_axis);

    // Draw initial graph
    d3.selectAll("circle")
      .attr("cx", function(d) {
          return x_scale(+d["weight"]);
      })
      .attr("cy", function(d) {
          return y_scale(d["HR"]);
      })
      .attr('r', 4)
      .attr('fill', '#67a9cf')
      .attr('stroke', '#67a9cf')

    // text label for the y-axis
    d3.select("svg")
      .append("text")
      .text("Home-runs")
      .attr("class", "y-axis-text")
      .attr("y", 0)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle");
      
      
    // bin data
    var histo_layout = d3.layout.histogram()
                         .bins(x_scale.ticks(10))
                         .value(function(d){return d['weight']});
    
    var histo_bins = histo_layout(data);
    var histo_agg = histo_nest(histo_bins);                   
    
    // link functions to buttons
    var btn_functions = [function(){return data_exploded(data, y_axis, 
                                                         x_axis, 'HR')},
                         function(){return data_average(histo_agg, y_axis, 
                                                        x_axis, 'hr_mean')},
                         function(){return data_average(histo_agg, y_axis, 
                                                        x_axis, 'hr_median')},
                         function(){return data_exploded(data, y_axis, 
                                                         x_axis, 'avg')},
                         function(){return data_average(histo_agg, y_axis, 
                                                        x_axis, 'avg_mean')},
                         function(){return data_average(histo_agg, y_axis, 
                                                        x_axis, 'avg_median')}];
    
    d3.select('.hr_explode').on("click", btn_functions[0]);    
    d3.select('.hr_mean').on("click", btn_functions[1]);
    d3.select('.hr_median').on("click", btn_functions[2]);
    d3.select('.avg_explode').on("click", btn_functions[3]);
    d3.select('.avg_mean').on("click", btn_functions[4]);
    d3.select('.avg_median').on("click", btn_functions[5]); 
    
    
    // Create call-out boxes
    // insert a yellow rect beneath the text, to represent the bounding box
    var rect = d3.select('svg')
                 .insert('rect')
                 .attr('x', 100)
                 .attr('y', 20)
                 .attr('width', 338)
                 .attr('height', 70)
                 .attr('opacity', 0.5)
                 .attr('fill', '#ffc');
    var text = d3.select('svg')
                 .append('g')
                 .attr('class', 'call-out-text')
                 .append('text')
                 .attr('x', 110)
                 .attr('y', 32);
    
    text.text('This dataset contains 1157 entries. ' +
              'The weight of the baseball players resembles ' +
              'a normal distribution.')
        .call(wrap, 335);
    
    // Martini Glass neck
    setTimeout(function(){
        data_average(histo_agg, y_axis, x_axis, 'hr_mean');
        text.text('The home-run mean suggests that there is a positive ' +
                  'correlation between weight and the number of home-runs.')
            .call(wrap, 335);
    }, 4000);
    
    setTimeout(function(){
        data_average(histo_agg, y_axis, x_axis, 'avg_mean');
        rect.transition()
            .duration(1000)
            .attr('transform', 'translate(0, 250)');
        text.transition()
            .duration(1000)
            .attr('transform', 'translate(0, 250)');
        
        text.text('However, there is a negative correlation between the ' +
                  'weight and batting average. This would suggest that ' +
                  'whilst weight may indicate a high potential of a ' +
                  'home-run, the chance of them hitting at the plate is '+
                  'lower too. This may play a key role in tactical ' +
                  'decisions depending on the nature of the team\'s play.')
            .call(wrap, 335);
    }, 8000);
    
    
    // Martini Glass bowl
    setTimeout(function(){
        // remove text elements
        rect.transition()
            .duration(500)
            .attr('opacity', 0);
        text.selectAll('tspan')
            .transition()
            .duration(500)
            .style("fill","white");
        rect.transition()
            .delay(500)
            .remove()
        text.transition()
            .delay(500)
            .remove()
        
        // enable buttons
        d3.selectAll('.btn')
          .filter(function() {
            return !this.classList.contains('avg_mean')
          })
          .transition()
          .duration(1000)
          .style({"background-color": "#337ab7",
                  "border-color":     "#2e6da4"});
        d3.selectAll('.avg_mean')
          .transition()
          .duration(1000)
          .style({"background-color": "#f0ad4e",
                  "border-color":     "#eea236"});
        
        // remove the color, it was only needed for the smooth transition
        d3.selectAll('.btn')
          .transition()
          .duration(1)
          .delay(2000)
          .style({"background-color": null,
                  "border-color":     null});
        
    }, 16000);
}


/*
 * Nesting function that aggregates data in bins of width 5
 * @param {d3.d3-request} data Data provided by a CSV or TSV d3 call
 * @return {dict} returns the mean and median for HR and batting average
 */
function histo_nest(data){
    var bin = {};
    
    data.forEach(function(d){
        bin[d['x'] + 5] = {}
        
        bin[d['x'] + 5]['hr_mean'] = d3.mean(d, function(b){
            return b['HR'];
        });
        
        bin[d['x'] + 5]['hr_median'] = d3.median(d, function(b){
            return b['HR'];
        });
        
        bin[d['x'] + 5]['avg_mean'] = d3.mean(d, function(b){
            return b['avg'];
        });
        
        bin[d['x'] + 5]['avg_median'] = d3.median(d, function(b){
            return b['avg'];
        });
    });
    
    return bin;
}


/*
 * Changes the graph to display an average, using binned data.
 * @param {dict} nested_data Data provided by the histo_nest function.
 * @param {d3.d3-axis} y_axis y axis of the graph
 * @param {d3.d3-axis} x_axis x axis of the graph
 * @param {string} average_type the average type, accepts
 * <ul>
 *   <li>mean_HR
 *   <li>median_HR
 *   <li>mean_avg
 *   <li>median_avg
 * </ul>
 */
function data_average(nested_data, y_axis, x_axis, average_type){
    // change y domain
    var new_max = d3.max(Object.values(nested_data), function(d){
        return Math.round(d[average_type] * 100) / 100;
    });
    var new_scale = y_axis.scale().domain([0, new_max])
                                  .nice();
            
    d3.selectAll(".y_axis")
      .transition().duration(1000).ease("sin-in-out")
      .call(y_axis);
    
    // move points to HR mean by buckets
    function y_type_avg(d){
        var r = nested_data[closest_bucket(d['weight'])];

        return new_scale(r[average_type]);
    }
    
    function x_type_avg(d){ 
        return x_axis.scale()(closest_bucket(d['weight']));
    }

    d3.select('svg')
      .selectAll('circle')
      .transition()
      .duration(1000)
      .attr('cy', y_type_avg)
      .attr('cx', x_type_avg)
      .attr('fill', function(){
          if (average_type == 'hr_mean' || average_type == 'hr_median'){
              return '#67a9cf';
          }else{
              return '#ef8a62';
          }
      })
      .attr('stroke', function(){
          if (average_type == 'hr_mean' || average_type == 'hr_median'){
              return '#67a9cf';
          }else{
              return '#ef8a62';
          }    
      });
    
    // change axis title
    d3.select(".y-axis-text")
      .text(function(){
          if (average_type == 'hr_mean' || average_type == 'hr_median'){
              return 'Home-runs';
          }else{
              return 'Batting Average';
          }
      })
      
    // change chart title
    d3.select("h2")
      .text(function(){
          switch(average_type){
            case 'hr_mean':
              return 'Baseball: Weight vs Home-runs (Average - Mean)';
            case 'hr_median':
              return 'Baseball: Weight vs Home-runs (Average - Median)';
            case 'avg_mean':
              return 'Baseball: Weight vs Batting Average (Average - Mean)';
            case 'avg_median':
              return 'Baseball: Weight vs Batting Average (Average - Median)';
            default:
              return 'Error';
          }
      })

    // change all buttons back to normal
    d3.selectAll('.btn')
      .classed('btn-primary', true)
      .classed('btn-warning', false);
    
    // highlight the current active button
    d3.select('.' + average_type)
      .classed('btn-primary', false)
      .classed('btn-warning', true);
}


/*
 * Changes the graph to display all the data.
 * @param {d3.d3-request} data Data provided by a CSV or TSV d3 call
 * @param {d3.d3-axis} y_axis y axis of the graph
 * @param {d3.d3-axis} x_axis x axis of the graph
 * @param {string} y_data_explosion the average type, accepts
 * <ul>
 *   <li>HR
 *   <li>avg
 * </ul>
 */
function data_exploded(data, y_axis, x_axis, y_data_explosion){
    // change y domain
    var new_max = d3.max(data, function(d){
        return Math.round(d[y_data_explosion] * 100) / 100;
    });
    var new_scale = y_axis.scale().domain([0, new_max])
                                  .nice();
            
    d3.selectAll(".y_axis")
      .transition().duration(1000).ease("sin-in-out")
      .call(y_axis);
    
    // move points to exploded location
    function y_data_exploded(d){
        return new_scale(d[y_data_explosion]);
    }
    
    function x_data_exploded(d){ 
        return x_axis.scale()(d['weight']);
    }

    d3.select('svg')
      .selectAll('circle')
      .transition()
      .duration(1000)
      .attr('cy', y_data_exploded)
      .attr('cx', x_data_exploded)
      .attr('fill', function(){
          if (y_data_explosion == 'HR'){
              return '#67a9cf';
          }else{
              return '#ef8a62';
          }    
      })
      .attr('stroke', function(){
          if (y_data_explosion == 'HR'){
              return '#67a9cf';
          }else{
              return '#ef8a62';
          }    
      });
    
    // change axis title
    d3.select(".y-axis-text")
      .text(function(){
          if (y_data_explosion == 'HR'){
              return 'Home-runs';
          }else{
              return 'Batting Average';
          }
      })
    
    // change chart title
    d3.select("h2")
      .text(function(){
          if (y_data_explosion == 'HR'){
              return 'Baseball: Weight vs Home-runs';
          }else{
              return 'Baseball: Weight vs Batting Average';
          }
      })
      
    // change all buttons back to normal
    d3.selectAll('.btn')
      .classed('btn-primary', true)
      .classed('btn-warning', false);
    
    // highlight the current active button
    d3.select('.' + y_data_explosion.toLowerCase() + '_explode')
      .classed('btn-primary', false)
      .classed('btn-warning', true);
}


/*
 * finds the closest bucket group. To the nearest multiple of 5
 * @param {Integer} weight The weight value of a row of data
 * @returns {Integer} the closest multiple of 5
 */
function closest_bucket(weight){
    return Math.round((weight+5)/10)*10 - 5;
}


/*
 * Adds buttons and styles them ready for animation
 * @param {Integer} width width of the svg object
 * @param {Integer} margin margin of the svg object
 */
function add_buttons(width, margin){
    var button_div = d3.select("body")
                       .append("div")
                       .attr("class", "user-driven-buttons")
                       .style("width", (width + margin.left +
                                        margin.right) + 'px');
                       
    // Home Run
    var home_run = button_div.append("div")
                             .attr("class", "home_run")
                             .style("width", (width + margin.left +
                                              margin.right)/2 + 'px');
    
    var hr_buttons = [['Home-run<br>Exploded', 'hr_explode'],
                      ['Home-run<br>Mean','hr_mean'],
                      ['Home-run<br>Median','hr_median']];
        
    hr_buttons.forEach(function(d, i){
        home_run.append("button")
                .attr("class", "btn btn-primary " + d[1])
                .style({"background-color": "#FFFFFF",
                        "border-color":     "#FFFFFF"})
                .html('<p>' + d[0] + '</p>');
    });
    
    // Batting Average
    var batting_avg = button_div.append("div")
                                .attr("class", "batting_avg")
                                .style("width", (width + margin.left +
                                                 margin.right)/2 + 'px');
    
    var batting_buttons = [['Batting Average<br>Exploded','avg_explode'],
                           ['Batting Average<br>Mean','avg_mean'],
                           ['Batting Average<br>Median','avg_median']];
                           
    batting_buttons.forEach(function(d){
        batting_avg.append("button")
                   .attr("class", "btn btn-primary " + d[1])
                   .style({"background-color": "#FFFFFF",
                           "border-color":     "#FFFFFF"})
                   .html('<p>' + d[0] + '</p>');
    });
}


/*
 * wraps text in a svg text element using tspan
 * @author <a href='https://bl.ocks.org/mbostock/7555321'>Mike Bostock</a>
 * @param {SVG.<text>} text the text object you wish to wrap
 * @param {Integer} width width of the container of text to wrap.
 */
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0 //parseFloat(text.attr("dy")),
        tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
    while (word = words.pop()){
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
        }
    }
  });
}