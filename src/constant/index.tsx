import { IInitialValues } from '@/types';
import { v4 as uuidV4 } from 'uuid';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { SiGoogleanalytics } from 'react-icons/si';
import { RiSettingsLine } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
export const YarnyLogo = '/svg/logoText.svg';
export const YarnyLogoIcon = '/svg/logo.svg';
export const YarnyLogoBlackIcon = '/svg/logoblack.svg';
export const HeroBg = '/images/hero_bg.png';
export const MobileHeroBg = '/images/mobile_bg.png';
export const emptyYarnImage = '/svg/empty-54.svg';
export const initialUser: IInitialValues = {
  name: '',
  email: '',
  userDid: '',
  userRecordId: '',
  uid: '',
  isVerified: '',
  username: '',
  web5DBData: {},
};
export const LoginFormArr = [
  {
    id: uuidV4(),
    type: 'email',
    name: 'email',
  },
  {
    id: uuidV4(),
    type: 'password',
    name: 'password',
  },
];
export const RegisterFormArr = [
  {
    id: uuidV4(),
    type: 'email',
    name: 'email',
  },
  {
    id: uuidV4(),
    type: 'password',
    name: 'password',
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'firstname',
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'lastname',
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'username',
  },
];

export const MediaSideBarArr = [
  {
    id: uuidV4(),
    icon: <TbBrandGoogleHome className='mr-2 text-xl' />,
    text: 'Home',
    redirect: '/',
  },
  {
    id: uuidV4(),
    icon: <BiMessageSquareDetail className='mr-2 text-xl' />,
    text: 'Messages',
    redirect: '/',
  },
  {
    id: uuidV4(),
    icon: <BsPersonBoundingBox className='mr-2 text-xl' />,
    text: 'Profile',
    redirect: '/',
  },
  {
    id: uuidV4(),
    icon: <SiGoogleanalytics className='mr-2 text-xl' />,
    text: 'Analytics',
    redirect: '/',
  },
  {
    id: uuidV4(),
    icon: <RiSettingsLine className='mr-2 text-xl' />,
    text: 'Settings',
    redirect: '/',
  },
  {
    id: uuidV4(),
    icon: <CiLogout className='mr-2 text-xl' />,
    text: 'Logout',
    redirect: '/',
  },
];
