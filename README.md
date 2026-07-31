# SailLog Frontend

ヨット部向け練習記録管理アプリ「Sail Note」のフロントエンドリポジトリです。

## 概要

ヨット部の練習記録・大会成績・月間目標を一元管理し、部員間で情報を共有できるWebアプリケーションです。

現役ヨット部員時代、練習内容や船のセッティング、反省点が各自バラバラに管理されており、過去の記録を振り返りにくいという理由から開発しました。

**バックエンドリポジトリ**: [https://github.com/Atsushi-iwaguchi/sail-note-backend]

## デプロイURL

- フロントエンド: https://xxxxx.vercel.app
- バックエンドAPI: https://xxxxx.railway.app

## 📸 スクリーンショット

（主要画面のスクリーンショットを貼る）

## 🛠 使用技術

### フロントエンド
- React 19
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Router
- axios

### インフラ・その他
- Vercel（デプロイ）
- GitHub Actions（CI/CD）

## ✨ 主な機能

- ユーザー登録・ログイン（JWT認証）
- 練習記録のCRUD（風向・風速・潮汐・船のセッティング等を記録）
- 天気APIとの連携（練習日の天気を自動取得）
- 練習記録への絞り込み検索（風向・風速・日付・ユーザー名）
- コメント機能
- 大会記録・レース結果の管理
- 月間目標の設定・達成率の推移表示

## 🗄 設計資料

- [ER図]
- [DB設計書（Notion）]
- [API設計（OpenAPI）]
- [ワイヤーフレーム（Figma）]

## 🚀 セットアップ手順

### 必要環境
- Node.js 20以上
- npm

### インストール

\`\`\`bash
git clone https://github.com/xxxxx/sail_log_frontend.git
cd sail_log_frontend
npm install
\`\`\`

### 環境変数

\`.env\`ファイルを作成し、以下を設定してください。

\`\`\`
VITE_API_URL=http://localhost:3000
\`\`\`

### 開発サーバー起動

\`\`\`bash
npm run dev
\`\`\`

http://localhost:5173 でアクセスできます。

### ビルド

\`\`\`bash
npm run build
\`\`\`

## ディレクトリ構成

\`\`\`
src/
├ components/   共通コンポーネント
├ pages/        各ページコンポーネント
├ hooks/        カスタムフック
├ lib/          axios設定等
├ types/        型定義
└ App.tsx
\`\`\`

## 作成者

（名前 / X / GitHub等のリンク）

## 今後の改善予定

- カットレース計算ロジックの実装
- パスワードリセット機能
