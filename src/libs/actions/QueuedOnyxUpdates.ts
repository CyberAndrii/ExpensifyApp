import type {OnyxUpdate} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import ONYXKEYS from "@src/ONYXKEYS";

// In this file we manage a queue of Onyx updates while the SequentialQueue is processing. There are functions to get the updates and clear the queue after saving the updates in Onyx.

let queuedOnyxUpdates: OnyxUpdate[] = [];

Onyx.connect({
    key: ONYXKEYS.ONYX_UPDATE_QUEUE,
    callback: (val) => {
        queuedOnyxUpdates = val ?? [];
    },
});

/**
 * @param updates Onyx updates to queue for later
 */
function queueOnyxUpdates(updates: OnyxUpdate[]): Promise<void> {
    queuedOnyxUpdates = queuedOnyxUpdates.concat(updates);
    return Onyx.set(ONYXKEYS.ONYX_UPDATE_QUEUE, queuedOnyxUpdates);
}

function flushQueue(): Promise<void> {
    const updates = queuedOnyxUpdates.concat({
        key: ONYXKEYS.ONYX_UPDATE_QUEUE,
        onyxMethod: Onyx.METHOD.SET,
        value: null
    });

    return Onyx.update(updates).then(() => {
        queuedOnyxUpdates = [];
    });
}

export {queueOnyxUpdates, flushQueue};
