const contacts = {
  id: {
    select: $('#contact-field-select'),
    search: $('#contact-search-kw'),
    btn: $('#search-contact'),
  },
  url: () => `/contacts/search/${contacts.id.select.val()}/${contacts.id.search.val()}`,
  search: () => {
    contacts.id.btn.on('click', (e) => {
      e.preventDefault(); // prevent the click's default action
      $.ajax({
        url: this.url,
        type: 'GET',
        error(errr) {
          console.log(errr);
        },
        success() {
          window.location.href = contacts.url();
        },
      });
    });
  },
};
