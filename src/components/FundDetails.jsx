export default function FundDetails({ children, selectedReport = [] }) {
  //prettier-ignore
  function getMonthAbr(mes){
    switch (mes) {
      case 1: return 'jan'; 
      case 2: return 'fev'; 
      case 3: return 'mar'; 
      case 4: return 'abr'; 
      case 5: return 'mai'; 
      case 6: return 'jun'; 
      case 7: return 'jul'; 
      case 8: return 'ago'; 
      case 9: return 'set';
      case 10: return 'out'; 
      case 11: return 'nov'; 
      case 12: return 'dez';
      default: return 'mês não existe';
    }
  }

  function preparaDados() {
    // let dados = await selectedReport.map(dado => {
    //   return {
    //     data: getMonthAbr(dado.month) + '/' + dado.year,
    //     valor: dado.value,
    //   };
    // });

    //prettier-ignore
    for (let i = 0; i < selectedReport.length; i++) {
      selectedReport[i].rendimento = 0;
      selectedReport[i].data = getMonthAbr(selectedReport[i].month) + '/' + selectedReport[i].year;
      if (i !== 0) {
        selectedReport[i].rendimento = parseFloat(
          ((selectedReport[i].value / selectedReport[i - 1].value)-1)*100
        ).toFixed(2);
      }
      if(i===0){    selectedReport[0].rendimento = 0;      }
    }
    return selectedReport;
  }

  //prettier-ignore

  let dados = preparaDados();
  console.log('Dados ', dados);

  return (
    <>
      {selectedReport.map(dado => {
        return (
          <div className="bg-green-100 flex flex-row  p-2 m-1">
            <span className="flex-auto">
              {dado.data} {'  '}
              {dado.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <span
              className={
                dado.rendimento >= 0 ? 'text-blue-500' : 'text-red-500'
              }
            >
              {' '}
              {dado.rendimento}%
            </span>
          </div>
        );
      })}
    </>
  );
}
