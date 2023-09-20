import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&amp;display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
            // href='https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap'
            rel="stylesheet"
          />
          <script src="https://www.google.com/recaptcha/api.js"></script>

          <script async src="https://www.googletagmanager.com/gtag/js?id=G-0BTT5R168E"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-0BTT5R168E');
          </script>
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
