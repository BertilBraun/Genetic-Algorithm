
const brainDirCount = 400;
const wallDistance = 4;
const goalDistance = 8;
const obstacleDistance = 0.1;

function intersectsLine(pos, a, b) {

    const tx = (pos.x - a.x) / (b.x - a.x)
    const ty = (pos.y - a.y) / (b.y - a.y)

    return abs(tx - ty) < obstacleDistance && tx > 0 && tx < 1
}


class Piece {
    constructor() {
        this.pos = createVector(width / 2, height - 30)
        this.vel = createVector(0, -1)
        this.acc = createVector(0, 0)

        this.brain = new Brain(brainDirCount)

        this.fitness = 0

        this.isBest = false
        this.isDead = false
        this.reachedGoal = false
    }

    calcFitness(goal) {
        if (this.reachedGoal) {
            this.fitness = 1 / 16 + 10000 / pow(this.brain.currentStep, 2)
        }
        else {
            this.fitness = 1 / pow(this.pos.dist(goal), 2)
        }
    }

    update(goal, obstacles) {
        if (this.isDead || this.reachedGoal) return;

        this.move()

        if (this.pos.x < wallDistance || this.pos.x >= width - wallDistance ||
            this.pos.y < wallDistance || this.pos.y >= height - wallDistance) {
            this.isDead = true;
        }

        for (const obstacle of obstacles) {
            if (intersectsLine(this.pos, obstacle[0], obstacle[1]))
                this.isDead = true
        }

        if (this.pos.dist(goal) < goalDistance) {
            this.reachedGoal = true;
        }
    }

    move() {
        if (!this.brain.hasNextAcc()) {
            this.isDead = true;
            return;
        }

        this.acc = this.brain.nextAcc()
        this.vel.add(this.acc)
        this.vel.limit(5)
        this.pos.add(this.vel)
    }

    draw() {
        push()

        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading() - radians(90));

        if (this.isBest)
            stroke(0, 255, 0)
        else
            stroke(255);

        strokeWeight(6);
        triangle(0, 0, triangleSize, 0, triangleSize / 2, triangleSize * 1.2);

        pop()
    }

    clone() {
        const piece = new Piece()
        piece.brain = this.brain.clone()

        return piece
    }
}
