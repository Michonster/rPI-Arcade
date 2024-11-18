import React from 'react';

interface BannerProps {
  label: string; 
  onClick: () => void; 
}

const TopBanner: React.FC<BannerProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default TopBanner;
