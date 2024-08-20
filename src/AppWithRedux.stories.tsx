import { Meta } from "@storybook/react/*";
import AppWithRedux from "./AppWithRedux";

import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator";


const meta: Meta<typeof AppWithRedux> = {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />

}