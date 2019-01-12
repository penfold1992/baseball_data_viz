# Data Analytics Nanodegree: Data Visualization
# Make Effective Data Visualization
## Summary
The dataset contains data on *handedness*, *height*, *weight*, 
*avg* or (batting average) and *HR* or home-runs.  
My analysis looks at the potential connection between weight 
and batting statistics (average and Home Runs).  
To clarify, a batting average is defined by the number of 
times a batter hits the ball and makes it to a base, divided by the number
of times they are at bat.  
This means that a player with a batting average of 1.000 makes it to at least
first base every time he hits a ball in play and a batter average of 0.000 has
never made it on base.  
A Home-run occurs when a player successfully runs around all the bases after a
hit in one play.
The visualization utilizes d3 to provide a martini-glass narrative structure.

## Design
I have utilized a simple scatter plot to display the data.  
I bucketed the data into bins of width 5 in order to get 
some good metrics to visualize the quantity of data.  
I was unable to use the nested function because I 
needed to aggregate within the bins.
So I wrote an aggregation function myself.

I utilized the Bootstrap library to get some clean 
buttons that are easy to implement.

In order to distinguish between weight vs HR and weight vs batting averages, 
I decided to encode these in two different colours, a blue and orange colour.

## Feedback

* What do you notice in the visualization?
  * What catches your eye first, do you think these elements are the most
    important elements of the visualization?
  * Do you think the colors contrast well? 
    Do you have any issue distinguishing elements of the graph with color?
  * Are you distracted by anything in the visualization?
* What relationships do you notice?
* What do you think is the main takeaway from this visualization?
* What questions do you have about the data?
* Is there something you don’t understand in the graphic?

### Feedback 1
* It would be nice to add some tool-tips to the dataset, 
  especially with the binned points in the aggregations.  
* It can be difficult to identify what the current active view is.  
  I would recommend adding some visual difference for the 
  current active view such as a change in the button color,
  or a change in the chart title.  
* When the chart changes, it can be difficult to understand the y-axis. 
  I would recommend adding some axis labels.

> **Follow-up:**
> * *Version 2* - index2.html
>   * Changed the buttons to orange when clicked to show what
>     the active button is.
>   * Added axis labels to the graph and made the y-axis label change
>     depending on the current view.
> * *Version 3* - index3.html
>   * Added tool-tips, both on exploded views and average views.

  
### Feedback 2
* The comments are really helpful to understand the 
  basic understanding of the data!  
* In summary, you mentioned in the second sentence: *average and Home Runs*.  
  I suggest making these more clear by describing what these terms are. 
  This would help those not familiar with baseball.  
* I am confused with axes. I am lost which axis is representing what.  
  The colours are not confusing yet the blue represents both the HR 
  and Batting Average. This was confusing when trying to compare 
  elements of the visualization.

> **Follow-up:**
> 
> * *Version 2* - index2.html
>   * Changed the text in the README to give some 
>     context to baseball statistics.  
>     Credit goes to *Wikipedia articles* listed below
>   * Differentiated the *Batting Average* and *Home-Run* statistics by
>     representing them by different colours.  
>     * Blue represents Home Runs.  
>     * Orange represents Batting Average 
  
### Feedback 3
* Good work on your visualization, it looks beautiful! 
  I like how the visualization is interactive and the 
  animation is really smooth.
* We need the visualization to explain a specific finding in the data.   
  One way to do so is by including some descriptions 
  detailing the finding in each tab.
* Please also include the unit of measurements for weights of players
* Please change the structure of feedback to identify what changes were made 
  to account for the feedback.
* Have the previous versions of the visualization clearly marked.

> **Follow-up:**
> * *Version 4* - index.html
>   * Updated the x-axis to include the units of weight (pounds).
>   * Updated tool-tips to include units
>   * Changed the layout of the README to provide more 
      verbose feedback responses


## Resources
* [Text Wrapping](https://bl.ocks.org/mbostock/7555321)
* [Stack Overflow](https://stackoverflow.com/) (Used for several
  small programming queries)
* [Batting Statistics](
  https://en.wikipedia.org/wiki/Baseball_statistics#Batting_statistics)
* [Tooltips](http://bl.ocks.org/d3noob/a22c42db65eb00d4e369)
* [JSHint](https://jshint.com/) (to improve JavaScript quality)