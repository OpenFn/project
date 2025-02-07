cursor($.lastSync || '2024-12-31T00:00:00.000Z');
cursor('now', { key: 'lastSync' });
// Fetch data from database
sql({ query: `select(*) from patients where created_at > ${$.lastSync}` });

fn(state => {
  state.patients = state.data.map(patient => {
    return {
      id: patient.uuid,
      name: patient.first_name + ' ' + patient.last_name,
      bod: patient.birth_date,
    };
  });
  return state;
});
