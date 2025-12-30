import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var colorTheme = localStorage.getItem('color-theme') || 'orange';
                  document.documentElement.classList.add('theme-' + colorTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <Main />
        <div id="modals" />
        <NextScript />
      </body>
    </Html>
  );
}
