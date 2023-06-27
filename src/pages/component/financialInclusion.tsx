import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title);

interface FinancialData {
  year: number;
  formallyServed: number;
  banked: number;
  otherFormal: number;
  informallyServed: number;
  excluded: number;
  savingGroupMember: number | null;
  mfiSaccos: number;
  umurengeSACCO: number | null;
  borrowingCredit: number;
  insuranceRiskMitigation: number;
  mobileMoneyPenetration: number | null;
  savingsInvestments: number;
}

const FinancialInclusion: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://financialinclusion.onrender.com/api/v1/data');
        setFinancialData(response.data.data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (financialData.length > 0 && chartCanvasRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartCanvasRef.current.getContext('2d');
      if (ctx) {
        const labels = financialData.map((data) => data.year.toString());
        const dataSets = [
          {
            label: 'Formally Served',
            data: financialData.map((data) => data.formallyServed),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'banked',
            data: financialData.map((data) => data.banked),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'otherFormal',
            data: financialData.map((data) => data.otherFormal),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'informallyServed',
            data: financialData.map((data) => data.informallyServed),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'excluded',
            data: financialData.map((data) => data.excluded),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'savingGroupMember',
            data: financialData.map((data) => data.savingGroupMember),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'mfiSaccos',
            data: financialData.map((data) => data.mfiSaccos),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'umurengeSACCO',
            data: financialData.map((data) => data.umurengeSACCO),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'borrowingCredit',
            data: financialData.map((data) => data.borrowingCredit),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'insuranceRiskMitigation',
            data: financialData.map((data) => data.insuranceRiskMitigation),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'mobileMoneyPenetration',
            data: financialData.map((data) => data.mobileMoneyPenetration),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'savingsInvestments',
            data: financialData.map((data) => data.savingsInvestments),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ];

        const chartConfig:any = {
          type: 'bar',
          data: {
            labels,
            datasets: dataSets,
          },
          options: {
            responsive: true,
            scales: {
              x: { display: true },
              y: { display: true },
            },
          },
        };
        const chart = new Chart(ctx, chartConfig);

        setChartInstance(chart);
      }
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [financialData]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Formally Served</TableCell>
            <TableCell>Banked</TableCell>
            <TableCell>Other Formal</TableCell>
            <TableCell>Informally Served</TableCell>
            <TableCell>Excluded</TableCell>
            <TableCell>Saving Group Member</TableCell>
            <TableCell>MFI/SACCOs</TableCell>
            <TableCell>Umurenge SACCO</TableCell>
            <TableCell>Borrowing and Credit</TableCell>
            <TableCell>Insurance and Risk Mitigation</TableCell>
            <TableCell>Mobile Money Penetration</TableCell>
            <TableCell>Savings and Investments</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {financialData.length > 0 ? (
            financialData.map((data) => (
              <TableRow key={data.year}>
                <TableCell>{(data.year ? data.year : "null")}</TableCell>
                <TableCell>{(data.formallyServed ? data.formallyServed : "null")}</TableCell>
                <TableCell>{(data.banked ? data.banked : "null")}</TableCell>
                <TableCell>{(data.otherFormal ? data.otherFormal : "null")}</TableCell>
                <TableCell>{(data.informallyServed ? data.informallyServed : "null")}</TableCell>
                <TableCell>{(data.excluded ? data.excluded : "null")}</TableCell>
                <TableCell>{(data.savingGroupMember ? data.savingGroupMember : "null")}</TableCell>
                <TableCell>{(data.mfiSaccos ? data.mfiSaccos : "null")}</TableCell>
                <TableCell>{(data.umurengeSACCO ? data.umurengeSACCO : "null")}</TableCell>
                <TableCell>{(data.borrowingCredit ? data.borrowingCredit : "null")}</TableCell>
                <TableCell>{(data.insuranceRiskMitigation ? data.insuranceRiskMitigation : "null")}</TableCell>
                <TableCell>{(data.mobileMoneyPenetration ? data.mobileMoneyPenetration : "null")}</TableCell>
                <TableCell>{(data.savingsInvestments ? data.savingsInvestments : "null")}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={13}>No data available</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
      <canvas ref={chartCanvasRef}></canvas>
    </div>
  );
};

export default FinancialInclusion;
