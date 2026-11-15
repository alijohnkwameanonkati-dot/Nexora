import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function Reveal({ children, className = '', delay = 0, yOffset = 16 }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStatisticProps {
  targetText: string;
}

export function AnimatedStatistic({ targetText }: AnimatedStatisticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();

  const match = targetText.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  const [displayValue, setDisplayValue] = useState(targetText);

  useEffect(() => {
    if (!inView || prefersReduced || !match) {
      setDisplayValue(targetText);
      return;
    }

    const prefix = match[1];
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3];
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;

    const duration = 700;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (numericTarget * eased).toFixed(decimals);
      setDisplayValue(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(targetText);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, prefersReduced, targetText]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
}
