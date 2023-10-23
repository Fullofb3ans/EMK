// http://www.tulaprivod.ru/dokument/rukovodstva/VIMU_2021.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-vexecution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    let vimuBlockModal = new bootstrap.Modal($("#ve1Config"));

    // Открытие шагов
    $(document).on('change', "input[name='vimuroundControl']", function (e) {
        $("#step-3").show();
    });

    $(document).on('change', "input[name='vimuengineStartType']", function (e) {
        $("#step-4").show();
    });

    $(document).on('change', "input[name='vimuprotection']", function (e) {
        $("#step-5").show();
    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {
        let mark_gen = $('#vimumark-gen');
        let modal_button = $('#download');


        let x0 = 'ВИМУ';
        let x1 = $("input[name='vimuexecution']:checked").val() ? $("input[name='vimuexecution']:checked").val() : ''; //взрывозащита
        switch ($("input[name='vimuexecution']:checked").val()) {
            case undefined:
                ($("input[name='vimuexecution']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='vimuexecution']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='vimuexecution']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='vimuexecution']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x2 = $("input[name='vimuroundControl']:checked").val() ? $("input[name='vimuroundControl']:checked").val() : 'X'; //контроль положения и крутящего момента
        switch (x2) {
            case 'X':
                ($("input[name='vimuroundControl']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='vimuroundControl']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='vimuroundControl']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='vimuroundControl']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x3 = $("input[name='vimuengineStartType']:checked").val() ? $("input[name='vimuengineStartType']:checked").val() : 'X'; //способ включения двигателя привода
        switch (x3) {
            case 'X':
                ($("input[name='vimuengineStartType']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='vimuengineStartType']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='vimuengineStartType']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='vimuengineStartType']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#vimucontrole-blocks').val() ? $('#vimucontrole-blocks').val() : 'X'; //функциональные возможности
        switch (x4) {
            case 'X':
                ($('#vimucontrole-blocks')).closest('fieldset').removeClass('ReqValueOk');
                ($('#vimucontrole-blocks')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#vimucontrole-blocks')).closest('fieldset').removeClass('noReqValue');
                ($('#vimucontrole-blocks')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#vimuclimatic-modification').val() ? $('#vimuclimatic-modification').val() : 'X'; //температурное исполнение
        switch (x5) {
            case 'X':
                ($('#vimuclimatic-modification')).closest('fieldset').removeClass('ReqValueOk');
                ($('#vimuclimatic-modification')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#vimuclimatic-modification')).closest('fieldset').removeClass('noReqValue');
                ($('#vimuclimatic-modification')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $("input[name='vimuprotection']:checked").val() ? $("input[name='vimuprotection']:checked").val() : 'X'; //gost 14254-2015
        switch (x6) {
            case 'X':
                ($("input[name='vimuprotection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='vimuprotection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='vimuprotection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='vimuprotection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x7 = $("input[name='vimucolor']:checked").val() ? $("input[name='vimucolor']:checked").val() : 'X'; //vimucolor
        switch (x7) {
            case 'X':
                ($("input[name='vimucolor']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='vimucolor']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='vimucolor']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='vimucolor']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x8 = $("input[name='connectionForVimu']:checked").val() ? $("input[name='connectionForVimu']:checked").val() : 'X'; //электрическое подключение
        switch (x8) {
            case 'X':
                ($("input[name='connectionForVimu']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='connectionForVimu']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='connectionForVimu']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connectionForVimu']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x9 = $("input[name='specialForVimu']:checked").val() ? $("input[name='specialForVimu']:checked").val() : ''; //специальное исполнение
        switch ($('input[name="specialForVimu"]:checked').val()) {
            case undefined:
                ($("input[name='specialForVimu']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='specialForVimu']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='specialForVimu']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='specialForVimu']")).closest('fieldset').addClass('ReqValueOk');
        }

        // ДОП ОПЦИИ ДЛЯ БЛОКА
        let tOption = '';
        document.querySelector('#tOptionv').checked ? (tOption = document.querySelector('#tOptionv').value) : '';

        let PanelOption = '';
        document.querySelector('#PanelOptionv').checked ? (PanelOption = document.querySelector('#PanelOptionv').value) : '';

        let bluetoothOption = '';
        document.querySelector('#bluetoothOptionv').checked ? (bluetoothOption = document.querySelector('#bluetoothOptionv').value) : '';

        let regOption = '';
        document.querySelector('#regOptionv').checked ? (regOption = document.querySelector('#regOptionv').value) : '';

        let optionssetCheckBox = tOption + PanelOption + bluetoothOption + regOption;

        let optForBu = $('#vimucontrole-blocks-options option:selected').val() != 'noValue' ? $('#vimucontrole-blocks-options option:selected').val() : '';


        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9].includes('X');

        mark_gen.text(x0 + x1 + '-' + x2 + x3 + '-' + x4 + optionssetCheckBox + optForBu + '-' + x5 + '-' + x6 + x7 + x8 + x9);

        modal_button.toggle(!is_true);
        mark_gen.toggleClass("is-invalid", is_true).toggleClass('is-valid', !is_true);
    });



    // КНОПКИ В ТАБЛИЦЕ
    $("#e1-submit").on("click", function (e) {
        $("#vimucontrole-blocks").val($("input.cur-execution-value").val()).trigger("change");
        vimuBlockModal.hide();
    });

    // КНОПКА КОНФИГУРАТОРА
    $("#vimucontrole-blocks-series").on("click", function (e) {
        console.log($(this).val());
        $("#vimucontrole-blocks").val('');

    });
    $("#closeve1modal").on("click", function (e) {
        $("#ve1Config").hide();
    });

    $("#ve1c-submit").on("click", function (e) {
        $('#vimucontrole-blocks').val($('.cur-vexecution-value').val()).trigger('change');
        $("#ve1Config").hide();
    });

    $("#vimuSet").on("change", function (e) {
        $('#vimuMark').val($('#vimumark-gen').text());
    });

    $('#vimucontrol-block-optionsset').on('change', function (e) {
        if ($('#vimucontrole-blocks-options option:selected').val() !== 'noValue') {
            document.querySelector('#vimucontrol-block-optionsset').classList.add('ReqValueOk');
            document.querySelector('#vimucontrol-block-optionsset').classList.remove('noReqValue');
        } else {
            document.querySelector('#vimucontrol-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#vimucontrol-block-optionsset').classList.add('noReqValue');
        }
    });

});
