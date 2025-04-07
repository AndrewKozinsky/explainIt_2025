import type { Metadata } from "next";
import Metrika from './_in/Metrika/Metrika'
import './_in/style/global.scss'

export const metadata: Metadata = {
    title: 'Курс английского языка',
    description: 'Курс английского языка с уровня А1',
    verification: {
        yandex: '1611c5fab3b46857',
    },
    keywords: [
        'Истории',
        'английский',
        'a1',
        'Истории на английском',
        'адаптированные тексты',
    ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Metrika />
        {children}
      </body>
    </html>
  );
}
