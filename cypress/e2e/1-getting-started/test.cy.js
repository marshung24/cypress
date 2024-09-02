import attendanceRecord from 'nueip/attendance-record/main.js';

describe('My Test Suite', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test

    cy.loginByPage('marssoft', 'mars', 'eraftdxj');
  })

  it.only('My Test Case', () => {
    let att = new attendanceRecord();

    att.mainPage();

    att.search();
  });

  it('My Attendance', () => {
    // 前往出勤記錄
    cy.visit('https://mars7-cloud.rd1.nueip.site/attendance_record');

    // 設定攔截器
    cy.intercept('POST', '/attendance_record/ajax').as('attendance_search')

    // 設定Dialog別名
    cy.get('.modal-content').as('dialog')

    // 點擊補卡
    cy.wait('@attendance_search').get('td').contains('2024-03-25').parents('tr').find('i#add').click()

    // 時段-上班
    cy.get('@dialog').find('#clockinSection').click()

    // 補卡時間-08:30
    cy.get('@dialog').find('[name="hour"]').select('08')
    cy.get('@dialog').find('[name="min"]').select('32')

    // 說明
    cy.get('@dialog').find('[name="remark"]').type('測試補卡');

    // 送出
    cy.get('@dialog').find('.btn-primary:visible').click()

    // 驗證
    cy.get('td').contains('2024-03-25').parents('tr').contains('08:32:00').should('have.attr', 'data-original-title', '測試補卡')

    // cy.log('這是一個測試訊息');


    // func1();

    // 執行其他測試步驟...
  });
});
