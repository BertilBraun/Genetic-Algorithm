
const triangleSize = 2;

class Population {
    constructor(count) {
        this.pieces = new Array(count)

        for (var i = 0; i < count; i++)
            this.pieces[i] = new Piece()

        this.generation = 0
        this.maxStepCount = brainDirCount
    }

    reset() {
        this.maxStepCount = brainDirCount
    }

    update(goal, obstacles) {
        if (this.allStopped()) {
            this.calcFitness(goal)
            this.naturalSelection()
            this.mutation()
            this.generation++
            console.log("gen: " + this.generation + " steps: " + this.maxStepCount);
        }

        for (const piece of this.pieces) {
            if (this.maxStepCount < piece.brain.currentStep)
                piece.isDead = true
        }

        for (const piece of this.pieces)
            piece.update(goal, obstacles);
    }

    draw() {
        for (const piece of this.pieces)
            piece.draw()

        // draw the best piece on top
        this.pieces[0].draw()
    }

    allStopped() {
        for (const piece of this.pieces) {
            if (!piece.isDead && !piece.reachedGoal) return false
        }
        return true
    }

    calcFitness(goal) {
        for (const piece of this.pieces)
            piece.calcFitness(goal)
    }

    naturalSelection() {
        const newPieces = new Array(this.pieces.length)
        const fitnessSum = this.calcFitnessSum()
        const bestPieceIndex = this.getBestPieceIndex()

        newPieces[0] = this.pieces[bestPieceIndex].clone()
        newPieces[0].isBest = true
        this.maxStepCount = this.pieces[bestPieceIndex].brain.currentStep

        for (var i = 1; i < this.pieces.length; i++) {
            const parent = this.selectParent(fitnessSum)
            newPieces[i] = parent.clone()
        }

        this.pieces = newPieces;
    }

    mutation() {
        for (var i = 1; i < this.pieces.length; i++)
            this.pieces[i].brain.mutate()
    }

    getBestPieceIndex() {
        var max = 0
        var idx = 0
        for (var [i, piece] of this.pieces.entries()) {
            if (piece.fitness > max) {
                max = piece.fitness
                idx = i
            }
        }
        return idx
    }

    calcFitnessSum() {
        var sum = 0;
        for (const piece of this.pieces)
            sum += piece.fitness
        return sum
    }

    selectParent(fitnessSum) {
        const rand = random(fitnessSum)

        var runningSum = 0
        for (const piece of this.pieces) {
            runningSum += piece.fitness
            if (runningSum > rand)
                return piece
        }

        // should never ever get here
        return null
    }
}
