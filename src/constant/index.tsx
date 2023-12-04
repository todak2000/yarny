import { IInitialValues } from '@/types';
import {v4 as uuidV4} from 'uuid'
import { TbBrandGoogleHome } from "react-icons/tb";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsPersonBoundingBox } from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { RiSettingsLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
export const YarnyLogo = "/svg/logoText.svg";
export const YarnyLogoIcon= "/svg/logo.svg";
export const YarnyLogoBlackIcon = "/svg/logoblack.svg";
export const HeroBg = "/images/hero_bg.png";
export const MobileHeroBg = "/images/mobile_bg.png";
export const initialUser: IInitialValues = {
    name: '',
    email: '',
    userDid: '',
    userRecordId: '',
    uid: '',
    isVerified: '',
    username: '',
    web5DBData: {}
  };
  export const LoginFormArr = [
    {
        id: uuidV4(),
        type:'email',
        name: 'email'
    },
    {
        id: uuidV4(),
        type:'password',
        name: 'password'
    }
  ]
export const RegisterFormArr = [
    {
        id: uuidV4(),
        type:'email',
        name: 'email'
    },
    {
        id: uuidV4(),
        type:'password',
        name: 'password'
    },
    {
        id: uuidV4(),
        type:'text',
        name: 'firstname'
    },
    {
        id: uuidV4(),
        type:'text',
        name: 'lastname'
    },
    {
        id: uuidV4(),
        type:'text',
        name: 'username'
    },
]

export const MediaSideBarArr =[
    {
        id: uuidV4(),
        icon: <TbBrandGoogleHome  className="text-xl mr-2"/>,
        text:"Home",
        redirect: '/'
    },
    {
        id: uuidV4(),
        icon: <BiMessageSquareDetail  className="text-xl mr-2"/>,
        text:"Messages",
        redirect: '/'
    },
    {
        id: uuidV4(),
        icon: <BsPersonBoundingBox  className="text-xl mr-2"/>,
        text:"Profile",
        redirect: '/'
    },
    {
        id: uuidV4(),
        icon: <SiGoogleanalytics  className="text-xl mr-2"/>,
        text:"Analytics",
        redirect: '/'
    },
    {
        id: uuidV4(),
        icon: <RiSettingsLine className="text-xl mr-2"/>,
        text:"Settings",
        redirect: '/'
    },
    {
        id: uuidV4(),
        icon: <CiLogout className="text-xl mr-2"/>,
        text:"Logout",
        redirect: '/'
    },
]