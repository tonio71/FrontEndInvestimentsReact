export default function Select({ data = [], onFundSelected = null }) {
  function handleFundSelected(event) {
    console.log(event);
    if (onFundSelected) {
      onFundSelected(event.target);
    }
  }

  return (
    <>
      <label htmlFor="funds">Choose funds:</label>
      <br></br>
      <select
        onClick={handleFundSelected}
        id="funds"
        name="funds"
        size="4"
        className="border-2"
        multiple
      >
        {data.map(fund => {
          return (
            <option key={fund.id} id={fund.id}>
              {fund.description}
            </option>
          );
        })}
      </select>
    </>
  );
}
