import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock3,
  FileText,
  Handshake,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Users,
} from "lucide-react";

import {
  Container,
  Eyebrow,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";

/* =========================================================
   CONTACT ROUTES
   ========================================================= */

const contactRoutes = [
  {
    icon: Handshake,
    number: "01",
    title: "Investment & partnerships",
    text: "For investors, operators, joint ventures and strategic development partners.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Mineral & technical information",
    text: "For geological information, resource enquiries, technical cooperation and project data.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Institutional enquiries",
    text: "For government bodies, public institutions, development partners and formal correspondence.",
  },
];

/* =========================================================
   HERO VISUAL
   ========================================================= */

function ContactVisual() {
  return (
    <div className="relative hidden min-h-[510px] lg:block">
      {/* large topographic rings */}
      <div className="absolute right-0 top-8 h-[430px] w-[430px] rounded-full border border-[var(--color-basalt)]/[0.06]" />

      <div className="absolute right-[58px] top-[65px] h-[330px] w-[330px] rounded-full border border-[var(--color-basalt)]/[0.06]" />

      <div className="absolute right-[125px] top-[130px] h-[200px] w-[200px] rounded-full border border-[var(--color-sandstone-deep)]/[0.12]" />

      {/* map-like lines */}
      <svg
        viewBox="0 0 620 430"
        className="absolute bottom-6 right-0 w-full max-w-[620px]"
        fill="none"
      >
        <path
          d="M35 278C107 227 169 253 220 198C275 139 324 177 382 122C438 69 503 91 580 46"
          stroke="var(--color-basalt)"
          strokeWidth="1.5"
          opacity="0.12"
        />

        <path
          d="M18 318C97 267 174 304 249 237C318 175 369 226 431 165C485 111 544 123 605 82"
          stroke="var(--color-sandstone-deep)"
          strokeWidth="1.5"
          opacity="0.24"
        />

        <path
          d="M52 355C142 305 207 345 281 289C357 231 414 279 480 222C524 183 563 188 608 151"
          stroke="var(--color-basalt)"
          strokeWidth="1.5"
          opacity="0.09"
        />
      </svg>

      {/* main location */}
      <div className="absolute right-[195px] top-[205px]">
        <span className="absolute -inset-8 rounded-full border border-[var(--color-sandstone-deep)]/[0.12]" />
        <span className="absolute -inset-4 rounded-full border border-[var(--color-sandstone-deep)]/[0.20]" />

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-basalt)] text-[var(--color-sandstone-deep)] shadow-[0_18px_50px_rgba(20,40,35,0.18)]">
          <MapPin size={22} />
        </span>
      </div>

      {/* floating office identity */}
      <div className="absolute bottom-28 left-0 min-w-[265px] border-l-2 border-[var(--color-sandstone-deep)] bg-white py-3 pl-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-sandstone-deep)]">
          Head office
        </span>

        <strong className="mt-2 block font-display text-xl font-medium text-[var(--color-basalt)]">
          Jigjiga
        </strong>

        <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">
          Somali Regional State · Ethiopia
        </span>
      </div>

      {/* coordinate style label */}
      <div className="absolute bottom-8 right-14 text-right">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]/35">
          Enterprise contact point
        </span>

        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-[var(--color-basalt)]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sandstone-deep)]" />
          Somali Regional State
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function ContactHero() {
  return (
    <section className="overflow-hidden border-b border-[var(--color-basalt)]/[0.07] bg-white">
      <Container className="max-w-[1480px]">
        <div
          className="
            grid
            min-h-[650px]
            items-center
            gap-20
            py-20
            lg:grid-cols-[minmax(0,680px)_minmax(0,580px)]
            lg:gap-36
            lg:py-24
          "
        >
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <MessageSquareText
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-basalt)]/55">
                Contact SRS Mining Enterprise
              </span>
            </div>

            <h1
              className="
                mt-8
                font-display
                text-[2.8rem]
                leading-[1.03]
                tracking-[-0.045em]
                text-[var(--color-basalt)]
                sm:text-[3.25rem]
                md:text-[3.7rem]
              "
            >
              Start a conversation.
              <span className="mt-1 block text-[var(--color-sandstone-deep)]">
                Build an opportunity.
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              Whether you are exploring a mineral opportunity, looking for
              technical information or considering a strategic partnership,
              connect with the enterprise through the appropriate channel.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
  href="#enquiry"
  className="inline-flex min-h-12 items-center gap-2 px-6 text-sm font-semibold text-black border border-black rounded-md transition hover:opacity-90"
>
  Send an enquiry
  <ArrowRight size={16} />
</a>

              <a
                href="mailto:info@srsmining.gov.et"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-basalt)]"
              >
                info@srsmining.gov.et
                <ArrowUpRight
                  size={15}
                  className="text-[var(--color-sandstone-deep)]"
                />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-basalt)]/[0.08] pt-6">
              <span className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                <Check
                  size={14}
                  className="text-[var(--color-sandstone-deep)]"
                />
                Investment enquiries
              </span>

              <span className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                <Check
                  size={14}
                  className="text-[var(--color-sandstone-deep)]"
                />
                Technical information
              </span>

              <span className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
                <Check
                  size={14}
                  className="text-[var(--color-sandstone-deep)]"
                />
                Institutional coordination
              </span>
            </div>
          </div>

          <ContactVisual />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   ROUTE YOUR ENQUIRY
   ========================================================= */

function ContactRoutes() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.58fr_1.42fr] lg:gap-32">
          {/* LEFT */}
          <div>
            <Eyebrow>Before you write</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[570px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.55rem]
              "
            >
              Choose the right point of contact.
             
            </h2>

            <p className="mt-6 max-w-[410px] text-sm leading-7 text-[var(--color-ink-soft)]">
              The more context you provide, the easier it is to route your
              enquiry to the appropriate team.
            </p>
          </div>

          {/* ROUTES — NOT CARDS */}
          <div className="border-t border-[var(--color-basalt)]/[0.13]">
            {contactRoutes.map(({ icon: Icon, ...route }) => (
              <div
                key={route.number}
                className="
                  group
                  grid
                  gap-6
                  border-b
                  border-[var(--color-basalt)]/[0.13]
                  py-8
                  md:grid-cols-[58px_240px_1fr]
                  md:gap-8
                "
              >
                <div>
                  <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                    {route.number}
                  </span>

                  <Icon
                    size={19}
                    className="mt-5 text-[var(--color-sandstone-deep)]"
                  />
                </div>

                <h3 className="font-display text-[1.35rem] leading-tight text-[var(--color-basalt)]">
                  {route.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-[var(--color-ink-soft)]">
                  {route.text}
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
   CONTACT FORM
   ========================================================= */

function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="enquiry"
      className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-32"
    >
      <Container className="max-w-[1420px]">
        <div
          className="
            grid
            gap-20
            lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]
            lg:gap-32
          "
        >
          {/* LEFT */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Send an enquiry</Eyebrow>

              <h2
                className="
                  mt-5
                  max-w-[430px]
                  font-display
                  text-3xl
                  leading-[1.1]
                  tracking-[-0.03em]
                  text-[var(--color-basalt)]
                  md:text-[2.55rem]
                "
              >
                Tell us what you are
                <span className="block">
                  working on.
                </span>
              </h2>

              <p className="mt-6 max-w-[390px] text-sm leading-7 text-[var(--color-ink-soft)]">
                Include the nature of your request, your organization and any
                relevant mineral, project or location information.
              </p>

              {/* office details */}
              <div className="mt-10 border-t border-[var(--color-basalt)]/[0.13]">
                <div className="flex gap-4 border-b border-[var(--color-basalt)]/[0.12] py-5">
                  <MapPin
                    size={17}
                    className="mt-1 shrink-0 text-[var(--color-sandstone-deep)]"
                  />

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/50">
                      Head office
                    </span>

                    <p className="mt-2 text-sm leading-6 text-[var(--color-basalt)]">
                      Jigjiga, Somali Regional State
                      <span className="block text-[var(--color-ink-soft)]">
                        Ethiopia
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-[var(--color-basalt)]/[0.12] py-5">
                  <Mail
                    size={17}
                    className="mt-1 shrink-0 text-[var(--color-sandstone-deep)]"
                  />

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/50">
                      Email
                    </span>

                    <a
                      href="mailto:info@srsmining.gov.et"
                      className="mt-2 block text-sm text-[var(--color-basalt)]"
                    >
                      info@srsmining.gov.et
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-[var(--color-basalt)]/[0.12] py-5">
                  <Phone
                    size={17}
                    className="mt-1 shrink-0 text-[var(--color-sandstone-deep)]"
                  />

                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/50">
                      Telephone
                    </span>

                    <p className="mt-2 text-sm text-[var(--color-basalt)]">
                      +251 25 XXX XXXX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SURFACE */}
          <div className="relative">
            {/* subtle accent */}
            <div className="absolute -left-4 top-12 hidden h-[70%] w-px bg-[var(--color-sandstone-deep)]/40 lg:block" />

            {sent ? (
              <div className="min-h-[560px] border border-[var(--color-basalt)]/[0.10] px-8 py-12 md:px-12 md:py-14">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sandstone-deep)]/[0.10] text-[var(--color-sandstone-deep)]">
                  <Check size={22} />
                </span>

                <span className="mt-10 block font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                  Enquiry received
                </span>

                <h3 className="mt-4 max-w-lg font-display text-3xl leading-tight text-[var(--color-basalt)]">
                  Thank you for contacting SRS Mining Enterprise.
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--color-ink-soft)]">
                  Your enquiry has been received and can now be routed to the
                  relevant enterprise function for review.
                </p>

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sandstone-deep)]"
                >
                  Send another enquiry
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="
                  border
                  border-[var(--color-basalt)]/[0.10]
                  bg-white
                  px-7
                  py-9
                  shadow-[0_24px_70px_rgba(20,40,35,0.055)]
                  md:px-10
                  md:py-11
                "
              >
                {/* form header */}
                <div className="border-b border-[var(--color-basalt)]/[0.10] pb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                    Enquiry form
                  </span>

                  <h3 className="mt-3 font-display text-2xl text-[var(--color-basalt)]">
                    How can we assist?
                  </h3>
                </div>

                {/* Name + organization */}
                <div className="grid gap-7 border-b border-[var(--color-basalt)]/[0.10] py-8 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    required
                    placeholder="Your full name"
                  />

                  <Field
                    label="Organization"
                    placeholder="Company or institution"
                  />
                </div>

                {/* Email + phone */}
                <div className="grid gap-7 border-b border-[var(--color-basalt)]/[0.10] py-8 sm:grid-cols-2">
                  <Field
                    label="Email address"
                    required
                    type="email"
                    placeholder="name@example.com"
                  />

                  <Field
                    label="Phone number"
                    type="tel"
                    placeholder="+251 ..."
                  />
                </div>

                {/* Enquiry type */}
                <div className="border-b border-[var(--color-basalt)]/[0.10] py-8">
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[var(--color-basalt)]">
                      What is your enquiry about?
                    </span>

                    <select
                      required
                      defaultValue=""
                      className="
                        mt-3
                        w-full
                        border
                        border-[var(--color-basalt)]/[0.14]
                        bg-white
                        px-4
                        py-4
                        text-sm
                        text-[var(--color-basalt)]
                        outline-none
                        transition
                        focus:border-[var(--color-sandstone-deep)]
                      "
                    >
                      <option value="" disabled>
                        Select enquiry type
                      </option>

                      <option value="investment">
                        Investment & partnership
                      </option>

                      <option value="resource">
                        Mineral & geological information
                      </option>

                      <option value="technical">
                        Technical collaboration
                      </option>

                      <option value="institutional">
                        Institutional coordination
                      </option>

                      <option value="media">
                        Media & public information
                      </option>

                      <option value="general">
                        General enquiry
                      </option>
                    </select>
                  </label>
                </div>

                {/* Subject */}
                <div className="border-b border-[var(--color-basalt)]/[0.10] py-8">
                  <Field
                    label="Subject"
                    required
                    placeholder="Brief title for your enquiry"
                  />
                </div>

                {/* Message */}
                <div className="py-8">
                  <label className="block">
                    <span className="text-[11px] font-semibold text-[var(--color-basalt)]">
                      Message
                    </span>

                    <textarea
                      required
                      rows={7}
                      placeholder="Tell us about your request, project, mineral interest or proposed partnership..."
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
                </div>

                <div className="flex flex-col gap-6 border-t border-[var(--color-basalt)]/[0.10] pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[420px] text-[10px] leading-5 text-[var(--color-ink-soft)]/60">
                    Provide only information relevant to your enquiry. Sensitive
                    project documents should be shared through an approved
                    channel where required.
                  </p>

                  <Button
                    type="submit"
                    variant="dark"
                    className="min-h-12 shrink-0 px-6"
                  >
                    Send enquiry
                    <Send size={15} />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  type = "text",
  required = false,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold text-[var(--color-basalt)]">
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-sandstone-deep)]">*</span>
        )}
      </span>

      <input
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
          py-4
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
   WHAT HAPPENS NEXT
   ========================================================= */

function WhatHappensNext() {
  const steps = [
    {
      number: "01",
      title: "Enquiry received",
      text: "Your message enters the enterprise's communication channel.",
    },
    {
      number: "02",
      title: "Directed internally",
      text: "The enquiry is routed according to its technical, investment or institutional subject.",
    },
    {
      number: "03",
      title: "Relevant follow-up",
      text: "The appropriate function can continue the conversation or request additional information.",
    },
  ];

  return (
    <section className="bg-[var(--color-basalt)] py-24 text-white md:py-28">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[.65fr_1.35fr] lg:gap-32">
          <div>
            <Eyebrow tone="mica">After you contact us</Eyebrow>

            <h2 className="mt-5 max-w-[450px] font-display text-3xl leading-[1.1] tracking-[-0.03em] md:text-[2.55rem]">
              A clear route from
              <span className="block">
                enquiry to conversation.
              </span>
            </h2>

            <p className="mt-6 max-w-[400px] text-sm leading-7 text-white/50">
              Clear information at the beginning helps the enterprise connect
              you with the most relevant team.
            </p>
          </div>

          <div className="border-t border-white/15">
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid gap-5 border-b border-white/15 py-7 md:grid-cols-[70px_220px_1fr]"
              >
                <span className="font-mono text-[10px] text-[var(--color-sandstone-deep)]">
                  {step.number}
                </span>

                <h3 className="font-display text-xl text-white">
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
   OFFICE LOCATION
   ========================================================= */

function OfficeLocation() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-28">
          {/* LEFT */}
          <div>
            <Eyebrow>Head office</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[450px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.5rem]
              "
            >
              Based in Jigjiga.
              <span className="block">
                Connected across the region.
              </span>
            </h2>

            <p className="mt-6 max-w-[420px] text-sm leading-7 text-[var(--color-ink-soft)]">
              SRS Mining Enterprise&apos;s head office serves as the main point
              of contact for institutional communication, project enquiries and
              strategic engagement.
            </p>
          </div>

          {/* LOCATION VISUAL */}
          <div className="relative min-h-[380px] overflow-hidden border-y border-[var(--color-basalt)]/[0.10]">
            {/* map grid */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(20,40,35,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(20,40,35,.8) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* abstract route */}
            <svg
              viewBox="0 0 800 360"
              className="absolute inset-0 h-full w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M35 287C143 211 211 287 311 201C397 127 481 185 569 107C648 36 704 71 774 39"
                stroke="var(--color-sandstone-deep)"
                strokeWidth="2"
                opacity="0.22"
              />

              <path
                d="M5 323C116 245 224 326 334 235C424 161 506 221 599 145C665 91 720 96 790 59"
                stroke="var(--color-basalt)"
                strokeWidth="1.5"
                opacity="0.09"
              />
            </svg>

            {/* pin */}
            <div className="absolute left-[56%] top-[45%]">
              <span className="absolute -inset-7 rounded-full border border-[var(--color-sandstone-deep)]/15" />
              <span className="absolute -inset-4 rounded-full border border-[var(--color-sandstone-deep)]/25" />

              <span className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[var(--color-basalt)] p-3 text-[var(--color-sandstone-deep)] shadow-xl">
                <MapPin size={19} />
              </span>
            </div>

            {/* location label */}
            <div className="absolute bottom-8 left-8">
              <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                SRS Mining Enterprise
              </span>

              <h3 className="mt-3 font-display text-2xl text-[var(--color-basalt)]">
                Jigjiga
              </h3>

              <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                Somali Regional State · Ethiopia
              </p>
            </div>

            {/* office note */}
            <div className="absolute bottom-8 right-8 hidden text-right sm:block">
              <Landmark
                size={18}
                className="ml-auto text-[var(--color-sandstone-deep)]"
              />

              <span className="mt-3 block text-[10px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/45">
                Government Enterprise
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   CONTACT PAGE
   ========================================================= */

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactRoutes />
      <EnquiryForm />
      <WhatHappensNext />
      <OfficeLocation />
    </>
  );
}