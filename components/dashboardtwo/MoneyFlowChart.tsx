'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
// import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MoneyFlowChart() {
  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels,
    datasets: [
      { label: 'Deposits', data: [], backgroundColor: '#22c55e', borderRadius: 8 },
      { label: 'Transfers', data: [], backgroundColor: '#f97316', borderRadius: 8 },
      { label: 'Withdrawals', data: [], backgroundColor: '#ef4444', borderRadius: 8 },
    ],
  });

  useEffect(() => {
    async function loadData() {
      const res = await fetch('/api/analytics/money-flow');
      const data = await res.json();

      const deposits = Array(12).fill(0);
      const withdrawals = Array(12).fill(0);
      const transfers = Array(12).fill(0);

      data.forEach((row: any) => {
        const index = Number(row.month) - 1;
        deposits[index] = Number(row.deposits);
        withdrawals[index] = Number(row.withdrawals);
        transfers[index] = Number(row.transfers);
      });

      setChartData({
        labels,
        datasets: [
          { label: 'Deposits', data: deposits, backgroundColor: '#22c55e', borderRadius: 8 },
          { label: 'Transfers', data: transfers, backgroundColor: '#f97316', borderRadius: 8 },
          { label: 'Withdrawals', data: withdrawals, backgroundColor: '#ef4444', borderRadius: 8 },
        ],
      });
    }

    loadData();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: { size: 12, weight: 'bold' },
          boxWidth: 12,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Money Flow (Last 12 Months)',
        color: '#111827',
        font: { size: 14, weight: 'bold' },
        padding: { bottom: 12 },
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 12,
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()} XAF`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280',
          font: { size: 10 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: '#6b7280',
          font: { size: 10 },
          callback: (value) => `${Number(value).toLocaleString()} XAF`,
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <div
      className="
        group relative mt-6 h-64 w-full
        rounded-2xl border border-white/20
        bg-white/30 backdrop-blur-xl
        p-4 sm:h-80 sm:p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      "
    >
      {/* Glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* <Bar options={options} data={chartData} /> */}
    </div>
  );
}
