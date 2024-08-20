import EditableSpan from "./EditableSpan";
import { action } from '@storybook/addon-actions'


export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const onChangeDoubleClick = action('Input be edit')

export const EditableSpanBaseExample = () => {
    return <>
    <EditableSpan title="Old Title" onChange={onChangeDoubleClick}/>
    </>
}