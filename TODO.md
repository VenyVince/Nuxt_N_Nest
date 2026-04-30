  # Nuxt_N_Nest 개발 메모(GPT)

  ## 목표
  Nuxt + NestJS로 파일 업로드 후 백엔드에서 비동기 분석하고 결과를 보여주는 앱 만들기.

  ## Day 1 목표
  NestJS 백엔드 파이프라인 구현.

  ## Day 1 완료 기준
  curl로 파일 업로드 → jobId 반환 → Worker 처리 → 결과 조회까지 성공.

  ## 현재 Redis
  - Docker 컨테이너명: 3Nredis
  - 포트: 6379
  - 다시 켜기: docker start 3Nredis

  ## 백엔드 구조
  - be/
  - NestJS 사용
  - Redis + BullMQ 사용
  - 파일 업로드는 multer 사용

  ## Day 1 API
  - POST /upload
  - GET /result/:id

  ## 오늘은 안 하는 것
  - Nuxt 화면
  - DB 설계
  - Prisma/SQLite
  - 로그인
  - 배포