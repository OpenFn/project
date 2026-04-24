---
name: Feature request
about: For new workflows & change requests
title: ''
labels: feature request
assignees: ''
---

## Background, context, and business value

A clear and concise description of what the client wants and WHY.

For example: [Insert use case here]

## The specific request, in as few words as possible

A clear and concise summary of what you want to happen.  
Things to include as needed:

- Workflow Diagram: [Link to workflow diagram]
- Mapping Specs: [Link to field-level mapping specifications]
- API Docs: [Link to relevant API & system documentation]

## Data Volumes & Limits

How many records do we think these jobs will need to process in each run? For
example:

```md
When you GET data from the DB, this may return up to 1000 records. There are no
known Primero API limits for # of records, but there is API paging to consider.
```

## [Workflow Name] Workflow Steps

Create a workflow in which OpenFn will:

### Trigger: Cron Schedule `Every 1 hour`

> What is the trigger type: cron, webhook, or kafka? Be sure to provide a sample
> input.

### Step 1: Get new rows from the PostgreSQL database every 1 hour

- **Adaptor:** [PostgreSQL]
- **Input**: [Link to sample input data]
- **Collections (optional):** [Collection details if required]
- **Credential (optional):** [Also specify If VPN Access is required]
- **Desired Output:** [Description of the desired output]

### Step 2: Clean & transform the data according to the specified mapping rules

- **Adaptor:** [Common]
- **Edge Condition**: [Eg: on success]
- **Mapping Spec**: [Link to mapping spec]
- **Credential (optional):** [Credential details if required]
- **Desired Output:** [Description of the desired output]

### Step 3: Upsert cases in the Primero case management system via externalId `case_id`

> Note: 1 DB row will = 1 case record.

- **Adaptor:** [Primero]
- **Edge Condition**: [Eg: `!state.errors && state.patients.length > 0`]
- **Credential (optional):** [Credential details if required]
- **Desired Output:** [Description of the desired output]

## Testing Guidance

Link to test suite and/or provide examples of scenarios with sample input/output
data to help the dev validate the implementation.

## Toggl

`Name of Toggl project`

## QA Acceptance Criteria

Before marking this issue as ready for review, complete the following checklist:

### 1. Spec Validation
- [ ] All jobs from the specification are implemented in the workflow YAML
- [ ] Job logic matches specification requirements (conditional paths, transformations)
- [ ] Edge cases are handled (empty arrays, null values, missing optional fields)

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

### 5. Documentation
- [ ] Documented test data used (with IDs for reuse)
- [ ] Documented any known issues or limitations
- [ ] Documented assumptions made during implementation

## Pre-Development Checklist

Before handling this issue to a developer, ensure the following items are
checked:

- [ ] Credentials: Ensure all necessary credentials are available and
      documented.
- [ ] Sample Input Data: Ensure sample input data is provided and linked.
- [ ] PII: Verify if any Personally Identifiable Information (PII) is involved
      and ensure proper handling.
- [ ] Collections: Confirm if collections are needed and pre-configure with
      sample data if required.
- [ ] Mapping Spec: Ensure mapping specifications are complete and linked.
- [ ] API Docs: Ensure all relevant API documentation is linked.
- [ ] Workflow Diagrams: Ensure workflow diagrams are complete and linked.
- [ ] VPN Access: Ensure VPN Access is provided if required to run the workflow
- [ ] Toggl: Ensure the Toggl project name is provided.
- [ ] Test Suite: A suite of test that the developer needs to run before handing the issue over to QA. ([Link to template](https://docs.google.com/spreadsheets/d/1GOs906ev239R1vgNRqcitH-LX8C5CTcw/edit?gid=931311464#gid=931311464))
