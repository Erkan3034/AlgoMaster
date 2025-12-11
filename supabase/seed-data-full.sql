-- =============================================
-- ALGO MASTER - FULL SEED DATA
-- =============================================
-- This file contains ALL data from schema.ts

-- =============================================
-- DATA STRUCTURES (14 items)
-- =============================================

INSERT INTO data_structures (name, slug, description, icon, complexity, definition, use_cases, pros, cons, visual_explanation, code_example, experiment_scenario) VALUES
(
  'Array',
  'array',
  'A collection of elements stored at contiguous memory locations',
  'LayoutGrid',
  '{"access": "O(1)", "search": "O(n)", "insert": "O(n)", "delete": "O(n)"}',
  'An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index, making arrays extremely efficient for random access operations.',
  ARRAY['Storing lists of items', 'Matrix operations', 'Lookup tables', 'Buffer implementations', 'Image processing'],
  ARRAY['Fast random access O(1)', 'Cache-friendly due to memory locality', 'Simple to implement and use', 'Fixed size means predictable memory usage'],
  ARRAY['Fixed size (in most languages)', 'Insertion/deletion is expensive O(n)', 'Memory waste if not fully utilized', 'Cannot store different data types'],
  E'Index:    [0]   [1]   [2]   [3]   [4]\n         +-----+-----+-----+-----+-----+\nValues:  | 10  | 20  | 30  | 40  | 50  |\n         +-----+-----+-----+-----+-----+\nMemory:  0x100 0x104 0x108 0x10C 0x110\n\nEach element occupies 4 bytes (for integers).\nAccess arr[2]: Direct calculation → 0x100 + (2 × 4) = 0x108 → Value: 30',
  E'// Creating and using arrays in JavaScript\nconst numbers = [10, 20, 30, 40, 50];\n\n// Access element (O(1))\nconsole.log(numbers[2]); // 30\n\n// Search for element (O(n))\nconst index = numbers.indexOf(30); // 2\n\n// Insert at end (O(1) amortized)\nnumbers.push(60);\n\n// Insert at beginning (O(n))\nnumbers.unshift(5);\n\n// Delete from middle (O(n))\nnumbers.splice(2, 1);',
  'Try inserting elements at different positions and observe how the time complexity changes based on the position.'
),
(
  'Linked List',
  'linked-list',
  'A linear data structure where elements are linked using pointers',
  'Link',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(1)", "delete": "O(1)"}',
  'A linked list is a linear data structure where each element (node) contains a data field and a reference (link) to the next node in the sequence. Unlike arrays, linked list elements are not stored at contiguous memory locations.',
  ARRAY['Dynamic memory allocation', 'Implementation of stacks and queues', 'Undo functionality in applications', 'Music playlist navigation', 'Browser history'],
  ARRAY['Dynamic size', 'Efficient insertions/deletions O(1)', 'No memory waste', 'Easy to implement stacks and queues'],
  ARRAY['No random access', 'Extra memory for pointers', 'Not cache-friendly', 'Reverse traversal difficult (singly linked)'],
  E'Singly Linked List:\n+------+------+    +------+------+    +------+------+\n| Data | Next |--->| Data | Next |--->| Data | Next |---> NULL\n|  10  |  *   |    |  20  |  *   |    |  30  |  *   |\n+------+------+    +------+------+    +------+------+\n   Head                                   Tail',
  E'// Node class for Linked List\nclass Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n    this.size = 0;\n  }\n\n  append(data) {\n    const newNode = new Node(data);\n    if (!this.head) {\n      this.head = newNode;\n    } else {\n      let current = this.head;\n      while (current.next) {\n        current = current.next;\n      }\n      current.next = newNode;\n    }\n    this.size++;\n  }\n}',
  'Compare insertion time at the beginning vs end of the list to understand the difference in complexity.'
),
(
  'Stack',
  'stack',
  'A LIFO (Last In, First Out) data structure',
  'Layers',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(1)", "delete": "O(1)"}',
  'A stack is an abstract data type that follows the Last-In-First-Out (LIFO) principle. The last element added to the stack is the first one to be removed. Think of it like a stack of plates.',
  ARRAY['Function call management (call stack)', 'Undo/Redo operations', 'Expression evaluation', 'Backtracking algorithms', 'Browser back button'],
  ARRAY['Simple implementation', 'Fast push/pop operations O(1)', 'Memory efficient', 'Natural for recursion'],
  ARRAY['No random access', 'Limited functionality', 'Can overflow if not managed', 'Only top element accessible'],
  E'Push 10:     Push 20:     Push 30:     Pop:\n+-----+      +-----+      +-----+      +-----+\n|     |      |     |      | 30  | <-- |     |\n+-----+      +-----+      +-----+     +-----+\n|     |      | 20  |      | 20  |      | 20  |\n+-----+      +-----+      +-----+     +-----+\n| 10  |      | 10  |      | 10  |      | 10  |\n+-----+      +-----+      +-----+     +-----+\n TOP↑         TOP↑         TOP↑        TOP↑',
  E'class Stack {\n  constructor() {\n    this.items = [];\n  }\n\n  push(element) {\n    this.items.push(element);\n  }\n\n  pop() {\n    if (this.isEmpty()) return "Stack is empty";\n    return this.items.pop();\n  }\n\n  peek() {\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}',
  'Implement a function to check balanced parentheses using a stack.'
),
(
  'Queue',
  'queue',
  'A FIFO (First In, First Out) data structure',
  'ArrowRightLeft',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(1)", "delete": "O(1)"}',
  'A queue is an abstract data type that follows the First-In-First-Out (FIFO) principle. The first element added is the first one to be removed. Think of it like a line of people waiting.',
  ARRAY['Task scheduling', 'Print job management', 'Breadth-first search', 'Message queues', 'Handling requests in servers'],
  ARRAY['Maintains order of insertion', 'Fair processing (FIFO)', 'Fast enqueue/dequeue O(1)', 'Simple to implement'],
  ARRAY['No random access', 'Fixed capacity (array-based)', 'Memory overhead (linked list)', 'Only front/rear accessible'],
  E'Enqueue 10:   Enqueue 20:   Enqueue 30:   Dequeue:\n+-----+-----+ +-----+-----+ +-----+-----+ +-----+-----+\n| 10  |     | | 10  | 20  | | 10  | 20  | | 20  | 30  |\n+-----+-----+ +-----+-----+ +-----+-----+ +-----+-----+\n  ↑             ↑             ↑     ↑       ↑     ↑\nFront         Front         Front Rear    Front Rear',
  E'class Queue {\n  constructor() {\n    this.items = [];\n  }\n\n  enqueue(element) {\n    this.items.push(element);\n  }\n\n  dequeue() {\n    if (this.isEmpty()) return "Queue is empty";\n    return this.items.shift();\n  }\n\n  front() {\n    return this.items[0];\n  }\n\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}',
  'Simulate a print queue where jobs are processed in order of arrival.'
),
(
  'Hash Table',
  'hash-table',
  'A data structure that maps keys to values using a hash function',
  'Hash',
  '{"access": "O(1)", "search": "O(1)", "insert": "O(1)", "delete": "O(1)"}',
  'A hash table (hash map) is a data structure that implements an associative array, mapping keys to values. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found.',
  ARRAY['Database indexing', 'Caching', 'Symbol tables in compilers', 'Implementing sets', 'Counting frequencies'],
  ARRAY['Average O(1) for all operations', 'Flexible keys', 'Efficient lookups', 'Great for large datasets'],
  ARRAY['Worst case O(n) with collisions', 'No ordering', 'Memory overhead', 'Hash function quality matters'],
  E'Hash Function: h(key) = key % tableSize\n\nKey: "apple"  → hash("apple") = 3\nKey: "banana" → hash("banana") = 7\nKey: "cherry" → hash("cherry") = 3  (Collision!)\n\nChaining to handle collision',
  E'class HashTable {\n  constructor(size = 53) {\n    this.keyMap = new Array(size);\n  }\n\n  _hash(key) {\n    let total = 0;\n    const PRIME = 31;\n    for (let i = 0; i < Math.min(key.length, 100); i++) {\n      const char = key[i];\n      const value = char.charCodeAt(0) - 96;\n      total = (total * PRIME + value) % this.keyMap.length;\n    }\n    return total;\n  }\n\n  set(key, value) {\n    const index = this._hash(key);\n    if (!this.keyMap[index]) {\n      this.keyMap[index] = [];\n    }\n    this.keyMap[index].push([key, value]);\n  }\n\n  get(key) {\n    const index = this._hash(key);\n    if (this.keyMap[index]) {\n      for (let pair of this.keyMap[index]) {\n        if (pair[0] === key) return pair[1];\n      }\n    }\n    return undefined;\n  }\n}',
  'Try inserting keys that cause collisions and observe how the hash table handles them.'
),
(
  'Tree',
  'tree',
  'A hierarchical data structure with nodes connected by edges',
  'GitBranch',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(n)", "delete": "O(n)"}',
  'A tree is a hierarchical data structure consisting of nodes connected by edges. It has a root node and zero or more child nodes. Each child can have its own children, forming a tree-like structure.',
  ARRAY['File system organization', 'HTML DOM', 'Organization charts', 'Decision trees', 'Game AI (minimax)'],
  ARRAY['Reflects hierarchical relationships', 'Efficient searching (if balanced)', 'Flexible structure', 'Natural for recursive operations'],
  ARRAY['Complex implementation', 'Can become unbalanced', 'Pointer overhead', 'Harder to iterate linearly'],
  E'         [Root]\n           A\n          /|\\\n         / | \\\n        B  C  D\n       / \\    |\n      E   F   G\n\nTerminology:\n- Root: A (top node)\n- Parent of E,F: B\n- Children of B: E, F\n- Siblings: B, C, D\n- Leaf nodes: C, F, G',
  E'class TreeNode {\n  constructor(value) {\n    this.value = value;\n    this.children = [];\n  }\n\n  addChild(value) {\n    const child = new TreeNode(value);\n    this.children.push(child);\n    return child;\n  }\n}\n\nclass Tree {\n  constructor(rootValue) {\n    this.root = new TreeNode(rootValue);\n  }\n\n  traverseDFS(node = this.root, result = []) {\n    result.push(node.value);\n    for (const child of node.children) {\n      this.traverseDFS(child, result);\n    }\n    return result;\n  }\n}',
  'Build a file system tree and implement operations like finding a file or counting total files.'
),
(
  'Binary Search Tree',
  'binary-search-tree',
  'A tree where each node has at most two children with ordered values',
  'Binary',
  '{"access": "O(log n)", "search": "O(log n)", "insert": "O(log n)", "delete": "O(log n)"}',
  'A Binary Search Tree (BST) is a binary tree where for each node: all values in the left subtree are less than the node''s value, and all values in the right subtree are greater. This property enables efficient searching.',
  ARRAY['Database indexing', 'Auto-complete features', 'Priority queues', 'Expression parsing', 'Sorted data storage'],
  ARRAY['Efficient search O(log n)', 'Maintains sorted order', 'In-order traversal gives sorted sequence', 'Efficient range queries'],
  ARRAY['Can degrade to O(n) if unbalanced', 'More complex than arrays', 'Balancing is tricky', 'Extra memory for pointers'],
  E'Binary Search Tree Property:\nLeft < Node < Right\n\n        8\n       / \\\n      3   10\n     / \\    \\\n    1   6    14\n       / \\   /\n      4   7 13\n\nIn-order traversal: 1, 3, 4, 6, 7, 8, 10, 13, 14 (sorted!)',
  E'class BSTNode {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BST {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value) {\n    const newNode = new BSTNode(value);\n    if (!this.root) {\n      this.root = newNode;\n      return this;\n    }\n    let current = this.root;\n    while (true) {\n      if (value < current.value) {\n        if (!current.left) {\n          current.left = newNode;\n          return this;\n        }\n        current = current.left;\n      } else {\n        if (!current.right) {\n          current.right = newNode;\n          return this;\n        }\n        current = current.right;\n      }\n    }\n  }\n\n  search(value) {\n    let current = this.root;\n    while (current) {\n      if (value === current.value) return true;\n      current = value < current.value ? current.left : current.right;\n    }\n    return false;\n  }\n}',
  'Insert numbers in different orders and observe how the tree shape changes and affects search performance.'
),
(
  'Heap',
  'heap',
  'A specialized tree-based structure satisfying the heap property',
  'Triangle',
  '{"access": "O(1)", "search": "O(n)", "insert": "O(log n)", "delete": "O(log n)"}',
  'A heap is a complete binary tree that satisfies the heap property. In a max-heap, each parent is greater than or equal to its children. In a min-heap, each parent is less than or equal to its children.',
  ARRAY['Priority queues', 'Heap sort algorithm', 'Graph algorithms (Dijkstra, Prim)', 'Finding kth largest/smallest', 'Median maintenance'],
  ARRAY['O(1) access to max/min', 'Efficient insert/delete O(log n)', 'Always complete tree', 'Efficient for priority operations'],
  ARRAY['O(n) for arbitrary search', 'Not suitable for searching', 'Array resizing overhead', 'Only max/min directly accessible'],
  E'Max Heap (parent >= children):\n           100\n          /    \\\n        19      36\n       /  \\    /  \\\n      17   3  25   1\n\nArray representation: [100, 19, 36, 17, 3, 25, 1]\n\nFor node at index i:\n- Parent: (i - 1) / 2\n- Left child: 2i + 1\n- Right child: 2i + 2',
  E'class MinHeap {\n  constructor() {\n    this.values = [];\n  }\n\n  insert(val) {\n    this.values.push(val);\n    this.bubbleUp();\n  }\n\n  bubbleUp() {\n    let idx = this.values.length - 1;\n    const element = this.values[idx];\n    while (idx > 0) {\n      const parentIdx = Math.floor((idx - 1) / 2);\n      const parent = this.values[parentIdx];\n      if (element >= parent) break;\n      this.values[parentIdx] = element;\n      this.values[idx] = parent;\n      idx = parentIdx;\n    }\n  }\n\n  extractMin() {\n    const min = this.values[0];\n    const end = this.values.pop();\n    if (this.values.length > 0) {\n      this.values[0] = end;\n      this.sinkDown();\n    }\n    return min;\n  }\n}',
  'Build a priority queue using a heap and process tasks based on their priority levels.'
),
(
  'Graph',
  'graph',
  'A collection of nodes (vertices) connected by edges',
  'Share2',
  '{"access": "O(1)", "search": "O(V+E)", "insert": "O(1)", "delete": "O(E)"}',
  'A graph is a non-linear data structure consisting of vertices (nodes) and edges connecting them. Graphs can be directed or undirected, weighted or unweighted, and are used to represent relationships between objects.',
  ARRAY['Social networks', 'Maps and navigation', 'Network topology', 'Dependency resolution', 'Recommendation systems'],
  ARRAY['Models complex relationships', 'Flexible structure', 'Powerful algorithms available', 'Natural for many real problems'],
  ARRAY['Can be memory-intensive', 'Complex to implement', 'Some operations are expensive', 'Difficult to visualize large graphs'],
  E'Undirected Graph:        Directed Graph:\n    A --- B                  A --> B\n    |     |                  |     |\n    |     |                  v     v\n    C --- D                  C --> D\n\nAdjacency List:\nA: [B, C]\nB: [A, D]\nC: [A, D]\nD: [B, C]',
  E'class Graph {\n  constructor() {\n    this.adjacencyList = {};\n  }\n\n  addVertex(vertex) {\n    if (!this.adjacencyList[vertex]) {\n      this.adjacencyList[vertex] = [];\n    }\n  }\n\n  addEdge(v1, v2) {\n    this.adjacencyList[v1].push(v2);\n    this.adjacencyList[v2].push(v1);\n  }\n\n  bfs(start) {\n    const result = [];\n    const visited = {};\n    const queue = [start];\n    visited[start] = true;\n\n    while (queue.length) {\n      const vertex = queue.shift();\n      result.push(vertex);\n\n      for (const neighbor of this.adjacencyList[vertex]) {\n        if (!visited[neighbor]) {\n          visited[neighbor] = true;\n          queue.push(neighbor);\n        }\n      }\n    }\n    return result;\n  }\n}',
  'Create a social network graph and find the shortest path between two users.'
),
(
  'Trie',
  'trie',
  'A tree-like data structure for efficient string retrieval',
  'FileText',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(n)", "delete": "O(n)"}',
  'A Trie (pronounced ''try'') is a tree-like data structure used to store strings. Each node represents a character, and paths from root to nodes represent prefixes. It''s extremely efficient for prefix-based operations like autocomplete.',
  ARRAY['Autocomplete suggestions', 'Spell checkers', 'IP routing tables', 'Dictionary implementations', 'Phone directories'],
  ARRAY['Fast prefix search O(m) where m is key length', 'No hash collisions', 'Alphabetical ordering', 'Efficient for many keys with common prefixes'],
  ARRAY['High memory usage', 'Slower than hash tables for exact matches', 'Complex implementation', 'Sparse tries waste memory'],
  E'Trie storing: "car", "cat", "card", "care", "dog"\n\n           (root)\n           /    \\\n          c      d\n         /        \\\n        a          o\n       /            \\\n      r*             g*\n     / \\\n    d*  e*\n    \n    * = end of word\n\nSearch "car": root → c → a → r ✓ (found)',
  E'class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEndOfWord = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n\n  insert(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children[char]) {\n        node.children[char] = new TrieNode();\n      }\n      node = node.children[char];\n    }\n    node.isEndOfWord = true;\n  }\n\n  search(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children[char]) return false;\n      node = node.children[char];\n    }\n    return node.isEndOfWord;\n  }\n\n  startsWith(prefix) {\n    let node = this.root;\n    for (const char of prefix) {\n      if (!node.children[char]) return false;\n      node = node.children[char];\n    }\n    return true;\n  }\n}',
  'Build an autocomplete system using a Trie and test with common search prefixes.'
),
(
  'AVL Tree',
  'avl-tree',
  'A self-balancing binary search tree',
  'Scale',
  '{"access": "O(log n)", "search": "O(log n)", "insert": "O(log n)", "delete": "O(log n)"}',
  'An AVL Tree is a self-balancing Binary Search Tree where the heights of left and right subtrees differ by at most 1 for every node. This balance guarantee ensures O(log n) operations even in worst case.',
  ARRAY['Database indexing', 'File system organization', 'Memory management', 'Expression parsing', 'Priority scheduling'],
  ARRAY['Guaranteed O(log n) operations', 'Always balanced', 'Faster lookups than Red-Black trees', 'Predictable performance'],
  ARRAY['More rotations than Red-Black trees', 'Complex implementation', 'Extra storage for height', 'Slower insertions than Red-Black trees'],
  E'Balance Factor = Height(Left) - Height(Right)\nValid BF: -1, 0, 1\n\nFour rotation types:\n1. Left-Left (LL) → Right Rotation\n2. Right-Right (RR) → Left Rotation\n3. Left-Right (LR) → Left then Right\n4. Right-Left (RL) → Right then Left',
  E'class AVLNode {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n    this.height = 1;\n  }\n}\n\nclass AVLTree {\n  getHeight(node) {\n    return node ? node.height : 0;\n  }\n\n  getBalance(node) {\n    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;\n  }\n\n  rightRotate(y) {\n    const x = y.left;\n    const T2 = x.right;\n    x.right = y;\n    y.left = T2;\n    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;\n    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;\n    return x;\n  }\n\n  leftRotate(x) {\n    const y = x.right;\n    const T2 = y.left;\n    y.left = x;\n    x.right = T2;\n    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;\n    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;\n    return y;\n  }\n}',
  'Insert numbers in sorted order and observe how rotations keep the tree balanced compared to a regular BST.'
),
(
  'Priority Queue',
  'priority-queue',
  'A queue where elements are served based on priority',
  'ListOrdered',
  '{"access": "O(1)", "search": "O(n)", "insert": "O(log n)", "delete": "O(log n)"}',
  'A Priority Queue is an abstract data type where each element has a priority. Elements with higher priority are served before elements with lower priority. It''s typically implemented using a heap.',
  ARRAY['Task scheduling', 'Dijkstra''s algorithm', 'Huffman coding', 'Event-driven simulation', 'Operating system job scheduling'],
  ARRAY['O(1) access to highest priority', 'O(log n) insert and extract', 'Flexible priority definitions', 'Efficient for priority-based processing'],
  ARRAY['O(n) for arbitrary search', 'More complex than simple queue', 'Memory overhead', 'Priority updates can be expensive'],
  E'Min Priority Queue (lower value = higher priority):\n\nInsert tasks with priorities:\nTask A (priority 3)\nTask B (priority 1)  ← Highest priority (served first)\nTask C (priority 2)\n\nExtract order: B(1) → C(2) → A(3)',
  E'class PriorityQueue {\n  constructor() {\n    this.values = [];\n  }\n\n  enqueue(value, priority) {\n    this.values.push({ value, priority });\n    this.bubbleUp();\n  }\n\n  bubbleUp() {\n    let idx = this.values.length - 1;\n    const element = this.values[idx];\n    while (idx > 0) {\n      const parentIdx = Math.floor((idx - 1) / 2);\n      const parent = this.values[parentIdx];\n      if (element.priority >= parent.priority) break;\n      this.values[parentIdx] = element;\n      this.values[idx] = parent;\n      idx = parentIdx;\n    }\n  }\n\n  dequeue() {\n    const min = this.values[0];\n    const end = this.values.pop();\n    if (this.values.length > 0) {\n      this.values[0] = end;\n      this.sinkDown();\n    }\n    return min;\n  }\n}',
  'Simulate a hospital ER where patients are treated based on severity of condition.'
),
(
  'Deque',
  'deque',
  'Double-ended queue allowing insertion and deletion at both ends',
  'ArrowLeftRight',
  '{"access": "O(n)", "search": "O(n)", "insert": "O(1)", "delete": "O(1)"}',
  'A Deque (Double-Ended Queue, pronounced ''deck'') is a linear data structure that allows insertion and deletion at both the front and rear ends. It combines the functionality of both stacks and queues.',
  ARRAY['Browser history (back/forward)', 'Undo/redo with limits', 'Sliding window algorithms', 'Palindrome checking', 'Work stealing in parallel processing'],
  ARRAY['O(1) operations at both ends', 'Versatile (acts as stack or queue)', 'Efficient for sliding window', 'Simple implementation'],
  ARRAY['O(n) for middle access', 'More complex than stack/queue', 'Array-based may need resizing', 'Less intuitive than simpler structures'],
  E'Deque operations:\n\nInitial:     [10, 20, 30]\n              ↑        ↑\n           Front     Rear\n\naddFront(5): [5, 10, 20, 30]\naddRear(40): [5, 10, 20, 30, 40]\nremoveFront(): [10, 20, 30, 40]  returns 5\nremoveRear():  [10, 20, 30]      returns 40',
  E'class Deque {\n  constructor() {\n    this.items = [];\n  }\n\n  addFront(element) {\n    this.items.unshift(element);\n  }\n\n  addRear(element) {\n    this.items.push(element);\n  }\n\n  removeFront() {\n    return this.items.shift();\n  }\n\n  removeRear() {\n    return this.items.pop();\n  }\n\n  peekFront() {\n    return this.items[0];\n  }\n\n  peekRear() {\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty() {\n    return this.items.length === 0;\n  }\n}',
  'Implement a browser history that allows going back and forward with a limit on history size.'
),
(
  'Set & Map',
  'set-map',
  'Collections for unique values and key-value pairs',
  'Map',
  '{"access": "O(1)", "search": "O(1)", "insert": "O(1)", "delete": "O(1)"}',
  'Set is a collection of unique values with no duplicates. Map is a collection of key-value pairs where each key is unique. Both provide O(1) average time for basic operations using hash tables internally.',
  ARRAY['Removing duplicates', 'Counting frequencies', 'Caching', 'Membership testing', 'Object relationships'],
  ARRAY['O(1) average operations', 'Built-in uniqueness', 'Flexible key types (Map)', 'Maintains insertion order (ES6)'],
  ARRAY['Memory overhead', 'No indexing', 'Hash collisions possible', 'Objects as keys require Map'],
  E'SET - Unique Values Only:\nadd(1) → {1}\nadd(2) → {1, 2}\nadd(1) → {1, 2}  (ignored)\n\nMAP - Key-Value Pairs:\nset("name", "Alice") → {"name" → "Alice"}\nset("age", 25) → {"name" → "Alice", "age" → 25}\nget("name") → "Alice"',
  E'// SET\nconst mySet = new Set();\nmySet.add(1);\nmySet.add(5);\nmySet.add(5); // Ignored\nconsole.log(mySet.has(5)); // true\n\n// Remove duplicates from array\nconst arr = [1, 2, 2, 3, 3, 3, 4];\nconst unique = [...new Set(arr)]; // [1, 2, 3, 4]\n\n// MAP\nconst myMap = new Map();\nmyMap.set("name", "Alice");\nmyMap.set("age", 25);\nconsole.log(myMap.get("name")); // "Alice"\n\n// Two Sum using Map - O(n)\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return null;\n}',
  'Use a Set to find all unique words in a text and a Map to count their frequencies.'
);

-- =============================================
-- ALGORITHMS (14 items)
-- =============================================

INSERT INTO algorithms (name, slug, description, icon, category, time_complexity, space_complexity, definition, steps, visual_diagram, input_output_examples, code_implementation) VALUES
(
  'Bubble Sort',
  'bubble-sort',
  'A simple sorting algorithm that repeatedly swaps adjacent elements',
  'ArrowUpDown',
  'sorting',
  '{"best": "O(n)", "average": "O(n²)", "worst": "O(n²)"}',
  'O(1)',
  'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  ARRAY['Start at the beginning of the array', 'Compare adjacent elements (arr[i] and arr[i+1])', 'If arr[i] > arr[i+1], swap them', 'Move to the next pair', 'After each pass, the largest unsorted element bubbles up', 'Repeat until no swaps are needed'],
  E'Initial: [64, 34, 25, 12, 22]\n\nPass 1:\n[64, 34, 25, 12, 22] → Compare 64, 34 → Swap\n[34, 64, 25, 12, 22] → Compare 64, 25 → Swap\n[34, 25, 64, 12, 22] → Compare 64, 12 → Swap\n[34, 25, 12, 64, 22] → Compare 64, 22 → Swap\n[34, 25, 12, 22, 64] → 64 is now in place!\n\nContinue until sorted...\nFinal: [12, 22, 25, 34, 64]',
  '[{"input": "[64, 34, 25, 12, 22]", "output": "[12, 22, 25, 34, 64]"}]',
  E'function bubbleSort(arr) {\n  const n = arr.length;\n  let swapped;\n  \n  for (let i = 0; i < n - 1; i++) {\n    swapped = false;\n    \n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n        swapped = true;\n      }\n    }\n    \n    if (!swapped) break;\n  }\n  \n  return arr;\n}'
),
(
  'Selection Sort',
  'selection-sort',
  'Finds the minimum element and places it at the beginning',
  'MousePointer',
  'sorting',
  '{"best": "O(n²)", "average": "O(n²)", "worst": "O(n²)"}',
  'O(1)',
  'Selection Sort divides the input into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and moves it to the end of the sorted region.',
  ARRAY['Find the minimum element in the unsorted portion', 'Swap it with the first element of the unsorted portion', 'Move the boundary between sorted and unsorted one element to the right', 'Repeat until the entire array is sorted'],
  E'Initial: [64, 25, 12, 22, 11]\n\nPass 1: Find min (11), swap with first\n[11, 25, 12, 22, 64]\n\nPass 2: Find min (12), swap\n[11, 12, 25, 22, 64]\n\nPass 3: Find min (22), swap\n[11, 12, 22, 25, 64]\n\nFinal: [11, 12, 22, 25, 64] ✓',
  '[{"input": "[64, 25, 12, 22, 11]", "output": "[11, 12, 22, 25, 64]"}]',
  E'function selectionSort(arr) {\n  const n = arr.length;\n  \n  for (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    \n    for (let j = i + 1; j < n; j++) {\n      if (arr[j] < arr[minIdx]) {\n        minIdx = j;\n      }\n    }\n    \n    if (minIdx !== i) {\n      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n    }\n  }\n  \n  return arr;\n}'
),
(
  'Insertion Sort',
  'insertion-sort',
  'Builds the sorted array one element at a time',
  'ArrowDownToLine',
  'sorting',
  '{"best": "O(n)", "average": "O(n²)", "worst": "O(n²)"}',
  'O(1)',
  'Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position among the previously sorted elements, like sorting playing cards in your hand.',
  ARRAY['Start with the second element (first element is sorted)', 'Compare the current element with the sorted portion', 'Shift all larger elements one position to the right', 'Insert the current element in its correct position', 'Move to the next element and repeat'],
  E'Initial: [12, 11, 13, 5, 6]\n\nStep 1: key = 11\n[12, 11, 13, 5, 6] → 11 < 12, shift\n[11, 12, 13, 5, 6] → Insert 11\n\nStep 3: key = 5\n[11, 12, 13, 5, 6] → 5 < all, shift all\n[5, 11, 12, 13, 6] → Insert 5\n\nFinal: [5, 6, 11, 12, 13] ✓',
  '[{"input": "[12, 11, 13, 5, 6]", "output": "[5, 6, 11, 12, 13]"}]',
  E'function insertionSort(arr) {\n  const n = arr.length;\n  \n  for (let i = 1; i < n; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    \n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    \n    arr[j + 1] = key;\n  }\n  \n  return arr;\n}'
),
(
  'Merge Sort',
  'merge-sort',
  'A divide-and-conquer algorithm that splits and merges arrays',
  'GitMerge',
  'sorting',
  '{"best": "O(n log n)", "average": "O(n log n)", "worst": "O(n log n)"}',
  'O(n)',
  'Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It divides the array into halves, recursively sorts them, and then merges the sorted halves. It guarantees O(n log n) time complexity.',
  ARRAY['Divide the array into two halves', 'Recursively sort each half', 'Merge the two sorted halves', 'During merging, compare elements from both halves', 'Place the smaller element first', 'Continue until all elements are merged'],
  E'                [38, 27, 43, 3, 9, 82, 10]\n                       /           \\\n            [38, 27, 43, 3]    [9, 82, 10]\n               /       \\          /      \\\n        [38, 27]    [43, 3]   [9, 82]   [10]\n          /  \\       /  \\      /  \\       |\n       [38] [27]  [43] [3]  [9] [82]    [10]\n          \\  /       \\  /      \\  /       |\n        [27, 38]   [3, 43]   [9, 82]   [10]\n              \\     /            \\      /\n          [3, 27, 38, 43]     [9, 10, 82]\n                    \\            /\n            [3, 9, 10, 27, 38, 43, 82]',
  '[{"input": "[38, 27, 43, 3, 9, 82, 10]", "output": "[3, 9, 10, 27, 38, 43, 82]"}]',
  E'function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  \n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  \n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) {\n      result.push(left[i]);\n      i++;\n    } else {\n      result.push(right[j]);\n      j++;\n    }\n  }\n  \n  return result.concat(left.slice(i)).concat(right.slice(j));\n}'
),
(
  'Quick Sort',
  'quick-sort',
  'An efficient divide-and-conquer algorithm using pivot partitioning',
  'Zap',
  'sorting',
  '{"best": "O(n log n)", "average": "O(n log n)", "worst": "O(n²)"}',
  'O(log n)',
  'Quick Sort is an efficient, in-place sorting algorithm that uses divide-and-conquer. It selects a ''pivot'' element and partitions the array so elements smaller than the pivot are on the left, and larger ones are on the right.',
  ARRAY['Choose a pivot element (often the last element)', 'Partition: reorder array so elements < pivot come before, > pivot come after', 'The pivot is now in its final sorted position', 'Recursively apply to the sub-arrays on left and right of pivot', 'Base case: arrays of size 0 or 1 are already sorted'],
  E'Initial: [10, 80, 30, 90, 40, 50, 70]\n                           Pivot: 70\n\nPartition around 70:\nAfter partition:\n[10, 30, 40, 50, 70, 90, 80]\n      < 70    ↑   > 70\n           pivot in place!\n\nRecurse on left [10, 30, 40, 50]\nRecurse on right [90, 80]\n\nFinal: [10, 30, 40, 50, 70, 80, 90] ✓',
  '[{"input": "[10, 80, 30, 90, 40, 50, 70]", "output": "[10, 30, 40, 50, 70, 80, 90]"}]',
  E'function quickSort(arr, low = 0, high = arr.length - 1) {\n  if (low < high) {\n    const pivotIndex = partition(arr, low, high);\n    quickSort(arr, low, pivotIndex - 1);\n    quickSort(arr, pivotIndex + 1, high);\n  }\n  return arr;\n}\n\nfunction partition(arr, low, high) {\n  const pivot = arr[high];\n  let i = low - 1;\n  \n  for (let j = low; j < high; j++) {\n    if (arr[j] < pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  \n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}'
),
(
  'Binary Search',
  'binary-search',
  'An efficient search algorithm for sorted arrays',
  'Search',
  'searching',
  '{"best": "O(1)", "average": "O(log n)", "worst": "O(log n)"}',
  'O(1)',
  'Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.',
  ARRAY['Start with the entire sorted array', 'Find the middle element', 'If target equals middle, we are done!', 'If target < middle, search the left half', 'If target > middle, search the right half', 'Repeat until found or search space is empty'],
  E'Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nTarget: 23\n\nStep 1:\n L              M                   H\nMiddle = 16, 23 > 16 → Search right\n\nStep 2:\n                  L       M         H\nMiddle = 56, 23 < 56 → Search left\n\nStep 3:\n                  L   M   H\nMiddle = 23, 23 == 23 → Found!\n\nResult: Index 5 ✓',
  '[{"input": "arr = [2, 5, 8, 12, 16, 23, 38], target = 23", "output": "5 (index)"}]',
  E'function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (arr[mid] === target) {\n      return mid;\n    }\n    \n    if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  \n  return -1;\n}'
),
(
  'Breadth-First Search',
  'bfs',
  'Explores graph level by level from a starting node',
  'Layers',
  'graph',
  '{"best": "O(V+E)", "average": "O(V+E)", "worst": "O(V+E)"}',
  'O(V)',
  'Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth before moving to vertices at the next depth level. It uses a queue data structure.',
  ARRAY['Start at the source vertex, mark it visited, add to queue', 'Dequeue a vertex and process it', 'Enqueue all unvisited neighbors', 'Mark neighbors as visited', 'Repeat until queue is empty'],
  E'Graph:\n    A --- B\n    |     |\n    C --- D --- E\n\nBFS from A:\n\nQueue: [A]           Visited: {A}\nProcess A → Neighbors: B, C\nQueue: [B, C]        Visited: {A, B, C}\n\nProcess B → Neighbors: D\nQueue: [C, D]        Visited: {A, B, C, D}\n\nProcess C → D already visited\nQueue: [D]\n\nProcess D → Neighbor: E\nQueue: [E]           Visited: {A, B, C, D, E}\n\nOrder: A → B → C → D → E',
  '[{"input": "Graph: A-B, A-C, B-D, C-D, D-E, Start: A", "output": "A, B, C, D, E"}]',
  E'function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  const result = [];\n  \n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const vertex = queue.shift();\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  \n  return result;\n}'
),
(
  'Depth-First Search',
  'dfs',
  'Explores as far as possible along each branch before backtracking',
  'ArrowDownRight',
  'graph',
  '{"best": "O(V+E)", "average": "O(V+E)", "worst": "O(V+E)"}',
  'O(V)',
  'Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to keep track of vertices to visit.',
  ARRAY['Start at the source vertex, mark it visited', 'Explore an unvisited neighbor', 'Recursively visit that neighbor unvisited neighbors', 'When no unvisited neighbors remain, backtrack', 'Repeat until all reachable vertices are visited'],
  E'Graph:\n    A --- B\n    |     |\n    C --- D --- E\n\nDFS from A:\n\nVisit A → Explore neighbor B\n  Visit B → Explore neighbor D\n    Visit D → Explore neighbor C\n      Visit C → Backtrack\n    Backtrack to D → Explore E\n      Visit E → Backtrack\nDone\n\nOrder: A → B → D → C → E',
  '[{"input": "Graph: A-B, A-C, B-D, C-D, D-E, Start: A", "output": "A, B, D, C, E"}]',
  E'function dfsRecursive(graph, start, visited = new Set()) {\n  const result = [];\n  \n  function traverse(vertex) {\n    if (visited.has(vertex)) return;\n    \n    visited.add(vertex);\n    result.push(vertex);\n    \n    for (const neighbor of graph[vertex] || []) {\n      traverse(neighbor);\n    }\n  }\n  \n  traverse(start);\n  return result;\n}'
),
(
  'Linear Search',
  'linear-search',
  'A simple search algorithm that checks every element sequentially',
  'Search',
  'searching',
  '{"best": "O(1)", "average": "O(n)", "worst": "O(n)"}',
  'O(1)',
  'Linear Search is the simplest searching algorithm that sequentially checks each element in a collection until the target is found or the collection is exhausted. It works on both sorted and unsorted data.',
  ARRAY['Start from the first element of the array', 'Compare the current element with the target value', 'If they match, return the current index', 'If not, move to the next element', 'Repeat until the element is found or the array ends', 'Return -1 if the element is not found'],
  E'Search for 7 in [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 7]\n\nStep 1: [3] 3 != 7, continue\nStep 2: [1] 1 != 7, continue\n...\nStep 11: [7] 7 = 7, Found at index 10!',
  '[{"input": "arr = [3, 1, 4, 1, 5], target = 4", "output": "2 (index of 4)"}]',
  E'function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}'
),
(
  'Heap Sort',
  'heap-sort',
  'An efficient sorting algorithm using a binary heap data structure',
  'Triangle',
  'sorting',
  '{"best": "O(n log n)", "average": "O(n log n)", "worst": "O(n log n)"}',
  'O(1)',
  'Heap Sort is a comparison-based sorting algorithm that uses a binary heap. It first builds a max-heap from the array, then repeatedly extracts the maximum element and rebuilds the heap until sorted.',
  ARRAY['Build a max-heap from the input array', 'Swap the root (largest element) with the last element', 'Reduce the heap size by one', 'Heapify the root to maintain the max-heap property', 'Repeat steps 2-4 until the heap size is 1', 'The array is now sorted in ascending order'],
  E'Initial Array: [4, 10, 3, 5, 1]\n\nStep 1: Build Max Heap\n        10\n       /  \\\n      5    3\n     / \\\n    4   1\nArray: [10, 5, 3, 4, 1]\n\nStep 2: Extract max (10), swap with last\nSorted: [10]\n\nContinue until fully sorted...\nFinal: [1, 3, 4, 5, 10]',
  '[{"input": "[4, 10, 3, 5, 1]", "output": "[1, 3, 4, 5, 10]"}]',
  E'function heapSort(arr) {\n  const n = arr.length;\n\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n    heapify(arr, n, i);\n  }\n\n  for (let i = n - 1; i > 0; i--) {\n    [arr[0], arr[i]] = [arr[i], arr[0]];\n    heapify(arr, i, 0);\n  }\n  return arr;\n}\n\nfunction heapify(arr, n, i) {\n  let largest = i;\n  const left = 2 * i + 1;\n  const right = 2 * i + 2;\n\n  if (left < n && arr[left] > arr[largest]) largest = left;\n  if (right < n && arr[right] > arr[largest]) largest = right;\n\n  if (largest !== i) {\n    [arr[i], arr[largest]] = [arr[largest], arr[i]];\n    heapify(arr, n, largest);\n  }\n}'
),
(
  'Counting Sort',
  'counting-sort',
  'A non-comparison sorting algorithm for integers in a known range',
  'Hash',
  'sorting',
  '{"best": "O(n)", "average": "O(n)", "worst": "O(n)"}',
  'O(n)',
  'Counting Sort is a non-comparison integer sorting algorithm. It works by counting the occurrences of each unique element and using arithmetic to determine positions. It''s efficient when the range of input values (k) is not significantly larger than the number of elements (n).',
  ARRAY['Find the maximum value in the input array', 'Create a count array of size (max + 1) initialized to 0', 'Count occurrences of each element in the input', 'Modify count array to store cumulative counts', 'Build the output array by placing elements at their correct positions', 'Copy the output array back to the original array'],
  E'Input: [4, 2, 2, 8, 3, 3, 1]\n\nStep 1: Find max = 8\n\nStep 2: Create count array (size 9)\n\nStep 3: Count occurrences\nIndex:  0  1  2  3  4  5  6  7  8\nCount: [0, 1, 2, 2, 1, 0, 0, 0, 1]\n\nStep 5: Build output\nOutput: [1, 2, 2, 3, 3, 4, 8]',
  '[{"input": "[4, 2, 2, 8, 3, 3, 1]", "output": "[1, 2, 2, 3, 3, 4, 8]"}]',
  E'function countingSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const max = Math.max(...arr);\n  const count = new Array(max + 1).fill(0);\n\n  for (const num of arr) {\n    count[num]++;\n  }\n\n  const result = [];\n  for (let i = 0; i < count.length; i++) {\n    while (count[i] > 0) {\n      result.push(i);\n      count[i]--;\n    }\n  }\n\n  return result;\n}'
),
(
  'Dijkstra''s Algorithm',
  'dijkstra',
  'Finds the shortest path between nodes in a weighted graph',
  'Route',
  'graph',
  '{"best": "O(V+E)", "average": "O(V+E)", "worst": "O(V+E)"}',
  'O(V)',
  'Dijkstra''s Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights. It uses a greedy approach, always selecting the unvisited vertex with the smallest known distance.',
  ARRAY['Initialize distances: source = 0, all others = infinity', 'Mark all vertices as unvisited', 'Select the unvisited vertex with the smallest distance', 'Update distances to all unvisited neighbors through this vertex', 'Mark the current vertex as visited', 'Repeat steps 3-5 until all vertices are visited'],
  E'Weighted Graph:\n    A --4-- B\n    |     / |\n    2   1   3\n    | /     |\n    C --5-- D\n\nFind shortest paths from A:\n\nStep 1: distances = {A: 0, B: inf, C: inf, D: inf}\nStep 2: Visit A -> distances = {A: 0, B: 4, C: 2, D: inf}\nStep 3: Visit C -> B via C = 2+1 = 3 (better!)\n        distances = {A: 0, B: 3, C: 2, D: 7}\n\nResult: A->A:0, A->B:3, A->C:2, A->D:6',
  '[{"input": "Graph A-B(4), A-C(2), B-C(1), B-D(3), C-D(5), start=A", "output": "A:0, B:3, C:2, D:6"}]',
  E'function dijkstra(graph, start) {\n  const distances = {};\n  const visited = new Set();\n\n  for (const vertex in graph) {\n    distances[vertex] = Infinity;\n  }\n  distances[start] = 0;\n\n  while (true) {\n    let minDist = Infinity;\n    let current = null;\n    for (const v in distances) {\n      if (!visited.has(v) && distances[v] < minDist) {\n        minDist = distances[v];\n        current = v;\n      }\n    }\n    if (current === null) break;\n\n    visited.add(current);\n\n    for (const [neighbor, weight] of graph[current]) {\n      const newDist = distances[current] + weight;\n      if (newDist < distances[neighbor]) {\n        distances[neighbor] = newDist;\n      }\n    }\n  }\n\n  return distances;\n}'
),
(
  'Jump Search',
  'jump-search',
  'A search algorithm for sorted arrays using block jumps',
  'SkipForward',
  'searching',
  '{"best": "O(1)", "average": "O(√n)", "worst": "O(√n)"}',
  'O(1)',
  'Jump Search works on sorted arrays by jumping ahead by fixed steps (typically sqrt(n)) and then performing a linear search in the block where the target might exist. It''s faster than Linear Search and simpler than Binary Search.',
  ARRAY['Determine the optimal jump size (typically sqrt(n))', 'Jump through the array in blocks of this size', 'Stop when the current block contains a value >= target', 'Perform linear search in the previous block', 'Return the index if found, -1 otherwise'],
  E'Array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]\nTarget: 11\nJump size = sqrt(16) = 4\n\nStep 1: Jump to index 0  -> value 0  < 11, jump\nStep 2: Jump to index 4  -> value 4  < 11, jump\nStep 3: Jump to index 8  -> value 8  < 11, jump\nStep 4: Jump to index 12 -> value 12 >= 11, stop!\n\nStep 5: Linear search from index 8 to 11\n        arr[11]=11 Found!\n\nResult: Element 11 found at index 11',
  '[{"input": "arr = [0-15], target = 11", "output": "11"}]',
  E'function jumpSearch(arr, target) {\n  const n = arr.length;\n  const jump = Math.floor(Math.sqrt(n));\n\n  let prev = 0;\n  let curr = jump;\n\n  while (curr < n && arr[curr] < target) {\n    prev = curr;\n    curr += jump;\n    if (prev >= n) return -1;\n  }\n\n  while (prev < Math.min(curr, n)) {\n    if (arr[prev] === target) {\n      return prev;\n    }\n    prev++;\n  }\n\n  return -1;\n}'
);

-- =============================================
-- GLOSSARY TERMS (15 items)
-- =============================================

INSERT INTO glossary_terms (term, definition, related_terms, category) VALUES
('Algorithm', 'A step-by-step procedure or formula for solving a problem or accomplishing a task.', ARRAY['Time Complexity', 'Space Complexity'], 'Fundamentals'),
('Time Complexity', 'A measure of the amount of time an algorithm takes to run as a function of the input size.', ARRAY['Big O Notation', 'Space Complexity'], 'Complexity'),
('Space Complexity', 'A measure of the amount of memory an algorithm uses as a function of the input size.', ARRAY['Time Complexity', 'Big O Notation'], 'Complexity'),
('Big O Notation', 'A mathematical notation describing the upper bound of an algorithm''s growth rate.', ARRAY['Time Complexity', 'Space Complexity'], 'Complexity'),
('Recursion', 'A technique where a function calls itself to solve smaller instances of the same problem.', ARRAY['Stack', 'Base Case'], 'Fundamentals'),
('Iteration', 'The repetition of a process using loops (for, while) to solve a problem.', ARRAY['Loop', 'Recursion'], 'Fundamentals'),
('Divide and Conquer', 'A strategy of breaking a problem into smaller subproblems, solving them, and combining results.', ARRAY['Merge Sort', 'Quick Sort'], 'Strategies'),
('Pointer', 'A variable that stores the memory address of another variable or data structure.', ARRAY['Linked List', 'Reference'], 'Fundamentals'),
('Node', 'A basic unit of a data structure that contains data and links to other nodes.', ARRAY['Linked List', 'Tree', 'Graph'], 'Data Structures'),
('Edge', 'A connection between two nodes in a graph or tree data structure.', ARRAY['Vertex', 'Graph'], 'Data Structures'),
('Vertex', 'A node in a graph data structure, also known as a point.', ARRAY['Edge', 'Graph'], 'Data Structures'),
('Traversal', 'The process of visiting all nodes in a data structure in a specific order.', ARRAY['BFS', 'DFS', 'In-order'], 'Operations'),
('Hash Function', 'A function that maps data of arbitrary size to fixed-size values.', ARRAY['Hash Table', 'Collision'], 'Data Structures'),
('Collision', 'When two different keys hash to the same index in a hash table.', ARRAY['Hash Table', 'Chaining'], 'Data Structures'),
('Balanced Tree', 'A tree where the height of left and right subtrees differs by at most one for all nodes.', ARRAY['AVL Tree', 'Red-Black Tree'], 'Data Structures');

-- =============================================
-- FAQ ITEMS (8 items)
-- =============================================

INSERT INTO faq_items (question, answer, category) VALUES
('What is the difference between an Array and a Linked List?', 'Arrays store elements in contiguous memory locations with O(1) random access but O(n) insertion/deletion. Linked Lists store elements with pointers, offering O(1) insertion/deletion but O(n) access. Choose arrays for frequent access, linked lists for frequent modifications.', 'Data Structures'),
('When should I use a Stack vs a Queue?', 'Use a Stack (LIFO) when you need to process items in reverse order, like undo operations or function calls. Use a Queue (FIFO) when items should be processed in arrival order, like task scheduling or BFS traversal.', 'Data Structures'),
('What does O(n log n) mean?', 'O(n log n) means the algorithm''s time grows proportionally to n multiplied by log(n). It''s faster than O(n²) but slower than O(n). Efficient sorting algorithms like Merge Sort and Quick Sort achieve this complexity.', 'Complexity'),
('Why is Quick Sort often faster than Merge Sort in practice?', 'Quick Sort has better cache locality and lower constant factors. It sorts in-place (O(log n) space vs O(n) for Merge Sort). However, Merge Sort is preferred when stability is needed or worst-case O(n log n) is required.', 'Algorithms'),
('How do I choose between BFS and DFS?', 'Use BFS when finding the shortest path or exploring level by level (e.g., shortest path in unweighted graph). Use DFS for exploring all paths, detecting cycles, topological sorting, or when memory is limited.', 'Algorithms'),
('What is a Hash Table collision and how is it handled?', 'A collision occurs when two keys hash to the same index. Common solutions: Chaining (store multiple items in a list at each index) or Open Addressing (probe for the next empty slot). Good hash functions minimize collisions.', 'Data Structures'),
('Why is Binary Search faster than Linear Search?', 'Binary Search eliminates half the remaining elements with each comparison (O(log n)), while Linear Search checks each element (O(n)). For 1 million elements, Binary Search needs ~20 comparisons vs 1 million for Linear Search. However, Binary Search requires a sorted array.', 'Algorithms'),
('What is the difference between a Tree and a Graph?', 'A Tree is a hierarchical structure with a root, no cycles, and exactly one path between nodes. A Graph can have cycles, multiple paths, and no hierarchy. All trees are graphs, but not all graphs are trees.', 'Data Structures');

