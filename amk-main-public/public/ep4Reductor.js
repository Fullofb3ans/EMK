// http://www.tulaprivod.ru/dokument/sertificat/EP_4_44545atomn_2022_12.pdf
$(document).ready(function () {
    $(document).on('click', '#e1-table th, #e1-table td', function (e) {
        let target = $(this).data('target');
        let el = document.getElementById(target);
        $('.cur-execution-value').text(target).val(target);
        $('#e1-table th').removeClass('table-success');
        $(el).toggleClass('table-success');
    });

    // КОНСТАНТЫ ДЛЯ JSON
    const Rn = {
        'РН 2': {
            АК: {
                60: {
                    8: '158',
                    11: '115',
                    16: '80',
                    22: '57',
                    32: '40',
                    45: '28',
                    63: '20',
                    90: '14',
                    125: '10',
                    180: '7',
                },
            },
        },

        'РН 4': {
            АК: {
                90: {
                    180: '7',
                },
                120: {
                    4: '315',
                    5.6: '225',
                    8: '158',
                    11: '115',
                    16: '80',
                    22: '57',
                    32: '40',
                    45: '28',
                    63: '20',
                    90: '14',
                    125: '10',
                },
            },
        },

        'РН 8': {
            Б: {
                250: {
                    4: '315',
                    5.6: '225',
                    8: '158',
                    11: '115',
                    16: '80',
                    22: '57',
                    32: '40',
                    45: '28',
                    63: '20',
                    90: '14',
                    125: '10',
                    180: '7',
                },
            },
        },

        'РН 16': {
            Б: {
                400: {
                    180: '7',
                },
                500: {
                    4: '315',
                    5.6: '225',
                    8: '158',
                    11: '115',
                    16: '80',
                    22: '57',
                    32: '40',
                    45: '28',
                    90: '14',
                },
            },
        },

        'РН 32': {
            В: {
                1000: {
                    4: '315',
                    5.6: '225',
                    8: '158',
                    11: '115',
                    16: '80',
                    22: '57',
                    32: '40',
                    45: '28',
                    63: '20',
                },
            },
        },
    };

    //ЗАПОЛНЕНИЕ ДОП ИНПУТОВ РЕДУКТОРА
    $('#rn').on('change', function (e) {
        switch ($('#rn').val()) {
            case 'РН 2':
                $('#roundOut').val('890 - 2 200');
                $('#armFlange').val('F14');
                $('#roundOutMoment').val('2000');
                break;

            case 'РН 4':
                $('#roundOut').val('1780 - 4 400');
                $('#armFlange').val('F16');
                $('#roundOutMoment').val('4000');
                break;

            case 'РН 8':
                $('#roundOut').val('3 700 - 9 250');
                $('#armFlange').val('F25');
                $('#roundOutMoment').val('8000');
                break;

            case 'РН 16':
                $('#roundOut').val('7 400 - 18 500');
                $('#armFlange').val('F30');
                $('#roundOutMoment').val('16000');
                break;

            case 'РН 32':
                $('#roundOut').val('14 800 - 37 000');
                $('#armFlange').val('F35');
                $('#roundOutMoment').val('32000');
                break;
        }
    });

    //ЗАПОЛНЕНИЕ СЕЛЕКТА С РЕДУКТОРОМ
    $('.timeMode').on('change', function (e) {
        let select = $(document.querySelector('#rn'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = Rn;
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                    }
                }
            });
        });
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    $('#rn').on('change', function (e) {
        let execVal = document.querySelector('#rn').value;

        let select = $(document.querySelector('#flange'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = Rn[execVal];
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                    }
                }
            });
        });
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    $('#flange').on('change', function (e) {
        let execVal = document.querySelector('#rn').value;
        let execVal2 = document.querySelector('#flange').value;

        let select = $(document.querySelector('#upper-limit'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = Rn[execVal][execVal2];
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                    }
                }
            });
        });
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    $('#upper-limit').on('change', function (e) {
        let execVal = document.querySelector('#rn').value;
        let execVal2 = document.querySelector('#flange').value;
        let execVal3 = document.querySelector('#upper-limit').value;

        let select = $(document.querySelector('#rotation-frequency'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = Rn[execVal][execVal2][execVal3];
        let selectArr = [];
        if (!selectArr.includes(ValuesArr)) {
            selectArr.push(ValuesArr);
        }
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    $('#rotation-frequency').on('change', function (e) {
        let execVal = document.querySelector('#rn').value;
        let execVal2 = document.querySelector('#flange').value;
        let execVal3 = document.querySelector('#upper-limit').value;
        let execVal4 = document.querySelector('#rotation-frequency').value;

        let select = $(document.querySelector('#turnTime'));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = Rn[execVal][execVal2][execVal3][execVal4];
        let selectArr = [];
        if (!selectArr.includes(ValuesArr)) {
            selectArr.push(ValuesArr);
        }
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    const certs_pdf = {
        ep4: {
            Н: {
                cert: 'ep4n-cert.pdf',
                decl: 'ep4n-decl.pdf',
            },
            В: {
                cert: 'ep4v-cert.pdf',
                decl: 'ep4v-decl.pdf',
            },
        },
    };
    const cheme_img = {
        ep4: {
            40: 'ep4-scheme-40.png',
            41: 'ep4-scheme-41.png',
            410: 'ep4-scheme-410.png',
            43: 'ep4-scheme-43.png',
            430: 'ep4-scheme-430.png',
            44: 'ep4-scheme-44.png',
        },
    };

    const executions = {
        ep4: {
            Н: 'Общепромышленное исполнение',
            В: 'Взрывозащищенное исполнение для подгруппы IIB',
            Ш: 'рудничное (шахтное) исполнение',
            S: 'искробезопасное рудничное (шахтное) исполнение',
            С: 'взрывозащищенное исполнение для подгруппы IIС',
        },
    };

    const execution_wrap = $('#execution-wrap');

    const torques = {
        ep4: {
            1: [60, 120, 250, 400, 500, 1000],
        },
    };

    const time_limits = {
        ep4: {
            40: {
                60: [8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                120: [8, 11, 16, 22, 32, 45, 63, 90, 125],
            },
            41: {
                60: [8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                90: [180],
                120: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125],
                250: [4, 5.6, 8, 11, 16, 22, 32, 45, 63, 90, 125, 180],
                400: [180],
                500: [4, 5.6, 8, 11, 16, 22, 32, 45, 90],
            },
            410: {
                1000: [4, 5.6, 8, 11, 16, 22, 32, 45, 63],
            },
        },
    };

    const flanges = {
        ep4: {
            40: {
                60: {
                    0: {
                        1: ['МК', 'АК'],
                    },
                },
                120: {
                    0: {
                        1: ['АК'],
                    },
                },
            },
            41: {
                60: {
                    0: {
                        1: ['АК'],
                    },
                },
                90: {
                    0: {
                        1: ['АК'],
                    },
                },
                120: {
                    0: {
                        1: ['АК', 'Б'],
                    },
                },
                250: {
                    0: {
                        1: ['Б'],
                    },
                },
                400: {
                    0: {
                        1: ['Б'],
                    },
                },
                500: {
                    0: {
                        1: ['Б'],
                    },
                },
            },
            410: {
                1000: {
                    0: {
                        1: ['В'],
                    },
                },
            },
        },
    };

    let m1BlockModal = new bootstrap.Modal($('#block-configure-m1'));
    let m2BlockModal = new bootstrap.Modal($('#block-configure-m2'));
    let vimuBlockModal = new bootstrap.Modal($('#block-configure-e1'));
    let e2BlockModal = new bootstrap.Modal($('#block-configure-e2'));

    $('.ch-time-limit ').on('change', function (e) {
        $('#step-3').show();
        $('#step-4').show();
        var upper_limit = $('#upper-limit').val();
        var cur_time_limit = $('#time-limit').val();
        var times_options = [];

        select_options = $('#rotation-frequency');
        time_limits_arr = time_limits['ep4'];

        select_options.empty().append(new Option('Выберите значение', ''));

        $.each(time_limits_arr, function (key, value) {
            $.each(value, function (up_lim, item) {
                if (upper_limit == up_lim) {
                    times_options.push(...item);
                }
            });
        });

        $.each(
            [
                ...new Set(
                    times_options.sort(function (a, b) {
                        return a - b;
                    })
                ),
            ],
            function (key, item) {
                select_options.append(new Option(item, item, false, item == cur_time_limit));
            }
        );
    });

    $('.ch-cs').on('change', function (e) {
        option_id = '#rotation-frequency';

        execution = $("input[name='execution']:checked").val();
        x4 = $('#upper-limit').val();
        x5 = $(option_id).val();

        constructive_scheme = [];
        time_limits_arr = time_limits['ep4'];

        $.each(time_limits_arr, function (key, item) {
            $.each(item, function (index, arr) {
                if (index == x4 && !!x5 && arr.includes(Number.parseFloat(x5))) {
                    constructive_scheme.push(key);
                }
            });
        });

        $('#constructive-scheme-wrap').empty();

        if (constructive_scheme.length > 0) {
            $.each(constructive_scheme, function (key, item) {
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
                                defaultChecked: constructive_scheme.length == 1,
                            })
                        )
                        .append(
                            $('<label>')
                                .prop({
                                    for: 'scheme-' + item,
                                    class: 'form-check-label',
                                })
                                .text('Конструктивная схема ' + item)
                        )
                );
            });

            $("input[name='constructive-scheme']").trigger('change');
        } else {
            $('#constructive-scheme-img').empty();
        }

        if (document.getElementsByName('constructive-scheme').length < 2) {
            $('#schemeFieldSet').hide();
        } else {
            $('#schemeFieldSet').show();
        }
    });

    $(document).on('change', "input[name='constructive-scheme']", function (e) {
        $('#step-5').show();

        let cur_constructive_scheme = $("input[name='constructive-scheme']:checked").val();
        let cur_flange_value = $('#flange').val();

        let upper_limit = $('#upper-limit').val();
        let rotation_frequency = $('#rotation-frequency').val();
        let connectionType = $("input[name='connection-type']:checked").val();

        let control_block = $('#controle-blocks');
        let cur_control_block = $('#controle-blocks').val();

        let control_select = $('#controle-blocks-series').empty().append(new Option('Выберите значение', ''));

        let flanges_arr = [];

        if (!!cur_constructive_scheme) {
            if (typeof flanges['ep4'][cur_constructive_scheme][upper_limit][rotation_frequency] !== 'undefined') {
                flanges_arr = flanges['ep4'][cur_constructive_scheme][upper_limit][rotation_frequency][connectionType];
            } else {
                flanges_arr = flanges['ep4'][cur_constructive_scheme][upper_limit][0][connectionType];
            }
        }

        let series = {
            ep4: {
                Э0: 'Выносной интеллектуальный модуль управления с пускателем  Э0',
                Э1: 'Встроенный интеллектуальный модуль управления  с пускателем Э1',
                // 'Э1S': 'Серия Э1S',
                Э2: 'Электронный блок концевых выключателей без пускателя Э2',
                М1: 'Механический блок концевых выключателей без пускателя М1',
            },
        };

        if (!!cur_constructive_scheme) {
            // $("#controle-blocks").empty().append(new Option('Выберите значение', ''));
            control_select.empty().append(new Option('Выберите тип блока управления', ''));
            control_block.val('');

            $('#control-block-fieldset').attr('disabled', false);
            $.each(series['ep4'], function (key, item) {
                control_select.append(new Option(item, key, false, cur_control_block == item));
            });

            $('#constructive-scheme-img')
                .empty()
                .append(
                    $('<img>').prop({
                        src: './img/' + cheme_img['ep4'][cur_constructive_scheme],
                        class: 'img-fluid',
                    })
                );
        }
    });

    // ЗАПОЛНЕНИЕ ИСПОЛНЕНИЯ ДЛЯ ЕП4
    $.each(executions['ep4'], function (key, item) {
        execution_wrap.append(
            $('<div>')
                .prop({ class: 'form-check' })
                .append(
                    $('<input>').prop({
                        class: 'form-check-input ch-mark',
                        type: 'radio',
                        name: 'execution',
                        id: 'execution-' + key,
                        value: key,
                    })
                )
                .append(
                    $('<label>')
                        .prop({
                            class: 'form-check-label',
                            for: 'execution-' + key,
                        })
                        .text(item)
                )
        );
    });

    $(document).on('change', function (e) {
        let a = document.querySelector('.aVandalCap');
        let cbs = document.querySelector('#controle-blocks-series');
        if (cbs.value === 'Э1' || cbs.value === 'Э2') {
            $(a).show();
        } else {
            $(a).hide();
        }

        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');
        let x2;

        let x0 = 'ЭП4';
        let x1 = $("input[name='working-mode']:checked").val() ? $("input[name='working-mode']:checked").val() : ''; // Назначение по режимам работы
        switch (x1) {
            case '':
                $("input[name='working-mode']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='working-mode']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='working-mode']").closest('fieldset').removeClass('noReqValue');
                $("input[name='working-mode']").closest('fieldset').addClass('ReqValueOk');
        }

        x2 = $("input[name='execution']:checked").val() ? $("input[name='execution']:checked").val() : 'X'; // Исполнение по взрывозащите
        switch (x2) {
            case 'X':
                $("input[name='execution']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='execution']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='execution']").closest('fieldset').removeClass('noReqValue');
                $("input[name='execution']").closest('fieldset').addClass('ReqValueOk');
        }
        let x3 = $('#flange').val() ? $('#flange').val() : 'X'; // Тип присоединения к арматуре
        switch (x3) {
            case 'X':
                $('#flange').closest('fieldset').removeClass('ReqValueOk');
                $('#flange').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#flange').closest('fieldset').removeClass('noReqValue');
                $('#flange').closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#upper-limit').val() ? $('#upper-limit').val() : 'X'; // Верхний предел настройки ограничителя крутящего момента, Н·м
        switch (x4) {
            case 'X':
                $('#upper-limit').closest('fieldset').removeClass('ReqValueOk');
                $('#upper-limit').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#upper-limit').closest('fieldset').removeClass('noReqValue');
                $('#upper-limit').closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $('#rotation-frequency').val() ? $('#rotation-frequency').val() : 'X'; // Частота вращения выходного вала, об/мин
        switch (x5) {
            case 'X':
                $('#rotation-frequency').closest('fieldset').removeClass('ReqValueOk');
                $('#rotation-frequency').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#rotation-frequency').closest('fieldset').removeClass('noReqValue');
                $('#rotation-frequency').closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $('#controle-blocks').val() ? $('#controle-blocks').val() : 'X'; // Todo: Надо создать отдельный конфигуратор Исполнение блока управления
        switch (x6) {
            case 'X':
                $('#controle-blocks').closest('fieldset').removeClass('ReqValueOk');
                $('#controle-blocks').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#controle-blocks').closest('fieldset').removeClass('noReqValue');
                $('#controle-blocks').closest('fieldset').addClass('ReqValueOk');
        }

        let x7 = $('#climatic-modification').val() ? $('#climatic-modification').val() : 'X'; // Номер варианта температурного исполнения
        switch (x7) {
            case 'X':
                $('#climatic-modification').closest('fieldset').removeClass('ReqValueOk');
                $('#climatic-modification').closest('fieldset').addClass('noReqValue');
                break;
            default:
                $('#climatic-modification').closest('fieldset').removeClass('noReqValue');
                $('#climatic-modification').closest('fieldset').addClass('ReqValueOk');
        }

        let x8 = $("input[name='connection-type']:checked").val() ? $("input[name='connection-type']:checked").val() : 'X'; // Тип присоединения выходного вала привода к валу арматуры
        switch (x8) {
            case 'X':
                $("input[name='connection-type']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='connection-type']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='connection-type']").closest('fieldset').removeClass('noReqValue');
                $("input[name='connection-type']").closest('fieldset').addClass('ReqValueOk');
        }

        let x9 = $("input[name='rotating']:checked").val() ? $("input[name='rotating']:checked").val() : 'X'; // Направление вращения выходного вала
        switch (x9) {
            case 'X':
                $("input[name='rotating']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='rotating']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='rotating']").closest('fieldset').removeClass('noReqValue');
                $("input[name='rotating']").closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $("input[name='protection']:checked").val() ? $("input[name='protection']:checked").val() : 'X'; // Степень защиты от проникновения пыли и воды по ГОСТ 14254-2015
        switch (x10) {
            case 'X':
                $("input[name='protection']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='protection']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='protection']").closest('fieldset').removeClass('noReqValue');
                $("input[name='protection']").closest('fieldset').addClass('ReqValueOk');
        }

        let x11 = $("input[name='color']:checked").val() ? $("input[name='color']:checked").val() : 'X'; // Цвет окраски
        switch (x11) {
            case 'X':
                $("input[name='color']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='color']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='color']").closest('fieldset').removeClass('noReqValue');
                $("input[name='color']").closest('fieldset').addClass('ReqValueOk');
        }

        let x12 = $("input[name='connectionForEp4']:checked").val() ? $("input[name='connectionForEp4']:checked").val() : 'X'; // Электрическое подключение
        switch (x12) {
            case 'X':
                $("input[name='connectionForEp4']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='connectionForEp4']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='connectionForEp4']").closest('fieldset').removeClass('noReqValue');
                $("input[name='connectionForEp4']").closest('fieldset').addClass('ReqValueOk');
        }

        let x13 = $("input[name='special']:checked").val() ? $("input[name='special']:checked").val() : ''; // Специальное исполнение
        switch (x13) {
            case 'X':
                $("input[name='special']").closest('fieldset').removeClass('ReqValueOk');
                $("input[name='special']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("input[name='special']").closest('fieldset').removeClass('noReqValue');
                $("input[name='special']").closest('fieldset').addClass('ReqValueOk');
        }

        let x14 = $("select[name='rn']").val() ? $("input[name='rn']").val() : ''; // Специальное исполнение
        switch (x14) {
            case 'X':
                $("select[name='rn']").closest('fieldset').removeClass('ReqValueOk');
                $("select[name='rn']").closest('fieldset').addClass('noReqValue');
                break;
            case '':
                $("select[name='rn']").closest('fieldset').removeClass('ReqValueOk');
                $("select[name='rn']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("select[name='rn']").closest('fieldset').removeClass('noReqValue');
                $("select[name='rn']").closest('fieldset').addClass('ReqValueOk');
        }

        let x15 = $("select[name='turnTime']").val() ? $("input[name='turnTime']").val() : ''; // Специальное исполнение
        switch (x15) {
            case 'X':
                $("select[name='turnTime']").closest('fieldset').removeClass('ReqValueOk');
                $("select[name='turnTime']").closest('fieldset').addClass('noReqValue');
                break;
            case '':
                $("select[name='turnTime']").closest('fieldset').removeClass('ReqValueOk');
                $("select[name='turnTime']").closest('fieldset').addClass('noReqValue');
                break;
            default:
                $("select[name='turnTime']").closest('fieldset').removeClass('noReqValue');
                $("select[name='turnTime']").closest('fieldset').addClass('ReqValueOk');
        }

        let rnx1 = document.querySelector('#rn').value ? document.querySelector('#rn').value : '';

        // let rnx2 = document.querySelector("#rotation-frequency").value ? document.querySelector("#rotation-frequency").value : 'X';

        let constructive_scheme = $("input[name='constructive-scheme']:checked").val();

        if (x3.search(/[МА][КЧ]/g) == 0) {
            x3 = x3.substr(0, 1);
        }

        let suffix = '';

        if (constructive_scheme === '40') {
            suffix += '-40';
        }
        //
        if (cbs === 'Э0') {
            x6 = 'Э01';
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, rnx1].includes('X');
        mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + '-' + x7 + '-' + x8 + x9 + x10 + x11 + x12 + x13 + suffix + '/' + rnx1);
        // let check = document.querySelector("#tuMpCheck > input[type=checkbox]");
        // if(check.checked){mark_gen.text(x0 + x1 + x2 + '-' + x3 + '-' + x4 + '-' + x5 + '-' + x6 + '-' + x7 + '-' + x8 + x9 + x10 + x11 + x12 + x13 + suffix + '/' + 'МП40' + '-' + 'X' + '-' + tuMpX);}

        $('#certs-pdf').empty();
        if (!is_true && certs_pdf['ep4'][x2] !== undefined) {
            $('#certs-pdf').append(
                $('<a>')
                    .attr({ href: 'pdf/' + certs_pdf['ep4'][x2]['cert'], target: '_blank' })
                    .text('Сертификат')
                    .css('padding', '1.5%'),
                $('<a>')
                    .attr({ href: 'pdf/' + certs_pdf['ep4'][x2]['decl'], target: '_blank' })
                    .text('Декларация')
                    .css('padding', '1.5%')
            );
        }

        modal_button.toggle(!is_true);
        mark_gen.toggleClass('is-invalid', is_true).toggleClass('is-valid', !is_true);
    });

    $(document.querySelector("#modal-button > button")).on('click', function () {
        console.log('hea');
        let CapText = document.querySelector('#cap > input[type=checkbox]').checked ? '1' : '0';
        let PointerText = document.querySelector('#pointer > input[type=checkbox]').checked ? '1' : '0';
        let ArmText = document.querySelector('#arm > input[type=checkbox]').checked ? document.querySelector('#arm').innerText + ' ' : '';
        let addOptSel = document.querySelector("#mechSelectorId > input[type=checkbox]").checked ? 1 : 0;
        let addOptBoard = document.querySelector("#boardRegId > input[type=checkbox]").checked ? 2 : 0;
        let allOpt = addOptSel + addOptBoard;

        let color = $("input[name='color']:checked").val();
        if (color == '1') {
            color = '0';
        } else if (color == '2') {
            color = '1';
        }

        //создание jsona
        j1 = 'ЭП4 с редуктором';
        j2 = document.querySelector('#mark-gen').innerText;
        j3 = 'АО Тулаэлектропривод';
        j4 = document.querySelector('#pressure').value;
        j5 = document.querySelector('#diameter').value;
        j6 = document.querySelector('#closingTimeTo').value;
        j7 = document.querySelector('#closingTimeFrom').value;
        j8 = document.querySelector('#maxRMoment').value;
        j9 = document.querySelector('#maxRMoment2').value;
        j10 = document.querySelector("#flange").value;
        j11 = document.querySelector('#closeNumbers').value;
        j12 = document.querySelector('#working-env').value;
        j13 = $("input[name='placeForEnv']:checked").val();

        // Вторая часть jsona
        h1 = $("input[name='execution']:checked").closest('.form-check').find('.form-check-label').text();
        h2 = $("input[name='working-mode']:checked").closest('.form-check').find('.form-check-label').text();
        h3 = $("input[name='protection']:checked").closest('.form-check').find('.form-check-label').text();
        h4 = $("input[name='rotating']:checked").closest('.form-check').find('.form-check-label').text();
        h5 = $('#climatic-modification option:selected').text();
        h6 = $("input[name='typeEndSwich']:checked").val();
        h7 = $("input[name='commandBlockType']:checked").val();
        h8 = PointerText;
        h9 = document.querySelector('#signal').value;
        h10 = document.querySelector('#commandSignal').value;
        h11 = $("input[name='signalMoment']:checked").val() ? $("input[name='signalMoment']:checked").val() : '0';
        h12 = $("input[name='tire']:checked").val() ? $("input[name='tire']:checked").val() : '0';
        h13 = document.querySelector('#cabels-1').checked ? '1' : '0';
        h14 = document.querySelector('#cabels-1').checked ? document.querySelector('#cabels-1').value : '0';
        h15 = document.querySelector('#stepse-1').checked ? '1' : '0';
        h16 = document.querySelector('#stepse-1').checked ? document.querySelector('#inputStepse').value : '-';
        h17 = document.querySelector('#stepse-1').checked ? document.querySelector('#inputTypeStepse').value : '-';
        h18 = color;
        h19 = document.querySelector('#ralColor').value ? document.querySelector('#ralColor').value : '0';
        h20 = CapText;
        h21 = document.querySelector('#numbersOfEp').value;
        h22 = allOpt;
        h23 = document.querySelector('#addReqarea').value;
        // ДОБАВИТЬ ARMTEXT
        // третья часть
        p1 = day = '';
        p2 = month = '';
        p3 = document.querySelector('#organization').value;
        p4 = document.querySelector('#fio').value;
        p5 = document.querySelector('#phone').value;
        p6 = document.querySelector('#email').value;

        // ОБЩЕЕ
        // (json = {
        //     1: [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13],
        //     2: [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23],
        //     3: [p1, p2, p3, p4, p5, p6],
        // }),
           

        sendToServer();

        function sendToServer() {
            timer = 0;
           let post =  fetch('/download', {
               method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
               body: JSON.stringify({
                   jsn1: [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12, j13],
                   jsn2: [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13, h14, h15, h16, h17, h18, h19, h20, h21, h22, h23],
                   jsn3: [p1, p2, p3, p4, p5, p6],
                }),
            })
            .then ((response) => response.json())
            .then ((response) => window.open(`/Tula/${response.id}`));
        }
    });
    
    // сокрытия пункта кабельных вводов
    $('.cableField').on('change', function (e) {
        if (!document.querySelector('#cabels-1').checked) {
            document.querySelector('#cabelsInput-1').disabled = true;
            document.querySelector('#cabelsInput-1').value = '';
        } else {
            document.querySelector('#cabelsInput-1').disabled = false;
        }
        document.querySelector('#cabels-1').value = document.querySelector('#cabelsInput-1').value;
    });

    // сокрытия пункта штепсельных вводов
    $('.stepseField').on('change', function (e) {
        if (!document.querySelector('#stepse-1').checked) {
            document.querySelector('#inputStepse').disabled = true;
            document.querySelector('#inputTypeStepse').disabled = true;
            document.querySelector('#inputStepse').value = '';
            document.querySelector('#inputTypeStepse').value = '';
        } else {
            document.querySelector('#inputStepse').disabled = false;
            document.querySelector('#inputTypeStepse').disabled = false;
        }
        document.querySelector('#inputStepse').value = document.querySelector('#inputStepse').value;
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

    $('#m2-form input').on('change', function (e) {
        let mod = 0;
        $.each($('#m2-form input:checked'), function () {
            mod += Math.pow(2, parseInt($(this).data('position')));
        });

        $('.cur-m2-value')
            .text('М2' + mod)
            .val('М2' + mod);
    });

    $('#clear-m2').on('click', function (e) {
        $('#m2-form')[0].reset();
        $('.cur-m2-value').text('М20').val('M20');
    });

    $('#m2-submit').on('click', function (e) {
        $('#controle-blocks').val($('.cur-m2-value').val()).trigger('change');
        m2BlockModal.hide();
    });

    $('#e1-submit').on('click', function (e) {
        $('#controle-blocks').val($('input.cur-execution-value').val()).trigger('change');
        vimuBlockModal.hide();
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

    // КНОПКИ В КОНФИГУРАТОР
    $('#controle-blocks-series').on('click', function (e) {
        // $("#controle-blocks").val('');

        if ($(this).val() === 'Э0') {
            $(document.querySelector('#controle-blocks')).show();
            $('#controle-blocks').val('Э01');
            $('#control-block-config').hide();
        } else {
            $(document.querySelector('#controle-blocks')).hide();
            $('#control-block-config').show();
        }
    });

    $('#control-block-config').on('click', function (e) {
        let cbs = $('#controle-blocks-series').val();
        if (cbs === 'М1') {
            m1BlockModal.show();
        } else if (cbs === 'М2') {
            m2BlockModal.show();
        } else if (cbs === 'ВЭ' || cbs === 'Э0' || cbs === 'Э1') {
            vimuBlockModal.show();
        } else if (cbs === 'Э2') {
            e2BlockModal.show();
        }
    });

    $('#controle-blocks-series').on('change', function (e) {
        let cbs = $('#controle-blocks-series').val();
        let cb = $('#controle-blocks');
        if (cbs === 'Э1' || cbs === 'Э2' || cbs === 'ВЭ' || cbs === '' || cbs === 'М1') {
            $(cb).val('');
        } else {
            cb.val(cbs);
        }
    });
    // Открытия поля с чертежом
    $('#drawing').on('change', function (e) {
        if (document.querySelector('#drawing').value != 3) {
            document.querySelector('#upload').classList.toggle('none');
        }
    });
    // СТИЛЬ ДЛЯ ПОЛЯ С ДАННЫМИ
    $('.persInfo').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '' ) {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {document.querySelector('.persInfo ').classList.remove('ReqValueOk');
        document.querySelector('.persInfo ').classList.add('noReqValue');}
    });
    // СТИЛЬ ДЛЯ ПОЛЯ Со схемами
    $('№schemeFieldSet').on('change', function (e) {
        if (document.querySelector('#organization').value != '' && document.querySelector('#fio').value != '' && document.querySelector('#phone').value != '' && document.querySelector('#email').value != '' ) {
            document.querySelector('.persInfo ').classList.remove('noReqValue');
            document.querySelector('.persInfo ').classList.add('ReqValueOk');
        } else {document.querySelector('.persInfo ').classList.remove('ReqValueOk');
        document.querySelector('.persInfo ').classList.add('noReqValue');}
    });
    // Стиль для модуля Модуль прямоходный
    $('.tuMpField').on('change', function (e) {
        if(document.querySelector("#tuMpCheck > input[type=checkbox]").checked)
        {document.querySelector('.tuMpField ').classList.add('ReqValueOk');
         document.querySelector('.tuMpField ').classList.remove('noReqValue');
        }
        else {document.querySelector('.tuMpField ').classList.add('noReqValue');
         document.querySelector('.tuMpField ').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Наибольший ход, мм
    $('#maxStepMp').on('change', function (e) {
        if(document.querySelector("#maxStepMp").value != '') 
        {document.querySelector('#maxStepMp ').classList.add('ReqValueOk');
         document.querySelector('#maxStepMp ').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('#maxStepMp').classList.add('noReqValue');
         document.querySelector('#maxStepMp').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Номинальный крутящий момент
    $('#roundMomentMp').on('change', function (e) {
        if(document.querySelector("#roundMomentMp").value != undefined) 
        {document.querySelector('.roundMomentMp').classList.add('ReqValueOk');
         document.querySelector('.roundMomentMp').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentMp').classList.add('noReqValue');
         document.querySelector('.roundMomentMp').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Крутящий момент привода
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#roundMomentEngine").value != '') 
        {document.querySelector('.roundMomentEngine').classList.add('ReqValueOk');
         document.querySelector('.roundMomentEngine').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentEngine').classList.add('noReqValue');
         document.querySelector('.roundMomentEngine').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Диапазон усилий на штоке модуля при настройке привода на крутящий момент
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#roundMomentInterval").value != '') 
        {document.querySelector('.roundMomentInterval').classList.add('ReqValueOk');
         document.querySelector('.roundMomentInterval').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.roundMomentInterval').classList.add('noReqValue');
         document.querySelector('.roundMomentInterval').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Ход штока модуля за один оборот
    $('#tuMpField').on('change', function (e) {
        if(document.querySelector("#stepForOne").value != '') 
        {document.querySelector('.stepForOne').classList.add('ReqValueOk');
         document.querySelector('.stepForOne').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.stepForOne').classList.add('noReqValue');
         document.querySelector('.stepForOne').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля номинальное давление
    $('#pressure').on('change', function (e) {
        if(document.querySelector("#pressure").value != '') 
        {document.querySelector('.pressure').classList.add('ReqValueOk');
         document.querySelector('.pressure').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.pressure').classList.add('noReqValue');
         document.querySelector('.pressure').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля диаметр
    $('#diameter').on('change', function (e) {
        if(document.querySelector("#diameter").value != '') 
        {document.querySelector('.diameter').classList.add('ReqValueOk');
         document.querySelector('.diameter').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.diameter').classList.add('noReqValue');
         document.querySelector('.diameter').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля Время закрытия
    $('.closingTime').on('change', function (e) {
        if(document.querySelector("#closingTimeFrom").value!= '' && document.querySelector("#closingTimeTo").value!= ''  ) 
        {document.querySelector('.closingTime').classList.add('ReqValueOk');
         document.querySelector('.closingTime').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.closingTime').classList.add('noReqValue');
         document.querySelector('.closingTime').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля макс крут момент
    $('.maxRMoment').on('change', function (e) {
        if(document.querySelector("#maxRMoment").value!= '') 
        {document.querySelector('.maxRMoment').classList.add('ReqValueOk');
         document.querySelector('.maxRMoment').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.maxRMoment').classList.add('noReqValue');
         document.querySelector('.maxRMoment').classList.remove('ReqValueOk');
        }
    });
    // Стиль для модуля макс крут момент на закрывание
    $('.maxRMoment2').on('change', function (e) {
        if(document.querySelector("#maxRMoment2").value!= '') 
        {document.querySelector('.maxRMoment2').classList.add('ReqValueOk');
         document.querySelector('.maxRMoment2').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.maxRMoment2').classList.add('noReqValue');
         document.querySelector('.maxRMoment2').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока типа вала
    $('.valType').on('change', function (e) {
        if(document.querySelector("#valType").value!= '' && document.querySelector("#outStock").value!= '' && document.querySelector("#dStock").value!= '') 
        {document.querySelector('.valType').classList.add('ReqValueOk');
         document.querySelector('.valType').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.valType').classList.add('noReqValue');
         document.querySelector('.valType').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока обороты для закрытия
    $('.closeNumbers').on('change', function (e) {
        if(document.querySelector("#closeNumbers").value!= '') 
        {document.querySelector('.closeNumbers').classList.add('ReqValueOk');
         document.querySelector('.closeNumbers').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.closeNumbers').classList.add('noReqValue');
         document.querySelector('.closeNumbers').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока рабочей среды
    $('.working-env').on('change', function (e) {
        if(document.querySelector("#working-env").value!= '') 
        {document.querySelector('.working-env').classList.add('ReqValueOk');
         document.querySelector('.working-env').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.working-env').classList.add('noReqValue');
         document.querySelector('.working-env').classList.remove('ReqValueOk');
        }
    });
    // Стиль для блока установки
    $('.placeForEnv').on('change', function (e) {
        if(document.querySelector("#placeForEnv-1").checked || document.querySelector("#placeForEnv-2").checked) 
        {document.querySelector('.placeForEnv').classList.add('ReqValueOk');
         document.querySelector('.placeForEnv').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.placeForEnv').classList.add('noReqValue');
         document.querySelector('.placeForEnv').classList.remove('ReqValueOk');
        }
    });
    // Тип блока концевых выключателей
    $('.typeEndSwich').on('change', function (e) {
        if(document.querySelector("#typeEndSwich-1").checked || document.querySelector("#typeEndSwich-2").checked) 
        {document.querySelector('.typeEndSwich').classList.add('ReqValueOk');
         document.querySelector('.typeEndSwich').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.typeEndSwich').classList.add('noReqValue');
         document.querySelector('.typeEndSwich').classList.remove('ReqValueOk');
        }
    });
    // Тип блока управления привода
    $('.commandBlockType').on('change', function (e) {
        if(document.querySelector("#commandBlockType-1").checked || document.querySelector("#commandBlockType-2").checked) 
        {document.querySelector('.commandBlockType').classList.add('ReqValueOk');
         document.querySelector('.commandBlockType').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.commandBlockType').classList.add('noReqValue');
         document.querySelector('.commandBlockType').classList.remove('ReqValueOk');
        }
    });
    // Сигнализация положения
    $('.signal').on('change', function (e) {
        if(document.querySelector("#signal").value != '') 
        {document.querySelector('.signal').classList.add('ReqValueOk');
         document.querySelector('.signal').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.signal').classList.add('noReqValue');
         document.querySelector('.signal').classList.remove('ReqValueOk');
        }
    });
    // Сигналы дист управления 
    $('.commandSignal').on('change', function (e) {
        if(document.querySelector("#commandSignal").value != '') 
        {document.querySelector('.commandSignal').classList.add('ReqValueOk');
         document.querySelector('.commandSignal').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.commandSignal').classList.add('noReqValue');
         document.querySelector('.commandSignal').classList.remove('ReqValueOk');
        }
    });
    // Сигнал момент 4-20 
    // $('.signalMoment').on('change', function (e) {
        
    //     if(document.querySelector("#signalMoment-1").checked) 
    //     {document.querySelector('.signalMoment').classList.add('ReqValueOk');
    //      document.querySelector('.signalMoment').classList.remove('optionalField');
    //     }
    //     else 
    //     {document.querySelector('.signalMoment').classList.add('optionalField');
    //      document.querySelector('.signalMoment').classList.remove('ReqValueOk');
    //     }
    // });
    // // Дублирование шины
    // $('.tire').on('change', function (e) {
    //     if(document.querySelector("#tire-1").checked) 
    //     {document.querySelector('.tire').classList.add('ReqValueOk');
    //      document.querySelector('.tire').classList.remove('optionalField');
    //     }
    //     else 
    //     {document.querySelector('.tire').classList.add('optionalField');
    //      document.querySelector('.tire').classList.remove('ReqValueOk');
    //     }
    // });
    // Кабельные вводы
    $('.cableField').on('change', function (e) {
        if(document.querySelector("#cabels-2").checked || document.querySelector("#cabelsInput-1").value != '') 
        {document.querySelector('.cableField').classList.add('ReqValueOk');
         document.querySelector('.cableField').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.cableField').classList.add('noReqValue');
         document.querySelector('.cableField').classList.remove('ReqValueOk');
        }
    });
    // Штепсельные разъемы
    $('.stepseField').on('change', function (e) {
        if(!document.querySelector("#stepse-1").checked || (document.querySelector("#inputStepse").value != '' && document.querySelector("#inputTypeStepse").value != '') ) 
        {document.querySelector('.stepseField').classList.add('ReqValueOk');
         document.querySelector('.stepseField').classList.remove('noReqValue');
        }
        else 
        {document.querySelector('.stepseField').classList.add('noReqValue');
         document.querySelector('.stepseField').classList.remove('ReqValueOk');
        }
    });

});
