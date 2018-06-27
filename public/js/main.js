$('#search-employee').click(() => {
  const o = {
    name: document.getElementById('employee-field-select').value,
    value: document.getElementById('employee-search-kw').value,
  };
  $.ajax({
    url: '/employees',
    type: 'POST',
    data: o,
    error(errr) {
      console.log(errr);
    },
  });
});
