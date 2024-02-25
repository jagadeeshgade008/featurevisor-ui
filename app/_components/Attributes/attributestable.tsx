'use client';
import { Attribute } from '_types';
import { Button } from 'rsuite';
import { Table } from 'rsuite';
import AtributeForm from '_components/Attributes/attributestableform';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AttributeType } from '_types';
import {ROUTES} from '_constants/index';

import {deleteAttribute as deleteAttributeAction} from '_actions/index';

const { Column, HeaderCell, Cell } = Table;

export default function AttributesTable({ data }: { data: Attribute[] }) {
  console.log('data', data);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('CREATE');
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(null);

  const deleteAttribute = (name: string) => {
    deleteAttributeAction(name);
    // router.push('/attributes');
    router.push(ROUTES.ATTRIBUTES);
  }

  return (
    <div style={{ "margin": "20px", }}>
      <div className='w-100 d-flex justify-between align-center py-3'>
        <h1>Attributes</h1>
        <AtributeForm open={open} setOpen={setOpen} value={selectedAttribute} type={actionType} />
        <Button appearance="primary" onClick={() => {
          setActionType('CREATE');
          setOpen(true)
          }}>
          Add Attribute
        </Button>
      </div>
      <Table height={420} data={data} bordered>
        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Capture</HeaderCell>
          {/* <Cell dataKey="capture" /> */}
          <Cell style={{ 'padding': '6px' }}>
            {(rowData) => {
              return (
                <div className='p-2'>
                  {rowData.capture ? 'Yes' : 'No'}
                </div>
              );
            }}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Archived</HeaderCell>
          {/* <Cell dataKey="archived" /> */}
          <Cell style={{ 'padding': '6px' }}>
            {(rowData) => {
              return (
                <div className='p-2'>
                  {rowData.archived ? 'Yes' : 'No'}
                </div>
              );
            }}
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <Cell style={{ 'padding': '6px' }}>
            {(rowData) => {
              return (
                <div>
                  <Button
                    appearance="link"
                    onClick={() => {
                      // onClick(rowData.id);
                      setSelectedAttribute(rowData as Attribute);
                      setActionType('EDIT');
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    appearance="link"
                    onClick={() => {
                      // onClick(rowData.id);
                      deleteAttribute(rowData.name);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            }}
          </Cell>
        </Column>

      </Table>
    </div>
  );
}