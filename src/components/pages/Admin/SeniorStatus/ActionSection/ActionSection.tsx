import { useState } from 'react';
import Section from '@/components/common/Section';
import { useAuth } from '@/hooks/useAuth';
import DownloadYearbookCsvButton from './DownloadYearbookCsvButton';
import CreateYearbookPreviewButton from './CreateYearbookPreviewButton';
import SchoolSelect from './SchoolSelect';
import ViewYearbookPreviewButton from './ViewYearbookPreviewButton';

interface ActionSectionProps {
  schoolId: number;
}

export default function ActionSection({ schoolId }: ActionSectionProps) {
  const { user } = useAuth();
  const [isRequestingPreview, setIsRequestingPreview] = useState(false);

  return (
    <Section title="Actions" contentClass="grid grid-cols-12">
      {user && user.isAdmin() && <SchoolSelect schoolId={schoolId} />}
      <div className="col-start-8 flex justify-center items-end">
        <div>
          <ViewYearbookPreviewButton
            isRequestingPreview={isRequestingPreview}
            setIsRequestingPreview={setIsRequestingPreview}
            schoolId={schoolId}
          />
        </div>
      </div>
      <div className="col-start-10 flex justify-start items-end">
        <div>
          <CreateYearbookPreviewButton schoolId={schoolId} setIsRequestingPreview={setIsRequestingPreview} />
        </div>
      </div>
      <div className="col-start-12 flex justify-center items-end">
        <div>
          <DownloadYearbookCsvButton schoolId={schoolId} />
        </div>
      </div>
    </Section>
  );
}
