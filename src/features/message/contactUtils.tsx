import React from "react";

export const contactLinks = {
  github: "https://github.com/ogison",
  twitter: "https://x.com/ogison999",
  qiita: "https://qiita.com/ogison",
};

export const worksLinks = {
  "ogison の館（ポートフォリオ）": "https://ogison-portfolio.vercel.app/",
  "PLAYLISTER X": "https://playlister-x.vercel.app/",
  "AI Selector": "https://gemini-selection.vercel.app/home",
};

interface ContactLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function ContactLink({ href, children, className }: ContactLinkProps) {
  const isEmail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className={className}
    >
      {children}
    </a>
  );
}

export function formatContactText(
  text: string,
  isTypingComplete: boolean,
  linkClassName?: string
): React.ReactNode {
  if (!isTypingComplete) {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  }

  const lines = text.split("\n");
  return lines.map((line, index) => {
    let processedLine: React.ReactNode = line;

    if (line.includes("GitHub")) {
      processedLine = (
        <>
          {line.substring(0, line.indexOf("GitHub"))}
          <ContactLink href={contactLinks.github} className={linkClassName}>
            GitHub
          </ContactLink>
          {line.substring(line.indexOf("GitHub") + 6)}
        </>
      );
    } else if (line.includes("X/Twitter")) {
      processedLine = (
        <>
          {line.substring(0, line.indexOf("X/Twitter"))}
          <ContactLink href={contactLinks.twitter} className={linkClassName}>
            X/Twitter
          </ContactLink>
          {line.substring(line.indexOf("X/Twitter") + 9)}
        </>
      );
    } else if (line.includes("Qiita")) {
      processedLine = (
        <>
          {line.substring(0, line.indexOf("Qiita"))}
          <ContactLink href={contactLinks.qiita} className={linkClassName}>
            Qiita
          </ContactLink>
          {line.substring(line.indexOf("Qiita") + 5)}
        </>
      );
    }

    return (
      <span key={index}>
        {processedLine}
        {index < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function formatWorksText(
  text: string,
  isTypingComplete: boolean,
  linkClassName?: string
): React.ReactNode {
  if (!isTypingComplete) {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  }

  const lines = text.split("\n");
  return lines.map((line, index) => {
    let processedLine: React.ReactNode = line;

    // 【】で囲まれたタイトルを検出してリンク化
    const titleMatch = line.match(/【([^】]+)】/);
    if (titleMatch) {
      const fullTitle = titleMatch[1]; // "ogison の館（ポートフォリオ）" など
      const url = worksLinks[fullTitle as keyof typeof worksLinks];

      if (url) {
        const beforeTitle = line.substring(0, titleMatch.index);
        const afterTitle = line.substring((titleMatch.index || 0) + titleMatch[0].length);

        processedLine = (
          <>
            {beforeTitle}【
            <ContactLink href={url} className={linkClassName}>
              {fullTitle}
            </ContactLink>
            】{afterTitle}
          </>
        );
      }
    }

    return (
      <span key={index}>
        {processedLine}
        {index < lines.length - 1 && <br />}
      </span>
    );
  });
}
