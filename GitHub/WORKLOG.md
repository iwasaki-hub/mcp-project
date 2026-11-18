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
