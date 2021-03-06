jQuery(document).ready(function ($) {
  function gatherAccordions() {
    var r = $.Deferred();
    $(':not(.accordion) + .accordion, * > .accordion:first-of-type').each(function () {
      $(this).nextUntil(':not(.accordion)').addBack().wrapAll('<div class="accordions active" />');
    });
    return r;
  }
  function accordionTitles() {
    var r = $.Deferred();
    var titleCount = 0;
    $('.accordions .accordion-title').each(function () {
      titleCount++;
      var $this = $(this);
      var id = 'accordion-' + titleCount;
      var titleID = 'accordion-title-' + titleCount;
      $this.attr('id', titleID);
      if ($this.hasClass('open')) {
        $this.addClass('is-active');
        if ($this.is('div')) {
          $('h2', $this).wrapInner('<button onclick="return false;" aria-expanded="true" aria-controls="' + id + '">');
        } else {
          $this.wrapInner('<button onclick="return false;" aria-expanded="true" aria-controls="' + id + '">');
        }
      } else {
        if ($this.is('div')) {
          $('h2', $this).wrapInner('<button onclick="return false;" aria-expanded="false" aria-controls="' + id + '">');
        } else {
          $this.wrapInner('<button onclick="return false;" aria-expanded="false" aria-controls="' + id + '">');
        }
      }
    });
    return r;
  }
  function accordionContent() {
    var r = $.Deferred();
    var contentCount = 0;
    $('.accordions .accordion-content').each(function () {
      contentCount++;
      var $this = $(this);
      var id = 'accordion-' + contentCount;
      if ($this.prev('.accordion-title').hasClass('is-active')) {
        $this.attr('id', id).attr('aria-hidden', 'false');
      } else {
        $this.attr('id', id).attr('aria-hidden', 'true');
      }
    });
    return r;
  }
  function accordionButtons() {
    $('.accordions .accordion-title button').on('click', function (e) {
      e.preventDefault();
      var id = $(this).attr('aria-controls');
      var state = $(this).attr('aria-expanded');
      var panel = $('.accordion-content#' + id);
      if ($(this).parent().hasClass('is-active')) {
        $(this).parent().removeClass('is-active').addClass('is-inactive');
        $(this).attr('aria-expanded', 'false');
        panel.attr('aria-hidden', 'true');
      } else {
        $(this).parent().removeClass('is-inactive').addClass('is-active');
        $(this).attr('aria-expanded', 'true');
        panel.attr('aria-hidden', 'false');
      }
    });
  }
  gatherAccordions().done(accordionTitles().done(accordionContent().done(accordionButtons())));

  if (window.location.hash) {
    var hash = window.location.hash;
    var urlAccordion = $('.accordion-title' + hash);
    if (urlAccordion.length) {
      console.log('has hash');
      urlAccordion.addClass('is-active');
      urlAccordion.find('> button').attr('aria-expanded', 'true');
      urlAccordion.next('.accordion-content').attr('aria-hidden', 'false');
    }
  }
});