import { BASE_URL } from '@/utils/constants';

export default {
  downloadYearbookImagesCsv: `${BASE_URL}/admin/students/download_yearbook_images_csv.csv` as const,
  home: () => BASE_URL,
};
