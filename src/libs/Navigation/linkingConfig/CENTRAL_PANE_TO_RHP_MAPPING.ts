import type {CentralPaneName} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';

const CENTRAL_PANE_TO_RHP_MAPPING: Partial<Record<CentralPaneName, string[]>> = {
    [SCREENS.WORKSPACE.PROFILE]: [SCREENS.WORKSPACE.NAME, SCREENS.WORKSPACE.CURRENCY, SCREENS.WORKSPACE.DESCRIPTION, SCREENS.WORKSPACE.SHARE],
    [SCREENS.WORKSPACE.REIMBURSE]: [SCREENS.WORKSPACE.RATE_AND_UNIT, SCREENS.WORKSPACE.RATE_AND_UNIT_RATE, SCREENS.WORKSPACE.RATE_AND_UNIT_UNIT],
    [SCREENS.WORKSPACE.MEMBERS]: [SCREENS.WORKSPACE.INVITE, SCREENS.WORKSPACE.INVITE_MESSAGE, SCREENS.WORKSPACE.MEMBER_DETAILS, SCREENS.WORKSPACE.MEMBER_DETAILS_ROLE_SELECTION],
    [SCREENS.WORKSPACE.WORKFLOWS]: [SCREENS.WORKSPACE.WORKFLOWS_APPROVER, SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_FREQUENCY, SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_MONTHLY_OFFSET],
    [SCREENS.WORKSPACE.CATEGORIES]: [SCREENS.WORKSPACE.CATEGORY_CREATE, SCREENS.WORKSPACE.CATEGORY_SETTINGS, SCREENS.WORKSPACE.CATEGORIES_SETTINGS],
};

export default CENTRAL_PANE_TO_RHP_MAPPING;
