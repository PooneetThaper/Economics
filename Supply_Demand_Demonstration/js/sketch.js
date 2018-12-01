let scale = 5
let graph_width = 160
let graph_height = 120
let graph_margin = 10

let width = graph_width * scale
let height = graph_height * scale
let axisMargin = graph_margin * scale
let xAxisY = height - axisMargin

var supplyLine, demandLine
var supplySlider, supplySlopeSlider, demandSlider, demandSlopeSlider

function setup() {
  createCanvas(width, height);
  textSize(15)

  supplySlider = createSlider(0 - 2*graph_height, 2*graph_height, 0)
  supplySlider.position(2 * axisMargin, axisMargin)
  supplySlopeSlider = createSlider(0, 5, 0.5, 0.1)
  supplySlopeSlider.position(2 * axisMargin, 2 * axisMargin)
  demandSlider = createSlider(0 - 2*graph_height, 2*graph_height, 0)
  demandSlider.position(2 * axisMargin, 3 * axisMargin)
  demandSlopeSlider = createSlider(-5, 0, -0.5, 0.1)
  demandSlopeSlider.position(2 * axisMargin, 4 * axisMargin)

  supplyLine = new Line(0.5, 20)
  demandLine = new Line(-0.5, 80)
}

function draw() {
  background(0);

  fill(100, 100, 100);
  stroke(0, 0, 0);
  rect(1.5 * axisMargin, 0.5 * axisMargin, 6 * axisMargin, 4.5 * axisMargin)

  supplyOffset = supplySlider.value()
  supplySlope = supplySlopeSlider.value()
  demandOffset = demandSlider.value()
  demandSlope = demandSlopeSlider.value()

  fill(255, 255, 255);
  text("Supply", 5.2 * axisMargin, axisMargin + 10)
  text("Supply Slope", 5.2 * axisMargin, 2 * axisMargin + 10)
  text("Demand", 5.2 * axisMargin, 3 * axisMargin + 10)
  text("Supply Slope", 5.2 * axisMargin, 4 * axisMargin + 10)

  text("Quantity", width - 1.5 * axisMargin, height - 0.4 * axisMargin)
  text("Price", 0.1 * axisMargin, axisMargin)

  // Draw axes
  stroke(255);
  strokeWeight(1);
  line(axisMargin, 0, axisMargin, height)
  line(0, xAxisY, width, xAxisY)

  strokeWeight(4);
  // Draw supply line
  stroke(0, 255, 0)
  supplyLine.slope = supplySlope
  line(0, xAxisY - (scale * supplyLine.getY(0 - graph_margin)) - supplyOffset, width, xAxisY - (scale * supplyLine.getY(graph_width - graph_margin)) - supplyOffset)

  // Draw demand line
  stroke(255, 0, 0)
  demandLine.slope = demandSlope
  line(0, xAxisY - (scale * demandLine.getY(0 - graph_margin)) - demandOffset, width, xAxisY - (scale * demandLine.getY(graph_width - graph_margin)) - demandOffset)
}

class Line {
  constructor(slope, intercept){
    this.slope = slope
    this.intercept = intercept
  }

  // Precondition: given another Line object
  // Postcondition: returns the x coordinate of the intersection of this and the otherLine object
  intersect (otherLine) {
    return (this.intercept - otherLine.intercept) / (otherLine.slope - this.slope)
  }

  // Postcondition: the y value of the line at a given x value
  getY (X) {
    return (this.slope * X) + this.intercept
  }

  // Postcondition: changes the slope this line
  changeSlope(newSlope) {
    this.slope = newSlope
  }
}
