import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { YearbookPreview } from '@/models/v2';
import routes from '@/routes';

let count = 0;

export default function SeniorYearbookPreview() {
  const { user } = useAuth();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isPosting, setIsPosting] = useState(true);

  useEffect(() => {
    if (!user) return;
    if (count > 0) return;

    count++;
    axios
      .post(routes.external.generateYearbookPreview, { school_id: user?.schoolId, scope: 'enrolled' })
      .then(() => {
        setTimeout(() => {
          setIsPosting(false);
        }, 2000);
      });
  }, []);

  const { data } = useQuery(['seniorYearbookPreview', user?.schoolId], () => {
    if (isPosting) return;

    return (
      YearbookPreview
        .where({ schoolId: user?.schoolId })
        .first()
        .then((res) => res.data)
    );
  }, { refetchInterval: 5000, refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });

  useEffect(() => {
    if (!data) return;
    if (data.isProcessing) return;
    if (!linkRef.current) return;

    linkRef.current.click();
  }, [data?.isProcessing]);

  if (!data || data.isProcessing) return <div className="text-center mt-8">Your preview is generating...</div>;

  return (
    <div className="text-center mt-8">
    <a
      ref={linkRef}
      href={data?.previewUrl}
      target="_blank"
      rel="noopener noreferrer"
      id="yearbook-preview-link"
    >
      View Yearbook Preview
    </a>
    </div>
  );
}
