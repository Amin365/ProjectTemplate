import { useState } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { Building2, CheckCircle2, Mail, MapPin, Phone, School, Users } from 'lucide-react';
import api from '@/app/api/apislice';
import DataTable from '@/components/shared/Tables/Datatable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

async function fetchContacts({ page, limit, searchTerm }) {
  const res = await api.get('/contacts', {
    params: {
      page,
      limit,
      search: searchTerm || undefined,
    },
  });

  const payload = res.data ?? {};
  const rows = payload.data ?? [];
  const total = payload.meta?.total ?? rows.length;

  return {
    data: rows,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

function DetailItem({ icon: Icon, label, value }) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {Icon ? <Icon size={14} /> : null}
        {label}
      </div>
      <div className="mt-2 break-words text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

export default function ContactsAdmin() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth?.user);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const role = String(user?.role?.role || user?.role || '').trim().toLowerCase();
  const isAdmin = role === 'admin' || role === 'super admin';

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const markAsRead = async () => {
    if (!selected || selected.status === 'read') return;

    setUpdating(true);
    try {
      const response = await api.patch(`/contacts/${selected.id}`, { status: 'read' });
      setSelected(response.data?.data || { ...selected, status: 'read' });
      await queryClient.invalidateQueries({ queryKey: ['contacts'] });
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    {
      key: 'requestType',
      header: 'Request',
      render: (row) => (
        <Badge variant={row.requestType === 'school_demo' ? 'default' : 'secondary'}>
          {row.requestType === 'school_demo' ? 'School demo' : 'General'}
        </Badge>
      ),
    },
    {
      key: 'name',
      header: 'Contact',
      render: (row) => (
        <div>
          <div className="font-medium text-slate-900">{row.name}</div>
          <div className="mt-0.5 text-xs text-slate-500">{row.email}</div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'schoolName',
      header: 'School / Organization',
      render: (row) => row.schoolName || '—',
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (row) => row.phone || '—',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'new' ? 'default' : 'secondary'}>
          {row.status || 'new'}
        </Badge>
      ),
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
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#13B8A6]">
              XalTech administration
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A]">Contact requests</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Private administration for website enquiries and school demo bookings.
            </p>
          </div>
          <Badge variant="outline" className="border-slate-300 bg-white px-3 py-1.5">
            Admin only
          </Badge>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <DataTable
            title="Submissions"
            subtitle="Search by contact, email, phone, or school name"
            queryKey="contacts"
            fetchFn={fetchContacts}
            columns={columns}
            rowKey={(row) => row.id}
            onRowClick={(row) => setSelected(row)}
            searchable
            searchPlaceholder="Search contacts or schools..."
            columnPrefsEnabled={false}
            savedViewsEnabled={false}
            exportable={false}
            emptyMessage="No contact submissions yet."
          />
        </div>

        {selected && (
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B1F3A]">{selected.name}</h2>
                  <Badge variant={selected.requestType === 'school_demo' ? 'default' : 'secondary'}>
                    {selected.requestType === 'school_demo' ? 'School demo' : 'General enquiry'}
                  </Badge>
                  <Badge variant="outline">{selected.status || 'new'}</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Submitted {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                {selected.status !== 'read' && (
                  <Button
                    type="button"
                    onClick={markAsRead}
                    disabled={updating}
                    className="gap-2 bg-[#0B1F3A] text-white hover:bg-[#12345c]"
                  >
                    <CheckCircle2 size={16} />
                    {updating ? 'Updating…' : 'Mark as read'}
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
              <DetailItem icon={Mail} label="Email" value={selected.email} />
              <DetailItem icon={Phone} label="Phone" value={selected.phone} />
              <DetailItem icon={Building2} label="Source" value={selected.source || 'xaltech_web'} />

              {selected.requestType === 'school_demo' && (
                <>
                  <DetailItem icon={School} label="School name" value={selected.schoolName} />
                  <DetailItem icon={Building2} label="Requester role" value={selected.schoolRole} />
                  <DetailItem icon={MapPin} label="School location" value={selected.schoolLocation} />
                  <DetailItem
                    icon={Users}
                    label="Approx. students"
                    value={selected.studentCount ? Number(selected.studentCount).toLocaleString() : null}
                  />
                  <DetailItem
                    label="Preferred demo time"
                    value={selected.preferredDemoTime}
                  />
                </>
              )}
            </div>

            <div className="border-t border-slate-200 px-5 py-5 sm:px-6">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Message</div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {selected.message || 'No message provided.'}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
