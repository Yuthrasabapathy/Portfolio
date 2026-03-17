import { useState, useEffect } from "react";

const TypeWriter = ({ words, speed = 100, deleteSpeed = 50, pause = 2000 }: {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, deleteSpeed, pause]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-glow-pulse ml-0.5 text-primary">|</span>
    </span>
  );
};

export default TypeWriter;
