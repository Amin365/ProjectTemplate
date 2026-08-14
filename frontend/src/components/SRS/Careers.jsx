import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  File,
  FileCheck2,
  FileText,
  MapPin,
  Search,
  Send,
  UploadCloud,
  Users,
  X,
} from "lucide-react";

import {
  Container,
  Eyebrow,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* =========================================================
   JOB DATA
   LATER: REPLACE WITH API DATA
   ========================================================= */

const jobs = [
  {
    id: 1,
    title: "Senior Geologist",
    department: "Exploration & Geoscience",
    location: "Jigjiga, Somali Regional State",
    type: "Full-time",
    workplace: "Field & Office",
    experience: "5+ years",
    postedAt: "August 12, 2026",
    deadline: "September 5, 2026",
    featured: true,
    status: "Open",
    summary:
      "Lead geological investigation, field mapping and mineral exploration activities supporting the enterprise's regional resource development programs.",
    responsibilities: [
      "Lead geological mapping and field investigation programs.",
      "Evaluate mineral occurrences and exploration targets.",
      "Supervise sampling, field data collection and geological documentation.",
      "Prepare technical reports and exploration recommendations.",
      "Coordinate with technical teams, institutions and project partners.",
    ],
    requirements: [
      "Bachelor's or Master's degree in Geology, Applied Geology or related field.",
      "Minimum 5 years of relevant exploration or mining experience.",
      "Strong geological mapping and field investigation capability.",
      "Experience preparing technical reports and geological documentation.",
      "Ability to work across field locations within the Somali Regional State.",
    ],
  },

  {
    id: 2,
    title: "Mining Engineer",
    department: "Mining & Project Development",
    location: "Jigjiga / Project Sites",
    type: "Full-time",
    workplace: "Field & Office",
    experience: "3+ years",
    postedAt: "August 10, 2026",
    deadline: "September 2, 2026",
    featured: false,
    status: "Open",
    summary:
      "Support the technical evaluation, planning and responsible development of mineral projects across the enterprise's portfolio.",
    responsibilities: [
      "Support mine planning and technical project evaluation.",
      "Assess operational and development requirements.",
      "Participate in project feasibility and technical studies.",
      "Coordinate field activities and project documentation.",
    ],
    requirements: [
      "Degree in Mining Engineering or related discipline.",
      "At least 3 years of mining or mineral project experience.",
      "Good technical reporting and analytical skills.",
      "Ability to work in field environments.",
    ],
  },

  {
    id: 3,
    title: "Environmental Officer",
    department: "Environment & Community",
    location: "Jigjiga, Somali Regional State",
    type: "Full-time",
    workplace: "Office & Field",
    experience: "2+ years",
    postedAt: "August 8, 2026",
    deadline: "August 30, 2026",
    featured: false,
    status: "Open",
    summary:
      "Support environmental safeguards, monitoring and community-focused practices across mineral exploration and development activities.",
    responsibilities: [
      "Support environmental monitoring activities.",
      "Assist with environmental documentation and reporting.",
      "Coordinate community and stakeholder engagement activities.",
      "Promote responsible environmental practices at project sites.",
    ],
    requirements: [
      "Degree in Environmental Science, Environmental Engineering or related field.",
      "Relevant environmental or project experience.",
      "Good communication and report-writing skills.",
      "Knowledge of environmental and community safeguards.",
    ],
  },

  {
    id: 4,
    title: "GIS & Geological Data Officer",
    department: "Resource Intelligence",
    location: "Jigjiga, Somali Regional State",
    type: "Full-time",
    workplace: "Office",
    experience: "2+ years",
    postedAt: "August 6, 2026",
    deadline: "August 29, 2026",
    featured: false,
    status: "Open",
    summary:
      "Manage spatial, geological and resource information supporting exploration planning, technical analysis and decision-making.",
    responsibilities: [
      "Maintain geological and spatial datasets.",
      "Prepare maps and geospatial analysis.",
      "Support exploration teams with GIS information.",
      "Maintain structured digital resource records.",
    ],
    requirements: [
      "Degree in GIS, Geology, Geography or related field.",
      "Practical GIS and mapping experience.",
      "Experience with spatial data management.",
      "Strong analytical and documentation skills.",
    ],
  },

  {
    id: 5,
    title: "Investment & Partnership Officer",
    department: "Investment & Partnerships",
    location: "Jigjiga, Somali Regional State",
    type: "Full-time",
    workplace: "Office",
    experience: "3+ years",
    postedAt: "August 4, 2026",
    deadline: "August 27, 2026",
    featured: false,
    status: "Open",
    summary:
      "Support investor engagement, project communication and strategic partnerships connected to regional mineral development opportunities.",
    responsibilities: [
      "Prepare investment and project information.",
      "Support investor communication and engagement.",
      "Coordinate meetings with partners and institutions.",
      "Maintain partnership and opportunity records.",
    ],
    requirements: [
      "Degree in Business, Economics, Management or related discipline.",
      "Minimum 3 years relevant professional experience.",
      "Strong communication and stakeholder management skills.",
      "Excellent written and presentation capability.",
    ],
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const DOCUMENT_TYPES = [
  ...CV_TYPES,
  "image/jpeg",
  "image/png",
];

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/* =========================================================
   HERO
   ========================================================= */

function CareersHero() {
  const openJobs = jobs.filter((job) => job.status === "Open").length;

  return (
    <section className="overflow-hidden border-b border-[var(--color-basalt)]/[0.07] bg-white">
      <Container className="max-w-[1480px]">
        <div
          className="
            grid
            min-h-[620px]
            items-center
            gap-20
            py-20
            lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)]
            lg:gap-36
            lg:py-24
          "
        >
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <BriefcaseBusiness
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-basalt)]/55">
                Careers at SRS Mining Enterprise
              </span>
            </div>

            <h1
              className="
                mt-8
                max-w-[760px]
                font-display
                text-[2.8rem]
                leading-[1.03]
                tracking-[-0.045em]
                text-[var(--color-basalt)]
                md:text-[3.7rem]
              "
            >
              Build your career.
              <span className="block text-[var(--color-sandstone-deep)]">
                Help build the region.
              </span>
            </h1>

            <p className="mt-7 max-w-[640px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              Join a team working across geology, mineral exploration,
              engineering, resource intelligence, environmental responsibility
              and strategic development in the Somali Regional State.
            </p>

            <a
              href="#open-positions"
              className="mt-10 inline-flex min-h-12 items-center gap-2  border rounded-full px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              View open positions
              <ArrowRight size={16} />
            </a>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="border-t border-[var(--color-basalt)]/[0.13]">
              <div className="py-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                  Opportunities
                </span>
              </div>

              <div className="grid grid-cols-2 border-t border-[var(--color-basalt)]/[0.11]">
                <div className="border-r border-[var(--color-basalt)]/[0.11] py-8 pr-7">
                  <strong className="font-display text-5xl font-medium tracking-[-0.05em] text-[var(--color-basalt)]">
                    {String(openJobs).padStart(2, "0")}
                  </strong>

                  <p className="mt-3 text-xs leading-5 text-[var(--color-ink-soft)]">
                    Current open positions
                  </p>
                </div>

                <div className="py-8 pl-7">
                  <strong className="font-display text-5xl font-medium tracking-[-0.05em] text-[var(--color-basalt)]">
                    SRS
                  </strong>

                  <p className="mt-3 text-xs leading-5 text-[var(--color-ink-soft)]">
                    Regional career opportunities
                  </p>
                </div>
              </div>

              <div className="border-y border-[var(--color-basalt)]/[0.11] py-7">
                <div className="flex items-start gap-4">
                  <Users
                    size={19}
                    className="mt-1 shrink-0 text-[var(--color-sandstone-deep)]"
                  />

                  <p className="max-w-md text-sm leading-7 text-[var(--color-ink-soft)]">
                    We look for people who bring technical capability,
                    responsibility and commitment to regional development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   WHY JOIN
   ========================================================= */

function WhyJoin() {
  const areas = [
    {
      number: "01",
      title: "Meaningful work",
      text: "Contribute to projects connected directly to the region's natural resources and long-term economic development.",
    },
    {
      number: "02",
      title: "Technical growth",
      text: "Work across exploration, geoscience, engineering, data, project development and resource management.",
    },
    {
      number: "03",
      title: "Regional impact",
      text: "Help turn geological potential into knowledge, investment, skills, employment and sustainable regional value.",
    },
  ];

  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.58fr_1.42fr] lg:gap-32">
          <div>
            <Eyebrow>Why work with us</Eyebrow>

            <h2 className="mt-5 max-w-[480px] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.55rem]">
              Work with purpose.
              <span className="block">
                Grow with responsibility.
              </span>
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {areas.map((item) => (
              <div
                key={item.number}
                className="border-t border-[var(--color-basalt)]/[0.13] pt-7"
              >
                <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                  {item.number}
                </span>

                <h3 className="mt-6 font-display text-xl text-[var(--color-basalt)]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--color-ink-soft)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   OPEN POSITIONS
   ========================================================= */

function OpenPositions({ onApply }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(jobs.map((job) => job.department)),
    ];
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" || job.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  const featured = filteredJobs.find((job) => job.featured);
  const remaining = filteredJobs.filter((job) => job.id !== featured?.id);

  return (
    <section
      id="open-positions"
      className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-32"
    >
      <Container className="max-w-[1420px]">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:gap-24">
          <div>
            <Eyebrow>Open positions</Eyebrow>

            <h2 className="mt-5 max-w-[580px] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.6rem]">
              Find where your skills
              <span className="block">
                can make an impact.
              </span>
            </h2>
          </div>

          <p className="max-w-[570px] justify-self-end text-sm leading-7 text-[var(--color-ink-soft)]">
            Explore current vacancies and submit your application directly
            through the enterprise recruitment portal.
          </p>
        </div>

        {/* SEARCH / FILTER */}
        <div className="mt-14 grid gap-4 border-y border-[var(--color-basalt)]/[0.12] py-6 md:grid-cols-[1fr_320px]">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]/40"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, department or location..."
              className="
                w-full
                border-0
                bg-transparent
                py-3
                pl-8
                pr-4
                text-sm
                text-[var(--color-basalt)]
                outline-none
                placeholder:text-[var(--color-ink-soft)]/40
              "
            />
          </div>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="
              border
              border-[var(--color-basalt)]/[0.12]
              bg-white
              px-4
              py-3
              text-sm
              text-[var(--color-basalt)]
              outline-none
              focus:border-[var(--color-sandstone-deep)]
            "
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All departments" : item}
              </option>
            ))}
          </select>
        </div>

        {!filteredJobs.length ? (
          <div className="py-20 text-center">
            <BriefcaseBusiness
              size={28}
              className="mx-auto text-[var(--color-sandstone-deep)]"
            />

            <h3 className="mt-5 font-display text-2xl text-[var(--color-basalt)]">
              No matching vacancies.
            </h3>

            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              Try another search or department.
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED JOB */}
            {featured && (
              <article
                className="
                  mt-16
                  grid
                  overflow-hidden
                  bg-[var(--color-basalt)]
                  text-white
                  lg:grid-cols-[.72fr_1.28fr]
                "
              >
                {/* VISUAL SIDE */}
                <div className="relative min-h-[360px] overflow-hidden border-b border-white/10 px-8 py-9 lg:min-h-[440px] lg:border-b-0 lg:border-r">
                  <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border border-white/[0.07]" />

                  <div className="absolute left-10 top-20 h-52 w-52 rounded-full border border-[var(--color-sandstone-deep)]/15" />

                  <span className="relative font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                    Featured vacancy
                  </span>

                  <div className="absolute bottom-10 left-8 right-8">
                    <BriefcaseBusiness
                      size={24}
                      className="text-[var(--color-sandstone-deep)]"
                    />

                    <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
                      Join a technical team working on the region&apos;s
                      resource future.
                    </p>
                  </div>
                </div>

                {/* JOB */}
                <div className="px-8 py-10 md:px-12 md:py-12 lg:px-14 lg:py-14">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-sandstone-deep)]">
                      {featured.department}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-white/25" />

                    <span className="text-xs text-white/40">
                      {featured.type}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-3xl tracking-[-0.03em] md:text-[2.7rem]">
                    {featured.title}
                  </h3>

                  <p className="mt-5 max-w-[650px] text-sm leading-7 text-white/55">
                    {featured.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 border-y border-white/10 py-5">
                    <span className="flex items-center gap-2 text-xs text-white/50">
                      <MapPin
                        size={14}
                        className="text-[var(--color-sandstone-deep)]"
                      />
                      {featured.location}
                    </span>

                    <span className="flex items-center gap-2 text-xs text-white/50">
                      <Clock3
                        size={14}
                        className="text-[var(--color-sandstone-deep)]"
                      />
                      {featured.type}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.13em] text-white/35">
                        Application deadline
                      </span>

                      <strong className="mt-2 block text-sm font-medium">
                        {featured.deadline}
                      </strong>
                    </div>

                    <Button
                      type="button"
                      onClick={() => onApply(featured)}
                      className="min-h-12 bg-[var(--color-sandstone-deep)] px-6 text-white"
                    >
                      Apply for this position
                      <ArrowRight size={15} />
                    </Button>
                  </div>
                </div>
              </article>
            )}

            {/* OTHER JOBS */}
            {!!remaining.length && (
              <div className="mt-14 border-t border-[var(--color-basalt)]/[0.13]">
                {remaining.map((job, index) => (
                  <article
                    key={job.id}
                    className="
                      group
                      grid
                      gap-6
                      border-b
                      border-[var(--color-basalt)]/[0.13]
                      py-9
                      md:grid-cols-[70px_1fr_220px_auto]
                      md:items-center
                      md:gap-8
                    "
                  >
                    <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                      {String(index + 2).padStart(2, "0")}
                    </span>

                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/45">
                        {job.department}
                      </span>

                      <h3 className="mt-3 font-display text-[1.55rem] leading-tight text-[var(--color-basalt)]">
                        {job.title}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                        <span className="flex items-center gap-2 text-[11px] text-[var(--color-ink-soft)]">
                          <MapPin
                            size={12}
                            className="text-[var(--color-sandstone-deep)]"
                          />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-2 text-[11px] text-[var(--color-ink-soft)]">
                          <Clock3
                            size={12}
                            className="text-[var(--color-sandstone-deep)]"
                          />
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[9px] uppercase tracking-[0.13em] text-[var(--color-ink-soft)]/40">
                        Deadline
                      </span>

                      <span className="mt-2 block text-xs font-medium text-[var(--color-basalt)]">
                        {job.deadline}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onApply(job)}
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[var(--color-basalt)]
                        transition
                        group-hover:text-[var(--color-sandstone-deep)]
                      "
                    >
                      Apply
                      <ArrowUpRight size={15} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}

/* =========================================================
   APPLICATION DIALOG
   ========================================================= */

function ApplicationDialog({
  job,
  open,
  onOpenChange,
}) {
  const cvInputRef = useRef(null);
  const docsInputRef = useRef(null);

  const [cv, setCv] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [cvDragActive, setCvDragActive] = useState(false);
  const [docsDragActive, setDocsDragActive] = useState(false);

  const [fileError, setFileError] = useState("");
  const [sent, setSent] = useState(false);

  function validateFile(file, allowedTypes) {
    if (!allowedTypes.includes(file.type)) {
      return "This file type is not supported.";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "Each file must be 5 MB or smaller.";
    }

    return null;
  }

  function handleCvFile(file) {
    setFileError("");

    if (!file) return;

    const error = validateFile(file, CV_TYPES);

    if (error) {
      setFileError(error);
      return;
    }

    setCv(file);
  }

  function handleSupportingFiles(fileList) {
    setFileError("");

    const incoming = Array.from(fileList || []);

    const validFiles = [];

    for (const file of incoming) {
      const error = validateFile(file, DOCUMENT_TYPES);

      if (error) {
        setFileError(
          `${file.name}: ${error}`,
        );
        continue;
      }

      validFiles.push(file);
    }

    setDocuments((current) => [
      ...current,
      ...validFiles,
    ]);
  }

  function removeDocument(index) {
    setDocuments((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!cv) {
      setFileError("Please upload your CV before submitting.");
      return;
    }

    const form = new FormData(event.currentTarget);

    form.append("jobId", String(job.id));
    form.append("jobTitle", job.title);
    form.append("cv", cv);

    documents.forEach((document) => {
      form.append("documents", document);
    });

    /*
      =======================================================
      BACKEND INTEGRATION LATER

      await api.post("/careers/applications", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      =======================================================
    */

    setSent(true);
  }

  function handleOpenChange(nextOpen) {
    if (!nextOpen) {
      setSent(false);
      setCv(null);
      setDocuments([]);
      setFileError("");
    }

    onOpenChange(nextOpen);
  }

  if (!job) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className="
          max-h-[92vh]
          overflow-y-auto
          border-0
          p-0
          sm:max-w-[960px]
          lg:max-w-[1080px]
        "
      >
        {sent ? (
          <ApplicationSuccess
            job={job}
            onClose={() => handleOpenChange(false)}
          />
        ) : (
          <div className="grid lg:grid-cols-[340px_1fr]">
            {/* =================================================
                LEFT JOB PANEL
                ================================================= */}

            <aside className="relative overflow-hidden bg-[var(--color-basalt)] px-7 py-9 text-white md:px-9">
              <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full border border-white/[0.06]" />

              <div className="absolute left-10 top-20 h-44 w-44 rounded-full border border-[var(--color-sandstone-deep)]/15" />

              <div className="relative">
                <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                  Job application
                </span>

                <h2 className="mt-6 font-display text-3xl leading-[1.08] tracking-[-0.03em]">
                  {job.title}
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/45">
                  {job.department}
                </p>

                <div className="mt-8 border-t border-white/12">
                  <div className="flex gap-3 border-b border-white/12 py-5">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0 text-[var(--color-sandstone-deep)]"
                    />

                    <span className="text-xs leading-5 text-white/55">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex gap-3 border-b border-white/12 py-5">
                    <Clock3
                      size={15}
                      className="mt-0.5 shrink-0 text-[var(--color-sandstone-deep)]"
                    />

                    <div>
                      <span className="block text-xs text-white/55">
                        {job.type}
                      </span>

                      <span className="mt-1 block text-[10px] text-white/30">
                        {job.workplace}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 border-b border-white/12 py-5">
                    <FileCheck2
                      size={15}
                      className="mt-0.5 shrink-0 text-[var(--color-sandstone-deep)]"
                    />

                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.12em] text-white/30">
                        Deadline
                      </span>

                      <strong className="mt-2 block text-xs font-medium">
                        {job.deadline}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="text-[10px] uppercase tracking-[0.13em] text-white/30">
                    Before applying
                  </span>

                  <div className="mt-4 space-y-3">
                    {[
                      "Review the vacancy requirements",
                      "Prepare your updated CV",
                      "Attach relevant certificates if available",
                    ].map((item) => (
                      <span
                        key={item}
                        className="flex gap-2 text-[11px] leading-5 text-white/45"
                      >
                        <Check
                          size={12}
                          className="mt-1 shrink-0 text-[var(--color-sandstone-deep)]"
                        />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* =================================================
                APPLICATION FORM
                ================================================= */}

            <div className="bg-white px-6 py-8 md:px-9 md:py-9 lg:px-10">
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-2xl text-[var(--color-basalt)]">
                  Submit your application
                </DialogTitle>

                <DialogDescription className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-ink-soft)]">
                  Complete the form and upload the documents required for this
                  position.
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >
                {/* PERSONAL INFORMATION */}

                <FormSection
                  number="01"
                  title="Personal information"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      name="fullName"
                      label="Full name"
                      required
                      placeholder="Your full name"
                    />

                    <Field
                      name="email"
                      type="email"
                      label="Email address"
                      required
                      placeholder="name@example.com"
                    />

                    <Field
                      name="phone"
                      type="tel"
                      label="Phone number"
                      required
                      placeholder="+251 ..."
                    />

                    <Field
                      name="city"
                      label="Current city"
                      required
                      placeholder="e.g. Jigjiga"
                    />
                  </div>
                </FormSection>

                {/* CV */}

                <FormSection
                  number="02"
                  title="Curriculum vitae"
                >
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) =>
                      handleCvFile(event.target.files?.[0])
                    }
                  />

                  {!cv ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => cvInputRef.current?.click()}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setCvDragActive(true);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setCvDragActive(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setCvDragActive(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setCvDragActive(false);

                        handleCvFile(
                          e.dataTransfer.files?.[0],
                        );
                      }}
                      className={`
                        cursor-pointer
                        border
                        border-dashed
                        px-6
                        py-9
                        text-center
                        transition

                        ${
                          cvDragActive
                            ? "border-[var(--color-sandstone-deep)] bg-[var(--color-sandstone-deep)]/[0.04]"
                            : "border-[var(--color-basalt)]/[0.18] hover:border-[var(--color-sandstone-deep)]/50"
                        }
                      `}
                    >
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sandstone-deep)]/[0.08] text-[var(--color-sandstone-deep)]">
                        <UploadCloud size={20} />
                      </span>

                      <strong className="mt-5 block text-sm font-semibold text-[var(--color-basalt)]">
                        Drop your CV here
                      </strong>

                      <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
                        or click to browse your computer
                      </p>

                      <span className="mt-4 block font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/45">
                        PDF · DOC · DOCX · Maximum 5 MB
                      </span>
                    </div>
                  ) : (
                    <UploadedFile
                      file={cv}
                      onRemove={() => setCv(null)}
                      label="CV"
                    />
                  )}
                </FormSection>

                {/* SUPPORTING DOCUMENTS */}

                <FormSection
                  number="03"
                  title="Supporting documents"
                  optional
                >
                  <input
                    ref={docsInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    onChange={(event) =>
                      handleSupportingFiles(event.target.files)
                    }
                  />

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => docsInputRef.current?.click()}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setDocsDragActive(true);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDocsDragActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDocsDragActive(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDocsDragActive(false);

                      handleSupportingFiles(
                        e.dataTransfer.files,
                      );
                    }}
                    className={`
                      cursor-pointer
                      border
                      border-dashed
                      px-5
                      py-6
                      transition

                      ${
                        docsDragActive
                          ? "border-[var(--color-sandstone-deep)] bg-[var(--color-sandstone-deep)]/[0.04]"
                          : "border-[var(--color-basalt)]/[0.16] hover:border-[var(--color-sandstone-deep)]/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <UploadCloud
                        size={19}
                        className="shrink-0 text-[var(--color-sandstone-deep)]"
                      />

                      <div>
                        <strong className="block text-xs font-semibold text-[var(--color-basalt)]">
                          Add certificates or supporting documents
                        </strong>

                        <span className="mt-1 block text-[10px] text-[var(--color-ink-soft)]">
                          Drag and drop multiple files or click to browse
                        </span>
                      </div>
                    </div>
                  </div>

                  {!!documents.length && (
                    <div className="mt-4 space-y-2">
                      {documents.map((file, index) => (
                        <UploadedFile
                          key={`${file.name}-${index}`}
                          file={file}
                          onRemove={() =>
                            removeDocument(index)
                          }
                        />
                      ))}
                    </div>
                  )}
                </FormSection>

                {/* COVER MESSAGE */}

                <FormSection
                  number="04"
                  title="Application note"
                  optional
                >
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[var(--color-basalt)]">
                      Why are you interested in this role?
                    </span>

                    <textarea
                      name="coverMessage"
                      rows={5}
                      placeholder="Briefly tell us about your interest, experience or suitability for this position..."
                      className="
                        mt-3
                        w-full
                        resize-none
                        border
                        border-[var(--color-basalt)]/[0.14]
                        bg-white
                        px-4
                        py-4
                        text-sm
                        leading-7
                        text-[var(--color-basalt)]
                        outline-none
                        transition
                        placeholder:text-[var(--color-ink-soft)]/35
                        focus:border-[var(--color-sandstone-deep)]
                      "
                    />
                  </label>
                </FormSection>

                {/* ERROR */}

                {fileError && (
                  <div className="mt-6 border-l-2 border-red-500 bg-red-50 px-4 py-3">
                    <p className="text-xs text-red-700">
                      {fileError}
                    </p>
                  </div>
                )}

                {/* CONSENT */}

                <label className="mt-7 flex cursor-pointer items-start gap-3">
                  <input
                    required
                    name="consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[var(--color-basalt)]"
                  />

                  <span className="text-[11px] leading-5 text-[var(--color-ink-soft)]">
                    I confirm that the information provided in this application
                    is accurate and I consent to SRS Mining Enterprise using it
                    for recruitment purposes.
                  </span>
                </label>

                {/* SUBMIT */}

                <div className="mt-8 flex flex-col gap-5 border-t border-[var(--color-basalt)]/[0.10] pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[10px] leading-5 text-[var(--color-ink-soft)]/55">
                    Your CV is required before the application can be submitted.
                  </p>

                  <Button
                    type="submit"
                    variant="dark"
                    className="min-h-12 shrink-0 px-6"
                  >
                    Submit application
                    <Send size={15} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* =========================================================
   FORM SECTION
   ========================================================= */

function FormSection({
  number,
  title,
  optional = false,
  children,
}) {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.10] py-7 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
          {number}
        </span>

        <h3 className="text-xs font-semibold text-[var(--color-basalt)]">
          {title}
        </h3>

        {optional && (
          <span className="ml-auto text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/40">
            Optional
          </span>
        )}
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-[var(--color-basalt)]">
        {label}

        {required && (
          <span className="ml-1 text-[var(--color-sandstone-deep)]">
            *
          </span>
        )}
      </span>

      <input
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        className="
          mt-3
          w-full
          border
          border-[var(--color-basalt)]/[0.14]
          bg-white
          px-4
          py-3.5
          text-sm
          text-[var(--color-basalt)]
          outline-none
          transition
          placeholder:text-[var(--color-ink-soft)]/35
          focus:border-[var(--color-sandstone-deep)]
        "
      />
    </label>
  );
}

/* =========================================================
   UPLOADED FILE
   ========================================================= */

function UploadedFile({
  file,
  onRemove,
  label,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        border
        border-[var(--color-basalt)]/[0.10]
        px-4
        py-3
      "
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--color-sandstone-deep)]/[0.08] text-[var(--color-sandstone-deep)]">
        <FileText size={16} />
      </span>

      <div className="min-w-0 flex-1">
        {label && (
          <span className="block text-[9px] uppercase tracking-[0.12em] text-[var(--color-sandstone-deep)]">
            {label}
          </span>
        )}

        <strong className="mt-0.5 block truncate text-xs font-medium text-[var(--color-basalt)]">
          {file.name}
        </strong>

        <span className="mt-0.5 block text-[9px] text-[var(--color-ink-soft)]/50">
          {formatFileSize(file.size)}
        </span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="flex h-8 w-8 items-center justify-center text-[var(--color-ink-soft)]/45 transition hover:text-red-600"
        aria-label={`Remove ${file.name}`}
      >
        <X size={15} />
      </button>
    </div>
  );
}

/* =========================================================
   APPLICATION SUCCESS
   ========================================================= */

function ApplicationSuccess({
  job,
  onClose,
}) {
  return (
    <div className="grid min-h-[560px] lg:grid-cols-[.75fr_1.25fr]">
      <div className="relative overflow-hidden bg-[var(--color-basalt)] px-8 py-10 text-white">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full border border-white/[0.07]" />

        <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
          Recruitment
        </span>

        <div className="absolute bottom-10 left-8 right-8">
          <BriefcaseBusiness
            size={23}
            className="text-[var(--color-sandstone-deep)]"
          />

          <h3 className="mt-5 font-display text-2xl">
            {job.title}
          </h3>

          <p className="mt-2 text-xs text-white/40">
            {job.department}
          </p>
        </div>
      </div>

      <div className="flex items-center px-8 py-12 md:px-12">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sandstone-deep)]/[0.10] text-[var(--color-sandstone-deep)]">
            <Check size={22} />
          </span>

          <span className="mt-8 block font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
            Application submitted
          </span>

          <h2 className="mt-4 max-w-lg font-display text-3xl leading-tight tracking-[-0.03em] text-[var(--color-basalt)]">
            Your application has been received.
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--color-ink-soft)]">
            Thank you for applying for the {job.title} position. Your
            information and documents have been submitted for recruitment
            review.
          </p>

          <Button
            type="button"
            variant="dark"
            onClick={onClose}
            className="mt-8 min-h-12 px-6"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATION PROCESS
   ========================================================= */

function HiringProcess() {
  const steps = [
    {
      number: "01",
      title: "Apply online",
      text: "Submit your information, CV and relevant supporting documents.",
    },
    {
      number: "02",
      title: "Application review",
      text: "Recruitment reviews applications against the requirements of the vacancy.",
    },
    {
      number: "03",
      title: "Shortlisting",
      text: "Qualified candidates may be contacted for the next stage of the recruitment process.",
    },
    {
      number: "04",
      title: "Selection",
      text: "Final assessment and employment procedures are completed for selected candidates.",
    },
  ];

  return (
    <section className="bg-[var(--color-basalt)] py-24 text-white md:py-28">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[.62fr_1.38fr] lg:gap-32">
          <div>
            <Eyebrow tone="mica">
              Recruitment process
            </Eyebrow>

            <h2 className="mt-5 max-w-[470px] font-display text-3xl leading-[1.1] tracking-[-0.03em] md:text-[2.55rem]">
              From application to
              <span className="block">
                opportunity.
              </span>
            </h2>

            <p className="mt-6 max-w-[400px] text-sm leading-7 text-white/50">
              A clear recruitment process helps candidates understand what
              happens after an application is submitted.
            </p>
          </div>

          <div className="border-t border-white/15">
            {steps.map((step) => (
              <div
                key={step.number}
                className="
                  grid
                  gap-5
                  border-b
                  border-white/15
                  py-7
                  md:grid-cols-[70px_210px_1fr]
                "
              >
                <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                  {step.number}
                </span>

                <h3 className="font-display text-xl">
                  {step.title}
                </h3>

                <p className="max-w-xl text-sm leading-6 text-white/50">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   CAREERS PAGE
   ========================================================= */

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleApply(job) {
    setSelectedJob(job);
    setDialogOpen(true);
  }

  return (
    <>
      <CareersHero />

      <WhyJoin />

      <OpenPositions onApply={handleApply} />

      <HiringProcess />

      <ApplicationDialog
        job={selectedJob}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}