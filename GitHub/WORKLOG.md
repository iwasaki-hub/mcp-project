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

## 2026-11-18 — GitHub Actions 自動検証ワークフロー導入（PR #1）

- ブランチ `feature/pages-html-validation` を `main` から作成。
- `.github/workflows/validate-pages.yml` を追加。PR・mainへのpush（`docs/**` 等に変更がある場合）と手動実行に対応。
- `docs/*.html` のHTML解析、ローカルリンク、ページ内アンカー、CSS参照の存在、`docs/` 外へのパス逸脱を検査する。外部サイトへのアクセス・デプロイは行わない。
- Actions権限は `contents: read` に限定。タイムアウト5分。
- GitHub MCP `fetch_file` でワークフローファイルを再取得し存在を確認。
- PR: https://github.com/iwasaki-hub/mcp-project/pull/1 （未マージ）。
- **実行結果**: コミットに紐づくPRワークフロー一覧の取得では0件。成功・失敗の判定は**未確認**。Actions画面で実行状態を確認する必要がある。

## 2026-11-18 — Actions検証PR #1のマージ

- PR #1 を `main` にSquashマージ。GitHub APIが `merged: true` を返却。
- マージコミット: `71adafecc00ea38ede38b2ff2892c380143454a6`。
- 事後検証: PR状態がmerged、`main` の `.github/workflows/validate-pages.yml` が取得できることを確認。
- **未検証**: GitHub Actionsジョブの実際の成功・失敗。マージ成功はワークフロー実行成功を意味しない。

## 2026-11-18 — Actions実行結果・ジョブログ取得（MCP検証）

- **対象**: `iwasaki-hub/mcp-project` / `Validate GitHub Pages HTML`。
- **使用ツール**: `fetch_commit_workflow_runs`, `fetch_workflow_run_jobs`, `fetch_workflow_job_steps`, `fetch_workflow_job_logs`。
- **取得結果**: PR headコミット `66ed0cc7b819bca7ea423ee361a6fb9ee572301a` に紐づく Run ID `44208727316`（completed / success）を取得。Job ID `134481315556`（Validate static pages、completed / success）を取得。
- **ステップ検証**: 5ステップを取得し、すべて completed / success。
- **ログ検証**: ジョブログ本文15,158文字を取得し、`Validated 4 HTML pages and their local links.` を確認。
- **警告**: `actions/checkout@v4` のNode.js 20非推奨警告を確認。ジョブは成功。依存アクション更新は別タスクで検討。
- **制約**: `fetch_commit_workflow_runs` はPRトリガーの実行に限定され、最初のページのみ返す。マージコミット `71adafecc00ea38ede38b2ff2892c380143454a6` への検索は0件だったが、push実行が存在しないという意味ではない。
- **判定**: 実行結果・ジョブ・ステップ・ログ取得は**成功**。ログの公開先への転載は行わない。

## 2026-11-18 — GitHub Actionsの意図的な失敗と復旧検証（PR #3）

- **対象**: `iwasaki-hub/mcp-project`、検証用ブランチ `test/actions-failure-recovery`、PR #3。
- **失敗の注入**: `docs/index.html` に一時的な存在しない相対リンク `./__ci_failure_probe_missing__.html` を追加。公開用 `main` は変更していない。
- **失敗の確認**: Run `44211810038` / Job `134491777925` が completed / failure。ジョブログに `missing local target` と `exit code 1` を確認。
- **復旧操作**: 意図的に壊したリンクを削除。HTMLの無害なコメントのみ残し、再検証を試行。
- **復旧後のActions実行結果**: Run `44211952061` / Job `134492260228` が completed / success。ログに `Validated 4 HTML pages and their local links.` を確認。
- **安全方針**: CIが成功するまでPRをマージしない。失敗用リンクはPRの最終差分に残さない。

## 2026-11-18 — Actions Artifact保存・MCP取得の実証（PR #4）

- PR #4に検証専用ワークフロー `.github/workflows/test-actions-artifact.yml` を追加。PRイベントと手動実行に対応、`contents: read`、5分タイムアウト。
- Actions Run `44212299127` は completed / success。
- `actions/upload-artifact@v4` で `mcp-artifact-probe` を保存（Artifact ID `14386332605`、157 bytes、保持期間1日）。
- GitHub MCP `fetch_workflow_run_artifacts` でArtifact一覧取得に成功。
- GitHub MCP `download_workflow_artifact` でZIPダウンロードに成功。ZIP内の `result.txt` を展開・検証し、内容 `artifact-mcp-test=ok` を確認。
- 制約: 一覧取得ツールは先頭ページのみ。保持期間経過後はダウンロード不可。実際のダウンロードは接続ツールとZIP検証によって確認。

## 2026-11-18 — GitHub PagesへActions検証結果を反映

- `docs/github.html` にPR #1〜#4のGitHub Actions検証結果を掲載。ログ取得、意図的な失敗と復旧、Artifacts保存・MCP取得の実証を表示。
- `docs/index.html` のGitHubカードを最新の検証結果に更新。`docs/style.css` に根拠リンクのスタイルを追加。
- 成功と制約を区別して記載。PRリンクを根拠として掲載し、期限切れArtifactの直接ダウンロードは案内しない。
- PRでHTML内部リンク検証を実行し、成功を確認してからSquashマージする。
