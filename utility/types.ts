
export interface Session {
  uid: string;
  displayName: string | null;
  photoUrl: string | null;
}

export interface NewAuth {
  email: string;
  displayName: string;
  password: string;
}

export interface SignInAuth {
  email: string;
  password: string;
}

export interface User {
  id: string;
  displayName: string;
  profileImgUrl: string;
}

export interface SessionAction {
  type: string;
  payload: Session;
}

export interface BtnWithImgProps {
  action: Function;
  img?: string;
  title: string;
  style: string;
}

export interface NavItemProps {
  action: Function;
  title: string;
  style: string;
}

export interface ActivityListProps {
  type: 'Races' | 'Courses'
}

export interface ActivityHeaderProps {
  curType: string;
  setType: Function;
}

export interface Activity {
  type: string;
  name: string;
  status: string;
  visibility: string;
}