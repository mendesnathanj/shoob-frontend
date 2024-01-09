import Button from "@/components/ui/Button";
import { YearbookAdminJob } from "@/models/v2";
import { useMutation, useQueryClient } from "react-query";

interface DeleteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, onSuccess }: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => (
      YearbookAdminJob.find(id).then((res) => {
        if (!res.data) return;

        res.data.destroy();
      })
    ),
    mutationKey: [`DELETE-YEARBOOK-ADMIN-JOB-${id}`],
  });

  const handleClick = async () => {
    await mutateAsync();

    onSuccess();
  };

  return (
    <Button disabled={isLoading} onClick={handleClick} variant="danger">Delete</Button>
  )
}
