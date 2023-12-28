import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { YearbookPreview } from '@/models/v2';
import routes from '@/routes';
import useQueryString from '@/hooks/useQueryString';

let count = 0;

export default function SeniorYearbookPreview() {
  const { schoolId: schoolIdParam } = useQueryString();
  const { user } = useAuth();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isPosting, setIsPosting] = useState(true);

  const schoolId = useMemo(() => (
    user?.isAdmin() && schoolIdParam ? schoolIdParam : user?.schoolId
  ), [user?.isAdmin(), schoolIdParam]);

  useEffect(() => {
    if (!user) return;
    if (count > 0) return;

    count++;
    axios
      .post(routes.external.generateYearbookPreview, { school_id: schoolId, scope: 'enrolled' })
      .then(() => {
        setTimeout(() => {
          setIsPosting(false);
        }, 2000);
      });
  }, []);

  const { data } = useQuery(['seniorYearbookPreview', schoolId], () => {
    if (isPosting) return;

    return (
      YearbookPreview
        .where({ schoolId })
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
