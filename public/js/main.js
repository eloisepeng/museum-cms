$('#search-employee').click(() => {
  // const data = {};
  // data[document.getElementById('employee-field-select').value] = document.getElementById('employee-search-kw').value;
  // $.ajax({
  //   url: '/employees',
  //   type: 'POST',
  //   data: data,
  //   error(errr) {
  //     console.log(errr);
  //   },
  //   success(res) {
  //     console.log(res);
  //   },
  // });
  $.ajax({
    url: `/employees/search/${document.getElementById('employee-field-select').value}/${document.getElementById('employee-search-kw').value}`,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = `/employees/search/${document.getElementById('employee-field-select').value}/${document.getElementById('employee-search-kw').value}`;
    },
  });
});
