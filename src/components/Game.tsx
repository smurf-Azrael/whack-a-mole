import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Mole } from './Mole';
import { useDebounce } from '../hooks/useDebounce';

const NUM_HOLES = 3;

export const Game: React.FC = () => {
    const [moleIndex, setMoleIndex] = useState<number | null>(null);
    const [clicks, setClicks] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const randomizeMole = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * NUM_HOLES);
        setMoleIndex(randomIndex);
    }, []);

    const debouncedRandomizeMole = useDebounce(randomizeMole, 400);

    useEffect(() => {
        if (!gameOver) {
            const timer = setInterval(() => {
                debouncedRandomizeMole();
            }, Math.random() * (400 - 200) + 200);

            return () => clearInterval(timer);
        }
    }, [gameOver, debouncedRandomizeMole]);

    const handleMoleClick = useCallback(() => {
        if (moleIndex !== null) {
            setClicks((prev) => prev + 1);
            setMoleIndex(null);
        }
    }, [moleIndex]);

    useEffect(() => {
        if (clicks >= 5) {
            setGameOver(true);
        }
    }, [clicks]);

    useEffect(() => {
        let timeInterval: NodeJS.Timeout;
        if (!gameOver) {
            timeInterval = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
        }
        return () => clearInterval(timeInterval);
    }, [gameOver]);

    return (
        <div className="game-container">
            <h1>MetaPals Catch a Mole!</h1>
            <div className="holes-container">
                {Array(NUM_HOLES).fill(null).map((_, idx) => (
                    <Mole
                        key={idx}
                        isMoleVisible={idx === moleIndex}
                        onMoleClick={handleMoleClick}
                    />
                ))}
            </div>
            <div className="game-info">
                {gameOver ? (
                    <div className="game-status">You win!</div>
                ) : (
                    <div className="game-status">Catch the mole!</div>
                )}
                <div>Clicks: {clicks}</div>
                <div>Elapsed time: {elapsedTime} seconds</div>
                <button onClick={() => window.location.reload()}>Restart</button>
            </div>
        </div>
    );
};
