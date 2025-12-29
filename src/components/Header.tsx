import ThemeSwitcher from "./Theme";

function Header() {
  return (
    <header className="w-full flex items-center justify-between">
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
