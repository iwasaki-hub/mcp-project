# MCP Project

ChatGPTとMCP（Model Context Protocol）を使い、外部サービスの操作可否・実行結果・制約を**安全に検証し、GitHubに記録する**ためのリポジトリです。

**[GitHub Pages — 検証ポータル](https://iwasaki-hub.github.io/mcp-project/)**  
※リポジトリへのHTML反映と、公開サイトへのデプロイ・実ブラウザ表示の確認は別です。

## 検証対象

| サービス | 記録 | Pages | 状態（記録時点） |
| --- | --- | --- | --- |
| MongoDB Atlas | [README](./MongoDB%20Atlas/README.md) / [機能台帳](./MongoDB%20Atlas/CAPABILITIES.md) / [作業履歴](./MongoDB%20Atlas/WORKLOG.md) | [検証ページ](https://iwasaki-hub.github.io/mcp-project/mongodb-atlas.html) | 検証用プロジェクト・無料クラスター作成、CRUDなどを実証。現在停止中 |
| Supabase | [README](./Supabase/README.md) | [検証ページ](https://iwasaki-hub.github.io/mcp-project/supabase.html) | 組織・プロジェクト一覧の読み取りを実証。現在停止中 |
| GitHub | [README](./GitHub/README.md) / [機能台帳](./GitHub/CAPABILITIES.md) / [作業履歴](./GitHub/WORKLOG.md) | [検証ページ](https://iwasaki-hub.github.io/mcp-project/github.html) | PR・Actions・レビュー操作などを検証。現在停止中 |
| Firebase | [README](./Firebase/README.md) / [引き継ぎ](./Firebase/HANDOFF.md) | 未作成 | フォルダを準備。プロジェクト情報・機能は未検証 |

## 次回の再開手順

各サービスの検証は**停止中**です。再開するときは、以下の専用ガイドを最初に読み、記載された文章をChatGPTに送ってください。

- [MongoDB Atlas — 最初に送る文章](./MongoDB%20Atlas/START_HERE_SEND_THIS_MESSAGE_TO_CHATGPT.md)
- [Supabase — 最初に送る文章](./Supabase/START_HERE_SEND_THIS_MESSAGE_TO_CHATGPT.md)
- [GitHub — 最初に送る文章](./GitHub/START_HERE_SEND_THIS_MESSAGE_TO_CHATGPT.md) / [HANDOFF](./GitHub/HANDOFF.md)
- [Firebase — HANDOFF](./Firebase/HANDOFF.md)

**再開時は必ず `main` 上の最新記録と現在のサービス状態を照合してください。** 古い記録を現在の実状態とみなさないでください。

## 安全方針

1. まず読み取り専用で状態を確認し、MCPツールが存在することと実行成功を区別する。
2. 変更は原則**1タスク1PR**。対象を限定し、適用されるCIの成功とマージ可能状態を確認してからSquashマージする。
3. Secrets、トークン、パスワード、秘密の接続文字列、機密データは記録しない。
4. 課金、権限・ネットワーク設定変更、データ削除、外部環境への書き込みなどは事前にユーザーの承認を得る。
5. 検証記録には成功・失敗・未検証・安全性確認待ちを区別し、証拠と制約を残す。

### セキュリティ上の未解決事項

MongoDB Atlasの検証用 `mcp-sandbox` には、2026-11-18の記録で**全IPv4許可（`0.0.0.0/0`）**が追加されています。削除・制限を確認した記録はなく、現在の状態は未確認です。再開時には読み取り専用で最優先確認し、必要な是正はユーザー承認後に行ってください。

## GitHub Pages と CI

- 公開用ファイル: [`docs/`](./docs/)
- HTML・内部リンクの検証: [`.github/workflows/validate-pages.yml`](./.github/workflows/validate-pages.yml)
- GitHub Actionsの書き方: [YAML入門](https://iwasaki-hub.github.io/mcp-project/actions-yaml.html)
- MongoDB Atlasの検証記録をPages用HTMLへ反映したPR: [#16](https://github.com/iwasaki-hub/mcp-project/pull/16)（CI成功・Squashマージ済み）

最終更新: 2026-11-18（リポジトリ内の検証記録に基づく）
