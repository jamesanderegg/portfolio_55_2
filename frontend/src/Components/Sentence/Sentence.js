import React, { useEffect, useState } from 'react';

function Sentence({
  sentences,
  color,
  startDelay,
  typingSpeed,
  maxFontSize,
  minFontSize,
  exitOnComplete = false,
  holdDelay = 1000,
  exitDuration = 520,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // New state to manage start
  const [sequencePhase, setSequencePhase] = useState('typing');
  const [sequenceLines, setSequenceLines] = useState([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const fontSize = maxFontSize || minFontSize || 24;

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateReducedMotion();
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', updateReducedMotion);
    } else {
      motionQuery.addListener(updateReducedMotion);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', updateReducedMotion);
      } else {
        motionQuery.removeListener(updateReducedMotion);
      }
    };
  }, []);

  useEffect(() => {
    setDisplayedText('');
    setCurrentSentenceIndex(0);
    setIsDeleting(false);
    setIsStarted(false);
    setSequencePhase('typing');
    setSequenceLines([]);

    // Set a timeout to start the typing effect after the startDelay
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay, sentences]);

  useEffect(() => {
    if (exitOnComplete) return;
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
  }, [sentences, currentSentenceIndex, displayedText, isDeleting, typingSpeed, isStarted, exitOnComplete]);

  useEffect(() => {
    if (!exitOnComplete || !isStarted || sentences.length === 0) {
      return;
    }

    const currentSentence = sentences[currentSentenceIndex];
    let timer;

    if (sequencePhase === 'typing') {
      if (displayedText.length < currentSentence.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentSentence.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          const isLastSentence = currentSentenceIndex === sentences.length - 1;

          if (isLastSentence) {
            setSequencePhase('fading');
            return;
          }

          const completedIndex = currentSentenceIndex;
          const completedId = `${completedIndex}-${currentSentence}`;
          setSequenceLines((prevLines) => {
            return [
              ...prevLines,
              {
                id: completedId,
                direction: completedIndex % 2 === 0 ? 'up' : 'down',
                isEntering: true,
                index: completedIndex,
                text: currentSentence,
              },
            ];
          });
          setDisplayedText('');
          setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
        }, holdDelay);
      }
    }

    if (sequencePhase === 'fading') {
      timer = setTimeout(() => {
        setDisplayedText('');
        setSequenceLines([]);
        setCurrentSentenceIndex(0);
        setSequencePhase('typing');
      }, exitDuration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    currentSentenceIndex,
    displayedText,
    exitDuration,
    exitOnComplete,
    holdDelay,
    isStarted,
    sentences,
    sequencePhase,
    typingSpeed,
  ]);

  useEffect(() => {
    if (!exitOnComplete) {
      return;
    }

    const enteringLine = sequenceLines.find((line) => line.isEntering);

    if (!enteringLine) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setSequenceLines((prevLines) =>
        prevLines.map((line) =>
          line.id === enteringLine.id
            ? { ...line, isEntering: false }
            : line
        )
      );
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [sequenceLines, exitOnComplete]);

  const renderText = (text) => text.split('').map((char, index) => (
    <span key={index} style={{
      fontSize: `${fontSize}px`,
      color: color // Apply the color prop to the text
    }}>
      {char}
    </span>
  ));

  if (prefersReducedMotion) {
    const reducedMotionText = exitOnComplete ? sentences.join(' | ') : sentences[0] || '';

    return (
      <div className="centered-div">
        {renderText(reducedMotionText)}
      </div>
    );
  }

  if (exitOnComplete) {
    const getLineOffset = (line) => {
      if (line.isEntering) {
        return 0;
      }

      const laneLines = sequenceLines
        .filter((sequenceLine) => sequenceLine.direction === line.direction)
        .sort((a, b) => b.index - a.index);
      const laneIndex = laneLines.findIndex((sequenceLine) => sequenceLine.id === line.id);
      const lane = laneIndex + 1;
      const direction = line.direction === 'up' ? -1 : 1;

      return direction * lane * 108;
    };

    const getLineTransform = (line) =>
      `translateY(-50%) translateY(${getLineOffset(line)}%)`;

    return (
      <div
        className="centered-div sentence-sequence"
        style={{
          opacity: sequencePhase === 'fading' ? 0 : 1,
          transition: `opacity ${exitDuration}ms ease`,
        }}
      >
        {sequenceLines.map((sentence) => (
          <div
            className="sentence-sequence__line"
            key={sentence.id}
            style={{
              transform: getLineTransform(sentence),
              transition: `transform ${exitDuration}ms ease, opacity ${exitDuration}ms ease`,
            }}
          >
            {renderText(sentence.text)}
          </div>
        ))}
        <div
          className="sentence-sequence__line sentence-sequence__line--active"
          style={{
            transform: 'translateY(-50%)',
          }}
        >
          {renderText(displayedText)}
        </div>
      </div>
    );
  }

  return (
    <div className="centered-div">
      {renderText(displayedText)}
    </div>
  );
}

export default Sentence;
