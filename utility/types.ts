
export interface Session {
  uid: string;
  displayName: string;
}

export interface NewAuth {
  email: string;
  displayName: string;
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
  img: string;
  title: string;
  style: string;
}