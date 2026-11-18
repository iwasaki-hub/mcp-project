# GitHub MCP 機能検証

> **現在: 一時停止中（2026-11-18）。次回のChatGPTは最初に [HANDOFF.md](./HANDOFF.md) を必ず読むこと。**

## ChatGPTの読み取り順

1. [HANDOFF.md](./HANDOFF.md) — **再開地点・安全条件・次の検証タスク（最優先）**
2. [CAPABILITIES.md](./CAPABILITIES.md) — 成功・失敗・未検証・制約
3. [WORKLOG.md](./WORKLOG.md) — 時系列の検証証跡

対象リポジトリ: `iwasaki-hub/mcp-project`、既定ブランチ `main`。

## 現在の検証状態

- GitHub MCPの読み取り・ファイル更新・PR作成/自動Squashマージ・Actionsログ取得・失敗復旧・Artifacts取得を検証済み。
- Issue #8のPR #9マージ後自動クローズを確認済み。
- 直近のPR #10でConversationコメント、COMMENTレビューの投稿と再取得を検証済み。
- **次回候補: PRインラインレビューコメント、返信、レビュースレッドの解決/再オープン。**
- ユーザーが明示的に再開するまで検証を進めない。

## 検証方針

- 1タスク1PR、検証専用リソースを使用。
- 最終CI成功とマージ可能状態を確認した後にSquashマージする。
- トークンや秘密情報を記録しない。危険な変更は事前に確認する。
- GitHub Pagesの公開表示とリポジトリ内のHTML更新は区別する。
