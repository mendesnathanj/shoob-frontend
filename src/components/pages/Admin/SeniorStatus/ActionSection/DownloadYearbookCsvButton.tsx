import DropdownButton from '@/components/ui/DropdownButton';
import routes from '@/routes';

interface DownloadYearbookCsvButtonProps {
  schoolId: number;
}

export default function DownloadYearbookCsvButton({ schoolId }: DownloadYearbookCsvButtonProps) {
  return (
    <DropdownButton label="Download CSV" variant="success">
      <DropdownButton.Link
        download
        external
        to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=enrolled`}
        variant="plain"
      >
        Enrolled Seniors
      </DropdownButton.Link>
      <DropdownButton.Link
        download
        external
        to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=photographed`}
        variant="plain"
      >
        Photographed Seniors
      </DropdownButton.Link>
      <DropdownButton.Link
        download
        external
        to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=appointments`}
        variant="plain"
      >
        With an Appointment
      </DropdownButton.Link>
      <DropdownButton.Link
        download
        external
        to={`${routes.external.downloadYearbookImagesCsv}?school_id=${schoolId}&scope=with_pose`}
        variant="plain"
      >
        Selected a Yearbook Pose
      </DropdownButton.Link>
    </DropdownButton>
  );
}
