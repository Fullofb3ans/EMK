from fastapi import FastAPI, Body
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
#import starlette.status as status

import random
from random import randint

import docx
from docx.shared import Cm
from docx2pdf import convert

import openpyxl
from openpyxl import load_workbook
from openpyxl import Workbook
from datetime  import date

import os



def make_clean():
    pul = os.listdir(path='.')
    if len(pul) >= 10:
        for file in pul:
            if "Tula" in file:
                os.remove(file)



def get_para_data(output_doc_name, paragraph):
    output_para = output_doc_name.add_paragraph()
    for run in paragraph.runs:
        output_run = output_para.add_run(run.text)
        # Run's bold data
        output_run.bold = run.bold
        # Run's italic data
        output_run.italic = run.italic
        # Run's underline data
        output_run.underline = run.underline
        # Run's color data
        output_run.font.color.rgb = run.font.color.rgb
        # Run's font data
        output_run.style.name = run.style.name
    # Paragraph's alignment data
    output_para.paragraph_format.alignment = paragraph.paragraph_format.alignment

def get_engin(mark, sh, Mom, V, flc):
    ans = []
    for i in range(6):
        ans.append("")
    if mark[:3] == "ЭП4":
        wb1 = load_workbook('ep4.xlsx')
        sheet1 = wb1['Электродвигатели']
        anss = []
        ansi = []
        for i in range(9, 575):
            if str(sheet1[f"F{i}"].value) == str(flc):
                anss.append(i)
                print(i, str(sheet1[f"F{i}"].value))

        for i in anss:
            if (str(sheet1[f"C{i}"].value) == str(sh)) and (str(sheet1[f"E{i}"].value) == str(Mom)) and (str(sheet1[f"D{i}"].value) == str(V)) and (str(sheet1[f"F{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
        
        if ansi != []:
            for i in anss:
                ans[0] = sheet1[f"J{i}"].value
                #ans[1] = sheet1[f"K{i}"].value
                ans[2] = sheet1[f"L{i}"].value
                ans[3] = sheet1[f"M{i}"].value
                ans[4] = "380"
                ans[5] = "3"
    return ans
        
    

app = FastAPI()

app.mount("/static", StaticFiles(directory="public", html=True))
app.mount("/static", StaticFiles(directory="/", html=True))



origins = [
    "http://217.144.103.121",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8080/eps.html",
    "http://localhost:8080/eps.js",
    "file:///C:/Users/Kyberlox/Desktop/kfg/ep4.html",
    "file:///C:/Users/Kyberlox/Desktop/kfg/ep4.js",
    "file:///C:/Users/Kyberlox/Desktop/kfg/style.css"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],#, "OPTIONS", "DELETE", "PATH", "PUT"],
    allow_headers=["Content-Type", "Accept", "Location", "Allow", "Content-Disposition", "Sec-Fetch-Dest"],
)



@app.get("/")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/select.html")

@app.get("/ep4")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/ep4.html")

@app.get("/epn")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/epn.html")

@app.get("/ep4Reductor")
def root():
    return RedirectResponse("http://127.0.0.1:8000/static/ep4Reductor.html")


@app.get("/Tula/{ID}", response_class = FileResponse)
def download_file(ID):
    #headers = {'Content-Disposition': f'attachment; filename="Tula{ID}.pdf"'}
    return FileResponse(f'Tula{ID}.docx', filename='демо ОЛ ТЭП.docx', media_type='application/docx')#, headers=headers)

@app.get("/TulaEXEL/{ID}", response_class = FileResponse)
def download_file(ID):
    return FileResponse(f'Tula{ID}.xlsx', filename='демо Формат ТКП.xlsx', media_type='application/xlsx')#, headers=headers)



@app.post("/download")
def download_file(jsn = Body()):
    '''jsn = { 
    u"jsn1" : [u"Тип арматуры", u"Маркировка", u"Завод-изготовитель", u"Номинальное давление: ", u"Диаметр:", u"Требуемое время закрытия: не более ", u"Требуемое время закрытия: не менее", u"Максимальный крутящий момент / (Усилие): На открывание", u"Максимальный крутящий момент / (Усилие): На закрывание", u"Присоединение к приводу:", u"Кол-во оборотов (угол поворота) для закрытия арматуры", u"Рабочая среда:", u"Установка"],
    u"jsn2" : ["Исполнение по назначению", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 
    u"jsn3" : ["29", "август", "ООО ЧК огрн", "Жмышенко Валерий Альбертович", "+7 948 367 99-99", "jmsh.val.99@gmail.com", "Конструктивная схема", "Крутящий момент", "Частота"],
    u"jsn4" : ["Поворотный/многооборотный", "Угол поворота, граусов", "Ход штока, мм", "Наименование блока управления", "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы", "Тип присоединения выходного вала привода с валом арматуры", "Электрическое подключение", "Защита от коррозии", "Концевые выключатели (реле)", "Промежуточные выключатели (опция)", "Моментные выключатели", "Сигнализация включения ручного маховика", "Дистанционный указатель положения /датчики обратной связи)", "Электрическое подключение Подробная расшифровка параметра дается в зависимости от производителя", "Ручной селектор/переключение местного дистанционного управления", "Наличие обогрева", "Монтаж блока управления ", "Налияие и тип функции", "Функция при питании", "Условие для запуска аварийной функции", "Требования по функциональной безопасности SIL", "Специальное исполнение", "Масса привода, кг"]
    }'''


    '''Чтение и форматирование JSON'''
    jsn1 = jsn["jsn1"]
    jsn2 = jsn["jsn2"]
    jsn3 = jsn["jsn3"]
    jsn4 = jsn["jsn4"]
    jsn3[0] = '__'
    jsn3[1] = '___________'

    
    '''Подготовка и сбор данных'''
    a = [' в помещении (под навесом)', ' под открытым небом', ' ']
    fst = { 
        'Тип арматуры: ' : f' {jsn1[0]}',
        'Маркировка: ' : f' {jsn1[1]}',
        'Завод-изготовитель: ' : f' {jsn1[2]}',
        'Номинальное давление: ' : f' Ру {jsn1[3]} МПа',
        'Диаметр: ' : f' Ду {jsn1[4]}  мм',
        'Требуемое время закрытия: ' : f' не более {jsn1[5]} сек., не менее {jsn1[6]} сек.',
        'Максимальный крутящий момент / (Усилие): ' : f' На открывание {jsn1[7]} Нм / (кН) \n На закрывание {jsn1[8]} Нм / (кН)',
        'Присоединение к приводу: ' : f'{jsn1[9]}',
        'Кол-во оборотов (угол поворота) для закрытия арматуры:' : f'{jsn1[10]} об. (град.)',
        'Рабочая среда: ' : f'{jsn1[11]}',
        'Установка ' : a[int(jsn1[12])]
    }

    SP = [
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '✓ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n ✓  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n ✓ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t ✓ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t ✓ 220 B AC \n □ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n ✓ 6 реле \t □ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t ✓ 8 реле \t □ 12 реле ',
        '□ потенциометр 100 ОМ \n □  4-20 мА \n □ 24 В DC \t □ 48 B DC \t □ 220 B AC \n □ 6 реле \t □ 8 реле \t ✓ 12 реле ',
        ]

    SDU = [
        '□ 4-20 мА \n □  RS485 Modbus \t □  RS485 Profibus \n □ 24 В DC \t □ 220 B AC',
        '✓ 4-20 мА \n □  RS485 Modbus \t □  RS485 Profibus \n □ 24 В DC \t □ 220 B AC',
        '□ 4-20 мА \n ✓  RS485 Modbus \t □  RS485 Profibus \n □ 24 В DC \t □ 220 B AC',
        '□ 4-20 мА \n □  RS485 Modbus \t ✓  RS485 Profibus \n □ 24 В DC \t □ 220 B AC',
        '□ 4-20 мА \n □  RS485 Modbus \t □  RS485 Profibus \n ✓ 24 В DC \t □ 220 B AC',
        '□ 4-20 мА \n □  RS485 Modbus \t □  RS485 Profibus \n □ 24 В DC \t ✓ 220 B AC'  
        ]

    a = [
        [u' запорный', u' запорно-регулирующий'],
        [u' IP54', u' IP55', u' IP67', u' IP68'],
        [' По часовой стрелке', ' Против часовой стрелки'],
        [' ✓ БКВ \n □ ЭБКВ', ' □ БКВ \n ✓ ЭБКВ',' □ БКВ \n □ ЭБКВ',],
        [' ✓ ЭИМУ⃰ \n □ ВИМУ⃰   (установка на стене, стойке и т.п.)', ' □ ЭИМУ⃰ \n ✓ ВИМУ⃰   (установка на стене, стойке и т.п.)', '□ ЭИМУ⃰ \n □ ВИМУ⃰   (установка на стене, стойке и т.п.)'],
        [' □ Да \n ✓ Нет', ' ✓ Да \n  □ Нет', ' □ Да \n  □ Нет'],
        [' □ 24 В DC  \n □ 48 В DC \n □ 220 B AC', ' ✓ 24 В DC \n □ 48 В DC \n □ 220 B AC', ' □ 24 В DC \n ✓ 48 В DC \n □ 220 B AC', ' □ 24 В DC \n □ 48 В DC \n ✓ 220 B AC'],
        [' □ Да ___ Шт \n ✓ Нет', f' ✓ Да {jsn2[13]} Шт \n  □ Нет'],
        [' □ Да ___ Шт тип ___ \n ☑ Нет', f' ✓ Да {jsn2[15]} Шт  тип {jsn2[16]} \n  □ Нет'],
        [' ✓ Серый (стандарт) \n □ Другой:  RAL ______', f' □ Серый (стандарт) \n ✓ Другой:  RAL {jsn2[18]}'],
        [' □ механический селектор переключения режима работы местн./дист; \n □  плата регистратор; ', ' ✓ механический селектор переключения режима работы местн./дист; \n □  плата регистратор; ', ' □ механический селектор переключения режима работы местн./дист; \n ✓  плата регистратор; ', ' ✓ механический селектор переключения режима работы местн./дист; \n ✓  плата регистратор; ']

    ]

    ans  = get_engin(jsn1[1], jsn3[6], jsn3[7], jsn3[8], jsn1[9])
    scd = {
        'Исполнение по назначению' : f' {jsn2[0]}',
        'Режим работы' : f'{jsn2[1]}',
        'Степень защиты от проникновения пыли и влаги' : f'{jsn2[2]}',
        'Вращение выходного вала при закрывании:' : f'{jsn2[3]}',
        'Температура окружающей среды (Климат)' : f'{jsn2[4]} ',
        'Тип блока концевых выключателей (без встроенного пускателя)' : a[3][int(jsn2[5])],
        'Тип блока управления привода (со встроенным пускателем)' : a[4][int(jsn2[6])],
        
        'Механический указатель сигнализации положения' : a[5][int(jsn2[7])],
        'Сигнализация положения' : SP[int(jsn2[8])],
        'Сигналы дистанционного управления (только для ЭИМУ или ВИМУ)' : SDU[int(jsn2[9])],
        'Сигнал «Момент» 4-20 мА' : a[5][int(jsn2[10])],
        'Дублирование шины RS485' : a[5][int(jsn2[11])],
        'Кабельные вводы' : a[7][int(jsn2[12])], 
        'Штепсельные разъемы' : a[8][int(jsn2[14])],
        'Защитный колпак' : a[5][int(jsn2[19])],
        'Цвет окраски' : a[9][int(jsn2[17])],
        'Напряжение питания электродвигателя' : f"{ans[4]} B, ____ Гц, {ans[5]} фаз",
        'Количество эл./приводов' : f' {jsn2[20]} шт.',
        'Дополнительные опции:' : a[10][int(jsn2[21])],
        'Дополнительные требования:' : f'{jsn2[22]}'
    }



    '''Работа с .docx'''
    doc = docx.Document('Опросный_лист_ТЭП.docx')
    doc_new = docx.Document()
    
    img = doc_new.add_picture('img.png', width=Cm(1.76), height=Cm(1.67))

    for para in doc.paragraphs:
        if para.text == 'ОРГАНИЗАЦИЯ - заказчик: ______________________________________________________':
            para.text = f'ОРГАНИЗАЦИЯ - заказчик: \t {jsn3[2]}'
        if para.text == 'Ф.И.О. ____________________ Тел: ____________________ E-mail:_____________________':
            para.text = f'Ф.И.О. \t  {jsn3[3]} \n Тел.: \t  {jsn3[4]} \n E-mail:  {jsn3[5]} \n \t\t\t \t\t\t \t\t Дата: «{jsn3[0]}» {jsn3[1]} 202_ г'
        
        get_para_data(doc_new, para)

        if para.text == 'Характеристика и параметры арматуры:':
            tbl1 = doc_new.add_table(rows=0, cols=2)
            tbl1.style = 'Table Grid'
            ks=list(fst.keys())
            vs=list(fst.values())
            for i in range(len(ks)):
                row_cells = tbl1.add_row().cells
                row_cells[0].text = ks[i]
                cell = tbl1.cell(i, 1)
                cell.text = vs[i]
            doc_new.add_paragraph()
            
        if para.text == 'Характеристика и параметры электропривода:':

            tbl1 = doc_new.add_table(rows=0, cols=2)
            tbl1.style = 'Table Grid'
            ks=list(scd.keys())
            vs=list(scd.values())
            for i in range(len(ks)):
                row_cells = tbl1.add_row().cells
                row_cells[0].text = ks[i]
                cell = tbl1.cell(i, 1)
                cell.text = vs[i]
    


    '''Работа с .xlsx'''
    # Load in the workbook
    wb = load_workbook('Формат_ТКП.xlsx')

    sheet = wb['Формат ТКП']

    #Лицевая часть
    current_date = date.today()
    keys = ["I7", "C9", "C10", "C12", "C61"]
    ans = ["Внутренний номер ТКП (совпадает с номером ОЛ)", jsn3[2], None, jsn1[0], str(current_date)]

    for i in range(len(keys)):
        if ans[i] != None:
            sheet[keys[i]].value = ans[i]

    #Техническая часть
    keys = []
    for i in range(16, 52):
        k = 'G' + str(i)
        keys.append(k)

    ans = [ f'{jsn4[0]}', #0 "Поворотный/многооборотный",
            
            f'{jsn2[1]}', #1 "Запорный/ регулирующий",
            None, #2 "Режим работы привода",
            f'{jsn2[0]}', #3 "взрывозащита/Рудничное/АЭС и тд",
            f'{jsn1[9]}', #4 "Тип присоединительного фланца ",
            f'{jsn3[7]}', #5 "Верхний предел настройки крутящего момента",
            f'{jsn3[8]}', #6 "Частота вращения выходного вала ",
            f' не более {jsn1[5]} сек., не менее {jsn1[6]} сек.', #7 "Время рабочего хода/Время срабатывания",

            f'{jsn4[1]}', #8 "Угол поворота, граусов",
            f'{jsn4[2]}', #9 "Ход штока, мм",
            f'{jsn4[3]}', #10 "Наименование блока управления"
            f'{jsn4[4]}', #11 "Тип управления: Расшифровка дается по всем возможным параментрам, протоколы, возможне сигналы",

            f'{jsn2[4]}', #12 "Температурное исполнение: температурный режим, климат,  в укрытии или под навесом",

            f'{jsn4[5]}', #13 "Тип присоединения выходного вала привода с валом арматуры",

            f'{jsn2[3]}', #14 "Вращение выходного вала при закрывании",
            f'{jsn2[2]}', #15 "Уровень пылевлагозащиты",
            a[9][int(jsn2[17])], #15 "Цвет окраски",

            f'{jsn4[6]}', #16 "Электрическое подключение",
            f'{jsn4[7]}', #17 "Защита от коррозии",
            f'{jsn4[8]}', #18 "Концевые выключатели (реле)",
            f'{jsn4[9]}', #19 "Промежуточные выключатели (опция)",
            f'{jsn4[10]}', #20 "Моментные выключатели",
            f'{jsn4[11]}', #21 "Сигнализация включения ручного маховика",

            a[5][int(jsn2[7])], #21 "Механический указатель положения",

            f'{jsn4[12]}', #22 "Дистанционный указатель положения /датчики обратной связи)",
            f'{jsn4[13]}', #24 "Электрическое подключение ",
            
            f'{jsn4[14]}', #25 "Ручной селектор/переключение местного дистанционного управления",
            f'{jsn4[15]}', #26 "Наличие обогрева",
            f'{jsn4[16]}', #27 "Монтаж блока управления ",
            f'{jsn4[17]}', #28 "Налияие и тип функции",
            f'{jsn4[18]}', #29 "Функция при питании",
            f'{jsn4[19]}', #30 "Условие для запуска аварийной функции",
            f'{jsn4[20]}', #31 "Требования по функциональной безопасности SIL",
            f'{jsn4[21]}', #32 "Специальное исполнение",
            None,
            f'{jsn4[22]}'  #33 "Масса привода, кг"
        ]



    for i in range(len(keys)):
        if (ans[i] != None) or (ans[i] != ''):
            sheet[keys[i]].value = ans[i]
        else:
            sheet[keys[i]].value = "Заполняется автоматически"



    #Характеристики двигателя
    keys = []
    for i in range(53, 59):
        k = 'G' + str(i)
        keys.append(k)



    ans = [
        None, #0 "Мощность, которую способен развивать двигатель привода, Вт",
        None, #1 "Потребляемая из сети электрическая можность, Вт",
        None, #2 "Пусковой ток",
        None, #3 "Номинальный ток",
        None, #4 "Напряжение питания",
        None, #5 "Количество фаз"
    ]
    

    
    mark = jsn1[1]
    if mark[:3] == "ЭП4":
        wb1 = load_workbook('ep4.xlsx')
        sheet1 = wb1['Электродвигатели']
        #конструктивная схема
        sh = jsn3[6]
        #крутящий момент
        Mom = jsn3[7]
        #частота вращения
        V = jsn3[8]
        #фланец
        flc = jsn1[9]
        anss = []
        ansi = []
        for i in range(9, 575):
            if str(sheet1[f"F{i}"].value) == str(flc):
                anss.append(i)
                print(i, str(sheet1[f"F{i}"].value))

        for i in anss:
            if (str(sheet1[f"C{i}"].value) == str(sh)) and (str(sheet1[f"E{i}"].value) == str(Mom)) and (str(sheet1[f"D{i}"].value) == str(V)) and (str(sheet1[f"F{i}"].value) == str(flc)):
                ansi.append(i)
                print(i)
        
        if ansi != []:
            for i in anss:
                ans[0] = sheet1[f"J{i}"].value
                #ans[1] = sheet1[f"K{i}"].value
                ans[2] = sheet1[f"L{i}"].value
                ans[3] = sheet1[f"M{i}"].value
                ans[4] = "380"
                ans[5] = "3"



    for i in range(len(keys)):
        if ans[i] != None:
            sheet[keys[i]].value = ans[i]



    #Схема подключения, номер (если известна)
    sheet["G59"].value = "пока нет понимания как это формируется, помощь ТЭП и зала. Если известен номер заполняется автоматически, если нет - ОЛ направляется  на доработку "

    #Сборочный чертеж, номер
    sheet["G460"].value = "пока нет понимания как это формируется, помощь ТЭП и зала. Если известен номер заполняется автоматически, если нет - ОЛ направляется  на доработку "



    "Работа с файлами"
    #сборщик мусора
    make_clean()

    #сохранение файлов с уникальным id
    ID = randint(0, 1000)
    doc_new.save(f'Tula{ID}.docx')
    wb.save(f"Tula{ID}.xlsx")
    #convert(f"Tula{ID}.docx")



    return {"id" : ID}