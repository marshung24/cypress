/**
 * 出勤紀錄-測試主程式
 * 
 * @description
 *   1. 在本程式中建構相關測試功能，並提供外部程式引用，以簡化測試config(xxx.cy.js)的複雜度，達到測試流程與實作步驟邏輯分層管理之目的。
 *      - 測試config(xxx.cy.js)負責設定測試環境、測試流程、測試步驟等，並引用本程式提供的功能進行測試。
 *      - 本程式負責實作測試步驟邏輯，並提供外部程式引用。
 *      - 如有更細部的需求，可將本程式進行模組化，以提供更多功能之餘簡化每一個功能的複雜度。
 *   2. 透過Cypress進行出勤紀錄功能測試，包含訪問主頁、查詢、新增、修改、刪除等操作。
 * 
 * @author Mars.Hung, 
 * @Usage 
 *   // 引入主程式
 *   import attendanceRecord from 'nueip/attendance-record/main.js';
 * 
 *   // 建立主程式物件
 *   let att = new attendanceRecord();
 *   // 訪問主頁
 *   att.mainPage();
 *   // 查詢
 *   att.search();
 */
export default class main {

  /**
   * 建構子
   */
  constructor() {
    // Initialize any properties here

  }

  /**
   * 訪問主頁
   */
  mainPage() {
    // ===== 四層選單攔截器 =====
    // 組織選單
    cy.intercept('POST', '/shared/org_cascade_select_ajax').as('attendance_org');
    // 查詢
    cy.intercept('POST', '/attendance_record/ajax').as('attendance_search');

    cy.visit('https://mars7-cloud.rd1.nueip.site/attendance_record');
  }

  /**
   * 資料查詢
   * 
   * 格式：
   * queryData = {
   *  'work_status': '全部|在職|離職|未到職|留職停薪',  // 在職狀態
   *  'dept': '部門名稱',                             // 部門
   *  'user': '員工姓名',                             // 員工
   *  'date_start': 'YYYY-MM-DD',                    // 開始日期
   *  'date_end': 'YYYY-MM-DD',                      // 結束日期
   *  'filter': '篩選字串'                            // 關鍵字搜尋
   * }
   * 
   * @param {*} queryData 
   * @returns 
   */
  search(queryData = {}) {
    // 設定待查詢資料
    let defaultQueryData = {
      'work_status': '全部',
      'dept': '總務處',
      'user': '全部',
      'date_start': '2024-03-01',
      'date_end': '2024-03-01',
      'filter': ''
    };

    queryData = Object.assign({}, defaultQueryData, queryData);

    // 設定選擇器
    let selector = {
      'work_status': '.search-select-workstatus:visible',
      'dept': '.search-select-unit',
      'user': '.search-select-emp',
      'date_start': '[name="date_start"]',
      'date_end': '[name="date_end"]',
      'filter': '.dataTables_filter',
      'submit': '#filter:visible'
    };

    // 旗標-是否有資料變動
    let org_data_change = true;

    /**
     * 四層選單
     * 
     * workstatus, unit, emp三者有相依性，當前者變動時，會影響後者的選項，且使用同一個API，因此如果有變動時需要等待API回應後再進行後續操作，
     * 所以要根據前一個選項的值，來判斷是否需要等待API回應，但Cypress為異步操作，在then()之間無法直接傳遞變數，所以要寫成巢狀結構，並在內層的then()中進行後續操作。
     */
    // ===== 更新查詢條件-在職狀態 =====
    // 取得目前工作狀態
    (org_data_change ? cy.wait('@attendance_org').wait(10) : cy).get(selector.work_status).find('option:selected').invoke('text').then((text) => {
      // 當工作狀態不等於待查設定值時，更新工作狀態，並記錄有無更新
      if (text != queryData.work_status) {
        cy.get(selector.work_status).select(queryData.work_status);
        org_data_change = true;
      } else {
        org_data_change = false;
      }

      // ===== 更新查詢條件-部門 =====
      // 取得部門DOM結構最外層
      (org_data_change ? cy.wait('@attendance_org').wait(10) : cy).get(selector.dept).find('[type="button"]').parents(selector.dept).as('dept')
      // 取得部門名稱
      cy.get('@dept').find('[type="button"]').invoke('attr', 'title').then((text) => {
        // 當部門名稱不等於待查設定值時，更新部門，並記錄有無更新
        if (text != queryData.dept) {
          cy.get('@dept').find('[type="button"]').click();
          cy.get('@dept').find('li').contains(queryData.dept).click();
          org_data_change = true;
        } else {
          org_data_change = false;
        }

        // ===== 更新查詢條件-員工 =====
        // 取得員工DOM結構最外層
        (org_data_change ? cy.wait('@attendance_org').wait(10) : cy).get(selector.user).find('[type="button"]').parents(selector.user).as('user')
        // 取得員工名稱
        cy.get('@user').find('[type="button"]').invoke('attr', 'title').then((text) => {
          // 當員工名稱不等於待查設定值時，更新員工
          if (text != queryData.user) {
            cy.get('@user').find('[type="button"]').click();
            cy.get('@user').find('li').contains(queryData.user).click();
          }
        });
      });
    });

    // 更新查詢條件-開始日期
    cy.get(selector.date_start).invoke('val').then((text) => {
      if (text != queryData.date_start) {
        cy.get(selector.date_start).clear().type(queryData.date_start);
      }
    });

    // 更新查詢條件-結束日期
    cy.get(selector.date_end).invoke('val').then((text) => {
      if (text != queryData.date_end) {
        cy.get(selector.date_end).clear().type(queryData.date_end);
      }
    });

    // 查詢
    cy.get(selector.submit).click();

    // 關鍵字搜尋
    queryData.filter && cy.wait('@attendance_search').get(selector.filter).find('input').type(queryData.filter);
  }


  // 補卡
  applyCheckin() {
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
  }

  create(data) {
    // Implement create logic here
  }

  read(id) {
    // Implement read logic here
  }

  update(id, data) {
    // Implement update logic here
  }

  delete(id) {
    // Implement delete logic here
  }
}


