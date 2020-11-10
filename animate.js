// Высоты блока заказа
let orderHeight = $('#orderHelp').height()
  // Высота страницы
let screenHeight = window.innerHeight
  // padding надо учитывать
let paddingTop = 20
let percentWidthHelpBlock = 40
  // Отступ справа для фиксированного элемента, тут первое значение - отступ справа в пикселях
let paddingRight = 60 * percentWidthHelpBlock / 50
  // Флаг, указывающий вспомогательный блок заказа был фиксирован
let fixed = false
  // Если изначально высота блока заказа меньше высоты страницы, сразу его фиксируем
if (orderHeight * 2 < screenHeight) {
  $('#orderHelp').css({
    'position': 'fixed',
    'width': `calc(${percentWidthHelpBlock}% - ${paddingRight}px)`,
    'max-width': `calc(${percentWidthHelpBlock}% - ${paddingRight}px)`
  })
  fixed = true
}


let blocksObject = $('.block')
let blocks = []
for (let index = 0; index < blocksObject.length; index++) {
  blocks.push(blocksObject[index])
}
// Все блоки, кроме вспомогательного ордера
blocks = blocks.filter(block => block.id !== 'orderHelp')
  // Объект с размерами блоков
let blocksTop = {}
for (let index in blocks) {
  let blockTop = $(`#${blocks[index].id}`).offset().top
  blocksTop[blocks[index].id] = blockTop
}
// Уже показанные блоки
let usedBlocks = new Set()

// Анимация появления блоков
function showBlocks(scrollTop = 0) {
  if (!blocks.length) return
  for (let index in blocks) {
    let blockTop = blocksTop[blocks[index].id] + paddingTop + ((index + 1) * 15)
    let currentBlocks = Object.assign(blocks)
    if (screenHeight + scrollTop >= blockTop) {
      setTimeout(() => {
        $(`#${currentBlocks[index].id}`).css({
          'opacity': '1'
        })
      }, 200)
      usedBlocks.add(blocks[index].id)
    }
  }
  blocks = blocks.filter(b => !Array.from(usedBlocks).find(ub => ub == b.id))
}
showBlocks()

$(window).scroll(function() {
  // Величина скролла сверху
  let scrollTop = $(window).scrollTop();

  showBlocks(scrollTop)

  // Появление вспомогательного блока
  if (scrollTop > orderHeight) {
    $('#orderHelp').addClass('order-help_show');
  } else {
    $('#orderHelp').removeClass('order-help_show');
  }

  // Скролл вспомогательного блока
  // Если мы не зафиксировали вспомогательный блок и он длиннее страницы, то его нужно скролить
  // Как только достигаем низа вспомогательного блока, делаем его фиксированным
  if (!fixed && ((orderHeight + paddingTop) * 2) < scrollTop + screenHeight) {
    $('#orderHelp').css({
      'position': 'fixed',
      'margin-top': 0,
      'width': `calc(${percentWidthHelpBlock}% - ${paddingRight}px)`,
      'max-width': `calc(${percentWidthHelpBlock}% - ${paddingRight}px)`,
      'top': `-${orderHeight - screenHeight + paddingTop}px`
    })
    fixed = true
  } else if (!fixed) {
    $('#orderHelp').css({
      'margin-top': `${orderHeight}px`,
      'width': '100%',
      'max-width': '100%',
    })
  }
  // При скролле наверх, если поднимаемся выше, отменяем фиксацию блока и скроллим ее
  else if (fixed && (orderHeight * 2) > scrollTop + screenHeight) {
    fixed = false
    $('#orderHelp').css({
      'margin-top': `${orderHeight}px`,
      'width': '100%',
      'max-width': '100%',
      'position': 'static'
    })
  }
});