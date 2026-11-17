# MongoDB Atlas MCP 機能検証台帳

更新日: 2026-11-18

| 分野 | 検証項目 | 状態 | 備考 |
| --- | --- | --- | --- |
| データ操作 | sandbox CRUD（Create/Read/Update/Delete） | 成功 | テスト1件の追加・取得・更新・削除、最終count=0 |
| 管理 | sandbox DBユーザー作成 | 成功 | `atlas_create_db_user`: `mcp_test_user`、`mcp_test_db` の `readWrite`、`Cluster0` 限定 |
| 接続 | リモートAtlas DB接続 | 成功 | `remote_atlas_connect`: `mcp-sandbox/Cluster0`。接続時の内部副作用は未確定 |
| 参照 | DB・コレクション一覧（sandbox） | 成功 | `list_databases` / `list_collections` で作成後の存在を確認 |
| 書き込み | DB・コレクション作成（sandbox） | 成功 | `create_collection`: `mcp_test_db/test_entries`、`created=true` |
| 管理 | 無料クラスター作成 | 成功 | `atlas_create_free_cluster`: `mcp-sandbox/Cluster0`（AWS東京、FREE、IDLE） |
| 管理 | 新規Atlasプロジェクト作成 | 成功 | `atlas_create_project`: `mcp-sandbox`（2026-11-18）、一覧再取得で確認 |
| 接続 | プロジェクト一覧取得 | 成功 | `atlas_list_projects`: `mcp-ai-practice`（1件） |
| 接続 | クラスター一覧取得 | 成功 | `atlas_list_clusters`: `Cluster0`（1件） |
| 接続 | クラスター詳細取得 | 成功 | `atlas_inspect_cluster`: FREE / AWS東京 / 8.0.37 / IDLE |
| 管理 | IPアクセスリスト取得 | 成功 | `atlas_inspect_access_list`: 4件。値は非公開 |
| 管理 | DBユーザー一覧取得 | 成功 | `atlas_list_db_users`: 5件。名前は非公開 |
| 接続 | MCPアクセスモデル・read-only設定の確認 | 未確認 | 接続構成は取得できていない |
| 参照 | 既存 `mcp-ai-practice` のDB・コレクション一覧 | 安全性確認待ち | 既存環境への接続は未実行。sandbox接続の成功とは区別 |
| 参照 | sandboxテストドキュメント取得 | 成功 | `find` で1件取得、更新後も再取得 |
| 検索 | 条件検索・集計 | 未検証 | 読み取り専用 |
| 管理 | アラート・パフォーマンス確認 | 未検証 | 利用可能な権限を確認 |
| 書き込み | sandboxテストデータの追加・更新 | 成功 | `insert_many` / `update_many` 各1件 |
| 削除 | sandboxテストデータの削除 | 成功 | `delete_many` で1件、`count` で0件を確認 |
| 自動化 | 定期的な状態確認 | 未検証 | 実行方法を別途設計 |

## sandbox CRUD検証（2026-11-18）

- **対象**: `mcp_test_db.test_entries`。テスト識別子=`mcp-crud-20261118-0813`。
- **Create**: `insert_many` insertedCount=1、初期message=`created`。
- **Read**: `find` で1件取得。
- **Update**: `update_many` matchedCount=1、modifiedCount=1、upsertedCount=0。message=`updated` を再取得で確認。
- **Delete**: `delete_many` deletedCount=1。`count`（テスト識別子）=0。
- **安全性**: テストデータだけを対象に限定。実DBユーザー `mcp_test_user` での認証・権限境界は未検証。

## sandbox DBユーザー作成（2026-11-18）

- **ツール**: `atlas_list_db_users`（前後）、`atlas_create_db_user`。
- **事前状態**: DBユーザー0件。
- **作成引数**: projectId=`6afccfe99a4b814c5a91c00d`、username=`mcp_test_user`、clusters=[`Cluster0`]、roles=[`readWrite` on `mcp_test_db`]、password省略（MCP自動生成）。
- **結果**: 作成応答にusernameと生成パスワードあり。事後一覧でユーザー1件、権限とスコープ一致を確認。
- **未検証**: 実ユーザー認証での接続と権限行使。パスワードは記録しない。

## sandbox DB・コレクション作成（2026-11-18）

- **MCPツール**: `remote_atlas_connect`, `list_databases`, `create_collection`, `list_collections`。
- **対象**: `mcp-sandbox/Cluster0`、DB=`mcp_test_db`、collection=`test_entries`。
- **事前条件（実測）**: FREEクラスターが存在し、リモート接続成功。接続後のDB一覧は `admin` と `local` の2件。
- **作成**: `create_collection` が `created=true`。DBはコレクション作成時に自動生成。
- **事後検証**: DB一覧に `mcp_test_db`、コレクション一覧に `test_entries`。DBユーザー0件、IPアクセスリスト0件（事後値のみ）。
- **注意**: 接続時の一時的な変更有無、MCP実効ロール、他環境での動作は未確認。ドキュメントは未挿入。

## 無料クラスター作成（2026-11-18）

- **MCPツール**: `atlas_list_clusters`（事前・事後）、`atlas_create_free_cluster`（作成）
- **対象**: `mcp-sandbox`（projectId=`6afccfe99a4b814c5a91c00d`）/ `Cluster0`
- **結果**: `created=true`。事後一覧で1件、instanceType=`FREE`、provider=`AWS`、region=`AP_NORTHEAST_1`、state=`IDLE`、paused=`false`。
- **Atlas側への変更**: 無料クラスター1件の作成のみ。既存プロジェクトの変更操作なし。
- **作成成功時の事前条件（実測）**: 対象プロジェクト作成済み、対象プロジェクト内クラスター0件、MongoDB Atlas MCPで管理APIにアクセス可能。別プロジェクトには既存の無料クラスターがあった。
- **指定引数（実測）**: `projectId=6afccfe99a4b814c5a91c00d`, `name=Cluster0`, `region=AP_NORTHEAST_1`。無料専用 `atlas_create_free_cluster` を使用（有料クラスター作成ツールは未使用）。
- **確認方法**: 作成応答 `created=true`、作成後一覧 `FREE` / `AWS` / `AP_NORTHEAST_1` / `IDLE` / `paused=false`。
- **成立条件の限界**: 1回の成功事例であり、クラスター数上限、無料枠・課金条件、組織ポリシー、実際の管理ロール、他リージョンの対応状況は未確認。事前のクラスター0件を一般的な必須要件とは断定しない。
- **未検証**: DB接続、コレクション・ドキュメント参照。

## 新規Atlasプロジェクト作成（2026-11-18）

- **MCPツール**: `atlas_create_project`
- **対象**: `mcp-sandbox`（projectId=`6afccfe99a4b814c5a91c00d`、orgId=`630f2ac45d0b0a7f17a95c3e`）
- **結果**: 成功。`atlas_list_projects` で既存プロジェクトと合わせて2件を確認。
- **Atlas側への変更**: 新規プロジェクト1件の作成。クラスターやデータベースの作成なし。

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
