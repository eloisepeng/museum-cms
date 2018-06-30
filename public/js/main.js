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

$('#search-collection').click(() => {
  $.ajax({
    url: `/collections/search/${document.getElementById('collection-field-select').value}/${document.getElementById('collection-search-kw').value}`,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = `/collections/search/${document.getElementById('collection-field-select').value}/${document.getElementById('collection-search-kw').value}`;
    },
  });
});

// update a collection item
$('#updCollection').click(function () {
  const id = $(this).attr('cid');
  $.ajax({
    url: `/collections/update/${id}`,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = `/collections/update/${id}`;
    },
  });
});

// add a inspection report
// $('#repInspection').click(function () {
//   const id = $(this).attr('cid');
//   $.ajax({
//     url: `/collections/report/${id}`,
//     type: 'GET',
//     error(errr) {
//       console.log(errr);
//     },
//     success() {
//       window.location.href = `/collections/report/${id}`;
//     },
//   });
// });

// deaccesse a collection item
$('#delCollection').click(function () {
  const id = $(this).attr('cid');
  swal({
    title: 'Delete',
    text: 'Are you sure?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonColor: '#343e48',
    background: 'rgb(44, 49, 51)',
    confirmButtonColor: '#d33',
  }).then((confirm) => {
    if (confirm.value) {
      swal({
        title: 'Deaccessing',
        html:
          '<textarea id="swal-input1" placeholder="Deaccess Reason Required" rows="8" cols="70"></textarea>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Disposal Method">',
        preConfirm: function () {
          return new Promise(((resolve) => {
            resolve([
              $('#swal-input1').val(),
              $('#swal-input2').val(),
            ]);
          }));
        },
        background: 'rgb(44, 49, 51)',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Submit',
      }).then((result) => {
        $.ajax({
          url: '/collections/delete',
          type: 'POST',
          data: {
            id,
            reason: result.value[0],
            disposalMethod: result.value[1],
          },
          error(err) {
            console.log(err);
          },
          success() {
            window.location.href = '/collections';
          },
        });
      });
    }
  });
});

$('#changePw').click(async function () {
  const username = $(this).attr('username');
  const { value: newPassword } = await swal({
    title: 'New Password',
    text: `Username: ${username}`,
    input: 'password',
    inputPlaceholder: 'Enter new password',
    background: 'rgb(44, 49, 51)',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Submit',
  });
  $.ajax({
    url: '/employees/resetpw',
    type: 'POST',
    data: {
      username,
      newPassword,
    },
    error(err) {
      console.log(err);
    },
    success() {
      window.location.href = '/employees';
    },
  });
});

// deactivate a client
$('#delContact').click(function () {
  deleteEntry(this, 'cid', '/contacts');
});

// remove a user
$('#deleteUser').click(function () {
  deleteEntry(this, 'uid', '/employees');
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
    confirmButtonText: 'Yes, delete it!',
    cancelButtonColor: '#343e48',
    background: 'rgb(44, 49, 51)',
    confirmButtonColor: '#d33',
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
