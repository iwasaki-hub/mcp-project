# Supabase × MCP 機能検証

> **検証は一時停止中です。次回再開するときは、最初に [START_HERE_SEND_THIS_MESSAGE_TO_CHATGPT.md](./START_HERE_SEND_THIS_MESSAGE_TO_CHATGPT.md) を開き、記載の文章をChatGPTへ送信してください。**

このフォルダでは、Supabase MCPの利用可能な機能、検証手順、実行結果、権限・セキュリティ上の注意点を記録します。

## 状態

- フォルダ作成済み
- **Phase 1 成功（2026-11-18）**: Supabase MCPで組織一覧（1件）、プロジェクト一覧（2件）を読み取り専用で取得。`LittleDiary`（INACTIVE）と`typing-app`（ACTIVE_HEALTHY）を確認。DB操作・設定変更なし。
- 次フェーズ: 既存プロジェクトの安全なメタデータ参照。変更系は検証用sandboxを用意してから実施。

## 方針

- 読み取りと書き込みを区別して検証する
- 変更・削除は対象を明示し、承認を得てから実行する
- APIキー、トークン、パスワード、接続文字列などの秘密情報は保存しない
