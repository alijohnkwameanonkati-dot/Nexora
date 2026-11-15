import { useState } from 'react';
import { Monitor, Smartphone, CheckCircle2 } from 'lucide-react';
import type { ProjectCaseStudy } from '../types';

interface InteractiveDemoPreviewProps {
  project: ProjectCaseStudy;
}

export function InteractiveDemoPreview({ project }: InteractiveDemoPreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Restaurant preview state
  const [menuTab, setMenuTab] = useState<'starters' | 'mains' | 'cellar'>('mains');
  const [gfOnly, setGfOnly] = useState(false);
  const [bookingParty, setBookingParty] = useState('2 Guests');
  const [bookingSlot, setBookingSlot] = useState('19:30');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Business preview state
  const [advisoryTrack, setAdvisoryTrack] = useState<'strategy' | 'systems' | 'operations'>('strategy');

  // E-commerce preview state
  const [finish, setFinish] = useState<'obsidian' | 'travertine'>('obsidian');
  const [cartQty, setCartQty] = useState(1);

  // Portfolio preview state
  const [series, setSeries] = useState<'monographs' | 'exhibitions'>('monographs');

  // Professional services preview state
  const [practiceArea, setPracticeArea] = useState<'corporate' | 'infrastructure' | 'ip'>('corporate');

  const menuItems = {
    starters: [
      { name: 'Charred Leek & Hazelnut Velouté', price: '$16', gf: true },
      { name: 'Hand-Dived Scallops, Brown Butter', price: '$22', gf: true },
      { name: 'Sourdough Tartine, Whipped Ricotta', price: '$15', gf: false },
    ],
    mains: [
      { name: 'Roasted Duck Breast, Cherry Jus', price: '$34', gf: true },
      { name: 'Pan-Seared Halibut, Fennel Broth', price: '$36', gf: true },
      { name: 'Wild Mushroom Tagliatelle', price: '$28', gf: false },
    ],
    cellar: [
      { name: '2021 Chablis Premier Cru, Côte de Léchet', price: '$19 / gl', gf: true },
      { name: '2019 Pinot Noir, Willamette Valley', price: '$21 / gl', gf: true },
      { name: 'Botanical Non-Alcoholic Aperitif', price: '$13 / gl', gf: true },
    ],
  };

  return (
    <section aria-labelledby="interactive-demo-heading" className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="px-5 sm:px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-blue-400">Interactive Concept Sandbox</p>
          <h3 id="interactive-demo-heading" className="font-display text-base font-semibold text-white">
            {project.title} — Live Interface Demonstration
          </h3>
        </div>

        <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-800">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              viewport === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Desktop View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              viewport === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Mobile View</span>
          </button>
        </div>
      </div>

      {/* Responsive Frame */}
      <div className="p-5 sm:p-8 bg-slate-100 flex justify-center">
        <div
          className={`w-full transition-all duration-200 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden ${
            viewport === 'mobile' ? 'max-w-[380px]' : 'max-w-4xl'
          }`}
        >
          {/* Browser Chrome */}
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono truncate">concept://{project.slug}.demo</span>
            <span className="whitespace-nowrap shrink-0">Interactive Concept</span>
          </div>

          <div className="p-5 sm:p-7">
            {project.previewVariant === 'restaurant' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs text-slate-500">Evening Dining · Open 17:30 – 23:00</p>
                    <h4 className="font-display text-xl font-bold text-slate-900">Savour House Seasonal Menu</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGfOnly((v) => !v)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      gfOnly
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {gfOnly ? 'Showing Gluten-Free Only' : 'Filter: Gluten-Free'}
                  </button>
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
                  {(['starters', 'mains', 'cellar'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setMenuTab(tab)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors cursor-pointer ${
                        menuTab === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-slate-100">
                  {menuItems[menuTab]
                    .filter((item) => !gfOnly || item.gf)
                    .map((item) => (
                      <div key={item.name} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">
                            {item.gf ? 'Gluten-Free Prepared' : 'Contains Gluten'}
                          </p>
                        </div>
                        <span className="font-mono text-sm font-medium text-slate-900 tabular-nums shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <p className="text-xs font-semibold text-slate-900">Quick Table Reservation Demo</p>
                  <div className={`grid gap-2.5 ${viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    <select
                      aria-label="Party size"
                      value={bookingParty}
                      onChange={(e) => {
                        setBookingParty(e.target.value);
                        setBookingConfirmed(false);
                      }}
                      className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                    </select>
                    <select
                      aria-label="Reservation time"
                      value={bookingSlot}
                      onChange={(e) => {
                        setBookingSlot(e.target.value);
                        setBookingConfirmed(false);
                      }}
                      className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900"
                    >
                      <option>18:30</option>
                      <option>19:30</option>
                      <option>20:45</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(true)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                    >
                      Request Table
                    </button>
                  </div>
                  {bookingConfirmed && (
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        Demo request held for {bookingParty} at {bookingSlot}.
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {project.previewVariant === 'business' && (
              <div className="space-y-5">
                <div>
                  <p className="text-xs text-slate-500">Vanguard Advisory · Executive Capabilities</p>
                  <h4 className="font-display text-xl font-bold text-slate-900 mt-1">
                    Select an Advisory Engagement Track
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'strategy' as const, label: 'Growth Strategy' },
                    { id: 'systems' as const, label: 'Digital Systems' },
                    { id: 'operations' as const, label: 'Operations Audit' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAdvisoryTrack(item.id)}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        advisoryTrack === item.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {advisoryTrack === 'strategy' && 'Market Positioning & Revenue Architecture'}
                    {advisoryTrack === 'systems' && 'Client Portal & Workflow Integration'}
                    {advisoryTrack === 'operations' && 'Cross-Team Process Standardization'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {advisoryTrack === 'strategy' &&
                      'Structured quarterly roadmaps aligning commercial messaging, enterprise buyer objections, and inbound conversion paths.'}
                    {advisoryTrack === 'systems' &&
                      'Consolidating fragmented spreadsheets and intake emails into validated web workflows with clear ownership.'}
                    {advisoryTrack === 'operations' &&
                      'Delivering executive reporting clarity, vendor governance, and measurable delivery milestones.'}
                  </p>
                  <p className="text-xs font-mono text-blue-700 pt-1">
                    Typical Horizon: {advisoryTrack === 'strategy' ? '6 Weeks' : advisoryTrack === 'systems' ? '8 Weeks' : '4 Weeks'}
                  </p>
                </div>
              </div>
            )}

            {project.previewVariant === 'ecommerce' && (
              <div className="space-y-5">
                <div className={`grid gap-6 ${viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  <div className="rounded-xl bg-slate-100 p-5 flex flex-col justify-between min-h-[170px]">
                    <span className="text-xs text-slate-500">Kanso Audio Series 01</span>
                    <div>
                      <p className="font-display text-lg font-bold text-slate-900">
                        Studio Wireless Over-Ear
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Finish: {finish === 'obsidian' ? 'Matte Obsidian Aluminum' : 'Warm Travertine Grey'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-slate-900">Unit Price</span>
                      <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">$340.00</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-slate-600">Select Finish</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFinish('obsidian')}
                          className={`px-3 py-1.5 text-xs rounded-lg border cursor-pointer ${
                            finish === 'obsidian'
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 text-slate-700'
                          }`}
                        >
                          Matte Obsidian
                        </button>
                        <button
                          type="button"
                          onClick={() => setFinish('travertine')}
                          className={`px-3 py-1.5 text-xs rounded-lg border cursor-pointer ${
                            finish === 'travertine'
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 text-slate-700'
                          }`}
                        >
                          Travertine Grey
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm w-6 text-center tabular-nums">{cartQty}</span>
                        <button
                          type="button"
                          onClick={() => setCartQty((q) => Math.min(9, q + 1))}
                          aria-label="Increase quantity"
                          className="w-8 h-8 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-blue-700 tabular-nums">
                        Subtotal: ${(340 * cartQty).toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.previewVariant === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-slate-500">Elena Vance · Archive Index</p>
                    <h4 className="font-display text-lg font-bold text-slate-900">Selected Monograph Plates</h4>
                  </div>
                  <div className="inline-flex p-1 rounded-lg bg-slate-100 gap-1">
                    <button
                      type="button"
                      onClick={() => setSeries('monographs')}
                      className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                        series === 'monographs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Monographs
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeries('exhibitions')}
                      className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer ${
                        series === 'exhibitions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Exhibitions
                    </button>
                  </div>
                </div>
                <div className={`grid gap-3 ${viewport === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {(series === 'monographs'
                    ? ['Plate 01 · Barbican Geometry', 'Plate 02 · Concrete Light', 'Plate 03 · North Atrium']
                    : ['Zurich Pavilion Series', 'Kyoto Timber Studies', 'Oslo Daylight Gallery']
                  ).map((item) => (
                    <div key={item} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                      <p className="text-xs font-medium text-slate-900">{item}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Medium Format · Archival Print</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.previewVariant === 'professional' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Meridian Partners · Practice Directory</p>
                  <h4 className="font-display text-lg font-bold text-slate-900">Explore Advisory Practice Areas</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'corporate' as const, label: 'Corporate Counsel' },
                    { id: 'infrastructure' as const, label: 'Infrastructure & Energy' },
                    { id: 'ip' as const, label: 'Technology & IP' },
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setPracticeArea(area.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer ${
                        practiceArea === area.id
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 leading-relaxed">
                  {practiceArea === 'corporate' &&
                    'Cross-border governance, commercial contracts, and board advisory structured for growth-stage and mid-market enterprises.'}
                  {practiceArea === 'infrastructure' &&
                    'Regulatory planning, public-private partnership structuring, and technical procurement documentation.'}
                  {practiceArea === 'ip' &&
                    'Software licensing frameworks, commercial IP protection, and enterprise data compliance counsel.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
