# Atlas connection foundation

Target: `mcp-sandbox` / `Cluster0`.

Pending prerequisites:
1. Create a dedicated least-privilege database user; do not reuse the existing `mcp_test_user` with readWrite privileges.
2. Review and restrict the existing `0.0.0.0/0` Atlas network access entry without disrupting existing users.
3. Configure `MONGODB_URI` and `ATLAS_HEALTHCHECK_TOKEN` as protected server-only environment variables in the Vercel project `mcp-project-client`. Never use `VITE_` prefixes for secrets.
4. Redeploy and test GET `/api/atlas-health` with an `Authorization: Bearer <token>` header. Do not expose secrets in chat, browser code, logs, or GitHub.

The endpoint is disabled until configured, requires authentication, and only issues a `ping` command. It never reads or writes application data.

Status: connection code prepared; live connectivity not yet verified.
