function TransactionForm() {
  return (
    <>
      <form>
        {/* Sum Block */}
        <div>
          <label htmlFor="inputAmount">Сумма</label>
          <input id="inputAmount" type="number" name="amount" placeholder="Сумма" required />
        </div>
        {/* Category Block  */}
        <div>
          <label htmlFor="inputCategory">Категория</label>
          <input id="inputCategory" type="text" name="category" placeholder="Категория" required />
        </div>
        <button type="submit" name="type" value="income">
          Доход
        </button>
        <button type="submit" name="type" value="expense">
          Расход
        </button>
      </form>
    </>
  );
}

export default TransactionForm;
