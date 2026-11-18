# GitHub MCP 検証作業履歴

## 2026-11-18 — Phase 1: 読み取り専用検証

- **対象**: `iwasaki-hub/mcp-project`
- **操作**: `get_repo`, `fetch_file`, `search_branches`, `search_issues`, `search_prs`
- **結果**: リポジトリ情報取得成功（公開リポジトリ、既定ブランチ `main`）。`GitHub/README.md` 取得成功。`main` ブランチ検索成功。Issue・PR検索はともに0件。
- **権限**: 接続アカウントの `admin`, `maintain`, `pull`, `push`, `triage` はすべて `true` と返却された。
- **注意**: Issue・PRが0件なのは検索時点の結果。個別の作成・更新・削除操作は未検証。
- **変更**: 検証記録ファイルの作成・更新のみ。アプリコードや既存Issue/PRは変更していない。

## 2026-11-18 — 新規リポジトリ作成機能の調査

- **目的**: GitHub MCPで新規リポジトリを作成できるか確認。
- **調査結果**: 現在接続されているGitHub MCPの公開ツール一覧にリポジトリ新規作成操作は存在しない。利用可能な他の接続ツール一覧でも該当する直接作成操作を確認できなかった。
- **結論**: **現在の接続ツールでは新規リポジトリを作成できない**（GitHub自体に作成機能がないという意味ではない）。
- **追加確認**: `iwasaki-hub/mcp-github-sandbox` の取得は404。非存在またはアクセス不可であり、作成成功を意味しない。
- **代替手順**: GitHub Web UIで手動作成し、その後MCPで確認・操作する。
- **変更**: リポジトリ新規作成操作は実行していない。

## 2026-11-18 — GitHub Pages用静的サイトの準備検証

- **対象**: `iwasaki-hub/mcp-project`、`main` ブランチの `/docs`。
- **実施操作**: GitHub MCP `create_file` で `docs/index.html`、`docs/style.css`、`docs/.nojekyll` を作成。
- **事後検証**: `fetch_file` で3ファイルすべてを再取得し、存在を確認（HTML 1938文字、CSS 2069文字、`.nojekyll` 0文字）。
- **サイト内容**: MCPプロジェクト紹介、MongoDB Atlas・Supabase・GitHubの検証記録へのリンク、モバイル対応CSS。
- **判定**: **ファイル作成・再取得は成功**。GitHub Pagesの設定（`main` の `/docs` を公開元にする操作）、ビルド・公開URLでのHTTP応答、実ブラウザ表示は**未検証**。公開成功とは扱わない。
- **次の作業**: リポジトリの Settings → Pages で公開元を `main` / `/docs` に設定後、`https://iwasaki-hub.github.io/mcp-project/` の到達性と表示を確認する。

## 2026-11-18 — GitHub Pages ナビゲーション追加

- `docs/index.html` にホーム・検証対象・検証方針・GitHubへのナビゲーションを追加。
- `docs/style.css` にデスクトップ用リンク、モバイル用折りたたみメニュー、フォーカス表示、スクロール位置調整、動きの軽減設定を追加。
- `main` にコミットし、MCP `fetch_file` でファイルを再取得。ナビゲーション要素・モバイルメニュー・セクションID・レスポンシブCSSの存在を確認。
- **未検証**: 実ブラウザでの操作、GitHub Pagesの公開URLへの反映・表示。

## 2026-11-18 — MongoDB Atlas専用ページとメニュー導線

- `docs/mongodb-atlas.html` を新規作成。MongoDB AtlasのMCP検証概要、成功項目、未検証項目、セキュリティ注意、GitHub記録リンクを掲載。
- `docs/index.html` のPC・モバイルナビゲーションに「MongoDB Atlas」を追加し、ホームのMongoDB Atlasカードから専用ページへ遷移するリンクを設置。
- `docs/style.css` に専用ページのレスポンシブスタイルを追加。
- **事後検証**: GitHub MCPで3ファイルを再取得し、リンク・ページ・スタイルの存在を確認。
- **未検証**: GitHub Pagesでの実デプロイ、公開URLでのHTTP応答、ブラウザでの遷移操作。

## 2026-11-18 — Supabase・GitHub専用ページ追加

- `docs/supabase.html` と `docs/github.html` を作成し、検証概要・結果・制約・GitHub記録へのリンクを掲載。
- `docs/index.html` のPC・モバイルナビゲーションと各カードに専用ページへのリンクを追加。
- `docs/mongodb-atlas.html` のPC・モバイルナビゲーションにもSupabase・GitHubへのリンクを追加。
- GitHub MCP `fetch_file` で4ページを再取得し、相互リンクとモバイルナビゲーションのHTMLを確認。
- **未検証**: GitHub Pagesへの反映、公開URLの応答、実ブラウザの表示・遷移操作。
