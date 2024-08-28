import React from 'react';
import { Table } from 'antd';

const data = [
    {
      Type: 'เติมเหรียญ',
      Payment:'ทรูวอเล็ต',
      NovelName: '-',
      Time: '20/02/2024 15:04:11',
      Amount: '+50',
    },
    {
      Type: 'ซื้อนิยาย',
      Payment:'-',
      NovelName: 'ฝืนชะตาท้าสามภพ',
      Time: '21/02/2024 16:20:55',
      Amount: '-30',
    },
    
    {
      Type: 'ซื้อนิยาย',
      Payment:'-',
      NovelName: 'จอมเทพโอสถ',
      Time: '21/02/2024 15:20:55',
      Amount: '-30',
    },
    {
      Type: 'เติมเหรียญ',
      Payment:'ทรูวอเล็ต',
      NovelName: '-',
      Time: '20/02/2024 15:04:11',
      Amount: '+50',
    },
    {
      Type: 'เติมเหรียญ',
      Payment:'เครดิต/เดบิต',
      NovelName: '-',
      Time: '20/02/2024 15:04:11',
      Amount: '+50',
    },
    {
      Type: 'เติมเหรียญ',
      Payment:'พร้อมเพย์',
      NovelName: '-',
      Time: '20/02/2024 15:04:11',
      Amount: '+50',
    },
    {
      Type: 'ถอน',
      Payment:'ธนาคารกรุงไทย',
      NovelName: '-',
      Time: '20/02/2024 15:04:11',
      Amount: '-550',
    },
  ];


  const Demo = () => (
    <>
      <Table
        dataSource={data}
        columns={[
          { title: 'ประเภท', dataIndex: 'Type', key: 'Type' },
          { title: 'ช่องทางการชำระเงิน', dataIndex: 'Payment', key: 'Payment' },
          { title: 'ชื่อเรื่อง', dataIndex: 'NovelName', key: 'NovelName' },
          { title: 'วัน/เวลา', dataIndex: 'Time', key: 'Time' },
          {
            title: 'ราคาสุทธิ',
            dataIndex: 'Amount',
            key: 'Amount',
            align: 'right',
            render: (text) => (
              <>
                {text} <img id='iconp' src="src/assets/coin-refill-50.svg" alt="" />
              </>
            ),
          },
        ]}
        className="large-text-table"
      />
    </>
  );
  
  export default Demo;
  