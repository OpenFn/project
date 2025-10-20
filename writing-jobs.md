## Core Concepts

### What is an OpenFn Job?

A Job performs a specific task like fetching data from
Salesforce, converting JSON to FHIR standard, or uploading data to a database.

Each job uses exactly ONE adaptor (connector) that provides helper functions
(Operations) for communicating with data sources.

A job is a single step in a workflow - a series of steps which perform some high
level business task, like synchronising patient data or aggregating form submissions
or automating business processes.

### JavaScript DSL

Jobs are written in a Javascript-like DSL. The `$` symbol and top-level function
calls are special, otherwise the language is the same.

Top level function calls are called Operations. They automate the processing of state.

The `$` symbol is syntactic sugar to reference state. It can only be used within
an argument to an operation.

### State and Operations

- Jobs take an input JavaScript object called **State** and execute
  **Operations** in series
- Operations transform state sequentially - the output of one becomes the input
  of the next
- The final state object is returned as output

### Critical Rules for Job Writing

#### 1. Operations Must Be at Top Level

Operations ONLY work at the top level of job code. Never nest operations inside
callbacks.

**✅ CORRECT:**

```javascript
get('/patients');
each('$.data.patients[*]', state => {
  item.id = `item-${index}`;
  return state;
});
post('/patients', dataValue('patients'));
```

**❌ WRONG:**

```javascript
get('/patients', {}, state => {
  // This will fail - nested operation!
  each('$.data.patients[*]', (item, index) => {
    item.id = `item-${index}`;
  });
});
```

#### 2. Always Return State from Callbacks

Callbacks must ALWAYS return the state object.

**✅ CORRECT:**

```javascript
fn(state => {
  state.transformed = state.data.map(item => ({ ...item }));
  return state; // Critical!
});
```

**❌ WRONG:**

```javascript
fn(state => {
  state.transformed = state.data.map(item => ({ ...item }));
  // Missing return!
});
```

#### 3. Reading State Lazily

Use the Lazy State Operator `$` or arrow functions to read state values at the
correct time.

**✅ CORRECT:**

```javascript
get('/some-data');
post('/upload', $.data); // Using $ operator
// OR
post('/upload', state => state.data); // Using arrow function
```

**❌ WRONG:**

```javascript
get('/some-data');
post('/upload', state.data); // Will be undefined!
```

## The Lazy State Operator ($)

The `$` operator is syntactic sugar for `(state) => state`. It ensures values
are resolved at runtime, not load-time.

### Usage Examples:

```javascript
// Basic usage
upsert('patient', $.data.patients[0]);

// Inside objects
create('agent', {
  name: $.patient.name,
  country: $.patient.country,
});

// String templates
get(`/patients/${$.patient.id}`);

// Expressions
create({
  profit: $.report.revenue - $.report.expenses,
});

// With mapping
each($.data.patients, post(`patients/${$.data.id}`, $.data));
```

### Important: $ is NOT state

- Cannot assign to `$`
- Cannot use outside operation arguments
- Can only READ from state, never WRITE

**❌ These are ERRORS:**

```javascript
const url = $.data.url; // Wrong
$.data.x = 10; // Wrong
fn(state => {
  $.data.x = 10; // Wrong
});
```

## Common Patterns

### 1. Initializing Variables

```javascript
fn(state => {
  state.results = [];
  state.lookup = {};
  state.keyMap = { AccountName: 'C__Acc_Name' };
  state.maxPageSize = 200;
  state.convertToSF = item => {
    /* transform logic */
  };
  return state;
});

// Rest of job code...
```

### 2. Mapping Objects

```javascript
// Fetch data
get('https://system-a.com/api/patients/123');

// Transform inline
post('https://system-b.com/api/records/123', state => ({
  id: state.data.id,
  name: `${state.data.first_name} ${state.data.last_name}`,
  metadata: state.data.user_data,
}));
```

### 3. Iteration with each()

```javascript
// Transform each item
each(
  '$.data.patients[*]',
  upsert('Person__c', 'Participant_PID__c', state => ({
    Participant_PID__c: state.data.pid,
    First_Name__c: state.data.participant_first_name,
    Surname__c: state.data.participant_surname,
  }))
);
```

### 4. Using Cursors

```javascript
// Set cursor
cursor('2024-04-08T12:00:00.0000');
// OR
cursor(state => state.cursor, { defaultValue: 'today' });

// Use cursor in queries
get(state => `/registrations?since=${state.cursor}`);

// Update cursor
cursor('now');
```

### 5. Promise-like Operations (.then() and .catch())

```javascript
// Using .then()
get($.data.url).then(state => {
  console.log(state);
  return state;
});

// Error handling with .catch()
get('patients').catch((error, state) => {
  state.error = error;
  console.log('Error occurred:', error);
  return state; // Continue execution
  // OR
  throw error; // Stop execution
});

// Useful with each()
each(
  $.items,
  post(`patient/${$.data.id}`, $.data).then(state => {
    state.completed.push(state.data);
    return state;
  })
);
```

### 6. Cleaning Final State

```javascript
// Return only needed keys
fn(state => {
  return {
    data: state.data,
  };
});

// Or remove sensitive data
fn(state => {
  const { username, password, secrets, ...rest } = state;
  return rest;
});
```

### 7. Using Credential Secrets

```javascript
post('/api/v1/auth/login', {
  body: {
    username: $.configuration.username,
    password: $.configuration.password,
  },
  headers: { 'content-type': 'application/json' },
});
```

## Adaptors and Functions

### Common Operations (from @openfn/language-common)

- `fn(callback)` - Execute arbitrary JavaScript
- `each(jsonPath, operation)` - Iterate over arrays
- `cursor(value, options)` - Manage cursor state
- `dataValue(path)` - Extract data from state

### HTTP Adaptor

```javascript
get('/endpoint');
get('/endpoint', { query: { id: $.data.id } });
post('/endpoint', $.data);
put('/endpoint/:id', $.data);
delete '/endpoint/:id';
```

### Database Operations (e.g., PostgreSQL)

```javascript
sql(state => `SELECT * FROM patients WHERE id = ${state.patientId}`);
insert('patients', $.data);
upsert('patients', 'id', $.data);
```

### DHIS2 Adaptor

```javascript
create('dataValueSets', $.data);
get('dataElements', { filter: 'name:like:ANC' });
update('organisationUnits', $.orgUnitId, $.data);
```

### Salesforce Adaptor

```javascript
create('Account', $.data);
upsert('Contact', 'Email', $.data);
query("SELECT Id, Name FROM Account WHERE Industry = 'Healthcare'");
```

## Best Practices

### 1. Code Organization

- Use multiple small operations rather than few complex ones
- Each operation should do ONE thing
- Keep callbacks simple and focused

### 2. Error Handling

- Let jobs fail when appropriate - this communicates problems
- Use `.catch()` for specific error handling
- Log errors for debugging
- For batch processing, catch individual item errors to prevent one bad item
  from failing the entire batch

### 3. Performance

- Use lazy state (`$`) for cleaner, more efficient code
- Minimize state mutations
- Clean up final state to reduce data size

### 4. Debugging

- Use `console.log()` liberally during development
- Test with small data sets first
- Use the OpenFn CLI to test locally
- Check compiled code with `openfn compile` if needed

### 5. Security

- Never hardcode credentials - use `$.configuration`
- Clean sensitive data from final state
- OpenFn automatically scrubs `configuration` and functions from logs

## Common Pitfalls to Avoid

1. **Nested Operations** - Always keep operations at top level
2. **Forgetting to Return State** - Every callback must return state
3. **Reading State Too Early** - Use `$` or arrow functions
4. **Not Handling Errors** - Add error handling for production code
5. **Bloated Final State** - Clean up state before job completion
6. **Hardcoded Values** - Use configuration or state for dynamic values
7. **Complex Callbacks** - Break complex logic into multiple operations

## Natural Language Support

When users describe what they want to do in natural language:

1. Identify the data source and destination
2. Determine the appropriate adaptor
3. Break the task into discrete operations
4. Use proper state management with `$` or arrow functions
5. Add error handling where appropriate
6. Clean up final state

## Example Complete Job

```javascript
// Initialize
fn(state => {
  state.errors = [];
  state.successful = [];
  return state;
});

// Set cursor for incremental sync
cursor(state => state.cursor, { defaultValue: 'yesterday' });

// Fetch new records
get(state => `/patients?modified_since=${state.cursor}`);

// Transform and upload each patient
each(
  '$.data.patients[*]',
  create('Patient__c', state => ({
    External_ID__c: state.data.id,
    FirstName: state.data.first_name,
    LastName: state.data.last_name,
    Email: state.data.email,
    Phone: state.data.phone,
  }))
    .then(state => {
      state.successful.push(state.data.id);
      return state;
    })
    .catch((error, state) => {
      state.errors.push({
        id: state.data.id,
        error: error.message,
      });
      return state; // Continue processing other items
    })
);

// Update cursor
cursor('now');

// Clean final state
fn(state => {
  return {
    successful: state.successful,
    errors: state.errors,
    total: state.successful.length + state.errors.length,
  };
});
```

## When to Ask for Clarification

Ask users for more information when:

- The adaptor to use is unclear
- Field mappings are ambiguous
- Error handling requirements are unspecified
- Data transformation logic is complex
- Credential configuration is needed
- The workflow design is unclear

## Resources

- Full documentation: https://docs.openfn.org
- Adaptor library: https://docs.openfn.org/adaptors
- Community forum: https://community.openfn.org
- CLI documentation: https://docs.openfn.org/documentation/cli

Remember: Write clear, maintainable code that follows OpenFn patterns. When in
doubt, break complex operations into smaller, simpler steps.
