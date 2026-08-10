---
name: Change request
about: For changes to existing workflows or addition of new workflows requested by a client
title: '[CR] '
labels: change request
assignees: ''
---

## Change Request Metadata

| Field | Details |
|---|---|
| **Change Type** | <!-- Choose one: Workflow Logic Change / Mapping & Field Update / New Workflow --> |
| **Requested By** | <!-- Full name of client contact who raised this request --> |
| **Received Via** | <!-- E.g. email, call, meeting, support ticket — link or attach source if available --> |
| **Date Received** | <!-- YYYY-MM-DD --> |
| **Affected Workflow(s)** | <!-- E.g. WF04 – Prescription Sync --> |
| **Workflow Diagram** | <!-- [Link to workflow diagram] --> |
| **Business Value** | <!-- Describe the why in short --> |
| **Priority** | <!-- High / Medium / Low --> |

## Background, Context, and Business Value

A clear and concise description of what the client wants and WHY this change is needed.

For example: [Insert use case here]

## Description of Current Behavior

What does the workflow currently do? What is the baseline we are changing from?

## Description of Requested Change

A clear and concise summary of what should change.  
Things to include as needed:

- Workflow Diagram: [Link to workflow diagram]
- Mapping Specs: [Link to field-level mapping specifications]
- API Docs: [Link to relevant API & system documentation]

## Impact Assessment

- **Workflows affected:** <!-- List all workflows impacted, including downstream dependencies -->
- **Breaking change?** <!-- Yes / No — will this change affect existing data or integrations in a non-backwards-compatible way? -->
- **Downtime required?** <!-- Yes / No -->
- **Collections affected?** <!-- Yes / No — if yes, describe -->
- **Credentials affected?** <!-- Yes / No — if yes, describe -->

## Data Volumes & Limits

How many records do we think these jobs will need to process in each run? For example:

```md
When you GET data from the DB, this may return up to 1000 records. There are no
known Primero API limits for # of records, but there is API paging to consider.
```

## [Workflow Name] Workflow Steps

Describe the updated or new workflow. OpenFn will:

### Trigger: Cron Schedule `Every 1 hour`

> What is the trigger type: cron, webhook, or kafka? Be sure to provide a sample input.

### Step 1: [Step description]

- **Adaptor:** [Adaptor name]
- **Input**: [Link to sample input data]
- **Collections (optional):** [Collection details if required]
- **Credential (optional):** [Also specify if VPN access is required]
- **Desired Output:** [Description of the desired output]

### Step 2: [Step description]

- **Adaptor:** [Common]
- **Edge Condition**: [E.g. on success]
- **Mapping Spec**: [Link to mapping spec]
- **Credential (optional):** [Credential details if required]
- **Desired Output:** [Description of the desired output]

## Testing Guidance

Link to test suite and/or provide examples of scenarios with sample input/output data to help the dev validate the implementation.

## Toggl

`Name of Toggl project`

## QA Acceptance Criteria

Before marking this issue as ready for review, complete the following checklist:

### 1. Spec Validation
- [ ] All changes from the specification are implemented in the workflow YAML
- [ ] Job logic matches specification requirements (conditional paths, transformations)
- [ ] Edge cases are handled (empty arrays, null values, missing optional fields)
- [ ] Prior behavior that is NOT changing has been verified as unaffected

### 2. Technical Validation
- [ ] Workflow executes successfully with test data
- [ ] Each job works correctly in isolation
- [ ] `state.data` is cleaned up at the end of each job (only data needed for next job is retained)
- [ ] Null/undefined scenarios are handled gracefully

### 3. Target System Verification
- [ ] Logged into target system and manually verified created/updated records
- [ ] Verified field-level mapping accuracy for all mapped fields (not just record existence)
- [ ] Confirmed relationships/references are correctly established
- [ ] Checked audit trails (if available)

### 4. Test Coverage
- [ ] Tested new record creation
- [ ] Tested update of existing records (if applicable)
- [ ] Tested duplicate handling
- [ ] Tested with missing optional fields
- [ ] Tested with missing required fields (fails gracefully)
- [ ] Regression tested unchanged workflow paths

### 5. Documentation
- [ ] Documented test data used (with IDs for reuse)
- [ ] Documented any known issues or limitations
- [ ] Documented assumptions made during implementation
- [ ] Updated any affected mapping specs or workflow diagrams to reflect the change

## Pre-Development Checklist

Before handing this issue to a developer, ensure the following items are checked:

- [ ] **Client sign-off:** Confirm the change request is approved by the client contact named above
- [ ] **Credentials:** Ensure all necessary credentials are available and documented
- [ ] **Sample Input Data:** Ensure sample input data is provided and linked
- [ ] **PII:** Verify if any Personally Identifiable Information (PII) is involved and ensure proper handling
- [ ] **Collections:** Confirm if collections are affected and update with sample data if required
- [ ] **Mapping Spec:** Ensure mapping specifications are complete, updated, and linked
- [ ] **API Docs:** Ensure all relevant API documentation is linked
- [ ] **Workflow Diagrams:** Ensure workflow diagrams are updated and linked
- [ ] **Impact Assessment:** Confirm all affected workflows and dependencies are identified
- [ ] **VPN Access:** Ensure VPN access is provided if required to run the workflow
- [ ] **Toggl:** Ensure the Toggl project name is provided
- [ ] **Test Suite:** A suite of tests that the developer needs to run before handing the issue over to QA ([Link to template](https://docs.google.com/spreadsheets/d/1GOs906ev239R1vgNRqcitH-LX8C5CTcw/edit?gid=931311464#gid=931311464))
