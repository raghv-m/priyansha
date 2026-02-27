import { useState, useEffect } from 'react';
import Card from '../components/UI/Card';

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [amortization, setAmortization] = useState(25);
  const [paymentSchedule, setPaymentSchedule] = useState('monthly');
  const [results, setResults] = useState(null);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, amortization, paymentSchedule]);

  const calculateMortgage = () => {
    // Calculate loan amount after down payment
    const principal = loanAmount - downPayment;
    
    // Convert annual interest rate to periodic rate
    let periodicRate;
    let paymentsPerYear;
    
    switch(paymentSchedule) {
      case 'monthly':
        periodicRate = interestRate / 100 / 12;
        paymentsPerYear = 12;
        break;
      case 'bi-weekly':
        periodicRate = interestRate / 100 / 26;
        paymentsPerYear = 26;
        break;
      case 'weekly':
        periodicRate = interestRate / 100 / 52;
        paymentsPerYear = 52;
        break;
      default:
        periodicRate = interestRate / 100 / 12;
        paymentsPerYear = 12;
    }
    
    // Total number of payments
    const totalPayments = amortization * paymentsPerYear;
    
    // Calculate periodic payment
    const periodicPayment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
                          (Math.pow(1 + periodicRate, totalPayments) - 1);
    
    // Calculate total cost and interest
    const totalCost = periodicPayment * totalPayments;
    const totalInterest = totalCost - principal;
    
    setResults({
      monthlyPayment: periodicPayment,
      totalPayment: totalCost,
      totalInterest: totalInterest,
      principal: principal,
      paymentsPerYear: paymentsPerYear,
      totalPayments: totalPayments,
      periodicPayment: periodicPayment
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="section">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mortgage Calculator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estimate your monthly mortgage payments and understand how different factors affect your costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Mortgage</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Price {formatCurrency(loanAmount)}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$100K</span>
                  <span>$2M</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment {formatCurrency(downPayment)} ({((downPayment / loanAmount) * 100).toFixed(1)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max={loanAmount * 0.95}
                  step="5000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>{formatCurrency(loanAmount * 0.95)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate {interestRate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5%</span>
                  <span>10%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amortization Period
                </label>
                <select
                  value={amortization}
                  onChange={(e) => setAmortization(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[5, 10, 15, 20, 25, 30, 35, 40].map(year => (
                    <option key={year} value={year}>{year} years</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Schedule
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['monthly', 'bi-weekly', 'weekly'].map(schedule => (
                    <button
                      key={schedule}
                      type="button"
                      onClick={() => setPaymentSchedule(schedule)}
                      className={`py-2 px-4 rounded-lg border ${
                        paymentSchedule === schedule
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {schedule.charAt(0).toUpperCase() + schedule.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {results && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Mortgage Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium">{formatCurrency(results.principal)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Payment Schedule:</span>
                  <span className="font-medium capitalize">{paymentSchedule}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Payment Frequency:</span>
                  <span className="font-medium">{results.paymentsPerYear} per year</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Payments:</span>
                  <span className="font-medium">{results.totalPayments}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-blue-700 mb-1">Your {paymentSchedule} payment</p>
                  <p className="text-3xl font-bold text-blue-800">{formatCurrencyDecimal(results.periodicPayment)}</p>
                  <p className="text-sm text-blue-700 mt-1">Based on {interestRate}% interest rate</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Principal</p>
                  <p className="text-lg font-semibold">{formatCurrency(results.principal)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-lg font-semibold">{formatCurrency(results.totalInterest)}</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-1">Total Cost of Mortgage</p>
                  <p className="text-xl font-bold text-green-800">{formatCurrency(results.totalPayment)}</p>
                  <p className="text-xs text-green-600 mt-1">Principal + Interest</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out">
                  Get Pre-Approved
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Our specialists can help you find the best mortgage options
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Understanding Your Mortgage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Down Payment</h3>
              <p className="text-gray-600">
                A larger down payment reduces your loan amount and monthly payments. In Canada, 
                you need at least 5% down for homes under $500K.
              </p>
            </Card>
            
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interest Rate</h3>
              <p className="text-gray-600">
                Your interest rate depends on market conditions, your credit score, and the type of mortgage. 
                Even small differences can significantly impact your total cost.
              </p>
            </Card>
            
            <Card>
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Amortization</h3>
              <p className="text-gray-600">
                A longer amortization period means lower monthly payments but more interest paid over time. 
                The maximum is typically 25-30 years in Canada.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;