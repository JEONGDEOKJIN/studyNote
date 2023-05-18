-- 데이터 베이스
-- 단순하게 데이터를 저장하는 공간으로 보면되고.

-- sql 명령어를 사용해서
-- 구현된 기능을 실행시키기 위해 사용하는 특정한 언어이다.
-- 데이터를 보관하거나 저장하거나 삭제 또는 수정을 할수있다.

-- 관계형 데이터 베이스
-- mysql
-- oracle
-- mariaDB

-- 비관계형 데이터 베이스
-- MongoDB

-- CLI로 mysql에 접속 방법
-- mysql -u root -p
-- 비밀번호 입력

-- 스키마 전부 확인
-- show databases;

-- sql문은
-- 데이터 정의어(DDL)
-- 데이터 조작어(DML)
-- 데이터 제어어(DCL)

-- 데이터 정의어
-- CREATE
-- SHOW
-- DROP
-- ALTER

-- 데이터 베이스 만들어 보자
CREATE DATABASE testmysql;

-- 데이터 베이스들 확인하는 명령어
SHOW DATABASES;

-- 데이터 베이스를 삭제 하는 명령어
DROP DATABASE testmysql;

-- 사용할 데이터 베이스 지정
USE testmysql;

-- 데이터 베이스 안에 있는 테이블 확인
SHOW TABLES;

-- 테이블 생성
-- 테이블에 PRIMARY KEY : 고유키는 한개만 들어갈수 있고 중복이 되지 않는 값.
CREATE TABLE store(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);

CREATE TABLE store2(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);

-- 테이블에서 필드명과 타입을 확인할수 있는 명령
DESC store;

-- 데이터 타입
-- 숫자형, 문자형, 날짜형, 이진데이터 타입

-- 숫자형
-- INT : 4byte - 21억~

-- 문자형
-- VARCHAR : 255byte : 가변 데이터(우리가 선언한 범위보다 작으면 자기가 알아서 맞춰준다.)
-- CHAR : 255byte : 고정 데이터(우리가 선언한 범위를 다먹는다.)
-- TEXT : 65535 byte

-- 날짜형
-- DATE : 년 월 일
-- TIME : 시간
-- DATETIME : 년 월 일 시간 (YYYY-MM-DD-HH:MM:SS)
-- TIMESTAMP : 년 월 일 시간(INTERGER) 4byte

-- 이진 데이터 타입
-- BLOB : 이미지

-- KEY
-- PRIMARY KEY : 중복 입력 안됨x 테이블에 하나만 넣을 수 있다. null값도 안됨.(고유키)
-- UNIQUE : 중복 입력 불가인데 키를 여러개 줄수있다. null값도 됨.

CREATE Table user(
    user_id VARCHAR(20) PRIMARY KEY,
    -- not null 빈값이 들어가면 안됨.
    user_pw VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    -- DEFAULT 따로 추가한 값이 없으면 기본 값을 지정해준다.
    gender CHAR(4) DEFAULT "남자",
    -- now() 현재 시간을 만들어주는 함수
    date DATETIME DEFAULT now()
);

DESC user;

-- 데이터 조작어
-- SELECT
-- INSERT
-- UPDATE
-- DELETE


-- 테이블에 값을 추가
INSERT INTO user(user_id, user_pw,user_name,gender)VALUES("userid2","userpw1","soon","남자");

SELECT * FROM `user`;

-- INSERT INTO user(user_id, user_name)VALUES("123","soon");

-- 테이블 열 검색
-- WHERE문으로 테이블을 조회해서 해당 필드가 userid2인 값을 찾아서 조회
SELECT * FROM user WHERE user_id="userid2";
SELECT * FROM user WHERE user_name="soon";

-- 테이블 열 수정
-- SET 해당 값을 수정할때 사용
-- UPDATE문과 짝으로 사용한다.
UPDATE user SET gender="여자" WHERE user_id ="userid2";

UPDATE user SET user_pw="0000", user_name="soon2", gender="남자" WHERE user_id="userid2";

-- 테이블 열 삭제
DELETE FROM user WHERE user_id="userid2";

-- 게시판 테이블 한번 만들기
-- 이름은 border
-- 컬럼은 id, content, writer, date, likes
-- id = INT 11자 자동으로 증가 고유키
-- content TEXT 타입 null이 어도 추가 가능하게
-- writer VARCHAR 40자 null이면 안되게
-- likes int 11자 기본값 0

-- row를 6개 추가하기

SELECT id,likes FROM border WHERE id=1;


-- 한번 정리만 좀 해볼게요

-- mysql -u root -p : CLI환경에서 mysql 접속
-- create databases [데이터 베이스 이름] : 데이터베이스 생성(엑셀 파일 생성 같은 의미)
-- drop database [데이터 베이스 이름] : 데이터 베이스 삭제
-- create table [데이블 이름] ([필드명 데이터 타입],[필드명 데이터 타입]) : table 생성
-- show databases : 모든 데이터베이스 조회
-- show tables : 모든 테이블 조회
-- use [데이터 베이스 이름] : 사용할 데이터 베이스 선택(엑셀파일 열기 같은 느낌)
-- desc [테이블 명] : 테이블의 필드를 한줄로 확인(엑셀과 비교)
-- SELECT 필드1, 필드2 FROM [테이블 명] : 필드 1, 필드 2 에 대한 테이블 전체 조회
-- DELETE FROM [테이블 이름] WHERE [필드]="값" : 테이블에 필드가 == 값인 친구를 삭제
-- SELECT * FROM [테이블 이름] : 테이블 전체 값을 조회
-- INSERT INTO [테이블 이름] (필드 1, 필드 2)VALUES(필드 1의 값, 필드 2의 값) : 테이블에 값 추가 필드 1에 값 1을 넣고 필드 2에 값 2를 넣고.
-- UPDATE [테이블 이름] SET [필드명] = "수정할 값" [필드명2] = "수정할 값 2" WHERE 필드 = "값" : 테이블 명에서 필드명을 새로운 값으로 필드명과 필드명2를 새로운값, 새로운값2 으로 바꾼다.
-- SELECT * FROM [테이블명] WHERE [필드] LIKE "%AB" : 필드에 해당되는 내용중 AB~로 시작하는 데이터 조회
-- SELECT * FROM [테이블명] WHERE [필드] LIKE "AB%" : 필드에 해당되는 내용중 ~AB로 끝나는 데이터 조회
-- ALTER TABLE [기존 테이블명] RENAME [새로운 테이블 이름] : 테이블 이름 바꾸기
-- ALTER TABLE [테이블 이름] CHANGE [기존 컬럼 이름][새로운 컬럼 이름] Type : 컬럼의 이름 바꾸기
-- ALTER TABLE [테이블 이름] MODIFY [컬럼 이름] TYPE : 컬럼의 타입을 변경;
-- DELETE FROM [테이블 이름] WHERE [필드 값] = "값" : 조건에 맞는 모든 값 삭제
-- ALTER TABLE [테이블 이름] DROP [필드 이름] : 해당 필드를 테이블에서 제거한다.
-- ALTER TABLE [테이블 이름] AUTO_INCREMENT = 0, 1 : 해당 테이블의 AUTO_INCREMENT를 초기화 시켜준다.
-- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE : 해당 테이블 맨뒤로 필드를 추가한다.
-- ALTER TABLE [테이블 이름] ADD [필드 이름] TYPE first : 해당 테이블 맨앞에 필드를 추가한다.
-- SELECT * FROM [테이블 이름] ORDER BY [필드 이름] DESC | ASC : ORDER BY 필드명 기준으로 DESC 내림차순, ASC 오름차순으로 정렬

ALTER TABLE user3 MODIFY newcal CHAR(20);
Alter TABLE user3 CHANGE user_pw newcal VARCHAR(20);
ALTER TABLE user2 RENAME user3;
show TABLES;
DESC user3;

SELECT * FROM user3;

DELETE FROM user3 WHERE user_name="soon";

CREATE Table user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

CREATE Table post(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20)
);

show TABLES;
-- post 테이블에 userID 키 추가 타입은 int
ALTER Table post ADD COLUMN userID INT; 
DESC post;

-- ADD CONSTRAINT 제약 조건 명령어(오류가 나면 확인 하기 위해서)(임의로 지정 할수 있다.)
-- FOREIGN KEY : 참조키를 지정 userID
-- REFERENCES 참조키가 참조하는 테이블의 열을 지정
-- 참조할 테이블 지정 user로
ALTER Table post ADD CONSTRAINT fk_user FOREIGN KEY (userID) REFERENCES user (id);

INSERT INTO user (name)VALUES("dd");
INSERT INTO post (title,userID)VALUES("333",3);

-- INNER JOIN 테이블을 조회하는데 참조키를 가지고 관계가 맺어져있는 테이블 조회
SELECT * FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 3;

SELECT user.id, post.title FROM user INNER JOIN post ON user.id = post.userID WHERE user.id = 3;

-- 오늘 잠시 간단하게 만들어 볼것.
-- 게시판 만들었는데 유저가 글을 등록하고
-- 해당 유저가 작성한 글을 볼수있는 페이지