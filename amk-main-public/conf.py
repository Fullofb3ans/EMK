import docx
from docx.shared import Cm

import openpyxl
from openpyxl import load_workbook
from openpyxl import Workbook
from datetime  import date

class mk_DOCX():
    def __init__(self, list0 = [], list1 = [], list2 = [], list3 = [], list4 = [], list5 =[]):
        self.list0 = list0
        self.list1 = list1
        self.list2 = list2
        self.list3 = list3
        self.list4 = list4
        self.list5 = list5

    
    def ep4(self):

        names1 = ["Тип арматуры", "Маркировка", "Завод-изготовитель",  "Требуемое время закрытия", "Максимальный крутящий момент", "Присоединение к приводу", "Установка"]
        ans1 = self.list1[:-2]
        print(len(names1), len(ans1))
        for i in range(len(names1)):
            names1[i] = str(names1[i])
            ans1[i] = str(ans1[i])

        names2 = ['Исполнение по назначению', 'Режим работы', 'Степень защиты от проникновения пыли и влаги', 'Вращение выходного вала при закрывании', 'Температура окружающей среды (Климат)'] + ['Тип блока управления ', 'Сигнал дистанционного момента', 'Тип блока концевых выключателей (без встроенного пускателя)', 'Механический указатель сигнализации положения', 'Сигнализация положения', 'Сигнал «Момент» 4-20 мА', 'Дублирование шины RS485'] + ["Электрическое подключение", 'Защитный колпак', 'Цвет окраски', 'Напряжение питания электродвигателя', 'Количество эл./приводов', 'Дополнительные опции', 'Дополнительные требования']
        ans2 = self.list2 + [self.list3[0]] + self.list3[2:-4] + self.list4[:3] + ["330 В, 3 Фазы", self.list0[-2]] + self.list4[-2:]

        print(len(names2), len(ans2))
        for i in range(len(names2)):
            names2[i] = str(names2[i])
            ans2[i] = str(ans2[i])

        ans3 = self.list0[:-2]

        print(len(ans3))
        for i in range(len(ans3)):
            print(ans3[i])

        return {"names1" : names1, "names2" : names2, "ans1" : ans1, "ans2" : ans2, "ans3" : ans3}
    
class mk_XL():
    def __init__(self, jsn = [[], [], [], [], [], [], [], []]):
        self.jsn = jsn 

    def ep4(self):
        a = self.jsn
        wb = load_workbook('Формат_ТКП.xlsx')

        sheet = wb['Формат ТКП']

        #Лицевая часть
        current_date = date.today()
        keys = ["I7", "C9", "C10", "C12", "C61"]
        ans = ["Внутренний номер ТКП (совпадает с номером ОЛ)", jsn3[2], None, jsn1[0], str(current_date)]

        for i in range(len(keys)):
            if ans[i] != None:
                sheet[keys[i]].value = ans[i]
