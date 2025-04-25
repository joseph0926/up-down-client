import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/providers/react-query.provider';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://updown.kr'),

  title: {
    default: 'Up & Down - 실시간 찬반 토론 플랫폼',
    template: '%s | Up & Down',
  },

  description:
    '정치·사회·경제·문화 등 화제 이슈를 찬반 구조로 명확히 토론하고 결론을 도출하는 실시간 토론 플랫폼.',

  applicationName: 'Up & Down',
  manifest: '/site.webmanifest',

  keywords: [
    '실시간 토론',
    '찬반 토론',
    '정치 이슈',
    '사회 이슈',
    'Up&Down',
    '익명 토론',
    '댓글 좋아요',
  ],

  authors: [{ name: 'Up & Down Team', url: 'https://updown.kr' }],
  creator: 'Up & Down Team',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    siteName: 'Up & Down',
    url: 'https://updown.kr',
    title: 'Up & Down - 실시간 찬반 토론 플랫폼',
    description:
      '다양한 사회 이슈를 찬반으로 토론하고 명확한 결론을 도출하세요!',
    images: [
      {
        url: '/og/default.png',
        width: 1200,
        height: 630,
        alt: 'Up & Down 로고와 찬반 비율 예시',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Up & Down - 실시간 찬반 토론 플랫폼',
    description:
      '정치·사회·경제·문화 등 다양한 이슈를 실시간으로 토론하고 결론을 확인하세요.',
    images: ['/og/default.png'],
    creator: '@UpDownOfficial',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon.webp', sizes: 'any', type: 'image/x-icon' },
    ],
    apple: '/icons/apple-touch-icon.png',
    shortcut: '/icons/favicon-16x16.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ReactQueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
