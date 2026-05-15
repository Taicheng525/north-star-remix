import type { Metadata } from "next";
import { Orbitron, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Star",
  description: "Your Own Blockchain, On Demand. Powered by Sonic SVM.",
};

/* Runs synchronously before any paint. Reads the saved theme from
   localStorage (set by ThemeToggle) and applies it to <html> so the
   first paint already matches the user's choice — prevents a
   light/dark flash on hard reload. Default is "light". */
const themeBootstrap = `
(function(){
  try {
    var t = localStorage.getItem('ns-theme');
    if (t !== 'dark' && t !== 'light') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      // Bootstrap script in <head> rewrites data-theme before paint
      // based on localStorage. That's a deliberate server/client
      // mismatch and React will warn unless we suppress it on the
      // root html element.
      suppressHydrationWarning
      className={`${orbitron.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
