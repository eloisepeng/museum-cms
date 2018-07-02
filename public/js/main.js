const fields = {};
fields.employees = {
  id: {
    select: $('#employee-field-select'),
    search: $('#employee-search-kw'),
  },
};

$('#search-employee').click(() => {
  // used for both ajax url and redirect
  const url = `/employees/search/${fields.employees.id.select.val()}/${fields.employees.id.search.val()}`;

  $.ajax({
    url,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = url;
    },
  });
});

fields.contacts = {
  id: {
    select: $('#contact-field-select'),
    search: $('#contact-search-kw'),
  },
};

$('#search-contact').click(() => {
  const url = `/contacts/search/${fields.contacts.id.select.val()}/${fields.contacts.id.search.val()}`;

  $.ajax({
    url,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = url;
    },
  });
});


fields.collections = {
  id: {
    select: $('#collection-field-select'),
    search: $('#collection-search-kw'),
  },
};
$('#search-collection').click(() => {
  const url = `/collections/search/${fields.collections.id.select.val()}/${fields.collections.id.search.val()}`;
  $.ajax({
    url,
    type: 'GET',
    error(errr) {
      console.log(errr);
    },
    success() {
      window.location.href = url;
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
