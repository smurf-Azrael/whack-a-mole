import React from 'react';  

interface MoleProps {  
  isVisible: boolean;  
  circleIndex: number;  
  activeCircle: number | null;  
}  

import moleImageSrc from '../assets/mole.png';  

const Mole: React.FC<MoleProps> = ({ isVisible, circleIndex, activeCircle}) => {  
  if (!isVisible || circleIndex !== activeCircle) return null;  

  return (  
    <img  
      src={moleImageSrc}  
      alt="Mole"  
      style={{ width: '100%', height: '80%' }}  
    />  
  );  
};  

export default Mole;