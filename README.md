# 룰루랩 - 병원 예약 시스템 구축

<br/>

## 📌 서비스 개요

병원에 방문하려는 유저가 사전에 병원, 날짜, 시간, 진료 종류 등을 선택하여 예약하는 앱

<br/>

## 📌 개발 기간 및 인원

- 2022.10.15 ~ 2022.10.17(3일)
- 박지은(1명)

<br/>

## 📌 요구사항 분석 및 구현

- 예상 시나리오
  - 유저가 로그인 / 비로그인 상태에서 병원 목록 확인(병원 목록 조회 API)
  - 특정 병원 선택(병원 상세 정보 API)
  - 병원 상세 정보에서 받은 open, close, lunch_time 정보를 참고하여 만들어진 병원별 시간표에서 특정 시간 선택 후 예약(예약 API), 로그인 필요.  
  - 예약 번호 혹은 예약자 이름으로 내역 조회 및 변경(예약 조회, 예약 변경 API)
---
### 예약 가능한 병원 목록

- 현재 예약 가능한 병원 목록을 보여줍니다.
- 병원이 운영 중(hospital 테이블의 컬럼 is_active = 1)인 목록만 조회를 해오며, 여러 병원 목록을 보여주므로 간단한 정보만을 조회해옵니다.(병원의 고유 키, 이름, 주소, open 시간, close 시간, 운영 과 이름)
 
### 병원 상세 및 예약 가능 시간

- 특정 병원을 선택합니다.(hospital의 id 전달)
- 병원 목록에서 보였던 정보에 추가로 상세 정보를 조회해오며(점심 시간, 진료 간격, 주말/공휴일 운영 여부) open, close, lunch_time에 맞춰 프론트엔드에서 1시간별로 Select Box로 예약 가능 시간이 표현됩니다.
- 요일은 월 ~ 금은 필수적 운영, 그 외 토/일/공휴일 운영이 선택적인 것으로 가정했으며 각각의 close 시간을 추가적으로 저장하도록 했습니다.
- 특정 시간대를 선택했을 때, 시작 시간을 백엔드로 넘겨주는 것으로 가정했습니다.(예시- 14:00 ~ 15:00 선택 시 14:00이 전달)
(![image](https://user-images.githubusercontent.com/108418225/196578889-0ab26ccd-bcde-4eff-b29b-488001872556.png))

---
### 예약 등록

- 로그인 후 특정 병원에서 예약 가능한 시간을 선택, 필요 정보들을 입력하여 예약하는 기능입니다.
- 로그인 기능은 토큰을 받는 기능은 구현되지 않아 headers에 대신 id(유저의 고유 키)를 이용하여 구현했습니다.
- 예약자(유저)의 고유 키, 환자 이름, 환자 생년월일, 예약 날짜, 예약 시간, 예약 종류(진료, 검진, … 등) 데이터를 활용하여 진료를 예약합니다.
- 유저가 노쇼(is_active = 0)했던 적이 있는지, users의 해당 컬럼을 확인하는 userCheck 기능과 같은 날짜, 시간에 다른 예약이 있는지 중복 예약을 체크하는 timeCheck 기능이 구현되어 있습니다.
- 운영 시간이 아닌 잘못된 시간이 들어올 경우 적절한 에러처리와, 병원별 진료 간격(diagnosis_interval), 30m / 1h 에 맞춰 예약 가능한 환자 수를 제한했습니다.
- 또한 유저의 예약이 진행될 때, 날짜와 4자리 랜덤 숫자를 합쳐 예약 번호를 생성하는 기능이 구현되어 있습니다. 
- 예약이 성공할 경우, 예약 내역을 응답으로 보여줍니다.
---
### 전체 예약 목록

- 예약 번호 또는 예약자로 예약 목록이 조회됩니다.
- query로 받아온 값이 reservationNumber 또는 reservationName인지에 따라 SQL문의 WHERE 조건문이 변하도록 구현했습니다.

---
## 예약 변경

- 예약 번호를 통해 예약 내용을 변경할 수 있습니다. (환자 이름, 예약 시간, 진료 종류 변경 가능)
- reservations 테이블의 status_id 컬럼 값이 '예약 완료'인 상태에서만 변경이 가능하도록 구현했습니다. (예약 취소 / 검진 완료 / 미방문의 경우 변경 불가)

<br/>

## 📌 DB Modeling

**[🔗 dbdiagram](https://dbdiagram.io/d/634f4e6447094101958f0b88)**
![DB Modeling](<img width="800" alt="image" src="https://user-images.githubusercontent.com/108418225/196574393-4271aaf3-e997-4846-9c50-5f72123d2fea.png">)

<br>

## 📌 API DOCS

**[🔗 API DOCS](https://documenter.getpostman.com/view/22723173/2s847JrBPT)**

<br/>

## 📌 적용 기술

- 사용언어 : TypeScript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- 데이터베이스 : MySQL
- common : Postman


<br>

## Installation

```bash
$ npm install
```
## Make .env
```bash
(로컬에 미리 DB/Schema를 만들어 주세요.)

DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 미리 생성한 데이터베이스 이름
```
## DataBase

```bash
$ dbmate up
```
## Running the app

```bash
$ npm run build
$ npm run start
```
