
# Genetic Algorithm

A genetic algorithm (GA) is a metaheuristic inspired by the process of natural selection that belongs to the larger class of evolutionary algorithms (EA).

Genetic algorithms are commonly used to generate high-quality solutions to optimization and search problems by relying on biologically inspired operators such as mutation, crossover and selection.

More on [Wikipedia](https://en.wikipedia.org/wiki/Genetic_algorithm).


## Implementation

### Simulation

- several hundreds or thousands of pieces apply their 'genetic' steps
- after running into a wall, colliding with a obstacle, reaching the goal or running out of steps the evaluation start

### Evaluation

- the fitness score gets calculated
- the natural selection starts and propergates the best performing ones to the next generation
- mutation of the genes to allow finding of better paths

The next generation starts all over.

## Optimisations

- the simulation gets stopped as soon as, as many steps were moved as the last best has taken in the last generation
- the best performing piece of each round gets propergated every time to avoid loosing the so far optimal candidate

---
permalink: /index.html
---
