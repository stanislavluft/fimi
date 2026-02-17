interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col">
      <h3 className="mt-3 mb-6 text-sm text-balance">
        Это действие необратимо. Операция будет удалена из вашей истории.
      </h3>
      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-3xl px-4 py-0.5 text-zinc-900 transition-all duration-150 hover:bg-zinc-900/10 active:text-zinc-900/70"
          onClick={onCancel}
        >
          Отменить
        </button>
        <button
          className="rounded-3xl px-4 py-0.5 text-red-500 transition-all duration-150 hover:bg-red-500/10 active:bg-red-500/10 active:text-red-500/70"
          onClick={onConfirm}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
