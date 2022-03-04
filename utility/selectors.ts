import { useSelector } from "react-redux";

export function useSession() {
  return useSelector((state: any) => state.session)
}

export function useAuthErrors() {
  return useSelector((state: any) => state.errors.auth)
}