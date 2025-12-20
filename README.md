# 🖥️ Codyzard.dev - Terminal Portfolio

[![CI](https://github.com/codyzard/codyzard.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/codyzard/codyzard.dev/actions/workflows/ci.yml)
[![Deploy Production](https://github.com/codyzard/codyzard.dev/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/codyzard/codyzard.dev/actions/workflows/deploy-production.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](#english) | [Tiếng Việt](#tiếng-việt) | [日本語](#日本語)

---

## English

A modern, interactive terminal-style portfolio website built with Next.js 16 and React 19. Experience a unique command-line interface that showcases professional information, projects, and skills.

### ✨ Features

- **Interactive Terminal Interface** - Unix-like command-line experience
- **Command System** - 14+ built-in commands with aliases
- **Tab Autocomplete** - Smart command suggestions
- **Command History** - Navigate through previous commands with ↑/↓
- **Theme Switching** - Multiple color schemes (matrix, dracula, monokai, etc.)
- **Typing Animation** - Configurable typing speed (1-500 chars/sec)
- **Snake Game** - Classic snake game built into the terminal
- **Mobile Responsive** - Optimized for all screen sizes
- **Pre-commit Hooks** - Automated linting, type-checking, and formatting

### 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript 5
- **Styling:** Tailwind CSS 4
- **Testing:** Vitest, React Testing Library, 86+ tests
- **Code Quality:** Oxlint (Rust-based linter), Prettier with oxc parser, TypeScript
- **Git Hooks:** Husky, lint-staged
- **CI/CD:** GitHub Actions, Vercel
- **Deployment:** Vercel (Preview & Production)

### 🚀 Getting Started

#### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

#### Installation

```bash
# Clone the repository
git clone https://github.com/codyzard/codyzard.dev.git
cd codyzard.dev

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Build

```bash
# Type check
pnpm typecheck

# Build for production
pnpm build

# Start production server
pnpm start
```

#### Docker

```bash
# Build Docker image
docker build -t codyzard.dev .

# Run container
docker run -p 3000:3000 codyzard.dev

# Or use docker-compose
docker-compose up -d

# Stop container
docker-compose down
```

#### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage

# Run tests in browser mode (experimental)
pnpm test:browser
```

### 🚀 CI/CD & Deployment

This project uses **GitHub Actions** for continuous integration and **Vercel** for deployment.

#### Automated Workflows

- **CI Pipeline** - Runs on every push and PR
  - Code linting and formatting checks
  - TypeScript type checking
  - Unit tests execution
  - Build verification

- **Preview Deployments** - Automatic for every PR
  - Deploys to Vercel preview environment
  - Comment on PR with preview URL
  - Test changes before merging

- **Production Deployments** - Automatic on merge to `main`
  - Deploys to production environment
  - Zero-downtime deployment
  - Automatic rollback on failure

#### Setup CI/CD

See [.github/SETUP_CICD.md](.github/SETUP_CICD.md) for detailed setup instructions.

**Quick Start:**

1. Create Vercel account and link project
2. Add GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
3. Push to GitHub - workflows run automatically!

#### Local CI/CD Testing

Test GitHub Actions workflows locally before pushing using [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS

# Test CI workflow locally
act -W .github/workflows/ci.yml

# Test specific job
act -j quality
act -j test

# Run with secrets
echo "VERCEL_TOKEN=xxx" > .secrets
act --secret-file .secrets
```

See [.github/LOCAL_CICD.md](.github/LOCAL_CICD.md) for detailed local CI/CD guide.

### 📝 Available Commands

| Command    | Aliases       | Description                      |
| ---------- | ------------- | -------------------------------- |
| `help`     | -             | Show all available commands      |
| `welcome`  | -             | Display welcome message          |
| `summary`  | -             | Show professional summary        |
| `skills`   | -             | List technical skills            |
| `contact`  | -             | Display contact information      |
| `neofetch` | `nf`, `fetch` | System information display       |
| `resume`   | `cv`          | Download resume                  |
| `github`   | `gh`          | Open GitHub profile              |
| `linkedin` | `li`          | Open LinkedIn profile            |
| `blog`     | -             | Open development blog            |
| `theme`    | -             | Change terminal theme            |
| `typing`   | -             | Configure typing animation speed |
| `snake`    | -             | Play Snake game                  |
| `clear`    | `cls`         | Clear terminal screen            |

### 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── commands/               # Terminal commands
│   ├── snake/             # Snake game (refactored)
│   │   ├── components/    # UI components
│   │   ├── game-logic.ts  # Game logic
│   │   ├── types.ts       # Types & constants
│   │   └── snake-game.tsx # Main game component
│   ├── *.tsx              # Individual commands
│   └── index.ts           # Command registry
├── components/            # Shared components
│   ├── command-input/    # Command input component
│   └── terminal/         # Terminal component
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── utils/                # Utility functions
└── config/               # Configuration files
```

### 🔧 Development

#### Code Quality

The project uses modern, fast tooling with pre-commit hooks to ensure code quality:

- **Oxlint** - Rust-based linter, 30x faster than ESLint
- **Prettier with oxc parser** - Fast code formatting with Tailwind CSS class sorting
- **TypeScript** - Type checking

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm typecheck
```

**Performance:** Oxlint completes in ~23ms for 63 files (vs. ESLint's ~2-3s)

#### Refactoring History

**Phase 1: URL Commands Factory Pattern** ✅

- Reduced code duplication using factory pattern
- 3 files reduced from 11 lines to 4 lines each

**Phase 2: Snake Game Organization** ✅

- Refactored 290-line monolith into 10 organized files
- Improved maintainability and testability
- Follows kebab-case naming convention

### 📄 License

MIT License - feel free to use this project for your own portfolio!

---

## Tiếng Việt

Website portfolio kiểu terminal tương tác hiện đại được xây dựng với Next.js 16 và React 19. Trải nghiệm giao diện dòng lệnh độc đáo để giới thiệu thông tin chuyên môn, dự án và kỹ năng.

### ✨ Tính năng

- **Giao diện Terminal Tương tác** - Trải nghiệm dòng lệnh giống Unix
- **Hệ thống Lệnh** - Hơn 14 lệnh tích hợp với các alias
- **Tự động hoàn thành Tab** - Gợi ý lệnh thông minh
- **Lịch sử Lệnh** - Điều hướng qua các lệnh trước với ↑/↓
- **Đổi Theme** - Nhiều bảng màu (matrix, dracula, monokai, v.v.)
- **Hiệu ứng Gõ chữ** - Tốc độ gõ có thể điều chỉnh (1-500 ký tự/giây)
- **Game Rắn săn mồi** - Game rắn cổ điển tích hợp trong terminal
- **Responsive Mobile** - Tối ưu cho mọi kích thước màn hình
- **Pre-commit Hooks** - Tự động lint, type-check và format

### 🛠️ Công nghệ

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript 5
- **Styling:** Tailwind CSS 4
- **Testing:** Vitest, React Testing Library, 86+ tests
- **Code Quality:** Oxlint (linter viết bằng Rust), Prettier với oxc parser, TypeScript
- **Git Hooks:** Husky, lint-staged
- **CI/CD:** GitHub Actions, Vercel
- **Deployment:** Vercel (Preview & Production)

### 🚀 Bắt đầu

#### Yêu cầu

- Node.js 18+ hoặc Bun
- pnpm (khuyên dùng) hoặc npm

#### Cài đặt

```bash
# Clone repository
git clone https://github.com/codyzard/codyzard.dev.git
cd codyzard.dev

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

#### Build

```bash
# Type check
pnpm typecheck

# Build cho production
pnpm build

# Chạy production server
pnpm start
```

#### Docker

```bash
# Build Docker image
docker build -t codyzard.dev .

# Chạy container
docker run -p 3000:3000 codyzard.dev

# Hoặc dùng docker-compose
docker-compose up -d

# Dừng container
docker-compose down
```

#### Testing

```bash
# Chạy tests ở chế độ watch
pnpm test

# Chạy tests một lần
pnpm test:run

# Chạy tests với UI
pnpm test:ui

# Chạy tests với coverage
pnpm test:coverage

# Chạy tests ở browser mode (thử nghiệm)
pnpm test:browser
```

### 🚀 CI/CD & Deployment

Dự án sử dụng **GitHub Actions** cho continuous integration và **Vercel** cho deployment.

#### Quy trình tự động

- **CI Pipeline** - Chạy mỗi khi push và PR
  - Kiểm tra linting và formatting
  - Type checking với TypeScript
  - Chạy unit tests
  - Kiểm tra build

- **Preview Deployments** - Tự động cho mỗi PR
  - Deploy lên Vercel preview environment
  - Comment link preview trên PR
  - Test thay đổi trước khi merge

- **Production Deployments** - Tự động khi merge vào `main`
  - Deploy lên production environment
  - Zero-downtime deployment
  - Tự động rollback khi lỗi

#### Cài đặt CI/CD

Xem [.github/SETUP_CICD.md](.github/SETUP_CICD.md) để biết hướng dẫn chi tiết.

**Bắt đầu nhanh:**

1. Tạo tài khoản Vercel và link project
2. Thêm GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
3. Push lên GitHub - workflows tự động chạy!

#### Test CI/CD Local

Test GitHub Actions workflows local trước khi push bằng [act](https://github.com/nektos/act):

```bash
# Cài đặt act
brew install act  # macOS

# Test CI workflow local
act -W .github/workflows/ci.yml

# Test job cụ thể
act -j quality
act -j test

# Chạy với secrets
echo "VERCEL_TOKEN=xxx" > .secrets
act --secret-file .secrets
```

Xem [.github/LOCAL_CICD.md](.github/LOCAL_CICD.md) để biết hướng dẫn chi tiết về CI/CD local.

### 📝 Các lệnh có sẵn

| Lệnh       | Alias         | Mô tả                         |
| ---------- | ------------- | ----------------------------- |
| `help`     | -             | Hiển thị tất cả lệnh          |
| `welcome`  | -             | Hiển thị thông điệp chào mừng |
| `summary`  | -             | Hiển thị tóm tắt chuyên môn   |
| `skills`   | -             | Liệt kê kỹ năng kỹ thuật      |
| `contact`  | -             | Hiển thị thông tin liên hệ    |
| `neofetch` | `nf`, `fetch` | Hiển thị thông tin hệ thống   |
| `resume`   | `cv`          | Tải xuống CV                  |
| `github`   | `gh`          | Mở trang GitHub               |
| `linkedin` | `li`          | Mở trang LinkedIn             |
| `blog`     | -             | Mở blog phát triển            |
| `theme`    | -             | Đổi theme terminal            |
| `typing`   | -             | Cấu hình tốc độ gõ chữ        |
| `snake`    | -             | Chơi game Rắn săn mồi         |
| `clear`    | `cls`         | Xóa màn hình terminal         |

### 📁 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router
├── commands/               # Các lệnh terminal
│   ├── snake/             # Game rắn (đã refactor)
│   │   ├── components/    # Các UI components
│   │   ├── game-logic.ts  # Logic game
│   │   ├── types.ts       # Types & constants
│   │   └── snake-game.tsx # Component game chính
│   ├── *.tsx              # Các lệnh riêng lẻ
│   └── index.ts           # Command registry
├── components/            # Shared components
│   ├── command-input/    # Command input component
│   └── terminal/         # Terminal component
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── utils/                # Utility functions
└── config/               # Configuration files
```

### 🔧 Phát triển

#### Chất lượng code

Dự án sử dụng công cụ hiện đại, nhanh với pre-commit hooks để đảm bảo chất lượng code:

- **Oxlint** - Linter viết bằng Rust, nhanh hơn ESLint 30 lần
- **Prettier với oxc parser** - Format code nhanh với sắp xếp class Tailwind CSS
- **TypeScript** - Type checking

```bash
# Chạy linting
pnpm lint

# Fix lỗi linting
pnpm lint:fix

# Format code
pnpm format

# Kiểm tra formatting
pnpm format:check

# Type check
pnpm typecheck
```

**Hiệu suất:** Oxlint hoàn thành trong ~23ms cho 63 files (so với ESLint ~2-3s)

#### Lịch sử Refactoring

**Phase 1: URL Commands Factory Pattern** ✅

- Giảm code trùng lặp bằng factory pattern
- 3 files giảm từ 11 lines xuống 4 lines mỗi file

**Phase 2: Tổ chức lại Snake Game** ✅

- Refactor từ 1 file 290 dòng thành 10 files có tổ chức
- Cải thiện khả năng maintain và test
- Tuân theo quy ước kebab-case

### 📄 License

MIT License - thoải mái sử dụng dự án này cho portfolio của bạn!

---

## 日本語

Next.js 16とReact 19で構築された、モダンでインタラクティブなターミナルスタイルのポートフォリオウェブサイト。プロフェッショナルな情報、プロジェクト、スキルを紹介するユニークなコマンドラインインターフェースを体験できます。

### ✨ 機能

- **インタラクティブなターミナルインターフェース** - Unix風のコマンドライン体験
- **コマンドシステム** - 14以上の組み込みコマンドとエイリアス
- **Tabオートコンプリート** - スマートなコマンド提案
- **コマンド履歴** - ↑/↓で前のコマンドをナビゲート
- **テーマ切り替え** - 複数のカラースキーム（matrix、dracula、monokaiなど）
- **タイピングアニメーション** - 設定可能なタイピング速度（1-500文字/秒）
- **スネークゲーム** - ターミナルに組み込まれたクラシックなスネークゲーム
- **モバイルレスポンシブ** - すべての画面サイズに最適化
- **プリコミットフック** - 自動リント、型チェック、フォーマット

### 🛠️ 技術スタック

- **フレームワーク:** Next.js 16 (App Router、Turbopack)
- **UI:** React 19、TypeScript 5
- **スタイリング:** Tailwind CSS 4
- **テスト:** Vitest、React Testing Library、86+ tests
- **コード品質:** Oxlint（Rust製リンター）、Prettier with oxc parser、TypeScript
- **Git Hooks:** Husky、lint-staged
- **CI/CD:** GitHub Actions、Vercel
- **デプロイ:** Vercel（Preview & Production）

### 🚀 はじめに

#### 前提条件

- Node.js 18+またはBun
- pnpm（推奨）またはnpm

#### インストール

```bash
# リポジトリをクローン
git clone https://github.com/codyzard/codyzard.dev.git
cd codyzard.dev

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

#### ビルド

```bash
# 型チェック
pnpm typecheck

# プロダクションビルド
pnpm build

# プロダクションサーバーを起動
pnpm start
```

#### Docker

```bash
# Dockerイメージをビルド
docker build -t codyzard.dev .

# コンテナを実行
docker run -p 3000:3000 codyzard.dev

# または docker-compose を使用
docker-compose up -d

# コンテナを停止
docker-compose down
```

#### Testing

```bash
# watchモードでテストを実行
pnpm test

# テストを一度実行
pnpm test:run

# UIでテストを実行
pnpm test:ui

# カバレッジ付きでテストを実行
pnpm test:coverage

# ブラウザモードでテストを実行（実験的）
pnpm test:browser
```

### 🚀 CI/CD & デプロイ

このプロジェクトは**GitHub Actions**でCIを、**Vercel**でデプロイを行います。

#### 自動化ワークフロー

- **CIパイプライン** - プッシュとPRごとに実行
  - リントとフォーマットチェック
  - TypeScriptの型チェック
  - ユニットテストの実行
  - ビルド検証

- **プレビューデプロイ** - PRごとに自動実行
  - Vercelプレビュー環境へデプロイ
  - PRにプレビューURLをコメント
  - マージ前に変更をテスト

- **プロダクションデプロイ** - `main`へのマージ時に自動実行
  - プロダクション環境へデプロイ
  - ゼロダウンタイムデプロイ
  - 失敗時の自動ロールバック

#### CI/CDセットアップ

詳細な手順は[.github/SETUP_CICD.md](.github/SETUP_CICD.md)をご覧ください。

**クイックスタート:**

1. Vercelアカウントを作成しプロジェクトをリンク
2. GitHubシークレットを追加: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
3. GitHubにプッシュ - ワークフローが自動実行されます！

#### ローカルCI/CDテスト

[act](https://github.com/nektos/act)を使用してプッシュ前にGitHub Actionsワークフローをローカルでテストできます:

```bash
# actをインストール
brew install act  # macOS

# CIワークフローをローカルでテスト
act -W .github/workflows/ci.yml

# 特定のジョブをテスト
act -j quality
act -j test

# シークレット付きで実行
echo "VERCEL_TOKEN=xxx" > .secrets
act --secret-file .secrets
```

詳細なローカルCI/CDガイドは[.github/LOCAL_CICD.md](.github/LOCAL_CICD.md)をご覧ください。

### 📝 利用可能なコマンド

| コマンド   | エイリアス    | 説明                               |
| ---------- | ------------- | ---------------------------------- |
| `help`     | -             | すべてのコマンドを表示             |
| `welcome`  | -             | ウェルカムメッセージを表示         |
| `summary`  | -             | プロフェッショナルサマリーを表示   |
| `skills`   | -             | 技術スキルをリスト                 |
| `contact`  | -             | 連絡先情報を表示                   |
| `neofetch` | `nf`, `fetch` | システム情報を表示                 |
| `resume`   | `cv`          | 履歴書をダウンロード               |
| `github`   | `gh`          | GitHubプロフィールを開く           |
| `linkedin` | `li`          | LinkedInプロフィールを開く         |
| `blog`     | -             | 開発ブログを開く                   |
| `theme`    | -             | ターミナルテーマを変更             |
| `typing`   | -             | タイピングアニメーション速度を設定 |
| `snake`    | -             | スネークゲームをプレイ             |
| `clear`    | `cls`         | ターミナル画面をクリア             |

### 📁 プロジェクト構成

```
src/
├── app/                    # Next.js App Router
├── commands/               # ターミナルコマンド
│   ├── snake/             # スネークゲーム（リファクタリング済み）
│   │   ├── components/    # UIコンポーネント
│   │   ├── game-logic.ts  # ゲームロジック
│   │   ├── types.ts       # 型と定数
│   │   └── snake-game.tsx # メインゲームコンポーネント
│   ├── *.tsx              # 個別コマンド
│   └── index.ts           # コマンドレジストリ
├── components/            # 共有コンポーネント
│   ├── command-input/    # コマンド入力コンポーネント
│   └── terminal/         # ターミナルコンポーネント
├── contexts/             # Reactコンテキスト
├── hooks/                # カスタムReactフック
├── types/                # TypeScript型
├── utils/                # ユーティリティ関数
└── config/               # 設定ファイル
```

### 🔧 開発

#### コード品質

プロジェクトはモダンで高速なツールとプリコミットフックでコード品質を確保：

- **Oxlint** - Rust製リンター、ESLintより30倍高速
- **Prettier with oxc parser** - Tailwind CSSクラスソート機能付き高速コードフォーマット
- **TypeScript** - 型チェック

```bash
# リントを実行
pnpm lint

# リント問題を修正
pnpm lint:fix

# コードをフォーマット
pnpm format

# フォーマットをチェック
pnpm format:check

# 型チェック
pnpm typecheck
```

**パフォーマンス:** Oxlintは63ファイルで約23msで完了（ESLintは約2-3秒）

#### リファクタリング履歴

**フェーズ1：URLコマンドファクトリーパターン** ✅

- ファクトリーパターンでコード重複を削減
- 3ファイルを11行から4行に削減

**フェーズ2：スネークゲームの整理** ✅

- 290行のモノリスを10個の整理されたファイルにリファクタリング
- 保守性とテスト性を向上
- kebab-case命名規則に従う

### 📄 ライセンス

MIT License - このプロジェクトを自分のポートフォリオに自由に使用してください！

---

**Built with ❤️ by Le Hoang Tu**

Portfolio: [terminal.codyzard.dev](https://terminal.codyzard.dev)
GitHub: [@codyzard](https://github.com/codyzard)
Location: Tokyo, Japan 🗼
