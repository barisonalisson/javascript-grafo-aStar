const AStar = require('../src/astar');

describe('AStar Algorithm Tests', () => {

  test('Shortest path in a 3-point graph', () => {
    const graph = {
      A: { B: { weight: 1, distance: 10 } },
      B: { A: { weight: 1, distance: 10 }, C: { weight: 1, distance: 20 } },
      C: { B: { weight: 1, distance: 20 } },
    };
    const aStar = new AStar(graph, 'A', 'C');
    const path = aStar.findPath();
    expect(path).toEqual(['A', 'B', 'C']);
  });

  test('Shortest path in a 4-point graph', () => {
    const graph = {
      A: { B: { weight: 1, distance: 10 }, C: { weight: 4, distance: 30 } },
      B: { A: { weight: 1, distance: 10 }, C: { weight: 2, distance: 15 }, D: { weight: 5, distance: 50 } },
      C: { A: { weight: 4, distance: 30 }, B: { weight: 2, distance: 15 }, D: { weight: 1, distance: 5 } },
      D: { B: { weight: 5, distance: 50 }, C: { weight: 1, distance: 5 } },
    };
    const aStar = new AStar(graph, 'A', 'D');
    const path = aStar.findPath();
    expect(path).toEqual(['A', 'B', 'C', 'D']);
  });

  test('Shortest path in a 5-point graph', () => {
    const graph = {
      A: { B: { weight: 1, distance: 10 }, C: { weight: 3, distance: 20 } },
      B: { A: { weight: 1, distance: 10 }, C: { weight: 1, distance: 5 }, D: { weight: 4, distance: 40 } },
      C: { A: { weight: 3, distance: 20 }, B: { weight: 1, distance: 5 }, D: { weight: 2, distance: 15 } },
      D: { B: { weight: 4, distance: 40 }, C: { weight: 2, distance: 15 }, E: { weight: 1, distance: 5 } },
      E: { D: { weight: 1, distance: 5 } },
    };
    const aStar = new AStar(graph, 'A', 'E');
    const path = aStar.findPath();
    expect(path).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('No path between distant points in a 6-point graph', () => {
    const graph = {
      A: { B: { weight: 2, distance: 20 } },
      B: { A: { weight: 2, distance: 20 }, C: { weight: 1, distance: 10 } },
      C: { B: { weight: 1, distance: 10 }, D: { weight: 2, distance: 15 } },
      D: { C: { weight: 2, distance: 15 }, E: { weight: 3, distance: 25 } },
      E: { D: { weight: 3, distance: 25 }, F: { weight: 2, distance: 20 } },
      F: { E: { weight: 2, distance: 20 } },
    };
    const aStar = new AStar(graph, 'A', 'F');
    const path = aStar.findPath();
    expect(path).toBeNull();
  });

  test('Shortest path in a 7-point graph', () => {
    const graph = {
      A: { B: { weight: 2, distance: 10 }, C: { weight: 5, distance: 30 } },
      B: { A: { weight: 2, distance: 10 }, C: { weight: 3, distance: 20 }, D: { weight: 4, distance: 25 } },
      C: { A: { weight: 5, distance: 30 }, B: { weight: 3, distance: 20 }, D: { weight: 1, distance: 10 }, E: { weight: 6, distance: 50 } },
      D: { B: { weight: 4, distance: 25 }, C: { weight: 1, distance: 10 }, F: { weight: 2, distance: 15 } },
      E: { C: { weight: 6, distance: 50 }, F: { weight: 3, distance: 25 }, G: { weight: 1, distance: 10 } },
      F: { D: { weight: 2, distance: 15 }, E: { weight: 3, distance: 25 }, G: { weight: 1, distance: 5 } },
      G: { E: { weight: 1, distance: 10 }, F: { weight: 1, distance: 5 } },
    };
    const aStar = new AStar(graph, 'A', 'G');
    const path = aStar.findPath();
    expect(path).toEqual(['A', 'B', 'C', 'D', 'F', 'G']);
  });

});
