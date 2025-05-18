"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Swiper component with SSR disabled
const BlogSlider = dynamic(() => import('./BlogSlider'), { ssr: false });

interface BlogPostData {
  title: string;
  tags: string[];
  date: string;
  comments: number;
  imageUrl: string;
  description: string;
  isNew?: boolean;
  learnMoreText: string;
  commentsText: string;
  lng: string;
}

interface BlogSliderWrapperProps {
  posts: BlogPostData[];
}

const BlogSliderWrapper: React.FC<BlogSliderWrapperProps> = ({ posts }) => {
  return <BlogSlider posts={posts} />;
};

export default BlogSliderWrapper;