import React, { useState, useEffect } from 'react';
import { Table, Select, Spin, Alert } from 'antd';
import { GetTransactionById } from '../services/https';


const { Option } = Select;

interface Transaction {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  trans_type: string;
  payment: string;
  PackageID: number;
  OrderID: number;
  UserID: number;
  Package: {
    pack_amount: number;
    pack_price: number;
    pack_pic: string;
  };
  Order: {
    Novel: {
      Name: string;
    };
  };
}

const Demo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const id = '1';
    GetTransactionById(id)
      .then((response) => {
        setData(response.data); // คาดว่าข้อมูลจะอยู่ใน response.data
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [selectedType]);

  const handleChange = (value: string) => {
    setSelectedType(value);
  };

  const filteredData = selectedType === 'All'
    ? data
    : data.filter(item => item.trans_type === selectedType);

  const columns = {
    All: [
      { title: 'ประเภท', dataIndex: 'trans_type', key: 'trans_type' },
      { title: 'ช่องทางการทำธุรกรรม', dataIndex: 'payment', key: 'payment' },
      { title: 'ชื่อเรื่อง', dataIndex: 'Order.Novel.Name', key: 'NovelName' },
      { title: 'วัน/เวลา', dataIndex: 'CreatedAt', key: 'CreatedAt' },
      {
        title: 'ราคาสุทธิ',
        dataIndex: 'Package.pack_price',
        key: 'Amount',
        align: 'right',
        render: (text: number) => <>{text} <img id='icon50' src={"src/assets/coin-50.png"} alt="coin" /></>,
      },
    ],
    // เพิ่มคอลัมน์สำหรับ 'Deposit', 'Withdraw', และ 'Purchase' ตามที่ต้องการ
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to fetch data." type="error" />;

  return (
    <>
      <Select defaultValue="All" onChange={handleChange} style={{ marginBottom: 16, width: 100 }}>
        <Option value="All">ทั้งหมด</Option>
        <Option value="เติมเหรียญ">ฝาก</Option>
        <Option value="ถอน">ถอน</Option>
        <Option value="ซื้อนิยาย">ซื้อ</Option>
      </Select>
      <Table
        dataSource={filteredData}
        columns={columns[selectedType]}
        className="large-text-table"
        rowKey="ID" // ใช้ rowKey เพื่อให้ React สามารถจัดการคีย์ของแถวได้ดีขึ้น
      />
    </>
  );
};

export default Demo;
