let controller, viewer, vc, cc, game;

$(document).ready(() => {
  controller = $('#controller')[0];
  viewer = $('#viewer')[0];
  cc = controller.getContext('2d');
  vc = viewer.getContext('2d');
  resize();
  game = new Game();
  resize();
  // bind undo event
  $('#btn-undo').on('click', game.undo);
});

// bind windows resize event
$(window).on('resize', resize);

function resize() {
  // set resolution
  controller.height = parseInt(
    $('.canvas-container')
      .css('height')
      .replace('px', '')
  );
  controller.width = controller.height;
  viewer.width = controller.width;
  viewer.height = controller.height;

  // set css size
  $('#controller').css('width', controller.width + 'px');
  $('#controller').css('height', controller.height + 'px');
  $('#viewer').css('width', viewer.width + 'px');
  $('#viewer').css('height', viewer.height + 'px');

  // other elements css
  $('.turn-tag').css(
    'line-height',
    0.5 *
      parseFloat(
        $('.tools-container')
          .css('height')
          .replace('px', '')
      ) +
      'px'
  );

  if (game) {
    game.resize();
  }
}
