import { useState } from 'react';
import api from '@/app/api/apislice';
import DataTable from '@/components/shared/Tables/Datatable';
import { Badge } from '@/components/ui/badge';

async function fetchContacts({ page, limit }) {
  const res = await api.get('/contacts', { params: { page, limit } });
  const payload = res.data ?? {};
  const rows = payload.data ?? [];
  const total = payload.meta?.total ?? rows.length;
  return {
    data: rows,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export default function ContactsAdmin() {
  const [selected, setSelected] = useState(null);

  const columns = [
    {
      key: 'id',
      header: 'ID',
      render: (row) => row.id,
    },
    {
      key: 'name',
      header: 'Name',
      render: (row) => row.name,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      render: (row) => row.email,
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (row) => row.phone || '—',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge variant="secondary">{row.status || 'new'}</Badge>,
      sortable: true,
    },
    {
      key: 'createdAt',
      header: 'Submitted',
      render: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        title="Contact submissions"
        subtitle="Messages sent from the public contact form"
        queryKey="contacts"
        fetchFn={fetchContacts}
        columns={columns}
        rowKey={(row) => row.id}
        onRowClick={(row) => setSelected(row)}
        searchable={false}
        columnPrefsEnabled={false}
        savedViewsEnabled={false}
        exportable={false}
        emptyMessage="No contact submissions yet."
      />

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
