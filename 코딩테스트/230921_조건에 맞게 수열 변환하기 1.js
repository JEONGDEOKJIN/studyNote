

function solution(arr) {
    
    arr.map((item) => {
        if(item > 50 && item % 2 == 0) item = item / 2 
        if(item < 50 && item % 2 == 1) item = item * 2  
    })
}


console.log(solution(  [1, 2, 3, 100, 99, 98]	 ))