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

const messages = {
  welcome:
    "おや？ 旅人よ、ようこそ 我が館へ！\n" +
    "ここでは ogison の ひみつを 少しばかり のぞくことができるんだ。\n\n" +
    "・展示された宝（作品）\n" +
    "・封印の書物（スキル） \n" +
    "・旅人へのしるべ（コンタクト）\n\n" +
    "さあ、どれを 見てみるかい？",
  about: [
    // パターン1: 技術・経歴
    "ふふ、館主の ogison について知りたいのか。\n" +
      "ならば すこしばかり 語ってやろう。\n\n" +
      "昔々、とある企業で システムエンジニアとして\n" +
      "旅をしていた ひとりの冒険者がおったそうな。\n\n" +
      "その者は 日々の業務で培った経験を活かし、\n" +
      "より良いシステムを作りたいと 願うようになった。\n\n" +
      "フロントエンドからバックエンド、\n" +
      "設計から実装まで 幅広く手がけながら\n" +
      "「使う人の笑顔」を 第一に考えている。\n\n" +
      "今日もどこかで 新しい技術を学び、\n" +
      "仲間と共に より良いものづくりに 励んでいるという...\n\n" +
      "これが この館の主、ogison の物語だ。",

    // パターン2: プライベート・趣味
    "おや、館主の日常に 興味があるのかな？\n" +
      "それなら とっておきの話を してやろう。\n\n" +
      "この者、コードを書くとき以外は\n" +
      "音楽を愛し、ときには楽器を奏でる。\n\n" +
      "好奇心旺盛で、新しいことを学ぶのが大好きだ。\n" +
      "たとえそれが全く異なる分野であっても、\n" +
      "「なぜ？」「どうして？」と 問い続ける癖がある。\n\n" +
      "休日には散歩をしながら\n" +
      "街の風景や人々の営みを眺めて\n" +
      "新しいアイデアを 温めているらしい。\n\n" +
      "穏やかだが、内に熱い情熱を秘めた\n" +
      "そんな人物が この館の主なのさ。",

    // パターン3: 働き方・価値観・チーム
    "館主の働き方について 聞きたいのか？\n" +
      "なるほど、それは良い質問だ。\n\n" +
      "この者が最も大切にしているのは\n" +
      "「チームワーク」と「相手の立場に立つこと」。\n\n" +
      "一人でできることには限りがある。\n" +
      "だからこそ、仲間と力を合わせ、\n" +
      "お互いの強みを活かし合うことを 信じている。\n\n" +
      "また、技術は手段であり、\n" +
      "本当に重要なのは「誰のために、何のために」\n" +
      "それを使うかだと 考えているようだ。\n\n" +
      "未来に向かって、もっと多くの人が\n" +
      "笑顔になるシステムを 作り続けたい。\n" +
      "それが この館主の願いなのだ。",

    // ビール
    "僕は ビールが好きなんだ。、\n" +
      "ただ。家ではほとんど飲まなくて、酒場に出かけたときには\n" +
      "ずっとビールばかりを たしなんでいるよ。\n\n" +
      "まだ見ぬ美味い店を探し、\n" +
      "新たな一杯に出会うことを楽しみにしておる。\n\n" +
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
    }, 25);

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
