export const setTheme = (theme: 'light' | 'dark') => {
    
    localStorage.setItem('app-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
};

export const getTheme = (): 'light' | 'dark' => {
  return localStorage.getItem('app-theme') as 'light' | 'dark' || 'light';
};