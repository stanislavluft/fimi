interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps) {
  return (
    <>
      <h3>Вы уверены?</h3>
      <div>
        <button onClick={onConfirm}>Да</button>
        <button onClick={onCancel}>Нет</button>
      </div>
    </>
  );
}

export default ConfirmDelete;
