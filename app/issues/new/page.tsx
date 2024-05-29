'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/schemaValidation';

import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>
//quick fix for navigator error
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false } // This will load the component only on client side
);

const newIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    console.log(errors);
    const [error, setError] = useState('');

    return (
        <div className='max-w-xl items-center'>
            {error && (<Callout.Root color='red' className='mb-5'>
                <Callout.Icon>
                    <FaInfoCircle />
                </Callout.Icon>
                <Callout.Text> {error} </Callout.Text>
            </Callout.Root>)}

            <form className='space-y-2' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues');
                } catch (error) {
                    setError('Unknown Error Occured');
                }
            })}>
                <TextField.Root placeholder='Title' {...register('title')} />
                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default newIssuePage;