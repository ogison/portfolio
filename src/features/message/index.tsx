"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "../menu";
import styles from "./MessageWindow.module.scss";
import { formatContactText, formatWorksText } from "@/features/message/contactUtils";
import { useSound, useSoundSettings } from "@/features/message/useSound";

interface MessageWindowProps {
  selectedMenuItem: MenuItem;
  onTypingChange?: (isTyping: boolean) => void;
}

// メッセージ量に応じて表示スピードを動的に計算
const calculateTypingSpeed = (messageLength: number): number => {
  const baseSpeed = 20; // 最遅スピード（ms）- 高速化
  const fastSpeed = 10; // 最速スピード（ms）
  const threshold = 300; // 調整開始の文字数

  if (messageLength <= threshold) {
    return baseSpeed;
  }

  // 線形に速度を上げる（文字数が多いほど早く）
  const speedReduction = Math.min((messageLength - threshold) / 200, 1);
  return Math.max(fastSpeed, baseSpeed - (baseSpeed - fastSpeed) * speedReduction);
};

const messages = {
  welcome:
    "おや？ 旅人よ、ようこそ 我が館へ！\n" +
    "ここでは ogison の ひみつを 少しばかり のぞくことができるんだ。\n\n" +
    "・展示された宝（作品）\n" +
    "・封印の書物（スキル） \n" +
    "・旅人へのしるべ（コンタクト）\n\n" +
    "さあ、どれを 見てみるかい？",
  about: [
    // パターン1: 空想・夢見がち
    "僕はね、ときどき空を見上げては\n" +
      "『雲の上にはどんな街があるんだろう？』って考えるんだ。\n\n" +
      "雲でできた船に乗って、空を旅してみたい。\n" +
      "そんな空想が、僕の心をいつも軽くしてくれるんだ。",

    // パターン2: 食べ物・小さな幸せ
    "僕の楽しみのひとつは、温かいご飯を食べること。\n\n" +
      "どんなに大変な日でも、\n" +
      "一口目のスープや焼きたてのパンで\n" +
      "『ああ、生きてるなぁ』って思えるんだ。\n\n" +
      "小さな幸せが、明日の力になるんだよね。",

    // パターン3: 哲学・ちょっと不思議な考え
    "最近よく考えるんだけど…\n" +
      "『もし僕が誰かの夢の中の登場人物だったら？』ってね。\n\n" +
      "でもまあ、それでも構わないかな。\n" +
      "だって、こうして誰かと出会い、\n" +
      "言葉を交わせるなら、それだけで本物の旅だと思うんだ。",

    // ビール
    "僕は ビールが好きなんだ。、\n" +
      "ただ。家ではほとんど飲まなくて、酒場に出かけたときには\n" +
      "ずっとビールばかりを たしなんでいるよ。\n\n" +
      "まだ見ぬ美味い店を探し、\n" +
      "新たな一杯に出会うことを楽しみにしてる。\n\n" +
      "クラフトビール巡りをしたい、、、\n",
  ],
  skills:
    "おや？ 旅人よ、封印の書物を ひらいてしまったのか。\n" +
    "ここには 僕 が 旅のあいだに 身につけた技と、\n" +
    "あつかってきた道具の記録が 記されているんだ。\n\n" +
    "【術・技】\n" +
    "・HTML —— 世界の骨格を形づくる力\n" +
    "・CSS —— 彩りを与える装飾の術\n" +
    "・JavaScript —— 動きを吹き込む生命の術\n" +
    "・React —— UIを自在に操る秘術\n" +
    "・Next.js —— 影と光を操り 未来を描く術\n" +
    "・Git / GitHub —— 仲間と絆を結ぶ協調の術\n" +
    "・AWS —— 遠き場所へ瞬時に渡る転移の力\n" +
    "・Python —— 知恵と解析を操る賢者の術\n" +
    "・Java —— 堅牢な城壁を築く騎士の力\n" +
    "・Spring —— 大地に根ざし、強固な基盤を支える術\n\n" +
    "【道具・ツール】\n" +
    "・Docker —— 船出を助ける 移動する港\n" +
    "・Notion —— 知識を収める 無限の書庫\n" +
    "・Slack —— 仲間と声を交わす 伝令の水晶\n" +
    "・Jira —— クエストを管理する 任務の巻物\n" +
    "・Claude —— 賢者のごとく 助言を授ける霊\n" +
    "・V0 —— 形なき力を即座に形にする 魔導の炉\n" +
    "・Sentry —— 闇を見張り 不具合を暴く番兵\n" +
    "・Datadog —— 世界を見渡す 千里眼の獣\n" +
    "・Cursor —— 書を操る 魔法の羽ペン\n" +
    "・Backlog —— 任務を束ねる 冒険者ギルドの帳簿\n" +
    "・Redmine —— 記録を刻む 古き石板\n\n" +
    "さあ、どの力や道具を 見てみるかい？",
  works:
    "展示された宝の もくろくだ。\n\n" +
    "【ogison の館（ポートフォリオ）】\n" +
    "→ ウーパールーパーの館主がおくる、冒険のしるべとなる館。\n" +
    "　技術・作品・物語が すべてこの場所に つどっている。\n\n" +
    "【PLAYLISTER X】\n" +
    "→ Spotify のちからで プレイリストを つくる道具。\n" +
    "　※ APIの都合により、作成は さくしゃ本人のみ 可能だ。\n\n" +
    "【AI Selector】\n" +
    "→ 生成AI（Gemini）が 選択肢から ひとつを えらんでくれる占い箱。\n" +
    "　AIの独断と偏見で けつだんを 下してくれるぞ。",
  contact:
    "やあ、ここまで来てくれてありがとう。\n" +
    "外の世界で また会えるように\n" +
    "しるべを 用意しておいたよ。\n\n" +
    "・ねこの かげ（GitHub）\n" +
    "・くろき X のしるし（X/Twitter）\n" +
    "・みどりの知恵の書（Qiita)\n" +
    "さあ、好きな場所で 声をかけてくれ。",
};

export default function MessageWindow({ selectedMenuItem, onTypingChange }: MessageWindowProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const { soundEnabled } = useSoundSettings();
  const typeSound = useSound("/sounds/message-type.mp3", {
    volume: 0.3,
    preload: true,
  });

  useEffect(() => {
    let message: string;

    if (selectedMenuItem === "about") {
      // aboutの場合はランダムに選択
      const aboutMessages = messages.about;
      const randomIndex = Math.floor(Math.random() * aboutMessages.length);
      message = aboutMessages[randomIndex];
    } else {
      message = messages[selectedMenuItem] as string;
    }

    // メッセージ長に基づいて動的にタイピングスピードを計算
    const typingSpeed = calculateTypingSpeed(message.length);

    setDisplayedText("");
    setShowCursor(false);
    setIsTypingComplete(false);
    onTypingChange?.(true);

    let currentIndex = 0;
    let lastSoundTime = 0;
    const soundInterval = 100;

    if (soundEnabled) {
      typeSound.play();
    }

    const typeInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));

        const currentTime = Date.now();
        if (
          soundEnabled &&
          currentTime - lastSoundTime > soundInterval &&
          message[currentIndex] !== "\n" &&
          message[currentIndex] !== " "
        ) {
          typeSound.stop();
          typeSound.play();
          lastSoundTime = currentTime;
        }

        currentIndex++;
      } else {
        if (soundEnabled) {
          typeSound.stop();
        }
        setShowCursor(true);
        setIsTypingComplete(true);
        onTypingChange?.(false);
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typeInterval);
      typeSound.stop();
      onTypingChange?.(false);
    };
  }, [selectedMenuItem, onTypingChange, soundEnabled]);

  const formatText = (text: string) => {
    if (selectedMenuItem === "contact") {
      return formatContactText(text, isTypingComplete, styles.link);
    }

    if (selectedMenuItem === "works") {
      return formatWorksText(text, isTypingComplete, styles.link);
    }

    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className={`${styles.container} ${styles.bottomCorners}`}>
      <div className={styles.textArea}>
        <p className={styles.text}>
          {formatText(displayedText)}
          {showCursor && <span className={styles.cursor}></span>}
        </p>
      </div>
      <div className={styles.arrow}>▼</div>
    </div>
  );
}
