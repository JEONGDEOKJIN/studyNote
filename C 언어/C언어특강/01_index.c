
void main() {
    char msg[50] = "Hello World! Good Luck!";

    int i = 2, number = 0; 

    while ( msg[i] != '!' ) {
        if ( msg[i] == 'a' || msg[i] == 'e' || msg[i] == 'i' || msg[i] == 'o' || msg[i] == 'u') 
            number ++;
        i++;
    }
        // msg[i] != '!' 
            // 느낌표가 나올 때 가지 돌려라 

        // i = 2 부터 시작 
        // msg[2] = l 👉 모음없음 👉 i = 3
        // msg[3] = l 👉 모음없음 👉 i = 4
        // msg[4] = o 👉 모음있음 👉 i = 5

        // ! 까지 모음 = 2개 
        // i 는 10 까지만 실행. 왜냐면, i == 11 까지 올라가고 👉 ! 느낌표니까, 더 실행이 안 되는 것 임

}