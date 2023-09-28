import React from 'react';

const DigitCircle = ({ digit, color }) => {
  const circleStyle = {
    backgroundColor: color,
  };

  return (
    <div className="digit-circle" style={circleStyle}>
      {digit}
    </div>
  );
};

export default DigitCircle;
