To run, please use `node index.js`


Question:
If you are to develop your own sorting method, how would you implement it? Given a set of integers, how will you sort them from lowest to highest?

Answer:
If I didn't know about sorting algorithms and had to come up with my own, I would have thought about a parallel quick sort. Java is my first programming  language so when asked to do something complex, I always thought about  splitting the task into smaller tasks using threads. 

Basically, in an array of numbers, you find a random number called pivot,  and split the array into two, first are numbers lower than the pivot, the other are numbers larger than the pivot, then do a normal quicksort on the two partitions in parallel. 

It's like a quicksort where you keep on finding a pivot for the partitions until the array is fully sorted.

I wrote some code to test parallel quicksort. It performs well for arrays with size of less than 1000000, but loses to conventional quicksort as the size of the array increases. I think it has to do with JavaScript being single-threaded.  

For comparison, below are results when I compared JavaScript's built in sort,
quick sort, and quick sort in parallel when sorting. I also tried a parallel
quicksort using multiple threads, but it got worse results. I think the overhead
of creating new threads in JavaScript far outweights the advantages of running
the operations in parallel.

###### Array of 100000 numbersArray of 100000 numbers

Built-in sort - 24 ms 
Quicksort - 9ms
Parallel quicksort - 4ms
Parallel quicksort on two threads - 59ms

###### Array of 200000 numbers

Built-in sort - 44 ms 
Quicksort - 11ms
Parallel quicksort - 7ms

###### Array of 1000000 numbers

Built-in sort - 222 ms 
Quicksort - 40ms
Parallel quicksort - 35ms

###### Array of 10000000 numbers

Built-in sort - 2548 ms 
Quicksort - 369ms
Parallel quicksort - 405ms