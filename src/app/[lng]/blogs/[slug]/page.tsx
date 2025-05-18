import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { getTranslation } from '@/i18n/server';
import { isRTL } from '@/i18n/i18n-config';

// Types for our blog data
interface BlogComment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface BlogSection {
  id: string;
  title: string;
  content: string;
}

interface RelatedPost {
  id: string;
  title: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  commentCount: number;
  image: string;
  sections: BlogSection[];
  relatedPosts: RelatedPost[];
  comments: BlogComment[];
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Get blog data
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} | Solo Sauce`,
    description: blog.sections[0]?.content || '',
    openGraph: {
      images: [blog.image],
    },
  };
}

// Helper function to get blog by slug
async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/blogs.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    const blog = data.blogs.find((blog: BlogPost) => blog.id === slug);
    return blog || null;
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return null;
  }
}

// Generate static params for the page (static generation)
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/blogs.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    return data.blogs.map((blog: BlogPost) => ({
      slug: blog.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPost({ params }: { params: Promise<{ lng: string; slug: string }> }) {
  const { lng } = await params;
  let { slug } = await params;

  const { t } = await getTranslation(lng);
  if (lng === 'ar') slug = `${slug}-ar`;
  const blog = await getBlogBySlug(slug);
  const isRtl = isRTL(lng);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen py-10 bg-[#EFF2F6]">
      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation */}
        <div className="w-full bg-white rounded-[8px] py-3 px-5 mb-8">
          <div className={`flex items-center gap-2`}>
            <Link href={`/${lng}`} className="flex items-center gap-2">
              <span className="home-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 10.5V20H19V10.5"
                    stroke="#DBB58F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3L2 12H22L12 3Z"
                    stroke="#DBB58F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-['Montserrat'] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-black">
                {t('nav.home')}
              </span>
            </Link>
            <span className="arrow">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isRtl ? 'rotate-180' : ''}`}
              >
                <path d="M3.5 0.5L6.5 3.5L3.5 5.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <Link href={`/${lng}/blogs`} className="flex items-center gap-2">
              <span className="font-['Montserrat'] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-black">
                {t('nav.blog')}
              </span>
            </Link>
            <span className="arrow">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isRtl ? 'rotate-180' : ''}`}
              >
                <path d="M3.5 0.5L6.5 3.5L3.5 5.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-['Montserrat'] font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#DBB58F] w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {blog.title}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
          {/* Main Content Column */}
          <div className="flex flex-col gap-8">
            {/* Featured Banner */}
            <div className="relative w-full aspect-[400/462] lg:aspect-[1336/580] rounded-[10px] overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
              {/* Banner Content */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="backdrop-blur-[35px] p-6 mx-auto">
                  <div className="flex flex-col gap-[10px]">
                    {/* Category Badge */}
                    <div className="flex justify-start">
                      <div className="bg-white inline-flex items-center gap-[10px] py-[10px] px-[10px] rounded-[20px]">
                        <div className="w-[25px] h-[25px] rounded-full bg-[#DBB58F]"></div>
                        <span className="text-[#DBB58F] font-['Montserrat'] text-[35px] font-normal">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    {/* Blog Title */}
                    <span className="font-['Montserrat'] font-bold text-[20px] md:text-[20px]">{blog.title}</span>
                    {/* Date and Comments */}
                    <div className="flex items-center gap-4">
                      <span className="text-white font-['Montserrat'] text-[14px] font-normal">{blog.date}</span>
                      <span className="text-white font-['Montserrat'] text-[14px] font-normal">
                        {blog.commentCount} {t('blog.comments')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Content Sections */}
            <div className="flex flex-col gap-[30px]">
              {blog.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-[20px]">
                  <span id={section.id} className="font-['Montserrat'] font-bold text-[27px] text-black">
                    {section.title}
                  </span>
                  <div className="font-['Montserrat'] font-normal text-[18px] leading-[1.5em] text-black whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="hidden flex-col gap-8 lg:flex">
            {/* Share Section */}
            <div className="bg-[#DBB58F] rounded-[10px] p-6 text-white">
              <div className="flex items-center justify-between flex-wrap">
                <span className="font-raleway font-semibold text-[16px] w-100">{t('blog.likeShare')}</span>
                <div className="flex items-center gap-[20px] mt-4">
                  <button className="w-[24px] h-[24px] rounded-full flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M25.6055 0H4.39453C1.97159 0 0 1.97159 0 4.39453V25.6055C0 28.0284 1.97159 30 4.39453 30H13.2422V19.3945H9.72656V14.1211H13.2422V10.5469C13.2422 7.63893 15.6077 5.27344 18.5156 5.27344H23.8477V10.5469H18.5156V14.1211H23.8477L22.9688 19.3945H18.5156V30H25.6055C28.0284 30 30 28.0284 30 25.6055V4.39453C30 1.97159 28.0284 0 25.6055 0Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <button className="w-[24px] h-[24px] rounded-full flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_471_6449)">
                        <path
                          d="M16.0031 14.4877L22.7542 24.1442H19.9835L14.4745 16.2644V16.264L13.6657 15.1072L7.23022 5.90186H10.0009L15.1943 13.331L16.0031 14.4877Z"
                          fill="white"
                        />
                        <path
                          d="M26.7584 0H3.24156C1.45134 0 0 1.45134 0 3.24156V26.7584C0 28.5487 1.45134 30 3.24156 30H26.7584C28.5487 30 30 28.5487 30 26.7584V3.24156C30 1.45134 28.5487 0 26.7584 0ZM19.135 25.4406L13.5601 17.3271L6.58044 25.4406H4.77653L12.7592 16.1619L4.77653 4.54401H10.865L16.144 12.2269L22.7533 4.54401H24.5572L16.9452 13.3924H16.9447L25.2235 25.4406H19.135Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_471_6449">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button className="w-[24px] h-[24px] rounded-full flex items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M25.9091 0H4.09091C1.83156 0 0 1.83156 0 4.09091V25.9091C0 28.1684 1.83156 30 4.09091 30H25.9091C28.1684 30 30 28.1684 30 25.9091V4.09091C30 1.83156 28.1684 0 25.9091 0Z"
                        fill="white"
                      />
                      <path
                        d="M10.8068 8.18182C10.8068 8.68751 10.6568 9.18184 10.3759 9.60231C10.0949 10.0228 9.69558 10.3505 9.22839 10.544C8.76119 10.7375 8.2471 10.7882 7.75112 10.6895C7.25515 10.5909 6.79957 10.3473 6.44199 9.98976C6.08441 9.63218 5.8409 9.1766 5.74225 8.68063C5.64359 8.18465 5.69422 7.67056 5.88774 7.20337C6.08126 6.73617 6.40898 6.33685 6.82944 6.0559C7.24991 5.77495 7.74424 5.625 8.24993 5.625C8.92805 5.625 9.57838 5.89438 10.0579 6.37387C10.5374 6.85337 10.8068 7.50371 10.8068 8.18182Z"
                        fill="#DBB58F"
                      />
                      <path
                        d="M10.2272 12.4432V23.7392C10.2277 23.8225 10.2117 23.9051 10.1801 23.9822C10.1485 24.0594 10.102 24.1295 10.0432 24.1886C9.98446 24.2477 9.91459 24.2945 9.83764 24.3265C9.76069 24.3585 9.67818 24.375 9.59485 24.375H6.89996C6.81663 24.3752 6.73407 24.359 6.65704 24.3272C6.58001 24.2954 6.51002 24.2487 6.45109 24.1898C6.39217 24.1308 6.34547 24.0609 6.31368 23.9838C6.28189 23.9068 6.26565 23.8242 6.26587 23.7409V12.4432C6.26587 12.275 6.33268 12.1137 6.45159 11.9948C6.57051 11.8759 6.73179 11.8091 6.89996 11.8091H9.59485C9.76273 11.8095 9.92357 11.8765 10.0421 11.9954C10.1607 12.1143 10.2272 12.2753 10.2272 12.4432Z"
                        fill="#DBB58F"
                      />
                      <path
                        d="M24.3137 18.3239V23.792C24.3139 23.8687 24.299 23.9446 24.2698 24.0154C24.2405 24.0862 24.1976 24.1506 24.1434 24.2048C24.0893 24.2589 24.0249 24.3019 23.9541 24.3311C23.8832 24.3603 23.8073 24.3752 23.7307 24.375H20.833C20.7564 24.3752 20.6805 24.3603 20.6096 24.3311C20.5388 24.3019 20.4745 24.2589 20.4203 24.2048C20.3661 24.1506 20.3232 24.0862 20.2939 24.0154C20.2647 23.9446 20.2498 23.8687 20.25 23.792V18.4926C20.25 17.7017 20.4819 15.029 18.1824 15.029C16.4012 15.029 16.0381 16.8579 15.9665 17.6795V23.792C15.9665 23.9452 15.9063 24.0922 15.7988 24.2013C15.6913 24.3103 15.5452 24.3728 15.3921 24.375H12.5932C12.5167 24.375 12.441 24.3599 12.3704 24.3306C12.2998 24.3013 12.2356 24.2583 12.1816 24.2041C12.1276 24.15 12.0848 24.0857 12.0557 24.015C12.0266 23.9443 12.0117 23.8685 12.012 23.792V12.3937C12.0117 12.3173 12.0266 12.2415 12.0557 12.1708C12.0848 12.1001 12.1276 12.0358 12.1816 11.9816C12.2356 11.9275 12.2998 11.8845 12.3704 11.8552C12.441 11.8259 12.5167 11.8108 12.5932 11.8108H15.3921C15.5467 11.8108 15.695 11.8722 15.8043 11.9815C15.9136 12.0909 15.975 12.2391 15.975 12.3937V13.379C16.6364 12.3869 17.6165 11.6216 19.708 11.6216C24.3409 11.6216 24.3137 15.9477 24.3137 18.3239Z"
                        fill="#DBB58F"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white p-4 rounded-[5px]">
              <span className="font-['Montserrat'] font-semibold text-[20px] text-black ">
                {t('blog.inThisArticle')}
              </span>
              <div className="flex flex-col gap-4 mt-4">
                {blog.sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex py-[10px] ps-[20px] hover:text-[#DBB58F] transition-colors ${
                      index === 0 ? 'border-s-[3px] border-[#DBB58F]' : ''
                    }`}
                  >
                    <span
                      className={`font-['Montserrat'] ${
                        index === 0 ? 'font-semibold text-[#DBB58F]' : 'font-normal text-black'
                      } text-[16px]`}
                    >
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {blog.comments.length > 0 && (
          <div className="bg-white rounded-[8px] p-8 mt-8">
            <h3 className="font-['Montserrat'] font-semibold text-[28px] text-black mb-4">{t('blog.comments')}</h3>
            <hr className="border-t border-gray-300 mb-4" />

            <div className="flex flex-col gap-4">
              {blog.comments.map((comment) => (
                <div key={comment.id} className="border border-[#727272] rounded-[8px] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative">
                      <Image
                        src={comment.avatar || '/images/avatars/default-avatar.jpg'}
                        alt={comment.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-['Montserrat'] font-semibold text-[18px] text-black">{comment.author}</span>
                  </div>
                  <p className="font-['Source_Sans_Pro'] text-[16px] leading-[1.75em] text-black mb-3">
                    {comment.content}
                  </p>
                  <div className="flex justify-end items-center">
                    <span className="font-['Montserrat'] font-semibold text-[14px] text-[rgba(0,0,0,0.4)]">
                      {comment.date}
                    </span>
                  </div>
                </div>
              ))}

              {/* "Load More" button */}
              <button className="bg-[#E4E4E4] border border-[#727272] rounded-[6px] py-[10px] font-['Montserrat'] font-semibold text-[14px] text-black">
                {t('blog.loadMore')}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
