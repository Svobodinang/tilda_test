// Добавление, удаление товара


// Выбор типа доставки
$('input[name="delivery"]').click(function() {
  if (this.value === 'pickup') {
    $("#deliveryExpress").css({
      'display': 'none'
    })
    $("#deliveryPickup").css({
      'display': 'block'
    })

    // Пересчет стоимости доставки и финальной суммы
    $(".delivery-summ").text('0р.')
    let currentSumm = $(".final-summ").text()
    $(".final-summ").text(`${+currentSumm.split('р.')[0] - 200}р.`)
  } else {
    $("#deliveryPickup").css({
      'display': 'none'
    })
    $("#deliveryExpress").css({
      'display': 'block'
    })

    // Пересчет стоимости доставки и финальной суммы
    $(".delivery-summ").text('200р.')
    let currentSumm = $(".final-summ").text()
    $(".final-summ").text(`${+currentSumm.split('р.')[0] + 200}р.`)
  }
});

// Выбор времени доставки
$('.delivery__time-button').click(function() {
  $('.delivery__time-button').removeClass('delivery__time-button_active')
  $(`#${this.id}`).addClass('delivery__time-button_active')
})

// При клике по "бесконтактной доставке"
$('#covid').click(function() {
  if ($(this).is(':checked')) {
    $('input[name="payment"][value="online"]').trigger('click');
    $('input[name="payment"][value="cash"]').prop('disabled', true);
    $('input[name="payment"][value="card"]').prop('disabled', true);
  } else {
    $('input[name="payment"][value="cash"]').prop('disabled', false);
    $('input[name="payment"][value="card"]').prop('disabled', false);
  }
});


// Выбор способа оплаты
$('input[name="payment"]').click(function() {
  if (this.value === 'online') {
    $('#paymentOnline').css({
      'display': 'block'
    })
  } else {
    $('#paymentOnline').css({
      'display': 'none'
    })
  }
})