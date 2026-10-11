import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown,
  Clock3, Fuel, Gauge, MapPin, Menu, Navigation, PackageCheck,
  Route, ShieldCheck, Smartphone, Truck, Wrench, X,
} from 'lucide-react';

const navLinks = [
  { label: 'Überblick', href: '#ueberblick' },
  { label: 'Funktionen', href: '#funktionen' },
  { label: 'Für Fahrer', href: '#fahrer' },
  { label: 'Fragen & Antworten', href: '#fragen' },
];

const fleetRows = [
  { code: 'HH · FL 284', driver: 'M. Krüger', destination: 'Hamburg → Bremen', status: 'Unterwegs', tone: 'green', pos: 'left-[19%] top-[40%]' },
  { code: 'HB · JK 617', driver: 'S. Yilmaz', destination: 'Bremen → Hannover', status: 'Pause', tone: 'amber', pos: 'left-[55%] top-[62%]' },
  { code: 'H · MN 903', driver: 'L. Weber', destination: 'Hannover → Kassel', status: 'Unterwegs', tone: 'green', pos: 'left-[70%] top-[36%]' },
];

function Brand() {
  return <a href="#start" className="inline-flex items-center gap-2.5" aria-label="flot.to – zur Startseite">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#174f3e] text-[#f5f4ed]">
      <Route size={20} strokeWidth={2.1} />
    </span>
    <span className="font-display text-[21px] font-extrabold tracking-[-.07em]">flot<span className="text-[#d99b3f]">.</span>to</span>
  </a>;
}

function DashboardPreview() {
  const [active, setActive] = useState('Flottenübersicht');
  return <div className="relative mx-auto w-full max-w-[620px] reveal-delay">
    <div className="absolute -inset-5 rounded-[34px] bg-[#d9e3d9]/50 blur-2xl" />
    <div className="relative overflow-hidden rounded-[22px] border border-[#dce2dc] bg-white shadow-[0_28px_80px_-34px_rgba(29,57,43,.28)]">
      <div className="flex h-[52px] items-center justify-between border-b border-[#edf0ec] px-4 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-[#174f3e] text-white"><Route size={13} /></span>
          <span className="font-display text-[12px] font-extrabold tracking-[-.04em]">flot.to</span>
          <span className="ml-1 hidden rounded-full bg-[#f2f5f1] px-2 py-1 text-[9px] font-semibold text-[#68736b] sm:block">Leitstand</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#79827a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#45a477]" /> Live-Übersicht
          <div className="ml-2 grid h-7 w-7 place-items-center rounded-full bg-[#e8eee8] text-[9px] font-bold text-[#345747]">AK</div>
        </div>
      </div>
      <div className="grid min-h-[352px] sm:grid-cols-[156px_1fr]">
        <aside className="hidden border-r border-[#edf0ec] p-3 sm:block">
          <p className="px-2 pb-3 pt-2 text-[8px] font-bold uppercase tracking-[.15em] text-[#9aa29b]">Arbeitsbereich</p>
          {[
            { label: 'Flottenübersicht', Icon: Gauge },
            { label: 'Tourenplanung', Icon: Route },
            { label: 'Fahrzeugplanung', Icon: Truck },
            { label: 'Kraftstoff', Icon: Fuel },
          ].map(({ label, Icon }) => <button key={label} onClick={() => setActive(label)} className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[10px] transition-colors ${active === label ? 'bg-[#edf4ed] font-semibold text-[#24573f]' : 'text-[#778078] hover:bg-[#f7f8f5]'}`}>
            <Icon size={13} /> {label}
          </button>)}
          <div className="mt-5 rounded-xl bg-[#f7f7f2] p-3">
            <div className="flex items-center justify-between text-[9px] font-semibold"><span>Fahrzeuge</span><span className="text-[#557762]">Aktuell</span></div>
            <div className="mt-2 font-display text-[22px] font-bold">24 <span className="text-xs font-medium text-[#8c958d]">im Fuhrpark</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e9e3]"><div className="h-full w-[72%] rounded-full bg-[#4d8a68]" /></div>
            <p className="mt-1.5 text-[9px] text-[#7e887f]">17 unterwegs · 4 im Stand</p>
          </div>
        </aside>
        <div className="min-w-0 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div><p className="font-display text-[14px] font-bold tracking-[-.03em]">{active}</p><p className="mt-0.5 text-[9px] text-[#89928a]">Donnerstag, 24. Oktober · Übersicht</p></div>
            <button aria-label="Ansicht wählen" onClick={() => setActive(active === 'Flottenübersicht' ? 'Tourenplanung' : 'Flottenübersicht')} className="rounded-md border border-[#e5e9e4] px-2 py-1.5 text-[9px] text-[#657068] hover:bg-[#f6f8f4]">Heute <ChevronDown size={10} className="ml-1 inline" /></button>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[
              ['Im Einsatz', '17', 'Fahrzeuge', Truck],
              ['Geplante Touren', '12', 'für heute', Route],
              ['Werkstatt', '2', 'Termine offen', Wrench],
            ].map(([label, value, caption, Icon]) => <div key={String(label)} className="rounded-lg border border-[#e9ede8] bg-white p-2.5">
              <div className="flex items-center justify-between text-[8px] text-[#818b82]"><span>{label as string}</span><Icon size={11} /></div>
              <div className="mt-1 font-display text-[20px] font-bold leading-none">{value as string}</div><div className="mt-1 text-[8px] text-[#939b94]">{caption as string}</div>
            </div>)}
          </div>
          <div className="map-grid relative h-[186px] overflow-hidden rounded-xl border border-[#dfe5dc]">
            <div className="absolute left-[7%] top-[10%] rounded-full border border-[#d6ddd3] bg-white/80 px-2 py-1 text-[8px] font-semibold text-[#667269]">Norddeutschland</div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 450 186" preserveAspectRatio="none" aria-hidden="true">
              <path d="M68 78 C135 75 143 124 228 112 S316 57 392 70" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
              <path className="route-line" d="M68 78 C135 75 143 124 228 112 S316 57 392 70" fill="none" stroke="#568368" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M129 39 C166 66 183 91 228 112 C260 127 282 143 316 148" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
              <path className="route-line" d="M129 39 C166 66 183 91 228 112 C260 127 282 143 316 148" fill="none" stroke="#d7a049" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="absolute left-[13%] top-[37%] text-[8px] font-semibold text-[#5d6b60]">Hamburg</span>
            <span className="absolute left-[49%] top-[57%] text-[8px] font-semibold text-[#5d6b60]">Bremen</span>
            <span className="absolute left-[69%] top-[28%] text-[8px] font-semibold text-[#5d6b60]">Hannover</span>
            <span className="absolute left-[73%] top-[73%] text-[8px] font-semibold text-[#5d6b60]">Kassel</span>
            {fleetRows.map((row, i) => <div key={row.code} className={`absolute ${row.pos} z-10`}>
              <span className={`relative grid h-7 w-7 place-items-center rounded-full border-2 border-white shadow-md ${row.tone === 'green' ? 'bg-[#235c43]' : 'bg-[#d39a3e]'}`}>
                <Truck size={13} className="text-white" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#73bd8a]" />
              </span>
            </div>)}
            <div className="absolute bottom-2 right-2 rounded-md border border-[#e4e9e1] bg-white/90 px-2 py-1 text-[8px] text-[#778077]">Karte · Beispielansicht</div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[8px] text-[#89928a]"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#4d8a68]" /> Standortdaten in der Übersicht</span><span>Zuletzt aktualisiert: gerade eben</span></div>
        </div>
      </div>
    </div>
    <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-[#e4e9e2] bg-white p-3 shadow-lg sm:block">
      <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f5f0e5] text-[#ba8736]"><Navigation size={15} /></span><div><p className="text-[9px] text-[#8a938b]">Nächster Halt</p><p className="text-[11px] font-semibold">Bremen · 10:45 Uhr</p></div></div>
    </div>
  </div>;
}

function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  if (!open) return null;
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#14231d]/55 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="demo-title" className="relative w-full max-w-[480px] rounded-2xl border border-[#dce3dc] bg-[#fffefa] p-6 shadow-2xl sm:p-8">
      <button onClick={onClose} aria-label="Dialog schließen" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-[#69766d] hover:bg-[#eef1eb]"><X size={18} /></button>
      {!sent ? <>
        <span className="eyebrow text-[#66816d]">Unverbindlich kennenlernen</span>
        <h2 id="demo-title" className="font-display mt-3 text-3xl font-bold tracking-[-.05em]">Lassen Sie uns sprechen.</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[#657168]">Erzählen Sie uns kurz von Ihrem Fuhrpark. Wir melden uns mit einem passenden Gesprächstermin.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-xs font-semibold text-[#39483e]">Name<input required name="name" autoComplete="name" placeholder="Ihr Name" className="mt-1.5 h-11 w-full rounded-lg border border-[#d9e0d8] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#477c5d] focus:ring-2 focus:ring-[#477c5d]/15" /></label>
          <label className="block text-xs font-semibold text-[#39483e]">Geschäftliche E-Mail-Adresse<input required type="email" name="email" autoComplete="email" placeholder="name@unternehmen.de" className="mt-1.5 h-11 w-full rounded-lg border border-[#d9e0d8] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#477c5d] focus:ring-2 focus:ring-[#477c5d]/15" /></label>
          <label className="block text-xs font-semibold text-[#39483e]">Unternehmen<input required name="company" autoComplete="organization" placeholder="Name Ihres Unternehmens" className="mt-1.5 h-11 w-full rounded-lg border border-[#d9e0d8] bg-white px-3 text-sm font-normal outline-none transition focus:border-[#477c5d] focus:ring-2 focus:ring-[#477c5d]/15" /></label>
          <Button type="submit" className="mt-2 h-11 w-full rounded-lg bg-[#174f3e] text-white hover:bg-[#103e30]">Anfrage vormerken <ArrowRight size={16} /></Button>
          <p className="text-center text-[11px] leading-5 text-[#869087]">Demo-Anfrage als lokale Vorschau – Ihre Angaben werden nicht versendet.</p>
        </form>
      </> : <div className="py-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e7f1e8] text-[#2f704c]"><Check size={25} /></span>
        <h2 id="demo-title" className="font-display mt-5 text-2xl font-bold tracking-[-.04em]">Alles für die Vorschau bereit.</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#657168]">Das Formular wurde lokal ausgefüllt. In einer Live-Version würde hier Ihre Anfrage übermittelt.</p>
        <Button onClick={onClose} variant="outline" className="mt-6 rounded-lg">Zurück zur Seite</Button>
      </div>}
    </div>
  </div>;
}

function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const showDemo = () => setDemoOpen(true);
  const faqs = [
    ['Für welche Unternehmen ist flot.to gedacht?', 'flot.to richtet sich an Speditionen und Fuhrunternehmen, die ihre Fahrzeuge, Touren und betrieblichen Abläufe an einem Ort im Blick behalten möchten.'],
    ['Was sehe ich in der Flottenübersicht?', 'Die Übersicht bündelt aktuelle Fahrzeugpositionen und wichtige Informationen zu den Fahrzeugen. Welche Daten verfügbar sind, hängt von der jeweiligen Anbindung und Einrichtung ab.'],
    ['Können Fahrer flot.to mobil nutzen?', 'Ja. Die mobile Fahrer-App verbindet den Arbeitsalltag unterwegs mit der Planung im Büro. So bleiben Informationen und Rückmeldungen dort, wo sie gebraucht werden.'],
    ['Wie kann ich flot.to kennenlernen?', 'Über das Formular können Sie eine unverbindliche Demo-Anfrage vormerken. In dieser Website-Vorschau wird nichts an einen Server übertragen.'],
  ];

  return <main id="start" className="min-h-[100dvh] overflow-x-clip bg-[#faf9f5] text-[#1d2c25]">
    <header className="sticky top-0 z-40 border-b border-[#e4e7df]/85 bg-[#faf9f5]/90 backdrop-blur-xl">
      <div className="container-wide flex h-[72px] items-center justify-between">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {navLinks.map(link => <a key={link.href} href={link.href} className="text-[13px] font-medium text-[#647168] transition-colors hover:text-[#174f3e]">{link.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <Button onClick={showDemo} className="hidden h-10 rounded-lg bg-[#174f3e] px-4 text-[13px] text-white hover:bg-[#103e30] sm:inline-flex">Demo anfragen <ArrowRight size={15} /></Button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen} className="grid h-10 w-10 place-items-center rounded-lg border border-[#dfe4dc] text-[#345143] md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-[#e4e7df] bg-[#faf9f5] px-5 py-4 md:hidden" aria-label="Mobile Navigation">
        {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block border-b border-[#e9ece6] py-3 text-sm font-medium text-[#4e5d53] last:border-0">{link.label}</a>)}
        <Button onClick={() => { setMenuOpen(false); showDemo(); }} className="mt-3 w-full rounded-lg bg-[#174f3e] text-white">Demo anfragen <ArrowRight size={15} /></Button>
      </nav>}
    </header>

    <section className="relative pb-20 pt-14 sm:pb-28 sm:pt-20 lg:pt-[92px]">
      <div className="pointer-events-none absolute -right-24 top-10 h-[500px] w-[500px] rounded-full bg-[#e9eee4] opacity-70 blur-[90px]" />
      <div className="container-wide relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <div className="reveal max-w-[540px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dce4d9] bg-[#f4f6f0] px-3 py-1.5 text-[11px] font-semibold text-[#43634d]"><span className="h-1.5 w-1.5 rounded-full bg-[#5f9770]" /> Der digitale Leitstand für Ihren Fuhrpark</div>
          <h1 className="font-display text-[clamp(3.15rem,6vw,5.3rem)] font-extrabold leading-[.99] tracking-[-.075em] text-[#1c3027]">Alles im Blick.<br /><span className="text-[#568064]">Besser unterwegs.</span></h1>
          <p className="mt-6 max-w-[465px] text-[16px] leading-[1.8] text-[#5e6c62] sm:text-[17px]">flot.to bringt Fahrzeuge, Touren und Planung an einem Ort zusammen. Damit Disposition und Fahrer im Alltag wissen, was ansteht.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={showDemo} className="h-12 rounded-lg bg-[#174f3e] px-5 text-sm text-white shadow-sm hover:bg-[#103e30]">flot.to kennenlernen <ArrowRight size={16} /></Button>
            <a href="#ueberblick" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-[#365a45] transition-colors hover:bg-[#edf1e9]">So funktioniert’s <ArrowDownRight size={16} /></a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#e5e8e1] pt-5 text-[11px] font-medium text-[#6f7b71]">
            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4d805d]" /> Fahrzeugpositionen</span>
            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4d805d]" /> Touren im Blick</span>
            <span className="flex items-center gap-1.5"><Check size={13} className="text-[#4d805d]" /> Für Büro und Straße</span>
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>

    <section id="ueberblick" className="border-y border-[#e7e9e3] bg-[#f2f3ed] py-9">
      <div className="container-wide grid gap-7 sm:grid-cols-3 sm:gap-4">
        {[
          ['Standorte verstehen', 'Fahrzeuge und ihre Positionen übersichtlich zusammenführen.', MapPin],
          ['Abläufe verbinden', 'Touren, Fahrzeuge und betriebliche Aufgaben gemeinsam planen.', CalendarDays],
          ['Unterwegs informiert', 'Büro und Fahrer-App für den täglichen Austausch verbinden.', Smartphone],
        ].map(([title, copy, Icon], i) => <div key={String(title)} className={`flex items-start gap-3 ${i > 0 ? 'sm:border-l sm:border-[#dfe3da] sm:pl-6' : ''}`}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#3f7252] shadow-[0_1px_3px_rgba(30,50,38,.06)]"><Icon size={17} /></span>
          <div><h2 className="text-[13px] font-bold">{title as string}</h2><p className="mt-1 max-w-[270px] text-[12px] leading-5 text-[#6d786e]">{copy as string}</p></div>
        </div>)}
      </div>
    </section>

    <section id="funktionen" className="section-pad">
      <div className="container-wide">
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div><span className="eyebrow text-[#63806a]">Ein System. Viele Handgriffe.</span><h2 className="font-display mt-4 max-w-[480px] text-4xl font-bold leading-[1.08] tracking-[-.06em] sm:text-[52px]">Der Überblick, der im Alltag weiterhilft.</h2></div>
          <p className="max-w-[450px] justify-self-end text-[15px] leading-7 text-[#66736a]">Wenn Informationen über verschiedene Listen und Kanäle verteilt sind, kostet das den Überblick. flot.to führt die zentralen Aufgaben im Fuhrpark an einem Ort zusammen.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Card className="group overflow-hidden rounded-2xl border-[#e0e5de] bg-[#fffefa] shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-28px_rgba(26,67,43,.24)]">
            <div className="flex min-h-[265px] flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf1e8] text-[#356c49]"><MapPin size={20} /></span><span className="eyebrow text-[#89948a]">01 / Überblick</span></div>
              <div className="mt-9"><h3 className="font-display text-2xl font-bold tracking-[-.05em]">Fahrzeuge auf der Karte</h3><p className="mt-2 max-w-[390px] text-sm leading-6 text-[#6d786e]">Sehen, wo Ihre Fahrzeuge unterwegs sind. Eine klare Kartenansicht schafft eine gemeinsame Grundlage für Rückfragen und Umplanung.</p></div>
            </div>
            <div className="relative h-[142px] overflow-hidden border-t border-[#e8ebe5] bg-[#edf1e9]">
              <div className="map-grid absolute inset-0 opacity-80" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 650 145" preserveAspectRatio="none" aria-hidden="true"><path d="M85 103 C190 90 194 43 292 66 S443 127 565 39" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" /><path className="route-line" d="M85 103 C190 90 194 43 292 66 S443 127 565 39" fill="none" stroke="#4e8060" strokeWidth="2.5" strokeLinecap="round" /></svg>
              {[['14%', '62%', 'Hamburg'], ['44%', '36%', 'Bremen'], ['80%', '28%', 'Hannover']].map(([left, top, city], i) => <div key={city} className="absolute" style={{ left, top }}><span className={`grid h-7 w-7 place-items-center rounded-full border-2 border-white shadow ${i === 1 ? 'bg-[#d39a3e]' : 'bg-[#235c43]'}`}><Truck size={12} className="text-white" /></span><span className="absolute left-8 top-1 whitespace-nowrap text-[9px] font-semibold text-[#536357]">{city}</span></div>)}
              <span className="absolute bottom-2 right-3 rounded bg-white/85 px-2 py-1 text-[8px] text-[#788178]">Beispielhafte Darstellung</span>
            </div>
          </Card>
          <Card className="rounded-2xl border-[#e0e5de] bg-[#fffefa] p-6 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-28px_rgba(26,67,43,.24)] sm:p-8">
            <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4efe3] text-[#a77b36]"><Route size={20} /></span><span className="eyebrow text-[#89948a]">02 / Disposition</span></div>
            <h3 className="font-display mt-9 text-2xl font-bold tracking-[-.05em]">Touren vorausschauend planen</h3>
            <p className="mt-2 max-w-[430px] text-sm leading-6 text-[#6d786e]">Aufträge und Touren so organisieren, dass die Disposition weiß, was geplant ist und was sich verändert.</p>
            <div className="mt-7 overflow-hidden rounded-xl border border-[#e5e9e2] bg-white">
              <div className="flex items-center justify-between border-b border-[#edf0eb] px-4 py-3"><div className="flex items-center gap-2 text-[10px] font-semibold"><CalendarDays size={13} className="text-[#62816b]" /> Touren · Heute</div><span className="rounded-full bg-[#edf4ec] px-2 py-1 text-[8px] font-semibold text-[#45664d]">Tagesplanung</span></div>
              {[['08:15', 'Hamburg → Bremen', 'HH · FL 284'], ['09:40', 'Bremen → Hannover', 'HB · JK 617'], ['11:20', 'Hannover → Kassel', 'H · MN 903']].map((row, i) => <div key={row[0]} className="flex items-center gap-3 border-b border-[#f0f2ee] px-4 py-3 last:border-0">
                <div className="w-9 font-mono text-[9px] text-[#78847a]">{row[0]}</div><span className="h-1.5 w-1.5 rounded-full bg-[#588366]" /><div className="min-w-0 flex-1"><p className="truncate text-[10px] font-semibold">{row[1]}</p><p className="mt-0.5 text-[8px] text-[#929a92]">Fahrzeug · {row[2]}</p></div><span className={`rounded-full px-2 py-1 text-[8px] ${i === 1 ? 'bg-[#faf2e4] text-[#98743c]' : 'bg-[#eef4ed] text-[#507257]'}`}>{i === 1 ? 'Geplant' : 'Aktiv'}</span>
              </div>)}
            </div>
          </Card>
          <Card className="rounded-2xl border-[#e0e5de] bg-[#f0f3ed] p-6 shadow-none sm:p-8">
            <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#43724f]"><Wrench size={20} /></span><span className="eyebrow text-[#89948a]">03 / Fahrzeugplanung</span></div>
            <h3 className="font-display mt-9 text-2xl font-bold tracking-[-.05em]">Wartung nicht aus dem Blick verlieren</h3>
            <p className="mt-2 max-w-[430px] text-sm leading-6 text-[#6d786e]">Reparaturen, Werkstatttermine und Fahrzeugverfügbarkeit in die Planung einbeziehen – damit klar ist, was einsatzbereit ist.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="flex items-center gap-2 rounded-lg border border-[#e0e7de] bg-white px-3 py-2.5 text-[10px] font-medium"><Wrench size={13} className="text-[#a37839]" /> Reparaturen dokumentieren</span>
              <span className="flex items-center gap-2 rounded-lg border border-[#e0e7de] bg-white px-3 py-2.5 text-[10px] font-medium"><Clock3 size={13} className="text-[#62816b]" /> Termine im Blick behalten</span>
              <span className="flex items-center gap-2 rounded-lg border border-[#e0e7de] bg-white px-3 py-2.5 text-[10px] font-medium"><Truck size={13} className="text-[#62816b]" /> Verfügbarkeit einplanen</span>
            </div>
          </Card>
          <Card className="rounded-2xl border-[#e0e5de] bg-[#fffefa] p-6 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_-28px_rgba(26,67,43,.24)] sm:p-8">
            <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4efe3] text-[#a77b36]"><Fuel size={20} /></span><span className="eyebrow text-[#89948a]">04 / Betrieb</span></div>
            <h3 className="font-display mt-9 text-2xl font-bold tracking-[-.05em]">Kraftstoff im Zusammenhang sehen</h3>
            <p className="mt-2 max-w-[430px] text-sm leading-6 text-[#6d786e]">Kraftstoffinformationen zu Fahrzeugen und Betrieb übersichtlich festhalten. So gehören sie zur Planung statt in eine separate Ablage.</p>
            <div className="mt-7 rounded-xl border border-[#e6eae4] bg-[#f8f9f5] p-4">
              <div className="flex items-center justify-between"><span className="text-[10px] font-semibold text-[#48574c]">Kraftstoffmanagement</span><span className="grid h-7 w-7 place-items-center rounded-md bg-white text-[#a77b36]"><Fuel size={13} /></span></div>
              <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-lg bg-white p-3"><p className="text-[9px] text-[#869087]">Fahrzeugbezogene Einträge</p><p className="mt-1 text-[11px] font-semibold">geordnet verfügbar</p></div><div className="rounded-lg bg-white p-3"><p className="text-[9px] text-[#869087]">Informationen</p><p className="mt-1 text-[11px] font-semibold">im Fuhrpark-Kontext</p></div></div>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section id="fahrer" className="bg-[#183f32] py-20 text-[#f4f3eb] sm:py-28">
      <div className="container-wide grid items-center gap-14 md:grid-cols-[1fr_.8fr]">
        <div>
          <span className="eyebrow text-[#a9c2ad]">Im Büro geplant. Auf der Straße dabei.</span>
          <h2 className="font-display mt-4 max-w-[590px] text-4xl font-bold leading-[1.08] tracking-[-.06em] sm:text-[54px]">Ein guter Arbeitstag braucht Verbindung.</h2>
          <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#c2d0c3]">Die mobile Fahrer-App bringt den digitalen Leitstand dorthin, wo Ihre Tour stattfindet. Fahrer und Disposition arbeiten mit einem gemeinsamen Informationsstand.</p>
          <div className="mt-8 space-y-4">
            {[
              ['Tourinformationen mobil verfügbar', 'Was für die Fahrt wichtig ist, direkt in der App.'],
              ['Rückmeldungen dort, wo sie entstehen', 'Informationen aus dem Fahreralltag kommen im Büro an.'],
              ['Gemeinsamer Blick auf den Ablauf', 'Planung und unterwegs sein gehören zusammen.'],
            ].map(([title, copy]) => <div key={title} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#35634e] text-[#d2e1d2]"><Check size={13} /></span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-[#b5c8b8]">{copy}</p></div></div>)}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[355px]">
          <div className="relative mx-auto w-[260px] rounded-[35px] border-[7px] border-[#263c32] bg-[#fbfaf6] p-2 shadow-[0_24px_70px_-22px_rgba(0,0,0,.5)]">
            <div className="absolute left-1/2 top-1 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-[#263c32]" />
            <div className="overflow-hidden rounded-[26px] bg-[#f4f5ef]">
              <div className="bg-[#235a40] px-4 pb-4 pt-8 text-white"><div className="flex items-center justify-between"><span className="text-[9px] font-semibold tracking-wide">Guten Morgen, Martin</span><span className="grid h-6 w-6 place-items-center rounded-full bg-white/15"><Smartphone size={12} /></span></div><p className="mt-3 text-[8px] text-[#c8d8c8]">Ihre heutige Tour</p><p className="mt-1 font-display text-lg font-bold">Hamburg → Bremen</p></div>
              <div className="p-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#e4e9e0] bg-white p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf1e8] text-[#396b48]"><Navigation size={14} /></span><div><p className="text-[8px] text-[#829084]">Nächster Stopp</p><p className="mt-0.5 text-[10px] font-semibold">Gewerbepark Nord</p></div></div>
                <div className="mt-2 rounded-xl border border-[#e4e9e0] bg-white p-3"><div className="flex items-center justify-between"><p className="text-[9px] font-semibold">Tourverlauf</p><span className="text-[8px] text-[#729078]">1 von 3</span></div><div className="mt-3 space-y-3">
                  <div className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#5e956e]" /><div><p className="text-[8px] font-medium">Start · Hamburg</p><p className="text-[7px] text-[#909990]">Abgeschlossen</p></div></div>
                  <div className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#d39a3e]" /><div><p className="text-[8px] font-medium">Lieferung · Bremen</p><p className="text-[7px] text-[#909990]">Als Nächstes</p></div></div>
                  <div className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-[#d8ded7]" /><div><p className="text-[8px] font-medium text-[#8b958c]">Rückkehr · Hamburg</p><p className="text-[7px] text-[#a5ada5]">Geplant</p></div></div>
                </div></div>
                <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-[#235a40] py-2.5 text-[9px] font-semibold text-white"><PackageCheck size={12} /> Tour öffnen</div>
                <p className="mt-2 text-center text-[7px] text-[#9aa29a]">Beispielhafte App-Ansicht</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-wide">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="eyebrow text-[#63806a]">Der Alltag im Überblick</span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-[-.06em] sm:text-[48px]">Weniger Suchen. Klarer planen.</h2>
          <p className="mx-auto mt-4 max-w-[540px] text-sm leading-7 text-[#66736a]">flot.to ordnet die täglichen Informationen rund um Ihren Fuhrpark – vom Fahrzeugstandort bis zur Werkstattplanung.</p>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-2xl border border-[#e0e5de] bg-[#fffefa] md:grid-cols-3">
          {[
            [MapPin, 'Orientierung', 'Fahrzeugpositionen helfen, Rückfragen einzuordnen und den aktuellen Stand zu sehen.'],
            [CalendarDays, 'Planung', 'Touren und Fahrzeugverfügbarkeit bleiben im Zusammenhang sichtbar.'],
            [ShieldCheck, 'Verlässlichkeit', 'Ein strukturierter Leitstand schafft eine klare Grundlage für tägliche Entscheidungen.'],
          ].map(([Icon, title, copy], i) => <div key={String(title)} className={`p-6 sm:p-8 ${i ? 'border-t border-[#e8ebe5] md:border-l md:border-t-0' : ''}`}>
            <Icon size={19} className="text-[#4f795a]" /><h3 className="font-display mt-5 text-lg font-bold tracking-[-.03em]">{title as string}</h3><p className="mt-2 text-[13px] leading-6 text-[#6d786e]">{copy as string}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section id="fragen" className="border-t border-[#e7e9e3] bg-[#f3f4ee] py-20 sm:py-24">
      <div className="container-wide grid gap-10 md:grid-cols-[.7fr_1.3fr]">
        <div><span className="eyebrow text-[#63806a]">Gut zu wissen</span><h2 className="font-display mt-4 text-4xl font-bold tracking-[-.06em]">Fragen, die oft kommen.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-[#69756b]">Sie möchten wissen, ob flot.to zu Ihrem Alltag passt? Hier finden Sie erste Antworten.</p><a href="mailto:hallo@flot.to" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#286044] hover:underline">Weitere Frage stellen <ArrowUpRight size={15} /></a></div>
        <div className="divide-y divide-[#dfe4dc] border-y border-[#dfe4dc]">
          {faqs.map(([q, a], i) => <div key={q}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="flex w-full items-center justify-between gap-4 py-5 text-left">
              <span className="text-[14px] font-semibold">{q}</span><ChevronDown size={17} className={`shrink-0 text-[#708075] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === i && <p className="max-w-[590px] pb-5 pr-8 text-[13px] leading-6 text-[#69756b]">{a}</p>}
          </div>)}
        </div>
      </div>
    </section>

    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="container-wide relative overflow-hidden rounded-[24px] bg-[#e9eee5] px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#d6dfd3]" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-60 w-60 rounded-full border border-[#d6dfd3]" />
        <span className="eyebrow text-[#5f7c64]">Der nächste Schritt</span>
        <h2 className="font-display mx-auto mt-4 max-w-[680px] text-4xl font-bold leading-[1.08] tracking-[-.065em] sm:text-[54px]">Machen Sie Ihren Fuhrpark übersichtlicher.</h2>
        <p className="mx-auto mt-4 max-w-[480px] text-sm leading-6 text-[#647268]">Lernen Sie flot.to kennen und finden Sie heraus, wie ein digitaler Leitstand in Ihren Alltag passt.</p>
        <Button onClick={showDemo} className="mt-7 h-12 rounded-lg bg-[#174f3e] px-5 text-sm text-white hover:bg-[#103e30]">Demo anfragen <ArrowRight size={16} /></Button>
        <p className="mt-3 text-[11px] text-[#7d897e]">Unverbindlich. Im nächsten Schritt persönlich besprechen.</p>
      </div>
    </section>

    <footer className="border-t border-[#e4e7df] py-8">
      <div className="container-wide flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Brand />
        <p className="text-xs text-[#7a857c]">Der digitale Leitstand für Speditionen und Fuhrunternehmen.</p>
        <div className="flex items-center gap-5 text-xs font-medium text-[#66736a]"><a href="#start" className="hover:text-[#174f3e]">Nach oben</a><a href="mailto:hallo@flot.to" className="hover:text-[#174f3e]">Kontakt</a><span>© {new Date().getFullYear()} flot.to</span></div>
      </div>
    </footer>
    <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
  </main>;
}

export default App;
