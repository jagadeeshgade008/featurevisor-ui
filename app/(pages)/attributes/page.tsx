
import {getAttributes} from '_actions/index';
import AttributesTable from '_components/attributes/attributestable';

export default function Attributes(){
    let attributes = getAttributes();
    console.log('attributes', attributes);
    return (
        <AttributesTable data={attributes} />
    )
}