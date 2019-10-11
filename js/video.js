$('.videoswiper').each(function(index, element) {
    var href = $(element).find('a').attr('href');
    $(element).magnificPopup({
      items: {
        src: href
      },
      type: 'iframe'
    });
  });