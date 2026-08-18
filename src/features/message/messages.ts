import type { Locale } from "@/features/i18n/LocaleProvider";
import type { MenuItem } from "@/features/menu/MenuGrid";

/**
 * メッセージウィンドウに表示する本文。
 *
 * 注意点:
 * - contact の本文には "GitHub" / "X/Twitter" / "Qiita" の表記をそのまま含めること。
 *   contactUtils.formatContactText がこの部分文字列を探してリンク化する。
 * - welcome の箇条書きは Home.tsx のメニューラベルと表記を揃えること。
 * - about は配列。マウントごとにランダムで1つ選ばれる（ロケール間で要素数は揃える）。
 */
export type MessageContent = {
  [K in Exclude<MenuItem, "about">]: string;
} & {
  about: string[];
};

export const messages: Record<Locale, MessageContent> = {
  ja: {
    welcome:
      "おや？ 旅人よ、ようこそ 我が館へ！\n" +
      "ここでは ogison の ひみつを 少しばかり のぞくことができるんだ。\n\n" +
      "・ショップ（作品）\n" +
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
      "・Spring —— 大地に根ざし、強固な基盤を支える術\n" +
      "・LangChain —— 知恵の精霊を 鎖でつなぐ 連環の術\n" +
      "・LangGraph —— 思考の道すじを 図に描き 分岐を統べる術\n\n" +
      "【道具・ツール】\n" +
      "・Docker —— 船出を助ける 移動する港\n" +
      "・Notion —— 知識を収める 無限の書庫\n" +
      "・Slack —— 仲間と声を交わす 伝令の水晶\n" +
      "・Jira —— クエストを管理する 任務の巻物\n" +
      "・Claude —— 賢者のごとく 助言を授ける霊\n" +
      "・Claude Code —— 賢者の霊を 端末に宿す 使い魔\n" +
      "・OpenAI —— 星の彼方より 知恵を授ける 大いなる神託\n" +
      "・Codex —— 暗号のごとき コードを 紡ぎだす写本師\n" +
      "・V0 —— 形なき力を即座に形にする 魔導の炉\n" +
      "・Sentry —— 闇を見張り 不具合を暴く番兵\n" +
      "・Datadog —— 世界を見渡す 千里眼の獣\n" +
      "・Cursor —— 書を操る 魔法の羽ペン\n" +
      "・Backlog —— 任務を束ねる 冒険者ギルドの帳簿\n" +
      "・Redmine —— 記録を刻む 古き石板\n\n" +
      "さあ、どの力や道具を 見てみるかい？",
    works:
      "ようこそ、作品ショップへ。\n\n" +
      "ここには 旅の途中で うみだした宝が ならんでいる。\n" +
      "気になる品をえらぶと、プレビューと説明が あらわれるよ。\n" +
      "リンクをひらけば、実際の作品の世界へ すすむこともできる。\n\n" +
      "さあ、好きなものを選んでみてね。",
    contact:
      "やあ、ここまで来てくれてありがとう。\n" +
      "外の世界で また会えるように\n" +
      "しるべを 用意しておいたよ。\n\n" +
      "・ねこの かげ（GitHub）\n" +
      "・くろき X のしるし（X/Twitter）\n" +
      "・みどりの知恵の書（Qiita)\n" +
      "さあ、好きな場所で 声をかけてくれ。",
  },
  en: {
    welcome:
      "Oho! Welcome to my hall, traveler!\n" +
      "Here you may peek at a few of ogison's secrets.\n\n" +
      "* Treasures on Display (Works)\n" +
      "* The Sealed Tome (Skills)\n" +
      "* Signpost for Travelers (Contact)\n\n" +
      "Well then — which shall it be?",
    about: [
      // パターン1: 空想・夢見がち
      "Now and then I look up at the sky and wonder,\n" +
        "'What sort of town might lie above those clouds?'\n\n" +
        "I'd love to board a ship made of cloud and sail the heavens.\n" +
        "Daydreams like that always make my heart a little lighter.",

      // パターン2: 食べ物・小さな幸せ
      "One of my simple joys is a warm meal.\n\n" +
        "However rough the day has been,\n" +
        "that first spoonful of soup, that fresh-baked bread —\n" +
        "they make me think, 'Ah, I'm alive.'\n\n" +
        "Small joys are what give me strength for tomorrow.",

      // パターン3: 哲学・ちょっと不思議な考え
      "Here's something I've been mulling over lately...\n" +
        "'What if I'm only a character in someone else's dream?'\n\n" +
        "But you know, I think I'd be fine with that.\n" +
        "So long as I can meet someone like this\n" +
        "and trade a few words, it's a real journey to me.",

      // ビール
      "I'm rather fond of beer.\n" +
        "Though I hardly drink at home — it's when I head out\n" +
        "to a tavern that I'll happily stick to beer all evening.\n\n" +
        "Hunting down fine places I've never seen,\n" +
        "looking forward to the next new glass.\n\n" +
        "One day I'll make a proper craft beer pilgrimage...\n",
    ],
    skills:
      "Oho? So you've opened the Sealed Tome, traveler.\n" +
      "Within these pages are the arts I picked up on my travels,\n" +
      "and a record of the tools I've wielded.\n\n" +
      "[Arts & Techniques]\n" +
      "* HTML —— the power that shapes the skeleton of the world\n" +
      "* CSS —— the art of adornment, giving color to all\n" +
      "* JavaScript —— the art of life, breathing motion into things\n" +
      "* React —— the secret art of bending UI to your will\n" +
      "* Next.js —— the art of commanding light and shadow to paint the future\n" +
      "* Git / GitHub —— the art of harmony, binding comrades together\n" +
      "* AWS —— the power of teleportation, crossing to far lands in an instant\n" +
      "* Python —— the sage's art of wisdom and analysis\n" +
      "* Java —— the knight's strength, raising sturdy ramparts\n" +
      "* Spring —— the art of rooting deep and upholding a solid foundation\n" +
      "* LangChain —— the art of the chain, linking spirits of wisdom together\n" +
      "* LangGraph —— the art of charting the paths of thought and ruling its branches\n\n" +
      "[Tools & Implements]\n" +
      "* Docker —— a moving harbor that aids every voyage\n" +
      "* Notion —— an endless library that houses all knowledge\n" +
      "* Slack —— the herald's crystal for trading words with comrades\n" +
      "* Jira —— the scroll of duties that governs every quest\n" +
      "* Claude —— a spirit that grants counsel like a sage\n" +
      "* Claude Code —— a familiar that binds the sage's spirit to your terminal\n" +
      "* OpenAI —— the great oracle that grants wisdom from beyond the stars\n" +
      "* Codex —— the scribe that weaves code like a cipher\n" +
      "* V0 —— the arcane forge that gives form to the formless\n" +
      "* Sentry —— the sentinel that watches the dark and exposes defects\n" +
      "* Datadog —— the far-seeing beast that surveys the whole world\n" +
      "* Cursor —— the enchanted quill that commands the written word\n" +
      "* Backlog —— the adventurers' guild ledger that binds tasks together\n" +
      "* Redmine —— the ancient stone tablet that carves the record\n\n" +
      "Well then — which art or tool would you like to see?",
    works:
      "Welcome to the shop of works.\n\n" +
      "Here lie the treasures I brought forth along my travels.\n" +
      "Pick one that catches your eye, and a preview and description will appear.\n" +
      "Open the link, and you can step into the work itself.\n\n" +
      "Go on — choose whichever you like.",
    contact:
      "Ah, thank you for coming all this way.\n" +
      "So that we might meet again out in the wider world,\n" +
      "I've left a few signposts for you.\n\n" +
      "* The Cat's Shadow (GitHub)\n" +
      "* The Mark of the Black X (X/Twitter)\n" +
      "* The Green Book of Wisdom (Qiita)\n" +
      "Come now — call out to me wherever you like.",
  },
};
