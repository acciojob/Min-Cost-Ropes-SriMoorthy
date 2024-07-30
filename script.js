function mincost(arr) {
    const minHeap = new MinHeap();

    // Insert all rope lengths into the min-heap
    arr.forEach(length => minHeap.insert(length));

    let totalCost = 0;

    // Continue connecting ropes until one rope remains
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes
        const first = minHeap.extractMin();
        const second = minHeap.extractMin();

        // Calculate the cost of connecting these two ropes
        const cost = first + second;
        totalCost += cost;

        // Insert the new combined rope back into the min-heap
        minHeap.insert(cost);
    }

    return totalCost;
}

// Examples
//console.log(mincost([4, 3, 2, 6])); // Output: 29
//console.log(mincost([1, 2, 3, 4, 5])); // Output: 33


module.exports=mincost;
