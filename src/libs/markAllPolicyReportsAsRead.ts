// eslint-disable-next-line you-dont-need-lodash-underscore/each
import ONYXKEYS from '@src/ONYXKEYS';
import Onyx from 'react-native-onyx';
import type {Report} from '@src/types/onyx';
import * as ReportActionFile from './actions/Report';

export default function markAllPolicyReportsAsRead(policyID: string) {
    const connectionID = Onyx.connect({
        key: ONYXKEYS.COLLECTION.REPORT,
        waitForCollectionCallback: true,
        callback: (allReports) => {
            if (!allReports) {
                return;
            }

            let delay = 0;
            Object.keys(allReports).forEach((key: string) => {
                const report: Report|null|undefined = allReports[key];
                if (report?.policyID !== policyID) {
                    return;
                }

                setTimeout(() => {
                    ReportActionFile.readNewestAction(report?.reportID);
                }, delay);

                delay += 1000;
            });
            Onyx.disconnect(connectionID);
        },
    })
}
