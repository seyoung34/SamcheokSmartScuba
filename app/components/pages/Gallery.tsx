"use client";

import { motion } from "framer-motion";
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useUnsplash } from '../../hooks/useUnsplash';

export default function Gallery() {
  const images = [
    { id: 1, query: 'scuba diving underwater', title: '수중 탐험' },
    { id: 2, query: 'coral reef diving', title: '산호초 다이빙' },
    { id: 3, query: 'scuba diver ocean', title: '심해 다이빙' },
    { id: 4, query: 'diving school training', title: '교육 과정' },
    { id: 5, query: 'underwater photographer', title: '수중 촬영' },
    { id: 6, query: 'diving equipment', title: '전문 장비' },
    { id: 7, query: 'sea turtle diving', title: '해양 생물' },
    { id: 8, query: 'wreck diving', title: '난파선 다이빙' },
    { id: 9, query: 'night diving', title: '야간 다이빙' },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            삼척의 아름다운 바다에서의 순간들을 담았습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <GalleryImage
              key={image.id}
              query={image.query}
              title={image.title}
              index={index}
            />
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl mb-8 text-center">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '오픈워터 코스 소개', duration: '3:45' },
              { title: '삼척 다이빙 포인트', duration: '5:20' },
            ].map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-secondary flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">{video.duration}</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function GalleryImage({ query, title, index }: { query: string; title: string; index: number }) {
  const imageUrl = useUnsplash(query);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg aspect-square bg-secondary cursor-pointer"
    >
      {imageUrl ? (
        <>
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg">{title}</h3>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
