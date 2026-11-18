# GitHub MCP 機能検証台帳

更新日: 2026-11-18

| 項目 | 使用ツール | 状態 | 検証結果 |
| --- | --- | --- | --- |
| リポジトリ情報取得 | `get_repo` | 成功 | 公開、デフォルト `main`、権限情報を取得 |
| ファイル読み取り | `fetch_file` | 成功 | `GitHub/README.md` を取得 |
| ブランチ検索 | `search_branches` | 成功 | `main` を確認 |
| Issue検索 | `search_issues` | 成功 | 0件 |
| PR検索 | `search_prs` | 成功 | 0件 |
| ファイル作成 | `create_file` | 成功 | GitHub検証記録ファイルを作成 |
| ファイル更新 | `update_file` | 未検証 | 次の検証候補 |
| ブランチ作成 | `create_branch` | 未検証 | sandboxブランチで実施予定 |
| Issue作成・更新 | `create_issue` 等 | 未検証 | 明示承認後に実施 |
| PR作成・レビュー・マージ | PR関連ツール | 未検証 | 明示承認後に実施 |
| ファイル削除 | `delete_file` | 未検証 | 検証用ファイルに限定 |

## 安全方針

- 既存のコード・Issue・PRを無断変更しない。
- 書き込み系は検証専用リソースを使用し、影響範囲を明確にする。
- 認証情報・秘密情報は記録しない。

## 新規リポジトリ作成の調査（2026-11-18）

| 機能 | 状態 | 根拠・制約 |
| --- | --- | --- |
| 新規リポジトリ作成 | **利用不可（現在の接続ツール）** | GitHub MCPツール一覧に `create_repository` 相当がなく、他の接続ツールにも直接作成操作が見つからなかった。GitHub Web UIからの手動作成は可能 |

- `iwasaki-hub/mcp-github-sandbox` の取得は404（非存在またはアクセス不可）。作成は実施していない。

## GitHub Pages 検証（2026-11-18）

| 機能 | 状態 | 根拠 |
| --- | --- | --- |
| Pages用ファイル作成 | **成功** | `docs/index.html`、`docs/style.css`、`docs/.nojekyll` を `create_file` で作成 |
| 作成ファイル再取得 | **成功** | `fetch_file` で3ファイルの存在を確認 |
| Pages公開元の設定 | **未検証** | `main` / `/docs` の公開設定は未実施 |
| Pagesデプロイ・公開URL確認 | **未検証** | ビルド状態、HTTP応答、ブラウザ表示は未確認 |

- **注意**: 静的ファイルを配置できたことと、GitHub Pagesで公開できたことは別の検証項目。
