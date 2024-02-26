'use client';

import { ROUTES } from '_constants/index';
import { Segment } from '_types';

import { Table } from 'rsuite';
import { Button } from 'rsuite';
import { useEffect, useState } from 'react';

import SegmentDrawer from '_components/segments/segmentsform';

const { Column, HeaderCell, Cell } = Table;

export default function SegmentsTable({ data }: { data: Segment[] }) {
    console.log('data', data);
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState('CREATE');
    const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

    // useEffect(() => {
    //     setOpen(true);
    // }
    //     , []);

    const deleteSegment = (name: string) => {
        console.log('name', name);
    }

    return (
        <div style={{ "margin": "20px", }}>
            <SegmentDrawer open={open} setOpen={setOpen} value={selectedSegment} type={actionType} />
            <div className='w-100 d-flex justify-between align-center py-3'>
                <h1>Segments</h1>
                <Button appearance="primary" onClick={() => {
                    setActionType('CREATE');
                    setOpen(true)
                }}>
                    Add Segment
                </Button>
            </div>
            <Table height={420} data={data} bordered>
                <Column flexGrow={1}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Description</HeaderCell>
                    <Cell dataKey="description" />
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Archived</HeaderCell>
                    <Cell style={{ 'padding': '6px' }}>
                        {(rowData: Segment) => {
                            return (
                                <div className='p-2'>
                                    {rowData.archived ? 'Yes' : 'No'}
                                </div>
                            )
                        }}
                    </Cell>
                </Column>

                <Column flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell style={{ 'padding': '6px' }}>
                        {(rowData: Segment) => {
                            return (
                                <div >
                                    <Button appearance="link" onClick={() => {
                                        setActionType('EDIT');
                                        setSelectedSegment(rowData);
                                        setOpen(true);
                                    }}>
                                        Edit
                                    </Button>
                                    <Button appearance="link" onClick={() => deleteSegment(rowData.name)}>
                                        Delete
                                    </Button>
                                </div>
                            )
                        }}
                    </Cell>
                </Column>
            </Table>
        </div>
    )
}