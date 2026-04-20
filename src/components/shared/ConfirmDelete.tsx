import { Button } from '@/components/ui/button';

interface ConfirmDeleteProps {
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDelete({ onCancel, onConfirm }: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col">
      <h3 className="my-3 ml-2 text-sm text-balance">
        This action is irreversible. The operation will be removed from your history.
      </h3>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" onClick={onCancel} size="lg">
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} size="lg">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
