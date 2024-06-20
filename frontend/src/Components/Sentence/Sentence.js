import React, { useEffect, useState } from 'react';

function Sentence({ sentences, color, startDelay, typingSpeed, maxFontSize, minFontSize }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // New state to manage start
  const phaseShift = Math.random() * 2 * Math.PI; // Random phase shift

  useEffect(() => {
    // Set a timeout to start the typing effect after the startDelay
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted || sentences.length === 0) return; // Do not start until isStarted is true

    let interval;

    if (!isDeleting && displayedText.length === sentences[currentSentenceIndex].length) {
      // Wait some time before starting to delete
      interval = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else {
      interval = setInterval(() => {
        const currentSentence = sentences[currentSentenceIndex];
        if (isDeleting) {
          if (displayedText.length === 0) {
            setIsDeleting(false);
            setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
          } else {
            setDisplayedText(currentSentence.substring(0, displayedText.length - 1));
          }
        } else {
          setDisplayedText(currentSentence.substring(0, displayedText.length + 1));
        }
      }, typingSpeed);
    }

    return () => clearInterval(interval);
  }, [sentences, currentSentenceIndex, displayedText, isDeleting, typingSpeed, isStarted]);

  // Helper function to calculate the font size for the wave effect
  const calculateWaveSize = (index, length) => {
    const waveLength = length / 2;
    return minFontSize + Math.abs(Math.sin((index / waveLength * Math.PI) + phaseShift) * (maxFontSize - minFontSize));
  };

  return (
    <div>
      {displayedText.split('').map((char, index) => (
        <span key={index} style={{
          fontSize: `${calculateWaveSize(index, displayedText.length)}px`,
          color: color // Apply the color prop to the text
        }}>
          {char}
        </span>
      ))}
    </div>
  );
}

export default Sentence;
