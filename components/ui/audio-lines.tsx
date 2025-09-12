'use client';

import { cn } from '@/lib/utils';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface AudioLinesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AudioLinesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  animated?: boolean;
}

const AudioLinesIcon = forwardRef<AudioLinesIconHandle, AudioLinesIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      animated = true,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    // Auto-start animation when animated prop is true
    useEffect(() => {
      if (animated && !isControlledRef.current) {
        controls.start('animate');
      }
    }, [animated, controls]);

    useImperativeHandle(
      ref,
      () => {
        isControlledRef.current = true;

        return {
          startAnimation: () => {
            if (animated) {
              controls.start('animate');
            }
          },
          stopAnimation: () => {
            if (animated) {
              controls.start('normal');
            }
          },
        };
      },
      [animated, controls],
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Only handle hover animation if not in continuous animation mode
        if (!isControlledRef.current && !animated) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter, animated],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Only handle hover animation if not in continuous animation mode
        if (!isControlledRef.current && !animated) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave, animated],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 10v3" />
          {animated ? (
            <motion.path
              variants={{
                normal: { d: 'M6 6v11' },
                animate: {
                  d: ['M6 6v11', 'M6 10v3', 'M6 6v11'],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                },
              }}
              d="M6 6v11"
              animate={controls}
            />
          ) : (
            <path d="M6 6v11" />
          )}
          {animated ? (
            <motion.path
              variants={{
                normal: { d: 'M10 3v18' },
                animate: {
                  d: ['M10 3v18', 'M10 9v5', 'M10 3v18'],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                  },
                },
              }}
              d="M10 3v18"
              animate={controls}
            />
          ) : (
            <path d="M10 3v18" />
          )}
          {animated ? (
            <motion.path
              variants={{
                normal: { d: 'M14 8v7' },
                animate: {
                  d: ['M14 8v7', 'M14 6v11', 'M14 8v7'],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                  },
                },
              }}
              d="M14 8v7"
              animate={controls}
            />
          ) : (
            <path d="M14 8v7" />
          )}
          {animated ? (
            <motion.path
              variants={{
                normal: { d: 'M18 5v13' },
                animate: {
                  d: ['M18 5v13', 'M18 7v9', 'M18 5v13'],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                },
              }}
              d="M18 5v13"
              animate={controls}
            />
          ) : (
            <path d="M18 5v13" />
          )}
          <path d="M22 10v3" />
        </svg>
      </div>
    );
  },
);

AudioLinesIcon.displayName = 'AudioLinesIcon';

export { AudioLinesIcon };
