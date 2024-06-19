'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import { createIssueSchema } from '@/app/schemaValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaInfoCircle } from 'react-icons/fa';
import { z } from 'zod';
import delay from 'delay';

type IssueForm = z.infer<typeof createIssueSchema>

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
);



const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);



    const onSubmit = async (data: IssueForm) => {
        try {
            setLoading(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setLoading(false);
            setError('Unknown Error Occurred');
        }
    };

    return (

        <div className='max-w-xl items-center'>
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Icon>
                        <FaInfoCircle />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue{loading && <Spinner />}

                </Button>

            </form>
        </div>
    )
}

export default NewIssuePage;
