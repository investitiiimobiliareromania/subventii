export type CalendarEvent = {
  id: string;
  title: string;
  programmeSlug: string;
  institution: string;
  date: string;
  eventType: "Lansare" | "Termen Limită" | "Consultare" | "Evaluare";
  county: string;
  status: "Deschis" | "În curând" | "Închis";
};

export const calendarEventsDataset: CalendarEvent[] = [
  {
    id: "cal-ev-1",
    title: "Start-Up Nation: Modul de Formare Antreprenorială",
    programmeSlug: "start-up-nation-2025",
    institution: "MEAT",
    date: "2026-09-15",
    eventType: "Lansare",
    county: "Național",
    status: "Deschis",
  },
  {
    id: "cal-ev-2",
    title: "ADR Nord-Vest: Termen Limită Apel Digitalizare IMM",
    programmeSlug: "adr-nord-vest-digitalizare-si-inovare",
    institution: "ADR NV",
    date: "2026-09-15",
    eventType: "Termen Limită",
    county: "Cluj",
    status: "Deschis",
  },
  {
    id: "cal-ev-3",
    title: "ADR Centru: Termen Limită Apel Turism & Servicii",
    programmeSlug: "adr-centru-microintreprinderi-turism-servicii",
    institution: "ADR Centru",
    date: "2026-09-30",
    eventType: "Termen Limită",
    county: "Brașov",
    status: "Deschis",
  },
  {
    id: "cal-ev-4",
    title: "ANCPI: Publicare Buletin Statistic Tranzacții Imobiliare",
    programmeSlug: "ancpi-statistici",
    institution: "ANCPI",
    date: "2026-09-20",
    eventType: "Evaluare",
    county: "Național",
    status: "Deschis",
  },
];
