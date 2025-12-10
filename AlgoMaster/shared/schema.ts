// Algo Master - Data Types and Content
// All educational content for the platform

export type ComplexityLevel = "O(1)" | "O(log n)" | "O(n)" | "O(n log n)" | "O(n²)" | "O(2^n)" | "O(V+E)" | "O(E)" | "O(V)";

export interface DataStructure {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  complexity: {
    access: ComplexityLevel;
    search: ComplexityLevel;
    insert: ComplexityLevel;
    delete: ComplexityLevel;
  };
  definition: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  visualExplanation: string;
  codeExample: string;
  experimentScenario: string;
}

export interface Algorithm {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: "sorting" | "searching" | "graph";
  timeComplexity: {
    best: ComplexityLevel;
    average: ComplexityLevel;
    worst: ComplexityLevel;
  };
  spaceComplexity: ComplexityLevel;
  definition: string;
  steps: string[];
  visualDiagram: string;
  inputOutputExamples: { input: string; output: string }[];
  codeImplementation: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms: string[];
  category: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const dataStructures: DataStructure[] = [
  {
    id: "array",
    name: "Array",
    slug: "array",
    description: "A collection of elements stored at contiguous memory locations",
    icon: "LayoutGrid",
    complexity: { access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    definition: "An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index, making arrays extremely efficient for random access operations.",
    useCases: ["Storing lists of items", "Matrix operations", "Lookup tables", "Buffer implementations", "Image processing"],
    pros: ["Fast random access O(1)", "Cache-friendly due to memory locality", "Simple to implement and use", "Fixed size means predictable memory usage"],
    cons: ["Fixed size (in most languages)", "Insertion/deletion is expensive O(n)", "Memory waste if not fully utilized", "Cannot store different data types"],
    visualExplanation: `
Index:    [0]   [1]   [2]   [3]   [4]
         +-----+-----+-----+-----+-----+
Values:  | 10  | 20  | 30  | 40  | 50  |
         +-----+-----+-----+-----+-----+
Memory:  0x100 0x104 0x108 0x10C 0x110

Each element occupies 4 bytes (for integers).
Access arr[2]: Direct calculation → 0x100 + (2 × 4) = 0x108 → Value: 30`,
    codeExample: `// Creating and using arrays in JavaScript
const numbers = [10, 20, 30, 40, 50];

// Access element (O(1))
console.log(numbers[2]); // 30

// Search for element (O(n))
const index = numbers.indexOf(30); // 2

// Insert at end (O(1) amortized)
numbers.push(60);

// Insert at beginning (O(n))
numbers.unshift(5);

// Delete from middle (O(n))
numbers.splice(2, 1);

// Iterate through array
numbers.forEach((num, i) => {
  console.log(\`Index \${i}: \${num}\`);
});`,
    experimentScenario: "Try inserting elements at different positions and observe how the time complexity changes based on the position."
  },
  {
    id: "linked-list",
    name: "Linked List",
    slug: "linked-list",
    description: "A linear data structure where elements are linked using pointers",
    icon: "Link",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    definition: "A linked list is a linear data structure where each element (node) contains a data field and a reference (link) to the next node in the sequence. Unlike arrays, linked list elements are not stored at contiguous memory locations.",
    useCases: ["Dynamic memory allocation", "Implementation of stacks and queues", "Undo functionality in applications", "Music playlist navigation", "Browser history"],
    pros: ["Dynamic size", "Efficient insertions/deletions O(1)", "No memory waste", "Easy to implement stacks and queues"],
    cons: ["No random access", "Extra memory for pointers", "Not cache-friendly", "Reverse traversal difficult (singly linked)"],
    visualExplanation: `
Singly Linked List:
+------+------+    +------+------+    +------+------+
| Data | Next |--->| Data | Next |--->| Data | Next |---> NULL
|  10  |  *   |    |  20  |  *   |    |  30  |  *   |
+------+------+    +------+------+    +------+------+
   Head                                   Tail

Doubly Linked List:
NULL <---+------+------+------+<--->+------+------+------+<--->+------+------+------+---> NULL
         | Prev | Data | Next |     | Prev | Data | Next |     | Prev | Data | Next |
         |  *   |  10  |  *   |     |  *   |  20  |  *   |     |  *   |  30  |  *   |
         +------+------+------+     +------+------+------+     +------+------+------+`,
    codeExample: `// Node class for Linked List
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Linked List implementation
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add to end - O(n)
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Add to beginning - O(1)
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Print list
  print() {
    let current = this.head;
    const elements = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(' -> '));
  }
}

const list = new LinkedList();
list.append(10);
list.append(20);
list.prepend(5);
list.print(); // 5 -> 10 -> 20`,
    experimentScenario: "Compare insertion time at the beginning vs end of the list to understand the difference in complexity."
  },
  {
    id: "stack",
    name: "Stack",
    slug: "stack",
    description: "A LIFO (Last In, First Out) data structure",
    icon: "Layers",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    definition: "A stack is an abstract data type that follows the Last-In-First-Out (LIFO) principle. The last element added to the stack is the first one to be removed. Think of it like a stack of plates.",
    useCases: ["Function call management (call stack)", "Undo/Redo operations", "Expression evaluation", "Backtracking algorithms", "Browser back button"],
    pros: ["Simple implementation", "Fast push/pop operations O(1)", "Memory efficient", "Natural for recursion"],
    cons: ["No random access", "Limited functionality", "Can overflow if not managed", "Only top element accessible"],
    visualExplanation: `
Push 10:     Push 20:     Push 30:     Pop:
+-----+      +-----+      +-----+      +-----+
|     |      |     |      | 30  | <-- |     |
+-----+      +-----+      +-----+     +-----+
|     |      | 20  |      | 20  |      | 20  |
+-----+      +-----+      +-----+     +-----+
| 10  |      | 10  |      | 10  |      | 10  |
+-----+      +-----+      +-----+     +-----+
 TOP↑         TOP↑         TOP↑        TOP↑

Operations: push(item), pop(), peek(), isEmpty()`,
    codeExample: `// Stack implementation using array
class Stack {
  constructor() {
    this.items = [];
  }

  // Push element - O(1)
  push(element) {
    this.items.push(element);
  }

  // Pop element - O(1)
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek top element - O(1)
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size
  size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.peek()); // 20`,
    experimentScenario: "Implement a function to check balanced parentheses using a stack."
  },
  {
    id: "queue",
    name: "Queue",
    slug: "queue",
    description: "A FIFO (First In, First Out) data structure",
    icon: "ArrowRightLeft",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    definition: "A queue is an abstract data type that follows the First-In-First-Out (FIFO) principle. The first element added is the first one to be removed. Think of it like a line of people waiting.",
    useCases: ["Task scheduling", "Print job management", "Breadth-first search", "Message queues", "Handling requests in servers"],
    pros: ["Maintains order of insertion", "Fair processing (FIFO)", "Fast enqueue/dequeue O(1)", "Simple to implement"],
    cons: ["No random access", "Fixed capacity (array-based)", "Memory overhead (linked list)", "Only front/rear accessible"],
    visualExplanation: `
Enqueue 10:   Enqueue 20:   Enqueue 30:   Dequeue:
+-----+-----+ +-----+-----+ +-----+-----+ +-----+-----+
| 10  |     | | 10  | 20  | | 10  | 20  | | 20  | 30  |
+-----+-----+ +-----+-----+ +-----+-----+ +-----+-----+
  ↑             ↑             ↑     ↑       ↑     ↑
Front         Front         Front Rear    Front Rear

→ Elements enter from Rear
← Elements exit from Front`,
    codeExample: `// Queue implementation using array
class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue - add to rear - O(1)
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue - remove from front - O(n) for array
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  // Peek front element - O(1)
  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  // Check if empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get size
  size() {
    return this.items.length;
  }
}

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.front());   // 10
console.log(queue.dequeue()); // 10
console.log(queue.front());   // 20`,
    experimentScenario: "Simulate a print queue where jobs are processed in order of arrival."
  },
  {
    id: "hash-table",
    name: "Hash Table",
    slug: "hash-table",
    description: "A data structure that maps keys to values using a hash function",
    icon: "Hash",
    complexity: { access: "O(1)", search: "O(1)", insert: "O(1)", delete: "O(1)" },
    definition: "A hash table (hash map) is a data structure that implements an associative array, mapping keys to values. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found.",
    useCases: ["Database indexing", "Caching", "Symbol tables in compilers", "Implementing sets", "Counting frequencies"],
    pros: ["Average O(1) for all operations", "Flexible keys", "Efficient lookups", "Great for large datasets"],
    cons: ["Worst case O(n) with collisions", "No ordering", "Memory overhead", "Hash function quality matters"],
    visualExplanation: `
Hash Function: h(key) = key % tableSize

Key: "apple"  → hash("apple") = 3
Key: "banana" → hash("banana") = 7
Key: "cherry" → hash("cherry") = 3  (Collision!)

Index:  [0]  [1]  [2]    [3]           [4]  [5]  [6]  [7]
       +----+----+----+---------------+----+----+----+--------+
       |    |    |    | apple→cherry |    |    |    | banana |
       +----+----+----+---------------+----+----+----+--------+
                           ↑
                      Chaining to handle collision`,
    codeExample: `// Simple Hash Table implementation
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // Set key-value pair - O(1) average
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    // Update if key exists
    for (let pair of this.keyMap[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.keyMap[index].push([key, value]);
  }

  // Get value by key - O(1) average
  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let pair of this.keyMap[index]) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
    }
    return undefined;
  }
}

const ht = new HashTable();
ht.set("apple", 5);
ht.set("banana", 3);
console.log(ht.get("apple"));  // 5
console.log(ht.get("banana")); // 3`,
    experimentScenario: "Try inserting keys that cause collisions and observe how the hash table handles them."
  },
  {
    id: "tree",
    name: "Tree",
    slug: "tree",
    description: "A hierarchical data structure with nodes connected by edges",
    icon: "GitBranch",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    definition: "A tree is a hierarchical data structure consisting of nodes connected by edges. It has a root node and zero or more child nodes. Each child can have its own children, forming a tree-like structure.",
    useCases: ["File system organization", "HTML DOM", "Organization charts", "Decision trees", "Game AI (minimax)"],
    pros: ["Reflects hierarchical relationships", "Efficient searching (if balanced)", "Flexible structure", "Natural for recursive operations"],
    cons: ["Complex implementation", "Can become unbalanced", "Pointer overhead", "Harder to iterate linearly"],
    visualExplanation: `
         [Root]
           A
          /|\\
         / | \\
        B  C  D
       / \\    |
      E   F   G
     /
    H

Terminology:
- Root: A (top node)
- Parent of E,F: B
- Children of B: E, F
- Siblings: B, C, D
- Leaf nodes: C, F, G, H
- Depth of H: 3
- Height of tree: 3`,
    codeExample: `// Tree Node class
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(value) {
    const child = new TreeNode(value);
    this.children.push(child);
    return child;
  }
}

// Tree class
class Tree {
  constructor(rootValue) {
    this.root = new TreeNode(rootValue);
  }

  // Depth-First Traversal
  traverseDFS(node = this.root, result = []) {
    result.push(node.value);
    for (const child of node.children) {
      this.traverseDFS(child, result);
    }
    return result;
  }

  // Breadth-First Traversal
  traverseBFS() {
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);
      queue.push(...node.children);
    }
    return result;
  }
}

const tree = new Tree("A");
const b = tree.root.addChild("B");
const c = tree.root.addChild("C");
b.addChild("D");
b.addChild("E");
console.log(tree.traverseDFS()); // ["A", "B", "D", "E", "C"]
console.log(tree.traverseBFS()); // ["A", "B", "C", "D", "E"]`,
    experimentScenario: "Build a file system tree and implement operations like finding a file or counting total files."
  },
  {
    id: "binary-search-tree",
    name: "Binary Search Tree",
    slug: "binary-search-tree",
    description: "A tree where each node has at most two children with ordered values",
    icon: "Binary",
    complexity: { access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)" },
    definition: "A Binary Search Tree (BST) is a binary tree where for each node: all values in the left subtree are less than the node's value, and all values in the right subtree are greater. This property enables efficient searching.",
    useCases: ["Database indexing", "Auto-complete features", "Priority queues", "Expression parsing", "Sorted data storage"],
    pros: ["Efficient search O(log n)", "Maintains sorted order", "In-order traversal gives sorted sequence", "Efficient range queries"],
    cons: ["Can degrade to O(n) if unbalanced", "More complex than arrays", "Balancing is tricky", "Extra memory for pointers"],
    visualExplanation: `
Binary Search Tree Property:
Left < Node < Right

        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\   /
      4   7 13

In-order traversal: 1, 3, 4, 6, 7, 8, 10, 13, 14 (sorted!)

Search for 7:
8 → go left (7 < 8)
3 → go right (7 > 3)
6 → go right (7 > 6)
7 → Found!`,
    codeExample: `// BST Node
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree
class BST {
  constructor() {
    this.root = null;
  }

  // Insert - O(log n) average
  insert(value) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Search - O(log n) average
  search(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // In-order traversal (sorted)
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
}

const bst = new BST();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(v => bst.insert(v));
console.log(bst.inOrder()); // [1, 3, 4, 6, 7, 8, 10, 13, 14]
console.log(bst.search(7)); // true`,
    experimentScenario: "Insert numbers in different orders and observe how the tree shape changes and affects search performance."
  },
  {
    id: "heap",
    name: "Heap",
    slug: "heap",
    description: "A specialized tree-based structure satisfying the heap property",
    icon: "Triangle",
    complexity: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
    definition: "A heap is a complete binary tree that satisfies the heap property. In a max-heap, each parent is greater than or equal to its children. In a min-heap, each parent is less than or equal to its children.",
    useCases: ["Priority queues", "Heap sort algorithm", "Graph algorithms (Dijkstra, Prim)", "Finding kth largest/smallest", "Median maintenance"],
    pros: ["O(1) access to max/min", "Efficient insert/delete O(log n)", "Always complete tree", "Efficient for priority operations"],
    cons: ["O(n) for arbitrary search", "Not suitable for searching", "Array resizing overhead", "Only max/min directly accessible"],
    visualExplanation: `
Max Heap (parent >= children):
           100
          /    \\
        19      36
       /  \\    /  \\
      17   3  25   1
     /
    2

Array representation: [100, 19, 36, 17, 3, 25, 1, 2]

For node at index i:
- Parent: (i - 1) / 2
- Left child: 2i + 1
- Right child: 2i + 2

Min Heap (parent <= children):
            1
          /    \\
        3       2
       /  \\    /
      17  19  36`,
    codeExample: `// Min Heap implementation
class MinHeap {
  constructor() {
    this.values = [];
  }

  // Insert - O(log n)
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      
      if (element >= parent) break;
      
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  // Extract min - O(log n)
  extractMin() {
    const min = this.values[0];
    const end = this.values.pop();
    
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = null;
      
      if (leftIdx < length && this.values[leftIdx] < element) {
        swap = leftIdx;
      }
      if (rightIdx < length && 
          this.values[rightIdx] < (swap ? this.values[swap] : element)) {
        swap = rightIdx;
      }
      
      if (!swap) break;
      
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const heap = new MinHeap();
[5, 3, 17, 10, 84, 19, 6].forEach(v => heap.insert(v));
console.log(heap.extractMin()); // 3
console.log(heap.extractMin()); // 5`,
    experimentScenario: "Build a priority queue using a heap and process tasks based on their priority levels."
  },
  {
    id: "graph",
    name: "Graph",
    slug: "graph",
    description: "A collection of nodes (vertices) connected by edges",
    icon: "Share2",
    complexity: { access: "O(1)", search: "O(V+E)", insert: "O(1)", delete: "O(E)" },
    definition: "A graph is a non-linear data structure consisting of vertices (nodes) and edges connecting them. Graphs can be directed or undirected, weighted or unweighted, and are used to represent relationships between objects.",
    useCases: ["Social networks", "Maps and navigation", "Network topology", "Dependency resolution", "Recommendation systems"],
    pros: ["Models complex relationships", "Flexible structure", "Powerful algorithms available", "Natural for many real problems"],
    cons: ["Can be memory-intensive", "Complex to implement", "Some operations are expensive", "Difficult to visualize large graphs"],
    visualExplanation: `
Undirected Graph:        Directed Graph:
    A --- B                  A --> B
    |     |                  |     |
    |     |                  v     v
    C --- D                  C --> D

Adjacency List:           Adjacency Matrix:
A: [B, C]                     A  B  C  D
B: [A, D]                  A  0  1  1  0
C: [A, D]                  B  1  0  0  1
D: [B, C]                  C  1  0  0  1
                           D  0  1  1  0

Weighted Graph:
    A --5-- B
    |       |
    2       3
    |       |
    C --1-- D`,
    codeExample: `// Graph using Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Add vertex - O(1)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add edge - O(1)
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // Remove for directed
  }

  // BFS - O(V + E)
  bfs(start) {
    const result = [];
    const visited = {};
    const queue = [start];
    visited[start] = true;

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  // DFS - O(V + E)
  dfs(start) {
    const result = [];
    const visited = {};

    const traverse = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);
      
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          traverse(neighbor);
        }
      }
    };

    traverse(start);
    return result;
  }
}

const g = new Graph();
["A", "B", "C", "D", "E"].forEach(v => g.addVertex(v));
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
console.log(g.bfs("A")); // ["A", "B", "C", "D", "E"]
console.log(g.dfs("A")); // ["A", "B", "D", "C", "E"]`,
    experimentScenario: "Create a social network graph and find the shortest path between two users."
  },
  {
    id: "trie",
    name: "Trie",
    slug: "trie",
    description: "A tree-like data structure for efficient string retrieval",
    icon: "FileText",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
    definition: "A Trie (pronounced 'try') is a tree-like data structure used to store strings. Each node represents a character, and paths from root to nodes represent prefixes. It's extremely efficient for prefix-based operations like autocomplete.",
    useCases: ["Autocomplete suggestions", "Spell checkers", "IP routing tables", "Dictionary implementations", "Phone directories"],
    pros: ["Fast prefix search O(m) where m is key length", "No hash collisions", "Alphabetical ordering", "Efficient for many keys with common prefixes"],
    cons: ["High memory usage", "Slower than hash tables for exact matches", "Complex implementation", "Sparse tries waste memory"],
    visualExplanation: `
Trie storing: "car", "cat", "card", "care", "dog"

           (root)
           /    \\
          c      d
         /        \\
        a          o
       /            \\
      r*             g*
     / \\
    d*  e*
    
    * = end of word

Search "car": root → c → a → r ✓ (found)
Search "cab": root → c → a → b ✗ (no 'b' child)

Prefix search "car": Returns ["car", "card", "care"]`,
    codeExample: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert word - O(m) where m is word length
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Search word - O(m)
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // Check if any word starts with prefix - O(m)
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }

  // Get all words with prefix
  getWordsWithPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    const words = [];
    this._collectWords(node, prefix, words);
    return words;
  }

  _collectWords(node, prefix, words) {
    if (node.isEndOfWord) words.push(prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this._collectWords(child, prefix + char, words);
    }
  }
}

const trie = new Trie();
["car", "card", "care", "cat", "dog"].forEach(w => trie.insert(w));
console.log(trie.search("car"));     // true
console.log(trie.startsWith("ca"));  // true
console.log(trie.getWordsWithPrefix("car")); // ["car", "card", "care"]`,
    experimentScenario: "Build an autocomplete system using a Trie and test with common search prefixes."
  },
  {
    id: "avl-tree",
    name: "AVL Tree",
    slug: "avl-tree",
    description: "A self-balancing binary search tree",
    icon: "Scale",
    complexity: { access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)" },
    definition: "An AVL Tree is a self-balancing Binary Search Tree where the heights of left and right subtrees differ by at most 1 for every node. This balance guarantee ensures O(log n) operations even in worst case.",
    useCases: ["Database indexing", "File system organization", "Memory management", "Expression parsing", "Priority scheduling"],
    pros: ["Guaranteed O(log n) operations", "Always balanced", "Faster lookups than Red-Black trees", "Predictable performance"],
    cons: ["More rotations than Red-Black trees", "Complex implementation", "Extra storage for height", "Slower insertions than Red-Black trees"],
    visualExplanation: `
Balance Factor = Height(Left) - Height(Right)
Valid BF: -1, 0, 1

Unbalanced after insert 4:        After Right Rotation:
        30 (BF=2)                        20
       /                                /  \\
      20 (BF=1)                       10    30
     /                                      /
    10                                     (4 would go here)

Four rotation types:
1. Left-Left (LL) → Right Rotation
2. Right-Right (RR) → Left Rotation
3. Left-Right (LR) → Left then Right
4. Right-Left (RL) → Right then Left

Example AVL Tree:
         30
        /  \\
      20    40
     /  \\     \\
   10   25    50

All nodes have BF in {-1, 0, 1} ✓`,
    codeExample: `class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    
    x.right = y;
    y.left = T2;
    
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    
    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    
    y.left = x;
    x.right = T2;
    
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    
    return y;
  }

  insert(value, node = this.root) {
    if (!node) {
      const newNode = new AVLNode(value);
      if (!this.root) this.root = newNode;
      return newNode;
    }

    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    } else {
      return node; // Duplicates not allowed
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }
    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }
    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }
}

const avl = new AVLTree();
[10, 20, 30, 40, 50, 25].forEach(v => { avl.root = avl.insert(v, avl.root); });
// Tree remains balanced with height ~3 instead of 6`,
    experimentScenario: "Insert numbers in sorted order and observe how rotations keep the tree balanced compared to a regular BST."
  },
  {
    id: "priority-queue",
    name: "Priority Queue",
    slug: "priority-queue",
    description: "A queue where elements are served based on priority",
    icon: "ListOrdered",
    complexity: { access: "O(1)", search: "O(n)", insert: "O(log n)", delete: "O(log n)" },
    definition: "A Priority Queue is an abstract data type where each element has a priority. Elements with higher priority are served before elements with lower priority. It's typically implemented using a heap.",
    useCases: ["Task scheduling", "Dijkstra's algorithm", "Huffman coding", "Event-driven simulation", "Operating system job scheduling"],
    pros: ["O(1) access to highest priority", "O(log n) insert and extract", "Flexible priority definitions", "Efficient for priority-based processing"],
    cons: ["O(n) for arbitrary search", "More complex than simple queue", "Memory overhead", "Priority updates can be expensive"],
    visualExplanation: `
Min Priority Queue (lower value = higher priority):

Insert tasks with priorities:
Task A (priority 3)
Task B (priority 1)  ← Highest priority (served first)
Task C (priority 2)
Task D (priority 5)

Internal Heap Structure:
        1 (B)
       /    \\
     3 (A)  2 (C)
    /
   5 (D)

Extract order: B(1) → C(2) → A(3) → D(5)

Real-world example - Hospital ER:
Priority 1: Life-threatening
Priority 2: Serious
Priority 3: Non-urgent

Patients served by severity, not arrival time.`,
    codeExample: `class PriorityQueue {
  constructor() {
    this.values = [];
  }

  // Insert with priority - O(log n)
  enqueue(value, priority) {
    this.values.push({ value, priority });
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];

      if (element.priority >= parent.priority) break;

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  // Extract highest priority - O(log n)
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = null;

      if (leftIdx < length && this.values[leftIdx].priority < element.priority) {
        swap = leftIdx;
      }

      if (rightIdx < length) {
        const rightPriority = this.values[rightIdx].priority;
        if ((swap === null && rightPriority < element.priority) ||
            (swap !== null && rightPriority < this.values[swap].priority)) {
          swap = rightIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  isEmpty() {
    return this.values.length === 0;
  }
}

const pq = new PriorityQueue();
pq.enqueue("Low priority task", 5);
pq.enqueue("URGENT!", 1);
pq.enqueue("Medium task", 3);

console.log(pq.dequeue()); // { value: "URGENT!", priority: 1 }
console.log(pq.dequeue()); // { value: "Medium task", priority: 3 }`,
    experimentScenario: "Simulate a hospital ER where patients are treated based on severity of condition."
  },
  {
    id: "deque",
    name: "Deque",
    slug: "deque",
    description: "Double-ended queue allowing insertion and deletion at both ends",
    icon: "ArrowLeftRight",
    complexity: { access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
    definition: "A Deque (Double-Ended Queue, pronounced 'deck') is a linear data structure that allows insertion and deletion at both the front and rear ends. It combines the functionality of both stacks and queues.",
    useCases: ["Browser history (back/forward)", "Undo/redo with limits", "Sliding window algorithms", "Palindrome checking", "Work stealing in parallel processing"],
    pros: ["O(1) operations at both ends", "Versatile (acts as stack or queue)", "Efficient for sliding window", "Simple implementation"],
    cons: ["O(n) for middle access", "More complex than stack/queue", "Array-based may need resizing", "Less intuitive than simpler structures"],
    visualExplanation: `
Deque operations:

Initial:     [10, 20, 30]
              ↑        ↑
           Front     Rear

addFront(5): [5, 10, 20, 30]
addRear(40): [5, 10, 20, 30, 40]

removeFront(): [10, 20, 30, 40]  returns 5
removeRear():  [10, 20, 30]      returns 40

Sliding Window Example (window size 3):
Array: [1, 3, -1, -3, 5, 3, 6, 7]

Window [1,3,-1] max=3
Window [3,-1,-3] max=3
Window [-1,-3,5] max=5
...

Deque stores indices of potential maximums.`,
    codeExample: `class Deque {
  constructor() {
    this.items = [];
  }

  // Add to front - O(1) amortized
  addFront(element) {
    this.items.unshift(element);
  }

  // Add to rear - O(1)
  addRear(element) {
    this.items.push(element);
  }

  // Remove from front - O(1) amortized
  removeFront() {
    if (this.isEmpty()) return "Deque is empty";
    return this.items.shift();
  }

  // Remove from rear - O(1)
  removeRear() {
    if (this.isEmpty()) return "Deque is empty";
    return this.items.pop();
  }

  // Peek front - O(1)
  peekFront() {
    if (this.isEmpty()) return "Deque is empty";
    return this.items[0];
  }

  // Peek rear - O(1)
  peekRear() {
    if (this.isEmpty()) return "Deque is empty";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Sliding Window Maximum using Deque
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = new Deque();

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (!deque.isEmpty() && deque.peekFront() < i - k + 1) {
      deque.removeFront();
    }
    
    // Remove smaller elements
    while (!deque.isEmpty() && nums[deque.peekRear()] < nums[i]) {
      deque.removeRear();
    }
    
    deque.addRear(i);
    
    if (i >= k - 1) {
      result.push(nums[deque.peekFront()]);
    }
  }
  
  return result;
}

const deque = new Deque();
deque.addRear(10);
deque.addRear(20);
deque.addFront(5);
console.log(deque.items); // [5, 10, 20]
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`,
    experimentScenario: "Implement a browser history that allows going back and forward with a limit on history size."
  },
  {
    id: "set-map",
    name: "Set & Map",
    slug: "set-map",
    description: "Collections for unique values and key-value pairs",
    icon: "Map",
    complexity: { access: "O(1)", search: "O(1)", insert: "O(1)", delete: "O(1)" },
    definition: "Set is a collection of unique values with no duplicates. Map is a collection of key-value pairs where each key is unique. Both provide O(1) average time for basic operations using hash tables internally.",
    useCases: ["Removing duplicates", "Counting frequencies", "Caching", "Membership testing", "Object relationships"],
    pros: ["O(1) average operations", "Built-in uniqueness", "Flexible key types (Map)", "Maintains insertion order (ES6)"],
    cons: ["Memory overhead", "No indexing", "Hash collisions possible", "Objects as keys require Map"],
    visualExplanation: `
SET - Unique Values Only:
add(1) → {1}
add(2) → {1, 2}
add(1) → {1, 2}  (1 already exists, ignored)
add(3) → {1, 2, 3}

has(2) → true
delete(2) → {1, 3}

MAP - Key-Value Pairs:
set("name", "Alice") → {"name" → "Alice"}
set("age", 25) → {"name" → "Alice", "age" → 25}
set("name", "Bob") → {"name" → "Bob", "age" → 25} (updated)

get("name") → "Bob"
has("age") → true
delete("age") → {"name" → "Bob"}

Common Use: Two Sum Problem
Array: [2, 7, 11, 15], Target: 9
Map tracks: {2: 0, 7: 1...}
At 7: Check if (9-7)=2 exists → Yes! Answer: [0, 1]`,
    codeExample: `// SET - Unique collection
const mySet = new Set();

// Add elements
mySet.add(1);
mySet.add(5);
mySet.add(5); // Ignored (duplicate)
mySet.add("hello");
mySet.add({ a: 1 }); // Objects are always unique

console.log(mySet.size); // 4
console.log(mySet.has(5)); // true
mySet.delete(5);

// Set from array (removes duplicates)
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

const union = new Set([...setA, ...setB]); // {1, 2, 3, 4}
const intersection = new Set([...setA].filter(x => setB.has(x))); // {2, 3}
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1}

// MAP - Key-value pairs
const myMap = new Map();

// Set key-value pairs
myMap.set("name", "Alice");
myMap.set("age", 25);
myMap.set(1, "number key");

console.log(myMap.get("name")); // "Alice"
console.log(myMap.has("age")); // true
myMap.delete("age");

// Iterate over Map
for (const [key, value] of myMap) {
  console.log(\`\${key}: \${value}\`);
}

// Two Sum using Map - O(n)
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]`,
    experimentScenario: "Use a Set to find all unique words in a text and a Map to count their frequencies."
  }
];

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    slug: "bubble-sort",
    description: "A simple sorting algorithm that repeatedly swaps adjacent elements",
    icon: "ArrowUpDown",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    definition: "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    steps: [
      "Start at the beginning of the array",
      "Compare adjacent elements (arr[i] and arr[i+1])",
      "If arr[i] > arr[i+1], swap them",
      "Move to the next pair",
      "After each pass, the largest unsorted element 'bubbles up' to its correct position",
      "Repeat until no swaps are needed"
    ],
    visualDiagram: `
Initial: [64, 34, 25, 12, 22]

Pass 1:
[64, 34, 25, 12, 22] → Compare 64, 34 → Swap
[34, 64, 25, 12, 22] → Compare 64, 25 → Swap
[34, 25, 64, 12, 22] → Compare 64, 12 → Swap
[34, 25, 12, 64, 22] → Compare 64, 22 → Swap
[34, 25, 12, 22, 64] → 64 is now in place!

Pass 2:
[34, 25, 12, 22, 64] → 34 > 25 → Swap
[25, 34, 12, 22, 64] → 34 > 12 → Swap
[25, 12, 34, 22, 64] → 34 > 22 → Swap
[25, 12, 22, 34, 64] → 34 in place!

Continue until sorted...
Final: [12, 22, 25, 34, 64]`,
    inputOutputExamples: [
      { input: "[64, 34, 25, 12, 22]", output: "[12, 22, 25, 34, 64]" },
      { input: "[5, 1, 4, 2, 8]", output: "[1, 2, 4, 5, 8]" },
      { input: "[1, 2, 3, 4, 5]", output: "[1, 2, 3, 4, 5] (already sorted)" }
    ],
    codeImplementation: `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    // Last i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if current > next
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Example usage:
console.log(bubbleSort([64, 34, 25, 12, 22]));
// Output: [12, 22, 25, 34, 64]`
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    slug: "selection-sort",
    description: "Finds the minimum element and places it at the beginning",
    icon: "MousePointer",
    category: "sorting",
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    definition: "Selection Sort divides the input into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region.",
    steps: [
      "Find the minimum element in the unsorted portion",
      "Swap it with the first element of the unsorted portion",
      "Move the boundary between sorted and unsorted one element to the right",
      "Repeat until the entire array is sorted"
    ],
    visualDiagram: `
Initial: [64, 25, 12, 22, 11]
         |←--- unsorted ---→|

Pass 1: Find min (11), swap with first
[11, 25, 12, 22, 64]
 ↑ sorted |← unsorted →|

Pass 2: Find min (12), swap with first unsorted
[11, 12, 25, 22, 64]
 ↑--↑ sorted |unsorted|

Pass 3: Find min (22), swap
[11, 12, 22, 25, 64]
 ↑-----↑ sorted |uns|

Pass 4: Find min (25), already in place
[11, 12, 22, 25, 64]
 ↑---------↑ sorted

Final: [11, 12, 22, 25, 64] ✓`,
    inputOutputExamples: [
      { input: "[64, 25, 12, 22, 11]", output: "[11, 12, 22, 25, 64]" },
      { input: "[29, 10, 14, 37, 13]", output: "[10, 13, 14, 29, 37]" }
    ],
    codeImplementation: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted portion
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the found minimum with the first unsorted element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}

// Example usage:
console.log(selectionSort([64, 25, 12, 22, 11]));
// Output: [11, 12, 22, 25, 64]`
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    slug: "insertion-sort",
    description: "Builds the sorted array one element at a time",
    icon: "ArrowDownToLine",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    definition: "Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position among the previously sorted elements, like sorting playing cards in your hand.",
    steps: [
      "Start with the second element (first element is 'sorted')",
      "Compare the current element with the sorted portion",
      "Shift all larger elements one position to the right",
      "Insert the current element in its correct position",
      "Move to the next element and repeat"
    ],
    visualDiagram: `
Initial: [12, 11, 13, 5, 6]

Step 1: key = 11
[12, 11, 13, 5, 6] → 11 < 12, shift 12 right
[11, 12, 13, 5, 6] → Insert 11

Step 2: key = 13
[11, 12, 13, 5, 6] → 13 > 12, stays in place

Step 3: key = 5
[11, 12, 13, 5, 6] → 5 < all, shift all right
[5, 11, 12, 13, 6] → Insert 5

Step 4: key = 6
[5, 11, 12, 13, 6] → 6 > 5, 6 < 11, shift 11,12,13
[5, 6, 11, 12, 13] → Insert 6

Final: [5, 6, 11, 12, 13] ✓`,
    inputOutputExamples: [
      { input: "[12, 11, 13, 5, 6]", output: "[5, 6, 11, 12, 13]" },
      { input: "[4, 3, 2, 1]", output: "[1, 2, 3, 4]" }
    ],
    codeImplementation: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // Current element to be inserted
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}

// Example usage:
console.log(insertionSort([12, 11, 13, 5, 6]));
// Output: [5, 6, 11, 12, 13]`
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    slug: "merge-sort",
    description: "A divide-and-conquer algorithm that splits and merges arrays",
    icon: "GitMerge",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    definition: "Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It divides the array into halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) time complexity.",
    steps: [
      "Divide the array into two halves",
      "Recursively sort each half",
      "Merge the two sorted halves",
      "During merging, compare elements from both halves",
      "Place the smaller element first",
      "Continue until all elements are merged"
    ],
    visualDiagram: `
                    [38, 27, 43, 3, 9, 82, 10]
                           /           \\
                [38, 27, 43, 3]    [9, 82, 10]
                   /       \\          /      \\
            [38, 27]    [43, 3]   [9, 82]   [10]
              /  \\       /  \\      /  \\       |
           [38] [27]  [43] [3]  [9] [82]    [10]
              \\  /       \\  /      \\  /       |
            [27, 38]   [3, 43]   [9, 82]   [10]
                  \\     /            \\      /
              [3, 27, 38, 43]     [9, 10, 82]
                        \\            /
                [3, 9, 10, 27, 38, 43, 82]`,
    inputOutputExamples: [
      { input: "[38, 27, 43, 3, 9, 82, 10]", output: "[3, 9, 10, 27, 38, 43, 82]" },
      { input: "[5, 2, 4, 6, 1, 3]", output: "[1, 2, 3, 4, 5, 6]" }
    ],
    codeImplementation: `function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are sorted
  if (arr.length <= 1) return arr;
  
  // Divide
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Merge
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  // Compare elements and merge in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage:
console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// Output: [3, 9, 10, 27, 38, 43, 82]`
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    slug: "quick-sort",
    description: "An efficient divide-and-conquer algorithm using pivot partitioning",
    icon: "Zap",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    definition: "Quick Sort is an efficient, in-place sorting algorithm that uses divide-and-conquer. It selects a 'pivot' element and partitions the array so elements smaller than the pivot are on the left, and larger ones are on the right.",
    steps: [
      "Choose a pivot element (often the last element)",
      "Partition: reorder array so elements < pivot come before, > pivot come after",
      "The pivot is now in its final sorted position",
      "Recursively apply to the sub-arrays on left and right of pivot",
      "Base case: arrays of size 0 or 1 are already sorted"
    ],
    visualDiagram: `
Initial: [10, 80, 30, 90, 40, 50, 70]
                           Pivot: 70

Partition around 70:
[10, 80, 30, 90, 40, 50, 70]
  ↑                      ↑
  i                  pivot

After partition:
[10, 30, 40, 50, 70, 90, 80]
      < 70    ↑   > 70
           pivot in place!

Recurse on left [10, 30, 40, 50]:
  pivot = 50 → [10, 30, 40, 50]

Recurse on right [90, 80]:
  pivot = 80 → [80, 90]

Final: [10, 30, 40, 50, 70, 80, 90] ✓`,
    inputOutputExamples: [
      { input: "[10, 80, 30, 90, 40, 50, 70]", output: "[10, 30, 40, 50, 70, 80, 90]" },
      { input: "[3, 6, 8, 10, 1, 2, 1]", output: "[1, 1, 2, 3, 6, 8, 10]" }
    ],
    codeImplementation: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition and get pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort left and right
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than pivot
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Example usage:
console.log(quickSort([10, 80, 30, 90, 40, 50, 70]));
// Output: [10, 30, 40, 50, 70, 80, 90]`
  },
  {
    id: "binary-search",
    name: "Binary Search",
    slug: "binary-search",
    description: "An efficient search algorithm for sorted arrays",
    icon: "Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    definition: "Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.",
    steps: [
      "Start with the entire sorted array",
      "Find the middle element",
      "If target equals middle, we're done!",
      "If target < middle, search the left half",
      "If target > middle, search the right half",
      "Repeat until found or search space is empty"
    ],
    visualDiagram: `
Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Target: 23

Step 1:
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
 L              M                   H
Middle = 16, 23 > 16 → Search right

Step 2:
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
                  L       M         H
Middle = 56, 23 < 56 → Search left

Step 3:
[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
                  L   M   H
Middle = 23, 23 == 23 → Found!

Result: Index 5 ✓`,
    inputOutputExamples: [
      { input: "arr = [2, 5, 8, 12, 16, 23, 38], target = 23", output: "5 (index)" },
      { input: "arr = [1, 3, 5, 7, 9], target = 4", output: "-1 (not found)" }
    ],
    codeImplementation: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found!
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Not found
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
  return binarySearchRecursive(arr, target, left, mid - 1);
}

// Example usage:
const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(arr, 23)); // 5
console.log(binarySearch(arr, 100)); // -1`
  },
  {
    id: "bfs",
    name: "Breadth-First Search",
    slug: "bfs",
    description: "Explores graph level by level from a starting node",
    icon: "Layers",
    category: "graph",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    definition: "Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue data structure.",
    steps: [
      "Start at the source vertex, mark it visited, add to queue",
      "Dequeue a vertex and process it",
      "Enqueue all unvisited neighbors",
      "Mark neighbors as visited",
      "Repeat until queue is empty"
    ],
    visualDiagram: `
Graph:
    A --- B
    |     |
    C --- D --- E

BFS from A:

Queue: [A]           Visited: {A}
Process A → Neighbors: B, C
Queue: [B, C]        Visited: {A, B, C}

Process B → Neighbors: D
Queue: [C, D]        Visited: {A, B, C, D}

Process C → (D already visited)
Queue: [D]

Process D → Neighbor: E
Queue: [E]           Visited: {A, B, C, D, E}

Process E → (no unvisited)
Queue: []

Order: A → B → C → D → E`,
    inputOutputExamples: [
      { input: "Graph: A-B, A-C, B-D, C-D, D-E, Start: A", output: "A, B, C, D, E" },
      { input: "Graph: 1-2, 1-3, 2-4, 2-5, 3-6, Start: 1", output: "1, 2, 3, 4, 5, 6" }
    ],
    codeImplementation: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    // Process all neighbors
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}

// Shortest path using BFS
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]];
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    if (vertex === end) return path;
    
    for (const neighbor of graph[vertex] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  
  return null; // No path found
}

// Example usage:
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D']
};
console.log(bfs(graph, 'A')); // ['A', 'B', 'C', 'D', 'E']
console.log(shortestPath(graph, 'A', 'E')); // ['A', 'B', 'D', 'E']`
  },
  {
    id: "dfs",
    name: "Depth-First Search",
    slug: "dfs",
    description: "Explores as far as possible along each branch before backtracking",
    icon: "ArrowDownRight",
    category: "graph",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    definition: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to keep track of vertices to visit.",
    steps: [
      "Start at the source vertex, mark it visited",
      "Explore an unvisited neighbor",
      "Recursively visit that neighbor's unvisited neighbors",
      "When no unvisited neighbors remain, backtrack",
      "Repeat until all reachable vertices are visited"
    ],
    visualDiagram: `
Graph:
    A --- B
    |     |
    C --- D --- E

DFS from A (exploring alphabetically):

Visit A → Explore neighbor B
  Visit B → Explore neighbor D
    Visit D → Explore neighbor C
      Visit C → (A visited, D visited) Backtrack
    Backtrack to D → Explore E
      Visit E → Backtrack
    Backtrack to D → Backtrack
  Backtrack to B → Backtrack
Backtrack to A → (C visited) Done

Stack trace:
A → A,B → A,B,D → A,B,D,C → A,B,D → A,B,D,E → A,B,D → A,B → A → Done

Order: A → B → D → C → E`,
    inputOutputExamples: [
      { input: "Graph: A-B, A-C, B-D, C-D, D-E, Start: A", output: "A, B, D, C, E (or varies by order)" },
      { input: "Graph: 1-2, 1-3, 2-4, 3-4, Start: 1", output: "1, 2, 4, 3" }
    ],
    codeImplementation: `// Recursive DFS
function dfsRecursive(graph, start, visited = new Set()) {
  const result = [];
  
  function traverse(vertex) {
    if (visited.has(vertex)) return;
    
    visited.add(vertex);
    result.push(vertex);
    
    for (const neighbor of graph[vertex] || []) {
      traverse(neighbor);
    }
  }
  
  traverse(start);
  return result;
}

// Iterative DFS using stack
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    
    if (visited.has(vertex)) continue;
    
    visited.add(vertex);
    result.push(vertex);
    
    // Add neighbors to stack (reverse for consistent order)
    const neighbors = graph[vertex] || [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      if (!visited.has(neighbors[i])) {
        stack.push(neighbors[i]);
      }
    }
  }
  
  return result;
}

// Example usage:
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D']
};
console.log(dfsRecursive(graph, 'A')); // ['A', 'B', 'D', 'C', 'E']
console.log(dfsIterative(graph, 'A')); // ['A', 'B', 'D', 'C', 'E']`
  },
  {
    id: "linear-search",
    name: "Linear Search",
    slug: "linear-search",
    description: "A simple search algorithm that checks every element sequentially",
    icon: "Search",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    definition: "Linear Search is the simplest searching algorithm that sequentially checks each element in a collection until the target is found or the collection is exhausted. It works on both sorted and unsorted data.",
    steps: [
      "Start from the first element of the array",
      "Compare the current element with the target value",
      "If they match, return the current index",
      "If not, move to the next element",
      "Repeat until the element is found or the array ends",
      "Return -1 if the element is not found"
    ],
    visualDiagram: `
Search for 7 in [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 7]

Step 1: [3] 1  4  1  5  9  2  6  5  3  7
         ^ 3 != 7, continue

Step 2:  3 [1] 4  1  5  9  2  6  5  3  7
            ^ 1 != 7, continue

... (continue checking each element)

Step 11: 3  1  4  1  5  9  2  6  5  3 [7]
                                       ^ 7 = 7, Found at index 10!`,
    inputOutputExamples: [
      { input: "arr = [3, 1, 4, 1, 5], target = 4", output: "2 (index of 4)" },
      { input: "arr = [10, 20, 30, 40], target = 25", output: "-1 (not found)" },
      { input: "arr = [5, 3, 7, 2], target = 5", output: "0 (first element)" }
    ],
    codeImplementation: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(linearSearch([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 7], 7)); // 10
console.log(linearSearch([3, 1, 4, 1, 5], 8)); // -1`
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    slug: "heap-sort",
    description: "An efficient sorting algorithm using a binary heap data structure",
    icon: "Triangle",
    category: "sorting",
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    definition: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap. It first builds a max-heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until sorted.",
    steps: [
      "Build a max-heap from the input array",
      "Swap the root (largest element) with the last element",
      "Reduce the heap size by one",
      "Heapify the root to maintain the max-heap property",
      "Repeat steps 2-4 until the heap size is 1",
      "The array is now sorted in ascending order"
    ],
    visualDiagram: `
Initial Array: [4, 10, 3, 5, 1]

Step 1: Build Max Heap
        10
       /  \\
      5    3
     / \\
    4   1
Array: [10, 5, 3, 4, 1]

Step 2: Extract max (10), swap with last
Sorted: [10]

Step 3: Heapify, extract max (5)
Sorted: [5, 10]

Continue until fully sorted...
Final: [1, 3, 4, 5, 10]`,
    inputOutputExamples: [
      { input: "[4, 10, 3, 5, 1]", output: "[1, 3, 4, 5, 10]" },
      { input: "[64, 34, 25, 12, 22, 11, 90]", output: "[11, 12, 22, 25, 34, 64, 90]" }
    ],
    codeImplementation: `function heapSort(arr) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

console.log(heapSort([4, 10, 3, 5, 1])); // [1, 3, 4, 5, 10]`
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    slug: "counting-sort",
    description: "A non-comparison sorting algorithm for integers in a known range",
    icon: "Hash",
    category: "sorting",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    definition: "Counting Sort is a non-comparison integer sorting algorithm. It works by counting the occurrences of each unique element and using arithmetic to determine positions. It's efficient when the range of input values (k) is not significantly larger than the number of elements (n).",
    steps: [
      "Find the maximum value in the input array",
      "Create a count array of size (max + 1) initialized to 0",
      "Count occurrences of each element in the input",
      "Modify count array to store cumulative counts",
      "Build the output array by placing elements at their correct positions",
      "Copy the output array back to the original array"
    ],
    visualDiagram: `
Input: [4, 2, 2, 8, 3, 3, 1]

Step 1: Find max = 8

Step 2: Create count array (size 9)

Step 3: Count occurrences
Index:  0  1  2  3  4  5  6  7  8
Count: [0, 1, 2, 2, 1, 0, 0, 0, 1]

Step 4: Cumulative count
       [0, 1, 3, 5, 6, 6, 6, 6, 7]

Step 5: Build output
Output: [1, 2, 2, 3, 3, 4, 8]`,
    inputOutputExamples: [
      { input: "[4, 2, 2, 8, 3, 3, 1]", output: "[1, 2, 2, 3, 3, 4, 8]" },
      { input: "[1, 4, 1, 2, 7, 5, 2]", output: "[1, 1, 2, 2, 4, 5, 7]" }
    ],
    codeImplementation: `function countingSort(arr) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (const num of arr) {
    count[num]++;
  }

  const result = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }

  return result;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]`
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    slug: "dijkstra",
    description: "Finds the shortest path between nodes in a weighted graph",
    icon: "Route",
    category: "graph",
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    definition: "Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It uses a greedy approach, always selecting the unvisited vertex with the smallest known distance.",
    steps: [
      "Initialize distances: source = 0, all others = infinity",
      "Mark all vertices as unvisited",
      "Select the unvisited vertex with the smallest distance",
      "Update distances to all unvisited neighbors through this vertex",
      "Mark the current vertex as visited",
      "Repeat steps 3-5 until all vertices are visited"
    ],
    visualDiagram: `
Weighted Graph:
    A --4-- B
    |     / |
    2   1   3
    | /     |
    C --5-- D

Find shortest paths from A:

Step 1: distances = {A: 0, B: inf, C: inf, D: inf}
Step 2: Visit A -> distances = {A: 0, B: 4, C: 2, D: inf}
Step 3: Visit C -> B via C = 2+1 = 3 (better!)
        distances = {A: 0, B: 3, C: 2, D: 7}
Step 4: Visit B -> D via B = 3+3 = 6
        distances = {A: 0, B: 3, C: 2, D: 6}

Result: A->A:0, A->B:3, A->C:2, A->D:6`,
    inputOutputExamples: [
      { input: "Graph A-B(4), A-C(2), B-C(1), B-D(3), C-D(5), start=A", output: "A:0, B:3, C:2, D:6" }
    ],
    codeImplementation: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();

  for (const vertex in graph) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  while (true) {
    let minDist = Infinity;
    let current = null;
    for (const v in distances) {
      if (!visited.has(v) && distances[v] < minDist) {
        minDist = distances[v];
        current = v;
      }
    }
    if (current === null) break;

    visited.add(current);

    for (const [neighbor, weight] of graph[current]) {
      const newDist = distances[current] + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
      }
    }
  }

  return distances;
}

const graph = {
  A: [['B', 4], ['C', 2]],
  B: [['A', 4], ['C', 1], ['D', 3]],
  C: [['A', 2], ['B', 1], ['D', 5]],
  D: [['B', 3], ['C', 5]]
};

console.log(dijkstra(graph, 'A')); // {A: 0, B: 3, C: 2, D: 6}`
  },
  {
    id: "jump-search",
    name: "Jump Search",
    slug: "jump-search",
    description: "A search algorithm for sorted arrays using block jumps",
    icon: "SkipForward",
    category: "searching",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    definition: "Jump Search works on sorted arrays by jumping ahead by fixed steps (typically sqrt(n)) and then performing a linear search in the block where the target might exist. It's faster than Linear Search and simpler than Binary Search.",
    steps: [
      "Determine the optimal jump size (typically sqrt(n))",
      "Jump through the array in blocks of this size",
      "Stop when the current block contains a value >= target",
      "Perform linear search in the previous block",
      "Return the index if found, -1 otherwise"
    ],
    visualDiagram: `
Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
Target: 11
Jump size = sqrt(16) = 4

Step 1: Jump to index 0  -> value 0  < 11, jump
Step 2: Jump to index 4  -> value 4  < 11, jump
Step 3: Jump to index 8  -> value 8  < 11, jump
Step 4: Jump to index 12 -> value 12 >= 11, stop!

Step 5: Linear search from index 8 to 11
        arr[8]=8, arr[9]=9, arr[10]=10, arr[11]=11 Found!

Result: Element 11 found at index 11`,
    inputOutputExamples: [
      { input: "arr = [0-15], target = 11", output: "11" },
      { input: "arr = [1,3,5,7,9,11,13,15,17,19], target = 13", output: "6" }
    ],
    codeImplementation: `function jumpSearch(arr, target) {
  const n = arr.length;
  const jump = Math.floor(Math.sqrt(n));

  let prev = 0;
  let curr = jump;

  while (curr < n && arr[curr] < target) {
    prev = curr;
    curr += jump;
    if (prev >= n) return -1;
  }

  while (prev < Math.min(curr, n)) {
    if (arr[prev] === target) {
      return prev;
    }
    prev++;
  }

  return -1;
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(jumpSearch(arr, 11)); // 11
console.log(jumpSearch(arr, 5));  // 5`
  }
];

export const glossaryTerms: GlossaryTerm[] = [
  { id: "1", term: "Algorithm", definition: "A step-by-step procedure or formula for solving a problem or accomplishing a task.", relatedTerms: ["Time Complexity", "Space Complexity"], category: "Fundamentals" },
  { id: "2", term: "Time Complexity", definition: "A measure of the amount of time an algorithm takes to run as a function of the input size.", relatedTerms: ["Big O Notation", "Space Complexity"], category: "Complexity" },
  { id: "3", term: "Space Complexity", definition: "A measure of the amount of memory an algorithm uses as a function of the input size.", relatedTerms: ["Time Complexity", "Big O Notation"], category: "Complexity" },
  { id: "4", term: "Big O Notation", definition: "A mathematical notation describing the upper bound of an algorithm's growth rate.", relatedTerms: ["Time Complexity", "Space Complexity"], category: "Complexity" },
  { id: "5", term: "Recursion", definition: "A technique where a function calls itself to solve smaller instances of the same problem.", relatedTerms: ["Stack", "Base Case"], category: "Fundamentals" },
  { id: "6", term: "Iteration", definition: "The repetition of a process using loops (for, while) to solve a problem.", relatedTerms: ["Loop", "Recursion"], category: "Fundamentals" },
  { id: "7", term: "Divide and Conquer", definition: "A strategy of breaking a problem into smaller subproblems, solving them, and combining results.", relatedTerms: ["Merge Sort", "Quick Sort"], category: "Strategies" },
  { id: "8", term: "Pointer", definition: "A variable that stores the memory address of another variable or data structure.", relatedTerms: ["Linked List", "Reference"], category: "Fundamentals" },
  { id: "9", term: "Node", definition: "A basic unit of a data structure that contains data and links to other nodes.", relatedTerms: ["Linked List", "Tree", "Graph"], category: "Data Structures" },
  { id: "10", term: "Edge", definition: "A connection between two nodes in a graph or tree data structure.", relatedTerms: ["Vertex", "Graph"], category: "Data Structures" },
  { id: "11", term: "Vertex", definition: "A node in a graph data structure, also known as a point.", relatedTerms: ["Edge", "Graph"], category: "Data Structures" },
  { id: "12", term: "Traversal", definition: "The process of visiting all nodes in a data structure in a specific order.", relatedTerms: ["BFS", "DFS", "In-order"], category: "Operations" },
  { id: "13", term: "Hash Function", definition: "A function that maps data of arbitrary size to fixed-size values.", relatedTerms: ["Hash Table", "Collision"], category: "Data Structures" },
  { id: "14", term: "Collision", definition: "When two different keys hash to the same index in a hash table.", relatedTerms: ["Hash Table", "Chaining"], category: "Data Structures" },
  { id: "15", term: "Balanced Tree", definition: "A tree where the height of left and right subtrees differs by at most one for all nodes.", relatedTerms: ["AVL Tree", "Red-Black Tree"], category: "Data Structures" }
];

export const faqItems: FAQItem[] = [
  { id: "1", question: "What is the difference between an Array and a Linked List?", answer: "Arrays store elements in contiguous memory locations with O(1) random access but O(n) insertion/deletion. Linked Lists store elements with pointers, offering O(1) insertion/deletion but O(n) access. Choose arrays for frequent access, linked lists for frequent modifications.", category: "Data Structures" },
  { id: "2", question: "When should I use a Stack vs a Queue?", answer: "Use a Stack (LIFO) when you need to process items in reverse order, like undo operations or function calls. Use a Queue (FIFO) when items should be processed in arrival order, like task scheduling or BFS traversal.", category: "Data Structures" },
  { id: "3", question: "What does O(n log n) mean?", answer: "O(n log n) means the algorithm's time grows proportionally to n multiplied by log(n). It's faster than O(n²) but slower than O(n). Efficient sorting algorithms like Merge Sort and Quick Sort achieve this complexity.", category: "Complexity" },
  { id: "4", question: "Why is Quick Sort often faster than Merge Sort in practice?", answer: "Quick Sort has better cache locality and lower constant factors. It sorts in-place (O(log n) space vs O(n) for Merge Sort). However, Merge Sort is preferred when stability is needed or worst-case O(n log n) is required.", category: "Algorithms" },
  { id: "5", question: "How do I choose between BFS and DFS?", answer: "Use BFS when finding the shortest path or exploring level by level (e.g., shortest path in unweighted graph). Use DFS for exploring all paths, detecting cycles, topological sorting, or when memory is limited.", category: "Algorithms" },
  { id: "6", question: "What is a Hash Table collision and how is it handled?", answer: "A collision occurs when two keys hash to the same index. Common solutions: Chaining (store multiple items in a list at each index) or Open Addressing (probe for the next empty slot). Good hash functions minimize collisions.", category: "Data Structures" },
  { id: "7", question: "Why is Binary Search faster than Linear Search?", answer: "Binary Search eliminates half the remaining elements with each comparison (O(log n)), while Linear Search checks each element (O(n)). For 1 million elements, Binary Search needs ~20 comparisons vs 1 million for Linear Search. However, Binary Search requires a sorted array.", category: "Algorithms" },
  { id: "8", question: "What is the difference between a Tree and a Graph?", answer: "A Tree is a hierarchical structure with a root, no cycles, and exactly one path between nodes. A Graph can have cycles, multiple paths, and no hierarchy. All trees are graphs, but not all graphs are trees.", category: "Data Structures" }
];
