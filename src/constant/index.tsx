import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { RiSettingsLine } from 'react-icons/ri';
import { SiGoogleanalytics } from 'react-icons/si';
import { TbBrandGoogleHome } from 'react-icons/tb';
import { v4 as uuidV4 } from 'uuid';

import { IInitialValues } from '@/types';
export const YarnyLogo = '/svg/logoText.svg';
export const YarnyLogoIcon = '/svg/logo.svg';
export const YarnyLogoBlackIcon = '/svg/logoblack.svg';
export const HeroBg = '/images/hero_bgg.png';
export const MobileHeroBg = '/images/mobile_bg.png';
export const Avatar = '/svg/avatar.svg';
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
    placeholder:'e.g. name@example.com'
  },
  {
    id: uuidV4(),
    type: 'password',
    name: 'password',
    placeholder:'**************'
  },
];
export const RegisterFormArr = [
  {
    id: uuidV4(),
    type: 'email',
    name: 'email',
    placeholder:'e.g. name@example.com'
  },
  {
    id: uuidV4(),
    type: 'password',
    name: 'password',
    placeholder:'**************'
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'firstname',
    placeholder:'Enter your first name'
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'lastname',
    placeholder:'Enter your last name'
  },
  {
    id: uuidV4(),
    type: 'text',
    name: 'username',
    placeholder:'e.g. name_example001'
  },
];

export const MediaSideBarArr = [
  {
    id: uuidV4(),
    icon: <TbBrandGoogleHome className='text-xl' />,
    text: 'Home',
    redirect: '/media/dashboard',
  },
  {
    id: uuidV4(),
    icon: <BiMessageSquareDetail className='text-xl' />,
    text: 'Messages',
    redirect: '/media/dashboard',
  },
  {
    id: uuidV4(),
    icon: <BsPersonBoundingBox className='text-xl' />,
    text: 'Profile',
    redirect: '/media/dashboard',
  },
  {
    id: uuidV4(),
    icon: <SiGoogleanalytics className='text-xl' />,
    text: 'Analytics',
    redirect: '/media/dashboard',
  },
  {
    id: uuidV4(),
    icon: <RiSettingsLine className='text-xl' />,
    text: 'Settings',
    redirect: '/media/dashboard',
  },
  {
    id: uuidV4(),
    icon: <CiLogout className='text-xl' />,
    text: 'Logout',
    redirect: '/',
  },
];
