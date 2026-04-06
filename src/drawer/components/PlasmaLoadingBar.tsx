import { useState, useEffect, useCallback } from 'react';

interface ColorScheme {
  normal?: {
    background?: string;
    border?: string;
    text?: string;
    accent?: string;
    orbBase?: string;
  };
  error?: {
    background?: string;
    border?: string;
    text?: string;
    accent?: string;
    orbBase?: string;
  };
}

interface PlasmaLoadingBarProps {
  progress: number;
  state?: 'idle' | 'ready' | 'scanning' | 'complete' | 'error';
  phaseText?: string;
  showPercentage?: boolean;
  enablePlasmaEffect?: boolean;
  enableBorderAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: ColorScheme;
  className?: string;
  animationSpeed?: number;
}

const defaultColorScheme: Required<ColorScheme> = {
  normal: {
    background: '#0a0a0a',
    border: '#2d2d2d',
    text: '#707070',
    accent: '#e0dd5b',
    orbBase: 'rgba(100, 100, 100, 0.04)',
  },
  error: {
    background: '#1a0a0a',
    border: '#4d2020',
    text: '#ff6b6b',
    accent: '#ff4d4d',
    orbBase: 'rgba(180, 50, 50, 0.06)',
  },
};

const sizeConfig = {
  sm: { width: '300px', height: '32px', fontSize: '11px' },
  md: { width: '450px', height: '42px', fontSize: '12px' },
  lg: { width: '600px', height: '52px', fontSize: '14px' },
};

export function PlasmaLoadingBar({
  progress,
  state = 'scanning',
  phaseText = '',
  showPercentage = true,
  enablePlasmaEffect = true,
  enableBorderAnimation = false,
  size = 'md',
  colorScheme,
  className = '',
  animationSpeed = 1,
}: PlasmaLoadingBarProps) {
  const isError = state === 'error';
  const colors = isError
    ? { ...defaultColorScheme.error, ...colorScheme?.error }
    : { ...defaultColorScheme.normal, ...colorScheme?.normal };

  const config = sizeConfig[size];
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={`plasma-loading-bar-container ${className}`}
      style={{
        width: config.width,
        position: 'relative',
      }}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={phaseText || `${Math.round(clampedProgress)}% complete`}
    >
      {/* Main Bar Container */}
      <div
        className="plasma-loading-bar"
        style={{
          height: config.height,
          backgroundColor: colors.background,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress Fill */}
        <div
          className="plasma-progress-fill"
          style={{
            width: `${clampedProgress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${colors.accent}22 0%, ${colors.accent}44 100%)`,
            transition: 'width 0.3s ease-out',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Plasma Orbs */}
          {enablePlasmaEffect && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="plasma-loading-orb"
                  style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.accent}40 0%, ${colors.orbBase} 70%)`,
                    filter: 'blur(8px)',
                    animation: `plasmaFloat${i} ${3 / animationSpeed}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Border Animation */}
        {enableBorderAnimation && (
          <div
            className="electric-wire-border"
            style={{
              position: 'absolute',
              inset: '-1px',
              borderRadius: '8px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: `2px solid ${colors.accent}`,
                opacity: 0.3,
                animation: `electricPulse ${1 / animationSpeed}s ease-in-out infinite`,
              }}
            />
          </div>
        )}
      </div>

      {/* Text Row */}
      <div
        className="plasma-text-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
          fontSize: config.fontSize,
          fontFamily: "IBM Plex Sans, sans-serif",
        }}
      >
        <span style={{ color: colors.text }}>{phaseText}</span>
        {showPercentage && (
          <span style={{ color: colors.text }}>
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>

      <style>{`
        @keyframes plasmaFloat1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(10px, -5px) scale(1.1); }
          50% { transform: translate(20px, 5px) scale(0.9); }
          75% { transform: translate(10px, 10px) scale(1.05); }
        }

        @keyframes plasmaFloat2 {
          0%, 100% { transform: translate(30px, 5px) scale(1); }
          25% { transform: translate(40px, -10px) scale(0.95); }
          50% { transform: translate(50px, 0px) scale(1.1); }
          75% { transform: translate(40px, 8px) scale(1); }
        }

        @keyframes plasmaFloat3 {
          0%, 100% { transform: translate(60px, -5px) scale(1.05); }
          25% { transform: translate(70px, 5px) scale(0.9); }
          50% { transform: translate(80px, -8px) scale(1.1); }
          75% { transform: translate(70px, 2px) scale(1); }
        }

        @keyframes electricPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .plasma-loading-orb,
          .electric-wire-border > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Hook for automatic scan progress
export function useScanProgress(duration = 8000) {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    'Initializing scan...',
    'Connecting to target...',
    'Extracting metadata...',
    'Analyzing permissions...',
    'Scanning components...',
    'Detecting vulnerabilities...',
    'Compiling report...',
    'Finalizing scan...',
    'Scan complete',
  ];

  const startScan = useCallback(() => {
    setIsScanning(true);
    setProgress(0);
    setHasError(false);
    setPhaseIndex(0);
  }, []);

  const triggerError = useCallback(() => {
    setHasError(true);
    setIsScanning(false);
  }, []);

  const reset = useCallback(() => {
    setIsScanning(false);
    setProgress(0);
    setHasError(false);
    setPhaseIndex(0);
  }, []);

  const retry = useCallback(() => {
    setHasError(false);
    startScan();
  }, [startScan]);

  useEffect(() => {
    if (!isScanning || hasError) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (duration / 50));

        // Update phase based on progress
        const newPhaseIndex = Math.min(
          Math.floor(next / (100 / phases.length)),
          phases.length - 1
        );
        if (newPhaseIndex !== phaseIndex) {
          setPhaseIndex(newPhaseIndex);
        }

        if (next >= 100) {
          setIsScanning(false);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isScanning, hasError, duration, phases.length, phaseIndex]);

  return {
    isScanning,
    progress,
    hasError,
    phaseText: phases[phaseIndex],
    state: hasError ? 'error' as const : progress >= 100 ? 'complete' as const : isScanning ? 'scanning' as const : 'idle' as const,
    startScan,
    triggerError,
    reset,
    retry,
  };
}
