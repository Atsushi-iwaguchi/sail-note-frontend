# SailNote Frontend

アプリURL: https://sailnote-app.com

ヨット部向け練習記録管理アプリ「Sail Note」のフロントエンドリポジトリです。

<img width="1600" height="900" alt="Sail Note for README" src="https://github.com/user-attachments/assets/62929b8d-b2be-431c-a24b-9c7fa9cba385" />


**【ゲストユーザーアカウント情報】**

- ゲストユーザー1

Email: sample1@example.com

Password: password123

- ゲストユーザー2

Email: sample2@example.com

Password: password123

- ゲストユーザー3

Email: sample3@example.com

Password: password123

## 概要

**ヨット部の練習記録・大会成績・月間目標を一元管理し、部員間で情報を共有できるWebアプリ**

**バックエンドリポジトリ**: [https://github.com/Atsushi-iwaguchi/sail-note-backend]

## 開発背景
私は大学時代ヨット部に所属しており、リーダーを2年間務めていました。その経験の中で練習内容や船のセッティング、反省点が各自バラバラに管理されており、過去の記録を振り返りにくいという課題があったため、本アプリを開発しました。
また、モチベーション向上のために月間目標という項目を設け、毎月達成率を入力することでグラフとして可視化できるようにしました。


## 主な機能
- ユーザー登録・ログイン（JWT認証）
- 練習記録のCRUD（風向・風速・潮汐・艇のセッティング等を記録）
- 天気APIとの連携（練習日の天気を自動取得、Open-Meteo APIを利用）
- 練習記録への絞り込み検索（風向・風速・日付）
- 大会記録・レース結果の管理
- 月間目標の設定・達成率の推移表示

### ログイン画面
メールアドレスとパスワードを入力することでダッシュボード画面に遷移します。

<img width="208" height="369" alt="Animation" src="https://github.com/user-attachments/assets/dc7f0a19-6cb3-4f88-8c47-6d1fe637dd78" />

### 練習記録の作成

練習記録の新規作成で作成することができます。
入力項目は日付、風向、風速、天気、気温、潮汐、練習内容、艇のチューニング、振り返りがあります。

<img width="208" height="369" alt="practiceRecord-create" src="https://github.com/user-attachments/assets/7633287c-6ea9-4e99-8cde-0c95b202dfb3" />


### 天気情報自動取得
練習記録を作成する際に天気、気温を入力する欄がありますが、練習日を入力するとOpen-Meteo APIから岡山県のその日の天気と気温を取得するようになっています。
取得した気温はデフォルト値として入力されるため、手動で入力する手間を減らしています。


<img width="208" height="369" alt="weather-api" src="https://github.com/user-attachments/assets/763e8a0d-d039-4f55-826b-74026554bf2f" />


### 練習記録の絞り込み機能
現在は日付、風向、風速で絞り込みが可能です。

<img width="208" height="369" alt="siborikomi" src="https://github.com/user-attachments/assets/76294a95-0e83-495c-8b2b-3fc580bfca3e" />


### 大会記録
大会を登録し、ユーザーは大会の結果を入力することができます。

<img width="208" height="369" alt="tournament" src="https://github.com/user-attachments/assets/faa2bdc3-4768-4090-80b2-7877d397d282" />

総合順位を入力後レースの詳細結果を入力することができます。

<img width="208" height="369" alt="raceResult" src="https://github.com/user-attachments/assets/6d29453d-b75b-4b39-8a12-3915992012df" />



### 月間目標
月ごとに目標を設定することができます。編集画面から達成率を変更することができます。

<img width="208" height="369" alt="monthlyGoal" src="https://github.com/user-attachments/assets/e33ce25e-9fed-486c-890d-0f44bfeac84c" />


## 使用技術

| カテゴリー | 技術 |
| --- | --- |
| フロントエンド | React 19.2.7 / TypeScript 6.0.2 / Vite 8.1.1 |
| UI | Tailwind CSS 4.3.3 / shadcn/ui 4.14.1 |
| バックエンド | Ruby on Rails 8.1.3.1 |
| データベース | PostgreSQL 16 |
| 認証 | jwt/ bcrypt |
| 環境構築 | Docker |
| インフラ | AWS(EC2 / RDS / S3 / Route 53) |
| CI/CD | GitHub Actions |

### 技術選定の理由


## 設計資料

- インフラ図
<img width="1316" height="1547" alt="sail-note drawio" src="https://github.com/user-attachments/assets/5de3da52-2e20-4113-b76e-c83ecd89b17e" />

- ER図
  <img width="1165" height="1371" alt="Untitled" src="https://github.com/user-attachments/assets/c0f6e14a-6bbd-4ac3-b99d-e79a92b324ad" />


- DB設計書（Notion
  https://app.notion.com/p/388f9a11acb3807fabf0f09442f7fd06?source=copy_link
- API設計（OpenAPI）
  https://gist.github.com/Atsushi-iwaguchi/743ad8a1ade213c17941e37964e3d500
- ワイヤーフレーム（Figma）
  <img width="4538" height="3144" alt="Sailor Note" src="https://github.com/user-attachments/assets/20b856eb-3885-4a4b-8f60-cf179c6f5780" />


## セットアップ手順

### 必要環境
- Node.js 20以上
- npm

### インストール
```bash
git clone https://github.com/Atsushi-iwaguchi/sail-note-frontend.git
cd sail-note-frontend
npm install
```

### 環境変数
`.env`ファイルを作成し、以下を設定してください。
```
VITE_API_URL=http://localhost:3000
```

### 開発サーバー起動
```bash
npm run dev
```
http://localhost:5173 でアクセスできます。

### ビルド
```bash
npm run build
```

## 今後の改善予定

- カットレース計算ロジックの実装
- パスワードリセット機能
- コメント機能実装
