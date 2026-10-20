<!--
  HOW TO USE THIS TEMPLATE
  1. Replace every [PLACEHOLDER: ...] with project details.
  2. Delete any section that does not apply (and its line in the table of contents).
  3. Delete these HTML comments once you are done. They do not show on GitHub, but they clutter the file.
  4. Write for two readers: programme staff who need the big picture, and developers who maintain the workflows.
     Keep plain-language explanations up top and technical reference (IDs, payloads, mappings) further down
     or in per-workflow READMEs under docs/workflows/.
  5. Never commit credentials, personal emails, or patient data. Use role-based aliases for contacts.
-->

# [PLACEHOLDER: Project name]

<!-- One or two sentences: what this repository is and what it does, in plain language. -->
This repository holds the automated data workflows, built on [OpenFn](https://www.openfn.org/), that [PLACEHOLDER: what the integration achieves, e.g. "move community health data from CommCare into the national DHIS2 system"].

<!-- One paragraph: where data starts, where it goes, and why that matters. Bold each system name. -->
[PLACEHOLDER: Describe the source system(s) and what is recorded there, the destination system(s), and the problem this solves, for example removing manual re-entry or making data available for national reporting. Say whether data moves one way or both ways, and how often.]

<!-- Optional: programme, funder, partners, standards, licence. -->
This work is delivered [PLACEHOLDER: under the X initiative / for the Ministry of Health of Y], with Open Function (OpenFn) as the [PLACEHOLDER: interoperability implementer / technical partner]. [PLACEHOLDER: Standards followed, e.g. OpenHIE, HL7 FHIR R4.] Code is released under [PLACEHOLDER: licence, e.g. Apache 2.0].

> **Always work on a branch.** If GitHub sync is enabled, every commit to `main` is deployed to the OpenFn project automatically.

---

## Table of contents

- [Who should read this](#who-should-read-this)
- [Programme context and scope](#programme-context-and-scope)
- [System overview](#system-overview)
- [The workflows](#the-workflows)
- [How the workflows work](#how-the-workflows-work)
- [Systems and connections](#systems-and-connections)
- [Data mappings](#data-mappings)
- [Schedules and triggers](#schedules-and-triggers)
- [Administration](#administration)
- [Troubleshooting](#troubleshooting)
- [For developers](#for-developers)
- [Training materials](#training-materials)
- [Reference documents](#reference-documents)
- [Team contacts](#team-contacts)
- [Support and resources](#support-and-resources)

---

## Who should read this

- **Programme and [PLACEHOLDER: health / operations] staff** who want to understand what each workflow does and when it runs: read the [system overview](#system-overview), [the workflows](#the-workflows), and [schedules](#schedules-and-triggers).
- **Developers and integrators** who maintain or adapt the workflows: also read [how the workflows work](#how-the-workflows-work), [data mappings](#data-mappings), and [for developers](#for-developers). The per-workflow READMEs carry field mappings, system codes, and error handling.

---

## Programme context and scope

<!-- What is the goal, stated simply? What is in scope and, just as importantly, what is out of scope? -->
[PLACEHOLDER: The goal in one or two sentences.]

| Integration | Moves data from → to | Workflows |
|---|---|---|
| [PLACEHOLDER: e.g. Aggregate reporting] | [PLACEHOLDER: Source → Destination] | [PLACEHOLDER: WF1] |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

**Out of scope:** [PLACEHOLDER: e.g. districts already entering data directly in DHIS2; individual-level data; historical backfill before YYYY.]

---

## System overview

<!-- Explain where OpenFn sits and what it does (and does not) touch. Add an architecture image if you have one. -->
OpenFn sits in the middle. It reads from [PLACEHOLDER: source systems] and writes to [PLACEHOLDER: destination systems], holding the credentials for both sides so the systems never connect to each other directly.

<!-- Export the solution architecture diagram from Lucidchart as a PNG and save it under docs/images/. -->
![Solution architecture](docs/images/solution-architecture.png)

*Figure: solution architecture. [PLACEHOLDER: one-line caption describing what the diagram shows.] [Source in Lucidchart]([PLACEHOLDER: Lucidchart link])*

**Source systems**

- **[PLACEHOLDER: System name]**: [PLACEHOLDER: what it is and what data lives there].

**Destination systems**

- **[PLACEHOLDER: System name]** (`[PLACEHOLDER: host, version]`): [PLACEHOLDER: what it receives, and from which workflow].

---

## The workflows

<!-- Summary table first, so readers can scan. Then one subsection per workflow. -->
| Workflow | What it does | Details |
|---|---|---|
| **WF1** | [PLACEHOLDER: one-line description in plain language] | [README](docs/workflows/wf1-[PLACEHOLDER]/README.md) |
| **WF2** | [PLACEHOLDER] | [README](docs/workflows/wf2-[PLACEHOLDER]/README.md) |

<!-- Note any dependencies between workflows, e.g. "WF2A dispatches to WF2B" or "P1 must run before P2". -->
[PLACEHOLDER: How the workflows relate to each other, if at all.]

<!-- Copy this block once per workflow. -->
### WF1: [PLACEHOLDER: Source] → [PLACEHOLDER: Destination]

[PLACEHOLDER: Two or three sentences on what this workflow does and why it exists.]

**Key design points**

- [PLACEHOLDER: e.g. Record IDs are derived from the source ID, so re-runs update rather than duplicate.]
- [PLACEHOLDER: e.g. Records with an unmapped facility are held back and retried on the next run.]

<!-- Export the workflow's BPMN diagram from Lucidchart as a PNG and save it under docs/images/. -->
![WF1 BPMN diagram](docs/images/wf1-bpmn.png)

*Figure: WF1 business process. [Source in Lucidchart]([PLACEHOLDER: Lucidchart link])*

**Trigger:** [PLACEHOLDER: e.g. cron `0 */6 * * *`, or webhook].

**Status:** [PLACEHOLDER: Live / In testing / Blocked on X].

**Full documentation:** [docs/workflows/wf1-[PLACEHOLDER]/README.md](docs/workflows/wf1-[PLACEHOLDER]/README.md)

---

## How the workflows work

<!-- Describe patterns shared across workflows once here, so per-workflow docs stay short. Delete any that do not apply. -->

### Picking up only what changed

[PLACEHOLDER: e.g. Each workflow stores a cursor (last run timestamp) and only asks the source for records updated since then. Say where the cursor lives: state, a Collection, or a sheet.]

### Not creating duplicates

[PLACEHOLDER: e.g. Destination IDs are calculated from the source record ID, so re-running the same record updates it in place.]

### Handling errors and notifications

[PLACEHOLDER: e.g. Failed records are logged to a Google Sheet and a summary email goes to the admin list.]

### Ending cleanly when there is nothing to do

If a run finds no new records, it stops quietly rather than reporting an error. This is normal during quiet periods.

---

## Systems and connections

| System | Role | Environment / address | OpenFn adaptor |
|---|---|---|---|
| [PLACEHOLDER: e.g. DHIS2] | [PLACEHOLDER: Destination (WF1, WF2)] | `[PLACEHOLDER: https://...]` | [`dhis2`](https://docs.openfn.org/adaptors/packages/dhis2-docs) |
| (transforms) | Data shaping | n/a | [`common`](https://docs.openfn.org/adaptors/packages/common-docs) |

Credentials are not kept in this repository. They live in the OpenFn app under **Project Settings → Credentials**.

---

## Data mappings

<!-- Point to where field-level mappings live. Keep detailed tables in per-workflow READMEs or the mapping workbook. -->
Every workflow validates required fields before writing to a destination system. Field-by-field mappings live in:

| Workflow | Mapping reference |
|---|---|
| WF1 | [PLACEHOLDER: link to mapping spec / workbook / Collection key] |
| WF2 | [PLACEHOLDER] |

<!-- Optional: if workflows share identifiers across systems, list them. -->
<!--
### Shared identifiers

| Identifier | System code | Used by |
|---|---|---|
| [PLACEHOLDER] | `[PLACEHOLDER]` | [PLACEHOLDER] |
-->

---

## Schedules and triggers

| Workflow | Trigger type | Schedule | Fires at (UTC) | Enabled |
|---|---|---|---|---|
| WF1 | cron | [PLACEHOLDER: every 6 hours] (`0 */6 * * *`) | [PLACEHOLDER: 00:00, 06:00, 12:00, 18:00] | [PLACEHOLDER: yes / no] |
| WF2 | webhook | on demand | n/a | [PLACEHOLDER] |

Cron triggers run in **UTC** unless a different timezone is set on the trigger. [PLACEHOLDER: Add the local offset, e.g. 00:00 UTC is 03:00 EAT (UTC+3).]

Any workflow can also be started by hand from the OpenFn app with the **Run** button.

---

## Administration

### Where it lives

- **Implementer:** [PLACEHOLDER: e.g. Open Function (OpenFn)]
- **Deployment:** [PLACEHOLDER: OpenFn-hosted (app.openfn.org) or self-hosted; include the instance URL]
- **OpenFn project:** [[PLACEHOLDER: project ID]](https://app.openfn.org/projects/[PLACEHOLDER: project-id]/w)
- **Code repository:** [github.com/OpenFn/[PLACEHOLDER: repo]](https://github.com/OpenFn/[PLACEHOLDER: repo])
- **Maintenance:** [PLACEHOLDER: who is responsible for maintenance, security updates, and monitoring, and for what period; note any handover date and receiving team]

### Standards and security

- **Data standards:** [PLACEHOLDER: e.g. HL7 FHIR R4, OpenHIE patterns]
- **Security:** [PLACEHOLDER: e.g. HTTPS everywhere, OAuth2 where supported, role-based access, personal data handling under local policy]
- **Monitoring:** every run and its logs are visible in the OpenFn app under **History**. [PLACEHOLDER: add email summaries or log sheets, if used.]

### Keeping it working

The workflows depend on a few things staying true. If any of these change, a workflow may need updating:

- [PLACEHOLDER: e.g. DHIS2 keeps the programs, data elements, and codes the workflows expect.]
- [PLACEHOLDER: e.g. Each facility maps to a matching org unit.]

### Making changes

- **Credentials:** update them in the OpenFn app under **Project Settings → Credentials**.
- **Mappings or codes:** [PLACEHOLDER: where to edit, e.g. update the mapping workbook, then re-run the mappings workflow].
- **Version control:** work on a branch, open a pull request, then merge to `main`. If GitHub sync is on, merging to `main` deploys to OpenFn automatically.

---

## Troubleshooting

Common issues are below. Problems specific to one workflow are in that workflow's README.

| Symptom | Likely cause | What to check |
|---|---|---|
| Sign-in or authorization errors | A credential expired or is wrong | Update it in **Project Settings → Credentials** |
| Timeouts | The destination system is slow or unreachable | Confirm the system is up and reachable |
| A run does nothing | No new records since the last run | Normal during quiet periods; confirm in the run log |
| Records rejected by the destination | Invalid metadata (IDs, periods, codes) | Compare the payload against destination metadata |
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

---

## For developers

1. **Clone** the repository: `git clone https://github.com/OpenFn/[PLACEHOLDER: repo].git`
2. **Install the OpenFn CLI:** `npm install -g @openfn/cli`
3. **Create a local `tmp/` folder** with a `state.json` file for test input. `tmp/` is git-ignored; never commit real data.

### Repository layout

```
├── workflows/          # OpenFn project code, managed by the CLI and GitHub sync
│   └── [workflow-name]/
│       ├── workflow.json
│       └── *.js        # one file per step
├── docs/               # project documentation (safe from CLI pulls)
│   ├── images/
│   └── workflows/      # one README per workflow
├── sample-data/        # example payloads for local testing
├── writing-jobs.md     # guide to writing OpenFn job code
└── claude.md           # instructions for AI-assisted job writing
```

Keep documentation in `docs/`, not `workflows/`. A project pull from OpenFn can overwrite the `workflows/` folder.

### Running locally

Run a single job:

```bash
openfn path/to/job.js -a @openfn/language-[adaptor] -s tmp/state.json
```

Run a whole workflow:

```bash
openfn workflows/[workflow-name]/workflow.json
```

<!-- Optional: document npm scripts, tests, and CLI gotchas the team has hit. -->
[PLACEHOLDER: Any project-specific scripts, tests, or known local CLI issues.]

### Learn more

- [writing-jobs.md](./writing-jobs.md): how to write job code
- [OpenFn CLI docs](https://docs.openfn.org/documentation/cli-walkthrough): writing, running, and testing workflows locally
- [Platform docs](https://docs.openfn.org/documentation/build/steps/step-editor): running and testing workflows in the app
- [Adaptor docs](https://docs.openfn.org/adaptors): functions available for each system

---

## Training materials

<!-- Delete if no training was delivered. -->
[PLACEHOLDER: Link to training recordings, slides, and exercises, and say who was trained.]

---

## Reference documents

| Document | Covers |
|---|---|
| [PLACEHOLDER: Solution design] | Project-wide |
| [PLACEHOLDER: Mapping workbook] | [PLACEHOLDER: WF1, WF2] |
| [Implementation checklist](https://docs.openfn.org/documentation/get-started/implementation-checklist) | Project-wide |

<!-- Optional: publish this README as a site with GitHub Pages (Settings → Pages). Example: https://openfn.github.io/project/ -->

---

## Team contacts

Please do not commit personal emails. Use role-based aliases or link to a project directory.

| Role | Name / team | Contact |
|---|---|---|
| Project lead | [PLACEHOLDER] | [PLACEHOLDER] |
| Integration lead | [PLACEHOLDER] | [PLACEHOLDER] |
| [PLACEHOLDER: System] focal point | [PLACEHOLDER] | [PLACEHOLDER] |
| System owner ([PLACEHOLDER: organisation]) | [PLACEHOLDER] | via project lead |

---

## Support and resources

### Submitting support or feature requests

Open an issue in this repository using the bug report, change request, or feature request template, or email [support@openfn.org](mailto:support@openfn.org). Include:

1. A screenshot of the issue or the relevant area
2. A link to the relevant workflow or run in OpenFn
3. Expected behaviour
4. Actual behaviour
5. Error details (logs or screenshot)
6. Urgency

### External documentation

- [OpenFn documentation](https://docs.openfn.org)
- [PLACEHOLDER: Programme / initiative site]
- [PLACEHOLDER: Destination system API docs]

---

_Last updated: [PLACEHOLDER: Month YYYY]_
