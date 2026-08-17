# SailNote Frontend

ヨット部向け練習記録管理アプリ「Sail Note」のフロントエンドリポジトリである。

アプリURL: https://sailnote-app.com

**ゲストユーザーアカウント情報**

- ゲストユーザー1

Email: sample1@example.com

Password: password123

- ゲストユーザー2

Email: sample2@example.com

Password: password123

## 概要

ヨット部の練習記録・大会成績・月間目標を一元管理し、部員間で情報を共有できるWebアプリケーションである。

現役ヨット部員時代、練習内容や船のセッティング、反省点が各自バラバラに管理されており、過去の記録を振り返りにくいという理由から開発した。

**バックエンドリポジトリ**: [https://github.com/Atsushi-iwaguchi/sail-note-backend]

## デプロイURL

- フロントエンド: https://xxxxx.vercel.app
- バックエンドAPI: https://xxxxx.railway.app


## 主な技術
- ユーザー登録・ログイン（JWT認証）
- 練習記録のCRUD（風向・風速・潮汐・船のセッティング等を記録）
- 天気APIとの連携（練習日の天気を自動取得、Open-Meteo APIを利用）
- 練習記録への絞り込み検索（風向・風速・日付・ユーザー名）
- 大会記録・レース結果の管理
- 月間目標の設定・達成率の推移表示


## 使用技術

| カテゴリー | 技術 |
| --- | --- |
| フロントエンド | React 19.2.7 / TypeScript 6.0.2 / Vite 8.1.1 |
| UI | Tailwind CSS 4.3.3 / shadcn/ui 4.14.1 |
| バックエンド | Ruby on Rails 8.1.3.1 |
| データベース | PostgreSQL 1.6.3 |
| 認証 | jwt 3.2.0 / bcrypt 3.1.22 |
| 環境構築 | Docker |
| インフラ | AWS(EC2 / RDS / S3 / Route 53) |
| CI/CD | Github Actions |

### 技術選定の理由


## 設計資料

- [ER図]
  <img width="1728" height="1104" alt="DatbaseSettings" src="https://github.com/user-attachments/assets/51a92f8a-842f-4c5b-a47d-5f6148262d3a" />

- [DB設計書（Notion）]
  https://app.notion.com/p/388f9a11acb3807fabf0f09442f7fd06?source=copy_link
- [API設計（OpenAPI）]
  https://gist.github.com/Atsushi-iwaguchi/743ad8a1ade213c17941e37964e3d500
- [ワイヤーフレーム（Figma）]
  <img width="4538" height="3144" alt="Sailor Note" src="https://github.com/user-attachments/assets/20b856eb-3885-4a4b-8f60-cf179c6f5780" />


## セットアップ手順

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
