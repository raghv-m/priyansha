import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import useScrollAnimation from '../hooks/useScrollAnimation';

const NAVY = '#0F2044';
const GOLD = '#C9973A';

const fmt = (n) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
const fmtDec = (n) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const Calculator = () => {
  useScrollAnimation();

  const [homePrice, setHomePrice]     = useState(600000);
  const [downPayment, setDownPayment] = useState(120000);
  const [rate, setRate]               = useState(4.5);
  const [years, setYears]             = useState(25);
  const [schedule, setSchedule]       = useState('monthly');
  const [results, setResults]         = useState(null);

  useEffect(() => {
    const principal = homePrice - downPayment;
    if (principal <= 0 || rate <= 0) { setResults(null); return; }

    const perYear = schedule === 'monthly' ? 12 : schedule === 'bi-weekly' ? 26 : 52;
    const r = rate / 100 / perYear;
    const n = years * perYear;
    const payment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalCost = payment * n;

    setResults({
      payment,
      principal,
      totalInterest: totalCost - principal,
      totalCost,
      perYear,
      totalPayments: n,
    });
  }, [homePrice, downPayment, rate, years, schedule]);

  const downPct = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : 0;

  // CMHC insurance warning
  const needsCMHC = downPayment / homePrice < 0.2;

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0F2044 100%)' }}>
        <div className="container text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
                style={{ borderColor: 'rgba(201,151,58,0.4)', color: GOLD, background: 'rgba(201,151,58,0.08)' }}>
            Tools
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up">Mortgage Calculator</h1>
          <p className="text-lg max-w-2xl mx-auto fade-up stagger-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Estimate your payments and understand how different factors affect your total cost.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Inputs */}
            <Card className="fade-up">
              <h2 className="text-xl font-bold mb-7" style={{ color: NAVY }}>Your Numbers</h2>

              <div className="space-y-7">
                {/* Home Price */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Home Price</label>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{fmt(homePrice)}</span>
                  </div>
                  <input type="range" min="100000" max="2500000" step="10000"
                    value={homePrice} onChange={e => setHomePrice(+e.target.value)} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$100K</span><span>$2.5M</span></div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Down Payment</label>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{fmt(downPayment)} <span className="font-normal text-gray-400">({downPct}%)</span></span>
                  </div>
                  <input type="range" min="0" max={homePrice * 0.95} step="5000"
                    value={downPayment} onChange={e => setDownPayment(+e.target.value)} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$0</span><span>{fmt(homePrice * 0.95)}</span></div>
                  {needsCMHC && (
                    <p className="text-xs mt-2 px-3 py-1.5 rounded-lg" style={{ background: '#fff3cd', color: '#856404' }}>
                      Down payment under 20% — CMHC mortgage insurance applies
                    </p>
                  )}
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{rate.toFixed(2)}%</span>
                  </div>
                  <input type="range" min="0.5" max="12" step="0.05"
                    value={rate} onChange={e => setRate(+e.target.value)} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0.5%</span><span>12%</span></div>
                </div>

                {/* Amortization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amortization Period</label>
                  <select value={years} onChange={e => setYears(+e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:outline-none"
                          style={{ '--tw-ring-color': NAVY }}>
                    {[5,10,15,20,25,30].map(y => (
                      <option key={y} value={y}>{y} years</option>
                    ))}
                  </select>
                </div>

                {/* Payment Schedule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Schedule</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['monthly', 'bi-weekly', 'weekly'].map(s => (
                      <button key={s} type="button" onClick={() => setSchedule(s)}
                              className="py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-150 capitalize"
                              style={schedule === s
                                ? { background: NAVY, color: 'white', borderColor: NAVY }
                                : { background: 'white', color: '#374151', borderColor: '#d1d5db' }}>
                        {s === 'bi-weekly' ? 'Bi-Weekly' : s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            {results ? (
              <div className="fade-up stagger-2 flex flex-col gap-5">
                {/* Main payment */}
                <div className="rounded-2xl p-8 text-white text-center" style={{ background: NAVY }}>
                  <p className="text-sm font-medium mb-2 opacity-70 uppercase tracking-wider">
                    Your {schedule === 'bi-weekly' ? 'Bi-Weekly' : schedule.charAt(0).toUpperCase() + schedule.slice(1)} Payment
                  </p>
                  <p className="text-5xl font-extrabold mb-1">{fmtDec(results.payment)}</p>
                  <p className="text-sm opacity-60">at {rate.toFixed(2)}% over {years} years</p>
                </div>

                {/* Breakdown */}
                <Card>
                  <h3 className="font-bold text-gray-900 mb-4">Mortgage Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Loan Amount', value: fmt(results.principal) },
                      { label: 'Total Interest', value: fmt(results.totalInterest) },
                      { label: 'Total Cost', value: fmt(results.totalCost), bold: true },
                      { label: 'Payment Frequency', value: `${results.perYear}x per year` },
                      { label: 'Total Payments', value: results.totalPayments },
                    ].map(({ label, value, bold }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-500">{label}</span>
                        <span className={`text-sm ${bold ? 'font-bold' : 'font-medium'} text-gray-900`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Visual bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Principal ({((results.principal / results.totalCost) * 100).toFixed(0)}%)</span>
                      <span>Interest ({((results.totalInterest / results.totalCost) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden flex">
                      <div className="h-full rounded-l-full" style={{ width: `${(results.principal / results.totalCost) * 100}%`, background: NAVY }} />
                      <div className="h-full rounded-r-full flex-1" style={{ background: GOLD }} />
                    </div>
                  </div>
                </Card>

                <Button as={Link} to="/contact" variant="primary" size="lg" className="w-full">
                  Get Pre-Approved — It's Free
                </Button>
              </div>
            ) : (
              <Card className="fade-up stagger-2 flex items-center justify-center text-center py-16">
                <div>
                  <p className="text-gray-400 mb-2">Adjust the sliders to see your estimate</p>
                  <p className="text-xs text-gray-300">Results update in real time</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10 fade-up" style={{ color: NAVY }}>Understanding Your Mortgage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Down Payment', icon: '🏠', text: 'In Canada, you need at least 5% down for homes under $500K, and 10% on the portion above $500K. At 20%+ you avoid CMHC insurance.' },
              { title: 'Interest Rate', icon: '📊', text: 'Even a 0.5% difference in rate can save (or cost) tens of thousands over the life of your mortgage. We shop 50+ lenders to find your best rate.' },
              { title: 'Amortization', icon: '📅', text: 'Longer amortization = lower monthly payments but more total interest. Most Canadians choose 25 years. You can pay down faster with prepayment privileges.' },
            ].map((item, i) => (
              <div key={item.title} className={`fade-up stagger-${i + 1} bg-white p-6 rounded-2xl border border-gray-100`}>
                <p className="text-2xl mb-3">{item.icon}</p>
                <h3 className="font-bold mb-2" style={{ color: NAVY }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            * This calculator provides estimates only. Actual payments may vary. Contact us for a personalized quote.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
