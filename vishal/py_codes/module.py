import random
import pandas as pd
import numpy as np
import pmdarima as arima_model
import datetime
import os
import re
import openpyxl
import ast
import configparser

config = configparser.ConfigParser()
# config.read('.ini')
config.read('config.txt')
datasets_path = config['PATH']['datasets_path']
product_file_name = config['PATH']['product_file_name']
fg_sheet_name = config['PATH']['fg_sheet_name']
fg_rm_sheet_name = config['PATH']['fg_rm_sheet_name']
bom_sheet_name = config['PATH']['bom_sheet_name']
rm_sheet_name = config['PATH']['rm_sheet_name']
contracts_file_name = config['PATH']['contracts_file_name']
contracts_sheet_name = config['PATH']['contracts_sheet_name']
invoices_file_name = config['PATH']['invoices_file_name']
sample_json_path = config['PATH']['sample_json_path']
inventory_file_name = config['PATH']['inventory_file_name']
open_po_file_name = config['PATH']['open_po_file_name']
production_plans_file_name = config['PATH']['production_plans_file_name']

print_status = int(config['PRINT']['print_status'])

production_plan_delta_days = int(config['LOGIC']['production_plan_delta_days'])


def get_fg_data():
    df_data = pd.read_excel(os.path.join(datasets_path, product_file_name), fg_sheet_name)
    return df_data


def get_fg_rm_data():
    df_data = pd.read_excel(os.path.join(datasets_path, product_file_name), fg_rm_sheet_name)
    df_data.ffill(inplace=True)
    df_data['FG Part No.'] = df_data['FG Part No.'].astype(int)
    return df_data


def get_bom_data():
    df_data = pd.read_excel(os.path.join(datasets_path, product_file_name), bom_sheet_name)
    df_data.ffill(inplace=True)
    df_data['Part No.'] = df_data['Part No.'].astype(int)
    return df_data


def get_rm_data():
    df_data = pd.read_excel(os.path.join(datasets_path, product_file_name), rm_sheet_name)
    return df_data


def get_contracts_data():
    df_data = pd.read_excel(os.path.join(datasets_path, contracts_file_name), contracts_sheet_name)
    df_data['signed_date'] = pd.to_datetime(df_data['signed_date']).apply(lambda el: el.date())
    df_data['onboarded_on'] = pd.to_datetime(df_data['onboarded_on']).apply(lambda el: el.date())
    df_data['expiry_date'] = pd.to_datetime(df_data['expiry_date']).apply(lambda el: el.date())

    df_data['total_qty'] = df_data.total_qty.map(lambda el: ast.literal_eval(el))
    df_data['per_order_qty'] = df_data.per_order_qty.map(lambda el: ast.literal_eval(el))
    df_data['min_order_qty'] = df_data.min_order_qty.map(lambda el: ast.literal_eval(el))
    return df_data


def get_invoices():
    df_data = pd.read_excel(os.path.join(datasets_path, invoices_file_name))
    df_data['invoice_date'] = pd.to_datetime(df_data['invoice_date'])
    return df_data


def get_inventory():
    df_data = pd.read_excel(os.path.join(datasets_path, inventory_file_name))
    return df_data


def get_open_po():
    df_data = pd.read_excel(os.path.join(datasets_path, open_po_file_name))
    df_data['invoice_date'] = pd.to_datetime(df_data['invoice_date']).apply(lambda el: el.date())
    return df_data


def get_production_plans():
    df_data = pd.read_excel(os.path.join(datasets_path, production_plans_file_name))
    df_data['invoice_date'] = pd.to_datetime(df_data['invoice_date']).apply(lambda el: el.date())
    df_data['plan_create_datetime'] = pd.to_datetime(df_data['plan_create_datetime'])
    df_data['completion_datetime'] = pd.to_datetime(df_data['completion_datetime'])
    df_data['total_order_completion_date'] = pd.to_datetime(df_data['total_order_completion_date']).apply(lambda el: el.date())
    return df_data


df_fg = get_fg_data()
df_fg_rm = get_fg_rm_data()
df_bom = get_bom_data()
df_rm = get_rm_data()
df_customers = get_contracts_data()
df_invoices = get_invoices()
df_inventory = get_inventory()
df_open_po = get_open_po()
df_production_plans = get_production_plans()


# creating sample jsons for UI
def create_sample_jsons():
    df_fg_rm.to_json(path_or_buf=os.path.join(sample_json_path, 'fg_rm.json'), indent=4, orient='records')
    df_fg.to_json(path_or_buf=os.path.join(sample_json_path, 'fg.json'), indent=4, orient='records')
    df_bom.to_json(path_or_buf=os.path.join(sample_json_path, 'bom.json'), indent=4, orient='records')
    df_rm.to_json(path_or_buf=os.path.join(sample_json_path, 'rm.json'), indent=4, orient='records')
    df_customers.to_json(path_or_buf=os.path.join(sample_json_path, 'contracts.json'), indent=4, orient='records',
                         date_format='iso')
    df_invoices.to_json(path_or_buf=os.path.join(sample_json_path, 'invoices.json'), indent=4, orient='records',
                        date_format='iso')
    df_inventory.to_json(path_or_buf=os.path.join(sample_json_path, 'inventory.json'), indent=4, orient='records',
                         date_format='iso')
    df_open_po.to_json(path_or_buf=os.path.join(sample_json_path, 'open_po.json'), indent=4, orient='records',
                       date_format='iso')
    df_production_plans.to_json(path_or_buf=os.path.join(sample_json_path, 'production_plans.json'), indent=4,
                                orient='records', date_format='iso')


# generate an invoice when triggerd on UI
def generate_invoice(customer_name, fg_info, ship_to, ship_from, invoice_to, invoice_date, premium_amount=0,
                     invoice_number='generate'):
    global df_invoices

    # generate invoice number
    if invoice_number == 'generate':
        invoice_numbers = df_invoices['invoice_number'].tolist()
        max_invoice_number = max([int(re.sub('INV-', '', el)) for el in invoice_numbers])
        invoice_number = f'INV-{max_invoice_number + 1:03d}'

    # Calculate each fg amount
    fg_info['FG Name'] = fg_info['fg'].apply(lambda el: df_fg[df_fg['FG Number'] == el]['FG Name'].iloc[0])
    fg_info['unit_rate'] = fg_info['fg'].apply(lambda el: df_fg[df_fg['FG Number'] == el]['Cost ($)'].iloc[0])
    fg_info['amount'] = fg_info['qty'] * fg_info['unit_rate']

    # Calculate the total amount
    total_amount = sum(fg_info['amount']) + premium_amount

    # Return the invoice data as a dictionary
    invoice_data = {
        'invoice_number': invoice_number,
        'invoice_date': invoice_date,
        'customer_name': customer_name,
        'invoice_to': invoice_to,
        'ship_to': ship_to,
        'ship_from': ship_from,
        'FG Number': ', '.join([str(el) for el in fg_info['fg']]),
        'quantities': ', '.join([str(el) for el in fg_info['qty']]),
        'unit_rate': ', '.join([str(el) for el in fg_info['unit_rate']]),
        'amount': ', '.join([str(el) for el in fg_info['amount']]),
        'premium_amount': premium_amount,
        'total_amount': total_amount
    }

    df_cur_invoice = pd.DataFrame([invoice_data])
    nan_cols = [col for col in df_invoices.columns.to_list() if col not in df_cur_invoice.columns.tolist()]
    df_cur_invoice[nan_cols] = np.nan

    df_invoices = pd.concat([df_invoices, df_cur_invoice], ignore_index=True)

    df_invoices.to_excel(os.path.join(datasets_path, invoices_file_name), index=False)

    if invoice_number == 'generate':
        add_new_open_po(invoice_number, invoice_date, fg_info, customer_name, total_amount, premium_amount,
                        status='order received')

    else:
        if (datetime.datetime.today().date() - datetime.datetime.strptime(invoice_date, '%Y-%m-%d').date()).days < 5:
            add_new_open_po(invoice_number, invoice_date, fg_info, customer_name, total_amount, premium_amount,
                            status='order received')
        else:
            add_new_open_po(invoice_number, invoice_date, fg_info, customer_name, total_amount, premium_amount,
                            status='delivered')


# generate random invoices for sample data
def generate_random_invoices(num_of_invoices):
    for i in range(num_of_invoices):
        invoice_number = f'INV-{i + 1:03d}'

        # Randomly select a client
        customer_name = random.choice(
            df_customers[df_customers['expiry_date'] > datetime.datetime.today().date()]['customer_name'].tolist())
        df_cur_customer = df_customers[df_customers['customer_name'] == customer_name]
        all_fg = list(df_cur_customer['total_qty'].iloc[0].keys())
        fgs = list(set(random.choices(all_fg, k=len(all_fg))))
        fg_info = pd.DataFrame(columns=['fg', 'qty'])
        for fg in fgs:
            min_order_qty = df_cur_customer['min_order_qty'].iloc[0][fg]
            per_order_qty = df_cur_customer['per_order_qty'].iloc[0][fg]
            qty = random.randint(min_order_qty, per_order_qty)
            fg_info.loc[len(fg_info.index)] = [fg, qty]

        ship_to = df_cur_customer['ship_to'].iloc[0]
        ship_from = df_cur_customer['ship_from'].iloc[0]
        invoice_to = df_cur_customer['invoice_to'].iloc[0]

        start_date = df_cur_customer['signed_date'].iloc[0]
        end_date = datetime.datetime.today().date()

        # Randomly select a date within the specified range
        days_between_dates = (end_date - start_date).days
        random_days = random.randint(0, days_between_dates)
        invoice_date = str((start_date + datetime.timedelta(days=random_days)))

        # generate invoices
        generate_invoice(customer_name, fg_info, ship_to, ship_from, invoice_to,
                         invoice_date, 0, invoice_number)


# generate random inventory for sample data
def generate_inventory():
    all_fgs = df_fg_rm['FG Part No.'].dropna().unique()
    all_rms = df_fg_rm['Raw Material Part Number'].unique()

    fg_rm_list = []
    for fg in all_fgs:
        cur_dict = {'Part No.': fg}
        cur_dict.update({'Total Qty': random.randint(0, 25)})
        cur_dict.update({'Type': 'FG'})
        cur_dict.update({'In Transit (14 days) (RM)': 0})
        fg_rm_list.append(cur_dict)

    for rm in all_rms:
        cur_dict = {'Part No.': rm}
        rm_max_req = max(2, int(max(df_fg_rm[df_fg_rm['Raw Material Part Number'] == rm]['Quantity'])))
        cur_dict.update({'Total Qty': random.randint(rm_max_req * 15, rm_max_req * 100)})
        cur_dict.update({'In Transit (14 days) (RM)': random.randint(rm_max_req * 50, rm_max_req * 200)})
        cur_dict.update({'Type': 'RM'})
        fg_rm_list.append(cur_dict)

    df_inventory_generated = pd.DataFrame(fg_rm_list)
    df_inventory_generated['Tagged Qty'] = df_inventory_generated['Total Qty'].apply(lambda el: random.randint(0, max(1, int(el*0.1))))
    df_inventory_generated['Open Qty'] = df_inventory_generated['Total Qty'] - df_inventory_generated['Tagged Qty']

    df_inventory_generated.to_excel(os.path.join(datasets_path, 'inventory.xlsx'), index=False)

    if print_status:
        print('Inventory Generated!!')


def add_new_open_po(invoice_number, invoice_date, fg_info, customer_name, total_amount, premium_amount, status):
    global df_open_po

    order_no = re.sub('INV', 'ORD', invoice_number)

    for _, (fg, qty) in fg_info[['fg', 'qty']].iterrows():
        cur_open_po = {}
        cur_open_po.update({'order_no': order_no})
        cur_open_po.update({'invoice_date': invoice_date})
        cur_open_po.update({'part_no': fg})
        cur_open_po.update({'qty': qty})
        cur_open_po.update({'total_order_value': total_amount})
        cur_open_po.update({'premium_amount': premium_amount})
        cur_open_po.update({'customer_name': customer_name})
        cur_open_po.update({'status': status})

        df_cur_open_po = pd.DataFrame([cur_open_po])
        nan_cols = [col for col in df_open_po.columns.to_list() if col not in df_cur_open_po.columns.tolist()]
        df_cur_open_po[nan_cols] = np.nan

        # df_open_po_new = df_open_po_new._append(df_cur_open_po, ignore_index=True)
        df_open_po = pd.concat([df_open_po, df_cur_open_po], ignore_index=True)

        df_open_po.to_excel(os.path.join(datasets_path, open_po_file_name), index=False)

    if print_status:
        print('PO added:')
        print(df_cur_open_po)


def update_inventory(product_info):
    pass


def generate_priority(df_open_po_to_schedule):
    df_open_po_to_schedule = df_open_po_to_schedule.sort_values(
        by=['premium_amount', 'invoice_date', 'total_order_value'], ascending=[False, True, False])
    df_open_po_to_schedule['priority'] = range(1, len(df_open_po_to_schedule) + 1)
    return df_open_po_to_schedule


def generate_production_plan():
    global df_production_plans

    df_inventory_cur = df_inventory.iloc[:]

    if df_production_plans.shape[0] == 0:
        plan_id = f'PLN-001'
    else:
        plan_ids = df_production_plans['plan_id'].tolist()
        max_plan_id = max([int(re.sub('PLN-', '', el)) for el in plan_ids])
        plan_id = f'PLN-{max_plan_id + 1:03d}'

    plan_create_datetime = datetime.datetime.now()

    df_open_po_to_schedule = df_open_po[df_open_po['status'] == 'order received']
    df_open_po_to_schedule = generate_priority(df_open_po_to_schedule)

    df_production_plan_cur = pd.DataFrame(columns=df_production_plans.columns.tolist())

    production_start_time = (datetime.datetime.combine(datetime.datetime.today(), datetime.datetime.min.time()) +
                             datetime.timedelta(days=production_plan_delta_days))

    ongoing_manufacturing_time = production_start_time

    df_open_po_to_schedule = df_open_po_to_schedule.sort_values(by='priority')

    for _, (order_no, invoice_date, part_no, qty, priority) in (
            df_open_po_to_schedule[['order_no', 'invoice_date', 'part_no', 'qty', 'priority']].iterrows()):

        df_check_cur = df_fg_rm[df_fg_rm['FG Part No.'] == part_no][['FG Part No.', 'Raw Material Part Number', 'Quantity']]
        df_check_cur['required_qty'] = qty * df_check_cur['Quantity']
        df_check_cur['stock_available'] = df_check_cur['Raw Material Part Number'].apply(
            lambda el: int(df_inventory_cur[df_inventory_cur['Part No.'] == el]['Open Qty'].iloc[0]))
        df_check_cur['qty_delta'] = df_check_cur['stock_available'] - df_check_cur['required_qty']

        if all(df_check_cur['qty_delta']>=0):
            plan_status = 'good_to_start_manufacturing'
        else:
            plan_status = 'inventory_shortage'

        if plan_status == 'good_to_start_manufacturing':
            manufacturing_time_needed = int(df_fg[df_fg['FG Number'] == part_no]['Total Time'].iloc[0])
            total_manufacturing_time_needed = manufacturing_time_needed * qty

            completion_datetime = ongoing_manufacturing_time + datetime.timedelta(hours=total_manufacturing_time_needed)
            ongoing_manufacturing_time = completion_datetime

            for _, (rm, rm_qty) in df_check_cur[['Raw Material Part Number', 'required_qty']].iterrows():
                df_inventory_cur.loc[(df_inventory_cur['Part No.'] == rm), 'Tagged Qty'] += rm_qty
                df_inventory_cur.loc[(df_inventory_cur['Part No.'] == rm), 'Open Qty'] -= rm_qty

        else:
            completion_datetime = production_start_time + datetime.timedelta(days=45)

        df_production_plan_cur = pd.concat([df_production_plan_cur, pd.DataFrame([{
            'plan_id': plan_id,
            'plan_create_datetime': str(plan_create_datetime),
            'order_no': order_no,
            'invoice_date': invoice_date,
            'part_no': part_no,
            'qty': qty,
            'priority': priority,
            'completion_datetime': completion_datetime,
            'plan_status': plan_status
        }])], ignore_index=True)

    df_production_plan_cur['total_order_completion_date'] = df_production_plan_cur[['order_no', 'completion_datetime']].apply(lambda el: max(df_production_plan_cur[df_production_plan_cur['order_no'] == el['order_no']]['completion_datetime'].tolist()).date(), axis=1)
    df_production_plan_cur['total_order_plan_status'] = df_production_plan_cur[['order_no', 'plan_status']].apply(lambda el: 'inventory_shortage' if 'inventory_shortage' in (df_production_plan_cur[df_production_plan_cur['order_no'] == el['order_no']]['plan_status'].tolist()) else 'good_to_start_manufacturing', axis=1)

    df_production_plans = pd.concat([df_production_plans, df_production_plan_cur], ignore_index=True)

    df_production_plans.to_excel(os.path.join(datasets_path, production_plans_file_name), index=False)

    if print_status:
        print('production plan generated:', plan_id)

    return plan_id


def mindshift_main():
    # >>>>>>SAMPLE JSONs<<<<<<<

    # <ONCE> to create sample jsons for UI reference
    # create_sample_jsons()

    # >>>>>>>>INVOICE<<<<<<<

    # <ONCE> create random invoices to for sample
    # generate_random_invoices(100)

    # <DYNAMIC> call generate_invoice() to create actual invoice on the go
    # generate_invoice(customer_name='Green Tech Corp.', fg_info=pd.DataFrame({'fg': [801236, 805234], 'qty': [8, 8]}),
    #                  ship_to='400 Electric Dr, Power Plaza, Ampcity, 23456, USA',
    #                  ship_from='500 Energy Way, Innovation City, Techstate, 12345, USA',
    #                  invoice_to='400 Electric Dr, Power Plaza, Ampcity, 23456, USA', invoice_date=str(datetime.datetime.today().date()),
    #                  premium_amount=50, invoice_number='generate')

    # >>>>>>>>>INVENTORY<<<<<<<<<

    # <ONCE> create random inventory stock for both FG and RM
    # generate_inventory()

    # >>>>>>>>>>Generate Production Plan<<<<<<<<<<<<

    # <DYNAMIC> call generate_production_plan() to create product plan on all the open po
    # generated_plan_id = generate_production_plan()

    pass


mindshift_main()
