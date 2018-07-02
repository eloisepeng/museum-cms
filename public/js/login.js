$(document).ready(() => {
  swal({
    title: 'Hello, Stranger!',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="USERNAME">' +
      '<input id="swal-input2" class="swal2-input" placeholder="PASSWORD" type="password">',
    // '<input id="submit-button" type="submit" value="Login">',
    focusConfirm: true,
    // showConfirmButton: false,
    preConfirm: function () {
      return new Promise(((resolve) => {
        resolve([
          $('#swal-input1').val(),
          $('#swal-input2').val(),
        ]);
      }));
    },
    imageUrl: '../img/gem-logo-wit.png',
    imageWidth: 450,
    background: 'rgb(0, 0, 0)',
    imageAlt: 'Logo',
    animation: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: '#343e48',
    confirmButtonText: 'Login',
  }).then((result) => {
    $.ajax({
      url: '/employees/login',
      type: 'POST',
      data: {
        username: result.value[0],
        password: result.value[1],
      },
      error(err) {
        console.log(err);
      },
      success() {
        // document.getElementById('rdrmsg').innerHTML = 'Redirecting..3s';
        const countDownDate = new Date().getTime() + 3000;
        const redirectMsgId = $('#rdrmsg');
        const x = setInterval(() => {
          const now = new Date().getTime();
          const d = countDownDate - now;
          const s = Math.floor((d % (1000 * 60)) / 1000);
          redirectMsgId.html(`Redirecting..${s}s`);
          if (d < 0) {
            clearInterval(x);
            redirectMsgId.html('if the page doesnot redirect, click here');
          }
        }, 0.001);
        window.location.href = '/collections';
      },
    });
  });
});
