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
    title: "Lansare Sesiune Depunere Start-Up Nation 2026",
    programmeSlug: "start-up-nation-2026",
    institution: "MEAT",
    date: "2026-08-15",
    eventType: "Lansare",
    county: "Național",
    status: "În curând",
  },
  {
    id: "cal-ev-2",
    title: "Termen Limită Apel Casa Verde Fotovoltaice",
    programmeSlug: "casa-verde",
    institution: "AFM",
    date: "2026-08-30",
    eventType: "Termen Limită",
    county: "Național",
    status: "Deschis",
  },
  {
    id: "cal-ev-3",
    title: "Închidere Apel PNRR Digitalizare IMM",
    programmeSlug: "pnrr-digitalizare",
    institution: "MIPE",
    date: "2026-09-15",
    eventType: "Termen Limită",
    county: "Național",
    status: "Deschis",
  },
  {
    id: "cal-ev-4",
    title: "Consultare Publică Ghid Agro-Procesare AFIR",
    programmeSlug: "afir-procesare",
    institution: "AFIR",
    date: "2026-09-01",
    eventType: "Consultare",
    county: "Național",
    status: "În curând",
  },
];
