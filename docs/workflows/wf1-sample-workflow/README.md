<!--
  HOW TO USE THIS TEMPLATE
  1. Copy this folder for each workflow: docs/workflows/wf<N>-<short-name>/README.md
     Use the same short name as the workflow's folder under workflows/, so code and docs are easy to match.
  2. Save this workflow's images (BPMN export, Lightning screenshot) in the same folder.
  3. Replace every [PLACEHOLDER: ...] and delete sections that do not apply.
  4. Project-wide information (team contacts, project setup, shared patterns, system addresses) lives in the
     main README. Link to it instead of repeating it here, so there is only one place to update.
  5. Part 1 is for everyone, including programme staff. Part 2 is technical reference for developers.
  6. Never commit credentials, personal emails, or patient data.
-->

# WF[PLACEHOLDER: N]: [PLACEHOLDER: Source] → [PLACEHOLDER: Destination]

**Project:** [PLACEHOLDER: project name] | **Status:** [PLACEHOLDER: Live / In testing / Blocked] | **Last updated:** [PLACEHOLDER: Month YYYY]

**OpenFn workflow:** [Open in OpenFn](https://app.openfn.org/projects/[PLACEHOLDER: project-id]/w/[PLACEHOLDER: workflow-id])

← [Back to the project README](../../../README.md)

---

## Table of contents

**Part 1: Overview**
- [Overview](#overview)
- [Workflow diagram](#workflow-diagram)
- [Schedule and triggers](#schedule-and-triggers)
- [How to run](#how-to-run)

**Part 2: Technical reference**
- [Steps](#steps)
- [Source and destination](#source-and-destination)
- [Mapping](#mapping)
- [Avoiding duplicates](#avoiding-duplicates)
- [State and configuration](#state-and-configuration)
- [Error handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Open questions](#open-questions)
- [Reference documents](#reference-documents)

---

# Part 1: Overview

## Overview

<!-- What does this workflow do, and why does it exist? Plain language, two short paragraphs. -->
[PLACEHOLDER: What this workflow moves, from where to where.]

[PLACEHOLDER: The problem it solves, e.g. manual re-entry, data split across two systems.]

**Scope:** [PLACEHOLDER: what one record represents, e.g. one event per facility per quarter.]

**Out of scope:** [PLACEHOLDER: e.g. GPS coordinates are not sent; districts entering directly in DHIS2 are excluded.]

<!-- Optional: the few facts that shape the whole design and what they mean. -->
| Design point | What it means |
|---|---|
| [PLACEHOLDER: e.g. The destination is an event program, not Tracker] | [PLACEHOLDER: e.g. No tracked entity or enrollment is created] |
| [PLACEHOLDER: e.g. Facility name is free text in the source] | [PLACEHOLDER: e.g. Unmatched names are rejected for correction, never guessed] |

---

## Workflow diagram

<!-- Export the BPMN diagram from Lucidchart as a PNG and save it in this folder. -->
![WF[PLACEHOLDER: N] BPMN diagram](wf[PLACEHOLDER: n]-bpmn.png)

*Figure: WF[PLACEHOLDER: N] business process. [Source in Lucidchart]([PLACEHOLDER: Lucidchart link])*

<!-- Optional: screenshot of the workflow canvas in OpenFn. -->
<!-- ![WF1 in OpenFn](wf1-openfn.png) -->

---

## Schedule and triggers

| Trigger | Schedule | Input | Enabled |
|---|---|---|---|
| [PLACEHOLDER: Cron] | [PLACEHOLDER: every 6 hours] (`[PLACEHOLDER: 0 */6 * * *]`), 00:00, 06:00, 12:00, 18:00 UTC | none | [PLACEHOLDER: yes / no] |
| [PLACEHOLDER: Manual / webhook] | on demand | [PLACEHOLDER: e.g. `{ "mode": "reconcile" }`] | [PLACEHOLDER] |

[PLACEHOLDER: Volume per run, e.g. up to 500 records per run; a first run may take several runs to catch up.]

---

## How to run

### Prerequisites

| Item | Detail |
|---|---|
| OpenFn access | Project [PLACEHOLDER: project name] |
| [PLACEHOLDER: Source] credential | [PLACEHOLDER: required fields and access level] |
| [PLACEHOLDER: Destination] credential | [PLACEHOLDER: required fields, e.g. write access to program X] |
| [PLACEHOLDER: Collections / sheets / other config] | [PLACEHOLDER: what must exist before the first run] |

### Automatic run

[PLACEHOLDER: What happens on each scheduled run, in one or two sentences.]

### Manual run

<!-- Delete if the workflow only runs on its schedule. -->
1. Open the workflow in OpenFn and select the [PLACEHOLDER: manual] trigger.
2. Click **Run**, then **New**, and enter:
   ```json
   [PLACEHOLDER: input, e.g. { "mode": "reconcile" }]
   ```
3. [PLACEHOLDER: What this run does and when to use it.]

### Monitoring results

- **OpenFn History:** every run and its logs.
- **[PLACEHOLDER: Notification email]:** [PLACEHOLDER: who receives it and what it contains].
- **[PLACEHOLDER: Error log sheet]:** [PLACEHOLDER: what is logged there].
- **[PLACEHOLDER: Destination system]:** [PLACEHOLDER: where to check the data arrived].

---

# Part 2: Technical reference

## Steps

| Step | Adaptor | What it does |
|---|---|---|
| `[PLACEHOLDER: step-name]` | `@openfn/language-[PLACEHOLDER]@[version]` | [PLACEHOLDER] |
| `[PLACEHOLDER: step-name]` | `@openfn/language-common@[version]` | [PLACEHOLDER] |

---

## Source and destination

### Source

| Parameter | Value |
|---|---|
| System | [PLACEHOLDER: name and base URL] |
| Endpoint | `[PLACEHOLDER: e.g. GET /api/v2/assets/{id}/data/]` |
| Query / filter | [PLACEHOLDER: e.g. records updated since the cursor] |
| Batch size | [PLACEHOLDER] |

### Destination

| Parameter | Value |
|---|---|
| System | [PLACEHOLDER: name and base URL] |
| Endpoint | `[PLACEHOLDER: e.g. POST /api/tracker]` |
| Import settings | [PLACEHOLDER: e.g. CREATE_AND_UPDATE] |
| Target metadata | [PLACEHOLDER: program, stage, data set, org unit level] |

---

## Mapping

Full field-by-field mapping: [PLACEHOLDER: link to mapping spec].

| Source field | Destination field | Rule |
|---|---|---|
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER: e.g. converted to the first day of the quarter] |

<!-- Add short notes for any mapping logic that is not obvious, e.g. how free text is normalised or how locations are resolved. -->

---

## Avoiding duplicates

<!-- How does a re-run update rather than duplicate? Delete if not applicable. -->
[PLACEHOLDER: e.g. Each event ID is derived from facility + period, so re-posting the same facility-quarter updates the existing event.]

> ⚠️ [PLACEHOLDER: Any condition that breaks this, e.g. if a facility's org unit ID changes, a new event is created.]

---

## State and configuration

<!-- Cursors, Collections, lookup tables: what is stored, where, and who writes it. -->
| Location | Key | Holds | Written by |
|---|---|---|---|
| [PLACEHOLDER: Collection `wf1-config`] | `[PLACEHOLDER: cursor]` | [PLACEHOLDER: last processed ID and run time] | [PLACEHOLDER: step name] |
| [PLACEHOLDER] | `[PLACEHOLDER]` | [PLACEHOLDER] | [PLACEHOLDER: loaded manually] |

---

## Error handling

<!-- What happens to records that fail? Where are they logged, and how are they replayed? -->
[PLACEHOLDER: e.g. Rejected records do not block the batch. They are logged to the error sheet with a reason, and replayed by the manual run once corrected.]

| Reason | Meaning | Fix |
|---|---|---|
| `[PLACEHOLDER: e.g. facility_unresolved]` | [PLACEHOLDER] | [PLACEHOLDER] |

---

## Troubleshooting

For project-wide issues (credentials, timeouts), see the [project README](../../../README.md#troubleshooting).

| Symptom | Likely cause | Fix |
|---|---|---|
| [PLACEHOLDER] | [PLACEHOLDER] | [PLACEHOLDER] |

---

## Development

For project setup, see the [project README](../../../README.md#for-developers). Workflow-specific notes:

```bash
[PLACEHOLDER: e.g. openfn workflows/wf1-sample-workflow/workflow.json -s tmp/state.json]
```

[PLACEHOLDER: Tests, sample input in sample-data/, or local gotchas specific to this workflow.]

---

## Open questions

<!-- Remove rows as they are resolved; record the decision in the Master Solution Design Deck. -->
| Ref | Question | Owner | Status |
|---|---|---|---|
| OQ-01 | [PLACEHOLDER] | [PLACEHOLDER: role or team] | [PLACEHOLDER: Open] |

---

## Reference documents

| Document | Link |
|---|---|
| OpenFn workflow | [Open in OpenFn](https://app.openfn.org/projects/[PLACEHOLDER: project-id]/w/[PLACEHOLDER: workflow-id]) |
| Workflow code | [`workflows/[PLACEHOLDER: folder]/`](../../../workflows/[PLACEHOLDER: folder]/) |
| Mapping spec | [PLACEHOLDER: link] |
| BPMN diagram (Lucidchart) | [PLACEHOLDER: link] |
| GitHub issues | [PLACEHOLDER: link to issues filtered by workflow label] |

**Contacts:** see [Team contacts](../../../README.md#team-contacts) in the project README.
