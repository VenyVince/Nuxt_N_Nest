# TODO(GPT)

  ## 프로젝트 목표
  - Nuxt + NestJS로 파일 업로드, 백엔드 비동기 처리, 결과 표시 앱 만들기
  - 백엔드와 프론트엔드는 분리해서 관리
    - `be/`: NestJS 백엔드
    - `fe/`: Nuxt 프론트엔드, 나중에 생성

  ## 알아둬야할 점
  - docker start 3Nredis
  - codex 참고용으로 사용 중(읽기 권한만 존재)
    - 시작시 아래 말부터 붙여쓸 것.
    - todo.md 읽고 써진 방식대로 조언. 특히 Assistant Rules 반드시 참고해.
  - 사용 중인 패키지 : `@nestjs/bullmq`, `bullmq`, `ioredis`, `multer`, `@types/multer`

----

  ## 현재까지 한 일(Day 1)
  - NestJS 백엔드 프로젝트를 `be/` 폴더에 생성
  - Redis는 Docker로 준비됨
    - 컨테이너 이름: `3Nredis`
    - 포트: `6379`
    - 다시 켜기: `docker start 3Nredis`
  - 백엔드 작업용 Git 브랜치 생성
    - 로컬 브랜치: `be`
    - `be`로 upstream 설정 완료
  - `be/src`에서 백엔드 코드 작성 시작
  - Redis 연결 설정
  - Multer 패키지 다운완료
  - `POST /upload` API 만들기
    - service코드 리뷰


  ## 오늘 남은 할 일

   - `POST /upload` API 만들기
    - controller코드 리뷰
  - 업로드된 파일을 BullMQ job으로 등록하기
  - Worker 만들어서 job 처리하기
  - 처리 결과를 임시 저장하기
  - `GET /result/:id` API 만들기
  - `curl`로 업로드부터 결과 조회까지 테스트하기

----

  ## Day 1 목표
  오늘은 Nuxt를 하지 않고, NestJS 백엔드 파이프라인만 만든다.

  목표 흐름:

  ```txt
  파일 업로드
  → BullMQ job 생성
  → Worker가 job 처리
  → 결과 저장
  → jobId로 결과 조회

  ## Day 1 API

  - POST /upload
      - 파일을 받는다.
      - BullMQ job을 등록한다.
      - jobId를 반환한다.
  - GET /result/:id
      - 해당 job id의 처리 결과를 반환한다.

  ## 사용할 패키지

  - @nestjs/bullmq
  - bullmq
  - ioredis
  - multer
  - @types/multer는 개발 의존성으로 설치

  ## Redis 메모

  - Redis는 Docker에서 실행한다.
  - 현재 컨테이너:
      - 이름: 3Nredis
      - 포트: 6379
  - 매번 새로 만들지 않고 기존 컨테이너를 사용한다.
  - 실행 명령:
  docker start 3Nredis 
```
  ## Day 1 완료 기준

  - curl로 파일 업로드가 가능.
  - 업로드 응답으로 jobId를 받음.
  - Worker가 해당 job을 처리.
  - GET /result/:id로 완료된 결과를 조회.

  ## Day 2 할 일

  - fe/ 폴더에 Nuxt 프론트엔드 생성
  - 파일 업로드 페이지 만들기
  - 처리 중 상태 표시 또는 polling 구현
  - 결과 페이지 만들기
  - 백엔드 흐름이 완성된 뒤 SQLite/Prisma 도입 검토



  ## Assistant Rules
  - Respond in Korean.
  - Keep responses short and practical.
  - Act as a guide, not as the implementer.
  - Do not run terminal commands.
  - Do not create, edit, or delete files.
  - Do not write full code unless I explicitly request it.
  - Help me understand what to do, why to do it, and where to look.
  - Prefer official NestJS, Nuxt, and BullMQ documentation when explaining.
  - Please call me '석현님'.
  - If I ask questions in a numbered order (like 1. something, 2. something, 3. something), please provide answers corresponding to each question along with them.
