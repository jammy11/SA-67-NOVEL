import React from 'react';
import { Table } from 'antd';

const data = [
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '20/02/2024 15:04:11',
      Amount: '+500',
    },
    {
      Type: 'ซื้อสินค้า#Shopee',
      Time: '21/02/2024 16:20:55',
      Amount: '-300',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '22/02/2024 10:30:44',
      Amount: '+1000',
    },
    {
      Type: 'ชำระบิล#ไฟฟ้า',
      Time: '23/02/2024 12:15:10',
      Amount: '-800',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '24/02/2024 09:50:21',
      Amount: '+200',
    },
    {
      Type: 'ซื้อสินค้า#Lazada',
      Time: '25/02/2024 18:05:37',
      Amount: '-1500',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '26/02/2024 11:24:39',
      Amount: '+700',
    },
    {
      Type: 'ชำระบิล#น้ำประปา',
      Time: '27/02/2024 14:02:53',
      Amount: '-300',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '28/02/2024 08:15:12',
      Amount: '+500',
    },
    {
      Type: 'ซื้อสินค้า#Central',
      Time: '01/03/2024 19:45:03',
      Amount: '-2500',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '02/03/2024 16:20:18',
      Amount: '+300',
    },
    {
      Type: 'ชำระบิล#โทรศัพท์',
      Time: '03/03/2024 12:55:27',
      Amount: '-450',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '04/03/2024 14:33:19',
      Amount: '+600',
    },
    {
      Type: 'ซื้อสินค้า#Amazon',
      Time: '05/03/2024 17:45:12',
      Amount: '-1200',
    },
    {
      Type: 'เติมเหรียญ#truemoney',
      Time: '06/03/2024 10:05:47',
      Amount: '+800',
    },
    {
      Type: 'ชำระบิล#อินเทอร์เน็ต',
      Time: '07/03/2024 09:10:34',
      Amount: '-600',
    },
  ];

const Demo = () => (
  <Table
    dataSource={data}
    columns={[
      { title: 'ประเภท', dataIndex: 'Type', key: 'Type' },
      { title: 'วัน/เวลา', dataIndex: 'Time', key: 'Time' },
      { title: 'ราคาสุทธิ', dataIndex: 'Amount', key: 'Amount' },
  
    ]}
  />
);

export default Demo; 
