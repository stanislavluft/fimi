import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <>
      <div>
        <h1>Finance Tracker React</h1>
        <TransactionForm />
        <TransactionList />
      </div>
    </>
  );
}

export default App;
