# MongoDB Atlas 作業履歴

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
