import { isRTL } from '@/i18n/i18n-config';
import { getTranslation } from '@/i18n/server';
import React from 'react';
import blogsData from '@/data/blogs.json';
import BlogSliderWrapper from './BlogSliderWrapper';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCardProps {
  id?: string; // Add ID field for blog identification
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

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  title,
  tags,
  date,
  /* comments, */
  imageUrl,
  description,
  isNew = true,
  learnMoreText,
  /* commentsText, */
  lng,
}) => {
  // Generate blog post URL
  const blogUrl = `/${lng}/blogs/${id}`;

  return (
    <div className="bg-white rounded overflow-hidden shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="relative w-full md:h-[300px] h-0 pb-[62.9%] md:pb-0 overflow-hidden">
        <Image fill src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />

        {isNew && (
          <div className="absolute top-4 right-4 bg-[#E74040] px-2.5 py-1 rounded text-white text-xs font-bold tracking-wider shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]">
            NEW
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-2.5">
        <div className="flex items-center gap-4">
          {tags.map((tag, index) => (
            <span key={index} className={`text-xs tracking-wider ${index === 0 ? 'text-[#8EC2F2]' : 'text-[#737373]'}`}>
              {tag}
            </span>
          ))}
        </div>

        <h4 className="font-['Dancing_Script'] text-xl leading-7 tracking-wider text-black truncate whitespace-nowrap overflow-hidden">
          {title}
        </h4>

        <p className="text-sm leading-5 tracking-wider text-black line-clamp-2">{description}</p>

        <div className="flex justify-between items-center py-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4">
              {/* Calendar Icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99934 14.6667C4.70379 14.6232 2.04278 11.9622 1.99934 8.66668C2.04278 5.37113 4.70379 2.71011 7.99934 2.66668C11.2949 2.71011 13.9559 5.37113 13.9993 8.66668C13.9559 11.9622 11.2949 14.6232 7.99934 14.6667ZM7.99934 4.00001C5.43612 4.03376 3.36642 6.10346 3.33268 8.66668C3.36642 11.2299 5.43612 13.2996 7.99934 13.3333C10.5626 13.2996 12.6323 11.2299 12.666 8.66668C12.6323 6.10346 10.5626 4.03376 7.99934 4.00001ZM11.3327 9.33334H7.33268V5.33334H8.66601V8.00001H11.3327V9.33334ZM13.5273 4.47201L11.5213 2.47201L12.4607 1.52734L14.4673 3.52734L13.5273 4.47134V4.47201ZM2.47068 4.47201L1.52734 3.52734L3.52134 1.52734L4.46468 2.47201L2.47201 4.47201H2.47068Z"
                  fill="#DBB58F"
                />
              </svg>
            </span>
            <span className="text-xs text-[#737373] tracking-wider">{date}</span>
          </div>
        </div>

        {/* Make Learn More text a clickable link */}
        <Link href={blogUrl} className="flex items-center gap-2.5 mt-2 cursor-pointer group">
          <span className="text-sm font-bold text-[#737373] tracking-wider group-hover:text-[#DBB58F] transition-colors">
            {learnMoreText}
          </span>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isRTL(lng) ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.180771 0.180771C0.237928 0.123469 0.305828 0.0780066 0.380583 0.0469869C0.455337 0.0159672 0.535477 0 0.616412 0C0.697347 0 0.777487 0.0159672 0.852241 0.0469869C0.926996 0.0780066 0.994896 0.123469 1.05205 0.180771L8.4358 7.56452C8.4931 7.62168 8.53857 7.68958 8.56959 7.76433C8.60061 7.83909 8.61657 7.91923 8.61657 8.00016C8.61657 8.0811 8.60061 8.16124 8.56959 8.23599C8.53857 8.31074 8.4931 8.37865 8.4358 8.4358L1.05205 15.8196C0.936514 15.9351 0.779809 16 0.616412 16C0.453015 16 0.29631 15.9351 0.180771 15.8196C0.0652316 15.704 0.000322157 15.5473 0.000322157 15.3839C0.000322157 15.2205 0.0652316 15.0638 0.180771 14.9483L7.13011 8.00016L0.180771 1.05205C0.123469 0.994897 0.078006 0.926996 0.0469863 0.852242C0.0159666 0.777487 0 0.697347 0 0.616412C0 0.535478 0.0159666 0.455338 0.0469863 0.380583C0.078006 0.305829 0.123469 0.237928 0.180771 0.180771Z"
              fill="#DBB58F"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const FeaturedPosts = async ({ lng }: { lng: string }) => {
  const { t } = await getTranslation(lng, 'common');

  // Filter blogs based on language (English or Arabic version)
  const isArabic = isRTL(lng);
  const filteredBlogs = blogsData.blogs.filter((blog) => {
    // For Arabic language, select blogs with "-ar" in their ID
    if (isArabic) {
      return blog.id.endsWith('-ar');
    }
    // For English and other languages, select blogs without "-ar" in their ID
    return !blog.id.endsWith('-ar');
  });

  // Use all filtered blogs instead of limiting to 3
  const featuredBlogs = filteredBlogs;

  const posts = featuredBlogs.map((blog) => {
    // Extract category and create tags from it
    const category = blog.category;

    return {
      id: blog.id, // Pass the blog ID for creating the link
      title: blog.title,
      tags: [
        t('home.featured_posts.tags.google', 'Google'),
        t('home.featured_posts.tags.trending', 'Trending'),
        category || t('home.featured_posts.tags.new', 'New'),
      ],
      date: blog.date,
      comments: blog.commentCount,
      // Extract image path (remove "/images/" prefix if it exists)
      imageUrl: blog.image,
      description:
        blog.sections && blog.sections.length > 0
          ? blog.sections[0].content.split('\n')[0]
          : t('home.featured_posts.default_description', 'Check out this amazing product from Solo'),
      isNew: true,
      learnMoreText: t('home.featured_posts.learn_more', 'Learn More'),
      commentsText: t('home.featured_posts.comments', 'comments'),
      lng: lng,
    };
  });

  return (
    <section className="py-[30px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[30px]">
          <h2 className="font-['Dancing_Script'] text-[42px] md:text-[84px] leading-[1.2em] font-semibold text-black">
            {t('home.featured_posts.title', 'Featured Posts')}
          </h2>
        </div>

        {/* Desktop view with Swiper - Visible on md screens and above */}
        <div className="hidden md:block">
          <BlogSliderWrapper posts={posts} />
        </div>

        {/* Mobile view (scrollable horizontal cards) - Visible on screens below md */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 space-x-4">
            {posts.map((post, index) => (
              <div key={index} className="flex-none w-[85%]">
                <BlogPostCard
                  id={post.id} // Pass the blog ID to BlogPostCard
                  title={post.title}
                  tags={post.tags}
                  date={post.date}
                  comments={post.comments}
                  imageUrl={post.imageUrl}
                  description={post.description}
                  isNew={post.isNew}
                  learnMoreText={post.learnMoreText}
                  commentsText={post.commentsText}
                  lng={lng}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Add this CSS to hide scrollbars but allow scrolling
const scrollbarHideStyle = `
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
`;

// Add the style to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollbarHideStyle;
  document.head.appendChild(style);
}

export default FeaturedPosts;
