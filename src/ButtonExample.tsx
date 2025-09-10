import { useState } from 'react';
import { Button } from './components/ui/button';

export function ButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Button Examples</h2>
      
      <div className="flex gap-4 flex-wrap">
        {/* Normal button */}
        <Button>Normal Button</Button>
        
        {/* Loading button */}
        <Button isLoading={isLoading} onClick={handleClick}>
          {isLoading ? 'Processing...' : 'Click to Load'}
        </Button>
        
        {/* Different variants with loading */}
        <Button variant="destructive" isLoading={false}>
          Delete
        </Button>
        
        <Button variant="outline" isLoading={true}>
          Loading Outline
        </Button>
        
        <Button variant="secondary" isLoading={false}>
          Secondary
        </Button>
        
        <Button variant="ghost" isLoading={false}>
          Ghost
        </Button>
      </div>
    </div>
  );
}
