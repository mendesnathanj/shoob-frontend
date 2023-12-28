import { useState } from 'react';
import Section from '@/components/common/Section';
import { useAuth } from '@/hooks/useAuth';
import DownloadYearbookCsvButton from './DownloadYearbookCsvButton';
import SchoolSelect from './SchoolSelect';
import ViewYearbookPreviewButton from './ViewYearbookPreviewButton';

interface ActionSectionProps {
  schoolId: number;
}

export default function ActionSection({ schoolId }: ActionSectionProps) {
  const { user } = useAuth();
  const [isRequestingPreview, setIsRequestingPreview] = useState(false);

  if (!user) return null;

  return (
    <Section title="Actions" contentClass="flex justify-between flex-wrap">
      {user && user.isAdmin() ? <SchoolSelect schoolId={schoolId} /> : <span />}
      <div className="flex gap-8">
        <div className="flex justify-center items-end lg:mr-8">
          <div>
            <ViewYearbookPreviewButton schoolId={schoolId} />
          </div>
        </div>
        <div className="flex justify-center items-end">
          <div>
            <DownloadYearbookCsvButton schoolId={schoolId} />
          </div>
        </div>
      </div>
    </Section>
  );
}
