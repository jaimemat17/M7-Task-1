// Let's start using ES6
// And let's organize the code following clean code concepts
// Later one we will complete a version using imports + webpack

// Isolated data array to a different file

let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales
var barColor = d3.scaleOrdinal(d3.schemeCategory20);

setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();
AppendLegend();

// 1. let's start by selecting the SVG Node
function setupCanvasSize() {
  margin = {top:600 , left: 80, bottom: 20, right: 30};
  width = 600 - margin.left - margin.right;
  height = 300 - margin.left - margin.right;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",`translate(${margin.left}, ${margin.top})`);

}

// Now on the X axis we want to map totalSales values to
// pixels
// in this case we map the canvas range 0..350, to 0...maxSales
// domain == data (data from 0 to maxSales) boundaries
function setupXScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  x = d3.scaleLinear()
    .range([0, width])
    .domain([0, maxSales]);

}

// Now we don't have a linear range of values, we have a discrete
// range of values (one per product)
// Here we are generating an array of product names
function setupYScale()
{
  y = d3.scaleBand()
    .rangeRound([0, height])
    .domain(totalSales.map(function(d, i) {
      return d.product;
    }));
}

function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform",`translate(0, ${height})`)
    .call(d3.axisTop(x))
    .attr("transform", "rotate(270)"); 
}

function appendYAxis() {
  // Add the Y Axis
  svg.append("g")
  .call(d3.axisLeft(y))
  .attr("transform", "rotate(-90)");
}

function appendChartBars()
{
  // 2. Now let's select all the rectangles inside that svg
  // (right now is empty)
  var rects = svg.selectAll('rect')
    .data(totalSales);

    // Now it's time to append to the list of Rectangles we already have
    var newRects = rects.enter();

    // Let's append a new Rectangles
    // UpperCorner:
    //    Starting x position, the start from the axis
    //    Starting y position, where the product starts on the y scale
    // React width and height:
    //    height: the space assign for each entry (product) on the Y axis
    //    width: Now that we have the mapping previously done (linear)
    //           we just pass the sales and use the X axis conversion to
    //           get the right value

    //helper that returns a color based on an ID
    newRects.append('rect')
      .attr('x', x(0))
      .attr('y', function(d, i) {
        return y(d.product);
      })
      .attr('height', function(d, i) {
            return y.bandwidth() - 5;
      })
      .attr('width', function(d, i) {
        return x(d.sales);
      })
      .attr('fill', function(d) {
        return barColor(d.product);
      })
      .attr("transform", "rotate(-90)");
    
}

function AppendLegend() {
  // building a legend is as simple as binding
  // more elements to the same data. in this case,
  // <text> tags
  svg.append('g')
    .attr("transform",`translate(200, -500)`)
    .attr('class', 'legend')
      .selectAll('text')
      .data(totalSales)
        .enter()
          .append('text')
            .text(function(d) { return '• ' + d.product; })
            .attr('fill', function(d) { return barColor(d.product); })
            .attr('y', function(d, i) { return 20 * (i + 1); })  
}
