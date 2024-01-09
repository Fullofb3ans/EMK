$(document).ready(function () {
    checkUser();

    function alertBitrix() {
        $('#containerForPI').html('Для пользования личным кабинетом, предназначенным для файлового хранения, вам необходимо зайти со своего браузера в учетную запись intranet, перейти во вкладу "сервисы" и нажать "подбор оборудования" (либо перейти по <a style="color:blue" href="https://portal.emk.ru/intranet/tools/configurator.php">ссылке</a>), после чего вернуться на эту страницу.');
    }

    function checkUser() {
        fetch('https://emk.websto.pro/user', {
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.valid == false) { return alertBitrix() }
                else {
                    $('#containerForPI').empty();
                    $('#container').empty();
                    $('#containerForSearch').show();
                    $('#containerForPI').append(
                        $('<h5 class="textInlk">').text(res.user.fio[1] + ' ' + res.user.fio[0] + ' ' + res.user.fio[2])).append(
                            $('<div class="textInlk">').text(res.user.department));
                    console.log(res.valid);
                    console.log(res);
                    return listToHtml(res.user.user_id);
                }
            });
    }

    function listToHtml(id) {
        fetch(`https://emk.websto.pro/user_files/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                let ress = { date: res };
                console.log(ress);
                console.log('resDATE: ' + ress.date);
                const arr = Object.entries(ress.date);
                arr.reverse();
                const sortedObj = {
                    date: Object.fromEntries(arr)
                };

                $.each(sortedObj.date, function (date, items) {
                    let divForDate = $('<div>').text(date).addClass('dataToggle');
                    divForDate.on('click', function () {
                        $(this).next().toggleClass('hidden');
                    });
                    let ul = $('<ul>').addClass('selectFlexForLk');
                    ul.addClass('hidden');
                    $('#container').append(divForDate);


                    $.each(items.reverse(), function (index, item) {
                        console.log(items);
                        console.log(item.id);
                        let li = $('<li>').addClass('flexContForLk');
                        li.on('click', function () {
                            window.open(`https://emk.websto.pro/getFile/${item.id}`)
                        });
                        if (!item.text.toLowerCase().includes($('#searchField').val().toLowerCase())) {
                            return null;
                        }
                        let a = $('<p>').text(item.text).css('overflow-wrap', 'break-word');
                        let docxlImg = $('<img>').attr('src', './img/word.png').addClass('typeIcon');
                        let pdfImg = $('<img>').attr('src', './img/pdf.png').addClass('typeIcon');
                        let xlsxImg = $('<img>').attr('src', './img/excel.png').addClass('typeIcon');

                        if (a.text().includes('xlsx')) {
                            li.prepend(xlsxImg);
                        } else if (a.text().includes('docx')) {
                            li.prepend(docxlImg);
                        } else if (a.text().includes('pdf')) {
                            li.prepend(pdfImg);
                        }

                        ul.append(li.append(a));
                    });

                    $('#container').append(ul);
                    removeEmpty();
                });
            });
    }

    function removeEmpty() {
        console.log('удаляем');
        const ulList = document.querySelectorAll('.selectFlexForLk');
        ulList.forEach(ul => {
            const divForDate = ul.previousElementSibling;
            if (ul.childElementCount === 0) {
                divForDate.remove();
                ul.remove();
            }
        });
        if (document.querySelector("#container").childElementCount == '0') {
            $("#container").append('p').text('По вашему запросу результаты не найдены.')
        }
    }

    $('#searchSubmit').on('click', function () {
        checkUser();
    });
});
