import React, { useEffect, useRef } from 'react';

const ColorChangeOnScroll: React.FC = () => {
  const elementARef = useRef<HTMLDivElement>(null);
  const elementBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (elementBRef.current) {
          if (entry.isIntersecting) {
            elementBRef.current.style.backgroundColor = 'lightcoral'; // สีใหม่
          } else {
            elementBRef.current.style.backgroundColor = 'lightblue'; // สีเดิม
          }
        }
      });
    }, {
      threshold: 0.1 // สามารถปรับค่า threshold ตามต้องการ
    });

    if (elementARef.current) {
      observer.observe(elementARef.current);
    }

    return () => {
      observer.disconnect(); // ล้าง observer เมื่อ component ถูก unmount
    };
  }, []);

  return (
    <div>
      <div 
        ref={elementARef} 
        style={{ height: '150px', backgroundColor: 'lightgray' }}
      >
        Element A (scroll past this)
      </div>
      <div 
        ref={elementBRef} 
        style={{ height: '1600px', backgroundColor: 'lightblue', transition: 'background-color 0.5s ease' }}
      >
        Element B (this will change color)
      </div>
    </div>
  );
};

export default ColorChangeOnScroll;
