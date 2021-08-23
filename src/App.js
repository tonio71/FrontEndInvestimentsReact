import { useState } from 'react';
import FundDetails from './components/FundDetails.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Select from './components/Select.jsx';
import { investments, reports } from './data/InvestmentsData.jsx';

export default function App() {
  const [fundsSelected, setFundsSelected] = useState([]);
  const [selectedReport, setselectedReport] = useState([]);
  const [fundSelected, setFundSelected] = useState('');

  function handleFundsSelected(fundo) {
    let selected = [...fundsSelected];
    setFundSelected(fundo.value);
    if (selected.indexOf(fundo.value) === -1) {
      selected.push(fundo.value);
    } else {
      selected.splice(selected.indexOf(fundo.value), 1);
    }
    setFundsSelected(selected);

    let reportFiltered = [...reports];
    reportFiltered = reportFiltered.filter(report => {
      return report.investmentId === fundo.id;
    });

    reportFiltered = reportFiltered.sort((a, b) => {
      if (a.month > b.month) {
        return 1;
      } else {
        return -1;
      }
    });

    setselectedReport(reportFiltered);
  }

  function rendimentoTotal(tipo) {
    let absoluto = 0;
    let rendimentoReais = 0;

    console.log(selectedReport);
    if (selectedReport.length > 11) {
      absoluto = (
        (selectedReport[11].value / selectedReport[0].value - 1) *
        100
      ).toFixed(2);

      rendimentoReais = (
        selectedReport[11].value - selectedReport[0].value
      ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    if (tipo === '%') {
      return absoluto;
    }
    return rendimentoReais;
  }

  console.log('investments ', investments);
  console.log('reports ', reports);
  console.log('selecionado', fundsSelected);
  console.log('filtrados ', selectedReport);

  return (
    <div>
      <Header>Report of Investiment Funds</Header>
      <Main>
        <Select
          onFundSelected={handleFundsSelected}
          data={investments}
        ></Select>

        <div className="text-center bg-green-300 font-bold text-2xl mt-4">
          {fundSelected}
        </div>
        <div className="text-center bg-green-300 font-bold text-xl">
          Rendimento total: {rendimentoTotal()} {'  '} ({rendimentoTotal('%')}%)
        </div>
        <FundDetails selectedReport={selectedReport} />
      </Main>
    </div>
  );
}
