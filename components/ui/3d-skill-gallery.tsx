"use client"

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, Plane, Sphere } from "@react-three/drei"
import { X } from "lucide-react"

/* ─── Types ─────────────────────────────────────────────────── */

export type Skill = {
  id: string
  name: string
  category: string
  color: string    // hex brand color
  logoUrl: string
}

/* ─── Context ────────────────────────────────────────────────── */

type SkillCtx = {
  selectedSkill: Skill | null
  setSelectedSkill: (s: Skill | null) => void
  skills: Skill[]
}

const SkillContext = createContext<SkillCtx | undefined>(undefined)

function useSkill() {
  const ctx = useContext(SkillContext)
  if (!ctx) throw new Error("useSkill must be inside SkillProvider")
  return ctx
}

function SkillProvider({ children, skills }: { children: React.ReactNode; skills: Skill[] }) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  return (
    <SkillContext.Provider value={{ selectedSkill, setSelectedSkill, skills }}>
      {children}
    </SkillContext.Provider>
  )
}

/* ─── Helpers ────────────────────────────────────────────────── */

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "")
  if (c.length !== 6) return "168, 85, 247"
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

/* ─── Starfield ──────────────────────────────────────────────── */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const geometry = new THREE.BufferGeometry()
    const count = 7000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.65,
    })
    const stars = new THREE.Points(geometry, material)
    scene.add(stars)
    camera.position.z = 10

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
}

/* ─── Floating skill card ────────────────────────────────────── */

function FloatingSkillCard({
  skill,
  pos,
}: {
  skill: Skill
  pos: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedSkill } = useSkill()
  const rgb = hexToRgb(skill.color)

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={pos}>
      {/* invisible hit area */}
      <Plane
        args={[3.6, 3.6]}
        onClick={(e) => { e.stopPropagation(); setSelectedSkill(skill) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto" }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      {/* HTML card rendered in 3D space */}
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "transform 0.25s ease",
          transform: hovered ? "scale(1.2)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "124px",
            height: "124px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #0D0D20 0%, #121230 100%)",
            padding: "18px 12px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            userSelect: "none",
            boxShadow: hovered
              ? `0 20px 48px rgba(${rgb}, 0.45), 0 0 24px rgba(${rgb}, 0.25)`
              : "0 10px 28px rgba(0,0,0,0.6)",
            border: hovered
              ? `1.5px solid rgba(${rgb}, 0.7)`
              : "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.logoUrl}
            alt={skill.name}
            style={{ width: "54px", height: "54px", objectFit: "contain" }}
            loading="lazy"
            draggable={false}
          />
          <p
            style={{
              color: "#F1F5F9",
              fontSize: "10px",
              fontWeight: 700,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.3,
              letterSpacing: "0.03em",
            }}
          >
            {skill.name}
          </p>
        </div>
      </Html>
    </group>
  )
}

/* ─── Galaxy ─────────────────────────────────────────────────── */

function SkillGalaxy() {
  const { skills } = useSkill()

  const positions = useMemo<[number, number, number][]>(() => {
    const n = skills.length
    const φ = (1 + Math.sqrt(5)) / 2
    return skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const θ = (2 * Math.PI * i) / φ
      const x = Math.cos(θ) * r
      const z = Math.sin(θ) * r
      const radius = 11 + (i % 3) * 3.5
      return [x * radius, y * radius, z * radius]
    })
  }, [skills.length])

  return (
    <>
      {/* Decorative wireframe spheres */}
      <Sphere args={[1.8, 28, 28]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.12} wireframe />
      </Sphere>
      <Sphere args={[12, 28, 28]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#A855F7" transparent opacity={0.045} wireframe />
      </Sphere>
      <Sphere args={[15.5, 28, 28]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#22D3EE" transparent opacity={0.03} wireframe />
      </Sphere>

      {skills.map((skill, i) => (
        <FloatingSkillCard key={skill.id} skill={skill} pos={positions[i]} />
      ))}
    </>
  )
}

/* ─── Modal ──────────────────────────────────────────────────── */

function SkillModal() {
  const { selectedSkill, setSelectedSkill } = useSkill()
  if (!selectedSkill) return null

  const rgb = hexToRgb(selectedSkill.color)

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setSelectedSkill(null)}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setSelectedSkill(null)}
          className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div
          style={{
            width: "200px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, #0D0D20, #141432)",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            border: `1.5px solid rgba(${rgb}, 0.45)`,
            boxShadow: `0 32px 80px rgba(0,0,0,0.85), 0 0 48px rgba(${rgb}, 0.18)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedSkill.logoUrl}
            alt={selectedSkill.name}
            style={{ width: "72px", height: "72px", objectFit: "contain" }}
          />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#F1F5F9", fontSize: "17px", fontWeight: 700, margin: 0 }}>
              {selectedSkill.name}
            </p>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                margin: "6px 0 0",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: `rgba(${rgb}, 0.9)`,
              }}
            >
              {selectedSkill.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Default skills data ────────────────────────────────────── */

const DV = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"
const SI = "https://cdn.simpleicons.org"

export const defaultSkills: Skill[] = [
  { id: "react",      name: "React",        category: "Frontend",  color: "#61DAFB", logoUrl: `${DV}/react/react-original.svg` },
  { id: "nextjs",     name: "Next.js",      category: "Frontend",  color: "#E2E8F0", logoUrl: `${SI}/nextdotjs/ffffff` },
  { id: "typescript", name: "TypeScript",   category: "Language",  color: "#3178C6", logoUrl: `${DV}/typescript/typescript-original.svg` },
  { id: "javascript", name: "JavaScript",   category: "Language",  color: "#F7DF1E", logoUrl: `${DV}/javascript/javascript-original.svg` },
  { id: "nodejs",     name: "Node.js",      category: "Backend",   color: "#339933", logoUrl: `${DV}/nodejs/nodejs-original.svg` },
  { id: "express",    name: "Express.js",   category: "Backend",   color: "#AAAAAA", logoUrl: `${SI}/express/ffffff` },
  { id: "python",     name: "Python",       category: "Backend",   color: "#3776AB", logoUrl: `${DV}/python/python-original.svg` },
  { id: "django",     name: "Django REST",  category: "Backend",   color: "#2BA977", logoUrl: `${DV}/django/django-plain.svg` },
  { id: "tailwind",   name: "Tailwind CSS", category: "Styling",   color: "#06B6D4", logoUrl: `${DV}/tailwindcss/tailwindcss-original.svg` },
  { id: "bootstrap",  name: "Bootstrap",    category: "Styling",   color: "#7952B3", logoUrl: `${DV}/bootstrap/bootstrap-original.svg` },
  { id: "html5",      name: "HTML5",        category: "Frontend",  color: "#E34F26", logoUrl: `${DV}/html5/html5-original.svg` },
  { id: "css3",       name: "CSS3",         category: "Styling",   color: "#1572B6", logoUrl: `${DV}/css3/css3-original.svg` },
  { id: "gsap",       name: "GSAP",         category: "Animation", color: "#88CE02", logoUrl: `${SI}/greensock/88CE02` },
  { id: "mysql",      name: "MySQL",        category: "Database",  color: "#4479A1", logoUrl: `${DV}/mysql/mysql-original.svg` },
  { id: "mongodb",    name: "MongoDB",      category: "Database",  color: "#47A248", logoUrl: `${DV}/mongodb/mongodb-original.svg` },
  { id: "wordpress",  name: "WordPress",    category: "CMS",       color: "#21759B", logoUrl: `${DV}/wordpress/wordpress-plain.svg` },
  { id: "git",        name: "Git",          category: "DevOps",    color: "#F05032", logoUrl: `${DV}/git/git-original.svg` },
  { id: "java",       name: "Java",         category: "Desktop",   color: "#F89820", logoUrl: `${DV}/java/java-original.svg` },
  { id: "csharp",     name: "C#",           category: "Desktop",   color: "#9B59B6", logoUrl: `${DV}/csharp/csharp-original.svg` },
  { id: "android",    name: "Android",      category: "Mobile",    color: "#3DDC84", logoUrl: `${DV}/android/android-original.svg` },
]

/* ─── Main export ────────────────────────────────────────────── */

interface SkillGalleryProps {
  skills?: Skill[]
}

export function SkillGallery({ skills = defaultSkills }: SkillGalleryProps) {
  return (
    <SkillProvider skills={skills}>
      <div className="relative w-full h-[680px] overflow-hidden bg-background">
        {/* Starfield lives behind the Canvas */}
        <StarfieldBackground />

        {/* Three.js canvas */}
        <Canvas
          camera={{ position: [0, 0, 20], fov: 58 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[12, 12, 12]} intensity={0.8} />
            <pointLight position={[-12, -12, -12]} intensity={0.4} color="#A855F7" />
            <SkillGalaxy />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate
              autoRotate
              autoRotateSpeed={0.6}
              rotateSpeed={0.5}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        {/* Skill detail modal (inside the container so backdrop is scoped) */}
        <SkillModal />

        {/* Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p className="text-muted text-[10px] font-mono tracking-[0.2em] uppercase">
            Drag to orbit · Click any card to explore
          </p>
        </div>
      </div>
    </SkillProvider>
  )
}