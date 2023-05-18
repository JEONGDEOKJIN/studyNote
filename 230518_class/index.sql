
-- 데이터 베이스 

    -- 기능 
        -- '단순하게 데이터를 저장하는 공간' 으로 보면 됨 
        -- 'sql 명령어' 를 사용해서, 기능을 구현

    -- 'sql 명령어' 
        -- 구현된 기능을 실행시키기 위해, 사용하는, 특정한 언어 
        -- 데이터를 보관, 저장, 삭제, 수정을 할 수 있다. 


    -- 관계형 데이터 베이스 
        -- mysql, oracle, mariaDB, 

    -- 비관계형 데이터 베이스 
        -- mongoDB, 

        -- 관계 VS 비관계 차이점 
            -- 스키마의 차이
            

-- GUI 로 접속 
    -- WORKBENCH 활용


-- 🔷 sql 문 사용해보기 
    -- CLI 로 mysql 접속하는 방법 ⭐⭐⭐ 
        -- 1) mysql -u root -p 
        -- 2) 비밀번호 입력 

    -- 스키마 전부 확인 
        -- show databases;

    -- sql 문은 
        -- 1) 데이터 정의어 (DDL)
            -- CREATE, SHOW, DROP, ALTER, 
            -- 테이블 만들거나(CREATE), 보거나(SHOW), 삭제하거나, 수정하는 것 
        -- 2) 데이터 조작어 (DML)
        -- 3) 데이터 제어어 (DCL)


    -- 데이터 베이스 만들기 
        -- 1) EXTENSION 에서 > MYSQL 검색 > extension 설치 (Weijan Chen / database-client.com 이 사람 적혀있는 걸로)
    
        CREATE DATABASE testmysql;

        -- 데이터 베이스 확인하는 명령어
        SHOW DATABASES; 


        -- 데이터 베이스 삭제 
        DROP DATABASE testmysql;


        -- 사용할 데이터 베이스 지정 
        USE testmysql;

        -- 데이터 베이스 안에 있는 테이블 확인 
        SHOW TABLES

        -- 테이블 생성
        CREATE TABLE store2(
            id INT AUTO_INCREMENT PRIMARY KEY,
            tel VARCHAR(20)
        );

        CREATE TABLE store (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tel VARCHAR(20)
    );

        -- 테이블 PRIMARY KEY
            -- 고유키는 한 개만 들어올 수 있음. 
            -- 중복되지 않는 값 임. 
        

        -- 테이블의 내용을 볼 수 있음. 
        DESC store;
            -- 테이블에서 필드명과 타입 확인 가능 


        -- 필드에 있는 타입
            -- 숫자형, 문자형, 날짜형, 이진 데이터 타입 등이 있음.
            -- 숫자형은 INT 를 사용 
            -- INT : 4byte - 21억 까지 범위가 있음. 
            -- 문자형
                -- VARCHAR 
                    -- 255BYTE 까지 가능, 가변 데이터 (선언한 범위보다 작으면, 자기가 알아서 맞춰준다.)
                    -- 255byte 가 안 되게 적으면 > 적은 걸로 맞춰줌.   
                -- CHAR
                    -- 255 BYTE , 고정 데이터 
                    -- 1byte 를 써도, 255byte 를 다 먹는다.
                    -- 고정된 데이터에서 '인덱스 계산⭐' 을 할 때 쓸 수 있음. -- 정확히 뭔지 모르겠네 😥😥😥😥😥  
                    -- 다만, 앵간하면, VARCHAR
                -- text 
                    -- 65535 바이트
            -- 날짜형
                -- DATE : 년 월 일 
                -- TIME : 시간
                -- DATETIME : 년 월 일 시간 (YYYY-MM-DD-HH:MM:SS)
                -- TIMESTAMP : 년 월 일 시간 (INTEGER로 표현됨) 4BYTE

            -- 이진 타입
                -- 사용은 안 할 것 임 ✅✅ 
                -- BLOB : 이미지 

            -- KEY
                -- PRIMARY KEY 
                    -- 중복 입력 안 됨. 
                    -- 테이블에 하나만 넣을 수 있음. 
                    -- NULL 값 도 안 됨. 
                    -- 고유키!! 

            -- UNIQUE
                -- 고유키 말고, 중복이 안 되는 값을 '여러개' 주려면? 
                -- 중복 입력 불가 인데, 키를 여러개' 줄 수 있음. 
                -- null 값도 됨


        CREATE Table user2 (
            user_id VARCHAR(20) PRIMARY KEY,
            user_pw VARCHAR(20) NOT NULL,
                -- 빈값이 들어가면 안 됨 = not null 
            user_name VARCHAR(20) NOT NULL,

            user_gender CHAR(4) DEFAULT "남자",
                -- default : 따로 추가한 값이 없으면, 기본값인 "남자" 로 지정 
            
            date DATETIME DEFAULT now()
                -- default : 따로 추가한 값이 없으면, 기본값인 "현재시간" 로 지정 
        );


        DESC user2;



        -- 데이터 조작어
            -- SELECT(조회), INSERT INTO(추가), UPDATE(수정), DELETE(삭제)

        -- 테이블에 값을 추가
            INSERT INTO user2( user_id, user_pw, user_name, user_gender ) VALUES("userid1" , "userpw1" , "dj" , "male");
            INSERT INTO user2( user_id, user_pw, user_name, user_gender ) VALUES("userid2" , "userpw1" , "djjjjj" , "male");

            SELECT * FROM `user2`;
            -- SELECT * FROM 'user2';


            INSERT INTO user2(user_pw, user_name) VALUES("123" , "soon");
                -- id 는 null 값이 들어갈 수 없는데, value 를 안 넣어서, 안 된 것 임 ⭐⭐⭐
                -- not null 은 빈값이면 안 됨
                -- yes 면 기본값이 들어감? ❓❓❓ 


        -- 테이블 열 검색 
            -- WHERE 문으로 테이블을 조회해서, 해당 필드가, userid1 인 값을 찾아서 조회
            SELECT * FROM user2 WHERE user_id = "userid1";
            SELECT * FROM user2 WHERE user_id = "userid2";
            SELECT * FROM user2 WHERE user_gender = "male";
            SELECT * FROM user2 WHERE user_name = "dj";
                -- 필드명 user_name 이 dj 인걸 다 찾아온다
        

        -- 테이블 열 수정
            UPDATE user SET gender = "여자" WHERE user_id = "userid1";
                -- update set 은 붙어다님
                -- SET : 현재 값을 수정할 때, UPDATE 문과 짝으로 붙어다님

            UPDATE user SET user_pw = "0000" , user_name = "dj-22" , gender = "남자" WHERE user_id = "userid2";



        -- 테이블 열 삭제
            DELETE FROM user WHERE user_id = "userid2";


-- 🔷 게시판 테이블 한번 만들기
    -- 테이블 이름 : border

    -- 컬럼
        -- 컬럼은 id , content, writer, date, likes
        -- in : INT 11 자리, 자동으로 증가, 고유키
        -- content : text 타입, null 이어도 추가 가능하게(이게 뭐였지❓❓❓❓❓)
        -- writer : VARCHAR , 40자, NULL 이 되면 안 되게, 
        -- date : 
        -- likes : int 11자 , 기본값 0 

    -- row
        -- 6개 추가 하기 



    -- 테이블 생성
        CREATE TABLE border2 (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            content TEXT(20), 
            writer VARCHAR(40) NOT NULL, 
            date DATETIME DEFAULT now(),
            likes INT(11) DEFAULT (0) 
        );

    -- 만들어진 테이블 보기
        SELECT * FROM `border2`;

    -- row 만들기 
        -- id 없이 row 생성 | AUTO_INCREMENT 테스트
        INSERT INTO border2 (content, writer, likes) VALUES("첫번째 글", "haha", 100);

        -- likes | default 값 넣는 것 테스트 | 컬럼에 아무것도 안 넣고, 비어두면, 디폴트 값으로 되네 
        INSERT INTO border2 (content, writer) VALUES("두번째 글", "haha");
        -- content 비워두기 테스트 
        INSERT INTO border2 (writer) VALUES("haha");
        -- null 하면, error 가 나는지 테스트 ⭐⭐⭐⭐⭐⭐
        INSERT INTO border2 (content) VALUES("writer not null 설정했고, writer 안 썼음. 어떻게 되려나");
            -- Field 'writer' doesn't have a default value 이런 오류가 남 ⭐⭐⭐
            -- null 이 있어도 괜찮은거면, 'not null을 안 써주면' 된다. ⭐⭐⭐ 



-- 🔷 쿼리문 정리 | 교수님 이랑 같이 해보기 

    -- cli 환경에서 접속
        -- mysql -u root -p

    -- 데이터 베이스 만들기
        -- CREATE databases [데이터베이스] : 데이터 베이스 생성  
            -- 엑셀 '파일' 생성한 느낌 
    
    -- 데이터 베이스 삭제
        -- drop databases

    -- table(테이블) 생성
        -- create table [테이블 이름] ([필드명 데이터 타입])

    -- 모든 데이터 베이스 조회
        -- show databases 

    -- 모든 테이블 조회
        -- show tables 

    -- 사용할 데이터 베이스 선택
        -- 엑셀 '파일 열기⭐' 와 같은 이름
        -- use [database 이름]

    -- 테이블의 필드를 한줄로 확인
        -- 엑셀에 있는 테이블 필드를 한줄로 보는 것 
        -- desc [테이블 명]

    -- 필드1, 필드 2 에 대한 테이블 조회
        -- 모든 필드는 * 이렇게 표시
        -- SELECT 필드1, 필드2 FROM [테이블명]
        SELECT id, likes FROM border2;
            -- id 와 likes 의 필드만 보이게 
        SELECT id, likes FROM border2 WHERE id = 1;
            -- id 와 like 필드만 보이게
            -- 그러면서, id == 1 인 것 만 보이게 ⭐⭐⭐ 


    -- 테이블에 필드가 == 값인 친구를 삭제 
        -- DELETE FROM [테이블 이름] WHERE [필드] = "값"


    -- 테이블 전체 조회
        -- 테이블 전체 값을 조회!
        -- SELECT * FROM [테이블 이름]


    -- 테이블에 값 추가
        -- INSERT INTO [테이블 이름] (필드1, 필드2) VALUES (필드1의 값, 필드 2의 값), 
        -- INSERT INTO [테이블 이름] (필드1, 필드2) VALUES (필드1의 값, 필드 2의 값),(필드1의 값, 필드 2의 값),(필드1의 값, 필드 2의 값),(필드1의 값, 필드 2의 값) 
            -- 이렇게 하면, INSERT 문을 3개 쓰는게 아니라, 콤마 찍고 여러개가 추가 됨 ⭐⭐⭐⭐⭐⭐⭐⭐ 
            -- INSERT INTO border2 (content, writer, likes) VALUES ("첫번째 글", "haha", 100), ("두번째 글", "haha", 100), ("세번째 글", "haha", 100) ;


    -- 추가한 값 수정하기
        -- UPDATE [테이블 이름] SET [필드명] = "수정할 값" [필드명2] = "수정할 값" WHERE 필드 = "값"
            -- UPDATE 와 SET 는 세트로 다님 
            -- 테이블명에서 필드명을 새로운 값으로, 필드명과 필드명2를 새로운값, 새로운값2 로 바꾼다. 

    -- LIKE 문 | 특정 구분 시작 OR 특정 구문으로 종료
        -- SELECT * FROM [테이블명] WHERE [필드명] LIKE "%AB"
            -- % 붙이면, 여기가 시작, 이라는 의미 
            -- 필드에 해당되는 내용 중, 'AB 로 시작하는' 데이터를 조회

        -- SELECT * FROM [테이블명] WHERE [필드명] LIKE "AB%"
            -- 필드에 해당되는 내용중, 'AB 로 끝나는' 데이터를 조회 


    -- 테이블 이름을 변경하기 
        -- ALTER TABLE [기존 테이블명] RENAME [새로운 테이블 이름]
        ALTER TABLE user RENAME user22;
        show TABLES;


    -- 테이블 컬럼 바꾸기
        -- ALTER TABLE [테이블 이름] CHANGE [기존 컬럼 이름] [새로운 컬럼 이름] Type 
        DESC user22;
        ALTER TABLE user22 CHANGE user_pw newcal2 VARCHAR(20);

    -- '컬럼의 타입'을 변경
        -- ALTER TABLE [테이블 이름] MODIFY [컬럼 이름] TYPE 
        ALTER TABLE user22 newcal CHAR(20);
            -- 문자형에서 문자형으로 바꾸거나 
            -- 이미 데이터가 들어가 있으면, 오류가 뜬다. 

    -- 조건에 맞는 모든 값 삭제 
        -- DELETE FROM [테이블 이름] WHERE [필드 값] = "값"
        SELECT * FROM user2;
        DELETE FROM user2 WHERE user_name = "dj";
            -- 열 값이 dj 인 row 를 제거 


    -- 해당 필드를 테이블에서 제거
        -- ALTER TABLE [테이블명] DROP [필드 이름]


    -- 
        -- ALTER TABLE [테이블 이름] AUTO_INCREMENT = 0, 1 (어떤 걸로 초기화를 해도 상관없음. | AUTO_INCREMENT 를 그냥 초기화 시켜주기만 하면 됨)

    -- 해당 테이블 '맨 뒤' 로 필드를 추가 함. 
        -- '맨 뒤' = 맨 오른쪽 끝  
        -- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE
        
    -- 해당 테이블 '맨 앞' 에 필드를 추가.
        -- FIRTST 만 붙이면 됨.
        -- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE FIRST.



    -- 오름차순, 내림차순
        -- SELECT * FROM [테이블 이름] ORDER BY [필드이름] DESC | ASC : ORDER BY 필드명 기준으로 DESC 내림차순, ASC 오름차순으로 정렬



    CREATE TABLE user3(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20)
    );

    CREATE TABLE post (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR (20)
    );

    show TABLES;

    -- post 테이블에 userID 키 추가, 타입은 INT
    ALTER Table post ADD COLUMN userID INT;
    DESC post;


    -- constraint 제약 조건 명령어
        -- SQL foreign key 키 추가 
        -- 오류가 났을 때, 이렇게 알려줌. 어디서 오류가 났는지 확인 할 수 있게  
        -- 제약조건 명령어
        -- 임의로 지정할 수 있다. 
        -- FOREIGN KEY : 참조키를 지정 user ID
        -- 참조할 테이블 지정 user 로
        -- REFERENCSE 참조키가 참조하는 테이블 열을 지정 

        -- post 테이블에서 userID 가 같은 애들을 불러올 수 있음 ⭐⭐⭐ 
        ALTER Table post ADD CONSTRAINT fk_user1 FOREIGN KEY (userID) REFERENCES user3 (id);
            -- 이렇게 관계를 맺으면 연결? 



    INSERT INTO user3 (name) VALUES("dd");
    SELECT * FROM user3;


    INSERT INTO post (title , userID) VALUES("123" , 1);
    SELECT * FROM user3;
        -- title, userID 열이 추가적으로 더 있어야 하는데 


    -- 1번 유저가 작성한 글 보기
    SELECT * FROM user3 INNER JOIN post ON user.id = post.userID WHERE user.id = 1;
        -- 1번 유저가 작성한 모든 글을 볼 수 있음. 
        -- 참조형으로 관계 된것 까지 함 ⭐⭐⭐⭐⭐⭐⭐ 
        -- 참조키로 관계가 맺어져 있는 테이블을 조회


    SELECT user.id, post.title  FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 1;
        -- 1 : 다, 1:1 이렇게 관계를 맺게 됨.
        -- 시퀄라이징 모듈


-- 🔷 오늘 만들 것
    -- '게시판 만들었는데, 유저가 글을 등록하고, 해당 유저가 작성한 글을 볼 수 있는 페이지' 를 추가






