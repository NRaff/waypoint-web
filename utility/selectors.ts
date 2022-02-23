import { useSelector } from "react-redux";

export function useSession() {
  return useSelector((state: any) => state.session)
}