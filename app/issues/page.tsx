import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'

const IssuesPage = async () => {

  const issues = await prisma.issue.findMany()

  return (
    <div>
      <Button><Link href='/issues/new'>New Issue</Link></Button>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Timestamps</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}
                <div className='block md:hidden font-extralight text-xs'>
                  {issue.status}
                </div>
              </Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell className='hidden md:table-cell' >{issue.status}</Table.Cell>
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