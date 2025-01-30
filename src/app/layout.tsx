import type { Metadata } from 'next';
import { contentContainer } from './_styles/global.css';
import ClientProvider from './clientProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Eungeori',
    default: 'Eungeori',
  },
  description: '사용자의 배변 활동을 기록하고 건강을 관리하세요!',
  icons: {
    icon: [
      { url: '/favicon/16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/180x180.png', sizes: '180x180', type: 'image/png' }],
  },
  keywords: ['응어리', 'Eungeori', '배변 활동', '배변 활동 기록', '기록', '기록 어플'],
  openGraph: {
    title: 'Eungeori',
    description: '사용자의 배변 활동을 기록하고 건강을 관리하세요!',
    images: [
      {
        url: '/image/opengraph.jpg',
        alt: '응어리 애플리케이션의 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eungeori',
    description: '사용자의 배변 활동을 기록하고 건강을 관리하세요!',
    images: [
      {
        url: '/image/opengraph.jpg',
        alt: '응어리 애플리케이션의 대표 이미지',
      },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <ClientProvider>
          <div className={contentContainer}>{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
