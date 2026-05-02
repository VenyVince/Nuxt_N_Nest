# TODO(GPT)

  ## 프로젝트 목표

  - Nuxt + NestJS로 파일 업로드, 백엔드 비동기 처리, 결과 조회 흐
  름 만들기
  - 백엔드와 프론트엔드는 분리해서 관리
    - `be/`: NestJS 백엔드
    - `fe/`: Nuxt 프론트엔드

  ## 알아야 할 것

  - Redis 실행:
    - `docker start 3Nredis`
  - 사용 중인 패키지:
    - `@nestjs/bullmq`
    - `bullmq`
    - `ioredis`
    - `multer`
    - `@types/multer`

  ---

  ## Day 1 완료

  - NestJS 백엔드 프로젝트를 `be/` 폴더에 생성
  - Redis를 Docker로 준비
    - 컨테이너 이름: `3Nredis`
    - 포트: `6379`
    - 실행 명령: `docker start 3Nredis`
  - 백엔드 작업용 Git 브랜치 생성
    - 로컬 브랜치: `be`
  - `POST /upload` API 구현
    - `FileInterceptor`로 파일 수신
    - `diskStorage`로 `upload/` 폴더에 파일 저장
    - timestamp를 붙여 동일 파일명 덮어쓰기 방지
  - BullMQ Queue 등록
    - queue name: `Queue`
    - job name: `processFile`
  - 업로드된 파일 정보를 BullMQ job으로 등록
    - `originalname`
    - `filename`
    - `path`
    - `mimetype`
    - `size`
  - `FileProcessor` 구현
    - `WorkerHost` 상속
    - `process(job)`에서 job 처리
    - `job.data.path` 파일 접근 확인
    - 처리 결과를 `returnvalue`로 반환
  - `GET /result/:id` API 구현
    - jobId로 job 조회
    - 없는 job은 `not_found`
    - 처리 중이면 `result: null`
    - 완료되면 `job.returnvalue` 반환
  - curl 테스트 완료
    - `POST /upload`로 `jobId` 반환 확인
    - `GET /result/:id`로 완료 결과 조회 확인
    - 존재하지 않는 jobId 조회 시 `not_found` 확인

  ## Day 1 API

  ### POST /upload

  - 파일을 업로드한다.
  - 파일은 로컬 `upload/` 폴더에 저장한다.
  - BullMQ job을 생성한다.
  - 응답으로 `jobId`를 반환한다.

  예상 응답:

  ```json
  {
    "jobId": "5"
  }

  ### GET /result/:id

  - jobId로 처리 상태와 결과를 조회한다.

  완료 응답 예시:

  {
    "jobId": "5",
    "state": "completed",
    "result": {
      "originalname": "test.txt",
      "filename": "1777732215336-test.txt",
      "path": "upload\\1777732215336-test.txt",
      "mimetype": "text/plain",
      "size": 4,
      "processedAt": "2026-05-02T14:30:15.348Z"
    }
  }

  없는 job 응답 예시:

  {
    "jobId": "10",
    "state": "not_found",
    "result": null
  }

  ———

  ## Day 1 완료 기준

  - curl로 파일 업로드가 가능하다.
  - 업로드 응답으로 jobId를 받는다.
  - Worker/Processor가 해당 job을 처리한다.
  - GET /result/:id로 완료된 결과를 조회한다.
  - 없는 jobId를 조회하면 not_found를 반환한다.

  현재 Day 1 완료.

  ———

  ## Day 2 예정

  - fe/ 폴더에 Nuxt 프론트엔드 생성
  - 파일 업로드 페이지 만들기
  - 업로드 후 jobId 받기
  - 처리 중 상태 표시 또는 polling 구현
  - 결과 페이지 만들기
  - 백엔드 결과 저장 방식 개선 검토
      - 현재는 BullMQ job returnvalue 사용
      - 이후 SQLite/Prisma 도입 검토 가능

  ———

  ## Assistant Rules

  - Respond in Korean.
  - Keep responses short and practical.
  - Act as a guide, not as the implementer.
  - Do not run terminal commands unless I explicitly ask you to
    check files or state.
  - Do not create, edit, or delete files.
  - Do not write full code unless I explicitly request it.
  - Help me understand what to do, why to do it, and where to
    look.
  - Prefer official NestJS, Nuxt, and BullMQ documentation when
    explaining.
  - Please call me 석현님.
  - If I ask questions in a numbered order, provide answers
    corresponding to each question.
  - Always read Korean text files with explicit UTF-8 encoding on
    Windows: Get-Content -Raw -Encoding UTF8 -LiteralPath <path>.