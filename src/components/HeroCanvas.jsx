import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Group for combined rotational physics
    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Metallic Chrome Sculpture (Liquid Displaced Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.6, 32);
    const originalPositions = geometry.attributes.position.clone();

    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141620,
      emissive: 0x06070c,
      roughness: 0.12,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, chromeMaterial);
    group.add(mesh);

    // 2. Gyroscopic Orbital Platinum Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.018, 16, 100);
    const ringMaterial1 = new THREE.MeshStandardMaterial({
      color: 0xeed7a1,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    // 3. Gyroscopic Orbital Silver Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMaterial2 = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMaterial2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // 4. Stardust Particles Cloud
    const particleCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf1f5f9,
      size: 0.03,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Warm champagne key light
    const keyLight = new THREE.DirectionalLight(0xeed7a1, 3.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Platinum fill light
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 2.4);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    // Atmospheric rim light
    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 20);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // Pointer-following interactive light
    const mouseLight = new THREE.PointLight(0xf9f0db, 2.5, 12);
    mouseLight.position.set(0, 0, 3.5);
    scene.add(mouseLight);

    // Mouse Tracking with smooth dampening
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Group rotation
      group.rotation.y = elapsedTime * 0.15 + mouseX * 0.7;
      group.rotation.x = elapsedTime * 0.1 + -mouseY * 0.7;

      // Independent ring rotations
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.x = -elapsedTime * 0.18;

      // Particles ambient drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = -elapsedTime * 0.015;

      // Move cursor light
      mouseLight.position.x = mouseX * 4;
      mouseLight.position.y = mouseY * 4;

      // Procedural surface wave displacement on core mesh
      const posAttr = geometry.attributes.position;
      const origPos = originalPositions.array;
      const pos = posAttr.array;
      const vertexCount = posAttr.count;

      for (let i = 0; i < vertexCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const ox = origPos[ix];
        const oy = origPos[iy];
        const oz = origPos[iz];

        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const wave = Math.sin(ox * 2.8 + elapsedTime * 1.6) *
                     Math.cos(oy * 2.8 + elapsedTime * 1.4) * 0.1;

        const factor = (len + wave) / len;
        pos[ix] = ox * factor;
        pos[iy] = oy * factor;
        pos[iz] = oz * factor;
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      chromeMaterial.dispose();
      ring1Geo.dispose();
      ringMaterial1.dispose();
      ring2Geo.dispose();
      ringMaterial2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
