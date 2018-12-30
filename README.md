# Data Analytics Nanodegree: Data Visualization
# Make Effective Data Visualization
## Summary
The dataset contains data on *handedness*, *height*, *weight*, 
*avg* or (batting average) and *HR* or home-runs.  
My analysis looks at the potential connection between weight 
and batting statistics (average and Home Runs).  
The visualization utilizes d3 to provide a martini-glass narrative structure.

## Design
I have utilized a simple scatter plot to display the data.  
I bucketed the data into bins of width 5 in order to get some good metrics to visualize the quantity of data.  
I was unable to use the nested function because I needed to aggregate within the bins. So I wrote an 
aggregation function myself.

I utilized the Bootstrap library to get some clean buttons that are easy to implement.

## Feedback

* What do you notice in the visualization?
  * What catches your eye first, do you think these elements are the most important elements of the visualization?
  * Do you think the colors contrast well? Do you have any issue distinguishing elements of the graph with color?
  * Are you distracted by anything in the visualization?
* What relationships do you notice?
* What do you think is the main takeaway from this visualization?
* What questions do you have about the data?
* Is there something you don’t understand in the graphic?

### Feedback 1
It would be nice to add some tool-tips to the dataset, especially with the binned points in the aggregations.  
It can be difficult to identify what the current active view is.  
I would recommend adding some visual difference for the current active view such as a change in the button color,
or a change in the chart title.  
When the chart changes, it can be difficult to understand the y-axis. I would recommend adding some axis labels.


### Feedback 2
The comments are really helpful to understand the basic understanding of the data!  
In summary, you mentioned in the second sentence: *average and Home Runs*.  
I suggest making these more clear by describing what these terms are. This would help those not familiar with baseball.  
I am confused with axes. I am lost which axis is representing what.  
The colours are not confusing yet the blue represents both the HR and Batting Average. This was confusing when trying to compare elements of the visualization.

tool-tips
chart title change
axis labels


## Resources
* [Text Wrapping](https://bl.ocks.org/mbostock/7555321)
* [Stack Overflow](https://stackoverflow.com/) (Used for several small programming queries)