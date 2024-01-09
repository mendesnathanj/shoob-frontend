import Button from "@/components/ui/Button";
import { YearbookAdminJob } from "@/models/v2";
import { useMutation, useQueryClient } from "react-query";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const queryClient = useQueryClient();

  const { isLoading, mutate, mutateAsync, isSuccess } = useMutation({
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

    queryClient.invalidateQueries({ queryKey: ['yearbookAdminJobsHome'] });
  };

  return (
    <Button disabled={isLoading} onClick={handleClick} variant="danger">Delete</Button>
  )
}
