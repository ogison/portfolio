export default function Home() {
  return (
    <main className="p-4 max-w-screen-md mx-auto">
      <header className="text-center mb-8">
        <h1 className="nes-text is-primary">MY PORTFOLIO</h1>
      </header>

      <section className="nes-container with-title mb-4">
        <h2 className="title">About</h2>
        <p>エンジニアとしての経歴やスキルを、8ビットゲーム風に紹介します。</p>
      </section>

      <section className="nes-container with-title mb-4">
        <h2 className="title">Projects</h2>
        <ul className="nes-list is-disc">
          <li>ゲーム風サイトA</li>
          <li>レトロ風アプリB</li>
        </ul>
      </section>

      <footer className="text-center mt-8">
        <p>© 2024 MyName</p>
      </footer>
    </main>
  );
}
