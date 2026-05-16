"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

interface PortfolioGalleryProps {
  title?: string;
  archiveButton?: {
    text: string;
    href: string;
    external?: boolean;
  };
  images?: Array<{
    src: string;
    alt: string;
    title?: string;
    objectPosition?: string;
    href?: string;
  }>;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  onImageClick?: (index: number) => void;
  pauseOnHover?: boolean;
  marqueeRepeat?: number;
  sectionId?: string;
}

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton = {
    text: "View gallery",
    href: "/work",
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4,
  sectionId = "archives",
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const defaultImages: Array<{ src: string; alt: string; title?: string }> = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "SaaS Dashboard",
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14431b4?w=800&h=600&fit=crop&q=80",
      alt: "Code Editor",
    },
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80",
      alt: "Web Development",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Data Dashboard",
    },
    {
      src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80",
      alt: "Web Design",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Mobile App",
    },
    {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80",
      alt: "Developer Workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=800&h=600&fit=crop&q=80",
      alt: "Gaming Platform",
    },
  ]

  const images: Array<{ src: string; alt: string; title?: string; objectPosition?: string; href?: string }> = customImages || defaultImages

  return (
    <section
      aria-label={title}
      className={`relative py-20 px-4 ${className}`}
      id={sectionId}
    >
      <div className="max-w-7xl mx-auto bg-surface/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="relative z-10 text-center pt-16 pb-8 px-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8 text-balance">
            {title}
          </h2>

          {archiveButton.external ? (
            <a
              href={archiveButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors group mb-20"
            >
              <span>{archiveButton.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link
              href={archiveButton.href}
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors group mb-20"
            >
              <span>{archiveButton.text}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Desktop 3D overlapping layout */}
        <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {images.map((image, index) => {
              const totalImages = images.length
              const middle = Math.floor(totalImages / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20
              const zIndex = totalImages - index

              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
              const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={index}
                  className="group flex-shrink-0"
                  style={{ zIndex }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <a
                    href={image.href ?? undefined}
                    target={image.href ? "_blank" : undefined}
                    rel={image.href ? "noopener noreferrer" : undefined}
                    className={image.href ? "cursor-pointer" : "cursor-default pointer-events-none"}
                    onClick={() => onImageClick?.(index)}
                    tabIndex={image.href ? 0 : -1}
                  >
                    <div
                      className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{
                        boxShadow: `
                          rgba(0,0,0,0.01) 0.8px 0px 0.8px 0px,
                          rgba(0,0,0,0.03) 2.4px 0px 2.4px 0px,
                          rgba(0,0,0,0.08) 6.4px 0px 6.4px 0px,
                          rgba(0,0,0,0.25) 20px 0px 20px 0px
                        `,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: image.objectPosition ?? "left top" }}
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between gap-2">
                        {image.title && (
                          <p className="text-white text-xs font-medium truncate">{image.title}</p>
                        )}
                        {image.href && (
                          <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile — horizontal swipe scroll */}
        <div className="block md:hidden pb-8">
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 snap-start group">
                <a
                  href={image.href ?? undefined}
                  target={image.href ? "_blank" : undefined}
                  rel={image.href ? "noopener noreferrer" : undefined}
                  className={image.href ? "cursor-pointer" : "cursor-default pointer-events-none"}
                  onClick={() => onImageClick?.(index)}
                  tabIndex={image.href ? 0 : -1}
                >
                  <div
                    className="relative aspect-video w-72 rounded-lg overflow-hidden"
                    style={{
                      boxShadow: `
                        rgba(0,0,0,0.01) 0.8px 0px 0.8px 0px,
                        rgba(0,0,0,0.03) 2.4px 0px 2.4px 0px,
                        rgba(0,0,0,0.08) 6.4px 0px 6.4px 0px,
                        rgba(0,0,0,0.25) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: image.objectPosition ?? "left top" }}
                      loading="lazy"
                      decoding="async"
                    />
                    {(image.title || image.href) && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between gap-2">
                        {image.title && (
                          <p className="text-white text-xs font-medium truncate">{image.title}</p>
                        )}
                        {image.href && (
                          <span className="flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}