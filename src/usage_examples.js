// Importing AStar class
const AStar = require('./astar');

// Example 1: City Navigation
function citiesExample() {
    // Graph representing cities and their connections
    // weight represents distance in km and distance is the straight-line distance to destination
    const cityMap = {
        'SaoPaulo': {
            'RioDeJaneiro': { weight: 400, distance: 350 },
            'BeloHorizonte': { weight: 500, distance: 480 },
            'Curitiba': { weight: 300, distance: 280 }
        },
        'RioDeJaneiro': {
            'SaoPaulo': { weight: 400, distance: 350 },
            'BeloHorizonte': { weight: 450, distance: 420 }
        },
        'BeloHorizonte': {
            'SaoPaulo': { weight: 500, distance: 480 },
            'RioDeJaneiro': { weight: 450, distance: 420 },
            'Brasilia': { weight: 600, distance: 580 }
        },
        'Curitiba': {
            'SaoPaulo': { weight: 300, distance: 280 },
            'Florianopolis': { weight: 250, distance: 220 }
        },
        'Florianopolis': {
            'Curitiba': { weight: 250, distance: 220 }
        },
        'Brasilia': {
            'BeloHorizonte': { weight: 600, distance: 580 }
        }
    };

    const astar = new AStar(cityMap, 'SaoPaulo', 'Brasilia');
    const path = astar.findPath();
    console.log('Best route from SaoPaulo to Brasilia:', path);
}

// Example 2: Grid Navigation (game/maze)
function gridExample() {
    // Creating a 4x4 grid where each cell is connected to adjacent cells
    // Weight 1 represents free cells and Infinity represents obstacles
    const grid = {};
    
    // Helper function to create cell identifiers
    const cell = (x, y) => `${x},${y}`;
    
    // Creating grid connections
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            grid[cell(x, y)] = {};
            
            // Connecting to right cell
            if (x < 3) grid[cell(x, y)][cell(x + 1, y)] = { weight: 1, distance: 1 };
            // Connecting to left cell
            if (x > 0) grid[cell(x, y)][cell(x - 1, y)] = { weight: 1, distance: 1 };
            // Connecting to bottom cell
            if (y < 3) grid[cell(x, y)][cell(x, y + 1)] = { weight: 1, distance: 1 };
            // Connecting to top cell
            if (y > 0) grid[cell(x, y)][cell(x, y - 1)] = { weight: 1, distance: 1 };
        }
    }
    
    // Adding obstacles (infinite weight)
    grid[cell(1, 1)][cell(1, 2)] = { weight: Infinity, distance: 1 };
    grid[cell(1, 2)][cell(1, 1)] = { weight: Infinity, distance: 1 };
    grid[cell(2, 1)][cell(2, 2)] = { weight: Infinity, distance: 1 };
    grid[cell(2, 2)][cell(2, 1)] = { weight: Infinity, distance: 1 };

    const astar = new AStar(grid, '0,0', '3,3');
    const path = astar.findPath();
    console.log('Path in grid from point (0,0) to (3,3):', path);
}

// Example 3: Network Routing
function networkExample() {
    // Graph representing a computer network
    // weight represents latency in ms and distance is an estimate of minimum latency
    const computerNetwork = {
        'RouterA': {
            'RouterB': { weight: 10, distance: 8 },
            'RouterC': { weight: 15, distance: 12 }
        },
        'RouterB': {
            'RouterA': { weight: 10, distance: 8 },
            'RouterD': { weight: 12, distance: 10 },
            'RouterE': { weight: 8, distance: 7 }
        },
        'RouterC': {
            'RouterA': { weight: 15, distance: 12 },
            'RouterE': { weight: 20, distance: 18 }
        },
        'RouterD': {
            'RouterB': { weight: 12, distance: 10 },
            'RouterF': { weight: 5, distance: 4 }
        },
        'RouterE': {
            'RouterB': { weight: 8, distance: 7 },
            'RouterC': { weight: 20, distance: 18 },
            'RouterF': { weight: 10, distance: 8 }
        },
        'RouterF': {
            'RouterD': { weight: 5, distance: 4 },
            'RouterE': { weight: 10, distance: 8 }
        }
    };

    const astar = new AStar(computerNetwork, 'RouterA', 'RouterF');
    const path = astar.findPath();
    console.log('Best network route from RouterA to RouterF:', path);
}

// Running examples
console.log("=== City Navigation Example ===");
citiesExample();

console.log("\n=== Grid Navigation Example ===");
gridExample();

console.log("\n=== Network Routing Example ===");
networkExample();