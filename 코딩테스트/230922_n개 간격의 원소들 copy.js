

function solution(arr) {
    var answer = [];

    arr.forEach(element => {
        if(element >= 50 || element % 2 == 0) answer.push(element/2);
        if(element < 50 && element % 2 != 0) answer.push(element*2);
        
    });

    return answer;
}

console.log(solution( [1, 2, 3, 100, 99, 98]	 ))