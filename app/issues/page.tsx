import React from 'react'
import {Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import Link from '../components/Link'
import StatusBadges from '../components/StatusBadges'
import delay from 'delay';
import IssueActions from './IssueActions'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany()
  await delay(1000);

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Timestamps</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell> <Link href={`issues/${issue.id}`}> {issue.title}</Link>
                <div className='block md:hidden'>
                  <StatusBadges status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell' >
                <StatusBadges status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <div className=''>
                  <b className='pr-1.5'> Created: </b> {issue.createdAt.toLocaleDateString()}
                </div>
                <b> Updated: </b> {issue.updatedAt.toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage