import React from 'react';
import './MiniActionButton.css';
interface IMiniActionButtonProps {
  tooltip?: string;
  buttonText?: string;
  onClick: () => void;
  children: React.ReactElement;
}

const MiniActionButton = ({
  tooltip,
  onClick,
  children,
}: IMiniActionButtonProps) => {
  return (
    <div className="tooltip">
      {tooltip && <span className="tooltiptext">{tooltip}</span>}
      <button
        className="p-1"
        onClick={onClick}
      >
        {React.cloneElement(children, {
          className: 'w-8 h-8 text-current delay-100',
        })}
      </button>
    </div>
  );
};

export default MiniActionButton;
