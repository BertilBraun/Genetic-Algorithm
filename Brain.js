
class Brain {
    constructor(count) {
        this.currentStep = 0;
        this.dirs = new Array(count);
        this.randomize();
    }

    randomize() {
        for (var i = 0; i < this.dirs.length; i++) {
            this.dirs[i] = p5.Vector.random2D();
        }
    }

    hasNextAcc() {
        return this.dirs.length > this.currentStep
    }

    nextAcc() {
        if (this.hasNextAcc()) {
            this.currentStep++;
            return this.dirs[this.currentStep - 1]
        }
        return createVector(0, 0)
    }

    mutate() {
        const mutationRate = 0.05

        for (var i = 0; i < this.dirs.length; i++) {
            if (random(1) < mutationRate)
                this.dirs[i] = p5.Vector.random2D();
        }
    }

    clone() {
        const brain = new Brain()
        for (var i = 0; i < this.dirs.length; i++) {
            brain.dirs[i] = this.dirs[i].copy();
        }
        return brain
    }
}