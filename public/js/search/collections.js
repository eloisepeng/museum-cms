const collections = {
  id: {
    select: $('#collection-field-select'),
    search: $('#collection-search-kw'),
    btn: $('#search-collection'),
  },
  url: () => `/collections/search/${collections.id.select.val()}/${collections.id.search.val()}`,
  search: () => {
    collections.id.btn.on('click', (e) => {
      e.preventDefault(); // prevent the click's default action
      $.ajax({
        url: this.url,
        type: 'GET',
        error(errr) {
          console.log(errr);
        },
        success() {
          window.location.href = collections.url();
        },
      });
    });
  },
};
