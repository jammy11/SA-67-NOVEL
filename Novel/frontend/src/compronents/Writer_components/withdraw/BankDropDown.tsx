import React from 'react';
import { DownOutlined } from '@ant-design/icons';

interface BankDropdownProps {
  isOpen: boolean;
  selectedBank: string;
  banks: string[];
  onToggle: () => void;
  onSelectBank: (bank: string) => void;
}

const BankDropdown: React.FC<BankDropdownProps> = ({ isOpen, selectedBank, banks, onToggle, onSelectBank }) => {
  return (
    <div>
      <div className="work-dropdown-item" onClick={onToggle}>
        <span>{selectedBank}</span>
        <DownOutlined style={{ float: 'right' }} rotate={isOpen ? 180 : 0} /> 
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {banks.map((bank, index) => (
            <div key={index} className="work-dropdown-item" onClick={() => onSelectBank(bank)}>
              {bank}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankDropdown;
