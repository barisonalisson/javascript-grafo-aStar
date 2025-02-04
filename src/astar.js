class AStar {
  constructor(graph, start, goal) {
    this.graph = graph;  // Grafo com os vértices e arestas
    this.start = start;  // Nó inicial
    this.goal = goal;    // Nó objetivo
    this.openList = [];   // Lista de nós a serem explorados
    this.closedList = new Set();  // Lista de nós já explorados
    this.gScore = {};  // Geração do custo acumulado até o nó
    this.fScore = {};  // Estimativa total (g(n) + h(n))
    this.cameFrom = {}; // Para reconstruir o caminho

    // Inicializando as listas
    this.openList.push(start);
    this.gScore[start] = 0;  // Custo de ir de start até start é 0
    this.fScore[start] = this.heuristic(start);  // A heurística inicial
  }

  // Função de Heurística: Usando a distância restante como estimativa
  heuristic(node) {
    // Neste exemplo, vamos utilizar a distância como heurística
    // A distância será a distância entre o nó atual e o objetivo.
    if (!this.graph[node] || !this.graph[this.goal]) return Infinity;
    return this.graph[node][this.goal]?.distance || Infinity;
  }

  // Função para reconstruir o caminho
  reconstructPath(current) {
    let path = [current];
    while (this.cameFrom[current]) {
      current = this.cameFrom[current];
      path.push(current);
    }
    return path.reverse();
  }

  // Função A* que retorna o caminho mais curto
  findPath() {
    while (this.openList.length > 0) {
      // Escolher o nó com o menor fScore
      let current = this.openList.reduce((a, b) => {
        return this.fScore[a] < this.fScore[b] ? a : b;
      });

      // Se chegamos no objetivo, reconstruímos o caminho
      if (current === this.goal) {
        return this.reconstructPath(current);
      }

      // Mover o nó atual para a closedList
      this.openList = this.openList.filter(node => node !== current);
      this.closedList.add(current);

      // Explorar os vizinhos
      for (let neighbor in this.graph[current]) {
        if (this.closedList.has(neighbor)) continue;

        // Cálculo do custo de g(n) usando o peso da aresta
        let tentativeGScore = this.gScore[current] + this.graph[current][neighbor].weight;

        // Se o vizinho não estiver na openList ou encontrarmos um caminho melhor
        if (!this.openList.includes(neighbor) || tentativeGScore < this.gScore[neighbor]) {
          // Atualizar os valores
          this.cameFrom[neighbor] = current;
          this.gScore[neighbor] = tentativeGScore;
          this.fScore[neighbor] = tentativeGScore + this.heuristic(neighbor);

          // Adicionar o vizinho à openList se ainda não estiver lá
          if (!this.openList.includes(neighbor)) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    // Se não encontramos um caminho, retornamos null
    return null;
  }
}
module.exports = AStar;