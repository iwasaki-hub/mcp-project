# MongoDB Atlas MCP 機能検証台帳

更新日: 2026-11-18

| 分野 | 検証項目 | 状態 | 備考 |
| --- | --- | --- | --- |
| 接続 | プロジェクト一覧取得 | 成功 | `atlas_list_projects`: `mcp-ai-practice`（1件） |
| 接続 | クラスター一覧取得 | 成功 | `atlas_list_clusters`: `Cluster0`（1件） |
| 接続 | クラスター詳細取得 | 成功 | `atlas_inspect_cluster`: FREE / AWS東京 / 8.0.37 / IDLE |
| 管理 | IPアクセスリスト取得 | 成功 | `atlas_inspect_access_list`: 4件。値は非公開 |
| 管理 | DBユーザー一覧取得 | 成功 | `atlas_list_db_users`: 5件。名前は非公開 |
| 接続 | MCPアクセスモデル・read-only設定の確認 | 未確認 | 接続構成は取得できていない |
| 参照 | データベース・コレクション一覧 | 安全性確認待ち | `remote_atlas_connect` 未実行。接続時の副作用を確認後に再開 |
| 参照 | ドキュメント取得 | 未検証 | 機密情報の記録を避ける |
| 検索 | 条件検索・集計 | 未検証 | 読み取り専用 |
| 管理 | アラート・パフォーマンス確認 | 未検証 | 利用可能な権限を確認 |
| 書き込み | テストデータの追加・更新 | 未検証 | 事前承認が必要 |
| 削除 | テストデータの削除 | 未検証 | 事前承認が必要 |
| 自動化 | 定期的な状態確認 | 未検証 | 実行方法を別途設計 |

## Phase 3 — 接続方式と権限の追加調査（2026-11-18）

- **使用ツール**: `atlas_inspect_access_list`（成功: 4件）、`atlas_list_db_users`（成功: 5件）
- **既存DBユーザーロール**: `read`、`readAnyDatabase`、`readWrite` を確認。現在のMCP実効権限とは限らない。
- **IPアクセスリスト**: 自動セットアップ由来および `render` コメントを確認。アドレスは非公開。
- **公式資料**: https://www.mongodb.com/docs/mcp-server/tools/ 、https://www.mongodb.com/docs/mcp-server/remote-mcp/access-models/
- **判断**: `remote_atlas_connect` の一時ユーザー作成やアクセスリスト変更が起きないことを確認できず、未実行。DB/コレクション一覧は未取得。
- **Atlas側への変更**: なし。

## Phase 3 — 事前安全性確認（2026-11-18）

- **対象**: `mcp-ai-practice / Cluster0`
- **確認したツール**: `remote_atlas_connect`, `list_databases`, `list_collections`
- **結果**: 接続ツールの副作用を確実に否定できないため、いずれも実行せず。データベース・コレクション一覧は未取得。
- **根拠**: https://www.mongodb.com/docs/mcp-server/tools/ — ローカル接続ツールは一時DBユーザーを作成する場合があり、リモート接続は別方式。今回の接続設定で変更がないかは未確認。
- **Atlas側への変更**: なし。
- **次の作業**: 接続モデルと権限を確認し、無変更の接続が保証できる場合のみ再開。

## Phase 2 — 実測結果

- **実行日**: 2026-11-18
- **MCPツール**: `atlas_inspect_cluster`
- **対象**: `mcp-ai-practice`（projectId=`6afa9d0143de8864a5e25613`） / `Cluster0`
- **結果**: 成功。instanceType=`FREE`、instanceSize=`N/A`、provider=`AWS`、region=`AP_NORTHEAST_1`、mongoDBVersion=`8.0.37`、state=`IDLE`、paused=`false`。
- **権限**: 読み取り成功。実際のアカウントロールは未確認。
- **セキュリティ**: 接続文字列の値は記録しない。
- **注意点**: 管理メタデータ取得とDB内部の接続・クエリ実行は別。後者は未検証。
- **Atlas側への変更**: なし。

## Phase 1 — 実測結果

- **実行日**: 2026-11-18
- **MCPツール1**: `atlas_list_projects`（limit=100, pageNum=1, includeCount=true）
- **結果1**: 成功。totalCount=1、`mcp-ai-practice`（プロジェクトID: `6afa9d0143de8864a5e25613`）
- **MCPツール2**: `atlas_list_clusters`（projectId指定なし）
- **結果2**: 成功。totalCount=1、`Cluster0`（所属プロジェクト: `mcp-ai-practice`）
- **権限**: 読み取り操作に成功。アカウントの実際のロール構成は未確認。
- **注意点**: Atlasの管理情報取得と、MongoDBのデータベース内部への接続・参照は別の検証項目。
- **Atlas側への変更**: なし。

## 個別検証の記録形式

- 実行日時:
- MCPツール名:
- 目的:
- 対象（秘密情報を除く）:
- 必要な権限:
- 結果（成功／失敗／未検証／対象外）:
- 確認できたこと:
- 制約・注意点:
- 次の作業:

※「ツールが存在する」ことと「接続先で正常に実行できる」ことは別です。
