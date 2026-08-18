import type { Locale, LocalizedText } from "@/features/i18n/LocaleProvider";

/** ロケール解決済みの作品。画面側へはこの形で渡す。 */
export type WorkItem = {
  id: string;
  title: string;
  price: string;
  description: string;
  link: string;
  iconPath: string;
};

/** 定義側。title / description だけロケール別に持つ。 */
type WorkSource = Omit<WorkItem, "title" | "description"> & {
  title: LocalizedText;
  description: LocalizedText;
};

const workSources: WorkSource[] = [
  {
    id: "portfolio",
    title: {
      ja: "ポートフォリオ",
      en: "Portfolio",
    },
    price: "50,000 G",
    description: {
      ja:
        "RPGみたいな世界観で作った、遊べるポートフォリオだよ。\n" +
        "UIも音も動きも、ひとつずつこだわって仕上げてるんだ。\n" +
        "よかったら実際に触って、雰囲気を感じてみてね。",
      en:
        "A playable portfolio built to feel like a little RPG world.\n" +
        "The UI, the sound, the motion — I fussed over every one of them.\n" +
        "Give it a touch and see how it feels.",
    },
    link: "https://portfolio-ogison.vercel.app/",
    iconPath: "/images/works/portfolio.svg",
  },
  {
    id: "awawari",
    title: {
      ja: "割り勘計算アプリ",
      en: "Bill Splitter",
    },
    price: "10,000 G",
    description: {
      ja:
        "ビールをモチーフにした、気軽に使える割り勘アプリだよ。\n" +
        "人数と金額を入れるだけで、だれがいくら払うかすぐ分かるんだ。\n" +
        "飲み会の会計をサッと決めたいときに使ってみてね。",
      en:
        "A beer-themed app for splitting the bill without any fuss.\n" +
        "Enter the headcount and the total, and it tells you who owes what.\n" +
        "Handy when you want to settle up quickly after a night out.",
    },
    link: "https://dutch-treat-smoky.vercel.app/",
    iconPath: "/images/works/awawari.svg",
  },
  {
    id: "suzuki",
    title: {
      ja: "鈴木たけろう ホームページ",
      en: "Takero Suzuki Website",
    },
    price: "60,000 G",
    description: {
      ja:
        "各務原市議会議員・鈴木たけろうさんの活動や政策をまとめたホームページだよ。\n" +
        "知りたい情報に迷わずたどり着けるよう、構成を分かりやすく整えてるんだ。\n" +
        "必要な情報をすぐ読めることを大事にして作ったよ。",
      en:
        "A site covering the work and policies of Takero Suzuki,\n" +
        "a Kakamigahara city council member.\n" +
        "The structure is arranged so visitors reach what they came for\n" +
        "without getting lost — that was the whole point.",
    },
    link: "https://suzukitakero-kakamigahara.jp/",
    iconPath: "/images/works/suzuki.svg",
  },
  {
    id: "pixelom",
    title: {
      ja: "Pixelom",
      en: "Pixelom",
    },
    price: "20,000 G",
    description: {
      ja:
        "アップロードした画像をドット絵風に変換できるツールだよ。\n" +
        "解像度や色数を調整して、好みのレトロな雰囲気に仕上げられるんだ。\n" +
        "写真をピクセルアートにして遊びたいときに使ってみてね。",
      en:
        "A tool that turns the images you upload into pixel art.\n" +
        "Tune the resolution and color count to dial in the retro look you want.\n" +
        "Try it when you feel like pixelating a photo.",
    },
    link: "https://pixelom.pages.dev/",
    iconPath: "/images/works/pixelom.svg",
  },
  {
    id: "fescale",
    title: {
      ja: "フェスカレ",
      en: "Fescale",
    },
    price: "40,000 G",
    description: {
      ja:
        "全国の音楽フェスを、日程・地域・チケット状況からさがせるサイトだよ。\n" +
        "カレンダーや地域べつの入り口から、気になるフェスにすぐたどりつけるんだ。\n" +
        "今年の遠征予定を立てたくなったら、のぞいてみてね。",
      en:
        "A site for finding music festivals across Japan by date, region, and ticket status.\n" +
        "A calendar view and regional shortcuts get you to the one you want fast.\n" +
        "Take a look when you feel like planning your festival year.",
    },
    link: "https://fescale.com/",
    iconPath: "/images/works/fescale.svg",
  },
];

/** 定義をロケールで解決して画面用の一覧にする。 */
export function resolveWorks(locale: Locale): WorkItem[] {
  return workSources.map((work) => ({
    ...work,
    title: work.title[locale],
    description: work.description[locale],
  }));
}
