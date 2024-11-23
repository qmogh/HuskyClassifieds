"use client"
import React, { useState, useEffect } from 'react';

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState('');
  const words = ['Furniture', 'Textbooks', 'Decor', 'Anything'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(200);
  const isLastWord = wordIndex === words.length - 1;

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setDelta(100);
      }, delta);

      if (displayText === '') {
        setIsDeleting(false);
        if (!isLastWord) {
          setWordIndex((prev) => prev + 1);
        }
        setDelta(200);
      }
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }, delta);

      if (displayText === currentWord) {
        if (!isLastWord) {
          setDelta(2000); 
          setTimeout(() => {
            setIsDeleting(true);
            setDelta(100);
          }, 2000);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, delta, isLastWord]);

  return (
    <div className="text-3xl font-semibold text-center p-8">
      Buy and Sell{' '}
      <span className="text-blue-900">{displayText}</span>
      {displayText && ' '}for Students!
    </div>
  );
};

export default TypewriterText;