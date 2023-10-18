// https://www.tulaprivod.ru/dokument/rukovodstva/BLTU_89_2022_v2.pdf
$(document).ready(function () {
    //КОНСТАНТЫ ДЛЯ JSON 
    const certs_pdf = {
        'classicEpaTu': {
            'cert': '2-ep4-cert.pdf',
            'decl': '2-ep4-decl.pdf',
        },
        // 'В': {
        //     'cert': 'ep4v-cert.pdf',
        //     'decl': 'ep4v-decl.pdf',
        // }
    }

    // ДЛЯ ОТКРЫТИЯ ШАГОВ
    $(document).on('change', '#connectionTypeForclassicEpa', function (e) {
        $('#step-3').show();
    });

    $(document).on('change', '#executionclassicEpaNumber', function (e) {
        $('#step-4').show();
    });

    $(document).on('change', '#engineUpgrade', function (e) {
        $('#step-5').show();
    });

    const selectValues = {
        'Н': {
            'Д': {
                '10': {
                    '5000-8500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                    },
                    '2500-5000': {
                        '13': ['1-6'],
                        '14': ['6-36'],
                        '15': ['36-200'],
                        '16': ['1-6'],
                        '17': ['6-36'],
                        '18': ['36-200'],
                    },
                },
                '9.3': {
                    '6300-10000': {
                        '07': ['1-6'],
                        '08': ['6-36'],
                        '09': ['36-200'],
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                    }
                }
            },

            'М': {
                '9.5': {
                    '5-10': {
                        '01': ['1-6'],
                        '02': ['4-24']
                    },
                    '10-25': {
                        '03': ['1-6'],
                        '04': ['4-24']
                    }
                }
            },

            'В': {
                '24': {
                    '250 - 630': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '07': ['1-6'],
                        '08': ['6-36'],
                        '09': ['36-200'],
                        '38': ['144-800'],
                        '59': ['18-100'],
                        '61': ['18-100'],
                    },

                    '630-1000': {
                        '14': ['1-6'],
                        '15': ['6-36'],
                        '16': ['36-200'],
                        '20': ['1-6'],
                        '21': ['6-36'],
                        '22': ['36-200'],
                        '39': ['144-800'],
                        '42': ['18-100'],
                        '57': ['18-100'],
                    },
                },
                '48': {
                    '250 - 630': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '40': ['144-800'],
                        '60': ['18-100'],
                        '62': ['18-100'],
                    },

                    '630-1000': {
                        '17': ['1-6'],
                        '18': ['6-36'],
                        '19': ['36-200'],
                        '23': ['1-6'],
                        '24': ['6-36'],
                        '25': ['36-200'],
                        '41': ['144-800'],
                        '43': ['18-100'],
                        '58': ['18-100'],
                    },
                },
                '6': {
                    '250 - 630': {
                        '26': ['1-6'],
                        '27': ['6-36'],
                        '28': ['36-200'],
                        '29': ['1-6'],
                        '30': ['6-36'],
                        '31': ['36-200'],
                    },

                    '630-1000': {
                        '32': ['1-6'],
                        '33': ['6-36'],
                        '34': ['36-200'],
                        '35': ['1-6'],
                        '36': ['6-36'],
                        '37': ['36-200'],
                    },
                }
            },

            'Г': {
                '20': {
                    '1000 - 2500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '41': ['18-100'],
                        '42': ['18-100'],
                    }
                },
                '40': {
                    '1000 - 2500': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '07': ['4-24'],
                        '08': ['24-144'],
                        '09': ['144-800'],
                        '13': ['1-6'],
                        '14': ['6-36'],
                        '15': ['36-200'],
                        '16': ['4-24'],
                        '17': ['24-144'],
                        '18': ['144-800'],
                        '31': ['18-100'],
                        '32': ['18-100'],
                        '43': ['72-400'],
                        '44': ['72-400'],
                    },

                    '600-1400': {
                        '25': ['4-24'],
                        '26': ['24-144'],
                        '27': ['144-800'],
                        '28': ['4-24'],
                        '29': ['24-144'],
                        '30': ['144-800'],
                        '45': ['72-400'],
                        '46': ['72-400'],
                    }
                },

                '5': {
                    '1000 - 2500': {
                        '19': ['1-6'],
                        '20': ['6-36'],
                        '21': ['36-200'],
                        '22': ['1-6'],
                        '23': ['6-36'],
                        '24': ['36-200'],
                    },
                },
            },
            'Б1': {
                '25': {
                    '100 - 300': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '07': ['1-6'],
                        '08': ['6-36'],
                        '09': ['36-200'],
                        '19': ['18-100'],
                        '29': ['18-100'],
                    }
                },
                '50': {
                    '100 - 300': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '20': ['18-100'],
                        '30': ['18-100'],
                    }
                },
                '6': {
                    '100 - 300': {
                        '13': ['1-6'],
                        '14': ['6-36'],
                        '15': ['36-200'],
                        '16': ['1-6'],
                        '17': ['6-36'],
                        '18': ['36-200'],
                        '27': ['0.2-1'],
                        '28': ['0.2-1'],
                    }
                }
            },


            'А2': {
                '12': {
                    '25-60': {
                        '01': ['1-10'],
                        '04': ['10-45'],
                        '12': ['1']
                    },
                    '60-100': {
                        '07': ['1-10'],
                        '10': ['10-45'],
                        '13': ['1']
                    },
                    '10-35': {
                        '15': ['1-10']
                    }
                },
                '24': {
                    '25-60': {
                        '02': ['1-10'],
                        '05': ['10-45'],
                    },
                    '60-100': {
                        '08': ['1-10'],
                        '11': ['10-45'],
                    },
                    '10-35': {
                        '16': ['1-10']
                    }
                },
                '48': {
                    '60-100': {
                        '14': ['10-45'],
                    }
                }
            },
        },


        'В': {
            'Д': {
                '10': {
                    '5000-8500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                    },
                    '2500-5000': {
                        '07': ['1-6'],
                        '08': ['6-36'],
                        '09': ['36-200'],
                    },
                },
                '9.3': {
                    '6300-10000': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                    }
                }
            },

            'Г': {
                '20': {
                    '1000 - 2500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '21': ['18-100'],
                    }
                },
                '40': {
                    '1000 - 2500': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '07': ['4-24'],
                        '08': ['24-144'],
                        '09': ['144-800'],
                        '16': ['18-100'],
                    },
                    '600-1400': {
                        '13': ['4-24'],
                        '14': ['24-144'],
                        '15': ['144-800'],
                        '22': ['72-400'],
                    }
                },
                '5': {
                    '1000 - 2500': {
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                    },
                },
            },

            'А2': {
                '12': {
                    '25-60': {
                        '01': ['1-10'],
                        '04': ['10-45'],
                    },
                    '60-100': {
                        '07': ['1-10'],
                        '10': ['10-45'],
                    },
                    '10-35': {
                        '12': ['1-10']
                    },
                },
                '24': {
                    '25-60': {
                        '02': ['1-10'],
                        '05': ['10-45'],
                    },
                    '60-100': {
                        '08': ['1-10'],
                        '11': ['10-45'],
                    },
                },
                '48': {
                    '60-100': {
                        '13': ['10-45'],
                    },
                },
                '1.8': {
                    '60-100': {
                        '14': ['1-4'],
                    },
                }
            },

            'Б1': {
                '25': {
                    '100 - 300': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '10': ['18-100'],
                    }
                },
                '50': {
                    '100 - 300': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '11': ['18-100'],
                    }
                },
                '6': {
                    '100 - 300': {
                        '7': ['1-6'],
                        '8': ['6-36'],
                        '9': ['36-200'],
                        '15': ['0.2-1'],
                    }
                }
            },

            'В': {
                '24': {
                    '250 - 630': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '29': ['18-100'],
                    },

                    '630-1000': {
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '21': ['18-100'],
                    },
                },
                '48': {
                    '250 - 630': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '19': ['144-800'],
                        '30': ['18-100'],
                        '31': ['72-400'],
                        '40': ['144-800'],
                        '60': ['18-100'],
                        '62': ['18-100'],
                    },

                    '630-1000': {
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '20': ['144-800'],
                        '22': ['18-100'],
                        '32': ['72-400'],
                    },
                },
                '6': {
                    '250 - 630': {
                        '13': ['1-6'],
                        '14': ['6-36'],
                        '15': ['36-200'],
                    },

                    '630-1000': {
                        '16': ['1-6'],
                        '17': ['6-36'],
                        '18': ['36-200'],
                    },
                }
            },
        },

        'С': {
            'Д1': {
                '10': {
                    '5000-8500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                    },
                    '2500-5000': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                    },
                },
                '9.3': {
                    '6300-10000': {
                        '07': ['1-6'],
                        '08': ['6-36'],
                        '09': ['36-200'],
                    }
                }
            },

            'Г1': {
                '20': {
                    '1000 - 2500': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '21': ['18-100'],
                    }
                },
                '40': {
                    '1000 - 2500': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '07': ['4-24'],
                        '08': ['24-144'],
                        '09': ['144-800'],
                        '16': ['18-100'],
                    },

                    '600-1400': {
                        '13': ['4-24'],
                        '14': ['24-144'],
                        '15': ['144-800'],
                        '22': ['72-400'],
                    }
                },

                '5': {
                    '1000 - 2500': {
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                    },
                },
            },

            'А1': {
                '12': {
                    '25-60': {
                        '01': ['1-10'],
                        '04': ['10-45'],
                    },
                    '60-100': {
                        '07': ['1-10'],
                        '10': ['10-45'],
                    },
                    '10-35': {
                        '12': ['1-10']
                    },
                },
                '24': {
                    '25-60': {
                        '02': ['1-10'],
                        '05': ['10-45'],
                    },
                    '60-100': {
                        '08': ['1-10'],
                        '11': ['10-45'],
                    },
                },
                '10-35': {
                    '12': ['1-10']
                },
                '48': {
                    '60-100': {
                        '13': ['10-45'],
                    },
                },
            },

            'В1': {
                '24': {
                    '250 - 630': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '31': ['18-100'],
                    },

                    '125-500': {
                        '07': ['4-24'],
                        '08': ['24-144'],
                        '09': ['144-800'],
                    },

                    '630-1000': {
                        '10': ['1-6'],
                        '11': ['6-36'],
                        '12': ['36-200'],
                        '22': ['18-100'],
                    },
                },
                '48': {
                    '250 - 630': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '32': ['18-100'],
                    },

                    '630-1000': {
                        '13': ['1-6'],
                        '14': ['6-36'],
                        '23': ['18-100'],
                    },
                },
                '6': {
                    '250 - 630': {
                        '16': ['1-6'],
                        '17': ['6-36'],
                        '18': ['36-200'],
                    },

                    '630-1000': {
                        '19': ['1-6'],
                        '20': ['6-36'],
                        '21': ['36-200'],
                    },
                }
            },

            'Б1': {
                '25': {
                    '100 - 300': {
                        '01': ['1-6'],
                        '02': ['6-36'],
                        '03': ['36-200'],
                        '10': ['18-100'],
                    }
                },
                '50': {
                    '100 - 300': {
                        '04': ['1-6'],
                        '05': ['6-36'],
                        '06': ['36-200'],
                        '11': ['18-100'],
                    }
                },
                '6': {
                    '100 - 300': {
                        '7': ['1-6'],
                        '8': ['6-36'],
                        '9': ['36-200'],
                        '15': ['0.2-1'],
                    }
                }
            },
        },
    };

    // заполнение селекта буквы, означающей тип электропривода по присоединению: -по ГОСТ 32487:
    $('#epPlace').on('change', function (e) {
        $('#step-3').show();

        let execVal = $("input[name='epPlace']:checked").val();
        // console.log(execVal);

        let select = $(document.querySelector("#connectionTypeForclassicEpa"));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = selectValues[execVal];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            })
        });
        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // заполнение селекта частоты вращения выходного вала
    $('#connectionTypeForclassicEpa').on('change', function (e) {

        let execVal = $("input[name='epPlace']:checked").val();
        conType = $('#connectionTypeForclassicEpa').val();
        // console.log(execVal);

        let select = document.querySelector("#outVal");
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = selectValues[execVal][conType];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            })
        });
        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // заполнение селекта крутящего момента выходного вала
    $('#outVal').on('change', function (e) {
        let execVal = $("input[name='epPlace']:checked").val();
        let conType = $('#connectionTypeForclassicEpa').val();
        let outVal = $("#outVal").val();
        // console.log(execVal);

        let select = document.querySelector("#roundMoment");
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = selectValues[execVal][conType][outVal];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            })
        });
        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // заполнение селекта двузначного числа, означающего номер исполнения электропривода
    $('#roundMoment').on('change', function (e) {
        let execVal = $("input[name='epPlace']:checked").val();
        let conType = $('#connectionTypeForclassicEpa').val();
        let outVal = $("#outVal").val();
        let roundMoment = $('#roundMoment').val();
        // console.log(execVal);

        let select = $(document.querySelector("#executionclassicEpaNumber"));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = selectValues[execVal][conType][outVal][roundMoment];
        // console.log(ValuesArr);
        let selectArr = [];

        $.each(ValuesArr, function (key, item) {
            $.each(item, function (index, arr) {
                {
                    if (!selectArr.includes(key)) {
                        selectArr.push(key);
                        // console.log(selectArr);
                    }
                }
            })
        });
        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });

    // заполнение селекта оборотов выходного вала
    $('#executionclassicEpaNumber').on('change', function (e) {
        let execVal = $("input[name='epPlace']:checked").val();
        let conType = $('#connectionTypeForclassicEpa').val();
        let outVal = $("#outVal").val();
        let roundMoment = $('#roundMoment').val();
        let epaNumber = $('#executionclassicEpaNumber').val();

        let select = $(document.querySelector("#roundNumbers"));
        $(select).empty().append(new Option('Укажите значение', ''));

        ValuesArr = selectValues[execVal][conType][outVal][roundMoment][epaNumber];
        let selectArr = [];

        $.each([...new Set(ValuesArr.sort(function (a, b) { return a - b }))], function (index, item) {
            select.append(new Option(item, item, false, (!selectArr.includes(item))));
        });

        selectArr.sort();
        $.each(selectArr, function (key, item) {
            $(select).append(new Option(item, item));
        });
    });
    // Заполнение номера модификации
    $(document).on('change', '#connectionTypeForclassicEpa', function () {
        switch ($(document.querySelector("#connectionTypeForclassicEpa")).val()) {
            case 'М':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).hide();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = true;
                break;

            case 'А1':
                $(document.querySelector("#upgradeNumber-1")).hide();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).show();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'А2':
                $(document.querySelector("#upgradeNumber-1")).hide();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).show();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'Б1':
                $(document.querySelector("#upgradeNumber-1")).hide();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-2 > input").checked = true;
                break;

            case 'В':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'Г':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'Д':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'В1':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'Г1':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;

            case 'Д1':
                $(document.querySelector("#upgradeNumber-1")).show();
                $(document.querySelector("#upgradeNumber-2")).show();
                $(document.querySelector("#upgradeNumber-3")).hide();
                document.querySelector("#upgradeNumber-1 > input").checked = false;
                document.querySelector("#upgradeNumber-2 > input").checked = false;
                break;
        }
    });

    // заполнение маркировки и визуальное отображение обязательных полей
    $(document).on('change', function (e) {
        let mark_gen = $('#mark-gen');
        let modal_button = $('#modal-button');

        let x1 = $("input[name='epPlace']:checked").val() ? $("input[name='epPlace']:checked").val() : 'X';
        switch (x1) {
            case 'X':
                ($('#epPlace')).closest('fieldset').removeClass('ReqValueOk');
                ($('#epPlace')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#epPlace')).closest('fieldset').removeClass('noReqValue');
                ($('#epPlace')).closest('fieldset').addClass('ReqValueOk');
        }

        let x2 = $(document.querySelector("#connectionTypeForclassicEpa")).val() ? $(document.querySelector("#connectionTypeForclassicEpa")).val() : 'X';
        switch (x2) {
            case 'X':
                ($('#connectionTypeForclassicEpa')).closest('fieldset').removeClass('ReqValueOk');
                ($('#connectionTypeForclassicEpa')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#connectionTypeForclassicEpa')).closest('fieldset').removeClass('noReqValue');
                ($('#connectionTypeForclassicEpa')).closest('fieldset').addClass('ReqValueOk');
        }

        let x3 = $("input[name='upgradeNumber']:checked").val() ? $("input[name='upgradeNumber']:checked").val() : 'X';
        switch (x3) {
            case 'X':
                ($("input[name='upgradeNumber']")).closest('fieldset').removeClass('ReqValueOk');
                ($("input[name='upgradeNumber']")).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($("input[name='upgradeNumber']")).closest('fieldset').removeClass('noReqValue');
                ($("input[name='upgradeNumber']")).closest('fieldset').addClass('ReqValueOk');
        }

        let x4 = $('#executionclassicEpaNumber').val() ? $('#executionclassicEpaNumber').val() : 'X';
        switch (x4) {
            case 'X':
                ($('#executionclassicEpaNumber')).closest('fieldset').removeClass('ReqValueOk');
                ($('#executionclassicEpaNumber')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#executionclassicEpaNumber')).closest('fieldset').removeClass('noReqValue');
                ($('#executionclassicEpaNumber')).closest('fieldset').addClass('ReqValueOk');
        }

        let x5 = $("input[name='engineUpgrade']:checked").val() ? $("input[name='engineUpgrade']:checked").val() : 'X';
        switch (x5) {
            case 'X':
                ($('#engineUpgrade')).closest('fieldset').removeClass('ReqValueOk');
                ($('#engineUpgrade')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#engineUpgrade')).closest('fieldset').removeClass('noReqValue');
                ($('#engineUpgrade')).closest('fieldset').addClass('ReqValueOk');
        }

        let x6 = $("input[name='additional-1']:checked").val() ? $("input[name='additional-1']:checked").val() : '';
        let x7 = $("input[name='additional-2']:checked").val() ? $("input[name='additional-2']:checked").val() : '';
        let x8 = $("input[name='additional-3']:checked").val() ? $("input[name='additional-3']:checked").val() : '';

        let x9 = $('#climate').val() ? $('#climate').val() : 'X';
        switch (x9) {
            case 'X':
                ($('#climate')).closest('fieldset').removeClass('ReqValueOk');
                ($('#climate')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#climate')).closest('fieldset').removeClass('noReqValue');
                ($('#climate')).closest('fieldset').addClass('ReqValueOk');
        }

        let x10 = $('#outVal').val();
        switch (x10) {
            case '':
                ($('#outVal')).closest('fieldset').removeClass('ReqValueOk');
                ($('#outVal')).closest('fieldset').addClass('noReqValue');
                break;
            case null:
                ($('#outVal')).closest('fieldset').removeClass('ReqValueOk');
                ($('#outVal')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#outVal')).closest('fieldset').removeClass('noReqValue');
                ($('#outVal')).closest('fieldset').addClass('ReqValueOk');
        }
        let x11 = $('#roundMoment').val();
        switch (x11) {
            case null:
                ($('#roundMoment')).closest('fieldset').removeClass('ReqValueOk');
                ($('#roundMoment')).closest('fieldset').addClass('noReqValue');
                break;
            case '':
                ($('#roundMoment')).closest('fieldset').removeClass('ReqValueOk');
                ($('#roundMoment')).closest('fieldset').addClass('noReqValue');
                break;
            default:
                ($('#roundMoment')).closest('fieldset').removeClass('noReqValue');
                ($('#roundMoment')).closest('fieldset').addClass('ReqValueOk');
        }

        is_true = [x1, x2, x3, x4, x5, x6, x7].includes('X');

        mark_gen.text(x1 + '-' + x2 + x3 + '-' + x4 + x5 + x6 + x7 + x8 + x9);

        // Вывод сертификата и декларации
        $('#certs-pdf').empty();
        // if (!is_true && certs_pdf['classicEpa'][x2] !== undefined) {
        //     $('#certs-pdf').append(
        //         $('<a>')
        //             .attr({ href: 'pdf/' + certs_pdf['classicEpa'][x2]['cert'], target: '_blank' })
        //             .text('Сертификат')
        //             .css('padding', '1.5%'),
        //         $('<a>')
        //             .attr({ href: 'pdf/' + certs_pdf['classicEpa'][x2]['decl'], target: '_blank' })
        //             .text('Декларация')
        //             .css('padding', '1.5%')
        //     );
        // }

    });

    // информация для таблицы
    $("#modal-th").on('shown.bs.modal', function () {
        // constructive_scheme = Number.parseInt($('input[name="constructive-scheme"]:checked').val());
        let resistor = document.querySelector("#additional-1").checked ? document.querySelector("#additionalFieldset > div > div:nth-child(1)").innerText + ',' : '';
        let resistorValue = document.querySelector("#additional-1").checked ? document.querySelector("#additional-1").value : '';
        let switcher = document.querySelector("#additional-2").checked ? document.querySelector("#additionalFieldset > div > div:nth-child(2)").innerText + ',' : '';
        let switcherValue = document.querySelector("#additional-2").checked ? document.querySelector("#additional-2").value : '';
        let clockwise = document.querySelector("#additional-3").checked ? document.querySelector("#additionalFieldset > div > div:nth-child(3)").innerText + ' ' : '';
        let clockwiseValue = document.querySelector("#additional-3").checked ? document.querySelector("#additional-3").value : '';
        let listToAdd = resistor + switcher + clockwise;
        let listToAddValue = resistorValue + switcherValue + clockwiseValue;

        params = [
            { title: 'Исполнение электропривода по взрывозащите', value: $("input[name='epPlace']:checked").val(), description: $("input[name='epPlace']:checked").closest('.form-check').find('.form-check-label').text() },
            { title: 'Тип электропривода по присоединению:', value: $(document.querySelector("#connectionTypeForclassicEpa")).val() },
            { title: 'Порядковый номер модернизации', value: $("input[name='upgradeNumber']:checked").val() ? $("input[name='upgradeNumber']:checked").val() : 'Отсутствует' },
            { title: 'Частота вращения выходного вала', value: $('#outVal').val() },
            { title: 'Крутящий момент на выходном валу, Н*м', value: $('#roundMoment').val() },
            { title: 'Номер исполнения электропривода', value: $("select[name='executionclassicEpaNumber']").val() },
            { title: 'Число оборотов выходного вала, Н*м', value: $('#roundNumbers').val() },
            { title: 'Модификация электропривода:', value: $("input[name='engineUpgrade']:checked").val(), description: $("input[name='engineUpgrade']:checked").closest('.form-check').find('.form-check-label').text() },
            { title: 'Наличие дополнительных опций', value: listToAddValue, description: listToAdd ? listToAdd : '' },
            { title: 'Климатическое исполнение и категория размещения привода:', value: $("select[name='climate']").val() },
        ];

        // вывод таблицы
        resut_table = $("#result-table tbody").empty();
        $.each(params, function (key, item) {
            resut_table
                .append($("<tr>")
                    .append($("<td>").text(item.title))
                    .append($("<td>").text(item.value))
                    .append($("<td>").text(item.description))
                );
        });
    });
});            
