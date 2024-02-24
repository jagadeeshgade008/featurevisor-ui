import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { useState, useRef, useEffect } from 'react';
import { Form, Schema, SelectPicker } from 'rsuite';

import { Attribute,AttributeType } from '_types';
import {addAttribute,editAttribute} from '_actions/index';
import { useRouter } from 'next/navigation';

type TextFieldProps = React.ComponentProps<typeof Form.Control> & { label: string; placeholder?: string; };

function TextField(props: TextFieldProps) {
    const { name, label, accepter, ...rest } = props;
    return (
        <Form.Group controlId={`${name}-3`}>
            <Form.ControlLabel>{label} </Form.ControlLabel>
            <Form.Control name={name} accepter={accepter} {...rest} />
        </Form.Group>
    );
}

export default function AttributeDrawer({ open, setOpen , value = null , type="CREATE" }: { open: boolean, setOpen: (open: boolean) => void, value: Attribute | null, type: string }) {
    const router = useRouter();

    const formRef = useRef<React.ComponentProps<typeof Form>>();

    const AttributeTypeList = ['boolean', 'string', 'integer', 'double', 'date'];
    const AttributeTypeListData = AttributeTypeList.map((type) => {
        return { label: type, value: type };
    });
    const model = Schema.Model({
        name: Schema.Types.StringType().isRequired('This field is required.')
            .maxLength(10, 'Name must be exactly 10 characters long.')
            .pattern(/^[^\s]*$/, 'Name cannot contain spaces.'),
        type: Schema.Types.StringType().isRequired('This field is required.'),
        description: Schema.Types.StringType().isRequired('This field is required.'),
    });

    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
        type: AttributeTypeList[0]
    });

    useEffect(() => {
        if (value) {
            setFormValue({
                name: value.name,
                description: value.description,
                type: value.type
            });
        }
    }
    , [value]);

    const handleSubmit = (formStatus: boolean) => {
        if (!formStatus) {
            // console.error('Form Error');
            return;
        }
        // console.log(formValue);
        // setOpen(false);

        const attribute: Attribute = {
            name: formValue.name,
            description: formValue.description,
            type: formValue.type as AttributeType,
        };
        if (type === 'CREATE') {
            addAttribute(attribute);
        } else {
            editAttribute(attribute);
        }

        setOpen(false);

        router.push('/attributes');

    }

    return (
        <>
            <Drawer backdrop open={open} onClose={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>
                        Create Attribute
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body style={{ padding: '12px' }}>
                    <Form fluid model={model} onSubmit={handleSubmit} ref={formRef} formValue={formValue} onChange={(formValue) => setFormValue({
                        name: formValue.name,
                        description: formValue.description,
                        type: formValue.type,
                    })}>
                        <Form.Group>
                            <TextField name="name" label="Name" placeholder="Enter attribute name" />
                            <TextField name="description" label="Description" placeholder="Enter attribute description" />
                            <TextField name="type" label="Type" accepter={
                                (props: React.ComponentProps<typeof SelectPicker>) => {
                                    return <SelectPicker {...props} data={AttributeTypeListData || []} searchable={false}
                                        cleanable={false}
                                    />
                                }
                            } />
                        </Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" type='submit'>Submit</Button>
                            <Button appearance="default" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Drawer.Body>
            </Drawer>
        </>
    );
}