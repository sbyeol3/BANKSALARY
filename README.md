# Boostcamp Membership 3rd Project
> 스프린트 5-6주차 웹 프로젝트 - 가계부

## Week 1

### Day 01
- 프로젝트 환경구축
- ERD 설계

### 추석 연휴
- passport 기반 로그인, 로그아웃 기능
- DB 연결
- 프론트 index 페이지 구현 (스타일링)

### Day 02
- isAuthenticated 미들웨어 구현
- 라우터 분리
- 테스트 코드 작성
- client 디렉토리 구조

### Day 03
- API 구현 (결제수단/카테고리)
- Log bulk data 생성
- 테이블 수정

### Day 04
- 로그 생성/수정 API 구현
- 서버 자동배포 구현
- 로그인 폼 디자인

### Day 05
- 로그인, nav element 객체로 변경
- 로그인이 되어있지 않으면 로그인 보이게끔 수정
- dotenv 에러 해결

# API 명세서 📃

```
⭕️ : 완료
⛔️ : 작업중
```

## Payment ⭕️

- GET `/api/payment` | 결제수단 조회
  - `200` 성공
  - `401` 헤더 토큰 누락
- POST `/api/payment` | body : { title } | 결제수단 생성
  - `200` 성공
  - `400` title 데이터 누락
  - `401` 헤더 토큰 누락
- DELETE `/api/payment/:paymentId` | 결제수단 삭제
  - `200` 성공
  - `400` paymentId가 잘못된 경우 (300NN이 아님)
  - `401` 헤더 토큰 누락
  - `422` 사용자에게 없는 결제수단인 경우

## Category ⭕️

- GET `/api/payment/:type` | 카테고리 조회 (0:지출|1:수입)
  - `200` 성공
  - `400` type이 0 또는 1이 아닌 경우
  - `401` 헤더 토큰 누락

## Log ⛔️

- GET `/api/log?year=:year&month=:month` | 트랜잭션 내역 조회 (조회연도/월 params)
  - `200` 성공
  - `400` year는 기본값 2020, month값이 없거나 valid하지 않은 경우
  - `401` 헤더 토큰 누락
- POST `/api/log` | 트랜잭션 내역 생성 | body : { kind, price, contents, logDate, payment, ctgCode }
  - `200` 성공
  - `400` body 데이터가 valid 하지 않은 경우
  - `401` 헤더 토큰 누락
  - `422` 내역을 생성할 수 없는 에러가 발생한 경우
- PUT `/api/log/:logId` | 트랜잭션 내역 수정 | body : { kind, price, contents, logDate, payment, ctgCode }
  - `200` 성공
  - `400` body 데이터가 valid 하지 않은 경우
  - `401` 헤더 토큰 누락
  - `422` 내역을 수정할 수 없는 에러가 발생한 경우
- DELETE `/api/log/:logId` | 트랜잭션 내역 삭제
  - `200` 성공
  - `400` logId가 숫자가 아닌 경우
  - `401` 헤더 토큰 누락
  - `422` 삭제하고자 하는 데이터가 존재하지 않거나 사용자의 내역이 아닌 경우