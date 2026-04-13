# Discord Bot Generator

**[English](README.md) · [한국어](README.ko.md)**

登録不要。ブラウザ上で [discord.js v14](https://discord.js.org/) ボットプロジェクトをZIPで生成するウィザードです。

**ライブ:** https://gminji.github.io/Discord-Bot-Generator/

---

## 機能

使いたいモジュールを選択して設定するだけで、すぐに動くボットプロジェクトをダウンロードできます:

| モジュール | コマンド / 機能 |
|---|---|
| **モデレーション** | キック、BAN、ミュート/タイムアウト、警告、BAN解除、一括削除 |
| **ユーティリティ** | Ping、サーバー情報、ユーザー情報、アバター、ヘルプ、ロール一覧 |
| **娯楽** | マジック8ボール、サイコロ、ジョーク、コイン投げ |
| **経済** | 残高、デイリー報酬、作業、送金、ランキング（JSONベース、DB不要） |
| **AutoMod** | 禁止ワードフィルター、スパム検出、リンクブロック |
| **ウェルカム** | 新メンバーの歓迎とお別れメッセージ |
| **リアクションロール** | メッセージへのリアクションでロールを自動付与 |
| **自動返信** | 特定のキーワードやフレーズに自動で返信 |
| **投票** | 絵文字投票の作成（最大5選択肢） |

**コマンドスタイル:** スラッシュコマンド (`/`) またはプレフィックスコマンド（例: `!`）

**対応言語:** English · 日本語 · 한국어

---

## 使い方

1. ライブサイトにアクセス
2. **ステップ1 — 機能選択:** 使いたいモジュールとコマンドを選択
3. **ステップ2 — 設定:** プレフィックス、チャンネルID、経済システムの値などを設定
4. **ステップ3 — ダウンロード:** 内容を確認してZIPをダウンロード

### ダウンロード後

```bash
# 1. ZIPを展開する
# 2. 環境変数ファイルをコピーする
cp .env.example .env
# .envファイルにボットトークンを入力する

# 3. 依存関係をインストールする
npm install

# 4. （スラッシュコマンドのみ）コマンドを登録する（初回のみ）
node deploy-commands.js

# 5. ボットを起動する
npm start
```

---

## 技術スタック

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) — 状態管理
- [JSZip](https://stuk.github.io/jszip/) + [file-saver](https://github.com/eligrey/FileSaver.js/) — ZIP生成

---

## ローカル開発

```bash
npm install
npm run dev
```

```bash
npm run build    # プロダクションビルド
npm run preview  # プロダクションビルドのプレビュー
npm run lint     # ESLint
```

---

## ライセンス

MIT
