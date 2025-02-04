class AStar {
  constructor(graph, start, goal) {
    this.graph = graph;  // Graph with vertices and edges
    this.start = start;  // Start node
    this.goal = goal;    // Goal node
    this.openList = [];   // List of nodes to be explored
    this.closedList = new Set();  // List of already explored nodes
    this.gScore = {};  // Accumulated cost to reach the node
    this.fScore = {};  // Total estimated cost (g(n) + h(n))
    this.cameFrom = {}; // To reconstruct the path

    // Initializing lists
    this.openList.push(start);
    this.gScore[start] = 0;  // Cost from start to start is 0
    this.fScore[start] = this.heuristic(start);  // Initial heuristic estimate
  }

  // Heuristic function: Using remaining distance as an estimate
  heuristic(node) {
    // In this example, we use distance as the heuristic
    // The distance is measured between the current node and the goal.
    if (!this.graph[node] || !this.graph[this.goal]) return Infinity;
    return this.graph[node][this.goal]?.distance || Infinity;
  }

  // Function to reconstruct the path
  reconstructPath(current) {
    let path = [current];
    while (this.cameFrom[current]) {
      current = this.cameFrom[current];
      path.push(current);
    }
    return path.reverse();
  }

  // A* algorithm function that returns the shortest path
  findPath() {
    while (this.openList.length > 0) {
      // Choose the node with the lowest fScore
      let current = this.openList.reduce((a, b) => {
        return this.fScore[a] < this.fScore[b] ? a : b;
      });

      // If we reached the goal, reconstruct the path
      if (current === this.goal) {
        return this.reconstructPath(current);
      }

      // Move the current node to the closedList
      this.openList = this.openList.filter(node => node !== current);
      this.closedList.add(current);

      // Explore neighbors
      for (let neighbor in this.graph[current]) {
        if (this.closedList.has(neighbor)) continue;

        // Compute tentative g(n) cost using edge weight
        let tentativeGScore = this.gScore[current] + this.graph[current][neighbor].weight;

        // If the neighbor is not in openList or we found a better path
        if (!this.openList.includes(neighbor) || tentativeGScore < this.gScore[neighbor]) {
          // Update values
          this.cameFrom[neighbor] = current;
          this.gScore[neighbor] = tentativeGScore;
          this.fScore[neighbor] = tentativeGScore + this.heuristic(neighbor);

          // Add neighbor to openList if not already there
          if (!this.openList.includes(neighbor)) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    // If no path is found, return null
    return null;
  }
}

module.exports = AStar;
