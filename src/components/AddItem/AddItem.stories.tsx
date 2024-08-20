import { AddItemFor } from "./AddItem"
import { action } from '@storybook/addon-actions'

export default {
    title: 'AddItem Component',
    component: AddItemFor
}
const callback = action('Button add was pressed inside the form');

export const AddItemForBaseExample = (props: any) => {
    return <AddItemFor addItem={callback} labelText="AddItem" />
}