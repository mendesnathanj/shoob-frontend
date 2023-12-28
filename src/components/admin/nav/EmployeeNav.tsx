import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Nav.module.scss';
import menu from './menu.png';
import { BASE_URL } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';

const highSchoolArr = [6402,
  2551,
  57,
  176,
  1097,
  1070,
  2795,
  1662,
  4570,
  179,
  1084,
  1665,
  4662,
  6401,
  4547,
  1081,
  4212,
  4872,
  174,
  5083,
  2534,
  4206,
  6403,
  6413,
  5089,
  2385,
  128,
  2736,
  49,
  1004,
  4203,
  6440,
  175,
  44,
  1076,
  4230,
  4,
  1064,
  170,
  43,
  4739,
  997,
  2527,
  4106,
  4699,
  1099,
  992,
  4849,
  5091,
  4605,
  6364,
  6365,
  4079,
  60,
  1039,
  55,
  4518,
  971,
  1105,
  4960,
  1067,
  2911,
  4999,
  5000,
  1038,
  1087,
  83,
  4618,
  4229,
  4520,
  1024,
  4738,
  998,
  1048,
  913,
  1063,
  130,
  4519,
  4527,
  4076,
  4510,
  4541,
  1082,
  1047,
  1086,
  1944,
  972,
  4543,
  2112,
  994,
  177,
  178,
  2783,
  1096,
  192,
  1068,
  81,
  2976,
  1098,
  4529,
  6367,
  6374,
  6368,
  967,
  6395,
  6393,
  4947
];

const middleSchoolArr = [
  143,
  111,
  917,
  783,
  442,
  342,
  440,
  793,
  796,
  448,
  14,
  609,
  151,
  1018,
  1059,
  180,
  118,
  6416,
  61,
  445,
  4532,
  1037,
  165,
  635,
  3721,
  977,
  339,
  4549,
  3509,
  4852,
  75,
  5056,
  1950,
  73,
  826,
  1580,
  4227,
  4661,
  978,
  1079,
  4542,
  1943,
  1941,
  4948,
  4962,
  4437,
  3749,
  1012,
  1975,
  1071,
  4523,
  1956,
  3380,
  4906,
  4544,
  2557,
  1103,
  2375,
  737,
  946,
  911,
  199,
  3450,
  4528,
  1977,
  3719,
  3720,
  4540,
  3459,
  2968,
  1036,
  4610,
  1961,
  1959,
  3482,
  4264,
  2952,
  2945,
  2946,
  1040,
  2944,
  755,
  736,
  1969,
  1974,
  3468,
  2101,
  2109,
  2111,
  3746,
  3491,
  3495,
  3501,
  3768,
  3614,
  4565,
  3454,
  2099,
  1855,
  2254,
  4249,
  3774,
  3775,
  3496,
  4555,
  2950,
  229,
  4604,
  2481,
  4511,
  428,
  1080,
  152,
  6387,
  6386,
  6370,
  6369,
  6384,
  6371,
  767,
];

const EmployeeNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    setIsLoginOpen(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isLoginOpen) return;

    setIsOpen(false);
  }, [isLoginOpen]);

  if (!user) return null;

  return (
    <nav
      className={cn({
        [styles.navContainer]: true,
        noPrint: true,
      })}
    >
      <div className={cn(styles.cartLink, styles.dropdown)} style={{ marginLeft: '1em' }}>
        <button
          className={styles.button}
          style={{ padding: '.5em' }}
          onClick={() => setIsLoginOpen(!isLoginOpen)}
          type="button"
        >
          <img alt="Menu" src={menu} />
        </button>
        <ul
          className={cn({
            [styles.dropdownMenu]: true,
            [styles.hidden]: !isLoginOpen,
          })}
        >
          <li>
            <a href={`${BASE_URL}/pages/home`}>
              Home Page
            </a>
          </li>
        </ul>
      </div>
      <ul className={styles.nav}>
        <li className={styles.dropdown}>
          <button
            className={styles.button}
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            Files
          </button>
          <ul
            className={cn({
              [styles.dropdownMenu]: true,
              [styles.hidden]: !isOpen,
            })}
          >
            <li>
              <a href={`${BASE_URL}/school_files/incoming_files?q[school_id_eq]=${user.schoolId}`}>To Shoob Photo</a>
            </li>
            <li>
              <a href={`${BASE_URL}/school_files/outgoing_files?q[school_id_eq]=${user.schoolId}`}>From Shoob Photo</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://admin.shoobphoto.com/senior-status" rel="noopener noreferrer" target="_blank">
            Senior Portraits
          </a>
        </li>
        <li>
          <a href={`${BASE_URL}/export/students`}>Students</a>
        </li>
        {!highSchoolArr.includes(user.schoolId) && !middleSchoolArr.includes(user.schoolId) && (
          <li>
            <a href={`${BASE_URL}/schools/${user.schoolId}/class_pictures`}>
              Class Pictures
            </a>
          </li>
        )}
        <li>
          <a href={`${BASE_URL}/awards`}>
            Awards
          </a>
        </li>
        <li>
          <a href={`${BASE_URL}/order_packages`}>
            Yearbooks
          </a>
        </li>
        <li>
          <a href={`${BASE_URL}/school_resources`}>
            Resources for Schools
          </a>
        </li>
        <li>
          <a rel="nofollow" data-method="delete" href={`${BASE_URL}/users/sign_out`}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default EmployeeNav;
