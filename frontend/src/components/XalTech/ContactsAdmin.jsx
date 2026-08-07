import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import api from '@/app/api/apislice';

async function fetchContacts() {
  const res = await api.get('/contacts');
  return res.data;
}

export default function ContactsAdmin() {
  const { data, error, isLoading } = useQuery(['contacts'], fetchContacts, { retry: false });
  const [selected, setSelected] = useState(null);

  if (isLoading) return <div>Loading contacts…</div>;
  if (error) return <div>Error loading contacts</div>;

  const rows = data?.data || [];

  return (
    <div>
      <h2>Contact submissions</h2>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone}</td>
              <td>{r.status}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="contact-details">
          <h3>Details for {selected.name}</h3>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p><strong>Message:</strong></p>
          <p>{selected.message}</p>
          <p><strong>Status:</strong> {selected.status}</p>
        </div>
      )}
    </div>
  );
}
