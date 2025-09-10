import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex justify-center items-center gap-2">
            <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[140px]">
                    <div className="flex items-center gap-2">
                        {theme === 'light' && <Sun className="h-4 w-4" />}
                        {theme === 'dark' && <Moon className="h-4 w-4" />}
                        {theme === 'system' && <Monitor className="h-4 w-4" />}
                        <SelectValue />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">
                        <div className="flex items-center gap-2">
                            Light
                        </div>
                    </SelectItem>
                    <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                            Dark
                        </div>
                    </SelectItem>
                    <SelectItem value="system">
                        <div className="flex items-center gap-2">
                            System
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

// Alternative: Simple button toggle (just light/dark)
export function SimpleThemeToggle() {
    const { actualTheme, setTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(actualTheme === 'light' ? 'dark' : 'light')}
            className="h-9 w-9"
        >
            {actualTheme === 'light' ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
