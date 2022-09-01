import { useLocation } from "@reach/router";

const useActiveLocalePath = (locale: string) => {
  const { pathname } = useLocation();
  const regex = new RegExp(String.raw`^\/${locale}(?:\/|$)`);
  return regex.test(pathname);
};

export default useActiveLocalePath;
