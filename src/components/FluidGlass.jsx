/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useCallback } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';
import barModelPath from '@/assets/3d/bar.glb';
import cubeModelPath from '@/assets/3d/cube.glb';
import lensModelPath from '@/assets/3d/lens.glb';
import demoCs1Path from '@/assets/demo/cs1.webp';
import demoCs2Path from '@/assets/demo/cs2.webp';
import demoCs3Path from '@/assets/demo/cs3.webp';

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
  headline = 'React Bits',
  frontHeadline = 'KingCola ICG',
  backHeadline = 'Join us.',
  showGallery = false,
  progress = null,
  backgroundImage = null,
  pages = 3,
  distance = 0.4,
  damping = 0.2,
  backgroundColor = 0x071021,
  preferStaticFallback = false
}) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;
  const scrollPages = showGallery ? pages : 1;
  const hasExternalProgress = typeof progress === 'number';
  const [runtimeFallback, setRuntimeFallback] = useState(false);
  const canvasRef = useRef(null);
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const cameraConfig = { position: [0, 0, 20], fov: isMobileViewport ? 21 : 15 };
  const dprConfig = isMobileViewport ? [0.75, 1] : [1, 1.5];
  const glConfig = {
    alpha: true,
    antialias: !isMobileViewport,
    powerPreference: isMobileViewport ? 'low-power' : 'high-performance'
  };

  useEffect(() => {
    const onResize = () => setIsMobileViewport(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (preferStaticFallback) return;

    const testCanvas = document.createElement('canvas');
    const hasWebGL =
      !!testCanvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      !!testCanvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      !!testCanvas.getContext('experimental-webgl', {
        failIfMajorPerformanceCaveat: true,
      });

    if (!hasWebGL) {
      setRuntimeFallback(true);
    }
  }, [preferStaticFallback]);

  useEffect(() => {
    return () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.__kcContextLostHandler) return;
      canvas.removeEventListener('webglcontextlost', canvas.__kcContextLostHandler);
    };
  }, []);

  const handleCanvasCreated = useCallback((state) => {
    const canvas = state?.gl?.domElement;
    if (!canvas) return;

    if (canvasRef.current && canvasRef.current !== canvas && canvasRef.current.__kcContextLostHandler) {
      canvasRef.current.removeEventListener(
        'webglcontextlost',
        canvasRef.current.__kcContextLostHandler
      );
    }

    const onContextLost = (event) => {
      event.preventDefault();
      setRuntimeFallback(true);
    };

    canvas.addEventListener('webglcontextlost', onContextLost, { passive: false });
    canvas.__kcContextLostHandler = onContextLost;
    canvasRef.current = canvas;
  }, []);

  const {
    navItems = [
      { label: 'Home', link: '' },
      { label: 'About', link: '' },
      { label: 'Contact', link: '' }
    ],
    ...modeProps
  } = rawOverrides;
  const shouldUseStaticFallback = preferStaticFallback || runtimeFallback;

  if (shouldUseStaticFallback) {
    return (
      <StaticFluidShowcase
        showGallery={showGallery}
        frontHeadline={frontHeadline}
        backHeadline={backHeadline}
        progress={hasExternalProgress ? Math.min(1, Math.max(0, progress)) : 0}
        isMobileViewport={isMobileViewport}
      />
    );
  }

  if (showGallery && hasExternalProgress) {
    const clampedProgress = Math.min(1, Math.max(0, progress));

    return (
      <Canvas camera={cameraConfig} dpr={dprConfig} gl={glConfig} onCreated={handleCanvasCreated}>
        <Wrapper modeProps={modeProps} backgroundColor={backgroundColor}>
          {backgroundImage && <SceneBackdrop imageUrl={backgroundImage} />}
          <TypographyWithProgress
            frontText={frontHeadline}
            backText={backHeadline}
            progress={clampedProgress}
          />
          <ImagesWithProgress progress={clampedProgress} />
          <Preload />
        </Wrapper>
      </Canvas>
    );
  }

  if (showGallery) {
    return (
      <Canvas camera={cameraConfig} dpr={dprConfig} gl={glConfig} onCreated={handleCanvasCreated}>
        <ScrollControls damping={damping} pages={scrollPages} distance={distance}>
          {mode === 'bar' && <NavItems items={navItems} />}
          <Wrapper modeProps={modeProps} backgroundColor={backgroundColor}>
            <Scroll>
              <Typography text={headline} />
              <Images />
            </Scroll>
            <Scroll html />
            <Preload />
          </Wrapper>
        </ScrollControls>
      </Canvas>
    );
  }

  return (
    <Canvas camera={cameraConfig} dpr={dprConfig} gl={glConfig} onCreated={handleCanvasCreated}>
      <Wrapper modeProps={modeProps} backgroundColor={backgroundColor}>
        {backgroundImage && <SceneBackdrop imageUrl={backgroundImage} />}
        <Typography text={headline} />
        <Preload />
      </Wrapper>
    </Canvas>
  );
}

function StaticFluidShowcase({
  showGallery = false,
  frontHeadline = 'KingCola ICG',
  backHeadline = 'Join us.',
  progress = 0,
  isMobileViewport = false,
}) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const slideX = clampedProgress * 50;
  const renderMultilineText = (text = '') =>
    text.split('\n').map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}
        {index < text.split('\n').length - 1 ? <br /> : null}
      </span>
    ));

  return (
    <div className="relative h-full min-h-[24rem] w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 85% at 50% 5%, rgba(53, 130, 204, 0.32), rgba(4, 7, 13, 0.95))',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(109,220,255,0.22),transparent_42%),radial-gradient(circle_at_82%_72%,rgba(77,122,255,0.22),transparent_40%)]" />

      <div className="relative z-10 flex h-full min-h-[24rem] flex-col items-center justify-center px-4 py-8 text-center">
        <p className="mb-2 text-[1.6rem] font-semibold leading-tight text-[#dff2ff]">
          {renderMultilineText(frontHeadline)}
        </p>
        <p className="mb-4 text-sm text-[#97c8ea]">{renderMultilineText(backHeadline)}</p>

        {showGallery && isMobileViewport && (
          <div className="w-full max-w-[22rem] rounded-[1.55rem] border border-[#8ecfff4a] bg-[linear-gradient(150deg,rgba(9,21,39,0.92),rgba(7,16,30,0.88))] p-1.5 shadow-[0_18px_36px_rgba(2,9,20,0.54)]">
            <div
              className="grid h-44 gap-1.5 overflow-hidden rounded-[1.25rem]"
              style={{ gridTemplateColumns: '1fr 1fr 3fr' }}
            >
              {[
                { src: demoCs1Path, drift: -8 },
                { src: demoCs1Path, drift: 4 },
                { src: demoCs3Path, drift: 12 },
              ].map((card, index) => (
                <div key={`${card.src}-${index}`} className="relative isolate overflow-hidden rounded-xl border border-white/10">
                  <img
                    className="h-full w-full object-cover"
                    src={card.src}
                    alt={`Project split card ${index + 1}`}
                    style={{
                      transform: `translate3d(${card.drift * (clampedProgress - 0.5)}px, 0, 0) scale(1.08)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,0.04)_0%,rgba(5,13,24,0.45)_100%)]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {showGallery && !isMobileViewport && (
          <div className="w-full max-w-[22rem] overflow-hidden rounded-2xl border border-white/20 bg-[#071426]/70 shadow-[0_16px_36px_rgba(3,12,24,0.48)]">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translate3d(${-slideX}%, 0, 0)` }}
            >
              <img className="h-40 w-full flex-shrink-0 object-cover" src={demoCs1Path} alt="Project preview 1" />
              <img className="h-40 w-full flex-shrink-0 object-cover" src={demoCs2Path} alt="Project preview 2" />
              <img className="h-40 w-full flex-shrink-0 object-cover" src={demoCs3Path} alt="Project preview 3" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  backgroundColor = 0x071021,
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    gl.setClearColor(backgroundColor, 1);

    if (ref.current) {
      const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
      const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={nodes[geometryKey]?.geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper glb={lensModelPath} geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }) {
  return <ModeWrapper glb={cubeModelPath} geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      glb={barModelPath}
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }) {
  const group = useRef();
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = link => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthWrite={false}
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          depthTest={false}
          renderOrder={10}
          onClick={e => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef();
  const data = useScroll();
  const { height } = useThree(s => s.viewport);

  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1, 1]} url={demoCs1Path} />
      <Image position={[2, 0, 3]} scale={3} url={demoCs2Path} />
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url={demoCs1Path} />
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url={demoCs1Path} />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url={demoCs3Path} />
    </group>
  );
}

function ImagesWithProgress({ progress = 0 }) {
  const group = useRef();
  const { width, height } = useThree(state => state.viewport);
  const smoothedProgressRef = useRef(Math.min(1, Math.max(0, progress)));

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetProgress = Math.min(1, Math.max(0, progress));
    smoothedProgressRef.current = THREE.MathUtils.damp(
      smoothedProgressRef.current,
      targetProgress,
      9.5,
      delta
    );
    const p = smoothedProgressRef.current;

    // 0 -> first screen, 1 -> second screen.
    group.current.position.y = p * height;
    group.current.children.forEach((child, index) => {
      child.material.zoom = Math.max(1.02, 1.04 + 0.03 * Math.sin(p * Math.PI + index * 0.2));
    });
  });

  return (
    <group ref={group}>
      <PanelImageSet yBase={0} height={height} width={width} variant="front" />
      <PanelImageSet yBase={-height} height={height} width={width} variant="back" />
    </group>
  );
}

function PanelImageSet({ yBase, height, width = 6, variant = 'front' }) {
  const isCompactViewport = width < 4.6;

  if (isCompactViewport) {
    if (variant === 'front') {
      return (
        <>
          <Image
            position={[0, yBase + 0.02, 0.15]}
            scale={[width * 0.92, height / 1.08, 1]}
            zoom={1.09}
            url={demoCs1Path}
          />
          <Image
            position={[0, yBase - height * 0.18, 0.78]}
            scale={[width * 0.54, height / 2.9, 1]}
            zoom={1.16}
            url={demoCs2Path}
          />
        </>
      );
    }

    return (
      <>
        <Image
          position={[0, yBase + 0.02, 0.25]}
          scale={[width * 0.9, height / 1.1, 1]}
          zoom={1.1}
          url={demoCs3Path}
        />
        <Image
          position={[0, yBase + height * 0.22, 0.88]}
          scale={[width * 0.45, height / 3.15, 1]}
          zoom={1.14}
          url={demoCs1Path}
        />
      </>
    );
  }

  if (variant === 'front') {
    return (
      <>
        <Image
          position={[-2.28, yBase + 0.02, 0]}
          scale={[2.6, height / 1.06, 1]}
          zoom={1.1}
          url={demoCs1Path}
        />
        <Image
          position={[2.18, yBase + 0.02, 0.55]}
          scale={[2.38, height / 1.06, 1]}
          zoom={1.06}
          url={demoCs2Path}
        />
      </>
    );
  }

  return (
    <>
      <Image
        position={[-2.45, yBase + 0.02, 0]}
        scale={[2.3, height / 1.05, 1]}
        zoom={1.09}
        url={demoCs1Path}
      />
      <Image
        position={[0, yBase + 0.03, 0.72]}
        scale={[1.75, height / 1.03, 1]}
        zoom={1.17}
        url={demoCs1Path}
      />
      <Image
        position={[2.45, yBase + 0.01, 0.28]}
        scale={[2.3, height / 1.05, 1]}
        zoom={1.08}
        url={demoCs3Path}
      />
    </>
  );
}

function SceneBackdrop({ imageUrl }) {
  const { width, height } = useThree(state => state.viewport);

  return (
    <Image
      position={[0, 0, 0]}
      scale={[width * 1.04, height * 1.04, 1]}
      url={imageUrl}
    />
  );
}

function Typography({ text = 'React Bits' }) {
  const DEVICE = {
    mobile: { fontSize: 0.18 },
    tablet: { fontSize: 0.34 },
    desktop: { fontSize: 0.52 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color="white"
      anchorX="center"
      anchorY="middle"
      textAlign="center"
      lineHeight={1.04}
    >
      {text}
    </Text>
  );
}

function TypographyWithProgress({ frontText = 'KingCola ICG', backText = 'Join us.', progress = 0 }) {
  const group = useRef();
  const { height } = useThree(state => state.viewport);
  const smoothedProgressRef = useRef(Math.min(1, Math.max(0, progress)));
  const DEVICE = {
    mobile: { fontSize: 0.18 },
    tablet: { fontSize: 0.34 },
    desktop: { fontSize: 0.52 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetProgress = Math.min(1, Math.max(0, progress));
    smoothedProgressRef.current = THREE.MathUtils.damp(
      smoothedProgressRef.current,
      targetProgress,
      9.5,
      delta
    );
    group.current.position.y = smoothedProgressRef.current * height;
  });

  const { fontSize } = DEVICE[device];
  const frontYOffset = -0.06;
  const backYOffset = -0.24;
  const backFontSize = fontSize * 0.84;

  return (
    <group ref={group}>
      <Text
        position={[0, frontYOffset, 12]}
        fontSize={fontSize}
        letterSpacing={-0.05}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        lineHeight={1.04}
      >
        {frontText}
      </Text>
      <Text
        position={[0, -height + backYOffset, 12]}
        fontSize={backFontSize}
        letterSpacing={-0.05}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        lineHeight={1.08}
      >
        {backText}
      </Text>
    </group>
  );
}
