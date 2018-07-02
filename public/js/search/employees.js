const employees = {
  id: {
    select: $('#employee-field-select'),
    search: $('#employee-search-kw'),
    btn: $('#search-employee'),
  },
  url: () => `/employees/search/${employees.id.select.val()}/${employees.id.search.val()}`,
  search: () => {
    employees.id.btn.on('click', (e) => {
      e.preventDefault(); // prevent the click's default action
      $.ajax({
        url: this.url,
        type: 'GET',
        error(errr) {
          console.log(errr);
        },
        success() {
          window.location.href = employees.url();
        },
      });
    });
  },
};
