import { BASE_URL } from '@/utils/constants';

export default {
  home: () => BASE_URL,
  downloadYearbookImagesCsv: `${BASE_URL}/admin/students/download_yearbook_images_csv.csv` as const,
};
