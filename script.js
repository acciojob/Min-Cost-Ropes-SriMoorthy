class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length &&
                this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty');
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    size() {
        return this.heap.length;
    }
}




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
