import React, { useState, useEffect } from "react";
import { Table, Select, Spin, Alert } from 'antd';
import { GetTransacUserID } from "../../services/https"; 
import { TransactionInterface } from "../../interface/transaction";import { format } from 'date-fns';
const { Option } = Select;

const user_id = localStorage.getItem("id") || "";

const History: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await GetTransacUserID(user_id);
        setTransactions(data);
        setFilteredData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    if (user_id) {
      fetchTransactions();
    } else {
      setError("No user ID found");
      setLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    const newFilteredData = selectedType === 'All' 
      ? transactions 
      : transactions.filter(item => {
          if (selectedType === 'Deposit' && item.trans_type === 'เติมเหรียญ') return true;
          if (selectedType === 'Withdraw' && item.trans_type === 'ถอน') return true;
          if (selectedType === 'Purchase' && item.trans_type === 'ซื้อนิยาย') return true;
          return false;
        });
    setFilteredData(newFilteredData);
  }, [selectedType, transactions]);

  const handleChange = (value: string) => {
    setSelectedType(value);
  };

  const columns: { [key: string]: any[] } = {
    All: [
      { title: 'ประเภท', dataIndex: 'trans_type', key: 'type', render: (text: string) => text },
      { title: 'ช่องทางการทำธุรกรรม', dataIndex: 'payment', key: 'payment', render: (text: string) => text },
      { title: 'ชื่อเรื่อง', dataIndex: 'Order', key: 'novel_name', render: (text: any) => text ? text.NovelName : '-' },
      { title: 'วัน/เวลา', dataIndex: 'CreatedAt', key: 'date', render: (text: string) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') },
      {
        title: 'ราคาสุทธิ',
        dataIndex: 'Package',
        key: 'Amount',
        align: 'right',
        render: (text: any) => text ? (
          <>
            {text.pack_amount} <img id='icon50' src="src/assets/coin-50.png" alt="" />
          </>
        ) : '-',
      },
    ],
    Deposit: [
      { title: 'ประเภท', dataIndex: 'trans_type', key: 'Type', render: (text: string) => text },
      { title: 'ช่องทางการทำธุรกรรม', dataIndex: 'payment', key: 'Payment', render: (text: string) => text },
      { title: 'วัน/เวลา', dataIndex: 'CreatedAt', key: 'date', render: (text: string) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') },
      {
        title: 'ราคาสุทธิ',
        dataIndex: 'Package',
        key: 'Amount',
        align: 'right',
        render: (text: any) => text ? (
          <>
            {"+"} {text.pack_amount} <img id='icon50' src="src/assets/coin-50.png" alt="" />
          </>
        ) : '-',
      },
    ],
    Withdraw: [
      { title: 'ประเภท', dataIndex: 'trans_type', key: 'Type', render: (text: string) => text },
      { title: 'ช่องทางการทำธุรกรรม', dataIndex: 'payment', key: 'Payment', render: (text: string) => text },
      { title: 'วัน/เวลา', dataIndex: 'Time', key: 'Time', render: (text: string) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') },
      {
        title: 'ราคาสุทธิ',
        dataIndex: 'Package',
        key: 'Amount',
        align: 'right',
        render: (text: any) => text ? (
          <>
            {text.pack_amount} <img id='icon50' src="src/assets/coin-50.png" alt="" />
          </>
        ) : '-',
      },
    ],
    Purchase: [
      { title: 'ประเภท', dataIndex: 'trans_type', key: 'Type', render: (text: string) => text },
      { title: 'ช่องทางการทำธุรกรรม', dataIndex: 'payment', key: 'Payment', render: (text: string) => text },
      { title: 'ชื่อเรื่อง', dataIndex: 'Order', key: 'NovelName', render: (text: any) => text ? text.NovelName : '-' },
      { title: 'วัน/เวลา', dataIndex: 'Time', key: 'Time', render: (text: string) => format(new Date(text), 'yyyy-MM-dd HH:mm:ss') },
      {
        title: 'ราคาสุทธิ',
        dataIndex: 'Package',
        key: 'Amount',
        align: 'right',
        render: (text: any) => text ? (
          <>
            {text.pack_amount} <img id='icon50' src="src/assets/coin-50.png" alt="" />
          </>
        ) : '-',
      },
    ],
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <>
      <Select defaultValue="All" onChange={handleChange} style={{ marginBottom: 16, width: 100 }}>
        <Option value="All">ทั้งหมด</Option>
        <Option value="Deposit">ฝาก</Option>
        <Option value="Withdraw">ถอน</Option>
        <Option value="Purchase">ซื้อ</Option>
      </Select>
      <Table
        dataSource={filteredData}
        columns={columns[selectedType]}
        rowKey="ID"
        className="large-text-table"
      />
    </>
  );
};

export default History;
