"use client";

//here we are wrapping up this client component inside a server component
import { FC, useEffect, useState } from "react";
import { PostValidator } from "../../lib/validators/post";
import { VoteType } from "@prisma/client";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/vote";
import axios from "axios";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVotesAmt,
  initialVote,
}) => {
  const { loginToast } = useCustomToast();
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  //sync client and server whenever vote changes
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  //api using react query
  const {} = useMutation({
    mutationFn: async (voteType:VoteType) => {
      const payload:PostVoteRequest= {
        postId,
        voteType,
      }

      await axios.
    }
  })


  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
        </p> 


        <Button size="sm" variant="ghost" aria-label="downvote">
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "DOWN",
          })}
        />
      </Button>
        
    </div>
  );
};

export default PostVoteClient;
