---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''
---

## Describe the bug and expected behavior

A clear and concise description of what the bug is. Include any error messages
from the run logs and the expected behavior.

## To Reproduce

Here is a [link to a failed run] on OpenFn.org which is indicative of the bug:

1. Using a initial input `{data: {"name": "John Doe"}}` or
   `{"lastSync": "2020-01-01T00:00:00.000Z"}`
2. Run [Name of step] or `step.js`
3. See failed logs

### Step(s) to be updated

- Provide a link to the job itself in GitHub.
- Mention the adaptor being used.
- Provide the state directly or link to a file.

  > ```json
  > {
  >   "configuration": ["SEE LAST PASS: 'client cred'"],
  >   "data": {LINK TO STATE},
  >   "cursor": "2020-01-19 00:00:00"
  > }
  > ```

- Redact any sensitive information and provide instructions for where it can be
  found.

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
