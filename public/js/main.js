$('#search-employee').click(() => {
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

$('#search-contact').click(() => {
  $.ajax({
    url: `/contacts/search/${document.getElementById('contact-field-select').value}/${document.getElementById('contact-search-kw').value}`,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = `/contacts/search/${document.getElementById('contact-field-select').value}/${document.getElementById('contact-search-kw').value}`;
    },
  });
});

// delete function to delete document from the row
async function deleteEntry(t, data, rdr, ddr = rdr) {
  if (rdr !== ddr) {
    const arr = rdr.split('/');
    ddr = `/${arr[1]}/${$(t).attr(ddr)}/${arr[3]}`;
  }
  await swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.value) {
      const id = $(t).attr(data);
      const url = `${rdr}/delete`;
      $.ajax({
        type: 'POST',
        url,
        data: { id },
        success: function (res) {
          if (res.result === 'success') {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success',
            ).then(() => { location.href = ddr; });
          }
        },
      });
    }
  });
}

// remove a case
$('#deleteUser').click(function () {
  deleteEntry(this, 'uid', '/employees');
});
