# Allstar

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@allstar/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

## Next.js + Nest.js + Axios + React + TypeScript　+ firebase Monorepo環境構築

1. npx create-nx-workspace
2. yarn add @nrwl/nest @nrwl/react -D
3. nx g @nrwl/nest:app api <!-- :appはアプリケーションを作るという意味。apiはディレクトリの名前を決める -->
4. nx serve api
5. yarn add axios
6. sudo yarn add firebase react-firebase-hooks react-firebaseui
7. yarn add g firebase-tools
8. yarn add firebase-functions
9. firebase login
10. firebase init functions
11. firebase deploy --only functions <!-- /functions/src/index.tsに書いたfirebaseを操作する関数を有効すにする --> 　
12. yarn add cors
13. yarn add socket.io
14. yarn add socket.io-client
15. yarn add @nestjs/websockets @nestjs/platform-socket.io
16. yarn add -D @types/socket.io
17. yarn add socket-controllers
18. yarn add reflect-metadata
19. yarn add @material-ui/core @material-ui/icons <!-- https://www.youtube.com/watch?v=0rnVfshKqDI -->
20. yarn add formik
21. yarn add yup
22. nx run api:serve <!-- バックエンド側のサーバー立てる>
23. nx run quiz:serve<!-- フロントエンドエンド側のサーバー立てる>

### テスト用Googleアカウント一覧

|  No.  |  E-mail  |  Password  |
| ---- | ---- | ---- |
| 1 | test.ichiro100 | ichirotest100 |
| 2 | test.jiro76 | jirotest200 |
| 3 | test.saburo300 | saburotest300 |
| 4 | test.shiro400 | shirotest400 |
| 5 | test.goro500 | gorotest500 |
| 6 | test.rokuro600 | rokurotest600 |
| 7 | test.nanaro700 | nanarotest700 |
| 8 | test.hachiro800 | hachirotest800 |
| 9 | test.kuro900 | kurotest900 |

<!-- TODO '/admin'画面のボタンのUI整える -->
<!-- TODO '/admin/manage'の「User」のメニューで「Active」と「Inactive」ボタン作成して、削除フラグでユーザーを分類、Client画面で「Inactive」になっている場合はグレーダウンとボタンの非活性化に修正 -->
<!-- TODO '/admin'画面で現在生き残っているユーザー一覧が確認できるようにする -->

<!-- TODO '/admin/manage'の「Question」のメニューでListとNewボタン押下で切り替わるように修正 -->