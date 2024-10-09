import { debounce } from "../utils/debounce";

jest.useFakeTimers();  

describe('debounce', () => {  
  it('should debounce a function', () => {  
    const func = jest.fn();  
    const debouncedFunc = debounce(func, 200);  

    // Call the debounced function several times  
    debouncedFunc('test1');  
    debouncedFunc('test2');  
    debouncedFunc('test3');  

    // Fast forward time  
    jest.advanceTimersByTime(199);  

    // Function should not have been called yet  
    expect(func).not.toHaveBeenCalled();  

    jest.advanceTimersByTime(1);  

    // Function should have been called once with the latest arguments  
    expect(func).toHaveBeenCalledTimes(1);  
    expect(func).toHaveBeenCalledWith('test3');  
  });  
});