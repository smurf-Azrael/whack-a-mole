export function debounce<T extends unknown[]>(func: (...args: T) => void, wait: number): (...args: T) => void {  
    let timeoutId: ReturnType<typeof setTimeout>;  
  
    return function (...args: T) {  
      clearTimeout(timeoutId);  
      timeoutId = setTimeout(() => func(...args), wait);  
    };  
  }