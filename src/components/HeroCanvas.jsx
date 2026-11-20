import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3D Core Object: Metallic Geometric Sphere with displaced geometry
    const geometry = new THREE.IcosahedronGeometry(1.65, 24);
    
    // Save original position attribute for procedural wave displacement
    const originalPositions = geometry.attributes.position.clone();

    // Metallic luxury material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x1a1d26,
      emissive: 0x05060a,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Ethereal wireframe outer cage
    const cageGeometry = new THREE.IcosahedronGeometry(2.0, 3);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xeed7a1,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    scene.add(cageMesh);

    // Floating Stardust Particles
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 12;
      scales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Dynamic Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Warm champagne key light
    const keyLight = new THREE.DirectionalLight(0xeed7a1, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Cool metallic silver fill light
    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 2.5);
    fillLight.position.set(-5, -2, 2);
    scene.add(fillLight);

    // Atmospheric rim light
    const rimLight = new THREE.PointLight(0x38bdf8, 4.0, 20);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // Interactive mouse cursor follow light
    const pointerLight = new THREE.PointLight(0xf7ecd4, 2.8, 15);
    pointerLight.position.set(0, 0, 3.5);
    scene.add(pointerLight);

    // Mouse tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.9;
      targetY = y * 0.9;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
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

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate primary mesh
      mesh.rotation.y = elapsedTime * 0.22 + mouseX * 0.8;
      mesh.rotation.x = elapsedTime * 0.15 + -mouseY * 0.8;

      // Rotate outer wireframe cage oppositely
      cageMesh.rotation.y = -elapsedTime * 0.12 + mouseX * 0.4;
      cageMesh.rotation.z = elapsedTime * 0.08;

      // Rotate particles
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = -elapsedTime * 0.02;

      // Move interactive light
      pointerLight.position.x = mouseX * 3.5;
      pointerLight.position.y = mouseY * 3.5;

      // Procedural surface wave displacement on icosahedron
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

        const length = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const wave = Math.sin(ox * 2.5 + elapsedTime * 1.8) *
                     Math.cos(oy * 2.5 + elapsedTime * 1.5) * 0.12;

        const factor = (length + wave) / length;
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
      material.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
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
