# Upstream `notify-yako` workflows

These workflow files live in **upstream repositories** that feed Yako's data
pipeline (see [/docs/architecture](../../website/src/pages/docs/architecture.astro)).
They fire a `repository_dispatch` at `merill/yako` on every push to the default
branch, so getyako.com rebuilds within seconds of an upstream merge instead of
waiting for the next hourly poll.

## Required secret (on the upstream repo)

`YAKO_DISPATCH_TOKEN` — a fine-grained PAT scoped to `merill/yako` with
**Contents: Read** and **Actions: Read and write**.

## Deployment status

| Upstream                                 | Dispatch event type         | Status           |
| ---------------------------------------- | --------------------------- | ---------------- |
| `merill/MicrosoftCloudLogos`             | `upstream-logos-changed`    | Deployed         |
| `merill/cmd`                             | `upstream-cmd-changed`      | **Pending PR**   |
| `adamfowlerit/msportals.io`              | `upstream-portals-changed`  | **Pending PR**   |

The hourly poll in `.github/workflows/sync-upstream.yml` covers any upstream
that hasn't adopted the hook yet. It listens for all three event types.

## Template — `notify-yako.yml`

Drop this into `.github/workflows/notify-yako.yml` in the upstream repo,
replacing `<event-type>` with the matching value from the table above.

```yaml
name: notify-yako

# Fire a repository_dispatch at merill/yako on every push to the default branch
# so getyako.com rebuilds immediately instead of waiting for the hourly poll.
on:
    push:
        branches: [main, master]

jobs:
    notify:
        runs-on: ubuntu-latest
        steps:
            - name: Dispatch to merill/yako
              env:
                  TOKEN: ${{ secrets.YAKO_DISPATCH_TOKEN }}
              run: |
                  curl -sf -X POST \
                      -H "Accept: application/vnd.github+json" \
                      -H "Authorization: Bearer ${TOKEN}" \
                      -H "X-GitHub-Api-Version: 2022-11-28" \
                      https://api.github.com/repos/merill/yako/dispatches \
                      -d '{"event_type":"<event-type>"}'
```
