
var goal;
var population;
var populationCount = 500;

const obstacles = []
var pointOne = null
let checkbox
let tooltip
let slider

function setup() {
    createCanvas(800, 800);

    createP('Population Count:')
    slider = createSlider(10, 1000, 500, 10)
    tooltip = createP('Use the Left Mouse Button to draw in Obstacles!')

    checkbox = createCheckbox('Toggle Options')
    checkbox.changed(() => {
        if (checkbox.checked())
            tooltip.elt.innerHTML = '<p>Use the Left Mouse Button to move the Goal!</p>'
        else
            tooltip.elt.innerHTML = '<p>Use the Left Mouse Button to draw in Obstacles!</p>'
    });

    createButton('reset').mousePressed(reset);
    reset()
}

function reset() {
    obstacles.length = 0;
    goal = createVector(width / 2, 30);
    population = new Population(populationCount);
}

function mouseClicked() {
    if (mouseX > width || mouseY > height || mouseX < 0 || mouseY < 0) return;

    if (checkbox.checked()) {
        goal = createVector(mouseX, mouseY)
        population.reset()
    }
    else {
        if (pointOne == null)
            pointOne = createVector(mouseX, mouseY)
        else {
            obstacles.push([pointOne, createVector(mouseX, mouseY)])
            pointOne = null
            population.reset()
        }
    }
}

function drawObstacles() {
    stroke(255);
    strokeWeight(10);

    if (pointOne != null)
        line(pointOne.x, pointOne.y, mouseX, mouseY)

    for (const obstacle of obstacles)
        line(obstacle[0].x, obstacle[0].y, obstacle[1].x, obstacle[1].y)
}

function drawGoal() {

    stroke(255, 0, 0);
    strokeWeight(20);
    point(goal.x, goal.y)
}

function draw() {
    if (populationCount != slider.value()) {
        populationCount = slider.value()
        population = new Population(populationCount);
    }

    population.update(goal, obstacles)

    background(20);

    population.draw()
    drawObstacles()
    drawGoal()
}