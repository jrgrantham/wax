import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = (initialValue) => {
  const [darkMode, setDarkMode] = useLocalStorage("Dark", initialValue);
  const toggleMode = (event) => {
    event.preventDefault();
    setDarkMode(!darkMode);
  };

  function addDark(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("darkmode");
    }
  }

  function removeDark(elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("darkmode");
    }
  }

  useEffect(() => {
    const elements = document.querySelectorAll(".toggle");
    darkMode ? addDark(elements) : removeDark(elements);
  });
  return [darkMode, toggleMode];
};

export default useDarkMode;
