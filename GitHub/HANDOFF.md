# GitHub MCP 検証 再開ガイド（ChatGPT向け）

> **状態: 一時停止中（2026-11-18）**。ユーザーが再開を指示するまで新しい検証を開始しない。

## ChatGPTが次回最初に読む場所（必須・順番）

対象リポジトリ: `iwasaki-hub/mcp-project`、既定ブランチ `main`。

1. **`GitHub/HANDOFF.md`（このファイル）** — 再開地点、次の検証、安全条件。
2. **`GitHub/CAPABILITIES.md`** — 実証済み機能と未検証機能。古い「未検証」記述より後方の最新検証セクションを優先する。
3. **`GitHub/WORKLOG.md`** — 時系列の操作と証拠（PR/Run ID）。
4. **`GitHub/README.md`** — 方針と入口。
5. 必要に応じて `.github/workflows/validate-pages.yml`、`docs/github.html`、`docs/actions-yaml.html`。

**最初の行動**: GitHub MCPで上記ファイルを `main` から再取得し、最新のPR・Issue状態と利用可能なツールを確認。過去の会話記憶だけで現在の状態を断定しない。

## 停止時点の完了事項

- PR #1: Pages HTML・ローカルリンク検証CIの導入。
- PR #2: Actions Run/Job/Step/ログ取得の実証。
- PR #3: 意図的CI失敗、原因特定、修正後の成功。
- PR #4: Artifactの生成、一覧、ZIP取得と内容照合。
- PR #6: Actions検証証跡をPagesへ反映。
- PR #7: GitHub Actions YAML入門ページをPagesへ追加。
- Issue #8 / PR #9: `Closes #8`、CI成功、Squashマージ後のIssue自動クローズ（`closed / completed`）を実証。
- **PR #10（直近）**: Conversationコメント作成/再取得、`COMMENT`レビュー作成/再取得、CI成功、Squashマージ済み。マージSHA `06febcfc4ddc080fb661d39da7070f2ce4670284`。
- PagesのHTMLファイル更新とGitHub Actions成功は確認したが、公開URLの実ブラウザ表示・デプロイ完了は別途未検証。

## 次回の再開地点（推奨）

**次の1タスク: PRインラインレビューコメント → 返信 → レビュースレッド一覧 → 解決/再オープンの安全な検証。**

1. まず `main` と未処理PRを読み取り専用で確認し、専用ブランチと検証用PRを1件作成する。
2. 安全な小変更（`docs/` 内の検証記録など）でPR CIを起動する。
3. GitHub MCPのインラインレビュー操作を利用可能なツール仕様に従って実施し、コメント/スレッドのID・状態を再取得する。
4. 必要な返信・スレッド解決/再オープンを試し、成功/失敗/未対応を区別する。
5. `GitHub/WORKLOG.md` と `GitHub/CAPABILITIES.md` に結果・制約を記録。
6. **最終PR headのCI success、マージ可能状態を確認してから** Squashマージし、`main` で再取得して検証する。

**未検証**: `APPROVE`、`REQUEST_CHANGES`、レビュー依頼、インラインコメント、返信、スレッド解決/再オープン。自己承認をしない。レビュー承認の検証が必要なら、適切な別レビュアーと事前確認を行う。

## 安全な進め方

- **ユーザーが再開を明示するまで停止を維持**。自動実行・定期実行は設定しない。
- 検証専用リポジトリ内で **1タスク1PR**。安全な変更のみを対象とし、成功したCIを確認して自動Squashマージ（従来のユーザー許可）。
- CI失敗時は原因調査と修正を優先し、失敗状態のままマージしない。
- Secrets、権限、課金、外部本番環境、破壊的操作はユーザー確認なしに変更しない。
- `fetch_commit_workflow_runs` はPRトリガーの先頭ページのみ。PR作成直後はRun未表示の場合があるため再取得する。
- `validate-pages.yml` は `docs/**` などの変更で起動。GitHub配下のMarkdownのみの変更ではCIが起動しない場合がある。
- Pages公開URL: https://iwasaki-hub.github.io/mcp-project/ （表示状態は次回別途確認）。

## 再開時にChatGPTへ伝える一文

「`iwasaki-hub/mcp-project` のGitHub MCP検証を再開してください。まず `GitHub/HANDOFF.md`、`GitHub/CAPABILITIES.md`、`GitHub/WORKLOG.md` を `main` から読み、次の未検証項目を1タスク1PRで安全に進めてください。」

## この停止記録について

この文書の保存・PRマージは検証の新規実行ではなく、次回の引き継ぎ準備。以降の検証は再開指示まで停止。
