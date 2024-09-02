
export default class selector {
  constructor() {
    // Initialize any properties here

    // 設定攔截器
    cy.intercept('POST', '/attendance_record/ajax').as('attendance_search')
    cy.intercept('POST', '/shared/org_cascade_select_ajax').as('attendance_org')
    
  }

  visit() {
    cy.visit('https://mars7-cloud.rd1.nueip.site/attendance_record');
  }

  workState(data) {
    // 設定待查詢資料
    let queryData = {
      'work_status': '在職',
      'dept' : '總務處',
      'user' : '張◯昌',
      'date_start' : '2024-03-01',
      'date_end' : '2024-03-01'
    }

    // 組織樹更新狀態
    let s = {org_status : true};

    cy.log(s.org_status);

    // 更新查詢條件-在職狀態
    (s.org_status ? cy.wait('@attendance_org') : cy).get('.search-select-workstatus:visible').find('option:selected').invoke('text').then((text) => {
      
    cy.log(text);
    cy.log(queryData.work_status);
      if (text != queryData.work_status) {
        cy.get('.search-select-workstatus:visible').select(queryData.work_status)
        s.org_status = true;
      } else {
        s.org_status = false;
        cy.log(s.org_status);
      }
    });
    cy.log(s.org_status);
    
    // 更新查詢條件-部門
    (s.org_status ? cy.wait('@attendance_org') : cy).get('.search-select-unit').find('[type="button"]').parents('.search-select-unit').as('dept')
    cy.get('@dept').find('[type="button"]').invoke('attr', 'title').then((text) => {
      if (text != queryData.dept) {
        cy.get('@dept').find('[type="button"]').click();
        cy.get('@dept').find('li').contains(queryData.dept).click();
        s.org_status = true;
      } else {
        s.org_status = false;
      }
    });
    cy.log(s.org_status);
    
    // 更新查詢條件-員工
    (s.org_status ? cy.wait('@attendance_org') : cy).get('.search-select-emp').find('[type="button"]').parents('.search-select-emp').as('user')
    cy.get('@user').find('[type="button"]').invoke('attr', 'title').then((text) => {
      if (text != queryData.user) {
        cy.get('@user').find('[type="button"]').click();
        cy.get('@user').find('li').contains(queryData.user).click();
        s.org_status = true;
      } else {
        s.org_status = false;
      }
    });
    cy.log(s.org_status);

    // 更新查詢條件-開始日期
    cy.get('[name="date_start"]').invoke('val').then((text) => {
      if (text != queryData.date_start) {
        cy.get('[name="date_start"]').clear().type(queryData.date_start);
      }
    });
    cy.log(s.org_status);

    // 更新查詢條件-結束日期
    cy.get('[name="date_end"]').invoke('val').then((text) => {
      if (text != queryData.date_end) {
        cy.get('[name="date_end"]').clear().type(queryData.date_end);
      }
    });

    // 查詢
    cy.get('#filter').click();



return


    // 在職狀態 全部/在職/離職/未到職/留職停薪
    cy.wait('@attendance_org').get('.search-select-workstatus:visible').select('在職')

    // 部門
    cy.wait('@attendance_org').get('.search-select-unit').find('[type="button"]').parents('.search-select-unit').as('dept')
    cy.get('@dept').find('[type="button"]').click();
    cy.get('@dept').find('li').contains('總務處').click();

    // 員工
    cy.wait('@attendance_org').get('.search-select-emp').find('[type="button"]').parents('.search-select-emp').as('user')
    cy.get('@user').find('[type="button"]').click();
    cy.get('@user').find('li').contains('張◯昌').click();

    // 日期
    cy.get('[name="date_start"]').clear().type('2024-03-01');
    cy.get('[name="date_end"]').clear().type('2024-03-01');

    // 查詢
    cy.get('#filter').click();

    // cy.intercept('POST', '/shared/org_cascade_select_ajax').as('attendance_org-2')
    // cy.wait('@attendance_org-2').get('.search_unit_emp').select('洪◯昇 Mxxs Hxxg')
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


