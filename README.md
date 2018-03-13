# M7-Task-1

In this task we start with the next barchar:

![Alt text](images/Screenshot_1.png?raw=true "Title")

And we have to:

    - Adding space between columns.
    - Adding colors to each bar.
    - Adding a legend.
    - Showing the chart vertically.

Let's do the previous tasks step by step.

## Adding space between columns

We need to change the next part of the code in the appendChartBars function:
 
![Alt text](images/Screenshot_2.png?raw=true "Title")

By the next one:

![Alt text](images/Screenshot_3.png?raw=true "Title")

It's just been subtracted 5 points to the current band width.

## Adding colors to each bar

We need to create a new variable barColor. We can put it before call the functions.

![Alt text](images/Screenshot_4.png?raw=true "Title")

We also need to add a new attribute to the newRects append of the appendChartBars function:

![Alt text](images/Screenshot_5.png?raw=true "Title")

## Adding a legend

We should add the next function to the code

![Alt text](images/Screenshot_6.png?raw=true "Title")

and call to the function

![Alt text](images/Screenshot_7.png?raw=true "Title")

The attribute transform-transalte changes according to your chart size and your configuration. It depends on where you want to place the legend.

## Showing the chart vertically

We are going to rotate the whole chart. In order to do that we need to change: 

    - The Canvas size
        
![Alt text](images/Screenshot_8.png?raw=true "Title")

    - Rotate the axis

![Alt text](images/Screenshot_9.png?raw=true "Title")

    - Rotate the bars in the the newRects append of the appendChartBars function

![Alt text](images/Screenshot_10.png?raw=true "Title")

    - Change the axisBottom function by the axisTop function

![Alt text](images/Screenshot_12.png?raw=true "Title")

The next image shows the result.

![Alt text](images/Screenshot_11.png?raw=true "Title")