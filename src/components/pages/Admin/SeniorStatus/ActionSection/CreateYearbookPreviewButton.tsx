import axios from 'axios';
import { toast } from 'react-toastify';
import DropdownButton from '@/components/ui/DropdownButton';
import routes from '@/routes';

interface CreateYearbookPreviewButtonProps {
  schoolId: number;
  setIsRequestingPreview: (next: boolean) => void;
}

export default function CreateYearbookPreviewButton({
  schoolId,
  setIsRequestingPreview
}: CreateYearbookPreviewButtonProps) {
  function handleItemClick(scope: 'enrolled' | 'photographed' | 'appointments' | 'with_pose') {
    setIsRequestingPreview(true);

    axios
      .post(routes.external.generateYearbookPreview, { school_id: schoolId, scope })
      .then(() => toast('Your preview will be ready soon.', { autoClose: 2000, type: 'info' }));
  }

  return (
    <DropdownButton label="Generate Yearbook Preview" variant="warning">
      <DropdownButton.Item closeAfterClick onClick={() => handleItemClick('enrolled')}>
        Enrolled Seniors
      </DropdownButton.Item>
      <DropdownButton.Item closeAfterClick onClick={() => handleItemClick('photographed')}>
        Photographed Seniors
      </DropdownButton.Item>
      <DropdownButton.Item closeAfterClick onClick={() => handleItemClick('appointments')}>
        With an Appointment
      </DropdownButton.Item>
      <DropdownButton.Item closeAfterClick onClick={() => handleItemClick('with_pose')}>
        Selected a Yearbook Pose
      </DropdownButton.Item>
    </DropdownButton>
  );
}
