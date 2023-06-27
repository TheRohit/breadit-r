"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Prisma, Subreddit } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Users } from "lucide-react";
import debounce from "lodash.debounce";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");

  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });
  //debounce input i.e wait until user stops typing

  const request= debounce(async() =>{
   await refetch()
  },300)

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const router = useRouter();
  const commandRef= useRef<HTMLDivElement>(null)
  const pathname=usePathname()
  
  //close search when clicking outside
  useOnClickOutside(commandRef,() => {
    setInput('')
  })
  //close search when new url
  useEffect(()=>{
    setInput('')
  },[pathname])

  return (
    <Command ref={commandRef} className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      {/* @ts-expect-error idk */}
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest()
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities..."
      />
      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Communities">
              {queryResults?.map((subreddit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`);
                    router.refresh();
                  }}
                  key={subreddit.id}
                  value={subreddit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  );
};

export default SearchBar;
