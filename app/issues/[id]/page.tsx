import StatusBadges from '@/app/components/StatusBadges';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    // cant figure it out
    //if (typeof params.id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) { notFound(); }
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='gap-3' my="2">
                <StatusBadges status={issue.status}></StatusBadges>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt="4">
                <ReactMarkdown>
                    {issue.description}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailsPage