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
| ファイル更新 | `update_file` | 成功 | 検証記録やWebファイルの更新を実施 |
| ブランチ作成 | `create_branch` | 成功 | 検証用ブランチを作成 |
| Issue作成・更新 | `create_issue` 等 | 未検証 | 明示承認後に実施 |
| PR作成・Squashマージ | `create_pull_request`, `merge_pull_request` | 成功 | PR #1をSquashマージ。レビュー機能は未検証 |
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

## GitHub Actions 実行結果・ログ取得（2026-11-18）

| 機能 | MCPツール | 状態 | 実証結果 |
| --- | --- | --- | --- |
| コミットに紐づくワークフロー取得 | `fetch_commit_workflow_runs` | **成功（制約あり）** | PR headコミットから Run `44208727316`、completed / success を取得。PRトリガー限定・先頭ページのみ |
| Run内のジョブ一覧取得 | `fetch_workflow_run_jobs` | **成功** | Job `134481315556`、completed / success |
| ジョブのステップ取得 | `fetch_workflow_job_steps` | **成功** | 5ステップすべてsuccess |
| ジョブログ本文取得 | `fetch_workflow_job_logs` | **成功** | 15,158文字のログとHTML4ページ検証成功メッセージを確認 |
| 任意のRun検索・push実行一覧取得 | 現在の接続ツール | **未対応／未検証** | `fetch_commit_workflow_runs` はPRイベント限定。push実行の不存在は判定できない |

- ログに `actions/checkout@v4` のNode.js 20非推奨警告あり。ワークフローの実行結果はsuccess。

## Actions失敗検知・復旧検証（2026-11-18）

| 機能 | 状態 | 根拠 |
| --- | --- | --- |
| 意図的な失敗の検知 | **成功** | PR #3のRun `44211810038` がfailure。欠損リンクとexit code 1をジョブログで確認 |
| 失敗原因のログ特定 | **成功** | `fetch_workflow_job_logs` で欠損ファイル名を特定 |
| 修正後の復旧確認 | **成功** | Run `44211952061`、Job `134492260228` がsuccess。HTML4ページの検証成功ログを取得 |
| 失敗したRunの再実行 | **未検証** | `rerun_failed_workflow_run_jobs` は利用可能だが、修正後のコードを検証するには新規Runが適切 |

## GitHub Actions Artifacts保存・取得（2026-11-18）

| 機能 | MCP/Actions | 状態 | 根拠 |
| --- | --- | --- | --- |
| Artifact生成・アップロード | `actions/upload-artifact@v4` | **成功** | PR #4 / Run `44212299127` (success) |
| RunのArtifact一覧取得 | `fetch_workflow_run_artifacts` | **成功** | Artifact `14386332605`、`mcp-artifact-probe`、157 bytes、未期限切れ |
| Artifact ZIP取得 | `download_workflow_artifact` | **成功** | ZIPを取得・展開し `result.txt` を確認 |
| Artifact内容照合 | ZIP展開 | **成功** | `artifact-mcp-test=ok` を確認 |

- テストArtifactの保持期間は1日。MCP一覧取得は先頭ページのみ。

## Issue・PRライフサイクル検証（2026-11-18）

| 機能 | 状態 | 根拠 |
| --- | --- | --- |
| Issue作成 | **成功** | `create_issue` でIssue #8作成 |
| Issue参照 | **成功** | Issue #8を作成後に参照可能 |
| PR本文によるIssueクローズ指定 | **設定済み** | PR #9本文に `Closes #8` |
| PRに紐づくCI検証 | **成功** | Run `44217488602` completed / success |
| Squashマージ後のIssue自動クローズ | **マージ後確認** | マージ前には結果を断定しない |

## PRコメント・レビュー検証（2026-11-18、PR #10）

| 機能 | 状態 | 根拠 |
| --- | --- | --- |
| Conversationコメント作成 | **成功** | `add_comment_to_issue`、コメントID `6966634457` |
| Conversationコメント再取得 | **成功** | `fetch_pr_comments` で本文を確認 |
| COMMENTレビュー投稿 | **成功** | `add_review_to_pr`、レビューID `5949685491` |
| レビュー一覧・状態取得 | **成功** | `list_pull_request_reviews`、`COMMENTED` |
| 承認・変更要求・インラインレビュー | **未検証** | 自己承認や不要な変更要求を避けた |
| Issue自動クローズ（前回検証） | **成功** | PR #9 Squashマージ後、Issue #8 `closed / completed` |
