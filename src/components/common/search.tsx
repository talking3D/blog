import * as React from 'react';
import { BiSearch } from 'react-icons/bi';
import { t } from 'i18next';
import useScreenSize from '../hooks/useScreenSize';

const SearchForm = () => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-nowrap items-center content-between h-12 md:h-10 border-thiner border-even-darker rounded-3xl ">
      <form className="flex justify-between" action="" method="post" onSubmit={() => handleSubmit}>
        <input
          className="mx-3 sm:mx-5 min-h-full w-36 sm:w-fit focus:outline-none bg-transparent border-none placeholder:text-black text-black"
          id="find"
          name="find"
          type="text"
          placeholder={t('search.find_on_blog')}
        />
        <button
          className="w-10 h-10 md:w-8 md:h-8 m-1 text-center align-middle rounded-3xl bg-cube-like text-white"
          type="submit"
        >
          <BiSearch size={20} color="white" className="mx-auto" />
        </button>
      </form>
    </div>
  );
};

interface PlaceholderProps {
  onElementClick: () => void
}

const SearchFormPlaceholder = ({ onElementClick }: PlaceholderProps) => {
  const handlePlaceholderClick = () => onElementClick();
  return (
    <div className="flex justify-center items-center sm:hidden w-12 h-12 border-thiner border-even-darker rounded-3xl" onClick={() => handlePlaceholderClick()}>
      <div className="flex content-center align-middle w-10 h-10 bg-cube-like rounded-3xl">
        <BiSearch size={20} color="white" className="m-auto" />
      </div>
    </div>
  );
};

interface SearchBarStateProps {
  visible: boolean,
  expanded: boolean,
}

interface VisibilityHandlerProps {
  handleVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar = ({ handleVisibility }: VisibilityHandlerProps) => {
  const screenSize = useScreenSize();

  const [searchBarState, setSearchBarState] = React.useState<SearchBarStateProps>({
    visible: false,
    expanded: false,
  });

  const handleClick = () => {
    setSearchBarState((prevState) => ({ ...prevState, expanded: true }));
  };

  const screenBreakPoint = 459;
  if (screenSize.width) {
    if (screenSize.width >= screenBreakPoint) {
      // Make sure its visible on wide screen
      if (searchBarState.visible !== true) setSearchBarState((prevState) => ({ ...prevState, visible: true }));

      // Make sure it is not expanded and click state is reset
      // eslint-disable-next-line max-len
      if (searchBarState.expanded) setSearchBarState((prevState) => ({ ...prevState, expanded: false, clicked: false }));
    } else if (screenSize.width < screenBreakPoint && !searchBarState.expanded && searchBarState.visible) {
      // Make sure it is not visible by default on small minimal screen size
      setSearchBarState({ visible: false, expanded: false });
    } else if (screenSize.width < screenBreakPoint && searchBarState.expanded && !searchBarState.visible) {
      // If placeholder was clicked then make searchbar visible
      setSearchBarState({ visible: true, expanded: true });
    }
  }
  React.useEffect(() => {
    handleVisibility(searchBarState.expanded);
  }, [handleVisibility, searchBarState]);

  if (searchBarState.visible) {
    return <SearchForm />;
  }
  return <SearchFormPlaceholder onElementClick={() => handleClick()} />;
};

export default SearchBar;
