interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps) {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-3 text-lg font-bold">Удалить операцию?</h3>
        <p className="mt-3 mb-6 max-w-3xs text-xs text-balance">
          Это действие необратимо. Операция будет удалена из вашей истории.
        </p>
        <div className="flex w-full gap-2">
          <button
            className="flex-1 rounded-4xl bg-zinc-100 py-2.5 text-zinc-900 shadow-md transition-all duration-150 active:text-zinc-500"
            onClick={onCancel}
          >
            Отменить
          </button>
          <button
            className="flex-1 rounded-4xl bg-zinc-100 py-2.5 text-red-600 shadow-md transition-all duration-150 active:text-red-400"
            onClick={onConfirm}
          >
            Удалить
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmDelete;
