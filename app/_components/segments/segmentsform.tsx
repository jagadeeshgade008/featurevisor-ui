import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import { useState, useRef, useEffect } from 'react';
import { Form, Schema, SelectPicker } from 'rsuite';
import { Notification, useToaster } from 'rsuite';

import { Segment } from '_types';
// import { addSegment, editSegment } from '_actions/index';
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

export default function SegmentDrawer({ open, setOpen, value = null, type = "CREATE" }: { open: boolean, setOpen: (open: boolean) => void, value: Segment | null, type: string }) {
    const router = useRouter();
    const toaster = useToaster();

    const model = Schema.Model({
        name: Schema.Types.StringType().isRequired('This field is required.')
            .maxLength(10, 'Name must be exactly 10 characters long.')
            .pattern(/^[^\s]*$/, 'Name cannot contain spaces.'),
        description: Schema.Types.StringType().isRequired('This field is required.'),
        conditions : Schema.Types.ArrayType().of(
            Schema.Types.ObjectType().shape({
                name: Schema.Types.StringType().isRequired('This field is required.'),
                operator: Schema.Types.StringType().isRequired('This field is required.'),
                value: Schema.Types.StringType().isRequired('This field is required.'),
            })
        )
    });

    const [formValue, setFormValue] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (value) {
            setFormValue({
                name: value.name,
                description: value.description,
            });
        }
    }
        , [value]);

    const handleSubmit = async (formStatus: boolean) => {
        if (!formStatus) {
            // console.error('Form Error');
            return;
        }

        // if (type === 'CREATE') {
        //     addSegment(formValue);
        //     toaster.push(
        //         <Notification type="success" closable title="Success" description="Segment Created" />
        //     );
        // } else {
        //     editSegment(formValue);
        //     toaster.push(
        //         <Notification type="success" closable title="Success" description="Segment Updated" />
        //     );
        // }
        setOpen(false);
        // revalidatePath(router.asPath);
        // router.push('/segments');
    }

    return (
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
                    })}>
                        <Form.Group>
                            <TextField name="name" label="Name" placeholder="Enter attribute name" />
                            <TextField name="description" label="Description" placeholder="Enter attribute description" />
                            
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
    );

}
