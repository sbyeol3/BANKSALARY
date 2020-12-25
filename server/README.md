
## API 명세서 📃

### Payment ⭕️

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

### Category ⭕️

- GET `/api/payment/:type` | 카테고리 조회 (0:지출|1:수입)
  - `200` 성공
  - `400` type이 0 또는 1이 아닌 경우
  - `401` 헤더 토큰 누락

### Log ⭕️

- GET `/api/log?year=:year&month=:month` | 트랜잭션 내역 조회 (조회연도/월 query)
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

### Monthly ⭕️
- GET `/api/monthly?year&month` | 일자별 수입/지출 합계 조회 (조회연도/월 query)
  - `200` 성공
  - `400` year는 기본값 2020, month값이 없거나 valid하지 않은 경우
  - `401` 헤더 토큰 누락

### Statistics ⭕️

- GET `/api/statistics/category?year=:year&month=:month` | 카테고리별 지출내역 조회 (조회연도/월 query)
  - `200` 성공
  - `400` year는 기본값 2020, month값이 없거나 valid하지 않은 경우
  - `401` 헤더 토큰 누락
- GET `/api/statistics/date?year=:year&month=:month` | 일자별 지출내역 조회 (조회연도/월 query)
  - `200` 성공
  - `400` year는 기본값 2020, month값이 없거나 valid하지 않은 경우
  - `401` 헤더 토큰 누락