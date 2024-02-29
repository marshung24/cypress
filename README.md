# Cypress Testing


## Install
```sh
# Install Cypress
npm install cypress cypress-multi-reporters mocha-junit-reporter cypress-mochawesome-reporter --save-dev

# Install base package
npm install dotenv express-jwt jwks-rsa
```

## Open Cypress
### With Launchpad
```sh
# Using npx
npx cypress open

# Run with debug mode
DEBUG=cypress:server:specs npx cypress open

# Using npm scripts
npm run cypress:open
```

### With Browser
```sh
# 跳過 Launchpad
npx cypress open [--browser] [--component|e2e]
# npx cypress open --browser chrome

```

### Command Line
> https://docs.cypress.io/guides/guides/command-line
```sh
# 執行全部測試
npx cypress run

# 執行指定測試檔
npx cypress run --spec <spec>
# npx cypress run --spec "cypress/e2e/1-getting-started/todo.cy.js" --reporter cypress-multi-reporters
# npx cypress run --spec "cypress/e2e/login/**/*"
# npx cypress run --spec "cypress/e2e/examples/actions.cy.js,cypress/e2e/examples/files.cy.js"

# 指定設定檔
cypress run --config-file <configuration-file>

# 傳入環境變數
cypress run --env <env>

```

### Run by Nodejs
- `cypress.run()`
- `cypress.open()`


## Assertions
> https://docs.cypress.io/guides/references/assertions
> https://www.chaijs.com/api/bdd/

### BDD
- expect().to.eql()
- should('eql)

## Hooks
> root hooks or block hooks(in describe)
- before(() => {    })
- beforeEach(() => {    })
- afterEach(() => {    })
- after(() => {    })

## Include/Exclude
- .only()
- .skip()


## Action Command
- `.click()`
- `.dblclick()`
- `.rightclick()`
- `.type()`
- `.clear()`
- `.check()`
- `.uncheck()`
- `.select()`
- `.trigger()`
- `.selectFile()`

## Other
- `.debug()`
- `.as()`
  - 如果您在測試或掛鉤中使用箭頭函數，則將別名作為屬性存取this.*將不起作用。
  - 透過使用cy.get()我們可以避免使用this.


## Advanced Installation

### Opt out of sending exception data to Cypress
```bash
export CYPRESS_CRASH_REPORTS=0
```

### Opt out of Cypress commercial messaging
```bash
export CYPRESS_COMMERCIAL_RECOMMENDATIONS=0
```

## Reset DB
- `setupNodeEvents`
  - `db:seed`
- `cy.exec`


## References
- Cypress Guides: https://docs.cypress.io/guides/overview/why-cypress
- Cypress-Plugins: https://github.com/YOU54F/cypress-plugins
  - Reporter: https://github.com/YOU54F/cypress-plugins/tree/master/cypress-multi-reporters
- 端對端測試: https://ithelp.ithome.com.tw/users/20109645/ironman/5708?page=2
- Reporters
  - mocha-junit-reporter: https://www.npmjs.com/package/mocha-junit-reporter
  - cypress-mochawesome-reporter: https://www.npmjs.com/package/cypress-mochawesome-reporter