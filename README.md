# 프로젝트 설명

## 프로젝트의 생성
> 해당 프로젝트는 create-react-app의 redux/toolkit 템플릿으로 생성되었습니다.


``` shell
    npx create-react-app client --template redux-typescript
```


## 뷰페이지
> View에 해당하는 요소는 /view에서 관리합니다.


특정 View에만 필요한 내부 컴포넌트들은 해당 View의 폴더 하위 /components에서 관리됩니다.

1. /src/views/main: 입력 폼 뷰
2. /src/views/progressing: 인증 중 뷰
3. /src/views/complete: 인증 완료 뷰 뷰


## 프로젝트의 상태관리
> 해당 프로젝트의 상태 관리는 redux/toolkit이 사용됩니다.


1. /src/app 스토어 관리
    + store.ts 파일을 통해 상태 관리 비지니스 로직을 reducers에 추가해야 합니다.
2. /src/features 상태 관리 로직
    + 위 폴더에 상태 관리 로직이 관심사에 따라 분리되어 있고, duck 패턴으로 작성되어 있습니다.


## 프로젝트의 API 비동기 통신
> 해당 프로젝트의 상태 관리는 redux/toolkit query가 사용됩니다.


1. /src/app 스토어 관리
    + store.ts 파일을 통해 비동기 통신 비지니스 로직을 reducers에 추가해야 합니다.
2. /src/services 비동기 통신 관리 로직
    + 위 폴더에 비동기 통신 관리 로직이 관심사에 따라 분리되어 있고, duck 패턴으로 작성되어 있습니다.
3. /src/services/uri.ts 
    + 비동기 통신 api 주소가 상수로 분리되어 있습니다.


## 프로젝트의 공용 컴포넌트
> 프로젝트에서 사용되는 공용 컴포넌트들은 /shared 폴더에 작성되어 있습니다.

프로젝트 확장 시, 재사용이 용이한 디자인 요소를 atomical하게 분리하여 공용 컴포넌트로 작성되었습니다.

1. input
2. checkbox
3. modal
4. button


## 사용된 라이브러리
1. react-router-dom
프로젝트 라우팅을 위해 사용됩니다.
``` javascript
yarn add react-router-dom
```
2. moment
날짜 비교를 위해 사용됩니다.
``` javascript
yarn add moment
```
3. node-sass
scss문법을 위해 사용됩니다.
``` javascript
yarn add node-sass
```