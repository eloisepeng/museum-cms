$(document).ready(() => {
  swal({
    title: 'Sign In',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="USERNAME">' +
      '<input id="swal-input2" class="swal2-input" placeholder="PASSWORD">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
      ];
    },
    imageUrl: '../img/gem-logo-wit.png',
    imageWidth: 450,
    background: 'rgb(48, 79, 95)',
    imageAlt: 'Logo',
    animation: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
});
