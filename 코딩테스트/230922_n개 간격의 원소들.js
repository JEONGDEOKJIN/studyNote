

function solution(num_list, n) {
    // let arr = [];
    
    // for (let i = 0; i < array.length; i+=n) {
    //     arr.push(num_list[i])
        
    // }

    return num_list.filter( (item, index) => index % n == 0 )


}


console.log(solution(  [4, 2, 6, 1, 7, 6]	, 2	 ))