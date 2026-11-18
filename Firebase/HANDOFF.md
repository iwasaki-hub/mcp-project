# Firebase MCP 検証 引き継ぎ

> 状態: **未開始・停止中**（2026-11-18）。ユーザーから明示的な再開指示があるまでFirebaseの検証や設定変更をしない。

## 次回最初に読むファイル

1. `Firebase/HANDOFF.md`（このファイル）
2. `Firebase/README.md`
3. 作成後は `Firebase/CAPABILITIES.md` と `Firebase/WORKLOG.md`

## 再開時の確認

- GitHub `iwasaki-hub/mcp-project` の `main` を読み、既存のPRと作業状態を確認する。
- 利用可能なFirebase関連MCPツール、認証、対象プロジェクトを**読み取り専用**で確認する。
- 機能検証は原則1タスク1PR。実測結果を `CAPABILITIES.md` と `WORKLOG.md` に記録する。
- CIが適用される変更は成功確認後にのみSquashマージする。
- Firebaseのプロジェクト作成、課金、権限変更、Secrets、データ削除、デプロイは事前にユーザー確認を得る。

## 次回ChatGPTに送る一文

「`iwasaki-hub/mcp-project` の `Firebase/HANDOFF.md` と `Firebase/README.md` をmainから読み、Firebase MCPの接続可否を読み取り専用で確認してください。検証や設定変更は私の指示を待ってください。」
