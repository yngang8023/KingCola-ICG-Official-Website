import { useRef, useEffect, useState, useMemo, useId } from 'react';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  containerClassName = 'min-h-screen flex items-center justify-center w-full',
  curveAmount = 400,
  edgeBend = 0,
  pathPadding = 140,
  viewBoxWidth = 1440,
  viewBoxHeight = 180,
  baseY = 70,
  preserveAspectRatio = 'xMidYMid meet',
  textColor = '#ffffff',
  shine = false,
  shineColor = '#ffffff',
  shineSpeed = 5,
  baseOpacity = 0.72,
  direction = 'left',
  interactive = true,
  offsetY = 0
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const gradientId = `curve-gradient-${uid}`;
  const centerX = viewBoxWidth / 2;
  const endX = viewBoxWidth + pathPadding;
  const startX = -pathPadding;
  const midY = baseY + curveAmount;
  const edgeY = baseY + curveAmount * 0.62 + edgeBend;
  const halfSpan = centerX - startX;
  const rightSpan = endX - centerX;
  const leftCtrl1X = startX + halfSpan * 0.22;
  const leftCtrl2X = startX + halfSpan * 0.72;
  const rightCtrl1X = centerX + rightSpan * 0.28;
  const rightCtrl2X = centerX + rightSpan * 0.78;
  const pathD =
    `M${startX},${baseY} ` +
    `C${leftCtrl1X},${edgeY} ${leftCtrl2X},${midY} ${centerX},${midY} ` +
    `C${rightCtrl1X},${midY} ${rightCtrl2X},${edgeY} ${endX},${baseY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const repeatCount =
    textLength > 0 && pathLength > 0
      ? Math.max(28, Math.ceil((pathLength * 3) / textLength) + 8)
      : 30;

  const totalText = textLength
    ? Array(repeatCount)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0 && pathLength > 0;

  useEffect(() => {
    const updateMetrics = () => {
      if (measureRef.current) {
        setSpacing(measureRef.current.getComputedTextLength());
      }
      if (!pathRef.current) return;
      setPathLength(pathRef.current.getTotalLength());
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [pathD, text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className={containerClassName}
      style={{
        visibility: ready ? 'visible' : 'hidden',
        cursor: cursorStyle,
        transform: offsetY !== 0 ? `translateY(${offsetY}px)` : undefined
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full h-full overflow-visible block text-[6rem] font-bold uppercase leading-none"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio={preserveAspectRatio}
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
          {shine && (
            <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={textColor} stopOpacity={baseOpacity} />
              <stop offset="40%" stopColor={textColor} stopOpacity={baseOpacity} />
              <stop offset="50%" stopColor={shineColor} stopOpacity="1" />
              <stop offset="60%" stopColor={textColor} stopOpacity={baseOpacity} />
              <stop offset="100%" stopColor={textColor} stopOpacity={baseOpacity} />
              <animate attributeName="x1" values="-100%;100%" dur={`${shineSpeed}s`} repeatCount="indefinite" />
              <animate attributeName="x2" values="0%;200%" dur={`${shineSpeed}s`} repeatCount="indefinite" />
            </linearGradient>
          )}
        </defs>
        {ready && (
          <text
            xmlSpace="preserve"
            className={className ?? ''}
            style={{
              fill: shine ? `url(#${gradientId})` : textColor,
              paintOrder: 'stroke',
              stroke: 'rgba(6, 12, 32, 0.45)',
              strokeWidth: '0.9px'
            }}
          >
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
