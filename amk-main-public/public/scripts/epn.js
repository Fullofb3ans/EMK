// https://www.tulaprivod.ru/dokument/shema/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%AD%D0%9F%D0%9D.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text('В' + target).val('В' + target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });
    $(document).on('click', '#e2-table th, #e2-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById('e2' + target);
        $('.cur-execution2-value').text('В' + target).val('В' + target);
        $('#e2-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });
    $(document).on('click', '#e2E16-table th, #e2E16-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById('e2' + target);
        $('.cur-executionE16-value').text('В' + target).val('В' + target);
        $('#e2E16-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });
    $(document).on('click', '#e14e17-table th, #e14e17-table td', function (e) {
        let target = $(this).data('target');
        console.log(target);
        let el = document.getElementById('e14e17В' + target);
        console.log(el);
        $('.cur-e14e17xecution-value').text(target).val(target);
        $('#e14e17-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    const cheme_img = {
        epn: {
            0: 'epn0.png',
            1: 'epn1_11.png',
            2: 'epn2.png',
            11: 'epn1_11.png',
            12: 'epn12.png',
            3: 'epn3_31.png',
            31: 'epn3_31.png',
            32: 'epn32.png',
        },
    };

    // ЗАПОЛНЕНИЕ КрутяЩИХ МОМЕНТОВ ЧЕРЕЗ БД
    $('#executionWrapLegend').on('change', function (e) {
        function rMomentSelectCreate() {
            let execution = $("input[name='execution']:checked").val();
            let uplim = document.getElementById('upper-limit');
            $(uplim).empty();

            uplim.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];
            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', execution],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(uplim).append(new Option(item, item))
                    }
                    );
                })
        }
        rMomentSelectCreate();
    });

    // ЗАПОЛНЕНИЕ Мощности двигателя ЧЕРЕЗ БД
    $('#vPower').on('change', function (e) {
        stepTimeSelectCreate();
    });

    $('#upper-limit').on('change', function (e) {
        function vV() {
            let execution = $("input[name='execution']:checked").val();
            let uplim = document.querySelector("#upper-limit").value;
            let vPower = document.getElementById('vPower');
            $(vPower).empty();

            if (!uplim) {
                return alert('Пропущен верхний предел');
            }

            vPower.innerHTML = '<option value="0" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', execution, uplim],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(vPower).append(new Option(item, item))
                    }
                    );
                })
        }
        vV();
    });

    // ЗАПОЛНЕНИЕ Времени Хода ЧЕРЕЗ БД
    $('#upper-limit').on('change', function (e) {
        stepTimeSelectCreate();
    });

    function stepTimeSelectCreate() {
        let execution = $("input[name='execution']:checked").val();
        let vPower = document.getElementById('vPower').value;
        let uplim = document.querySelector("#upper-limit").value;
        let select = document.querySelector("#time-limit");
        $(select).empty();

        if (!vPower) {
            return alert('Пропущен кабельный ввод');
        }
        else if (!uplim) {
            return alert('Пропущен кабельный ввод');
        }

        select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

        let fetchResult = [];

        fetch('https://emk.websto.pro/DBep', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                a: ['ЭПН', execution, uplim, vPower],
            }),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                for (i in res)
                    fetchResult.push(res[i]);
                // fetchResult[0].sort((a, b) => a - b);
                $.each(fetchResult[0], function (key, item) {
                    $(select).append(new Option(Number(item), Number(item)))
                    if (fetchResult[0].length == 1) {
                        select.selectedIndex = 1;
                        $('#step-2').trigger('change');
                        $("#schemeStep").trigger('change');
                    };
                }
                );
            })
    }

    // ПРОГРУЗКА ДАННЫХ КОНСТРУКТИВНЫХ СХЕМ С ТАБЛИЦЫ 
    $("#schemeStep").on('change', function (e) {
        function SchemeSelectCreate() {
            let vPower = document.getElementById('vPower').value;
            let upLim = document.querySelector("#upper-limit").value;
            let timeLim = document.querySelector("#time-limit").value;
            let execution = $("input[name='execution']:checked").val();
            $('#constructive-scheme-wrap').empty();
            $('#constructive-scheme-img').empty();
            $('#constructive-scheme-Epnimg').empty();
            $('#constructive-schemeFull-img').empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }
            else if (!timeLim) {
                return alert('Пропущен кабельный ввод');
            }

            let fetchResult = [];
            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', execution, upLim, vPower, timeLim],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {

                        $('#constructive-scheme-wrap').append(
                            $('<div>')
                                .prop({ class: 'form-check' })
                                .append(
                                    $('<input>').prop({
                                        type: 'radio',
                                        id: 'scheme-' + item,
                                        name: 'constructive-scheme',
                                        value: item,
                                        class: 'form-check-input ch-mark',
                                    })
                                )
                                .append(
                                    $('<label>')
                                        .prop({
                                            for: 'scheme-' + item,
                                            class: 'form-check-label',
                                        })
                                        .text(' Конструктивная схема ' + item)
                                )
                        )
                    });
                    if (fetchResult[0].length == 1) {
                        let a = document.getElementsByName('constructive-scheme');
                        a[0].checked = true;
                        $('#constructive-scheme-wrap').trigger('change');
                    };
                }
                );
        }
        let upLim = document.querySelector("#upper-limit").value;
        let timeLim = document.querySelector("#time-limit").value;
        if (upLim && timeLim) {
            SchemeSelectCreate();
        }
    });

    // ПРОГРУЗКА ФЛАНЦЕВ С БД
    $('#constructive-scheme-wrap').on('change', function (e) {
        function flangeSelectCreate() {
            let execution = $("input[name='execution']:checked").val();
            let vPower = document.getElementById('vPower').value;
            let upLim = document.querySelector("#upper-limit").value;
            let timeLim = document.querySelector("#time-limit").value;
            let scheme = $("input[name='constructive-scheme']:checked").val();

            let flange = document.querySelector("#flange");
            $(flange).empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }
            else if (!timeLim) {
                return alert('Пропущено время рабочего хода');
            }
            else if (!scheme) {
                return alert('Пропущена схема');
            }

            flange.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', execution, upLim, vPower, timeLim, scheme],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(flange).append(new Option(item))
                    }
                    );
                })
        }
        flangeSelectCreate();
    });

    // ПРОГРУЗКА ТИПА СИЛОВОГО ПИТАНИЯ 
    $('#flange').on('change', function (e) {
        let execution = $("input[name='execution']:checked").val();
        let scheme = $("input[name='constructive-scheme']:checked").val();

        if (scheme == undefined) { return alert('Пропущена схема'); }
        function PowerTypeSelectCreate() {
            let vPower = document.getElementById('vPower').value;
            let upLim = document.querySelector("#upper-limit").value;
            let select = document.querySelector("#powerType");
            let timeLim = document.querySelector("#time-limit").value;
            let scheme = $("input[name='constructive-scheme']:checked").val();
            let flange = document.querySelector("#flange").value;
            $(select).empty();

            if (!upLim) {
                return alert('Пропущен верхний предел');
            }
            else if (!timeLim) {
                return alert('Пропущено время рабочего хода');
            }
            else if (!scheme) {
                return alert('Пропущена схема');
            }
            else if (!flange) {
                return alert('Пропущен фланец');
            }

            select.innerHTML = '<option value="" disabled selected>Выберите значение</option>';

            let fetchResult = [];

            fetch('https://emk.websto.pro/DBep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    a: ['ЭПН', execution, upLim, vPower, timeLim, scheme, flange],
                }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    for (i in res)
                        fetchResult.push(res[i]);
                    // fetchResult[0].sort((a, b) => a - b);
                    $.each(fetchResult[0], function (key, item) {
                        $(select).append(new Option(item, item))
                        if (fetchResult[0].length == 1) {
                            select.selectedIndex = 1;
                            $('#powerType').trigger('change');
                        };
                    }
                    );
                })
        }
        PowerTypeSelectCreate();
    });

    // Ограничение блоков по вольтажу
    $('#powerType').on('change', function (e) {
        if (document.querySelector("#powerType").value == '24B') {
            $('#buVe').hide();
            $('#buVe1').hide();
        }
        else {
            $('#buVe').show();
            $('#buVe1').show();
        }

        cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        if (cur_constructive_scheme == '0') {
            $("#buVe").hide();
        }
        else {
            $("#buVe").show();
        }
    })

    // ОГРАНИЧЕНИЕ ПО IP КЛИМАТИЧЕСКИХ УСЛОВИЙ
    $('#climatic-modification').on('change', function () {
        if (document.querySelector("#climatic-modification").value == '4' || document.querySelector("#climatic-modification").value == '5' || document.querySelector("#climatic-modification").value == '6') {
            $('#ip67div').hide();
            document.querySelector("#protection-1").checked = false;
        }
        else {
            $('#ip67div').show();
        };
    });

    // ОГРАНИЧЕНИЕ 3 КАБЕЛЕЙ ОТ ИСПОЛНЕНИЯ
    $('#executionWrapLegend').on('change', function () {
        if (document.querySelector("#В-execute").checked) {
            $('#connection3').prop('checked', false);
            $('#connection3div').hide();
        }
        else {
            $('#connection3div').show();
        }
    });

    $('#electricityField').on('change', function () {
        let scheme = $("input[name='constructive-scheme']:checked").val();
        // СТАНДАРТЫ КАБЕЛЕЙ 
        if (document.querySelector("#connection-1").checked || document.querySelector("#connection-3").checked) {
            if (scheme == '0' || scheme == '1' || scheme == '11' || scheme == '12') {
                $('#standartField').show();
                $('#standart').val('С кабельными вводами под кабели диаметром 6...12 мм.');
            }
            else if (scheme == '2' || scheme == '3' || scheme == '31' || scheme == '32') {
                $('#standartField').show();
                $('#standart').val('С кабельными вводами под кабели диаметром 12...18 мм.');
            }
            else {
                $('#standartField').hide();
                $('#standart').val('');
            }
        } else {
            $('#standartField').hide();
            $('#standart').val('');
        }
    });

    $('#schemeFieldSet').on('change', function (e) {
        cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        if (!!cur_constructive_scheme) {
            execution = $("input[name='execution']:checked").val();

            if (cur_constructive_scheme == '0') {
                $("#buVe").hide();
            }
            else {
                $("#buVe").show();
            }

            // Загрузка изображений
            $('#constructive-scheme-Epnimg')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + cheme_img['epn'][cur_constructive_scheme],
                        class: 'img-fluid',
                    })
                );

            $('#constructive-schemeFull-img')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + 'fullepn0.png',
                        class: 'img-fluid',
                    })
                );
        }
    });

    $('#workStep').on('change', function () {
        if (document.querySelector("#stroke-1").checked) {
            $('#optionsfield').hide()
        }
        else {
            $('#optionsfield').show()
        }
    })

    $('#controle-blocks-series').on('change', function (e) {
        let x6 = $('#controle-blocks-series').val();
        console.log(x6);
        if (x6 === 'ВЭ1') {
            $('#controle-blocks').val('ВЭ1');
            $('#control-block-config').hide();
            $('#control-block2-config').hide();
            $(document.querySelector('#controle-blocks')).hide();
            $("#vimuMark").show();
            $("#vimuSet").show();
            $("#vimuSet").trigger('change');
        } else if (x6 === 'М2') {
            $('#vimusumBlocks').val('');
            $('#vimucontrole-blocks').val('');
            $('#vimucontrole-blocks2').val('');
            $('#control-block2-config').hide();
            $(document.querySelector('#control-block-config')).show();
            $(document.querySelector('#controle-blocks')).hide();
            $("#vimuMark").val('');
            $("#vimuMark").hide();
            $("#vimuSet").hide();
        } else if (x6 === 'ВЭ') {
            $('#vimusumBlocks').val('');
            $('#vimucontrole-blocks').val('');
            $('#vimucontrole-blocks2').val('');
            $(document.querySelector('#control-block-config')).show();
            $(document.querySelector('#controle-blocks')).hide();
            $("#vimuMark").val('');
            $("#vimuMark").hide();
            $("#vimuSet").hide();
        }
    });
    $('#controle-blocks').on('change', function (e) {
        let BU = $('#controle-blocks').val();
        if (BU == 'ВЭ16') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                vimuBlock2ModalForE16.show();
            })
        }
        else if (BU == 'ВЭ18' || BU == 'ВЭ19' || BU == 'ВЭ110') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                vimuBlock2ModalOnlyE16.show();
            })
        }
        else if (BU == 'ВЭ14') {
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
            $("#control-block2-config").off('click');
            $("#control-block2-config").show();
            $("#control-block2-config").on('click', function () {
                e14e17BlockModal.show();
            })
        }
        else {
            $("#control-block2-config").hide();
            $("#controle-blocks2").val('');
            $('#control-block-fieldset').trigger('change');
        }
    });

    $('#controle-blocks-series').on('change', function (e) {
        let x6 = $('#controle-blocks-series').val();
        if (x6 == 'М2') {
            $('#controle-blocks2').val('');
            $('#sumBlocks').val($('#controle-blocks').val());
            $('#sumBlocks').show();
        }
        else if (x6 == 'ВЭ1') {
            $('#controle-blocks2').val('');
            $('#sumBlocks').val($('#controle-blocks').val());
            $('#sumBlocks').hide();
        }
        else $('#sumBlocks').show();
    });

    $('#control-block-fieldset').on('change', function (e) {
        let x6 = $('#controle-blocks-series').val();
        if (x6 == 'ВЭ1') {
            $('#vimuMark').val($('#vimumark-gen').text());
        }
    });
    // Обработка доп оснащения в чекбоксе
    $('.row').on('change', function () {
        if (document.querySelector("#PanelOption").checked) {
            document.querySelector("#bluetoothOption").checked = false;
            $("#bOptionDiv").hide();
        }
        else if (document.querySelector("#bluetoothOption").checked) {
            document.querySelector("#PanelOption").checked = false;
            $("#PanelOptionLabel").hide();
        }
        else if ($('#controle-blocks2').val() || $('#vimucontrole-blocks2').val()) {
            document.querySelector("#PanelOption").checked = false;
            $('#PanelOptionLabel').hide();
        }
        else {
            $("#bOptionDiv").show();
            $('#PanelOptionLabel').show();
        }
    })

    // Обработка доп оснащения в селекте
    $('#controle-blocks-options').on('change', function () {
        if (document.querySelector('#controle-blocks-options').value == 'X' || document.querySelector('#controle-blocks-options').value == 'Y' || document.querySelector('#controle-blocks-options').value == 'Z' || document.querySelector('#controle-blocks-options').value == 'V' || document.querySelector('#controle-blocks-options').value == 'W') {
            document.querySelector("#tOption").checked = false;
            $('#tOptionDiv').hide();
        }
        else { $('#tOptionDiv').show() }
    });

    // МАРКИРОВКА
    $(document).on('change', function (e) {

        // ДОП ОПЦИИ ДЛЯ БЛОКА
        let gOption = '';
        document.querySelector('#gOption').checked ? (gOption = document.querySelector('#gOption').value) : '';

        let tOption = '';
        document.querySelector('#tOption').checked ? (tOption = document.querySelector('#tOption').value) : '';

        let PanelOption = '';
        document.querySelector('#PanelOption').checked ? (PanelOption = document.querySelector('#PanelOption').value) : '';

        let bluetoothOption = '';
        document.querySelector('#bluetoothOption').checked ? (bluetoothOption = document.querySelector('#bluetoothOption').value) : '';

        let regOption = '';
        document.querySelector('#regOption').checked ? (regOption = document.querySelector('#regOption').value) : '';

        let optionssetCheckBox = gOption + tOption + PanelOption + bluetoothOption + regOption;

        let mark_gen = $('#mark-gen');

        let x0 = 'ЭПН';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : '';


        let x2 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : 'X';
        switch (x2) {
            case 'X':
                $("input[name='execution']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='execution']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='execution']").closest('fieldset').removeClass('noReqValue');
                $("input[name='execution']").closest('fieldset').addClass('ReqValueOk');
        }

        let x3 = document.querySelector("#flange").value != '' ? document.querySelector("#flange").value : 'X'; // Тип присоединения к арматуре
        switch (x3) {
            case 'X':
                $('#flange').closest('fieldset').removeClass('ReqValueOk');
                $('#flange').closest('fieldset').addClass('noReqValue');
                break;
            default:
                if (x3.includes('А')) {
                    x3 = 'А';
                }
                else if (x3.includes('М')) {
                    x3 = 'М';
                }
                $('#flange').closest('fieldset').removeClass('noReqValue');
                $('#flange').closest('fieldset').addClass('ReqValueOk');
        }
        let x4 = $('#upper-limit').val() ? $('#upper-limit').val() : 'X';
        switch (x4) {
            case 'X':
                ($('#upper-limit')).closest('fieldset').removeClass('ReqValueOk');
                ($('#upper-limit')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#upper-limit')).closest('fieldset').removeClass('noReqValue');
                ($('#upper-limit')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#time-limit').val() ? $('#time-limit').val() : 'X';
        switch (x5) {
            case 'X':
                ($('#time-limit')).closest('fieldset').removeClass('ReqValueOk');
                ($('#time-limit')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#time-limit')).closest('fieldset').removeClass('noReqValue');
                ($('#time-limit')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $('#controle-blocks').val() ? $('#controle-blocks').val() : 'X';
        switch (x6) {
            case 'X':
                ($('#controle-blocks')).closest('fieldset').removeClass('ReqValueOk');
                ($('#controle-blocks')).closest('fieldset').addClass('noReqValue');
                break;
            case 'ВЭ1':
                if (document.querySelector("#vimuMark").value == '') {
                    ($('#controle-blocks')).closest('fieldset').removeClass('ReqValueOk');
                    ($('#controle-blocks')).closest('fieldset').addClass('noReqValue');
                    break;
                }
            default:
                ($('#controle-blocks')).closest('fieldset').removeClass('noReqValue');
                ($('#controle-blocks')).closest('fieldset').addClass('ReqValueOk');
        }


        // ПЕРЕНАЗНАЧЕНИЕ ЗНАЧЕНИЯ В МАРКИРОВКУ
        let x7 = rebuildX7();

        function rebuildX7() {
            let x7check = document.querySelector("#powerType").value;
            switch (x7check) {
                case ('220 В 1 фаз(а/ы)'):
                    return '1';
                case ('220 В 3 фаз(а/ы)'):
                    return '3';
                case ('380 В 3 фазы'):
                    return '3';
                case ('24 В'):
                    return '6';
                default:
                    return 'X';
            }
        }

        switch (x7) {
            case 'X':
                ($(document.querySelector("#powerType"))).closest('fieldset').removeClass('ReqValueOk');
                ($(document.querySelector("#powerType"))).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($(document.querySelector("#powerType"))).closest('fieldset').removeClass('noReqValue');
                ($(document.querySelector("#powerType"))).closest('fieldset').addClass('ReqValueOk');
        }

        let x8 = $('#climatic-modification').val() ? $('#climatic-modification').val() : 'X';
        switch (x8) {
            case 'X':
                ($('#climatic-modification')).closest('fieldset').removeClass('ReqValueOk');
                ($('#climatic-modification')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#climatic-modification')).closest('fieldset').removeClass('noReqValue');
                ($('#climatic-modification')).closest('fieldset').addClass('ReqValueOk');
        }

        let x9 = $("input[name='stroke']:checked").val() ? $("input[name='stroke']:checked").val() : 'X';
        switch (x9) {
            case 'X':
                ($("input[name='stroke']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='stroke']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='stroke']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='stroke']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $("input[name='protection']:checked").val() ? $("input[name='protection']:checked").val() : 'X';
        switch (x10) {
            case 'X':
                ($("input[name='protection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='protection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='protection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='protection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x11 = $("input[name='color']:checked").val() ? $("input[name='color']:checked").val() : 'X';
        if ($("input[name='color']:checked").val() == '1' || document.querySelector('#ralColor').value != '') {
            $("input[name='color']").closest('fieldset').removeClass('noReqValue');
            $("input[name='color']").closest('fieldset').addClass('ReqValueOk');
        } else {
            $("input[name='color']").closest('fieldset').removeClass('ReqValueOk');
            $("input[name='color']").closest('fieldset').addClass('noReqValue');
        }

        let x12 = $("input[name='connection']:checked").val() ? $("input[name='connection']:checked").val() : 'X';
        switch (x12) {
            case 'X':
                ($("input[name='connection']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='connection']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='connection']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='connection']")).closest('fieldset').addClass('ReqValueOk');
        }

        let special1 = document.querySelector("#specialForEpn-1").checked ? document.querySelector("#specialForEpn-1").value : '';
        let special2 = document.querySelector("#specialForEpn-А").checked ? document.querySelector("#specialForEpn-А").value : '';
        let specialSum = special1 + special2;
        let x13 = specialSum ? '-' + specialSum : '';

        let secondBlock = document.querySelector("#controle-blocks2").value ? '/' + document.querySelector("#controle-blocks2").value : '';

        document.querySelector("#sumBlocks").value = x6 + secondBlock;

        let x15 = document.querySelector("#vimuMark").value ? '/' + document.querySelector("#vimuMark").value : '';

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';


        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13].includes('X');

        mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + secondBlock + optionssetCheckBox + optForBu + '/' + x7 + '-' + x8 + '-' + x9 + '-' + x10 + x11 + x12 + x13 + x15);

        // modal_button.toggle(!is_true);
        mark_gen.toggleClass('is-invalid', is_true).toggleClass('is-valid', !is_true);

        if (!is_true) {
            $('#download').show();
        }
        else {
            $('#download').hide();
        }
    });

    // Обработка доп полей кабелей
    $('#cabelsTypeField').on('change', function () {
        if (document.querySelector("#protCabel").checked) {
            $("#protCabelDiv").show();
        }
        else {
            $("#protCabelInput").val('');
            $("#protCabelNum").val('');
            $("#protCabelDiv").hide();
        }

        if (document.querySelector("#metal").checked) {
            $("#metalDiv").show();
        }
        else {
            $("#metalInput").val('');
            $("#metalNum").val('');
            $("#metalDiv").hide();
        }

        if (document.querySelector("#protectMetal").checked) {
            $("#protectMetalDiv").show();
        }
        else {
            $("#protectMetalInput").val('');
            $("#protectMetalNum").val('');
            $("#protectMetalDiv").hide();
        }

        if (document.querySelector("#stubs").checked) {
            $("#stubsDiv").show();
        }
        else {
            $("#stubsNum").val('');
            $("#stubsDiv").hide();
        }

    })

    $('#download').on('click', function () {
        // Обработка пропусков
        if ($("input[name='constructive-scheme']:checked").val() == undefined) {
            goTo = document.querySelector("#schemeFieldSet");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрана конструктивная схема')
        } else if ($("#flange").val() == undefined) {
            goTo = document.querySelector("#flange");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран фланец')
        } else if ($("#upper-limit").val() == undefined) {
            goTo = document.querySelector("#upper-limit");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран верхний предел крутящего момент')
        } else if ($("#time-limit").val() == undefined) {
            goTo = document.querySelector("#time-limit");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбрано время рабочего хода')
        }
        else if ($("#powerType").val() == undefined) {
            goTo = document.querySelector("#powerType");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Не выбран тип силового электропитания')
        } else if (document.querySelector("#organization").value == '') {
            goTo = document.querySelector("#organization");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено название организации')
        }
        else if (document.querySelector("#fio").value == '') {
            goTo = document.querySelector("#fio");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено контактное лицо')
        }
        else if (document.querySelector("#phone").value == '') {
            goTo = document.querySelector("#phone");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен телефон')
        }
        else if (document.querySelector("#numbersOfEp").value == '') {
            goTo = document.querySelector("#numbersOfEp");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущено кол-во')
        }
        else if (document.querySelector("#email").value == '') {
            goTo = document.querySelector("#email");
            goTo.scrollIntoView({ block: "center", behavior: "smooth" });
            return alert('Пропущен email')
        };


        let firstBuMark = document.querySelector("#controle-blocks2").value;
        let secondBuMark = document.querySelector("#controle-blocks2").value;
        let BoMark = document.querySelector("#controle-blocks-series").value;
        let vbu = document.querySelector("#vimucontrole-blocks").value;

        let optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';
        let voptForBu = $('#vimucontrol-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';

        // ДОП ОПЦИИ
        let addOptionG = document.querySelector("#gOption").checked ? 'Графический дисплей; ' : '';
        let addOptionT = document.querySelector("#tOption").checked ? 'Твердотельный пускатель; ' : '';
        let addOptionP = document.querySelector('#PanelOption').checked ? 'Механический селектор переключения режима работы местн./дист.; ' : '';
        let addOptionB = document.querySelector("#bluetoothOption").checked ? 'Канал связи "Bluetooth; ' : '';
        let addOptionR = document.querySelector("#regOption").checked ? 'Регистратор параметров состояния и конфигурации привода' : '';
        let addOption180 = document.querySelector('#upTo180f').checked ? 'Рабочий ход до 180 градусов; ' : ' ';
        let addOptions = addOptionG + addOptionT + addOptionP + addOptionB + addOptionR + addOption180;
        // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // json0
        let j00 = document.querySelector('#organization').value; //Фирма
        let j01 = document.querySelector('#fio').value; // Фио
        let j02 = document.querySelector('#phone').value; // Телефон
        let j03 = document.querySelector('#email').value; // email
        let j04 = document.querySelector('#numbersOfEp').value; // кол-во
        let j05 = ''; //цена
        // json0 = [j00, j01, j02, j03, j04, j05];

        //json1
        let j10 = 'Электроприводы неполноповоротные ЭПН'; //тип арматуры
        let j11 = document.querySelector('#mark-gen').innerText; //маркировка
        let j12 = 'АО Тулаэлектропривод'; //завод
        let j13 = 'частота вращения'; // частота вращения
        let j14 = document.querySelector("#upper-limit").value; //Максимальный крутящий момент
        let j15 = document.querySelector('#flange').value; //присоединение к приводу
        let j16 = ''; // установка
        let j17 = document.querySelector("#time-limit").value; //время закрытия
        let j18 = $("input[name='constructive-scheme']:checked").val(); // конструктивная схема
        let j19 = $("input[name='stroke']:checked").closest('.form-check').find('.form-check-label').text() + ' ' + 'градусов'; // оборотов на закрытие
        // json1 = [j10, j11, j12, j13, j14, j15, j16, j17, j18];

        //json2
        let j20 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text(); //исполнение по назначению
        let j21 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //режим работы
        let j22 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text(); //Влагозащита
        let j23 = 'Закрывание по часовой стрелке'; //Вращение вых вала
        let j24 = $('#climatic-modification option:selected').text(); //Температура
        // json2 = [j20, j21, j22, j23, j24];

        //json3

        let j30 = $('#vimusumBlocks').val() ? document.querySelector("#sumBlocks").value + ' ' + '(' + $('#vimusumBlocks').val() + ')' : document.querySelector("#sumBlocks").value; // тип бу 
        let j31 = checkSecondCommandBlock() ? 'Основная плата: ' + checkCommandBlock() + '; ' + checkSecondCommandBlock() : checkCommandBlock(); // Тип управления
        let j32 = selectRemoteSignal();// сигналы дист управления

        let j33 = ''; //Тип БКВ
        if (BoMark == 'М2') {
            j33 = 'МБКВ';
        }
        else if (BoMark == 'ВЭ1' || BoMark == 'ВЭ') {
            j33 = 'ВИМУ';
        }

        let j34 = 'Есть'; //Механический указатель;

        let j35 = selectPositionSignalSecondCommandBlock() ? 'Основная плата: ' + selectPositionSignal() + '; ' + selectPositionSignalSecondCommandBlock() : selectPositionSignal(); // Сигнализация положения

        let j36 = ''; // Сигнал момэнт
        if ((firstBuMark == 'ВЭ13' || firstBuMark == 'ВЭ15' || firstBuMark == 'ВЭ17') || (vbu == 'ВЭ13' || vbu == 'ВЭ15' || vbu == 'ВЭ17')
            || (secondBuMark == 'ВЭ13' || secondBuMark == 'ВЭ15' || secondBuMark == 'ВЭ17')) {
            j36 = 'Есть';
        }
        else {
            j36 = 'Отсутствует';
        }

        let j37 = ''; // Дублирование RS485
        if ((firstBuMark == 'ВЭ18' || firstBuMark == 'ВЭ110' || firstBuMark == 'ВЭ24' || firstBuMark == 'ВЭ26') || (vbu == 'ВЭ18' || vbu == 'ВЭ110' || vbu == 'ВЭ24' || vbu == 'ВЭ26') || (secondBuMark == 'ВЭ18' || secondBuMark == 'ВЭ110' || secondBuMark == 'ВЭ24' || secondBuMark == 'ВЭ26')) { j37 = 'Есть' }
        else { j37 = 'Отсутствует' };

        let j38 = 'Одиночные';
        if (optForBu == 'Z' || optForBu == 'W' || voptForBu == 'Z' || voptForBu == 'W' || document.querySelector("#controle-blocks") == 'М21') { j38 = 'Сдвоенные' }; // Промежуточные выключатели

        let j39 = 'Одиночные'; // Моментные выключатели
        if (optForBu == 'Z' || optForBu == 'W' || voptForBu == 'Z' || voptForBu == 'W') { j39 = 'Сдвоенные' }; // Моментные выключатели

        let j310 = 'Одиночные'; // Концевые выключатели
        if (optForBu == 'Z' || optForBu == 'W' || voptForBu == 'Z' || voptForBu == 'W' || document.querySelector("#controle-blocks") == 'М25') { j310 = 'Сдвоенные' }; // Концевые выключатели

        let j311 = ''; // Монтаж БУ
        if (BoMark == 'ВЭ1') {
            j311 = 'Выносной';
        } else {
            j311 = 'На приводе';
        };
        // json3 = [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311];

        // Кабели
        let connectionCableType = (document.querySelector("#protCabelNum").value ? 'Бронированный кабель, кол-во: ' + document.querySelector("#protCabelNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protCabelInput").value + 'мм.; ' : '') +
            (document.querySelector("#metalNum").value ? 'Кабель под металлорукавом, кол-во: ' + document.querySelector("#metalNum").value + 'шт.' + ' Диаметр металлорукава: ' + document.querySelector("#metalInput").value + 'мм.; ' : '') +
            (document.querySelector("#protectMetalNum").value ? 'Кабель под бронированным в металлорукаве, кол-во: ' + document.querySelector("#protectMetalNum").value + 'шт.' + ' Диаметр по броне: ' + document.querySelector("#protectMetalInput").value + 'мм.; ' : '') +
            (document.querySelector("#stubsNum").value ? 'Заглушки, кол-во: ' + document.querySelector("#stubsNum").value + 'шт.;' : '');
        // Доп требования
        let addReq = document.querySelector('#addReqarea').value ? document.querySelector('#addReqarea').value + '; ' : '';
        //json4
        let j40 = $("input[name='connection']:checked").val(); //Электрическое подключение (обозначение)
        let j41 = ''; //Защитный колпак
        let j42 = document.querySelector("#color-1").checked ? 'Серый' : document.querySelector("#ralColor").value; //Цвет
        let j43 = ''; //Механический селектор
        let j44 = addOptions;//Доп опции 
        let j45 = connectionCableType ? addReq + 'Требования по кабелям: ' + connectionCableType : addReq; //Дополнительные требования
        // json4 = [j40, j41, j42, j43, j44, j45];

        //json5
        let j50 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text(); //Назначение по режиму работы
        let j51 = $("input[name='connection']:checked").closest('.form-check').find('.form-check-label').text(); //Электрическое подключение (расшифровка)
        let j52 = 'SIL-3'; // SIL

        let special1 = document.querySelector("#specialForEpn-1").checked ? $("#specialForEpn-1").closest('.form-check').find('.form-check-label').text() + '; ' : '';
        let special2 = document.querySelector("#specialForEpn-А").checked ? $("#specialForEpn-А").closest('.form-check').find('.form-check-label').text() : '';
        let specialSumText = special1 + special2;
        let j53 = specialSumText ? specialSumText : 'Нет специального исполнения'; //Специальное исполнение
        let j54 = ''; //Масса
        // json5 = [j50, j51, j52, j53, j54];

        //json6
        let j60 = '?'; //Номинальное давление
        let j61 = 'Присоединение для фланцев из ряда F07...F40';//Тип присоединения выходного вала
        let j62 = '?'; //Кабельные вводы
        let j63 = '?'; //Штепсельные разъемы
        let j64 = '?'; //Тип подводимых кабелей
        let j65 = document.querySelector("#powerType").value;

        // json6 = [j60, j61, j62, j63];
        //json7
        let j70 = '';//Защита от коррозии
        let j71 = '';//Ручной маховик
        let j72 = '';//Наличие обогрев
        let j73 = '';//Наличие типа функции
        let j74 = '';//Функция при питании
        let j75 = ''; //Условие для запуска функции
        // json7 = [j70, j71, j72, j73, j74, j75];

        console.log([j00, j01, j02, j03, j04, j05],
            [j10, j11, j12, j13, j14, j15, j16, j17, j18, j19],
            [j20, j21, j22, j23, j24],
            [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311],
            [j40, j41, j42, j43, j44, j45],
            [j50, j51, j52, j53, j54],
            [j60, j61, j62, j63, j64, j65],
            [j70, j71, j72, j73, j74, j75]);


        function DOCX(id, name, mark) {
            window.open(`https://emk.websto.pro/Tula/${id + '/' + name + '/' + mark}`);
        }
        function EXEL(id, name, mark) {
            window.open(`https://emk.websto.pro/TulaEXEL/${id + '/' + name + '/' + mark}`);
        }
        function allInPdf(id, name, mark) {
            window.open(`https://emk.websto.pro/TulaPDF/${id + '/' + name + '/' + mark}`);
        }
        function sendToServer() {
            let post = fetch('https://emk.websto.pro/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({
                    jsn0: [j00, j01, j02, j03, j04, j05],
                    jsn1: [j10, j11, j12, j13, j14, j15, j16, j17, j18, j19],
                    jsn2: [j20, j21, j22, j23, j24],
                    jsn3: [j30, j31, j32, j33, j34, j35, j36, j37, j38, j39, j310, j311],
                    jsn4: [j40, j41, j42, j43, j44, j45],
                    jsn5: [j50, j51, j52, j53, j54],
                    jsn6: [j60, j61, j62, j63, j64, j65],
                    jsn7: [j70, j71, j72, j73, j74, j75],
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    let mark = data.mark;
                    let id = data.id;
                    let name = data.name;
                    DOCX(id, name, mark);
                    EXEL(id, name, mark);
                    allInPdf(id, name, mark);
                });
        }
        sendToServer();
    });

    // сокрытия пункта Ral
    $('#colorType').on('change', function (e) {
        if (document.querySelector('#color-2').checked) {
            document.querySelector('#ralDiv').classList.remove('none');
        } else {
            document.querySelector('#ralDiv').classList.add('none');
            document.querySelector('#ralColor').value = '';
        }
    });

    // Сертификаты и декларации
    $('#execution-wrap').on('change', function (e) {
        if (document.querySelector("#Н-execute").checked) {
            $('#declarationEpn').show();
            $('#declarationEpnV').hide();
            $('#certEpnV').hide();
        }
        else {
            $('#declarationEpn').hide();
            $('#declarationEpnV').show();
            $('#certEpnV').show();
        }
    });

    let m2BlockModal = new bootstrap.Modal($('#block-configure-m2'));
    let vimuBlockModal = new bootstrap.Modal($('#block-configure-e1'));
    let e2BlockModal = new bootstrap.Modal($('#block-configure-e2'));
    let vimuBlock2ModalForE16 = new bootstrap.Modal($('#addNewBlock'));
    let vimuBlock2ModalOnlyE16 = new bootstrap.Modal($('#addNewBlockE16'));

    let e14e17BlockModal = new bootstrap.Modal($('#block-configure-e14e17'));


    // Кнопки в таблицу
    $('#m1-form').on('change', function (e) {
        let mod = 0;
        $.each($('#m1-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        });
        let up = $('#upper-limitForM1').val() ? $('#upper-limitForM1').val() : '';

        $('.cur-m1-value')
            .text('М1' + mod + '.' + up)
            .val('М1' + mod + '.' + up);
    });

    $('#clear-m1').on('click', function (e) {
        $('#m1-form')[0].reset();
        $('.cur-m1-value').text('М10').val('M10');
    });

    $('#m1-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-m1-value').val()).trigger('change');
        m1BlockModal.hide();
    });

    $('#m2Full').on('change', function (e) {
        let d3 = '';
        let mod = 0;
        $.each($('#m2-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        })
        d3 = document.querySelector("#d3").checked ? 'М' : '';

        $('.cur-m2-value')
            .text('М2' + mod + d3)
            .val('М2' + mod + d3);
    });

    $('#clear-m2').on('click', function (e) {
        $('#m2-form')[0].reset();
        $('.cur-m2-value').text('М20').val('М20');
    });

    $('#m2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-m2-value').val()).trigger('change');
        m2BlockModal.hide();
    });

    $('#e1-submit').on('click', function (e) {
        $('#controle-blocks').val($('input.cur-execution-value').val()).trigger('change');
        vimuBlockModal.hide();
    });
    $('#AddNewsubmit').on('click', function (e) {
        console.log('privet');
        $('#controle-blocks2').val($('input.cur-execution2-value').val()).trigger('change');
        vimuBlock2ModalForE16.hide();
    });
    $('#AddNewsubmitE16').on('click', function (e) {
        console.log('privet');
        $('#controle-blocks2').val($('input.cur-executionE16-value').val()).trigger('change');
        vimuBlock2ModalOnlyE16.hide();
    });
    $('#AddNewClear').on('click', function (e) {
        vimuBlock2ModalForE16.hide();
        $('#controle-blocks2').val('');
        $(document).trigger('change')
    });
    $('#AddNewClearE16').on('click', function (e) {
        vimuBlock2ModalOnlyE16.hide();
        $('#controle-blocks2').val('');
        $(document).trigger('change')
    });

    $("#e14e17-submit").on("click", function (e) {
        $("#controle-blocks2").val($('.cur-e14e17xecution-value').text()).trigger("change");
        e14e17BlockModal.hide();
    });

    $('#e14e17Clear').on('click', function (e) {
        $('#controle-blocks2').val('');
        e14e17BlockModal.hide();
        $('#control-block-fieldset').trigger('change');
    });

    $('#e2-form input').on('change', function (e) {
        let mod = $("input[name='e2']:checked").val();
        $('.cur-e2-value').text(mod).val(mod);
    });

    $('#clear-e2').on('click', function (e) {
        $('#e2-form')[0].reset();
        $('.cur-e2-value').text('E21').val('E21');
    });

    $('#e2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-e2-value').val()).trigger('change');
        e2BlockModal.hide();
    });


    $('#control-block-config').on('click', function (e) {
        let cbs = $('#controle-blocks-series').val();
        if (cbs === 'М2') {
            m2BlockModal.show();
        } else if (cbs === 'ВЭ') {
            vimuBlockModal.show();
        } else if (cbs === 'ВЭ1') {
            $('#vimuModal').show();
        }
    });

    $('#controle-blocks-series').on('change', function (e) {
        let cbs = $('#controle-blocks-series').val();
        let cb = $('#controle-blocks');
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1' || cbs === 'М2') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });

    // стиль для режима работы
    $('.timeMode').on('change', function (e) {
        if ($("input[name='working-mode']:checked")) {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');

        }
    });

    // стиль для силового электропитания
    $('.power-type-wrap').on('change', function (e) {
        if (document.querySelector("#powerType").value !== '') {
            document.querySelector('.timeMode').classList.add('ReqValueOk');
            document.querySelector('.timeMode').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.timeMode').classList.add('noReqValue');
            document.querySelector('.timeMode').classList.remove('ReqValueOk');

        }
    });

    // стиль для кол-ва
    $('#numbersOfEp').on('keyup', function (e) {
        if (document.querySelector('#numbersOfEp').value !== '') {
            $('#step-9').trigger('change');
            document.querySelector('.numbersOfEp').classList.add('ReqValueOk');
            document.querySelector('.numbersOfEp').classList.remove('noReqValue');
        } else {
            document.querySelector('.numbersOfEp').classList.add('noReqValue');
            document.querySelector('.numbersOfEp').classList.remove('ReqValueOk');
        }
    });

    // СТИЛЬ ДЛЯ ПОЛЯ С ДАННЫМИ
    $('.persInfo').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '') {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {
            document.querySelector('.persInfo ').classList.remove('ReqValueOk');
            document.querySelector('.persInfo ').classList.add('noReqValue');
        }
    });

    // СТИЛЬ ДЛЯ ПОЛЯ Со схемами
    $('№schemeFieldSet').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '') {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {
            document.querySelector('.persInfo ').classList.remove('ReqValueOk');
            document.querySelector('.persInfo ').classList.add('noReqValue');
        }
    });

    // Тип блока концевых выключателей
    $('.typeEndSwich').on('change', function (e) {
        if (document.querySelector("#typeEndSwich-1").checked || document.querySelector("#typeEndSwich-2").checked) {
            document.querySelector('.typeEndSwich').classList.add('ReqValueOk');
            document.querySelector('.typeEndSwich').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.typeEndSwich').classList.add('noReqValue');
            document.querySelector('.typeEndSwich').classList.remove('ReqValueOk');
        }
    });

    // Тип блока управления привода
    $('.commandBlockType').on('change', function (e) {
        if (document.querySelector("#commandBlockType-1").checked || document.querySelector("#commandBlockType-2").checked) {
            document.querySelector('.commandBlockType').classList.add('ReqValueOk');
            document.querySelector('.commandBlockType').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.commandBlockType').classList.add('noReqValue');
            document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
        }
    });

    // Сигнализация положения
    $('.signal').on('change', function (e) {
        if (document.querySelector("#signal").value != '') {
            document.querySelector('.signal').classList.add('ReqValueOk');
            document.querySelector('.signal').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.signal').classList.add('noReqValue');
            document.querySelector('.signal').classList.remove('ReqValueOk');
        }
    });

    // Сигналы дист управления 
    $('.commandSignal').on('change', function (e) {
        if (document.querySelector("#commandSignal").value != '') {
            document.querySelector('.commandSignal').classList.add('ReqValueOk');
            document.querySelector('.commandSignal').classList.remove('noReqValue');
        }
        else {
            document.querySelector('.commandSignal').classList.add('noReqValue');
            document.querySelector('.commandSignal').classList.remove('ReqValueOk');
        }
    });

    // Открытие доп оснащения для блока управления при ВЭ
    $('#control-block-fieldset').on('change', function (e) {
        if ($('#controle-blocks-series').val() == 'ВЭ') {
            document.querySelector('#control-block-optionsset').style.display = 'block';
            document.querySelector('#control-block-optionssetCheckBox').style.display = 'block';
        } else {
            $('#controle-blocks-options').val('noValue');
            document.querySelector('#PanelOption').checked = false;
            document.querySelector('#tOption').checked = false;
            document.querySelector('#bluetoothOption').checked = false;
            document.querySelector('#regOption').checked = false;
            document.querySelector('#gOption').checked = false;
            document.querySelector('#control-block-optionsset').style.display = 'none';
            document.querySelector('#control-block-optionssetCheckBox').style.display = 'none';
            document.querySelector('#control-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.add('noReqValue');
        }
    });

    // стили доп опций для бу 
    $('#control-block-optionsset').on('change', function (e) {
        if ($('#controle-blocks-options option:selected').val() !== 'noValue') {
            document.querySelector('#control-block-optionsset').classList.add('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.remove('noReqValue');
        } else {
            document.querySelector('#control-block-optionsset').classList.remove('ReqValueOk');
            document.querySelector('#control-block-optionsset').classList.add('noReqValue');
        }
    });

    // Обработка конфигуратура БУ
    function checkCommandBlock() {
        let m1 = document.querySelector('#m2-1').checked ? 'Сигнализация о двух промежуточных положениях выходного вала посредством двух путевых (промежуточных) выключателей.; ' : '';
        let m2 = document.querySelector('#m2-2').checked ? 'Сигнализация о текущем положении выходного вала посредством изменения сопротивления потенциометра. Настройка на ноль сопротивления потенциометра обратной связи.; ' : '';
        let m3 = document.querySelector('#m2-3').checked ? 'Сигнализация о текущем положении выходного вала посредством токового сигнала (4–20 мА), изменяющегося пропорционально пути, пройденному выходным валом привода. Настройка токового сигнализатора положения.; ' : '';
        let m4 = document.querySelector("#d3").checked ? 'Микровыключатели Д3031; ' : '';
        let base = document.querySelector('#controle-blocks').value;
        switch (base) {

            case 'М20':
                return 'Базовый набор функций привода с блоком серии М2';
            case 'М20М':
                return 'Базовый набор функций привода с блоком серии М2 + Микровыключатели Д3031';
            case 'ВЭ11':
                return 'Базовый набор функций';
            case 'ВЭ12':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'ВЭ13':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ14':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ15':
                return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
            case 'ВЭ16':
                return '1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления. 5) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
            case 'ВЭ17':
                return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ18':
                return '1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ19':
                return '1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ110':
                return '1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
            case 'ВЭ1':
                if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ11')) { return 'Базовый набор функций'; }
                else if (document.querySelector("#vimucontrole-blocks").value.includes('ВЭ12')) {
                    return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ13')) {
                    return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ14')) {
                    return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ15')) {
                    return '1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ16')) {
                    return '1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ17')) {
                    return '1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ18')) {
                    return '1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ19')) {
                    return '1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                }
                else if (document.querySelector("#vimucontrole-blocks").value == ('ВЭ110')) {
                    return '1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                }

            default:
                console.log(base);
                return (g6 = m1 + m2 + m3 + m4);
        }
    }

    // Обработка типа второго блока
    function checkSecondCommandBlock() {
        if (document.querySelector('#controle-blocks').value == 'ВЭ1') {
            let secondBlock = document.querySelector("#vimucontrole-blocks2").value;
            switch (secondBlock) {
                case 'ВЭ11':
                    return ' Дополнительная плата: Базовый набор функций';
                case 'ВЭ12':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
                case 'ВЭ13':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                case 'ВЭ14':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ15':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                case 'ВЭ16':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ17':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ18':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ19':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ110':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                default:
                    return '';
            }
        }
        else {
            let base = document.querySelector('#controle-blocks2').value;
            switch (base) {
                case 'ВЭ11':
                    return ' Дополнительная плата: Базовый набор функций';
                case 'ВЭ12':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)';
                case 'ВЭ13':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                case 'ВЭ14':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ15':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Диагностирование отказов опциональных модулей.  3)Автоматический выбор активного интерфейса дистанционного управления.  4) Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  5)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).';
                case 'ВЭ16':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  3)Диагностирование отказов опциональных модулей.  4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ17':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Передача информации о положении выходного звена привода посредством токового сигнала (4–20 мА)  3)Передача текущего значения движущего момента на выходном звене привода посредством токового сигнала (4–20 мА).  4) Аналоговое управление приводом — прием от дистанционного пульта и отработка токового сигнала (4–20 мА) задания положения выходного звена привода с контролем наличия связи  5) Диагностирование отказов опциональных модулей.  6)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ18':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление и настройка привода с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — MODBUS RTU  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ19':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                case 'ВЭ110':
                    return ' Дополнительная плата: 1)Базовый набор функций 2)Цифровое управление приводом с дублированием каналов связи посредством цифрового канала связи, интерфейс RS485, протокол обмена — PROFIBUS DP.  3)Диагностирование отказов опциональных модулей.   4)Автоматический выбор активного интерфейса дистанционного управления.';
                default:
                    return '';
            }
        }
    }

    //ДИСТ и МЕСТНЫЕ СИГНАЛЫ
    function selectRemoteSignal() {
        let BoMark = document.querySelector("#controle-blocks-series").value;
        optForBu = $('#control-block-optionsset option:selected').val() != 'noValue' ? $('#control-block-optionsset option:selected').val() : '';
        voptForBu = $('#vimucontrol-block-optionsset option:selected').val();

        if (BoMark == 'ВЭ') {
            if (optForBu == 'X') {
                return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            if (optForBu == 'Y') {
                return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
            if (optForBu == 'Z') {
                return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
            if (optForBu == 'V') {
                return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            if (optForBu == 'W') {
                return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            else {
                return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
        }
        else if (BoMark == 'ВЭ1') {
            if (voptForBu == 'X') {
                return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            if (voptForBu == 'Y') {
                return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
            if (voptForBu == 'Z') {
                return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
            if (voptForBu == 'V') {
                return remoteSignal = 'Привод с восемью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            if (voptForBu == 'W') {
                return remoteSignal = 'Привод с двенадцатью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 220 В;'
            }
            else {
                return remoteSignal = 'Привод с шестью сигнальными реле и дискретным управлением с использованием пятиканальной линии связи 24 В;'
            }
        }
        else {
            return remoteSignal = 'Сигналы дистанционного управления: только для ЭИМУ или ВИМУ';
        }
    }

    function selectPositionSignal() {
        let BoMark = document.querySelector("#controle-blocks").value;
        if (BoMark == 'ВЭ1') {
            vimublock = document.querySelector("#vimucontrole-blocks").value;
            if (vimublock == 'ВЭ11') {
                return positionSignal = 'Отсутствуют';
            }
            else if (vimublock == 'ВЭ12' || vimublock == 'ВЭ13' || vimublock == 'ВЭ16' || vimublock == 'ВЭ17') {
                return positionSignal = '4–20 мА';
            }
            else if (vimublock == 'ВЭ14' || vimublock == 'ВЭ18') {
                return positionSignal = 'RS485 Modbus';
            }
            else if (vimublock == 'ВЭ15') {
                return positionSignal = '4–20 мА и RS485 Modbus';
            }
            else if (vimublock == 'ВЭ19' || vimublock == 'ВЭ110') {
                return positionSignal = 'Profibus DP';
            }
        }
        else if (BoMark == 'ВЭ11') {
            return positionSignal = 'Отсутствуют';
        }
        else if (BoMark == 'ВЭ12' || BoMark == 'ВЭ13' || BoMark == 'ВЭ16' || BoMark == 'ВЭ17') {
            return positionSignal = '4–20 мА';
        }
        else if (BoMark == 'ВЭ14' || BoMark == 'ВЭ18') {
            return positionSignal = 'RS485 Modbus';
        }
        else if (BoMark == 'ВЭ15') {
            return positionSignal = '4–20 мА и RS485 Modbus';
        }
        else if (BoMark == 'ВЭ19' || BoMark == 'ВЭ110') {
            return positionSignal = 'Profibus DP';
        }
        else if (document.querySelector("#m2-2").checked) {
            return positionSignal = 'Сигнализация положения: потенциометр 100 Ом';
        }
        else if (document.querySelector("#m2-3").checked) {
            return positionSignal = 'Сигнализация положения: 4-20мА';
        }
        else {
            return positionSignal = '';
        }
    }

    // Обработка сигналов второго блока
    function selectPositionSignalSecondCommandBlock() {
        if (document.querySelector('#controle-blocks').value == 'ВЭ1') {
            let secondBlock = document.querySelector("#vimucontrole-blocks2").value;
            if (secondBlock == 'ВЭ11') {
                return positionSignal = ' Дополнительная плата: отсутствуют';
            }
            else if (secondBlock == 'ВЭ12' || secondBlock == 'ВЭ13' || secondBlock == 'ВЭ16' || secondBlock == 'ВЭ17') {
                return positionSignal = ' Дополнительная плата: 4–20 мА';
            }
            else if (secondBlock == 'ВЭ14' || secondBlock == 'ВЭ18') {
                return positionSignal = ' Дополнительная плата: RS485 Modbus';
            }
            else if (secondBlock == 'ВЭ15') {
                return positionSignal = ' Дополнительная плата: 4–20 мА и RS485 Modbus';
            }
            else if (secondBlock == 'ВЭ19' || secondBlock == 'ВЭ110') {
                return positionSignal = ' Дополнительная плата: Profibus DP';
            }
            else {
                return positionSignal = '';
            }
        }
        else {
            let BoMark = document.querySelector("#controle-blocks2").value;
            if (BoMark == 'ВЭ11') {
                return positionSignal = ' Дополнительная плата: отсутствуют';
            }
            else if (BoMark == 'ВЭ12' || BoMark == 'ВЭ13' || BoMark == 'ВЭ16' || BoMark == 'ВЭ17') {
                return positionSignal = ' Дополнительная плата: 4–20 мА';
            }
            else if (BoMark == 'ВЭ14' || BoMark == 'ВЭ18') {
                return positionSignal = ' Дополнительная плата: RS485 Modbus';
            }
            else if (BoMark == 'ВЭ15') {
                return positionSignal = ' Дополнительная плата: 4–20 мА и RS485 Modbus';
            }
            else if (BoMark == 'ВЭ19' || BoMark == 'ВЭ110') {
                return positionSignal = ' Дополнительная плата: Profibus DP';
            }
            else {
                return positionSignal = '';
            }
        }
    }

    // Обработка окна ВИМУ
    $('#closeVimuModal').on('click', function () {
        $('#vimuModal').hide();
    });

    $("#controle-blocks-series").on('change', function () {
        $("input[name='connection']:checked").prop('checked', false);
        // Открытие подключения ЕПН под ВИМУ
        let BoMark = document.querySelector("#controle-blocks-series").value;
        if (BoMark == 'ВЭ') {

            $('#classicConnect').hide();
            $('#classForVimuEpn').show();
        }
        else {
            $('#classicConnect').show();
            $('#classForVimuEpn').hide();
        }
    })

    // Открытие по шагам
    $('#step-1').on('change', function (e) {
        if ($("input[name='working-mode']:checked").val() !== undefined && $("input[name='execution']:checked").val() != undefined) {
            $('#step-2').show();
        }
    });
    $('#step-2').on('change', function (e) {
        if ($("input[name='stroke']:checked").val() !== undefined && document.querySelector('#upper-limit') != '' && document.querySelector('#time-limit').value != '') {
            $('#step-3').show();
        }
    });
    $('#step-3').on('change', function (e) {
        if ($("input[name='constructive-scheme']:checked").val() != '') {
            $('#step-4').show();
        }
    });
    $('#step-4').on('change', function (e) {
        if (document.querySelector('#flange').value && document.querySelector('#powerType').value != '') {
            $('#step-5').show();
        }
    });
    $('#step-5').on('change', function (e) {
        if (document.querySelector("#controle-blocks").value && document.querySelector("#climatic-modification").value) {
            $('#step-6').show();
        }
    });
    $('#step-6').on('change', function (e) {
        if ($("input[name='protection']:checked").val() != undefined && $("input[name='color']:checked").val() != undefined) {
            $('#step-7').show();
        }
    });
    $('#step-7').on('change', function (e) {
        if ($("input[name='connection']:checked").val() != undefined) {
            $('#step-8').show();
            $('#step-9').show();
        }
    });
    $('#step-9').on('change', function (e) {
        if (
            document.querySelector('#organization').value != '' &&
            document.querySelector('#fio').value != '' &&
            document.querySelector('#phone').value != '' &&
            document.querySelector('#email').value != '' &&
            document.querySelector('#numbersOfEp').value != ''
        ) {
            $('#step-10').show();
        }
    });

});
