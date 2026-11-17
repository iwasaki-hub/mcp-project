# MongoDB Atlas 作業履歴

## 2026-11-18 — sandboxコレクションCRUD検証（作成・読取・更新・削除）

- **対象**: `mcp-sandbox/Cluster0`、`mcp_test_db.test_entries`。ユーザー承認に基づくテストデータ操作。
- **接続**: `remote_atlas_connect` に成功。接続ハンドルや秘密情報は記録しない。
- **識別条件**: `testRunId=mcp-crud-20261118-0813`、`type=mcp_crud_test`。他データへの影響を避けるため対象を限定。
- **Create**: `insert_many` で `{testRunId, type, message:'created', step:1}` を1件追加（insertedCount=1）。
- **Read**: `find` で1件を取得し初期値を確認。
- **Update**: `update_many` に限定フィルター、`$set` で `message='updated'`、`step=2`、`upsert=false`。matchedCount=1、modifiedCount=1、upsertedCount=0。`find` で更新値を確認。
- **Delete**: `delete_many` にテスト識別子・type・更新後messageを指定し、deletedCount=1。
- **最終確認**: `count`（テスト識別子で絞り込み）=0。今回のテストドキュメントは残っていない。
- **制約**: MCP接続でのCRUD成功であり、新規作成した `mcp_test_user` のパスワード認証・権限境界を直接検証したものではない。既存 `mcp-ai-practice` への変更操作なし。


## 2026-11-18 — sandbox DBユーザー作成と権限確認

- **対象**: `mcp-sandbox`（projectId=`6afccfe99a4b814c5a91c00d`）、`Cluster0`、DB=`mcp_test_db`。
- **承認設定**: username=`mcp_test_user`、role=`readWrite`、databaseName=`mcp_test_db`、cluster scope=`Cluster0`、パスワードはMCP側で自動生成。
- **事前確認**: `atlas_list_db_users` でDBユーザー0件を確認。
- **作成**: `atlas_create_db_user` に projectId、username、clusters=[`Cluster0`]、roles=[{roleName:`readWrite`, databaseName:`mcp_test_db`}] を指定。password引数は省略。ユーザー名と生成パスワードの存在を応答で確認。
- **事後確認**: `atlas_list_db_users` で1件。`mcp_test_user`、`readWrite` on `mcp_test_db`、scope=`CLUSTER:Cluster0` を確認。
- **変更範囲**: 新規DBユーザー1件。既存 `mcp-ai-practice` への変更操作なし。
- **セキュリティ**: パスワード値、接続文字列、認証トークンは記録しない。生成パスワードを安全に保管できていることは未確認。実際の当該ユーザー認証でのログイン・読み書きは未検証。必要ならAtlas上でパスワードを安全に再設定する。


## 2026-11-18 — `mcp-sandbox` にデータベース・コレクションを作成

- **承認範囲**: ユーザーが `mcp_test_db` と `test_entries` の作成および `remote_atlas_connect` に伴う変更可能性を了承。
- **対象**: `mcp-sandbox`（projectId=`6afccfe99a4b814c5a91c00d`）/ `Cluster0`（FREE、AWS東京）。
- **実行手順**: (1) `remote_atlas_connect` 成功 (2) `list_databases` で `admin`・`local` の2件を確認（目的DBなし）(3) `create_collection`（database=`mcp_test_db`、collection=`test_entries`）が `created=true` (4) `list_databases` で `mcp_test_db` を含む3件、`list_collections` で `test_entries` 1件を確認。
- **作成条件（実測）**: プロジェクトとFREEクラスターが存在し、リモート接続が成功した。目的DBは事前一覧に存在せず、`create_collection` によってDBも自動作成された。
- **事後セキュリティ確認**: `atlas_list_db_users` は0件、`atlas_inspect_access_list` は0件。事前のユーザー・アクセスリスト件数は取得していないため、接続時の一時的な作成・削除や内部動作は断定できない。
- **変更範囲**: `mcp_test_db/test_entries` を新規作成。ドキュメント挿入なし。既存 `mcp-ai-practice` への変更操作なし。
- **制約**: MCPの接続モデル・実効権限は未確認。今回の接続成功を他プロジェクトの無副作用保証と解釈しない。接続ハンドル・認証情報・接続文字列は記録しない。


## 2026-11-18 — `mcp-sandbox` に無料クラスターを作成

- **目的**: MCP機能検証用の無料クラスターを新規プロジェクト内に用意する。
- **事前確認**: `atlas_list_clusters`（projectId=`6afccfe99a4b814c5a91c00d`）でクラスター0件を確認。
- **作成**: `atlas_create_free_cluster`（projectId=`6afccfe99a4b814c5a91c00d`、name=`Cluster0`、region=`AP_NORTHEAST_1`）を実行し `created=true` を取得。
- **事後検証**: `atlas_list_clusters` で1件を確認。`Cluster0`、instanceType=`FREE`、provider=`AWS`、region=`AP_NORTHEAST_1`、state=`IDLE`、paused=`false`。
- **変更範囲**: `mcp-sandbox` に無料クラスター1件を作成。既存 `mcp-ai-practice` に変更操作なし。DBユーザー・アクセスリスト・データの作成操作なし。
- **注意**: DB内部への接続とデータ参照は未検証。`remote_atlas_connect` の副作用確認待ちは継続。

### 作成に成功した際の条件（実測と未確認を区別）

- **事前状態（実測）**: `mcp-sandbox` プロジェクトが作成済み（projectId=`6afccfe99a4b814c5a91c00d`）、同プロジェクトのクラスター数は0件。既存の別プロジェクト `mcp-ai-practice` には `Cluster0` が存在していた。
- **実行環境（実測）**: ChatGPTから接続済みMongoDB Atlas MCPの `atlas_create_free_cluster` を使用。Atlas管理APIへの認証は成功したが、MCPアカウントの正確なAtlasロール・認証モデルは未確認。
- **指定したパラメータ（実測）**: `projectId=6afccfe99a4b814c5a91c00d`, `name=Cluster0`, `region=AP_NORTHEAST_1`。ツールは無料クラスター専用で、有料専用クラスター用の `atlas_create_cluster` は使用していない。
- **応答と検証（実測）**: 作成API応答 `created=true`。続く `atlas_list_clusters` は1件を返し、`FREE`、`AWS`、`AP_NORTHEAST_1`、`IDLE`、`paused=false` を確認。
- **成立した条件と一般要件の区別**: この構成・権限下で1回作成できたことを確認した。プロジェクト内クラスター0件が必須条件であること、別プロジェクトに無料クラスターがある場合の一般的な上限、無料枠の課金条件、すべてのリージョンでの可否は検証していない。
- **未確認事項**: 実際に付与された管理ロール、組織のクラスター作成制限、請求設定、ネットワークアクセス/DBユーザーの要否。作成時にそれらを変更する操作は実行していない。
- **再現手順**: (1) 対象projectIdを確認 (2) `atlas_list_clusters` で重複や既存クラスターを確認 (3) 無料作成ツールを明示的に選択 (4) `atlas_create_free_cluster` を実行 (5) `atlas_list_clusters` でFREE・リージョン・状態を検証。


## 2026-11-18 — 新規Atlasプロジェクト `mcp-sandbox` 作成

- **目的**: MCP機能検証用の独立したAtlasプロジェクトを用意する。
- **事前確認**: `atlas_list_projects` で既存 `mcp-ai-practice`（orgId=`630f2ac45d0b0a7f17a95c3e`）と同名プロジェクト不在を確認。
- **作成**: `atlas_create_project`（projectName=`mcp-sandbox`、orgId=`630f2ac45d0b0a7f17a95c3e`）成功。
- **検証**: `atlas_list_projects` を再実行し、`mcp-sandbox`（projectId=`6afccfe99a4b814c5a91c00d`）と既存 `mcp-ai-practice` の計2件を確認。
- **変更範囲**: 新規Atlasプロジェクト1件の作成のみ。既存プロジェクトやクラスター設定の変更操作なし。新規クラスター・DBは作成していない。
- **注意**: この作成はユーザー承認に基づく意図的なAtlas管理リソース変更。Phase 3の接続安全性確認とは別作業。


## 2026-11-18 — Phase 3追加調査: MCP接続方式と権限の読み取り専用確認

- **対象**: `mcp-ai-practice / Cluster0`（projectId=`6afa9d0143de8864a5e25613`）
- **実行した読み取りツール**: `atlas_inspect_access_list`, `atlas_list_db_users`
- **取得結果**: IPアクセスリスト4件、DBユーザー5件。ユーザーのロールには `read`、`readAnyDatabase`、`readWrite` が存在。IPアクセスリストには `Created as part of the Auto Setup process` と `render` のコメントがある。ユーザー名とIP/CIDRは記録しない。
- **公式仕様**: ローカル `atlas-connect-cluster` は接続文字列が未設定の場合に一時DBユーザーを作成する。リモート `remote-atlas-connect` は別の接続・セッションモデルで、接続先の権限はユーザー委任またはMCP構成のロールに依存する。
- **未確認**: 現在のMCPがどちらのアクセスモデルか、接続時のDBユーザー/アクセスリストの自動作成の有無、MCP実効権限とread-only設定。既存DBユーザーのロールだけではMCP実効権限は判定できない。
- **判断**: `remote_atlas_connect` は実行しない。DB・コレクション一覧取得は安全性確認待ちのまま。
- **Atlas側への変更**: なし（読み取りツールのみ実行）。
- **参考**: https://www.mongodb.com/docs/mcp-server/tools/ ; https://www.mongodb.com/docs/mcp-server/remote-mcp/access-models/ ; https://www.mongodb.com/docs/mcp-server/prerequisites/
- **次の作業**: MCP接続構成のアクセスモデルとread-only設定を管理画面等で確認し、接続時の副作用がないと確認できた後にPhase 3を再開する。


## 2026-11-18 — Phase 3: DB・コレクション一覧取得前の副作用確認

- **目的**: `mcp-ai-practice / Cluster0` のデータベース・コレクション一覧をAtlas側の変更なしで取得する。
- **確認したツール**: `remote_atlas_connect`（接続）、`list_databases`（一覧）、`list_collections`（一覧）。
- **公式資料**: https://www.mongodb.com/docs/mcp-server/tools/ — ローカル `atlas-connect-cluster` は設定によって一時DBユーザーを作成する。リモート `remote-atlas-connect` は別の接続・セッション方式だが、現在の接続構成で副作用がないことを断定できない。
- **判定**: 安全性確認待ち。`remote_atlas_connect` を実行せず、`list_databases` と `list_collections` も未実行。データベース名・コレクション名は未取得。
- **Atlas側への変更**: なし。ユーザー作成、アクセスリスト変更、設定変更なし。
- **次の作業**: 接続方式・権限・ユーザー作成の有無を確認し、変更不要と確認できた場合のみ一覧取得を再開する。


## 2026-11-18 — Phase 2: Cluster0詳細情報の読み取り専用検証

- **目的**: `mcp-ai-practice` の `Cluster0` のメタデータをMCPで取得する。
- **使用ツール**: `atlas_inspect_cluster`（projectId=`6afa9d0143de8864a5e25613`, clusterName=`Cluster0`）。
- **結果**: 成功。instanceType=`FREE`、instanceSize=`N/A`、provider=`AWS`、region=`AP_NORTHEAST_1`（東京）、mongoDBVersion=`8.0.37`、state=`IDLE`、paused=`false`。
- **セキュリティ**: ツール応答に接続文字列フィールドが存在したが、値は記録・公開しない。
- **必要な権限**: Atlas公式資料上、クラスター参照はProject Read Only相当。実際のアカウント権限は未確認。
- **検証範囲**: Atlasのクラスター管理メタデータのみ。DB接続・クエリ・ドキュメント参照は未検証。
- **Atlas側への変更**: なし。読み取り専用ツールのみ実行。
- **次の作業**: データベース・コレクション一覧の読み取り専用検証。接続ツールに一時ユーザー作成などの副作用がないか事前確認する。

## 2026-11-18 — Phase 1: Atlas MCP読み取り専用の接続検証

- **目的**: MCP経由でAtlasのプロジェクトとクラスターの一覧を取得できるか検証する。
- **実施内容**: `atlas_list_projects`（limit=100, pageNum=1, includeCount=true）と`atlas_list_clusters`（全体一覧）を実行。
- **結果**: 両方成功。プロジェクト1件（`mcp-ai-practice`、ID `6afa9d0143de8864a5e25613`）、クラスター1件（`Cluster0`、所属 `mcp-ai-practice`）を取得。
- **検証範囲**: Atlas管理APIの一覧取得。データベース接続、コレクション、ドキュメントの参照は未検証。
- **必要な権限（公式資料の目安）**: プロジェクト一覧はOrganization MemberまたはOrganization Read Only、クラスター参照はProject Read Only。実際に付与されたロールは未確認。
- **変更**: Atlas側の設定・データ変更なし。GitHubの検証ドキュメントのみ更新。

## 2026-11-18 — 目的と検証方針の決定

- **目的**: MCPを使ってMongoDB Atlasと通信し、何ができるかを実証・記録する。
- **実施内容**: 検証対象を接続、参照、検索・分析、データ操作、管理、セキュリティ、自動化に分類。READMEと機能検証台帳を整備。

## 2026-11-18 — 作業管理の開始

- **目的**: MongoDB Atlas関連の作業記録を一か所に集約する。
- **実施内容**: `MongoDB Atlas/` フォルダと `README.md`、`WORKLOG.md` を作成。
- **検証**: フォルダ作成コミット `9cb8cd120c0a169c4a764f63ea32558689238622`。
