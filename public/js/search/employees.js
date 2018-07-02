const employees = {
  id: {
    select: $('#employee-field-select'),
    search: $('#employee-search-kw'),
    btn: $('#search-employee'),
  },
  url: '/employees/search/jquery',
  runAjax: (dataValue) => {
    $.ajax({
      url: employees.url,
      type: 'POST',
      data: dataValue,
      success(data) {
        // console.log(data);
        $('tr.titles').siblings().remove(); // remove all tr except the title
        $('tbody').append(employees.generateHTML(data.employees)); // append the html generated into table body
        $('#count').text(data.employees.length);
      },
      error(errr) {
        console.log(errr);
      },
    });
  },
  generateHTML: data => $.map(data, e => employees.generateRow(e)),
  generateRow: (employee) => {
    const addressNum = (employee.address.num) ? `${employee.address.num}-` : '';
    return `<tr>
              <td>
                  ${employee.username}
                  <a href='/employees/update/${employee._id}'><img class='icon' src='/img/edit-blk.png' alt='Edit'></a>
              </td>
              <td>${employee.firstname} ${employee.lastname}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>
                ${addressNum}${employee.address.street}, ${employee.address.city}, ${employee.address.province}, ${employee.address.country}, ${employee.address.zip}
              </td>
              <td>${employee.role}</td>
              <td>${moment(employee.lastLogin).format('lll')}</td>
              <td>${moment(employee.createdAt).format('ll')}</td>
            </tr>`;
  },
  search: () => {
    employees.id.btn.on('click', (e) => {
      e.preventDefault(); // prevent the click's default action

      // create the data need to be passed to backend using ajax
      const dataValue = {
        key: employees.id.select.val(),
        value: employees.id.search.val(),
      };
      // console.log(dataValue);

      employees.runAjax(dataValue);
    });
  },
};
