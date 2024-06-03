import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const StatusMapper: Record<Status, { label: string, color: 'red' | 'yellow' | 'green' }> = {
    OPEN: { label: 'Open', color: 'green'},
    IN_PROGRESS: { label: 'In Progress', color: 'yellow'},
    CLOSED: { label: 'Closed', color: 'red'}

};

const StatusBadges = ({ status }: { status: Status }) => {
    return (
        <Badge color={StatusMapper[status].color}>
            {StatusMapper[status].label}
        </Badge>
    )
}

export default StatusBadges