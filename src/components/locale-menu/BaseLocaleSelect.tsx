import { LocaleProps } from '@/types';
import {
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';

export default function BaseLocaleSelect({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultValue,
  label,
  isPending,
}: LocaleProps) {

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger disabled={isPending}>{label}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {children}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
