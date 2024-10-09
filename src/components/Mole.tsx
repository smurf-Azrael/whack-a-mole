import React from 'react';

interface MoleProps {
    isMoleVisible: boolean;
    onMoleClick: () => void;
}

export const Mole: React.FC<MoleProps> = ({ isMoleVisible, onMoleClick }) => {
    return (
        <div className="mole-hole" onClick={isMoleVisible ? onMoleClick : undefined}>
            {isMoleVisible ? (
                <img src="/assets/mole.png" alt="Mole" className="mole-img" />
            ) : (
                <div className="empty-hole"></div>
            )}
        </div>
    );
};
