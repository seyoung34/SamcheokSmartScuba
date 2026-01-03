"use client";

import { useState, useEffect } from 'react';

export function useUnsplash(query: string): string | null {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`
        );
        setImageUrl(response.url);
      } catch (error) {
        console.error('Failed to fetch Unsplash image:', error);
        setImageUrl(null);
      }
    };

    if (query) {
      fetchImage();
    }
  }, [query]);

  return imageUrl;
}
