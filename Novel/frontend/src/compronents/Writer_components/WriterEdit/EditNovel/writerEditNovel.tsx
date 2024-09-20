import React, { useState, useEffect } from 'react';    
import { GetNovelById, CreateNovel, UpdateNovelById } from '../../../../services/https/Novel/novel'; // เพิ่มฟังก์ชันดึงข้อมูลและบันทึกข้อมูล
import WriterEditComponent from '../WriterSection/WrtiterEditComponent';
import NovelEditor from '../NovelEditor/NovelEditor';
import SaveButton from '../SaveButton/saveButtonNovel';

const WriterEditNovel: React.FC = () => {
  const [novelData, setNovelData] = useState<any>({});
  const [novelContent, setNovelContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [writerID, setWriterID] = useState<number | null>(null);
  const [isNewNovel, setIsNewNovel] = useState(true); // ตรวจสอบว่าคือการเพิ่มหรือแก้ไขนิยาย

  // Fetch writerID จาก local storage on component mount
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      const parsedUserId = parseInt(userId, 10);
      if (!isNaN(parsedUserId)) {
        setWriterID(parsedUserId);
      } else {
        console.error('Invalid writer ID in local storage');
        setSaveMessage({ type: 'error', text: 'Invalid writer ID.' });
      }
    } else {
      console.error('No writer ID found in local storage');
      setSaveMessage({ type: 'error', text: 'Writer ID not found.' });
    }

    // ดึง novelId จาก URL query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const novelId = queryParams.get('novelId');
    
    // ตรวจสอบว่ามี novelId หรือไม่ (กรณีแก้ไข)
    if (novelId) {
      console.log('Novel ID:', novelId); // แสดง novelId ใน console
      setIsNewNovel(false); // ไม่ใช่นิยายใหม่ เป็นการแก้ไข
      fetchNovelById(novelId);
    } else {
      console.log('No Novel ID, creating a new novel'); // แสดงข้อความหากเป็นการเพิ่มนิยายใหม่
      setIsNewNovel(true); // เป็นการเพิ่มนิยายใหม่
    }
  }, []);

  
  const fetchNovelById = async (novelId: string) => {
    try {
      const response = await GetNovelById(novelId);  // API ที่เรียก
      console.log('API Response:', response); // ตรวจสอบ response ที่ได้จาก API
      if (response && response.data) {
        console.log('Novel Content:', response.data.novel.content); // ตรวจสอบว่า content ถูกดึงมาไหม
        setNovelData(response.data.novel);  // ตั้งค่า novelData จากข้อมูลที่ดึงมา
        setNovelContent(response.data.novel.content || '');  // ตรวจสอบว่า content ถูกตั้งค่าหรือไม่
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching novel:', error.message);
        setSaveMessage({ type: 'error', text: `Error fetching novel data: ${error.message}` });
      } else {
        console.error('Unexpected error:', error);
        setSaveMessage({ type: 'error', text: 'Unexpected error occurred while fetching novel data.' });
      }
    }
  };
  
  
  
  const handleSave = async () => {
    if (writerID === null || writerID === 0) {
      setSaveMessage({ type: 'error', text: 'Writer ID is not valid.' });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    const dataToSend = {
      novel_name: novelData.novel_name, // ชื่อฟิลด์ตรงกับชื่อที่ใช้ใน novelData
      content: novelContent,
      description: novelData.description,
      novel_type1: novelData.novel_type1,
      novel_type2: novelData.novel_type2,
      rate: novelData.rate,
      writername: novelData.writername,
      cover: novelData.cover,
      novel_price: parseFloat(novelData.novel_price) || 0,
      writer_id: writerID,
    };
    
    // แสดงข้อมูลที่กำลังจะถูกส่งไปใน console
  console.log("Data to send:", dataToSend);

    try {
    let response;
    if (isNewNovel) {
      // สร้างนิยายใหม่
      console.log("Creating new novel...");
      response = await CreateNovel(dataToSend);
    } else {
      // แก้ไขนิยายเดิม
      console.log("Updating novel with ID:", novelData.ID);
      response = await UpdateNovelById(novelData.ID, dataToSend);
    }

    // ตรวจสอบ response จาก API
    if (response && response.data) {
      console.log("Response from API:", response.data);
      setSaveMessage({ type: 'success', text: 'นิยายถูกบันทึกเรียบร้อยแล้ว!' });
    } else {
      throw new Error('ไม่สามารถบันทึกนิยายได้ โปรดลองอีกครั้ง');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error saving novel:', error.message);
      setSaveMessage({ type: 'error', text: `เกิดข้อผิดพลาด: ${error.message}` });
    } else {
      console.error('Unexpected error:', error);
      setSaveMessage({ type: 'error', text: 'Unexpected error occurred while saving novel.' });
    }
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="writer-edit-novel">
      <WriterEditComponent setNovelData={setNovelData} novelData={novelData} />
      <NovelEditor setNovelContent={setNovelContent} content={novelContent} />
      <SaveButton onSave={handleSave} isDisabled={isSaving} />
      {saveMessage && (
        <div className={`save-message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}
    </div>
  );
};

export default WriterEditNovel;
