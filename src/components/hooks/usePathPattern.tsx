import { useLocation } from "@reach/router";

const usePathPattern = (pattern: string) => {
  const { pathname } = useLocation();
  const regex = new RegExp(String.raw`^\/${pattern}(?:\/|$)`);
  return regex.test(pathname);
};

export default usePathPattern;
