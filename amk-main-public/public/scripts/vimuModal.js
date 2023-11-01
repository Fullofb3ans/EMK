// http://www.tulaprivod.ru/dokument/rukovodstva/VIMU_2021.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-vexecution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });
    $(document).on('click', '#ve2-table th, #ve2-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-vexecution2-value').text(target).val(target);
        $('#ve2-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    // МАРКИРОВКА
    $('#vimuSet').on('change', function (e) {
        let vimuMark_gen = $('#vimumark-gen');

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
                ($('#vimucontrol-block-fieldset')).closest('fieldset').removeClass('ReqValueOk');
                ($('#vimucontrol-block-fieldset')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#vimucontrol-block-fieldset')).closest('fieldset').removeClass('noReqValue');
                ($('#vimucontrol-block-fieldset')).closest('fieldset').addClass('ReqValueOk');
        }

        let secondVimuBlock = $('#vimucontrole-blocks2').val() ? '/' + $('#vimucontrole-blocks2').val() : '';

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

        vimuMark_gen.text(x0 + x1 + '-' + x2 + x3 + '-' + x4 + secondVimuBlock + optionssetCheckBox + optForBu + '-' + x5 + '-' + x6 + x7 + x8 + x9);

    });

    // Обработка модальных
    let vimuBlockModal = new bootstrap.Modal($("#ve1Config"));
    let vimuBlock2Modal = new bootstrap.Modal($("#ve2Config"));

    $('#vimucontrol-block-config').on('click', function () {
        vimuBlockModal.show();
    });

    $('#vimucontrol-block2-config').on('click', function (e) {
        vimuBlock2Modal.show();
    });

    $("#closeve1modal").on("click", function (e) {
        vimuBlockModal.hide();
    });

    $("#closeve2modal").on("click", function (e) {
        vimuBlock2Modal.hide();
    });

    // Обработка доп платы
    $('#vimuSet').on('change', function (e) {
        $('#vimucontrole-blocks2').val() ? $('#vimusumBlocks').val($('#vimucontrole-blocks').val() + '/' + $('#vimucontrole-blocks2').val()) : $('#vimusumBlocks').val($('#vimucontrole-blocks').val());
    });

    // КНОПКИ В ТАБЛИЦЕ

    $("#ve1c-submit").on("click", function (e) {
        $('#vimucontrole-blocks').val($('.cur-vexecution-value').val()).trigger('change');
        vimuBlockModal.hide();
        $('#vimuSet').trigger('change')
    });

    $("#ve2c-submit").on("click", function (e) {
        $("#vimucontrole-blocks2").val($("input.cur-vexecution2-value").text()).trigger("change");
        vimuBlock2Modal.hide();
        $("#vimuSet").trigger('change');
    });

    $('#ve2Clear').on('click', function (e) {
        $('#vimucontrole-blocks2').val('');
        $('#vimuSet').trigger('change');
        $('#vimuSet').trigger('change');
        vimuBlock2Modal.hide();
    });

    // КНОПКА КОНФИГУРАТОРА

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
