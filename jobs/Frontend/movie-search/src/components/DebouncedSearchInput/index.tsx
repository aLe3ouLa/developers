import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "react-use";
import styled from "styled-components";

const Wrapper = styled.form`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  max-height: 60px;
  border-color: var(--input-border-color);
  border-radius: var(--border-radius);
  border-style: solid;
  border-width: 3px;
  margin: var(--space-lg) 0;
  color: rgb(var(--input-border-color));
  font-size: 24px;
  appearance: none;

  background-color: rgb(var(--input-background-color));
`;

const SearchIcon = styled(Search)`
    position: absolute;
	right: 30px;
	top: 34px;
	display: block;
`

type DebouncedSearchInputProps = {
    onSearchChange: (search: string, page?: number) => Promise<void>;
    placeholder?: string;
    delay?: number;
    disabled?: boolean;
};

export const DebouncedSearchInput = ({
    onSearchChange,
    placeholder = "Search...",
    delay = 300,
    disabled = false,
}: DebouncedSearchInputProps) => {
    const [searchValue, setSearchValue] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();

    useDebounce(() => onSearchChange(searchValue), delay, [searchValue]);

    return (
        <Wrapper onSubmit={e => e.preventDefault()}>
            <Input
                type="search"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("query", e.target.value);
                    push(`${pathname}?${params.toString()}`);
                    setSearchValue(e.target.value);
                }}
                disabled={disabled}
            />
            {!searchValue && <SearchIcon />}
        </Wrapper>
    );
}
