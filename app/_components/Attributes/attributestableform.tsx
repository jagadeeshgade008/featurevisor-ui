import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { useState, useRef, useEffect } from 'react';
import { Form, Schema, SelectPicker } from 'rsuite';
import { Notification, useToaster } from 'rsuite';

import { Attribute, AttributeType } from '_types';
import { addAttribute, editAttribute } from '_actions/index';
import { useRouter } from 'next/navigation';
// import { revalidatePath } from 'next/cache'

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

export default function AttributeDrawer({ open, setOpen, value = null, type = "CREATE" }: { open: boolean, setOpen: (open: boolean) => void, value: Attribute | null, type: string }) {
    const router = useRouter();
    const toaster = useToaster();

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

    const handleSubmit = async (formStatus: boolean) => {
        if (!formStatus) {
            // console.error('Form Error');
            return;
        }

        const attribute: Attribute = {
            name: formValue.name,
            description: formValue.description,
            type: formValue.type as AttributeType,
        };
        if (type === 'CREATE') {
            let response = await addAttribute(attribute);
            if (!response.status) {
                toaster.push(<Notification type="error" header="Error" closable>
                    {response.message}
                </Notification>, {
                    placement: 'topEnd'
                });
                return;
            } else {
                toaster.push(<Notification type="success" header="Success" closable>
                    Attribute added successfully!
                </Notification>, {
                    placement: 'topEnd'
                });
            }
        } else {
            let response = await editAttribute(attribute, value?.name || '');
            if (!response.status) {
                toaster.push(<Notification type="error" header="Error" closable>
                    {response.message}
                </Notification>, {
                    placement: 'topEnd'
                });
                return;
            } else {
                toaster.push(<Notification type="success" header="Success" closable>
                    Attribute updated successfully!
                </Notification>, {
                    placement: 'topEnd'
                });
            }
        }

        setOpen(false);

        router.push('/attributes');
        // revalidatePath('/attributes');

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
                    <Form fluid model={model} onSubmit={handleSubmit} formValue={formValue} onChange={(formValue) => setFormValue({
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