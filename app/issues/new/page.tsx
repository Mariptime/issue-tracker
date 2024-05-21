'use client';
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const newIssuePage = () => {
    return (
        <div className='max-w-xl space-y-2'>            
            <TextField.Root placeholder='Title'>
            </TextField.Root>
            <SimpleMDE />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default newIssuePage;