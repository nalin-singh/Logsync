import pandas as pd
import numpy as np
import pmdarima as arima_model
import datetime
import os
import re
import openpyxl
import ast

product_file_name = r'./datasets/FG and RM List.xlsx'
fg_sheet_name = 'FG_Battery'
fg_rm_sheet_name = 'FG_RM'
bom_sheet_name = 'BOM List'
rm_sheet_name = 'RM Part no.'

contracts_file_name = r'./datasets/contracts_info.xlsx'
contracts_sheet_name = 'contracts'


def get_fg_data():
    df_data = pd.read_excel(product_file_name, fg_sheet_name)
    return df_data


def get_fg_rm_data():
    df_data = pd.read_excel(product_file_name, fg_rm_sheet_name)
    df_data.ffill(inplace=True)
    df_data['FG Part No.'] = df_data['FG Part No.'].astype(int)
    return df_data


def get_bom_data():
    df_data = pd.read_excel(product_file_name, bom_sheet_name)
    df_data.ffill(inplace=True)
    df_data['Part No.'] = df_data['Part No.'].astype(int)
    return df_data


def get_rm_data():
    df_data = pd.read_excel(product_file_name, rm_sheet_name)
    return df_data


def get_contracts_data():
    df_data = pd.read_excel(contracts_file_name, contracts_sheet_name)
    df_data['signed_date'] = pd.to_datetime(df_data['signed_date'])
    df_data['onboarded_on'] = pd.to_datetime(df_data['onboarded_on'])
    df_data['expiry_date'] = pd.to_datetime(df_data['expiry_date'])

    df_data['total_qty'] = df_data.total_qty.map(lambda el: ast.literal_eval(el))
    df_data['per_order_qty'] = df_data.per_order_qty.map(lambda el: ast.literal_eval(el))
    df_data['min_order_qty'] = df_data.min_order_qty.map(lambda el: ast.literal_eval(el))
    return df_data


# df = get_fg_data()
# df.to_json(path_or_buf='sample_json/fg.json', indent=4, orient='records')
#
# df = get_fg_rm_data()
# df.to_json(path_or_buf='sample_json/fg_rm.json', indent=4, orient='records')
#
# df = get_bom_data()
# df.to_json(path_or_buf='sample_json/bom.json', indent=4, orient='records')
#
# df = get_rm_data()
# df.to_json(path_or_buf='sample_json/rm.json', indent=4, orient='records')
#
# df = get_contracts_data()
# df.to_json(path_or_buf='sample_json/contracts.json', indent=4, orient='records', date_format='iso')


def get_open_po():
    pass


def generate_production_plan():
    pass
