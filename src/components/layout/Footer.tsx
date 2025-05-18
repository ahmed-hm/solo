'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation, useIsRTL } from '../../i18n/client';

interface FooterProps {
  lng: string;
}

const Footer = ({ lng = 'en' }: FooterProps) => {
  const { t } = useTranslation(lng);
  const isRtl = useIsRTL(lng);

  return (
    <footer className="bg-black text-white py-[80px]">
      <div className="container mx-auto px-[20px]">
        <div className={`grid grid-cols-2 md:grid-cols-12 gap-[40px] ${isRtl ? 'text-right' : 'text-left'}`}>
          {/* Newsletter section */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col">
                <div className="text-white text-[24px] font-medium font-['Montserrat'] pb-2">
                  {t('footer.exclusive')}
                </div>
                <div className="text-white text-[20px] font-medium font-['Montserrat'] pb-2">
                  {t('footer.subscribe')}
                </div>
                <div className="text-white text-[16px] font-['Montserrat'] opacity-70">{t('footer.discount')}</div>
              </div>
              <div
                className={`flex items-center border border-white rounded-[4px] overflow-hidden ${
                  isRtl ? 'flex-row-reverse' : ''
                }`}
              >
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className={`bg-transparent text-white px-[16px] py-[12px] flex-grow outline-none placeholder:text-white placeholder:opacity-40 font-['Montserrat'] text-[16px] ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                />
                <button className="p-[12px]">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={isRtl ? 'rotate-180' : ''}
                  >
                    <path
                      d="M8.91196 9.9998H2.99996L1.02296 2.1348C1.0103 2.0891 1.00259 2.04216 0.999959 1.9948C0.977959 1.2738 1.77196 0.773804 2.45996 1.1038L21 9.9998L2.45996 18.8958C1.77996 19.2228 0.995959 18.7368 0.999959 18.0288C1.00198 17.9655 1.0131 17.9029 1.03296 17.8428L2.49996 12.9998"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Support section */}
          <div className="col-span-1 md:col-span-3">
            <div className="text-white text-[20px] font-medium font-['Montserrat'] mb-[24px]">
              {t('footer.support')}
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className="text-white text-[16px] font-['Montserrat'] opacity-70 leading-[24px]">
                {t('footer.address')}
              </p>
              <p className="text-white text-[16px] font-['Montserrat'] opacity-70">info@solo-sauce.com</p>
              <p className="text-white text-[16px] font-['Montserrat'] opacity-70">+201002299067</p>
            </div>
          </div>

          {/* Quick Links section */}
          <div className="col-span-1 md:col-span-3">
            <div className="text-white text-[20px] font-medium font-['Montserrat'] mb-[24px]">
              {t('footer.quickLink')}
            </div>
            <div className="flex flex-col gap-[16px]">
              <Link
                href={`/${lng}/privacy`}
                className="text-white text-[16px] font-['Montserrat'] opacity-70 hover:opacity-100 transition-colors duration-300"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href={`/${lng}/terms`}
                className="text-white text-[16px] font-['Montserrat'] opacity-70 hover:opacity-100 transition-colors duration-300"
              >
                {t('footer.termsOfUse')}
              </Link>
              <Link
                href={`/${lng}/faq`}
                className="text-white text-[16px] font-['Montserrat'] opacity-70 hover:opacity-100 transition-colors duration-300"
              >
                {t('footer.faq')}
              </Link>
              <Link
                href={`/${lng}/careers`}
                className="text-white text-[16px] font-['Montserrat'] opacity-70 hover:opacity-100 transition-colors duration-300"
              >
                {t('footer.careers')}
              </Link>
              <Link
                href={`/${lng}/contact`}
                className="text-white text-[16px] font-['Montserrat'] opacity-70 hover:opacity-100 transition-colors duration-300"
              >
                {t('footer.contactUs')}
              </Link>
            </div>
          </div>

          {/* Social Media QR section */}
          <div className="col-span-1 md:col-span-3 flex justify-center">
            <div className="flex flex-col items-center">
              <span
                className={`text-white text-[20px] font-medium font-['Montserrat'] mb-[24px] w-full ${
                  isRtl ? 'text-center md:text-right' : 'text-center md:text-left'
                }`}
              >
                {t('footer.socialMedia')}
              </span>
              <div className="flex flex-col items-center">
                <p className="text-white text-[12px] font-medium font-['Montserrat'] mb-[8px]">
                  {t('footer.qrDescription')}
                </p>
                <div className="w-[140px] h-[140px]">
                  <Image src="/images/qr/qr-code.svg" alt="Solo-Sauce Social Media QR Code" width={140} height={140} />
                </div>
                {/* Social Media Icons - moved below QR code */}
                <div className="flex justify-center gap-[24px]">
                  <a
                    href="https://www.facebook.com/share/168xJ1rEuJ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[24px] h-[24px] flex items-center justify-center"
                  >
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 7H10.5L10 9H6V18H4V9H0V7H4V5.128C4 3.345 4.186 2.698 4.534 2.046C4.87501 1.40181 5.40181 0.875009 6.046 0.534C6.698 0.186 7.345 0 9.128 0C9.65 0 10.108 0.0500001 10.5 0.15V2H9.128C7.804 2 7.401 2.078 6.99 2.298C6.686 2.46 6.46 2.686 6.298 2.99C6.078 3.401 6 3.804 6 5.128V7Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@Solo_Sauce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[24px] h-[24px] flex items-center justify-center"
                  >
                    {/* <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.1211 0.443359C12.8883 0.136396 13.7199 0.0334918 14.5352 0.141602L14.8838 0.201172C15.8082 0.393885 16.6557 0.854624 17.3193 1.52637L17.3486 1.55664H17.3906C17.7296 1.55426 18.0806 1.59738 18.498 1.53809C18.882 1.48352 19.3278 1.34203 19.915 1.00977C19.6091 2.49447 19.4324 3.16729 18.7646 4.08301L18.7451 4.10938V4.14258C18.7451 7.9414 17.5781 10.7564 15.8262 12.7393C14.1825 14.5994 12.0186 15.7335 9.80566 16.2568L9.3623 16.3535C7.7452 16.6761 5.754 16.5731 3.99609 16.2109C3.11794 16.03 2.30096 15.7842 1.62012 15.4971C1.03699 15.2511 0.560061 14.9759 0.229492 14.6885C0.6606 14.6463 1.41195 14.553 2.24414 14.3594C3.24389 14.1267 4.37194 13.749 5.20312 13.1406L5.31934 13.0557L5.19922 12.9766C4.50766 12.5207 2.81165 11.4984 1.73145 9.5166C0.667008 7.56375 0.19288 4.66296 1.91406 0.425781C3.47307 2.22095 5.05692 3.48915 6.66602 4.22363L6.99512 4.36719C7.57627 4.60556 7.94226 4.72333 8.23145 4.79102C8.51953 4.85841 8.73223 4.8754 8.99219 4.91113L9.28711 4.95215L9.10742 4.77148C9.13232 3.84188 9.4255 2.93867 9.9541 2.17285C10.4234 1.49307 11.0591 0.947677 11.7979 0.586914L12.1211 0.443359ZM13.9053 1.90137C13.119 1.90124 12.3638 2.20994 11.8027 2.76074C11.3119 3.24267 11.0038 3.87627 10.9248 4.55371L10.9053 4.84668L10.877 6.4209C10.8756 6.49137 10.8592 6.56125 10.8291 6.625C10.799 6.6887 10.7556 6.74517 10.7021 6.79102C10.6487 6.83684 10.5861 6.87164 10.5186 6.8916C10.4848 6.90156 10.45 6.9075 10.415 6.91016L10.3105 6.90723L8.74902 6.69531C6.71753 6.41828 4.7663 5.48248 2.88965 3.91895L2.75781 3.80859L2.72754 3.97754C2.42573 5.64812 2.56793 7.0709 3.14746 8.30176C3.69051 9.45505 4.61342 10.4312 5.89453 11.2832L6.15625 11.4521L7.90234 12.5498C7.97145 12.5932 8.02959 12.6529 8.07031 12.7236C8.11103 12.7944 8.1339 12.8744 8.13672 12.9561C8.13951 13.0377 8.12173 13.1189 8.08594 13.1924C8.06806 13.229 8.04553 13.2629 8.01953 13.2939L7.93066 13.3779L6.33887 14.541L6.11523 14.7041L6.3916 14.7207C7.22554 14.7727 8.0251 14.7474 8.71875 14.6396L9.00977 14.5879C11.3887 14.1129 13.375 12.9789 14.7656 11.2207C16.1559 9.46269 16.9453 7.08826 16.9453 4.14258C16.9453 3.99705 16.8715 3.78499 16.7441 3.55762C16.6144 3.32598 16.4211 3.06491 16.167 2.82031C15.6901 2.36143 14.9936 1.95525 14.0889 1.90625L13.9053 1.90137Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="0.2"
                      />
                    </svg> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 512 360.726"
                    >
                      <path
                        fill="#fff"
                        d="M456.035 10.769c22.031 5.926 39.377 23.386 45.265 45.56C512 96.516 512 180.363 512 180.363s0 83.846-10.7 124.037c-5.888 22.17-23.234 39.631-45.265 45.559-39.928 10.767-200.034 10.767-200.034 10.767s-160.107 0-200.035-10.767C33.937 344.031 16.587 326.57 10.7 304.4 0 264.209 0 180.363 0 180.363S0 96.516 10.7 56.329c5.887-22.174 23.237-39.634 45.266-45.56C95.894 0 256.001 0 256.001 0s160.106 0 200.034 10.769zm-252.398 245.72l133.818-76.122-133.818-76.131v152.253z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/solosauce.eg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[24px] h-[24px] flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V15C1 16.0609 1.42143 17.0783 2.17157 17.8284C2.92172 18.5786 3.93913 19 5 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V5C19 3.93913 18.5786 2.92172 17.8284 2.17157C17.0783 1.42143 16.0609 1 15 1Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14V14Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5 5.5C15.7652 5.5 16.0196 5.39464 16.2071 5.20711C16.3946 5.01957 16.5 4.76522 16.5 4.5C16.5 4.23478 16.3946 3.98043 16.2071 3.79289C16.0196 3.60536 15.7652 3.5 15.5 3.5C15.2348 3.5 14.9804 3.60536 14.7929 3.79289C14.6054 3.98043 14.5 4.23478 14.5 4.5C14.5 4.76522 14.6054 5.01957 14.7929 5.20711C14.9804 5.39464 15.2348 5.5 15.5 5.5Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/solo-sauce/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[24px] h-[24px] flex items-center justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.5 6.05C9.417 5.113 10.611 4.5 12 4.5C13.4587 4.5 14.8576 5.07946 15.8891 6.11091C16.9205 7.14236 17.5 8.54131 17.5 10V17.5H15.5V10C15.5 9.07174 15.1313 8.1815 14.4749 7.52513C13.8185 6.86875 12.9283 6.5 12 6.5C11.0717 6.5 10.1815 6.86875 9.52513 7.52513C8.86875 8.1815 8.5 9.07174 8.5 10V17.5H6.5V5H8.5V6.05ZM1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0C1.89782 0 2.27936 0.158035 2.56066 0.43934C2.84196 0.720644 3 1.10218 3 1.5C3 1.89782 2.84196 2.27936 2.56066 2.56066C2.27936 2.84196 1.89782 3 1.5 3ZM0.5 5H2.5V17.5H0.5V5Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="flex justify-center mt-[40px]">
          <div className={`flex items-center gap-[6px] opacity-70 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 1.75C5.45 1.75 1.75 5.45 1.75 10C1.75 14.55 5.45 18.25 10 18.25C14.55 18.25 18.25 14.55 18.25 10C18.25 5.45 14.55 1.75 10 1.75ZM10 16.75C6.25 16.75 3.25 13.75 3.25 10C3.25 6.25 6.25 3.25 10 3.25C13.75 3.25 16.75 6.25 16.75 10C16.75 13.75 13.75 16.75 10 16.75Z"
                fill="white"
              />
              <path d="M10.75 6.25H9.25V10.75H13.75V9.25H10.75V6.25Z" fill="white" />
            </svg>
            <span className="text-white text-[16px] font-['Montserrat']">{t('footer.copyright')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
