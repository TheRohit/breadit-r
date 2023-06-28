'use client'

import { FC } from 'react'
import { Button } from './ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface DeletePostProps {
    postId: string;
}





const DeletePost: FC<DeletePostProps> = ({postId}) => {

    const router = useRouter()

    const {mutate:deletePost}= useMutation({
        mutationFn:async ({postId}:any) => {
            const payload:any = {
                postId,
            }
            const{data} = await axios.delete(`/api/subreddit/post/delete`,payload)
            return data
        },

        onSuccess: () => {
            router.push("/")
            
      
          }

    })




  return <div className='flex justify-end'>
   <Button onClick={() => deletePost({postId})}>Delete</Button>
  </div>
}

export default DeletePost