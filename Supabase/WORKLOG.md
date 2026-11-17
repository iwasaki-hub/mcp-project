# Supabase MCP 作業履歴

## 2026-11-18 — Phase 1: 読み取り専用の接続・一覧検証

- **目的**: Supabase MCPの利用可否と既存リソースを安全に把握する。
- **使用ツール**: `list_organizations`, `list_projects`, `search_docs`。
- **結果**: 組織1件（`iwasaki-hub's Org`）、プロジェクト2件（`LittleDiary`: `INACTIVE`、`typing-app`: `ACTIVE_HEALTHY`）。両プロジェクトのリージョンは `ap-northeast-1`。
- **範囲**: 管理メタデータのみ。DB接続・SQL・テーブル参照・変更は未実施。
- **注意**: 状態は取得時点のスナップショット。既存プロジェクトへの書き込みは明示承認なしに行わない。接続情報や秘密情報は記録しない。
- **次の検証**: プロジェクトを指定した読み取り専用のメタデータ確認。変更系の検証には専用sandboxと承認を用いる。
