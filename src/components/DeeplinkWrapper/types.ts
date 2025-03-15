import type ChildrenProps from '@src/types/utils/ChildrenProps';
import { AutoAuthState } from "@src/types/onyx/Session";

type DeeplinkWrapperProps = ChildrenProps & {
    /** User authentication status */
    isAuthenticated: boolean;

    /** Current user's account ID */
    accountID?: number;
    
    /** The auto authentication status */
    autoAuthState?: AutoAuthState;

    initialUrl?: string;
};

export default DeeplinkWrapperProps;
